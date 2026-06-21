// Split from the original prototype script. Keep load order in index.html.

const chainRules = {
  "collar-tie>snapdown": { label: "Collar Tie to Snapdown", submission: 8, control: 1 },
  "snapdown>guillotine": { label: "Snapdown to Guillotine", submission: 22, control: 1 },
  "snapdown>darce": { label: "Snapdown to D'Arce", submission: 18, control: 1 },
  "snapdown>anaconda": { label: "Snapdown to Anaconda", submission: 18, control: 1 },
  "wrist-control>arm-drag": { label: "Wrist Control to Arm Drag", control: 1 },
  "arm-drag>rear-naked-choke": { label: "Arm Drag to RNC", submission: 22 },
  "duck-under>rear-naked-choke": { label: "Duck Under to RNC", submission: 20 },
  "knee-slice>mount": { label: "Knee Slice to Mount", control: 1 },
  "body-lock-pass>mount": { label: "Body Lock Pass to Mount", control: 1 },
  "mount>arm-triangle": { label: "Mount to Arm Triangle", submission: 20 },
  "closed-guard-sweep>armbar": { label: "Flower Sweep to Armbar", submission: 18 },
  "hip-bump-sweep>armbar": { label: "Hip Bump to Armbar", submission: 18 },
  "guard-pull>triangle": { label: "Guard Pull to Triangle", submission: 14 },
  "scissor-sweep>knee-slice": { label: "Sweep to Pass Pressure", control: 1 },
  "single-leg>body-lock-pass": { label: "Single Leg to Body Lock Pass", control: 1 },
  // Butterfly guard chains — hooks first, then the attack (same bottom position)
  "butterfly-hooks>butterfly-sweep": { label: "Butterfly Hooks to Sweep", control: 1 },
  "butterfly-hooks>ashi-garami-entry": { label: "Butterfly Entry to Ashi Garami", submission: 12, control: 1 },
  // Half guard to pass chains — you landed on top, press forward
  "old-school-sweep>knee-slice": { label: "Half Guard Sweep to Knee Slice", control: 1 },
  "butterfly-sweep>knee-slice": { label: "Butterfly Sweep to Knee Slice", control: 1 },
  // Leg lock chains
  "ashi-garami-entry>straight-ankle-lock": { label: "Ashi Garami to Ankle Lock", submission: 22, control: 1 },
  "ashi-garami-entry>heel-hook": { label: "Ashi Garami to Heel Hook", submission: 18, control: 1 }
};

function getChainBonus(previousId, currentId) {
  if (!previousId) return null;
  return chainRules[`${previousId}>${currentId}`] || null;
}

function playTurn(playerCardId) {
  if (state.finished || state.animating) return;
  previewPose = null;

  const playerCard = cards.find((card) => card.id === playerCardId);
  const opponentCard = state.intentCard || chooseOpponentCard();
  const fromPosition = state.position;
  const chain = getChainBonus(state.lastPlayerCardId, playerCard.id);
  const logStart = state.log.length;
  const turnReview = beginTurnReview(playerCard, opponentCard, fromPosition, chain, logStart);
  state.turnFinishAttempts = [];
  state.lastChain = chain;
  state.lastMoveType = playerCard.type;

  addLog(state, typeof announceCardChoice === "function"
    ? announceCardChoice(playerCard.name, opponentCard.name)
    : `You choose ${playerCard.name}. ${state.ai.name} chooses ${opponentCard.name}.`);
  if (chain) {
    addLog(state, typeof announceChain === "function" ? announceChain(chain.label) : `Chain bonus: ${chain.label}.`);
    if (typeof SFX !== "undefined") SFX.chainCombo();
  }

  spendStamina("player", effectiveCardCost(playerCard, "player"));
  spendStamina("opponent", opponentCard.cost);
  if (chain?.control) {
    addControl(state, "player", chain.control, `Your ${chain.label} adds control.`);
  }

  resolveCards(playerCard, opponentCard);
  if (typeof SFX !== "undefined") {
    if (playerCard.type === "takedown") SFX.takedown();
    else if (playerCard.type === "counter") SFX.counter();
  }

  if (!state.finished) {
    state.turn += 1;
    state.lastPlayerCardId = playerCard.id;
    recoverStandingStamina();
    if (state.turn > MAX_TURNS) endByPoints();
  }

  finishTurnReview(turnReview);
  state.turnFinishAttempts = [];

  if (!state.finished) {
    drawHand();
    prepareOpponentIntent();
  }
  state.animating = true;
  state.animation = {
    card: playerCard,
    opponentCard,
    fromPosition,
    toPosition: state.position
  };
  render();
  pulseMat();
  window.setTimeout(() => {
    state.animating = false;
    state.animation = null;
    render();
  }, ANIMATION_MS);
}

function chooseOpponentCard() {
  const playable = cards.filter((card) => canPlay(card, "opponent") && state.opponent.stamina >= card.cost);
  if (!playable.length) return cards.find((card) => card.id === "rest") || cards[0];

  const opponentRelPos = mirrorPosition(state.position);
  const topPositions = ["Mount", "Back Control", "Side Control", "Front Headlock", "Ashi Garami"];

  // Exhausted: rest or cheapest option
  if (state.opponent.stamina <= 1) {
    const rest = playable.find((card) => card.id === "rest");
    if (rest) return rest;
    const cheap = playable.filter((card) => card.cost <= 1);
    if (cheap.length) return shuffle(cheap)[0];
  }

  // Dominant position: hunt the finish
  if (topPositions.includes(opponentRelPos)) {
    const finishers = playable.filter((card) => ["submission", "pressure"].includes(card.type));
    if (finishers.length >= 2) return shuffle(finishers)[0];
  }

  // Player is fatigued: attack hard
  if (state.player.stamina <= 3) {
    const aggressive = playable.filter((card) => ["submission", "pressure", "pass", "takedown"].includes(card.type));
    if (aggressive.length >= 2) return shuffle(aggressive)[0];
  }

  // Mind game modifier: opponent is aggressive
  if (state.mindEffects?.opponentAggressive) {
    const aggressive = playable.filter((card) => ["takedown", "pass", "submission", "pressure"].includes(card.type));
    if (aggressive.length) return shuffle(aggressive)[0];
  }

  // Default: style-weighted with 2x key-type bias
  const styled = playable.filter((card) => state.ai.favoriteTypes.includes(card.type));
  const pool = styled.length ? [...styled, ...styled, ...playable] : playable;
  return shuffle(pool)[0] || cards.find((card) => card.id === "rest");
}

function resolveCards(playerCard, opponentCard) {
  const playerCounters = playerCard.type === "counter" && beats(playerCard, opponentCard);
  const opponentCounters = opponentCard.type === "counter" && beats(opponentCard, playerCard);
  // Escape priority: if player escapes while opponent tries to advance position,
  // the escape wins — you cannot pass someone who is actively hip escaping.
  const playerEscapesPass = playerCard.type === "escape" && ["pass", "pressure"].includes(opponentCard.type);

  if (playerCounters) {
    const counterMsg = typeof announceCardChoice === "function"
      ? `Your ${playerCard.name} shuts down ${opponentCard.name}.`
      : `Your ${playerCard.name} shuts down ${opponentCard.name}.`;
    addLog(state, counterMsg);
    playerCard.play(state, "player");
    applyCounterPositionBonus(playerCard, "player", opponentCard);
    applyCounterMindGameBonus();
    return;
  }

  if (opponentCounters) {
    addLog(state, `${state.ai.name}'s ${opponentCard.name} shuts down your ${playerCard.name}.`);
    opponentCard.play(state, "opponent");
    applyCounterPositionBonus(opponentCard, "opponent", playerCard);
    return;
  }

  if (playerEscapesPass) {
    addLog(state, `You escape before ${state.ai.name}'s ${opponentCard.name} can land.`);
    playerCard.play(state, "player");
    // Opponent's pass is blocked but still costs stamina (already spent before this point)
    return;
  }

  playerCard.play(state, "player");
  if (!state.finished) opponentCard.play(state, "opponent");
}

function applyCounterMindGameBonus() {
  if (!state.mindEffects?.counterControlBonus) return;
  addControl(state, "player", state.mindEffects.counterControlBonus, "Your bait works and you win the next grip exchange.");
}

function applyCounterPositionBonus(counterCard, actor, attackCard) {
  if (counterCard.id === "sprawl" && attackCard.type === "takedown") {
    setRelativePosition(state, actor, "Front Headlock", actionLine(actor, "sprawl behind the shot and claim front headlock", "sprawls behind the shot and claims front headlock"));
  }
}

function beats(counterCard, attackCard) {
  if (counterCard.id === "sprawl") return attackCard.type === "takedown";
  if (counterCard.id === "frame") return ["pass", "pressure"].includes(attackCard.type);
  if (counterCard.id === "protect-neck") return ["submission", "pressure"].includes(attackCard.type);
  return false;
}

function canPlay(card, actor) {
  const position = actor === "player" ? state.position : mirrorPosition(state.position);
  if (typeof isPositionHidden === "function" && isPositionHidden(position)) return false;
  return card.requires.includes(position);
}

function mirrorPosition(position) {
  const map = {
    "Top Guard": "Bottom Guard",
    "Bottom Guard": "Top Guard",
    "Top Half Guard": "Bottom Half Guard",
    "Bottom Half Guard": "Top Half Guard",
    "Side Control": "Under Side Control",
    "Under Side Control": "Side Control",
    "Mount": "Mounted",
    "Mounted": "Mount",
    "Back Control": "Back Taken",
    "Back Taken": "Back Control",
    "Front Headlock": "Caught Front Headlock",
    "Caught Front Headlock": "Front Headlock",
    "Ashi Garami": "Caught Ashi Garami",
    "Caught Ashi Garami": "Ashi Garami",
    "Turtle": "Turtle"
  };
  return map[position] || position;
}

function moveToTopGuard(state, actor, points) {
  score(state, actor, points);
  setRelativePosition(state, actor, "Top Guard", actionLine(actor, "blast through a double leg", "blasts through a double leg"));
}

function passGuard(state, actor, nextPosition, points) {
  score(state, actor, points);
  setRelativePosition(state, actor, nextPosition, actionLine(actor, "cut through with a knee slice", "cuts through with a knee slice"));
}

function takedownTo(state, actor, relativePosition, points, playerPhrase, opponentPhrase) {
  score(state, actor, points);
  setRelativePosition(state, actor, relativePosition, actionLine(actor, playerPhrase, opponentPhrase));
}

function passTo(state, actor, relativePosition, points, playerPhrase, opponentPhrase) {
  score(state, actor, points);
  setRelativePosition(state, actor, relativePosition, actionLine(actor, playerPhrase, opponentPhrase));
}

function sweepTo(state, actor, relativePosition, points, playerPhrase, opponentPhrase) {
  score(state, actor, points);
  setRelativePosition(state, actor, relativePosition, actionLine(actor, playerPhrase, opponentPhrase));
}

function conditionalBackTake(state, actor, playerPhrase, opponentPhrase) {
  const styleEdge = actor === "player" && state.style?.id === "back-hunter" ? 1 : 0;
  const success = state[actor].stamina + styleEdge >= state[other(actor)].stamina;
  if (success) {
    score(state, actor, 4);
    setRelativePosition(state, actor, "Back Control", actionLine(actor, playerPhrase, opponentPhrase));
  } else {
    addControl(state, actor, 1, actionLine(actor, "almost cut the angle", "almost cuts the angle"));
  }
}

function hasControlEdge(state, actor) {
  return actor === "player" ? state.control > 0 : state.control < 0;
}

function escapeTowardGuard(state, actor) {
  const stepMap = {
    "Mounted":            "Bottom Half Guard",
    "Under Side Control": "Bottom Half Guard",
    "Bottom Half Guard":  "Bottom Guard",
    "Caught Ashi Garami": "Bottom Guard"
  };
  const relativePosition = actor === "player" ? state.position : mirrorPosition(state.position);
  let target = stepMap[relativePosition] || "Bottom Guard";

  // High control bonus: +2 or +3 control gives an extra escape step
  const actorControl = actor === "player" ? state.control : -state.control;
  if (actor === "player" && actorControl >= 2) {
    const bonusStep = {
      "Bottom Half Guard": "Bottom Guard",
      "Bottom Guard":      "Bottom Guard"
    };
    const bonusTarget = bonusStep[target];
    if (bonusTarget && bonusTarget !== target) {
      target = bonusTarget;
      addLog(state, `Your control advantage (+${actorControl}) powers through — extra escape step!`);
    }
  }

  setRelativePosition(state, actor, target, actionLine(actor, "create space with a hip escape", "creates space with a hip escape"));
}

function submissionAttack(state, actor, submissionName) {
  const attacker = state[actor];
  const details = submissionChanceDetails(actor, submissionName);
  const chance = details.chance;
  const roll = Math.floor(Math.random() * 100) + 1;
  const succeeded = roll <= chance;
  recordFinishAttempt(actor, submissionName, details, roll, succeeded);

  if (succeeded) {
    state.finished = true;
    const msg = typeof announceFinish === "function"
      ? announceFinish(nameOf(actor), submissionName)
      : `${nameOf(actor)} finishes the ${submissionName}. Tap!`;
    addLog(state, msg);
    state.result = buildResult(actor, `${submissionName} submission`, submissionName);
    if (typeof SFX !== "undefined") SFX.tapOut();
  } else {
    attacker.stamina = Math.max(0, attacker.stamina - 1);
    const article = /^[aeiou]/i.test(submissionName) ? "an" : "a";
    const msg = typeof announceSubmissionMiss === "function"
      ? announceSubmissionMiss(nameOf(actor), submissionName, roll, chance)
      : `${nameOf(actor)} attacks ${article} ${submissionName} [roll ${roll} vs ${chance}% needed] — ${nameOf(other(actor))} survives.`;
    addLog(state, msg);
    if (typeof SFX !== "undefined") SFX.submissionAttempt();
  }
}

function setPosition(state, position, message) {
  trackPosition(position);
  state.position = position;
  addLog(state, message);
}

function trackPosition(position) {
  if (!state.positionPath) state.positionPath = [];
  const lastPosition = state.positionPath[state.positionPath.length - 1];
  if (lastPosition === position) return;
  state.positionPath.push(position);
  if (state.positionPath.length > 4) state.positionPath.shift();
}

function positionPathHtml() {
  const path = state.positionPath?.length ? state.positionPath : [state.position];
  return path.map((position, index) => `
    <span class="${index === path.length - 1 ? "current" : ""}">${position}</span>
  `).join('<b aria-hidden="true">-&gt;</b>');
}

function setRelativePosition(state, actor, relativePosition, message) {
  setPosition(state, actor === "player" ? relativePosition : mirrorPosition(relativePosition), message);
}

function addControl(state, actor, amount, message) {
  const adjustedAmount = actor === "player" ? amount + controlSkillBonus(message) : amount;
  const direction = actor === "player" ? adjustedAmount : -amount;
  state.control = Math.max(-3, Math.min(3, state.control + direction));
  addLog(state, message);
}

function controlSkillBonus(message) {
  const text = String(message).toLowerCase();
  if (text.includes("pressure") && hasBonus("pressure")) return 1;
  if (text.includes("knee") && hasBonus("knee-slice")) return 1;
  if (text.includes("back") && hasBonus("back-control")) return 1;
  if (text.includes("frame") && hasBonus("frames")) return 1;
  if (text.includes("front headlock") && hasBonus("front-headlock")) return 1;
  if (text.includes("ashi") && hasBonus("ashi")) return 1;
  return 0;
}

function drainStamina(state, actor, amount) {
  state[actor].stamina = Math.max(0, state[actor].stamina - amount);
}

function spendStamina(actor, amount) {
  state[actor].stamina = Math.max(0, state[actor].stamina - amount);
}

function recoverStandingStamina() {
  if (state.position !== "Standing") return;
  state.player.stamina = Math.min(getMaxStamina("player"), state.player.stamina + 1);
  state.opponent.stamina = Math.min(MAX_STAMINA, state.opponent.stamina + 1);
}

function score(state, actor, points) {
  state[actor].points += points;
  if (actor === "player" && points > 0 && typeof SFX !== "undefined") SFX.scorePoints();
}

function endByPoints() {
  state.finished = true;
  if (state.player.points > state.opponent.points) {
    addLog(state, `Time. You win ${state.player.points}-${state.opponent.points}.`);
    state.result = buildResult("player", "points decision");
  } else if (state.opponent.points > state.player.points) {
    addLog(state, `Time. ${state.ai.name} wins ${state.opponent.points}-${state.player.points}.`);
    state.result = buildResult("opponent", "points decision");
  } else {
    addLog(state, `Time. Draw at ${state.player.points}-${state.opponent.points}.`);
    state.result = buildResult("draw", "time-limit draw");
  }
}

function buildResult(winner, method, finishName = "") {
  const playerWon = winner === "player";
  const opponentWon = winner === "opponent";
  const xp = playerWon ? 25 + state.player.points * 2 : winner === "draw" ? 8 : 4 + state.player.points;
  const title = playerWon ? "Victory" : opponentWon ? "Defeat" : "Draw";
  const detail = playerWon
    ? `You win by ${method}. ${finishName ? "Clean finish." : "Good mat control."}`
    : opponentWon
      ? `${state.ai.name} wins by ${method}. Adjust the game plan and run it back.`
      : "Time expires with the score tied. Close roll.";

  return {
    title,
    detail,
    score: `${state.player.points}-${state.opponent.points}`,
    xp
  };
}

function submissionSkillBonus(submissionName) {
  const name = submissionName.toLowerCase();
  let bonus = 0;
  if (name.includes("armbar") && hasBonus("armbar")) bonus += 10;
  if (name.includes("triangle") && hasBonus("triangle")) bonus += 10;
  if (name.includes("choke") && hasBonus("chokes")) bonus += 8;
  if (name.includes("guillotine") && hasBonus("front-headlock")) bonus += 8;
  if (name.includes("rear naked") && hasBonus("rnc")) bonus += 12;
  return bonus;
}

function addLog(state, message) {
  state.log.unshift(message);
}

function nameOf(actor) {
  return actor === "player" ? "You" : state.ai.name;
}

function actionLine(actor, playerPhrase, opponentPhrase) {
  return actor === "player" ? `You ${playerPhrase}` : `${state.ai.name} ${opponentPhrase}`;
}

function other(actor) {
  return actor === "player" ? "opponent" : "player";
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

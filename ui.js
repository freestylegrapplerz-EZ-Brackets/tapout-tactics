// Split from the original prototype script. Keep load order in index.html.

const els = {
  playerPoints: document.getElementById("playerPoints"),
  opponentPoints: document.getElementById("opponentPoints"),
  turnCount: document.getElementById("turnCount"),
  playerStaminaBar: document.getElementById("playerStaminaBar"),
  opponentStaminaBar: document.getElementById("opponentStaminaBar"),
  playerStaminaText: document.getElementById("playerStaminaText"),
  opponentStaminaText: document.getElementById("opponentStaminaText"),
  positionName: document.getElementById("positionName"),
  positionPath: document.getElementById("positionPath"),
  controlText: document.getElementById("controlText"),
  opponentName: document.getElementById("opponentName"),
  actionBanner: document.getElementById("actionBanner"),
  matCanvas: document.getElementById("matCanvas"),
  matScene: document.getElementById("matScene"),
  intentText: document.getElementById("intentText"),
  styleButtons: document.getElementById("styleButtons"),
  mindGameButtons: document.getElementById("mindGameButtons"),
  mindGameStatus: document.getElementById("mindGameStatus"),
  resultOverlay: document.getElementById("resultOverlay"),
  resultTitle: document.getElementById("resultTitle"),
  resultDetails: document.getElementById("resultDetails"),
  resultScore: document.getElementById("resultScore"),
  resultStyle: document.getElementById("resultStyle"),
  resultXp: document.getElementById("resultXp"),
  reviewVerdict: document.getElementById("reviewVerdict"),
  reviewGrade: document.getElementById("reviewGrade"),
  reviewSummary: document.getElementById("reviewSummary"),
  reviewNotes: document.getElementById("reviewNotes"),
  reviewTimeline: document.getElementById("reviewTimeline"),
  skillPointText: document.getElementById("skillPointText"),
  skillTree: document.getElementById("skillTree"),
  poseLibraryButtons: document.getElementById("poseLibraryButtons"),
  exitPosePreviewButton: document.getElementById("exitPosePreviewButton"),
  beltName: document.getElementById("beltName"),
  beltGraphic: document.getElementById("beltGraphic"),
  xpText: document.getElementById("xpText"),
  nextBeltText: document.getElementById("nextBeltText"),
  xpBar: document.getElementById("xpBar"),
  rematchButton: document.getElementById("rematchButton"),
  nextMatchButton: document.getElementById("nextMatchButton"),
  log: document.getElementById("log"),
  cardHand: document.getElementById("cardHand"),
  newMatchButton: document.getElementById("newMatchButton")
};


function render() {
  renderStyleButtons();
  renderMindGameButtons();
  els.playerPoints.textContent = state.player.points;
  els.opponentPoints.textContent = state.opponent.points;
  els.turnCount.textContent = Math.min(state.turn, MAX_TURNS);
  els.playerStaminaBar.style.width = `${(state.player.stamina / getMaxStamina("player")) * 100}%`;
  els.opponentStaminaBar.style.width = `${state.opponent.stamina * 10}%`;
  els.playerStaminaText.textContent = `${state.player.stamina} stamina`;
  els.opponentStaminaText.textContent = `${state.opponent.stamina} stamina`;
  els.positionName.textContent = state.position;
  els.positionPath.innerHTML = positionPathHtml();
  els.opponentName.textContent = state.ai.name;
  els.controlText.textContent = controlLabel();
  els.log.innerHTML = state.log.slice(0, 7).map((entry) => `<div>${entry}</div>`).join("");
  els.actionBanner.textContent = previewPose ? `Previewing ${poseLabel(previewPose)}` : state.animating ? `Executing ${state.animation.card.name}...` : state.log[0];
  els.matCanvas.className = previewPose ? "mat-canvas pose-preview" : matCanvasClass();
  els.matScene.innerHTML = previewPose ? poseSceneSvg(previewPose, { title: poseLabel(previewPose), note: "Pose Library Preview" }) : state.animating ? techniqueAnimationSvg(state.animation) : matSceneSvg(state.position);
  els.intentText.textContent = intentText(state.intentCard);
  renderProgression();
  renderSkillTree();
  renderPoseLibraryButtons();
  renderResult();
  renderHand();
}

function matCanvasClass() {
  const position = state.animating ? state.animation.fromPosition : state.position;
  const moveType = state.animating ? state.animation.card.type : state.lastMoveType;
  return `mat-canvas position-${slugify(position)}${moveType ? ` move-${moveType}` : ""}${state.animating ? " technique-playing" : ""}`;
}

function renderStyleButtons() {
  els.styleButtons.innerHTML = "";
  playerStyles.forEach((style) => {
    const button = document.createElement("button");
    button.className = `style-button${style.id === selectedStyleId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${style.name}</strong><small>${style.summary}</small>`;
    button.addEventListener("click", () => {
      selectedStyleId = style.id;
      newMatch();
    });
    els.styleButtons.appendChild(button);
  });
}

function renderMindGameButtons() {
  els.mindGameButtons.innerHTML = "";
  const activeMindGame = mindGames.find((mindGame) => mindGame.id === selectedMindGameId) || mindGames[0];
  els.mindGameStatus.textContent = `Read: ${activeMindGame.name}`;

  mindGames.forEach((mindGame) => {
    const button = document.createElement("button");
    button.className = `mind-game-button${mindGame.id === selectedMindGameId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${mindGame.name}</strong><small>${mindGame.summary}</small>`;
    button.addEventListener("click", () => {
      selectedMindGameId = mindGame.id;
      newMatch();
    });
    els.mindGameButtons.appendChild(button);
  });
}

function intentText(card) {
  if (!card || state.finished) return "Match is over.";
  const intentByType = {
    setup: `${state.ai.name} is hand fighting for ${card.name}.`,
    takedown: `${state.ai.name} is loading up a takedown.`,
    counter: `${state.ai.name} looks ready to counter.`,
    pass: `${state.ai.name} is trying to pass.`,
    pressure: `${state.ai.name} is pressuring forward.`,
    escape: `${state.ai.name} is looking for space.`,
    guard: `${state.ai.name} is setting a guard attack.`,
    submission: `${state.ai.name} is hunting a finish.`,
    recovery: `${state.ai.name} may slow down and recover.`
  };
  return intentByType[card.type] || `${state.ai.name} is adjusting.`;
}

function renderResult() {
  if (!state.result || state.animating) {
    els.resultOverlay.hidden = true;
    return;
  }

  awardMatchXp();
  const review = finalizeMatchReview();

  els.resultTitle.textContent = state.result.title;
  els.resultDetails.textContent = state.result.detail;
  els.resultScore.textContent = `Score ${state.result.score}`;
  els.resultStyle.textContent = `Style: ${state.style.name}`;
  els.resultXp.textContent = `+${state.result.xp} XP (${playerXp} total)`;
  renderMatchReview(review);
  els.resultOverlay.hidden = false;
}

function renderMatchReview(review) {
  if (!review) return;
  els.reviewVerdict.textContent = review.verdict;
  els.reviewGrade.textContent = review.grade;
  els.reviewSummary.innerHTML = `
    <span>${review.turns.length} turns</span>
    <span>${review.result.finalPosition}</span>
    <span>${review.result.finalPath.join(" -> ")}</span>
  `;
  els.reviewNotes.innerHTML = review.notes.map((note) => `
    <article>
      <strong>${escapeHtml(note.title)}</strong>
      <p>${escapeHtml(note.text)}</p>
    </article>
  `).join("");
  els.reviewTimeline.innerHTML = review.turns.map(turnReviewHtml).join("");
}

function turnReviewHtml(turn) {
  const chain = turn.chain ? `<span class="timeline-chain">${escapeHtml(turn.chain.label)}${turn.chain.submission ? `, +${turn.chain.submission}% finish` : ""}${turn.chain.control ? `, +${turn.chain.control} control` : ""}</span>` : "";
  const attempts = turn.finishAttempts.map((attempt) => `
    <span class="${attempt.succeeded ? "finish-made" : "finish-missed"}">
      ${escapeHtml(attempt.attacker)} ${escapeHtml(attempt.submissionName)}: roll ${attempt.roll} vs ${chanceText(attempt.chance)}
    </span>
  `).join("");
  const pointSwing = turn.after.playerPoints !== turn.before.playerPoints || turn.after.opponentPoints !== turn.before.opponentPoints
    ? `<span>Score ${turn.before.playerPoints}-${turn.before.opponentPoints} -> ${turn.after.playerPoints}-${turn.after.opponentPoints}</span>`
    : "";

  return `
    <article class="timeline-turn">
      <div>
        <strong>Turn ${turn.turn}: ${escapeHtml(turn.playerCard.name)} vs ${escapeHtml(turn.opponentCard.name)}</strong>
        <small>${escapeHtml(turn.fromPosition)} -> ${escapeHtml(turn.toPosition)}</small>
      </div>
      <div class="timeline-details">
        <span>Stamina ${turn.before.playerStamina}-${turn.before.opponentStamina} -> ${turn.after.playerStamina}-${turn.after.opponentStamina}</span>
        <span>Control ${turn.before.control} -> ${turn.after.control}</span>
        ${pointSwing}
        ${chain}
        ${attempts}
      </div>
    </article>
  `;
}

function chanceText(chance) {
  return chance >= 100 ? "100%+" : `${chance}%`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProgression() {
  const progress = getBeltProgress(playerXp);
  els.beltName.textContent = progress.current.name;
  els.xpText.textContent = `${playerXp} XP`;
  els.beltGraphic.innerHTML = beltGraphic(progress);
  els.nextBeltText.textContent = progress.next
    ? `${progress.currentProgress}/${progress.needed} XP to ${progress.next.name} - ${progress.stripes}/4 stripes`
    : "Max rank reached";
  els.xpBar.style.width = `${progress.percent}%`;
}

function renderSkillTree() {
  els.skillPointText.textContent = `${availableSkillPoints()} Skill Points`;
  els.skillTree.innerHTML = "";

  skillTree.forEach((branch) => {
    const branchEl = document.createElement("div");
    branchEl.className = "skill-branch";
    branchEl.innerHTML = `<h3>${branch.branch}</h3>`;

    branch.skills.forEach((skill) => {
      const unlocked = hasSkill(skill.id);
      const button = document.createElement("button");
      button.className = `skill-node${unlocked ? " unlocked" : ""}`;
      button.type = "button";
      button.disabled = unlocked || availableSkillPoints() < 1;
      button.innerHTML = `${unlocked ? "Unlocked: " : ""}${skill.name}<span>${skill.effect}</span>`;
      button.addEventListener("click", () => unlockSkill(skill.id));
      branchEl.appendChild(button);
    });

    els.skillTree.appendChild(branchEl);
  });
}

function renderPoseLibraryButtons() {
  els.exitPosePreviewButton.hidden = !previewPose;
  els.poseLibraryButtons.innerHTML = "";
  poseLibraryList.forEach((item) => {
    const button = document.createElement("button");
    button.className = `pose-button${previewPose === item.pose ? " active" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    button.addEventListener("click", () => {
      previewPose = item.pose;
      render();
    });
    els.poseLibraryButtons.appendChild(button);
  });
}

function pulseMat() {
  els.matCanvas.classList.remove("pulse-action");
  void els.matCanvas.offsetWidth;
  els.matCanvas.classList.add("pulse-action");
}

function beltGraphic({ current, stripes }) {
  const stripeHtml = Array.from({ length: stripes }, () => `<span class="stripe"></span>`).join("");
  return `
    <div class="rank-belt ${current.short}-belt" style="--belt-color: ${current.color}">
      <div class="rank-bar">${stripeHtml}</div>
    </div>
  `;
}


function controlLabel() {
  if (state.control > 0) return `You have +${state.control} control`;
  if (state.control < 0) return `${state.ai.name} has +${Math.abs(state.control)} control`;
  return "Neutral control";
}

function slugify(value) {
  return value.toLowerCase().replaceAll(" ", "-");
}

const intentMetaByType = {
  submission: { label: "Finish", className: "finish" },
  pass: { label: "Control", className: "control" },
  pressure: { label: "Control", className: "control" },
  setup: { label: "Setup", className: "setup" },
  takedown: { label: "Setup", className: "setup" },
  guard: { label: "Setup", className: "setup" },
  counter: { label: "Counter", className: "counter" },
  escape: { label: "Escape", className: "escape" },
  recovery: { label: "Reset", className: "reset" }
};

const defaultStrategyByType = {
  submission: {
    threat: "Finish Threat 3/3",
    stat: "35% base finish chance",
    strong: "Boosted by control, fatigue, skills, and chains",
    risk: "Miss costs 1 extra stamina",
    leads: ["Tapout"]
  },
  takedown: {
    threat: "Entry Threat 2/3",
    stat: "Scores 2 points",
    strong: "Starts your top game",
    risk: "Weak into Sprawl",
    leads: ["Top Half Guard", "Passing"]
  },
  pass: {
    threat: "Control Threat 2/3",
    stat: "Scores on position advance",
    strong: "Builds dominant control",
    risk: "Weak into frames and guard recovery",
    leads: ["Side Control", "Mount"]
  },
  pressure: {
    threat: "Pressure Tool 2/3",
    stat: "+1 control",
    strong: "Drains stamina and raises finish odds",
    risk: "Low score if they escape",
    leads: ["Better Finish Odds"]
  },
  guard: {
    threat: "Reversal Threat 2/3",
    stat: "Creates sweeps, back takes, or guard attacks",
    strong: "Punishes forward pressure",
    risk: "Weak if posture wins",
    leads: ["Top Position", "Submissions"]
  },
  setup: {
    threat: "Chain Starter 1/3",
    stat: "Builds control or posture advantage",
    strong: "Opens stronger next-turn cards",
    risk: "Low immediate scoring value",
    leads: ["Combos"]
  },
  counter: {
    threat: "Counter Window 2/3",
    stat: "Stops the right attack",
    strong: "Punishes predictable offense",
    risk: "Low value if opponent ignores it",
    leads: ["Control Swing"]
  },
  escape: {
    threat: "Survival Tool 1/3",
    stat: "Improves bad positions",
    strong: "Stops opponent momentum",
    risk: "Usually does not score",
    leads: ["Guard Recovery", "Neutral"]
  },
  recovery: {
    threat: "Reset 1/3",
    stat: "+2 stamina",
    strong: "Sets up a bigger next turn",
    risk: "Gives up a little control",
    leads: ["More Stamina"]
  }
};

const cardStrategyNotes = {
  "collar-tie": {
    threat: "Grip Fight 1/3",
    stat: "+1 control, -1 opponent stamina",
    strong: "Feeds Snapdown and Arm Drag chains",
    risk: "No score unless you follow up",
    leads: ["Snapdown", "Arm Drag"]
  },
  "snapdown": {
    threat: "Chain Starter 2/3",
    stat: "+1 control and Front Headlock",
    strong: "Turns posture breaks into chokes",
    risk: "Weak if they hand fight free",
    leads: ["Front Headlock", "Guillotine", "Anaconda"]
  },
  "headlock-pressure": {
    threat: "Control Lock 2/3",
    stat: "+1 control, -1 opponent stamina",
    strong: "Makes front headlock finishes scarier",
    risk: "Loses value if they square up",
    leads: ["Guillotine", "D'Arce", "Anaconda"]
  },
  "guillotine": {
    threat: "Finish Threat 3/3",
    stat: "35% base finish chance",
    strong: "Strong vs tired opponents and Front Headlock",
    risk: "Fails if head control escapes",
    flavor: "Crushes opponents who leave their head exposed.",
    leads: ["Tapout"]
  },
  "darce": {
    strong: "Strong after Snapdown or heavy passing",
    risk: "Needs head-and-arm control",
    leads: ["Tapout"]
  },
  "anaconda": {
    strong: "Strong after Snapdown pressure",
    risk: "Fails if they flatten out or clear the arm",
    leads: ["Tapout"]
  },
  "double-leg": {
    stat: "Scores 2 points into Top Half Guard",
    strong: "Explosive when opponent is low on stamina",
    risk: "Loses hard to Sprawl",
    leads: ["Top Half Guard", "Body Lock Pass", "Knee Slice"]
  },
  "single-leg": {
    stat: "Scores 2 points into Top Half Guard",
    strong: "Pairs with Body Lock Pass",
    risk: "Can stall if opponent sprawls",
    leads: ["Top Half Guard", "Body Lock Pass"]
  },
  "sprawl": {
    stat: "Counters takedowns",
    strong: "Best when opponent wants wrestling",
    risk: "Weak if they choose guard or setup",
    leads: ["Control Swing", "Front Headlock Pressure"]
  },
  "guard-pull": {
    stat: "Safe entry to Bottom Guard",
    strong: "Turns standing into guard attacks",
    risk: "No points gained",
    leads: ["Triangle", "Armbar", "Sweeps"]
  },
  "arm-drag": {
    stat: "Back take if stamina is equal or better",
    strong: "Strong after Wrist Control",
    risk: "Misses if you are behind on stamina",
    leads: ["Back Control", "Rear Naked Choke"]
  },
  "knee-slice": {
    stat: "Scores 3 points into Side Control",
    strong: "Pairs with Mount",
    risk: "Weak into Frame",
    leads: ["Side Control", "Mount", "Arm Triangle"]
  },
  "torreando": {
    stat: "Scores 3 points into Side Control",
    strong: "Strong against open guard legs",
    risk: "Weak if hips recover first",
    leads: ["Side Control", "Knee On Belly"]
  },
  "leg-drag": {
    stat: "Scores 3 points into Side Control",
    strong: "Threatens back exposure",
    risk: "Needs leg control to stick",
    leads: ["Side Control", "Back Control"]
  },
  "body-lock-pass": {
    stat: "+1 control and scores 3",
    strong: "Heavy against guard players",
    risk: "Costs tempo if they frame early",
    leads: ["Side Control", "Mount"]
  },
  "mount": {
    stat: "Scores 4 points",
    strong: "Opens high-value finishes",
    risk: "Bridge and elbow escape can reset it",
    leads: ["Arm Triangle", "Armbar"]
  },
  "closed-guard-sweep": {
    stat: "Scores 2 and lands in Mount",
    strong: "Immediately creates armbar danger",
    risk: "Needs broken posture",
    leads: ["Mount", "Armbar"]
  },
  "hip-bump-sweep": {
    stat: "Scores 2 and lands in Mount",
    strong: "Explosive vs leaning opponents",
    risk: "Weak if opponent stays low and posted",
    leads: ["Mount", "Armbar"]
  },
  "scissor-sweep": {
    stat: "Scores 2 into Top Guard",
    strong: "Turns guard into passing pressure",
    risk: "Needs collar-and-sleeve control",
    leads: ["Top Guard", "Knee Slice"]
  },
  "butterfly-sweep": {
    stat: "Scores 2 into Top Half Guard",
    strong: "Creates ankle lock follow-ups",
    risk: "Needs hooks and posture control",
    leads: ["Top Half Guard", "Straight Ankle Lock"]
  },
  "old-school-sweep": {
    stat: "Scores 2 into Top Half Guard",
    strong: "Strong from half guard scrambles",
    risk: "Can expose leg lock counters",
    leads: ["Top Half Guard", "Heel Hook"]
  },
  "straight-ankle-lock": {
    strong: "Strong after Butterfly Sweep or Ashi Garami",
    risk: "Fails if the leg slips free",
    leads: ["Tapout"]
  },
  "heel-hook": {
    threat: "Finish Threat 3/3",
    stat: "35% base finish chance",
    strong: "Very strong vs tired opponents",
    risk: "High stamina cost if it misses",
    leads: ["Tapout"]
  },
  "hip-escape": {
    stat: "Recovers one step toward guard",
    strong: "Best before control snowballs",
    risk: "Does not score",
    leads: ["Bottom Half Guard", "Bottom Guard"]
  },
  "elbow-escape": {
    stat: "Escapes Mount to Bottom Half Guard",
    strong: "Stops mount pressure",
    risk: "Still leaves you underneath",
    leads: ["Bottom Half Guard", "Recover Guard"]
  },
  "bridge": {
    stat: "Explodes Mount into Bottom Half Guard",
    strong: "Best when opponent is high in mount",
    risk: "Costs 2 stamina from a bad spot",
    leads: ["Bottom Half Guard", "Recover Guard"]
  },
  "hand-fight": {
    stat: "Escapes back to Standing",
    strong: "Best vs Back Control or Front Headlock",
    risk: "No score, pure survival",
    leads: ["Standing"]
  },
  "protect-neck": {
    stat: "Reduces opponent control",
    strong: "Buys time against chokes",
    risk: "Does not improve position by itself",
    leads: ["Hand Fight", "Escape"]
  }
};

function cardIntent(card) {
  return intentMetaByType[card.type] || { label: "Move", className: "setup" };
}

function cardStrategy(card) {
  return {
    ...(defaultStrategyByType[card.type] || defaultStrategyByType.setup),
    ...(cardStrategyNotes[card.id] || {})
  };
}

function chainBonusText(rule) {
  const parts = [];
  if (rule.submission) parts.push(`+${rule.submission}% finish`);
  if (rule.control) parts.push(`+${rule.control} control`);
  return parts.join(", ");
}

function outgoingChainHints(cardId) {
  return Object.entries(chainRules)
    .filter(([key]) => key.startsWith(`${cardId}>`))
    .map(([key, rule]) => {
      const nextId = key.split(">")[1];
      const nextCard = cards.find((candidate) => candidate.id === nextId);
      const nextName = nextCard ? nextCard.name : nextId;
      return `${nextName}: ${chainBonusText(rule)}`;
    })
    .slice(0, 2);
}

function chipsHtml(items, className) {
  return items.map((item) => `<span class="${className}">${item}</span>`).join("");
}

function renderHand() {
  els.cardHand.innerHTML = "";
  state.hand.forEach((card) => {
    const button = document.createElement("button");
    button.className = "card";
    button.type = "button";
    button.dataset.type = card.type;
    button.disabled = state.finished || state.animating || state.player.stamina < effectiveCardCost(card, "player");
    const intent = cardIntent(card);
    const strategy = cardStrategy(card);
    const chain = getChainBonus(state.lastPlayerCardId, card.id);
    const chainHints = outgoingChainHints(card.id);
    button.innerHTML = `
      <div class="card-art" aria-hidden="true">${cardArt(card)}</div>
      <div class="card-body">
        <div class="card-kicker">
          <span class="intent-badge intent-${intent.className}">${intent.label}</span>
          <span class="threat-label">${strategy.threat}</span>
        </div>
        <span class="card-cost">${card.type} - ${effectiveCardCost(card, "player")} stamina</span>
        <strong>${card.name}</strong>
        <p>${strategy.flavor || card.text}</p>
        <div class="card-strategy">
          <span>${strategy.stat}</span>
          <span>${strategy.strong}</span>
          <span>${strategy.risk}</span>
        </div>
        <div class="card-leads">
          <span class="card-section-label">Success Leads To</span>
          <div class="lead-chips">${chipsHtml(strategy.leads, "lead-chip")}</div>
        </div>
        ${chain ? `<div class="active-combo">Active Combo: ${chain.label} (${chainBonusText(chain)})</div>` : ""}
        ${chainHints.length ? `<div class="card-combo"><span class="card-section-label">Combos Next</span><div>${chipsHtml(chainHints, "combo-chip")}</div></div>` : ""}
        <small>Works from: ${card.requires.join(", ")}</small>
      </div>
    `;
    button.addEventListener("click", () => playTurn(card.id));
    els.cardHand.appendChild(button);
  });
}

function cardArt(card) {
  const artByType = {
    setup: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="46" cy="28" r="10" fill="#dff8e8"/>
        <circle cx="94" cy="28" r="10" fill="#ffd5cf"/>
        <path d="M52 40 C63 52 77 52 88 40" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <path d="M58 44 L82 44" stroke="#f3c76b" stroke-width="8" stroke-linecap="round"/>
        <path d="M38 46 L24 62 M102 46 L116 62" stroke="#ffd5cf" stroke-width="7" stroke-linecap="round"/>
        <path d="M66 24 C72 14 82 14 88 24" fill="none" stroke="#8fe6b1" stroke-width="5" stroke-linecap="round"/>
      </svg>`,
    takedown: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="38" cy="22" r="10" fill="#dff8e8"/>
        <circle cx="98" cy="22" r="10" fill="#ffd5cf"/>
        <path d="M42 34 C58 45 73 49 92 42" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <path d="M98 34 L86 60" stroke="#ffd5cf" stroke-width="10" stroke-linecap="round"/>
        <path d="M52 50 L30 64 M58 52 L78 66" stroke="#dff8e8" stroke-width="8" stroke-linecap="round"/>
        <path d="M83 43 L112 54" stroke="#ffd5cf" stroke-width="8" stroke-linecap="round"/>
      </svg>`,
    guard: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="70" cy="52" r="10" fill="#dff8e8"/>
        <path d="M42 58 C58 42 82 42 98 58" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <circle cx="70" cy="24" r="10" fill="#ffd5cf"/>
        <path d="M70 34 L70 56" stroke="#ffd5cf" stroke-width="12" stroke-linecap="round"/>
        <path d="M52 38 L34 25 M88 38 L106 25" stroke="#dff8e8" stroke-width="8" stroke-linecap="round"/>
      </svg>`,
    counter: `
      <svg viewBox="0 0 140 80" role="img">
        <path d="M31 42 C48 20 72 18 91 34" fill="none" stroke="#ffd5cf" stroke-width="9" stroke-linecap="round"/>
        <path d="M48 50 L92 32" stroke="#dff8e8" stroke-width="12" stroke-linecap="round"/>
        <circle cx="38" cy="54" r="10" fill="#dff8e8"/>
        <circle cx="98" cy="29" r="10" fill="#ffd5cf"/>
        <path d="M75 17 L96 17 L88 7" fill="none" stroke="#f3c76b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    pass: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="48" cy="26" r="10" fill="#dff8e8"/>
        <path d="M52 38 L78 50 L104 42" fill="none" stroke="#dff8e8" stroke-width="11" stroke-linecap="round"/>
        <circle cx="88" cy="56" r="9" fill="#ffd5cf"/>
        <path d="M50 62 C68 44 92 42 112 58" fill="none" stroke="#ffd5cf" stroke-width="9" stroke-linecap="round"/>
        <path d="M70 26 L96 18" stroke="#67d391" stroke-width="6" stroke-linecap="round"/>
      </svg>`,
    pressure: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="56" cy="25" r="10" fill="#dff8e8"/>
        <path d="M58 36 C72 49 88 50 104 42" fill="none" stroke="#dff8e8" stroke-width="13" stroke-linecap="round"/>
        <circle cx="85" cy="58" r="9" fill="#ffd5cf"/>
        <path d="M44 61 L112 61" stroke="#ffd5cf" stroke-width="10" stroke-linecap="round"/>
        <path d="M67 42 L92 56" stroke="#67d391" stroke-width="7" stroke-linecap="round"/>
      </svg>`,
    escape: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="56" cy="56" r="10" fill="#dff8e8"/>
        <path d="M42 58 C58 45 75 43 94 54" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <circle cx="90" cy="28" r="10" fill="#ffd5cf"/>
        <path d="M88 38 L70 54" stroke="#ffd5cf" stroke-width="10" stroke-linecap="round"/>
        <path d="M36 35 C25 43 25 58 37 66" fill="none" stroke="#6fa8ff" stroke-width="6" stroke-linecap="round"/>
        <path d="M33 34 L47 35 L39 23" fill="none" stroke="#6fa8ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    submission: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="58" cy="42" r="10" fill="#dff8e8"/>
        <circle cx="88" cy="42" r="10" fill="#ffd5cf"/>
        <path d="M48 55 C62 23 87 23 102 55" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <path d="M68 40 L96 40" stroke="#f06a5f" stroke-width="8" stroke-linecap="round"/>
        <path d="M52 60 L38 70 M99 60 L113 70" stroke="#ffd5cf" stroke-width="7" stroke-linecap="round"/>
      </svg>`,
    recovery: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="70" cy="28" r="12" fill="#dff8e8"/>
        <path d="M70 42 L70 62" stroke="#dff8e8" stroke-width="12" stroke-linecap="round"/>
        <path d="M50 50 L35 38 M90 50 L105 38" stroke="#dff8e8" stroke-width="8" stroke-linecap="round"/>
        <path d="M34 22 C45 10 59 9 70 19 C81 9 95 10 106 22" fill="none" stroke="#f3c76b" stroke-width="6" stroke-linecap="round"/>
      </svg>`
  };

  return artByType[card.type] || artByType.recovery;
}


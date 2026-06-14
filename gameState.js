// Split from the original prototype script. Keep load order in index.html.

const MAX_STAMINA = 10;
const MAX_TURNS = 12;
const BELTS = [
  { name: "White Belt", short: "white", color: "#f7f7f2", xp: 0 },
  { name: "Blue Belt", short: "blue", color: "#3151df", xp: 100 },
  { name: "Purple Belt", short: "purple", color: "#7932c8", xp: 260 },
  { name: "Brown Belt", short: "brown", color: "#8b5524", xp: 520 },
  { name: "Black Belt", short: "black", color: "#050505", xp: 900 },
  { name: "Coral Belt", short: "coral", color: "#ed244f", xp: 1500 }
];
const XP_STORAGE_KEY = "tapoutTacticsXp";
const SKILL_STORAGE_KEY = "tapoutTacticsSkills";
const MATCH_REVIEW_STORAGE_KEY = "tapoutTacticsMatchReviews";
const XP_PER_LEVEL = 50;
const ANIMATION_MS = 4800;


const opponents = [
  {
    name: "The Wrestler",
    style: "Takedowns and top pressure",
    favoriteTypes: ["setup", "takedown", "pressure", "counter"]
  },
  {
    name: "Triangle Hunter",
    style: "Guard attacks and submissions",
    favoriteTypes: ["guard", "submission", "setup", "counter"]
  },
  {
    name: "Pressure Passer",
    style: "Passes, control, and stamina drain",
    favoriteTypes: ["pass", "pressure", "setup", "escape"]
  }
];

const playerStyles = [
  {
    id: "wrestler",
    name: "Wrestler",
    summary: "Shots, sprawls, snaps",
    cardTypes: ["setup", "takedown", "counter", "pressure"],
    keyCards: ["double-leg", "single-leg", "snapdown", "sprawl", "duck-under", "ankle-pick", "collar-tie", "guillotine", "hand-fight", "rest"]
  },
  {
    id: "guard-player",
    name: "Guard Player",
    summary: "Sweeps and traps",
    cardTypes: ["guard", "submission", "escape", "setup"],
    keyCards: ["guard-pull", "flower-sweep", "closed-guard-sweep", "hip-bump-sweep", "scissor-sweep", "butterfly-sweep", "triangle", "armbar", "kimura", "reguard", "rest"]
  },
  {
    id: "pressure-passer",
    name: "Pressure Passer",
    summary: "Pass, mount, smother",
    cardTypes: ["pass", "pressure", "submission", "setup"],
    keyCards: ["knee-slice", "body-lock-pass", "torreando", "leg-drag", "backstep-pass", "pressure", "mount", "arm-triangle", "kimura", "wrist-control", "rest"]
  },
  {
    id: "back-hunter",
    name: "Back Hunter",
    summary: "Angles and chokes",
    cardTypes: ["setup", "takedown", "guard", "submission", "escape"],
    keyCards: ["arm-drag", "duck-under", "slide-by", "snapdown", "rear-naked-choke", "guillotine", "hand-fight", "wrist-control", "collar-tie", "rest"]
  },
  {
    id: "leg-locker",
    name: "Leg Locker",
    summary: "Risky leg attacks",
    cardTypes: ["guard", "submission", "escape", "setup"],
    keyCards: ["guard-pull", "single-leg", "butterfly-sweep", "old-school-sweep", "straight-ankle-lock", "heel-hook", "reguard", "hand-fight", "wrist-control", "rest"]
  }
];

const mindGames = [
  {
    id: "composed-pressure",
    name: "Composed Pressure",
    summary: "Safe read. Start with +1 control.",
    log: "You stay relaxed, keep eye contact, and make the first grips feel heavy."
  },
  {
    id: "pace-breaker",
    name: "Pace Breaker",
    summary: "Tax their gas tank. Opponent starts -1 stamina, but attacks harder.",
    log: "You change tempo early and make them rush before they are ready."
  },
  {
    id: "bait-the-shot",
    name: "Bait The Shot",
    summary: "Counter style. Successful counters gain extra control.",
    log: "You give them a tempting look and wait for the overcommit."
  },
  {
    id: "redline-finish",
    name: "Redline Finish",
    summary: "Risky hunt. Submissions get +8%, but you start -1 stamina.",
    log: "You decide this round is about hunting the finish, even if it costs gas."
  }
];


let selectedStyleId = "wrestler";
let selectedMindGameId = "composed-pressure";
let playerXp = loadPlayerXp();
let unlockedSkills = loadUnlockedSkills();
let previewPose = null;


let state;


function newMatch() {
  previewPose = null;
  const opponent = opponents[Math.floor(Math.random() * opponents.length)];
  state = {
    ai: opponent,
    style: playerStyles.find((style) => style.id === selectedStyleId),
    mindGame: mindGames.find((mindGame) => mindGame.id === selectedMindGameId) || mindGames[0],
    mindEffects: {
      submissionBonus: 0,
      xpBonus: 0,
      counterControlBonus: 0,
      opponentAggressive: false
    },
    turn: 1,
    position: "Standing",
    positionPath: ["Standing"],
    control: 0,
    finished: false,
    result: null,
    xpAwarded: false,
    animating: false,
    animation: null,
    intentCard: null,
    lastPlayerCardId: null,
    lastMoveType: null,
    lastChain: null,
    turnFinishAttempts: [],
    matchReview: null,
    player: { points: 0, stamina: getMaxStamina("player") },
    opponent: { points: 0, stamina: MAX_STAMINA },
    hand: [],
    log: [`You slap hands with ${opponent.name}. Style: ${opponent.style}.`]
  };
  state.matchReview = createMatchReview();
  applyMindGameSetup();
  drawHand();
  prepareOpponentIntent();
  render();
}

function applyMindGameSetup() {
  addLog(state, state.mindGame.log);

  if (state.mindGame.id === "composed-pressure") {
    addControl(state, "player", 1, "Your calm pressure wins the first hand fight.");
  }

  if (state.mindGame.id === "pace-breaker") {
    state.opponent.stamina = Math.max(0, state.opponent.stamina - 1);
    state.mindEffects.opponentAggressive = true;
    addLog(state, `${state.ai.name} feels the pace change and starts forcing attacks.`);
  }

  if (state.mindGame.id === "bait-the-shot") {
    state.mindEffects.counterControlBonus = 1;
    addLog(state, "If you counter their first big mistake, you can take over the hand fight.");
  }

  if (state.mindGame.id === "redline-finish") {
    state.player.stamina = Math.max(0, state.player.stamina - 1);
    state.mindEffects.submissionBonus = 8;
    addLog(state, "Your finish threat is sharper, but the early intensity costs stamina.");
  }
}

function createMatchReview() {
  return {
    id: `match-${Date.now()}`,
    createdAt: new Date().toISOString(),
    opponent: state.ai.name,
    opponentStyle: state.ai.style,
    playerStyle: state.style.name,
    mindGame: state.mindGame.name,
    startingXp: playerXp,
    turns: [],
    finalized: false,
    result: null,
    notes: []
  };
}

function cardSnapshot(card, actor) {
  return {
    id: card.id,
    name: card.name,
    type: card.type,
    cost: actor === "player" ? effectiveCardCost(card, actor) : card.cost,
    intent: cardIntent(card).label
  };
}

function beginTurnReview(playerCard, opponentCard, fromPosition, chain, logStart) {
  return {
    turn: state.turn,
    fromPosition,
    playerCard: cardSnapshot(playerCard, "player"),
    opponentCard: cardSnapshot(opponentCard, "opponent"),
    chain: chain ? { label: chain.label, submission: chain.submission || 0, control: chain.control || 0 } : null,
    before: {
      control: state.control,
      playerStamina: state.player.stamina,
      opponentStamina: state.opponent.stamina,
      playerPoints: state.player.points,
      opponentPoints: state.opponent.points
    },
    after: null,
    finishAttempts: [],
    logs: [],
    logStart
  };
}

function finishTurnReview(turnReview) {
  const addedLogs = state.log.length - turnReview.logStart;
  turnReview.toPosition = state.position;
  turnReview.after = {
    control: state.control,
    playerStamina: state.player.stamina,
    opponentStamina: state.opponent.stamina,
    playerPoints: state.player.points,
    opponentPoints: state.opponent.points
  };
  turnReview.finishAttempts = [...(state.turnFinishAttempts || [])];
  turnReview.logs = state.log.slice(0, Math.max(0, addedLogs)).reverse();
  delete turnReview.logStart;
  state.matchReview.turns.push(turnReview);
}

function submissionChanceDetails(actor, submissionName) {
  const defender = state[other(actor)];
  const controlBonus = actor === "player" ? Math.max(0, state.control) : Math.max(0, -state.control);
  const staminaBonus = Math.max(0, 5 - defender.stamina);
  const chainBonus = actor === "player" ? state.lastChain?.submission || 0 : 0;
  const skillBonus = actor === "player" ? submissionSkillBonus(submissionName) : 0;
  const mindBonus = actor === "player" ? state.mindEffects?.submissionBonus || 0 : 0;
  const chance = 35 + controlBonus * 12 + staminaBonus * 8 + chainBonus + skillBonus + mindBonus;

  return {
    chance,
    controlBonus,
    staminaBonus,
    chainBonus,
    skillBonus,
    mindBonus
  };
}

function recordFinishAttempt(actor, submissionName, details, roll, succeeded) {
  if (!state.turnFinishAttempts) state.turnFinishAttempts = [];
  state.turnFinishAttempts.push({
    actor,
    attacker: nameOf(actor),
    submissionName,
    chance: details.chance,
    roll,
    succeeded,
    bonuses: {
      control: details.controlBonus,
      fatigue: details.staminaBonus,
      chain: details.chainBonus,
      skill: details.skillBonus,
      mindGame: details.mindBonus
    }
  });
}

function finalizeMatchReview() {
  if (!state.matchReview || state.matchReview.finalized) return state.matchReview;

  state.matchReview.finalized = true;
  state.matchReview.result = {
    title: state.result.title,
    detail: state.result.detail,
    score: state.result.score,
    xp: state.result.xp,
    finalPosition: state.position,
    finalPath: [...(state.positionPath || [])],
    totalXp: playerXp
  };
  state.matchReview.notes = buildCoachNotes(state.matchReview);
  state.matchReview.grade = matchReviewGrade(state.matchReview);
  state.matchReview.verdict = matchReviewVerdict(state.matchReview);
  saveMatchReview(state.matchReview);
  return state.matchReview;
}

function saveMatchReview(review) {
  try {
    const stored = JSON.parse(localStorage.getItem(MATCH_REVIEW_STORAGE_KEY) || "[]");
    const reviews = [review, ...stored.filter((item) => item.id !== review.id)].slice(0, 5);
    localStorage.setItem(MATCH_REVIEW_STORAGE_KEY, JSON.stringify(reviews));
  } catch (error) {
    console.warn("Could not save match review", error);
  }
}

function buildCoachNotes(review) {
  const playerFinishes = review.turns.flatMap((turn) => turn.finishAttempts.filter((attempt) => attempt.actor === "player"));
  const missedLowOdds = playerFinishes.filter((attempt) => !attempt.succeeded && attempt.chance < 55);
  const chainTurns = review.turns.filter((turn) => turn.chain);
  const dominantTurns = review.turns.filter((turn) => ["Front Headlock", "Side Control", "Mount", "Back Control"].includes(turn.toPosition));
  const recoveryTurns = review.turns.filter((turn) => turn.playerCard.type === "recovery");
  const escapeTurns = review.turns.filter((turn) => turn.playerCard.type === "escape");
  const notes = [];

  if (chainTurns.length) {
    notes.push({
      title: "Chain Game",
      text: `You triggered ${chainTurns.length} combo bonus${chainTurns.length === 1 ? "" : "es"}. Keep building setup into payoff instead of playing isolated attacks.`
    });
  } else {
    notes.push({
      title: "Missing Chains",
      text: "You did not trigger a combo bonus. Look for setup cards that feed the next turn, like Collar Tie into Snapdown or Guard Pull into Triangle."
    });
  }

  if (missedLowOdds.length) {
    notes.push({
      title: "Finish Timing",
      text: `${missedLowOdds.length} finish attempt${missedLowOdds.length === 1 ? " was" : "s were"} thrown before the odds were stacked. Build control or drain stamina first.`
    });
  } else if (playerFinishes.length) {
    notes.push({
      title: "Finish Discipline",
      text: "Your submission attempts came with decent support from position, control, or fatigue. That is the right direction."
    });
  } else {
    notes.push({
      title: "Low Finish Threat",
      text: "You did not threaten many submissions. If the match feels flat, add a clearer path from advantage to danger."
    });
  }

  if (dominantTurns.length) {
    notes.push({
      title: "Position Ladder",
      text: `You reached a strong attacking position ${dominantTurns.length} time${dominantTurns.length === 1 ? "" : "s"}. The next design goal is making those moments feel dangerous.`
    });
  } else {
    notes.push({
      title: "No Dominant Hold",
      text: "You never settled into Front Headlock, Side Control, Mount, or Back Control. The loop needs clearer ways to climb from neutral into danger."
    });
  }

  if (recoveryTurns.length || escapeTurns.length) {
    notes.push({
      title: "Defensive Choices",
      text: `You spent ${recoveryTurns.length + escapeTurns.length} turn${recoveryTurns.length + escapeTurns.length === 1 ? "" : "s"} surviving or recovering. Good if you were trapped, costly if you had attacking momentum.`
    });
  }

  return notes.slice(0, 4);
}

function matchReviewGrade(review) {
  let score = review.result?.title === "Victory" ? 40 : review.result?.title === "Draw" ? 24 : 12;
  score += Math.min(24, review.turns.filter((turn) => turn.chain).length * 12);
  score += Math.min(18, review.turns.filter((turn) => ["Front Headlock", "Side Control", "Mount", "Back Control"].includes(turn.toPosition)).length * 6);
  score += review.turns.some((turn) => turn.finishAttempts.some((attempt) => attempt.actor === "player" && attempt.succeeded)) ? 18 : 0;

  if (score >= 88) return "A";
  if (score >= 74) return "B";
  if (score >= 58) return "C";
  return "D";
}

function matchReviewVerdict(review) {
  const chains = review.turns.filter((turn) => turn.chain).length;
  const finishes = review.turns.flatMap((turn) => turn.finishAttempts.filter((attempt) => attempt.actor === "player"));
  if (review.result?.title === "Victory" && finishes.some((attempt) => attempt.succeeded)) return "Clean finish path";
  if (!chains) return "Build cleaner chains";
  if (!finishes.length) return "Turn control into danger";
  return "Sharpen the payoff";
}

function drawHand() {
  const playable = cards.filter((card) => canPlay(card, "player") && cardUnlocked(card));
  const rest = cards.find((card) => card.id === "rest");
  const playableTechniques = playable.filter((card) => card.id !== "rest");
  const affordableTechniques = playableTechniques.filter((card) => state.player.stamina >= effectiveCardCost(card, "player"));
  const styledPlayable = playableTechniques.filter((card) => isStyleCard(card, state.style));
  const poolBase = styledPlayable.length >= 3 ? weightedStylePool(playableTechniques, state.style) : playableTechniques;
  state.hand = drawUniqueCards(poolBase, 3);

  if (state.hand.length < 3 && rest && !state.hand.some((card) => card.id === "rest")) {
    state.hand.push(rest);
  }

  if ((!affordableTechniques.length || !state.hand.some((card) => state.player.stamina >= effectiveCardCost(card, "player"))) && rest) {
    state.hand = state.hand.filter((card) => card.id !== "rest");
    if (state.hand.length >= 3) {
      const replaceIndex = Math.max(0, state.hand.findIndex((card) => state.player.stamina < effectiveCardCost(card, "player")));
      state.hand[replaceIndex] = rest;
    } else {
      state.hand.push(rest);
    }
  }
}

function drawUniqueCards(pool, count) {
  const selected = [];
  const selectedIds = new Set();

  while (selected.length < count) {
    const available = pool.filter((card) => !selectedIds.has(card.id));
    if (!available.length) break;
    const card = available[Math.floor(Math.random() * available.length)];
    selected.push(card);
    selectedIds.add(card.id);
  }

  return selected;
}

function isStyleCard(card, style) {
  return style.keyCards.includes(card.id) || style.cardTypes.includes(card.type);
}

function weightedStylePool(playable, style) {
  const keyCards = playable.filter((card) => style.keyCards.includes(card.id));
  const typeCards = playable.filter((card) => style.cardTypes.includes(card.type));
  const extraStyleDraw = hasSkill("card-draw") ? [...keyCards, ...typeCards] : [];
  return [...keyCards, ...keyCards, ...keyCards, ...typeCards, ...extraStyleDraw, ...playable];
}

function cardUnlocked(card) {
  if (baseUnlockedCards.has(card.id)) return true;
  return skillTree.some((branch) =>
    branch.skills.some((skill) => unlockedSkills.includes(skill.id) && skill.unlocks?.includes(card.id))
  );
}

function hasSkill(skillId) {
  return unlockedSkills.includes(skillId);
}

function hasBonus(bonus) {
  return skillTree.some((branch) =>
    branch.skills.some((skill) => unlockedSkills.includes(skill.id) && skill.bonus === bonus)
  );
}

function effectiveCardCost(card, actor) {
  if (actor !== "player") return card.cost;
  let cost = card.cost;
  if (hasBonus("cost-reduction") && ["takedown", "pass", "escape"].includes(card.type)) cost -= 1;
  if (hasBonus("guard-recovery") && card.id === "reguard") cost -= 1;
  return Math.max(0, cost);
}

function getMaxStamina(actor) {
  if (actor === "player" && hasBonus("max-stamina")) return MAX_STAMINA + 2;
  return MAX_STAMINA;
}

function prepareOpponentIntent() {
  state.intentCard = chooseOpponentCard();
}

// Progression and persistent player state.
function awardMatchXp() {
  if (state.xpAwarded) return;
  playerXp += state.result.xp;
  savePlayerXp();
  state.xpAwarded = true;
  renderProgression();
}

function getBeltProgress(xp) {
  let current = BELTS[0];
  let next = null;

  for (let i = 0; i < BELTS.length; i++) {
    if (xp >= BELTS[i].xp) {
      current = BELTS[i];
      next = BELTS[i + 1] || null;
    }
  }

  if (!next) {
    return { current, next, currentProgress: 0, needed: 0, percent: 100, stripes: 4 };
  }

  const currentProgress = xp - current.xp;
  const needed = next.xp - current.xp;
  const percent = Math.max(0, Math.min(100, Math.round((currentProgress / needed) * 100)));
  const stripes = Math.min(4, Math.floor((currentProgress / needed) * 4));
  return { current, next, currentProgress, needed, percent, stripes };
}

function loadPlayerXp() {
  const stored = Number(localStorage.getItem(XP_STORAGE_KEY));
  return Number.isFinite(stored) && stored > 0 ? stored : 0;
}

function savePlayerXp() {
  localStorage.setItem(XP_STORAGE_KEY, String(playerXp));
}

function totalSkillPointsEarned() {
  return Math.floor(playerXp / XP_PER_LEVEL);
}

function availableSkillPoints() {
  return Math.max(0, totalSkillPointsEarned() - unlockedSkills.length);
}

function unlockSkill(skillId) {
  if (hasSkill(skillId) || availableSkillPoints() < 1) return;
  unlockedSkills.push(skillId);
  saveUnlockedSkills();
  drawHand();
  prepareOpponentIntent();
  render();
}

function loadUnlockedSkills() {
  try {
    const parsed = JSON.parse(localStorage.getItem(SKILL_STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUnlockedSkills() {
  localStorage.setItem(SKILL_STORAGE_KEY, JSON.stringify(unlockedSkills));
}

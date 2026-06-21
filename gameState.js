// Split from the original prototype script. Keep load order in index.html.

const MAX_STAMINA = 10;
const MAX_TURNS = 15;
const BELTS = [
  { name: "White Belt", short: "white", color: "#f7f7f2", xp: 0 },
  { name: "Blue Belt", short: "blue", color: "#3151df", xp: 100 },
  { name: "Purple Belt", short: "purple", color: "#7932c8", xp: 260 },
  { name: "Brown Belt", short: "brown", color: "#8b5524", xp: 520 },
  { name: "Black Belt", short: "black", color: "#050505", xp: 900 },
  { name: "Coral Belt", short: "coral", color: "#ed244f", xp: 1500 }
];
const XP_STORAGE_KEY = "tapoutTacticsXp";
const STYLE_PROGRESS_STORAGE_KEY = "tapoutTacticsStyleProgress";
const STYLE_ID_STORAGE_KEY = "tapoutTacticsStyleId";
const MATCH_REVIEW_STORAGE_KEY = "tapoutTacticsMatchReviews";
const VENUE_STORAGE_KEY = "tapoutTacticsVenue";
const ACHIEVEMENTS_KEY = "tapoutTacticsAchievements";
const WIN_STREAK_KEY = "tapoutTacticsWinStreak";
const XP_PER_LEVEL = 50;
const ANIMATION_MS = 3200;
const MIN_HAND_TECHNIQUES = 4;

const achievementDefs = [
  {
    id: "first-win",
    name: "First Tap",
    desc: "Win your first match.",
    icon: "🥋",
    check: (s, r) => r?.result?.title === "Victory"
  },
  {
    id: "first-sub",
    name: "Tap or Snap",
    desc: "Win by submission.",
    icon: "💀",
    check: (s, r) => r?.result?.title === "Victory" && r?.result?.detail?.includes("submission")
  },
  {
    id: "chain-reaction",
    name: "Chain Reaction",
    desc: "Land a chain combo in any match.",
    icon: "⛓️",
    check: (s, r) => r?.turns?.some((t) => t.chain)
  },
  {
    id: "adrenaline-perfect",
    name: "Adrenaline Junkie",
    desc: "Hit Perfect timing on Adrenaline Burst.",
    icon: "⚡",
    check: (s, r) => s?.gotPerfectAdrenaline === true
  },
  {
    id: "blue-belt",
    name: "Blue Belt",
    desc: "Earn your Blue Belt.",
    icon: "🔵",
    check: () => getBeltProgress(playerXp).current.short !== "white"
  },
  {
    id: "iron-chin",
    name: "Iron Chin",
    desc: "Survive 3 or more submission attempts in one match.",
    icon: "🛡️",
    check: (s, r) => (r?.turns || []).flatMap((t) => t.finishAttempts.filter((a) => a.actor === "opponent")).length >= 3
  },
  {
    id: "clean-win",
    name: "Technical Wizard",
    desc: "Win without playing any recovery cards.",
    icon: "🧠",
    check: (s, r) => r?.result?.title === "Victory" && !(r?.turns || []).some((t) => t.playerCard.type === "recovery")
  },
  {
    id: "comeback",
    name: "Heart of a Champion",
    desc: "Win after trailing by 6 or more points.",
    icon: "❤️",
    check: (s, r) => {
      if (r?.result?.title !== "Victory") return false;
      return (r?.turns || []).some((t) => t.before.opponentPoints - t.before.playerPoints >= 6);
    }
  }
];

const positionSafetyCardIds = {
  "Standing": ["wrist-control", "collar-tie", "sprawl", "guard-pull", "rest"],
  "Top Guard": ["wrist-control", "pressure", "knee-slice", "torreando", "x-pass", "breathe-and-hold"],
  "Bottom Guard": ["frame", "wrist-control", "butterfly-hooks", "armbar", "guillotine", "rest"],
  "Top Half Guard": ["pressure", "knee-slice", "leg-drag", "backstep-pass", "shin-pin-pass", "breathe-and-hold"],
  "Bottom Half Guard": ["frame", "hip-escape", "butterfly-hooks", "reguard", "technical-standup"],
  "Side Control": ["pressure", "mount", "americana", "knee-on-belly", "north-south-control", "breathe-and-hold"],
  "Under Side Control": ["frame", "hip-escape", "reguard", "technical-bridge", "technical-standup"],
  "Mount": ["pressure", "armbar", "americana", "arm-triangle", "breathe-and-hold"],
  "Mounted": ["frame", "hip-escape", "bridge", "elbow-escape", "knee-elbow-escape", "technical-standup"],
  "Back Control": ["seatbelt-pressure", "body-triangle", "rear-naked-choke", "bow-and-arrow", "breathe-and-hold"],
  "Back Taken": ["hand-fight", "protect-neck", "frame", "technical-standup"],
  "Front Headlock": ["headlock-pressure", "slide-by", "guillotine", "front-headlock-spin", "breathe-and-hold"],
  "Caught Front Headlock": ["hand-fight", "protect-neck", "frame", "technical-standup"],
  "Turtle": ["hand-fight", "protect-neck", "frame", "technical-standup"],
  "Ashi Garami": ["ashi-control", "straight-ankle-lock", "toe-hold", "kneebar", "breathe-and-hold"],
  "Caught Ashi Garami": ["leg-pummel-escape", "hip-escape", "hand-fight", "frame", "technical-standup"]
};


const opponents = [
  {
    id: "wrestler",
    name: "The Wrestler",
    style: "Takedowns and top pressure",
    favoriteTypes: ["setup", "takedown", "pressure", "counter"]
  },
  {
    id: "triangle-hunter",
    name: "Triangle Hunter",
    style: "Guard attacks and submissions",
    favoriteTypes: ["guard", "submission", "setup", "counter"]
  },
  {
    id: "pressure-passer",
    name: "Pressure Passer",
    style: "Passes, control, and stamina drain",
    favoriteTypes: ["pass", "pressure", "setup", "escape"]
  },
  {
    id: "leg-locker",
    name: "The Leg Locker",
    style: "Ashi garami and leg entanglements",
    favoriteTypes: ["guard", "submission", "escape", "setup"]
  },
  {
    id: "scrambler",
    name: "The Scrambler",
    style: "Explosive transitions and counters",
    favoriteTypes: ["counter", "escape", "takedown", "setup"]
  },
  {
    id: "clinch-king",
    name: "The Clinch King",
    style: "Front headlock and clinch control",
    favoriteTypes: ["setup", "counter", "pressure", "takedown"]
  },
  {
    id: "ground-specialist",
    name: "Ground Specialist",
    style: "Balanced passing and top control",
    favoriteTypes: ["pass", "pressure", "submission", "counter"]
  },
  {
    id: "the-champion",
    name: "The Champion",
    style: "Elite all-round — no weak positions",
    favoriteTypes: ["submission", "pressure", "counter", "pass"]
  }
];

const playerStyles = [
  {
    id: "wrestler",
    name: "Wrestler",
    summary: "Shots, sprawls, snaps",
    cardTypes: ["setup", "takedown", "counter", "pressure"],
    keyCards: ["double-leg", "high-crotch", "single-leg", "snapdown", "front-headlock-spin", "mat-return", "cow-catcher", "sprawl", "duck-under", "ankle-pick", "collar-tie", "guillotine", "hand-fight", "rest"]
  },
  {
    id: "guard-player",
    name: "Guard Player",
    summary: "Sweeps and traps",
    cardTypes: ["guard", "submission", "escape", "setup"],
    keyCards: ["guard-pull", "flower-sweep", "closed-guard-sweep", "tripod-sweep", "hip-bump-sweep", "pendulum-sweep", "scissor-sweep", "butterfly-hooks", "butterfly-sweep", "triangle", "armbar", "omoplata", "kimura", "reguard", "rest"]
  },
  {
    id: "pressure-passer",
    name: "Pressure Passer",
    summary: "Pass, mount, smother",
    cardTypes: ["pass", "pressure", "submission", "setup"],
    keyCards: ["knee-slice", "x-pass", "body-lock-pass", "smash-pass", "torreando", "leg-drag", "backstep-pass", "knee-on-belly", "north-south-control", "pressure", "mount", "americana", "arm-triangle", "kimura", "wrist-control", "rest"]
  },
  {
    id: "back-hunter",
    name: "Back Hunter",
    summary: "Angles and chokes",
    cardTypes: ["setup", "takedown", "guard", "submission", "escape"],
    keyCards: ["arm-drag", "duck-under", "slide-by", "front-headlock-spin", "snapdown", "seatbelt-pressure", "body-triangle", "rear-naked-choke", "bow-and-arrow", "clock-choke", "guillotine", "hand-fight", "wrist-control", "collar-tie", "rest"]
  },
  {
    id: "leg-locker",
    name: "Leg Locker",
    summary: "Risky leg attacks",
    cardTypes: ["guard", "submission", "escape", "setup"],
    keyCards: ["guard-pull", "single-leg", "butterfly-sweep", "old-school-sweep", "single-leg-x-entry", "ashi-garami-entry", "ashi-control", "straight-ankle-lock", "heel-hook", "toe-hold", "kneebar", "leg-pummel-escape", "reguard", "hand-fight", "wrist-control", "rest"]
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


let selectedStyleId = loadSelectedStyleId();
let selectedMindGameId = "composed-pressure";
let selectedVenueId = loadSelectedVenueId();
let playerXp = loadPlayerXp();
let styleProgress = loadStyleProgress();
let activeScreen = "match";
let previewPose = null;
let pendingOpponent = null;


let state;


function newMatch(forcedOpponent = null) {
  previewPose = null;
  const opponent = forcedOpponent || pendingOpponent || opponents[Math.floor(Math.random() * opponents.length)];
  pendingOpponent = opponent;
  state = {
    ai: opponent,
    style: playerStyles.find((style) => style.id === selectedStyleId),
    venue: selectedVenue(),
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
    pendingAdrenalineResult: null,
    gotPerfectAdrenaline: false,
    tutorialMode: false,
    tutorialForceResult: null,
    player: { points: 0, stamina: getMaxStamina("player") },
    opponent: { points: 0, stamina: MAX_STAMINA },
    hand: [],
    log: [`You slap hands with ${opponent.name}. Style: ${opponent.style}.`]
  };
  state.matchReview = createMatchReview();
  applyMindGameSetup();
  applyVenueModifiers();
  drawHand();
  prepareOpponentIntent();
  render();
  if (typeof showMatchIntro === "function") showMatchIntro(opponent, state.venue);
  if (typeof SFX !== "undefined") setTimeout(() => SFX.slapHands(), 600);
}

function applyVenueModifiers() {
  const venueId = state.venue?.id;
  if (venueId === "local-event") {
    state.mindEffects.opponentAggressive = true;
    addLog(state, "The crowd energy gets in their head. Opponent plays more aggressively.");
  } else if (venueId === "championship") {
    addControl(state, "player", 1, "High-level composure: both athletes arrive composed. You take first control.");
    addLog(state, "Championship nerves are gone. You trained for this.");
  } else if (venueId === "beach") {
    state.mindEffects.submissionBonus = (state.mindEffects.submissionBonus || 0) + 5;
    addLog(state, "Exhibition format. Submissions come faster and looser on the sand.");
  } else if (venueId === "street") {
    state.player.stamina = Math.max(1, state.player.stamina - 1);
    state.opponent.stamina = Math.max(1, state.opponent.stamina - 1);
    addLog(state, "Rough conditions. Both fighters start tired.");
  }
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
    startingStyleXp: styleXpFor(selectedStyleId),
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
  const styleBonus = actor === "player" ? submissionStyleBonus(submissionName) : 0;
  const mindBonus = actor === "player" ? state.mindEffects?.submissionBonus || 0 : 0;
  // Comeback mechanic: trailing by 4+ points = adrenaline bonus on submissions
  const pointDiff = state[other(actor)].points - state[actor].points;
  const comebackBonus = actor === "player" && pointDiff >= 4 ? Math.min(16, Math.floor(pointDiff / 2) * 4) : 0;
  const chance = 35 + controlBonus * 12 + staminaBonus * 8 + chainBonus + skillBonus + styleBonus + mindBonus + comebackBonus;

  return {
    chance,
    controlBonus,
    staminaBonus,
    chainBonus,
    skillBonus,
    styleBonus,
    mindBonus,
    comebackBonus
  };
}

function submissionStyleBonus(submissionName) {
  const styleId = state.style?.id;
  const name = submissionName.toLowerCase();
  const position = state.position;

  if (styleId === "wrestler" && name === "guillotine" && position === "Front Headlock") return 8;
  if (styleId === "guard-player" && ["armbar", "triangle", "kimura"].includes(name) && position === "Bottom Guard") return 8;
  if (styleId === "pressure-passer" && ["arm triangle", "kimura"].includes(name) && ["Mount", "Side Control", "Top Half Guard"].includes(position)) return 8;
  if (styleId === "back-hunter" && name === "rear naked choke") return 10;
  if (styleId === "leg-locker" && ["straight ankle lock", "heel hook"].includes(name) && position === "Ashi Garami") return 12;
  return 0;
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
      style: details.styleBonus,
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
    totalXp: playerXp,
    totalStyleXp: styleXpFor(selectedStyleId)
  };
  state.matchReview.notes = buildCoachNotes(state.matchReview);
  state.matchReview.grade = matchReviewGrade(state.matchReview);
  state.matchReview.verdict = matchReviewVerdict(state.matchReview);
  saveMatchReview(state.matchReview);
  const won = state.result.title === "Victory";
  updateWinStreak(won);
  checkAchievements(state.matchReview);
  if (typeof recordMatchResult === "function") {
    const stats = recordMatchResult(won);
    const achievements = typeof loadAchievements === "function" ? new Set(loadAchievements()) : new Set();
    if (typeof checkAndGrantUnlocks === "function") checkAndGrantUnlocks(stats, achievements);
  }
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
  const dominantTurns = review.turns.filter((turn) => ["Front Headlock", "Side Control", "Mount", "Back Control", "Ashi Garami"].includes(turn.toPosition));
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
      text: `You reached a strong attacking position ${dominantTurns.length} time${dominantTurns.length === 1 ? "" : "s"}. The next design goal is turning those moments into real finish threats.`
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
  score += Math.min(18, review.turns.filter((turn) => ["Front Headlock", "Side Control", "Mount", "Back Control", "Ashi Garami"].includes(turn.toPosition)).length * 6);
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
  // In tutorial mode, always ensure the scripted card is in the hand
  if (state.tutorialMode && typeof getTutorialCardId === "function") {
    const tutId = getTutorialCardId();
    const tutCard = tutId ? cards.find((c) => c.id === tutId) : null;
    const rest = cards.find((card) => card.id === "rest");
    const adrenalineBurst = cards.find((card) => card.id === "adrenaline-burst");
    if (tutCard) {
      const others = cards.filter((c) =>
        c.id !== tutId && c.id !== "rest" && c.id !== "adrenaline-burst" &&
        canPlay(c, "player") && cardUnlocked(c)
      );
      const fill = drawUniqueCards(others, 3);
      state.hand = [tutCard, ...fill].slice(0, 4);
      return;
    }
  }
  const playable = cards.filter((card) => canPlay(card, "player") && cardUnlocked(card));
  const rest = cards.find((card) => card.id === "rest");
  const adrenalineBurst = cards.find((card) => card.id === "adrenaline-burst");
  const playableTechniques = backfillPositionOptions(playable.filter((card) => card.id !== "rest" && card.id !== "adrenaline-burst"));
  const affordableTechniques = playableTechniques.filter((card) => state.player.stamina >= effectiveCardCost(card, "player"));
  const styledPlayable = playableTechniques.filter((card) => isStyleCard(card, state.style));
  const poolBase = styledPlayable.length >= 4 ? weightedStylePool(playableTechniques, state.style) : playableTechniques;
  state.hand = drawUniqueCards(poolBase, 4);

  // Inject Breathe as a fallback slot if hand is short
  if (state.hand.length < 3 && rest && !state.hand.some((card) => card.id === "rest")) {
    state.hand.push(rest);
  }

  // Replace an unaffordable card with Breathe if needed
  if ((!affordableTechniques.length || !state.hand.some((card) => state.player.stamina >= effectiveCardCost(card, "player"))) && rest) {
    state.hand = state.hand.filter((card) => card.id !== "rest");
    if (state.hand.length >= 3) {
      const replaceIndex = Math.max(0, state.hand.findIndex((card) => state.player.stamina < effectiveCardCost(card, "player")));
      state.hand[replaceIndex] = rest;
    } else {
      state.hand.push(rest);
    }
  }

  // Inject Adrenaline Burst as a 5th slot when player is nearly empty (≤ 3 stamina)
  // It does not count as a normal hand slot — it replaces the last card slot instead
  if (adrenalineBurst && state.player.stamina <= 3 && !state.hand.some((card) => card.id === "adrenaline-burst")) {
    if (state.hand.length >= 4) {
      state.hand[3] = adrenalineBurst;
    } else {
      state.hand.push(adrenalineBurst);
    }
  }
}

function backfillPositionOptions(playableTechniques) {
  if (playableTechniques.length >= MIN_HAND_TECHNIQUES) return playableTechniques;

  const selected = [...playableTechniques];
  const selectedIds = new Set(selected.map((card) => card.id));
  const recoveryIds = new Set(["rest", "adrenaline-burst", "breathe-and-hold", "technical-standup"]);
  const safetyIds = positionSafetyCardIds[state.position] || [];
  for (const cardId of safetyIds) {
    if (selected.length >= MIN_HAND_TECHNIQUES) break;
    if (selectedIds.has(cardId) || recoveryIds.has(cardId)) continue;
    const card = cards.find((candidate) => candidate.id === cardId);
    if (!card || card.id === "rest" || !canPlay(card, "player") || !cardUnlocked(card)) continue;
    selected.push(card);
    selectedIds.add(card.id);
  }

  if (selected.length >= MIN_HAND_TECHNIQUES) return selected;

  for (const card of cards) {
    if (selected.length >= MIN_HAND_TECHNIQUES) break;
    if (card.id === "rest" || recoveryIds.has(card.id) || selectedIds.has(card.id) || !canPlay(card, "player") || !cardUnlocked(card)) continue;
    selected.push(card);
    selectedIds.add(card.id);
  }

  return selected;
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
  const extraStyleDraw = hasBonus("card-draw") ? [...keyCards, ...typeCards] : [];
  return [...keyCards, ...keyCards, ...keyCards, ...typeCards, ...extraStyleDraw, ...playable];
}

function cardUnlocked(card) {
  if (baseUnlockedCards.has(card.id)) return true;
  if (styleStarterCardsFor(selectedStyleId).has(card.id)) return true;
  return activeSkillTree().some((branch) =>
    branch.skills.some((skill) => skillRank(skill.id) > 0 && skill.unlocks?.includes(card.id))
  );
}

function hasSkill(skillId) {
  return skillRank(skillId) > 0;
}

function hasBonus(bonus) {
  return activeSkillTree().some((branch) =>
    branch.skills.some((skill) => skillRank(skill.id) > 0 && skill.bonus === bonus)
  );
}

function styleStarterCardsFor(styleId = selectedStyleId) {
  return styleStarterCards[styleId] || new Set();
}

function activeSkillTree(styleId = selectedStyleId) {
  return skillTreesByStyle[styleId] || skillTreesByStyle.wrestler || [];
}

function findSkill(skillId, styleId = selectedStyleId) {
  for (const branch of activeSkillTree(styleId)) {
    const skill = branch.skills.find((node) => node.id === skillId);
    if (skill) return skill;
  }
  return null;
}

function skillMaxRank(skill) {
  return Math.max(1, Number(skill?.ranks) || 1);
}

function skillRank(skillId, styleId = selectedStyleId) {
  const skills = styleProgressFor(styleId).skills;
  return Math.max(0, Number(skills[skillId]) || 0);
}

function skillSpentPointsForStyle(styleId = selectedStyleId) {
  const validSkillIds = new Set(activeSkillTree(styleId).flatMap((branch) => branch.skills.map((skill) => skill.id)));
  return Object.entries(styleProgressFor(styleId).skills).reduce((total, [skillId, rank]) => {
    if (!validSkillIds.has(skillId)) return total;
    return total + Math.max(0, Number(rank) || 0);
  }, 0);
}

function skillPrereqsMet(skill, styleId = selectedStyleId) {
  return (skill.requires || []).every((requiredId) => skillRank(requiredId, styleId) > 0);
}

function effectiveCardCost(card, actor) {
  if (actor !== "player") return card.cost;
  let cost = card.cost;
  if (hasBonus("cost-reduction") && ["takedown", "pass", "escape"].includes(card.type)) cost -= 1;
  if (hasBonus("guard-recovery") && card.id === "reguard") cost -= 1;
  if (state?.style?.id === "wrestler" && card.type === "takedown" && ["collar-tie", "wrist-control", "snapdown"].includes(state.lastPlayerCardId)) cost -= 1;
  if (state?.style?.id === "pressure-passer" && card.type === "pass" && state.control > 0) cost -= 1;
  if (state?.style?.id === "guard-player" && card.type === "guard" && state.position === "Bottom Guard") cost -= 1;
  if (state?.style?.id === "back-hunter" && ["arm-drag", "duck-under", "slide-by"].includes(card.id) && state.control > 0) cost -= 1;
  if (state?.style?.id === "leg-locker" && card.id === "ashi-garami-entry") cost -= 1;
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
  styleProgressFor(selectedStyleId).xp += state.result.xp;
  savePlayerXp();
  saveStyleProgress();
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
  return Math.floor(styleXpFor(selectedStyleId) / XP_PER_LEVEL);
}

function availableSkillPoints() {
  return Math.max(0, totalSkillPointsEarned() - skillSpentPointsForStyle(selectedStyleId));
}

function unlockSkill(skillId) {
  const skill = findSkill(skillId);
  if (!skill || availableSkillPoints() < 1 || !skillPrereqsMet(skill)) return;

  const currentRank = skillRank(skillId);
  if (currentRank >= skillMaxRank(skill)) return;

  styleProgressFor(selectedStyleId).skills[skillId] = currentRank + 1;
  saveStyleProgress();
  drawHand();
  prepareOpponentIntent();
  render();
}

function selectedStyle() {
  return playerStyles.find((style) => style.id === selectedStyleId) || playerStyles[0];
}

function setActiveScreen(screen) {
  activeScreen = screen;
  render();
}

function selectedVenue() {
  return venues.find((venue) => venue.id === selectedVenueId) || venues[0];
}

function loadSelectedVenueId() {
  const stored = localStorage.getItem(VENUE_STORAGE_KEY);
  return venues.some((venue) => venue.id === stored) ? stored : venues[0].id;
}

function loadSelectedStyleId() {
  const stored = localStorage.getItem(STYLE_ID_STORAGE_KEY);
  return playerStyles.some((style) => style.id === stored) ? stored : "wrestler";
}

function saveSelectedStyleId() {
  localStorage.setItem(STYLE_ID_STORAGE_KEY, selectedStyleId);
}

function loadAchievements() {
  try { return JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || "[]"); } catch { return []; }
}

function saveAchievements(list) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(list));
}

function checkAchievements(review) {
  const unlocked = new Set(loadAchievements());
  let changed = false;
  achievementDefs.forEach((def) => {
    if (!unlocked.has(def.id) && def.check(state, review)) {
      unlocked.add(def.id);
      changed = true;
      flashAchievementToast(def);
    }
  });
  if (changed) saveAchievements([...unlocked]);
}

function flashAchievementToast(def) {
  const toast = document.createElement("div");
  toast.className = "achievement-toast";
  toast.style.cursor = "pointer";
  toast.title = "Click to view achievements";
  toast.innerHTML = `<span class="achievement-toast-icon">${def.icon}</span><div><strong>${escapeHtml(def.name)}</strong><span>${escapeHtml(def.desc)} — <em>tap to view</em></span></div>`;
  toast.addEventListener("click", () => {
    if (typeof setActiveScreen === "function") { setActiveScreen("athlete"); }
    if (typeof els !== "undefined") els.resultOverlay.hidden = true;
    toast.remove();
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("achievement-toast-visible"), 50);
  setTimeout(() => {
    toast.classList.remove("achievement-toast-visible");
    setTimeout(() => toast.remove(), 500);
  }, 4500);
}

function loadWinStreak() {
  return Math.max(0, Number(localStorage.getItem(WIN_STREAK_KEY)) || 0);
}

function saveWinStreak(n) {
  localStorage.setItem(WIN_STREAK_KEY, String(n));
}

function updateWinStreak(won) {
  const current = loadWinStreak();
  const next = won ? current + 1 : 0;
  saveWinStreak(next);
  return next;
}

function setStyle(styleId) {
  if (!playerStyles.some((style) => style.id === styleId)) return;
  selectedStyleId = styleId;
  saveSelectedStyleId();
  render();
}

function startTutorial() {
  if (typeof closePreMatchModal === "function") closePreMatchModal();
  const tutorialOpponent = opponents.find((o) => o.id === "wrestler") || opponents[0];
  newMatch(tutorialOpponent);
  state.tutorialMode = true;
  state.tutorialForceResult = null;
  // Make sure the tutorial has enough stamina room
  state.player.stamina = 10;
  state.opponent.stamina = 10;
  render();
  if (typeof showTutorialCoach === "function") showTutorialCoach();
}

function setMindGame(mindGameId) {
  if (!mindGames.some((mg) => mg.id === mindGameId)) return;
  selectedMindGameId = mindGameId;
  render();
}

function setVenue(venueId) {
  if (!venues.some((venue) => venue.id === venueId)) return;
  selectedVenueId = venueId;
  localStorage.setItem(VENUE_STORAGE_KEY, selectedVenueId);
  if (state) {
    state.venue = selectedVenue();
  }
  render();
}

function defaultStyleProgress() {
  return playerStyles.reduce((progress, style) => {
    progress[style.id] = { xp: 0, skills: {} };
    return progress;
  }, {});
}

function styleProgressFor(styleId = selectedStyleId) {
  if (!styleProgress[styleId]) {
    styleProgress[styleId] = { xp: 0, skills: {} };
  }
  if (Array.isArray(styleProgress[styleId].skills)) {
    styleProgress[styleId].skills = styleProgress[styleId].skills.reduce((skills, skillId) => {
      skills[skillId] = Math.max(1, Number(skills[skillId]) || 1);
      return skills;
    }, {});
  } else if (!styleProgress[styleId].skills || typeof styleProgress[styleId].skills !== "object") {
    styleProgress[styleId].skills = {};
  }
  if (!Number.isFinite(Number(styleProgress[styleId].xp))) {
    styleProgress[styleId].xp = 0;
  }
  return styleProgress[styleId];
}

function styleXpFor(styleId = selectedStyleId) {
  return Number(styleProgressFor(styleId).xp) || 0;
}

function activeUnlockedSkills() {
  const validSkillIds = new Set(activeSkillTree(selectedStyleId).flatMap((branch) => branch.skills.map((skill) => skill.id)));
  return Object.keys(styleProgressFor(selectedStyleId).skills).filter((skillId) => validSkillIds.has(skillId) && skillRank(skillId) > 0);
}

function loadStyleProgress() {
  const progress = defaultStyleProgress();
  try {
    const parsed = JSON.parse(localStorage.getItem(STYLE_PROGRESS_STORAGE_KEY) || "{}");
    playerStyles.forEach((style) => {
      const stored = parsed?.[style.id] || {};
      const storedSkills = Array.isArray(stored.skills)
        ? stored.skills.reduce((skills, skillId) => {
            skills[skillId] = 1;
            return skills;
          }, {})
        : stored.skills && typeof stored.skills === "object"
          ? stored.skills
          : {};
      progress[style.id] = {
        xp: Number.isFinite(Number(stored.xp)) ? Number(stored.xp) : 0,
        skills: Object.entries(storedSkills).reduce((skills, [skillId, rank]) => {
          const parsedRank = Math.max(0, Number(rank) || 0);
          if (parsedRank > 0) skills[skillId] = parsedRank;
          return skills;
        }, {})
      };
    });
  } catch {
    return progress;
  }
  return progress;
}

function saveStyleProgress() {
  localStorage.setItem(STYLE_PROGRESS_STORAGE_KEY, JSON.stringify(styleProgress));
}

function resetSelectedStyleProgress() {
  const styleName = selectedStyle().name;
  const confirmed = window.confirm(`Reset ${styleName} style XP and skill unlocks? Your belt rank stays untouched.`);
  if (!confirmed) return;
  styleProgress[selectedStyleId] = { xp: 0, skills: {} };
  saveStyleProgress();
  drawHand();
  prepareOpponentIntent();
  render();
}

import { computeTarget } from "./simulation.js";

/** @typedef {import("./config.js").Element} Element */

/** @typedef {{ row: number, col: number, el: Element }} PresetCell */

/**
 * @typedef {Object} Performance
 * @property {string} id
 * @property {string} label
 * @property {string} invite
 * @property {Element[]} handElements
 * @property {PresetCell[]} [preset]
 * @property {number} [targetScore]
 * @property {string} [synergyTip] - one-line lesson after credits
 * @property {"basics"|"synergies"|"advanced"|"graduation"} [phase]
 * @property {boolean} [graduates] - final level → free play
 */

export const PERFORMANCE_1_ID = "performance-1";
export const PERFORMANCE_2_ID = "performance-2";
export const PERFORMANCE_3_ID = "performance-3-steam";
export const PERFORMANCE_4_ID = "performance-4-lightning";
export const PERFORMANCE_5_ID = "performance-5-crystal";
export const PERFORMANCE_6_ID = "performance-6-capstone";
export const PERFORMANCE_7_ID = "performance-7-directorship";
export const PERFORMANCE_8_ID = "performance-8-setup-steam";
export const PERFORMANCE_9_ID = "performance-9-build-row";
export const PERFORMANCE_10_ID = "performance-10-place-crystal";
export const PERFORMANCE_11_ID = "performance-11-compose";
export const PERFORMANCE_12_ID = "performance-12-graduation";

/**
 * Performance 1 — fill the gap to link the lonely Fire.
 * @type {Performance}
 */
export const PERFORMANCE_1 = {
  id: PERFORMANCE_1_ID,
  phase: "basics",
  label: "Connection · build a chain",
  invite:
    "Fill the two empty cells between the Fires — Water in the middle is fine. Spark the left Fire.",
  handElements: ["W", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 4, el: "F" },
  ],
  targetScore: 88,
  synergyTip:
    "Runes chain when they touch side-by-side. Longer connected rows score higher.",
};

export const PERFORMANCE_1_HAND = PERFORMANCE_1.handElements;

/**
 * Performance 2 — "Connect first — or spark and see."
 * @type {Performance}
 */
export const PERFORMANCE_2 = {
  id: PERFORMANCE_2_ID,
  phase: "basics",
  label: "Connection · link, then link",
  invite: "Link the clusters — or spark first and watch what happens.",
  handElements: ["F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "F" },
    { row: 0, col: 4, el: "F" },
    { row: 1, col: 4, el: "F" },
    { row: 2, col: 4, el: "F" },
    { row: 3, col: 4, el: "F" },
  ],
  targetScore: 121,
  synergyTip: "A bigger connected board means a longer chain — link pieces before you spark.",
};

/**
 * Performance 3 — Steam: Fire or Lightning wakes Water.
 * @type {Performance}
 */
export const PERFORMANCE_3 = {
  id: PERFORMANCE_3_ID,
  phase: "synergies",
  label: "Synergy · Fire wakes Water",
  invite: "Spark the left Fire. Watch what happens when the wave reaches Water.",
  handElements: [],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "W" },
  ],
  targetScore: 53,
  synergyTip:
    "Steam — when Fire or Lightning reaches Water, you gain +15 and +0.25× multiplier.",
};

/**
 * Performance 4 — Lightning jumps gaps.
 * @type {Performance}
 */
export const PERFORMANCE_4 = {
  id: PERFORMANCE_4_ID,
  phase: "synergies",
  label: "Synergy · Lightning jumps gaps",
  invite: "Lightning leaps over empty cells. Spark the left one.",
  handElements: [],
  preset: [
    { row: 2, col: 1, el: "L" },
    { row: 2, col: 3, el: "L" },
  ],
  targetScore: 22,
  synergyTip:
    "Lightning jumps up to 3 cells in a line — it chains without touching.",
};

/**
 * Performance 5 — Crystal at the tail of a long chain.
 * @type {Performance}
 */
export const PERFORMANCE_5 = {
  id: PERFORMANCE_5_ID,
  phase: "synergies",
  label: "Synergy · Crystal surges at the tail",
  invite: "Spark the first Fire. Steam on Water, then Crystal at the end.",
  handElements: [],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "F" },
    { row: 2, col: 3, el: "W" },
    { row: 2, col: 4, el: "C" },
  ],
  targetScore: 82,
  synergyTip:
    "Crystal adds +0.6× when it fires — put it late so the chain builds multiplier first.",
};

/**
 * Performance 6 — All four elements in one chain.
 * @type {Performance}
 */
export const PERFORMANCE_6 = {
  id: PERFORMANCE_6_ID,
  phase: "synergies",
  label: "Synergy · all four together",
  invite: "Spark the top Fire. Fire spreads, Lightning leaps, Water steams, Crystal surges.",
  handElements: [],
  preset: [
    { row: 0, col: 2, el: "F" },
    { row: 1, col: 2, el: "F" },
    { row: 2, col: 0, el: "L" },
    { row: 2, col: 2, el: "L" },
    { row: 2, col: 4, el: "W" },
    { row: 4, col: 2, el: "C" },
  ],
  targetScore: 112,
  synergyTip:
    "You're hunting chains that use every strength — connect, jump, steam, surge.",
};

/**
 * Performance 7 — Spark origin changes the show (A2 directorship).
 * @type {Performance}
 */
export const PERFORMANCE_7 = {
  id: PERFORMANCE_7_ID,
  phase: "advanced",
  label: "Directorship · where you spark",
  invite:
    "Spark the Water in the middle — short chain. Clear Board, then spark the LEFT Fire for the full show.",
  handElements: [],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "W" },
    { row: 2, col: 3, el: "F" },
    { row: 2, col: 4, el: "F" },
  ],
  targetScore: 88,
  synergyTip:
    "Same board, different spark = different show. Start where the chain can run longest.",
};

/**
 * Performance 8 — Player places Water for steam.
 * @type {Performance}
 */
export const PERFORMANCE_8 = {
  id: PERFORMANCE_8_ID,
  phase: "advanced",
  label: "Setup · place Water for steam",
  invite: "Put Water where the Fire wave will reach it. Spark the left Fire.",
  handElements: ["W"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "F" },
  ],
  targetScore: 67,
  synergyTip:
    "Place Water downstream of Fire — steam needs Fire or Lightning to reach it.",
};

/**
 * Performance 9 — Extend a Fire row with Lightning and Water.
 * @type {Performance}
 */
export const PERFORMANCE_9 = {
  id: PERFORMANCE_9_ID,
  phase: "advanced",
  label: "Setup · extend the row",
  invite: "Continue the row: Lightning, Water, then Fire. Spark the left end.",
  handElements: ["L", "W", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
  ],
  targetScore: 85,
  synergyTip:
    "You're composing a chain — each rune plays its role in order.",
};

/**
 * Performance 10 — Player caps the chain with Crystal.
 * @type {Performance}
 */
export const PERFORMANCE_10 = {
  id: PERFORMANCE_10_ID,
  phase: "advanced",
  label: "Setup · Crystal goes last",
  invite: "Water next, then Crystal at the end of the line. Spark the left Fire.",
  handElements: ["W", "C"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "F" },
  ],
  targetScore: 82,
  synergyTip: "Build the chain first, then cap it with Crystal for the surge.",
};

/**
 * Performance 11 — Nearly free compose with six runes.
 * @type {Performance}
 */
export const PERFORMANCE_11 = {
  id: PERFORMANCE_11_ID,
  phase: "advanced",
  label: "Compose · use the whole toolkit",
  invite:
    "Two Fires are set. Place Lightning, Water, Crystal, and more Fire — then spark the left end.",
  handElements: ["L", "W", "C", "F", "F", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
  ],
  targetScore: 118,
  synergyTip:
    "You're directing the board now — not just reacting. Every placement is setup.",
};

/**
 * Performance 12 — Graduation into random hands.
 * @type {Performance}
 */
export const PERFORMANCE_12 = {
  id: PERFORMANCE_12_ID,
  phase: "graduation",
  label: "Graduation · your board",
  invite: "All four elements, empty board. Build the best chain you can, then spark.",
  handElements: ["F", "F", "F", "L", "W", "W", "C", "F"],
  targetScore: 105,
  graduates: true,
  synergyTip:
    "Training complete. Random Hand is the real game — every board is yours to direct.",
};

/** Ordered training — basics → synergies → advanced → graduation. */
export const TRAINING_LEVELS = [
  PERFORMANCE_1,
  PERFORMANCE_2,
  PERFORMANCE_3,
  PERFORMANCE_4,
  PERFORMANCE_5,
  PERFORMANCE_6,
  PERFORMANCE_7,
  PERFORMANCE_8,
  PERFORMANCE_9,
  PERFORMANCE_10,
  PERFORMANCE_11,
  PERFORMANCE_12,
];

/** @deprecated Use TRAINING_LEVELS */
export const SYNERGY_PATH = TRAINING_LEVELS;

/** @type {Performance[]} */
export const ALL_PERFORMANCES = TRAINING_LEVELS;

/** @param {Performance["phase"]} phase */
export function phaseLabel(phase) {
  return (
    {
      basics: "Basics",
      synergies: "Synergies",
      advanced: "Advanced",
      graduation: "Graduation",
    }[phase ?? "basics"] ?? "Training"
  );
}

/** @param {Performance} perf */
export function isGraduationLevel(perf) {
  return perf.graduates === true;
}

/** @param {Element[]} elements */
export function handFromElements(elements) {
  return elements.map((el) => ({ el, used: false }));
}

/** @param {string} id */
export function getPerformance(id) {
  const perf = ALL_PERFORMANCES.find((p) => p.id === id);
  if (!perf) throw new Error(`Unknown performance: ${id}`);
  return perf;
}

/** Default opening performance. */
export function getActivePerformance() {
  return TRAINING_LEVELS[0];
}

/** @param {string} id */
export function trainingLevelIndex(id) {
  return TRAINING_LEVELS.findIndex((p) => p.id === id);
}

/** @param {string} id @returns {Performance|null} */
export function nextTrainingLevel(id) {
  const i = trainingLevelIndex(id);
  if (i < 0 || i >= TRAINING_LEVELS.length - 1) return null;
  return TRAINING_LEVELS[i + 1];
}

/** @param {string} id */
export function synergyPathIndex(id) {
  return trainingLevelIndex(id);
}

/** @param {string} id */
export function isOnSynergyPath(id) {
  return trainingLevelIndex(id) >= 0;
}

/** @param {string} id @returns {Performance|null} */
export function nextInSynergyPath(id) {
  return nextTrainingLevel(id);
}

/** @param {Performance} perf */
export function targetForPerformance(perf) {
  if (perf.targetScore != null) return perf.targetScore;
  return computeTarget(handFromElements(perf.handElements));
}

/** @param {Performance} perf @param {(Element|null)[][]} grid */
export function applyPreset(perf, grid) {
  for (const cell of perf.preset ?? []) {
    grid[cell.row][cell.col] = cell.el;
  }
}

/** @param {Performance} perf @returns {Set<string>} */
export function lockedKeysForPerformance(perf) {
  const keys = new Set();
  for (const cell of perf.preset ?? []) {
    keys.add(`${cell.row},${cell.col}`);
  }
  return keys;
}

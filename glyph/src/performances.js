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
 */

export const PERFORMANCE_1_ID = "performance-1";
export const PERFORMANCE_2_ID = "performance-2";
export const PERFORMANCE_3_ID = "performance-3-steam";
export const PERFORMANCE_4_ID = "performance-4-lightning";
export const PERFORMANCE_5_ID = "performance-5-crystal";
export const PERFORMANCE_6_ID = "performance-6-capstone";

/**
 * Performance 1 — "Will the lonely one fire?"
 * @type {Performance}
 */
export const PERFORMANCE_1 = {
  id: PERFORMANCE_1_ID,
  label: "Connection · Fire + Water only",
  invite: "Place runes so they touch. Tap one to spark.",
  handElements: ["F", "F", "W", "F", "F", "W", "F", "F"],
  synergyTip: "Runes chain when they touch — Fire spreads to neighbors side-by-side.",
};

export const PERFORMANCE_1_HAND = PERFORMANCE_1.handElements;

/**
 * Performance 2 — "Connect first — or spark and see."
 * @type {Performance}
 */
export const PERFORMANCE_2 = {
  id: PERFORMANCE_2_ID,
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

/** Ordered lessons — connection first, then each synergy, then capstone. */
export const SYNERGY_PATH = [
  PERFORMANCE_1,
  PERFORMANCE_2,
  PERFORMANCE_3,
  PERFORMANCE_4,
  PERFORMANCE_5,
  PERFORMANCE_6,
];

/** @type {Performance[]} */
export const ALL_PERFORMANCES = SYNERGY_PATH;

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
  return SYNERGY_PATH[0];
}

/** @param {string} id */
export function synergyPathIndex(id) {
  return SYNERGY_PATH.findIndex((p) => p.id === id);
}

/** @param {string} id */
export function isOnSynergyPath(id) {
  return synergyPathIndex(id) >= 0;
}

/** @param {string} id @returns {Performance|null} */
export function nextInSynergyPath(id) {
  const i = synergyPathIndex(id);
  if (i < 0 || i >= SYNERGY_PATH.length - 1) return null;
  return SYNERGY_PATH[i + 1];
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

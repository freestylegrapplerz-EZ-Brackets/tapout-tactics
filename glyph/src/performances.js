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
 */

export const PERFORMANCE_1_ID = "performance-1";
export const PERFORMANCE_2_ID = "performance-2";

/**
 * Performance 1 — "Will the lonely one fire?"
 * @type {Performance}
 */
export const PERFORMANCE_1 = {
  id: PERFORMANCE_1_ID,
  label: "Opening hand · Fire + Water only",
  invite: "Place runes so they touch. Tap one to spark.",
  handElements: ["F", "F", "W", "F", "F", "W", "F", "F"],
};

export const PERFORMANCE_1_HAND = PERFORMANCE_1.handElements;

/**
 * Performance 2 — "Connect first — or spark and see."
 * Two disconnected clusters + one bridge rune. Spark before linking = small show.
 * Spark after linking = full board. Visual directorship without a lecture.
 * @type {Performance}
 */
export const PERFORMANCE_2 = {
  id: PERFORMANCE_2_ID,
  label: "Two clusters · connect the gap",
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
};

/** @type {Performance[]} */
export const ALL_PERFORMANCES = [PERFORMANCE_1, PERFORMANCE_2];

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
  return PERFORMANCE_1;
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

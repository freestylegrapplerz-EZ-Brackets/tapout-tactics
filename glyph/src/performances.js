/** @typedef {import("./config.js").Element} Element */

/** Internal id for playtest logging — never shown to player. */
export const PERFORMANCE_1_ID = "performance-1";

/**
 * Performance 1 — question: "Will the lonely one fire?"
 * Curated forever. Enough Fire to pair; Water as visually distinct orphan candidate.
 * @type {Element[]}
 */
export const PERFORMANCE_1_HAND = ["F", "F", "W", "F", "F", "W", "F", "F"];

/** @param {Element[]} elements */
export function handFromElements(elements) {
  return elements.map((el) => ({ el, used: false }));
}

/**
 * Active onboarding performance. Only Performance 1 is implemented.
 * Performances 2–5 are hypotheses — see docs/PERFORMANCE-HYPOTHESES.md
 */
export function getActivePerformance() {
  return {
    id: PERFORMANCE_1_ID,
    handElements: PERFORMANCE_1_HAND,
  };
}

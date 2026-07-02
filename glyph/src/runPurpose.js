import { ELEMENT_LABELS } from "./config.js";

/** @typedef {'current'|'awaken'|'farthest'} RunPurposeMode */

/** @typedef {'complete'|'one_gap'|'adjacent'|'isolated'|'none'} VerdictKind */

/**
 * @typedef {Object} RunVerdict
 * @property {VerdictKind} kind
 * @property {string} headline
 * @property {string} subline
 * @property {string|null} primaryGapKey
 * @property {number} coldCount
 * @property {number} litCount
 */

/**
 * @param {string|null|undefined} raw
 * @returns {RunPurposeMode}
 */
export function parseRunPurpose(raw) {
  const key = (raw ?? "a").toLowerCase();
  if (key === "b" || key === "awaken") return "awaken";
  if (key === "c" || key === "farthest" || key === "far") return "farthest";
  return "current";
}

/** @param {RunPurposeMode} mode */
export function purposeVersionSuffix(mode) {
  if (mode === "awaken") return "exp-b-awaken";
  if (mode === "farthest") return "exp-c-farthest";
  return "exp-a-current";
}

/** @param {RunPurposeMode} mode */
export function buildObjectiveLine(mode) {
  if (mode === "awaken") return "This run: awaken every rune you placed.";
  if (mode === "farthest") return "This run: reach the farthest rune you placed.";
  return "Link runes · spark when ready";
}

/**
 * @param {(import("./config.js").Element|null)[][]} grid
 * @returns {string[]}
 */
export function placedKeys(grid) {
  /** @type {string[]} */
  const keys = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c]) keys.push(`${r},${c}`);
    }
  }
  return keys;
}

/**
 * Farthest placed rune from centroid of all placements.
 * @param {(import("./config.js").Element|null)[][]} grid
 * @returns {string|null}
 */
export function farthestPlacedKey(grid) {
  const keys = placedKeys(grid);
  if (keys.length === 0) return null;
  if (keys.length === 1) return keys[0];

  let sumR = 0;
  let sumC = 0;
  for (const key of keys) {
    const [r, c] = key.split(",").map(Number);
    sumR += r;
    sumC += c;
  }
  const centerR = sumR / keys.length;
  const centerC = sumC / keys.length;

  /** @param {string} key */
  function tieRank(key) {
    const [r, c] = key.split(",").map(Number);
    return [r + c, r, c, key];
  }

  let bestKey = keys[0];
  let bestDist = -1;
  for (const key of keys) {
    const [r, c] = key.split(",").map(Number);
    const dist = (r - centerR) ** 2 + (c - centerC) ** 2;
    if (dist > bestDist) {
      bestDist = dist;
      bestKey = key;
      continue;
    }
    if (dist === bestDist) {
      const next = tieRank(key);
      const best = tieRank(bestKey);
      if (
        next[0] > best[0] ||
        (next[0] === best[0] && next[1] > best[1]) ||
        (next[0] === best[0] && next[1] === best[1] && next[2] > best[2])
      ) {
        bestKey = key;
      }
    }
  }
  return bestKey;
}

/**
 * @param {(import("./config.js").Element|null)[][]} grid
 * @param {Set<string>} litKeys
 * @param {number} litCount
 */
export function purposeVerdict(mode, grid, litKeys, litCount) {
  if (mode === "awaken") {
    return awakenVerdict(grid, litKeys, litCount);
  }

  return farthestVerdict(grid, litKeys, litCount);
}

/**
 * @param {(import("./config.js").Element|null)[][]} grid
 * @param {Set<string>} litKeys
 * @param {number} litCount
 * @returns {RunVerdict}
 */
function awakenVerdict(grid, litKeys, litCount) {
  const keys = placedKeys(grid);
  if (keys.length === 0) {
    return {
      kind: "none",
      headline: "Nothing placed.",
      subline: "Place runes, then spark.",
      primaryGapKey: null,
      coldCount: 0,
      litCount,
    };
  }

  /** @type {string[]} */
  const cold = keys.filter((k) => !litKeys.has(k));
  if (cold.length === 0) {
    return {
      kind: "complete",
      headline: "Every rune awoke.",
      subline: "Nothing you placed stayed cold.",
      primaryGapKey: null,
      coldCount: 0,
      litCount,
    };
  }

  const primary = cold[0];
  const [r, c] = primary.split(",").map(Number);
  const name = ELEMENT_LABELS[grid[r][c]];
  return {
    kind: "adjacent",
    headline: `${name} stayed cold.`,
    subline: `${cold.length} of ${keys.length} runes never awoke.`,
    primaryGapKey: primary,
    coldCount: cold.length,
    litCount,
  };
}

/**
 * @param {(import("./config.js").Element|null)[][]} grid
 * @param {Set<string>} litKeys
 * @param {number} litCount
 * @returns {RunVerdict}
 */
function farthestVerdict(grid, litKeys, litCount) {
  const farKey = farthestPlacedKey(grid);
  if (!farKey) {
    return {
      kind: "none",
      headline: "Nothing placed.",
      subline: "Place runes, then spark.",
      primaryGapKey: null,
      coldCount: 0,
      litCount,
    };
  }

  const [r, c] = farKey.split(",").map(Number);
  const name = ELEMENT_LABELS[grid[r][c]];
  const reached = litKeys.has(farKey);

  if (reached) {
    return {
      kind: "complete",
      headline: "You reached the far rune.",
      subline: `${name} at the edge of your stage awoke.`,
      primaryGapKey: farKey,
      coldCount: 0,
      litCount,
    };
  }

  return {
    kind: "isolated",
    headline: `The far rune stayed cold.`,
    subline: `${name} at the edge never woke.`,
    primaryGapKey: farKey,
    coldCount: 1,
    litCount,
  };
}

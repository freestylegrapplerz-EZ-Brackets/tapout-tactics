import { SIZE } from "./config.js";

/** @typedef {import("./simulation.js").CascadeStep} CascadeStep */
/** @typedef {'adjacent' | 'one_gap' | 'isolated'} ColdKind */

/**
 * @typedef {Object} AftermathAnalysis
 * @property {string} sparkOrigin - "row,col"
 * @property {Map<string, ColdKind>} coldTaxonomy
 */

/** @param {number} r @param {number} c */
function key(r, c) {
  return `${r},${c}`;
}

/** @param {number} r @param {number} c @param {Set<string>} lit */
function isAdjacentToLit(r, c, lit) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      if (lit.has(key(r + dr, c + dc))) return true;
    }
  }
  return false;
}

/**
 * One empty cell on a straight line (cardinal or diagonal) between cold and lit.
 * @param {number} r
 * @param {number} c
 * @param {Set<string>} lit
 * @param {(import("./config.js").Element|null)[][]} grid
 */
function isOneGapFromLit(r, c, lit, grid) {
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  for (const [dr, dc] of dirs) {
    const mr = r + dr;
    const mc = c + dc;
    const fr = r + dr * 2;
    const fc = c + dc * 2;
    if (mr < 0 || mr >= SIZE || mc < 0 || mc >= SIZE) continue;
    if (fr < 0 || fr >= SIZE || fc < 0 || fc >= SIZE) continue;
    if (grid[mr][mc] != null) continue;
    if (lit.has(key(fr, fc))) return true;
  }

  return false;
}

/**
 * Mirror board state after cascade — factual cold taxonomy + spark origin.
 * @param {(import("./config.js").Element|null)[][]} grid
 * @param {number} sparkRow
 * @param {number} sparkCol
 * @param {CascadeStep[]} steps
 * @returns {AftermathAnalysis}
 */
export function analyzeAftermath(grid, sparkRow, sparkCol, steps) {
  const lit = new Set(steps.map((s) => key(s.r, s.c)));
  /** @type {Map<string, ColdKind>} */
  const coldTaxonomy = new Map();

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!grid[r][c]) continue;
      const k = key(r, c);
      if (lit.has(k)) continue;

      if (isAdjacentToLit(r, c, lit)) {
        coldTaxonomy.set(k, "adjacent");
      } else if (isOneGapFromLit(r, c, lit, grid)) {
        coldTaxonomy.set(k, "one_gap");
      } else {
        coldTaxonomy.set(k, "isolated");
      }
    }
  }

  return {
    sparkOrigin: key(sparkRow, sparkCol),
    coldTaxonomy,
  };
}

/** @param {ColdKind} kind */
export function coldClassForKind(kind) {
  return `cold-${kind.replace("_", "-")}`;
}

import { BASE, L_RANGE, SIZE } from "./config.js";

/** @typedef {import("./config.js").Element} Element */

/**
 * @typedef {Object} CascadeStep
 * @property {number} r
 * @property {number} c
 * @property {Element} el
 * @property {number} fromRow - source cell row (-1 at spark origin)
 * @property {number} fromCol - source cell col (-1 at spark origin)
 * @property {number} gain
 * @property {number} score
 * @property {number} chain - 1-based chain index
 * @property {string} combo - e.g. "steam" or ""
 * @property {number} mult - multiplier after this step
 */

/**
 * @typedef {Object} CascadeResult
 * @property {CascadeStep[]} steps
 * @property {number} finalScore
 * @property {number} chainLength
 */

/** @param {number} r @param {number} c */
function key(r, c) {
  return `${r},${c}`;
}

/**
 * @param {(Element|null)[][]} grid
 * @param {number} r
 * @param {number} c
 */
function hasRune(grid, r, c) {
  return r >= 0 && r < SIZE && c >= 0 && c < SIZE && grid[r][c] != null;
}

/**
 * Deterministic propagation targets (Hope Pass / Spark Test v1 rules).
 * @param {(Element|null)[][]} grid
 * @param {number} r
 * @param {number} c
 * @param {Element} el
 * @returns {[number, number][]}
 */
export function getTargets(grid, r, c, el) {
  /** @type {[number, number][]} */
  const out = [];

  if (el === "F") {
    for (const [dr, dc] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      if (hasRune(grid, r + dr, c + dc)) out.push([r + dr, c + dc]);
    }
  } else if (el === "W" || el === "C") {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        if (hasRune(grid, r + dr, c + dc)) out.push([r + dr, c + dc]);
      }
    }
  } else if (el === "L") {
    for (const [dr, dc] of [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]) {
      for (let k = 1; k <= L_RANGE; k++) {
        const rr = r + dr * k;
        const cc = c + dc * k;
        if (rr < 0 || rr >= SIZE || cc < 0 || cc >= SIZE) break;
        if (grid[rr][cc]) {
          out.push([rr, cc]);
          break;
        }
      }
    }
  }

  return out;
}

/**
 * Deterministic BFS cascade — single source of truth for rules and step log.
 * @param {(Element|null)[][]} grid - 5×5 board snapshot at Spark time
 * @param {number} sparkRow
 * @param {number} sparkCol
 * @returns {CascadeResult}
 */
export function simulateCascade(grid, sparkRow, sparkCol) {
  if (!hasRune(grid, sparkRow, sparkCol)) {
    return { steps: [], finalScore: 0, chainLength: 0 };
  }

  const activated = new Set();
  const queued = new Set();
  /** @type {[number, number, Element|null, number, number][]} */
  let layer = [[sparkRow, sparkCol, null, -1, -1]];
  queued.add(key(sparkRow, sparkCol));

  /** @type {CascadeStep[]} */
  const steps = [];
  let mult = 1;
  let score = 0;

  while (layer.length) {
    /** @type {[number, number, Element|null, number, number][]} */
    const next = [];

    for (const [r, c, src, fromRow, fromCol] of layer) {
      const k = key(r, c);
      if (activated.has(k)) continue;
      activated.add(k);

      const el = /** @type {Element} */ (grid[r][c]);
      let gain = Math.round(BASE[el] * mult);
      let combo = "";

      if (el === "W" && (src === "F" || src === "L")) {
        gain += 15;
        mult += 0.25;
        combo = "steam";
      }

      score += gain;
      mult += 0.15;
      if (el === "C") mult += 0.6;

      steps.push({
        r,
        c,
        el,
        fromRow,
        fromCol,
        gain,
        score,
        chain: steps.length + 1,
        combo,
        mult: +mult.toFixed(2),
      });

      for (const [tr, tc] of getTargets(grid, r, c, el)) {
        const tk = key(tr, tc);
        if (!activated.has(tk) && !queued.has(tk)) {
          queued.add(tk);
          next.push([tr, tc, el, r, c]);
        }
      }
    }

    layer = next;
  }

  return {
    steps,
    finalScore: score,
    chainLength: steps.length,
  };
}

/**
 * @param {() => number} [random] - 0..1, defaults to Math.random
 * @returns {{ el: Element, used: boolean }[]}
 */
export function createHand(random = Math.random) {
  /** @type {{ el: Element, used: boolean }[]} */
  const hand = [];
  for (let i = 0; i < 8; i++) hand.push({ el: randElement(random), used: false });

  const have = (e) => hand.some((h) => h.el === e);
  if (!have("L")) hand[0].el = "L";
  if (!have("C")) hand[1].el = "C";
  if (!have("W")) hand[2].el = "W";

  return hand;
}

/** @param {{ el: Element }[]} hand */
export function computeTarget(hand) {
  const sum = hand.reduce((s, h) => s + BASE[h.el], 0);
  return Math.round(sum * 2.4);
}

/** @param {() => number} random */
function randElement(random) {
  const r = random();
  if (r < 0.34) return "F";
  if (r < 0.6) return "L";
  if (r < 0.8) return "W";
  return "C";
}

/** @returns {(Element|null)[][]} */
export function emptyGrid() {
  return Array.from({ length: SIZE }, () => Array.from({ length: SIZE }, () => null));
}

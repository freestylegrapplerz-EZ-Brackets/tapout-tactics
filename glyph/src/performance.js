import { SIZE } from "./config.js";

/** Grid gap in SVG viewBox units — must match theme.css --cell-gap rhythm. */
export const BOARD_GAP = 7;

/** @param {number} r @param {number} c */
export function cellCenter(r, c) {
  const w = 100;
  const cellW = (w - BOARD_GAP * (SIZE - 1)) / SIZE;
  return {
    x: c * (cellW + BOARD_GAP) + cellW / 2,
    y: r * (cellW + BOARD_GAP) + cellW / 2,
  };
}

/** @param {number} i @param {number} total */
export function stepDelay(i, total) {
  const t = i / Math.max(1, total - 1);
  return Math.round(172 - t * 112);
}

/** @param {number} i @param {number} total @param {boolean} isArc */
export function travelDuration(i, total, isArc) {
  const base = stepDelay(i, total) * 0.48;
  return isArc ? base * 1.4 : base;
}

/** @param {number} fr @param {number} fc @param {number} tr @param {number} tc */
export function isArc(fr, fc, tr, tc) {
  return Math.abs(fr - tr) + Math.abs(fc - tc) > 1;
}

/** @param {number} chain @param {number} total @param {string} combo */
export function hopeLine(chain, total, combo) {
  if (chain <= 1) return "It's spreading…";
  if (chain === total) return "…";
  if (combo === "steam") return "Come on…";
  if (chain >= total - 1) return "One more…";
  if (chain >= Math.floor(total * 0.6)) return "Keep going…";
  return "Come on…";
}

/**
 * Frontier pitch from step context — feel only, not scoring.
 * @param {import("./config.js").Element} el
 * @param {number} chain
 * @param {number} total
 * @param {boolean} arc
 */
export function frontierPitch(el, chain, total, arc) {
  const base = { F: 240, L: 320, W: 280, C: 360 }[el] ?? 260;
  const rise = chain * 38 + (chain / total) * 40;
  return base + rise + (arc ? 35 : 0);
}

/** Spark ignition beat before first step. */
export const SPARK_BEAT_MS = 95;

/** Curtain hold before credits — breath after performance. */
export const CURTAIN_HOLD_MS = 720;

/** @param {number} t 0..1 */
export function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

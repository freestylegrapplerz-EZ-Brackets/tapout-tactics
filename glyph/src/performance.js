import { SIZE } from "./config.js";

/** @param {number} r @param {number} c */
export function cellCenter(r, c) {
  const gap = 8;
  const w = 100;
  const cellW = (w - gap * (SIZE - 1)) / SIZE;
  return {
    x: c * (cellW + gap) + cellW / 2,
    y: r * (cellW + gap) + cellW / 2,
  };
}

/** @param {number} i @param {number} total */
export function stepDelay(i, total) {
  const t = i / Math.max(1, total - 1);
  return Math.round(165 - t * 105);
}

/** @param {number} i @param {number} total @param {boolean} isArc */
export function travelDuration(i, total, isArc) {
  const base = stepDelay(i, total) * 0.45;
  return isArc ? base * 1.35 : base;
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

/** Spark ignition beat before first step (Hope Pass parity). */
export const SPARK_BEAT_MS = 85;

/** Curtain hold before credits — breath after performance. */
export const CURTAIN_HOLD_MS = 650;

/** @param {number} t 0..1 */
export function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

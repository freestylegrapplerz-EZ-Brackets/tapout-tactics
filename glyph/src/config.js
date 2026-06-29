/** GLYPH Vertical Slice — frozen rules (Hope Pass parity). Do not change without EP-approved hypothesis. */

export const SIZE = 5;
export const HAND_SIZE = 8;
export const L_RANGE = 3;

/** @typedef {"F"|"L"|"W"|"C"} Element */

/** @type {Record<Element, number>} */
export const BASE = { F: 10, L: 10, W: 12, C: 8 };

export const ELEMENT_LABELS = {
  F: "Fire",
  L: "Lightning",
  W: "Water",
  C: "Crystal",
};

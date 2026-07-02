import { ELEMENT_LABELS } from "./config.js";

/** @typedef {import("./aftermath.js").ColdKind} ColdKind */

/** @typedef {'complete'|'one_gap'|'adjacent'|'isolated'|'none'} VerdictKind */

/**
 * @typedef {Object} RunVerdict
 * @property {VerdictKind} kind
 * @property {string} headline
 * @property {string} subline
 * @property {string|null} primaryGapKey - "row,col" highlight on board
 * @property {number} coldCount
 * @property {number} litCount
 */

const KIND_PRIORITY = /** @type {Record<ColdKind, number>} */ ({
  one_gap: 0,
  adjacent: 1,
  isolated: 2,
});

/**
 * Close the One Gap — factual verdict from cold taxonomy. No tutorials.
 * @param {Map<string, ColdKind>|null} coldTaxonomy
 * @param {(import("./config.js").Element|null)[][]} grid
 * @param {number} litCount
 */
export function runVerdict(coldTaxonomy, grid, litCount) {
  if (!coldTaxonomy || coldTaxonomy.size === 0) {
    if (litCount <= 0) {
      return {
        kind: "none",
        headline: "Nothing connected.",
        subline: "Link runes before you spark.",
        primaryGapKey: null,
        coldCount: 0,
        litCount,
      };
    }
    return {
      kind: "complete",
      headline: "Every rune lit.",
      subline: "The frontier reached them all.",
      primaryGapKey: null,
      coldCount: 0,
      litCount,
    };
  }

  /** @type {{ key: string, kind: ColdKind, el: import("./config.js").Element, priority: number }[]} */
  const gaps = [];
  for (const [key, kind] of coldTaxonomy) {
    const [r, c] = key.split(",").map(Number);
    const el = grid[r]?.[c];
    if (!el) continue;
    gaps.push({ key, kind, el, priority: KIND_PRIORITY[kind] });
  }

  gaps.sort((a, b) => a.priority - b.priority || a.key.localeCompare(b.key));

  const coldCount = gaps.length;
  const primary = gaps[0];
  const name = ELEMENT_LABELS[primary.el];

  /** @type {Record<ColdKind, { headline: string, subline: string, kind: VerdictKind }>} */
  const copy = {
    one_gap: {
      kind: "one_gap",
      headline: `One cell short — ${name} never woke.`,
      subline: `${coldCount} rune${coldCount === 1 ? "" : "s"} stayed cold. The dim tile is the gap.`,
    },
    adjacent: {
      kind: "adjacent",
      headline: `So close — ${name} was right there.`,
      subline: `${coldCount} rune${coldCount === 1 ? "" : "s"} missed the chain. Touching, but cold.`,
    },
    isolated: {
      kind: "isolated",
      headline: `${name} stayed out of reach.`,
      subline: `${coldCount} rune${coldCount === 1 ? "" : "s"} never joined the wave.`,
    },
  };

  const picked = copy[primary.kind];
  return {
    kind: picked.kind,
    headline: picked.headline,
    subline: picked.subline,
    primaryGapKey: primary.key,
    coldCount,
    litCount,
  };
}

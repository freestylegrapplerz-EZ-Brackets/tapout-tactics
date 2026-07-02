/** @typedef {import("./config.js").Element} Element */
/** @typedef {import("./performances.js").PresetCell} PresetCell */

/**
 * @typedef {Object} EncounterObjective
 * @property {"score"|"chain"|"break"|"full_lit"} type
 * @property {number} [value]
 * @property {number} [minChain] - for break/full_lit: reject trivial anchor-only sparks
 * @property {boolean} [mustActivateLast] - anchor rune must be the final activation in the chain
 */

/**
 * @typedef {Object} Encounter
 * @property {string} id
 * @property {string} name
 * @property {string} invite
 * @property {Element[]} handElements
 * @property {PresetCell[]} [preset]
 * @property {PresetCell[]} [blocked]
 * @property {{ row: number, col: number }} [anchor]
 * @property {EncounterObjective} objective
 * @property {string} objectiveLabel
 * @property {string} victoryLine
 * @property {string} defeatLine
 * @property {string} [tip]
 * @property {boolean} [boss]
 * @property {{ row: number, col: number }} [requiredSpark] - win only if spark starts here
 */

/** @param {number} r @param {number} c */
export function cellKey(r, c) {
  return `${r},${c}`;
}

/** @type {Encounter} */
export const ENCOUNTER_1 = {
  id: "encounter-1-hollow",
  name: "The Hollow",
  invite: "Something dormant sleeps in the empty stage. Wake it with a chain.",
  handElements: ["F", "F", "W", "F", "F"],
  objective: { type: "score", value: 70 },
  objectiveLabel: "Awaken the Hollow · score 70+",
  victoryLine: "The Hollow stirs — your chain echoed through the stone.",
  defeatLine: "The Hollow stays silent. Build a longer chain.",
  tip: "Every encounter has a goal beyond a number — read the objective before you spark.",
};

/** @type {Encounter} */
export const ENCOUNTER_2 = {
  id: "encounter-2-scar",
  name: "The Scar",
  invite: "A stone blocks the path. Route around it — over the top works.",
  handElements: ["F", "W", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 3, el: "F" },
  ],
  blocked: [{ row: 2, col: 2, el: "F" }],
  objective: { type: "chain", value: 6 },
  objectiveLabel: "Bridge the Scar · 6-rune chain",
  victoryLine: "The Scar is bridged — the wave found a way through.",
  defeatLine: "The stone holds. Find the path over, not through.",
  tip: "Blocked cells force new routes. Lightning and side paths become your friends.",
};

/** @type {Encounter} */
export const ENCOUNTER_3 = {
  id: "encounter-3-drowned",
  name: "The Drowned Core",
  invite: "Reach the Water locked on the far right. Fire must touch it — steam it awake.",
  handElements: [],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "F" },
    { row: 2, col: 3, el: "F" },
    { row: 2, col: 4, el: "W" },
  ],
  anchor: { row: 2, col: 4 },
  objective: { type: "break", value: 1 },
  objectiveLabel: "Break the Drowned Core · reach the Water",
  victoryLine: "The Core steams awake — the drowned rune is yours.",
  defeatLine: "The Core stays cold. Connect Fire all the way to the Water.",
  tip: "Anchors are objectives disguised as runes — your chain must reach them.",
};

/** @type {Encounter} */
export const ENCOUNTER_4 = {
  id: "encounter-4-split",
  name: "The Split",
  invite: "Two clusters, one show. Link them — Lightning can jump the gap if you place it right.",
  handElements: ["L", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 0, col: 4, el: "F" },
    { row: 1, col: 4, el: "F" },
    { row: 2, col: 4, el: "F" },
  ],
  objective: { type: "chain", value: 7 },
  objectiveLabel: "Unite the Split · 7-rune chain",
  victoryLine: "The Split closes — one performance, one frontier.",
  defeatLine: "The halves stay apart. Bridge before you spark.",
  tip: "Treat each encounter like a puzzle with a story — what must your chain accomplish?",
};

/** @type {Encounter} */
export const ENCOUNTER_5 = {
  id: "encounter-5-warden",
  name: "The Rime Warden",
  boss: true,
  invite: "The Warden's heart is Crystal at center. Break it with a chain that reaches deep.",
  handElements: ["F", "W", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "C" },
    { row: 1, col: 2, el: "F" },
    { row: 2, col: 3, el: "W" },
  ],
  anchor: { row: 2, col: 2 },
  blocked: [
    { row: 0, col: 2, el: "F" },
    { row: 4, col: 2, el: "F" },
  ],
  objective: { type: "break", value: 1 },
  objectiveLabel: "Shatter the Warden · break the Crystal heart",
  victoryLine: "The Rime Warden shatters — the stage is yours.",
  defeatLine: "The Warden endures. Reach the Crystal heart with your chain.",
  tip: "Bosses are boards with a purpose. You are not chasing a score — you are breaking something.",
};

export const ENCOUNTER_RUN = [
  ENCOUNTER_1,
  ENCOUNTER_2,
  ENCOUNTER_3,
  ENCOUNTER_4,
  ENCOUNTER_5,
];

/** @param {string} id */
export function encounterIndex(id) {
  return ENCOUNTER_RUN.findIndex((e) => e.id === id);
}

/** @param {string} id @returns {Encounter|null} */
export function nextEncounter(id) {
  const i = encounterIndex(id);
  if (i < 0 || i >= ENCOUNTER_RUN.length - 1) return null;
  return ENCOUNTER_RUN[i + 1];
}

/** @param {Encounter} enc @param {(Element|null)[][]} grid */
export function applyEncounterPreset(enc, grid) {
  for (const cell of enc.preset ?? []) {
    grid[cell.row][cell.col] = cell.el;
  }
}

/** @param {Encounter} enc @returns {Set<string>} */
export function lockedKeysForEncounter(enc) {
  const keys = new Set();
  for (const cell of enc.preset ?? []) {
    keys.add(cellKey(cell.row, cell.col));
  }
  return keys;
}

/** @param {Encounter} enc @returns {Set<string>} */
export function blockedKeysForEncounter(enc) {
  const keys = new Set();
  for (const cell of enc.blocked ?? []) {
    keys.add(cellKey(cell.row, cell.col));
  }
  return keys;
}

/** @param {Encounter} enc @returns {string|null} */
export function anchorKeyForEncounter(enc) {
  return enc.anchor ? cellKey(enc.anchor.row, enc.anchor.col) : null;
}

/**
 * @param {Encounter} enc
 * @param {import("./simulation.js").CascadeResult} result
 * @param {(Element|null)[][]} gridAtSpark
 * @param {number} [sparkRow]
 * @param {number} [sparkCol]
 */
export function evaluateEncounter(enc, result, gridAtSpark, sparkRow, sparkCol) {
  const lit = new Set(result.steps.map((s) => cellKey(s.r, s.c)));
  const minChain = enc.objective.minChain ?? 0;

  if (minChain > 0 && result.chainLength < minChain) return false;

  if (enc.requiredSpark != null && sparkRow != null && sparkCol != null) {
    if (sparkRow !== enc.requiredSpark.row || sparkCol !== enc.requiredSpark.col) {
      return false;
    }
  }

  if (enc.objective.mustActivateLast) {
    if (!enc.anchor || result.steps.length === 0) return false;
    const last = result.steps[result.steps.length - 1];
    if (last.r !== enc.anchor.row || last.c !== enc.anchor.col) return false;
  }

  switch (enc.objective.type) {
    case "score":
      return result.finalScore >= (enc.objective.value ?? 0);
    case "chain":
      return result.chainLength >= (enc.objective.value ?? 0);
    case "break": {
      if (!enc.anchor) return false;
      const key = cellKey(enc.anchor.row, enc.anchor.col);
      return lit.has(key) && result.chainLength > 0;
    }
    case "full_lit": {
      for (let r = 0; r < gridAtSpark.length; r++) {
        for (let c = 0; c < gridAtSpark[r].length; c++) {
          if (gridAtSpark[r][c] && !lit.has(cellKey(r, c))) return false;
        }
      }
      return result.chainLength > 0;
    }
    default:
      return false;
  }
}

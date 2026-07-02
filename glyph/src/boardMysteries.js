/** @typedef {import("./config.js").Element} Element */
/** @typedef {import("./performances.js").PresetCell} PresetCell */
/** @typedef {import("./encounters.js").EncounterObjective} EncounterObjective */

/**
 * A curated spatial question — same mechanics as encounters, question-first framing.
 * @typedef {Object} BoardMystery
 * @property {string} id
 * @property {string} name
 * @property {string} question - The one beautiful spatial question
 * @property {string} invite - Board setup hint
 * @property {Element[]} handElements
 * @property {PresetCell[]} [preset]
 * @property {PresetCell[]} [blocked]
 * @property {{ row: number, col: number }} [anchor]
 * @property {EncounterObjective} objective
 * @property {string} objectiveLabel
 * @property {string} victoryLine
 * @property {string} defeatLine
 * @property {string} [tip]
 * @property {{ row: number, col: number }} [requiredSpark]
 */

/** @type {BoardMystery} */
export const MYSTERY_1 = {
  id: "mystery-1-gap",
  name: "The Gap",
  question: "What single rune bridges two Fires across one empty cell?",
  invite: "Two embers face each other. The answer lives in the space between.",
  handElements: ["W"],
  preset: [
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 3, el: "F" },
  ],
  objective: { type: "chain", value: 3 },
  objectiveLabel: "Bridge the Gap · connect all three",
  victoryLine: "The gap closes — one rune, one chain.",
  defeatLine: "The Fires stay apart. Fill the cell between them.",
  tip: "Sometimes the whole puzzle is one placement.",
};

/** @type {BoardMystery} */
export const MYSTERY_2 = {
  id: "mystery-2-firestarter",
  name: "Firestarter",
  question: "Can Fire travel diagonally?",
  invite: "Try to wake both Fires using only the Fire runes in your hand.",
  handElements: ["F", "F", "F"],
  preset: [
    { row: 1, col: 1, el: "F" },
    { row: 3, col: 3, el: "F" },
  ],
  objective: { type: "chain", value: 5 },
  objectiveLabel: "Awaken every Fire.",
  victoryLine: "Fire only spreads in straight lines.",
  defeatLine: "Something interrupted the flame.",
  tip: "Fire spreads up, down, left, and right—not diagonally.",
};

/** @type {BoardMystery} */
export const MYSTERY_3 = {
  id: "mystery-3-jump",
  name: "The Jump",
  question: "Can Lightning cross a gap that Fire cannot?",
  invite: "One space separates the two Fires. Find a way to unite them.",
  handElements: ["L"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 4, el: "F" },
  ],
  requiredSpark: { row: 2, col: 0 },
  objective: { type: "chain", value: 3 },
  objectiveLabel: "Awaken every Fire.",
  victoryLine: "Lightning can bridge what Fire cannot.",
  defeatLine: "The energy couldn't cross the gap.",
  tip: "Some elements travel differently.",
};

/** @type {BoardMystery} */
export const MYSTERY_4 = {
  id: "mystery-4-fork",
  name: "The Fork",
  question: "Two halves — which side holds the key to the Crystal?",
  invite: "The board splits left and right. Only one half reaches the heart.",
  handElements: [],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "C" },
    { row: 2, col: 4, el: "F" },
    { row: 3, col: 4, el: "F" },
    { row: 4, col: 4, el: "F" },
  ],
  anchor: { row: 2, col: 2 },
  objective: { type: "break", value: 1, minChain: 3 },
  objectiveLabel: "Choose the Fork · reach the Crystal from the left",
  victoryLine: "The left path was true — the Crystal sings.",
  defeatLine: "The right half goes nowhere. Spark from the side that touches the Crystal.",
  tip: "Same board, different spark — only one half can reach the heart.",
};

/** @type {BoardMystery} */
export const MYSTERY_5 = {
  id: "mystery-5-wall",
  name: "The Wall",
  question: "Stone blocks the straight path. Where does the chain go instead?",
  invite: "You cannot cross the center. Route over or under.",
  handElements: ["F", "W"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 3, el: "F" },
    { row: 2, col: 4, el: "F" },
  ],
  blocked: [{ row: 2, col: 2, el: "F" }],
  objective: { type: "chain", value: 6 },
  objectiveLabel: "Cross the Wall · 6-rune chain",
  victoryLine: "The wall is irrelevant — your chain found the way around.",
  defeatLine: "The stone holds. Build a path that routes around it.",
  tip: "Blocked cells are questions disguised as obstacles.",
};

/** @type {BoardMystery} */
export const MYSTERY_6 = {
  id: "mystery-6-steam",
  name: "The Steam Door",
  question: "Water waits behind the line. What placement turns it to steam?",
  invite: "Fire leads. Water follows. Something must connect them.",
  handElements: ["F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 2, el: "F" },
    { row: 2, col: 4, el: "W" },
  ],
  anchor: { row: 2, col: 4 },
  objective: { type: "break", value: 1, minChain: 5 },
  objectiveLabel: "Open the Steam Door · reach the Water",
  victoryLine: "Steam rises — the door opens.",
  defeatLine: "The Water stays cold. Fire must touch it through the gap.",
  tip: "Water awakened by Fire becomes steam. Route matters.",
};

/** @type {BoardMystery} */
export const MYSTERY_7 = {
  id: "mystery-7-island",
  name: "The Island",
  question: "A lone rune sits on a distant island — will the wave reach it?",
  invite: "The mainland is ready. The island rune waits alone.",
  handElements: ["L", "F"],
  preset: [
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 1, el: "F" },
    { row: 0, col: 4, el: "W" },
  ],
  anchor: { row: 0, col: 4 },
  objective: { type: "break", value: 1, minChain: 4 },
  objectiveLabel: "Reach the Island · awaken the distant Water",
  victoryLine: "The island rune wakes — the wave crossed open water.",
  defeatLine: "The island stays silent. Bridge the distance first.",
  tip: "Distance is a spatial question. Lightning and side paths answer it.",
};

/** @type {BoardMystery} */
export const MYSTERY_8 = {
  id: "mystery-8-heart",
  name: "The Heart",
  question: "Crystal at the center, paths split — can one chain embrace it all?",
  invite: "The heart is locked between stones. Find the line that reaches it.",
  handElements: ["L"],
  preset: [
    { row: 1, col: 2, el: "F" },
    { row: 2, col: 0, el: "F" },
    { row: 2, col: 2, el: "C" },
    { row: 2, col: 4, el: "F" },
    { row: 3, col: 2, el: "F" },
  ],
  anchor: { row: 2, col: 2 },
  blocked: [
    { row: 2, col: 1, el: "F" },
    { row: 2, col: 3, el: "F" },
  ],
  objective: { type: "break", value: 1 },
  objectiveLabel: "Break the Heart · reach the Crystal",
  victoryLine: "The heart shatters in light — every path was worth finding.",
  defeatLine: "The Crystal stays cold. The side paths hold the answer.",
  tip: "When the center is blocked, the answer is often a jump.",
};

export const BOARD_MYSTERIES = [
  MYSTERY_1,
  MYSTERY_2,
  MYSTERY_3,
  MYSTERY_4,
  MYSTERY_5,
  MYSTERY_6,
  MYSTERY_7,
  MYSTERY_8,
];

/** @param {string} id */
export function boardIndex(id) {
  return BOARD_MYSTERIES.findIndex((b) => b.id === id);
}

/** @param {string} id @returns {BoardMystery|null} */
export function nextBoard(id) {
  const i = boardIndex(id);
  if (i < 0 || i >= BOARD_MYSTERIES.length - 1) return null;
  return BOARD_MYSTERIES[i + 1];
}

/** @param {BoardMystery} board @returns {import("./encounters.js").Encounter} */
export function asEncounter(board) {
  return /** @type {import("./encounters.js").Encounter} */ (board);
}

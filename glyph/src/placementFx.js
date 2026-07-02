/** Sprint 1 — placement feel. Presentation only; rules unchanged. */

const ADJ = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

/**
 * @param {HTMLElement} boardEl
 * @param {HTMLElement|null} stageWrap
 * @param {number} r
 * @param {number} c
 * @param {import("./config.js").Element} el
 * @param {(Element|null)[][]} grid
 * @param {{ place?: (el: string) => void }} [audio]
 */
export function acknowledgePlacement(boardEl, stageWrap, r, c, el, grid, audio) {
  const cell = boardEl.querySelector(`#cell-${r}-${c}`);
  if (!cell) return;

  cell.classList.remove("place-land", `place-${el}`);
  void cell.offsetWidth;
  cell.classList.add("place-land", `place-${el}`);

  if (stageWrap) {
    stageWrap.classList.remove("stage-settle");
    void stageWrap.offsetWidth;
    stageWrap.classList.add("stage-settle");
    window.setTimeout(() => stageWrap.classList.remove("stage-settle"), 320);
  }

  pulseAdjacent(boardEl, grid, r, c);

  audio?.place?.(el);

  window.setTimeout(() => {
    cell.classList.remove("place-land", `place-${el}`);
  }, 480);
}

/**
 * @param {HTMLElement} boardEl
 * @param {(Element|null)[][]} grid
 * @param {number} r
 * @param {number} c
 */
function pulseAdjacent(boardEl, grid, r, c) {
  for (const [dr, dc] of ADJ) {
    const nr = r + dr;
    const nc = c + dc;
    if (!grid[nr]?.[nc]) continue;
    const neighbor = boardEl.querySelector(`#cell-${nr}-${nc}`);
    if (!neighbor) continue;
    neighbor.classList.remove("neighbor-pulse");
    void neighbor.offsetWidth;
    neighbor.classList.add("neighbor-pulse");
    window.setTimeout(() => neighbor.classList.remove("neighbor-pulse"), 360);
  }
}

/**
 * @param {HTMLElement} boardEl
 * @param {(row: number, col: number) => boolean} canDropAt
 */
export function showDropEligible(boardEl, canDropAt) {
  clearDropEligible(boardEl);
  boardEl.querySelectorAll(".cell.empty").forEach((cell) => {
    const id = cell.id;
    if (!id?.startsWith("cell-")) return;
    const [, row, col] = id.split("-").map(Number);
    if (canDropAt(row, col)) cell.classList.add("drop-eligible");
  });
}

/** @param {HTMLElement} boardEl */
export function clearDropEligible(boardEl) {
  boardEl.querySelectorAll(".drop-eligible").forEach((el) => el.classList.remove("drop-eligible"));
}

/** @param {HTMLElement|null} ghost */
export function wiggleGhost(ghost) {
  if (!ghost) return;
  ghost.classList.remove("ghost-invalid");
  void ghost.offsetWidth;
  ghost.classList.add("ghost-invalid");
  window.setTimeout(() => ghost.classList.remove("ghost-invalid"), 280);
}

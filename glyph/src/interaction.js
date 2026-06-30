/** Crafted pointer interactions — feel only; game rules unchanged. */

const DRAG_THRESHOLD = 8;
const LONG_PRESS_MS = 450;

/**
 * @typedef {Object} InteractionOptions
 * @property {HTMLElement} handEl
 * @property {HTMLElement} boardEl
 * @property {HTMLElement} rootEl
 * @property {() => boolean} canInteract
 * @property {(index: number) => void} onSelect
 * @property {(index: number, row: number, col: number) => boolean} onPlace
 * @property {(row: number, col: number) => boolean} onPickup
 * @property {(row: number, col: number) => void} onSpark
 * @property {(row: number, col: number) => void} onEmptyTap
 * @property {{ pick?: () => void, drop?: () => void, cancel?: () => void, spark?: () => void }} [audio]
 */

/**
 * @param {InteractionOptions} opts
 * @returns {{ destroy: () => void }}
 */
export function attachInteractions(opts) {
  /** @type {HTMLElement|null} */
  let ghost = null;
  /** @type {number|null} */
  let dragHandIndex = null;
  /** @type {string|null} */
  let dragElement = null;
  let dragging = false;
  let pointerId = null;

  /** @type {{ row: number, col: number }|null} */
  let pressCell = null;
  /** @type {number|null} */
  let longPressTimer = null;
  let longPressFired = false;

  /** @type {string|null} */
  let dropTargetKey = null;

  function clearDropTarget() {
    if (!dropTargetKey) return;
    const prev = opts.boardEl.querySelector(`#cell-${dropTargetKey.replace(",", "-")}`);
    prev?.classList.remove("drop-target");
    dropTargetKey = null;
  }

  function setDropTarget(row, col) {
    const key = `${row},${col}`;
    if (dropTargetKey === key) return;
    clearDropTarget();
    dropTargetKey = key;
    opts.boardEl.querySelector(`#cell-${row}-${col}`)?.classList.add("drop-target");
  }

  function removeGhost() {
    ghost?.remove();
    ghost = null;
  }

  /**
   * @param {string} el
   * @param {number} x
   * @param {number} y
   */
  function showGhost(el, x, y) {
    removeGhost();
    ghost = document.createElement("div");
    ghost.className = `drag-ghost ${el}`;
    ghost.textContent = el;
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    opts.rootEl.appendChild(ghost);
  }

  function moveGhost(x, y) {
    if (!ghost) return;
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
  }

  /**
   * @param {number} clientX
   * @param {number} clientY
   * @returns {{ row: number, col: number }|null}
   */
  function cellAt(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    const cell = el?.closest?.(".cell");
    if (!cell?.id?.startsWith("cell-")) return null;
    const [, row, col] = cell.id.split("-").map(Number);
    return { row, col };
  }

  function cancelLongPress() {
    if (longPressTimer != null) {
      clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  }

  function resetPointerState() {
    cancelLongPress();
    dragging = false;
    dragHandIndex = null;
    dragElement = null;
    pointerId = null;
    pressCell = null;
    longPressFired = false;
    removeGhost();
    clearDropTarget();
    document.body.classList.remove("is-dragging");
  }

  /**
   * @param {PointerEvent} e
   */
  function onHandPointerDown(e) {
    if (!opts.canInteract()) return;
    const rune = e.target.closest(".rune");
    if (!rune || rune.classList.contains("used")) return;

    const all = [...opts.handEl.querySelectorAll(".rune")];
    const index = all.indexOf(rune);
    if (index < 0) return;

    pointerId = e.pointerId;
    dragHandIndex = index;
    dragElement = rune.className.match(/\b(F|L|W|C)\b/)?.[0] ?? null;
    dragging = false;

    rune.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  /**
   * @param {PointerEvent} e
   */
  function onHandPointerMove(e) {
    if (pointerId !== e.pointerId || dragHandIndex == null || !dragElement) return;

    if (!dragging) {
      const rune = opts.handEl.querySelectorAll(".rune")[dragHandIndex];
      const rect = rune?.getBoundingClientRect();
      if (!rect) return;
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;

      dragging = true;
      document.body.classList.add("is-dragging");
      opts.onSelect(dragHandIndex);
      opts.audio?.pick?.();
      showGhost(dragElement, e.clientX, e.clientY);
      rune?.classList.add("lift");
    }

    moveGhost(e.clientX, e.clientY);
    const cell = cellAt(e.clientX, e.clientY);
    if (cell) setDropTarget(cell.row, cell.col);
    else clearDropTarget();
  }

  /**
   * @param {PointerEvent} e
   */
  function onHandPointerUp(e) {
    if (pointerId !== e.pointerId) return;

    const index = dragHandIndex;
    const wasDragging = dragging;
    const el = dragElement;

    opts.handEl.querySelectorAll(".rune").forEach((r) => r.classList.remove("lift"));

    if (wasDragging && index != null && el) {
      const cell = cellAt(e.clientX, e.clientY);
      if (cell && opts.onPlace(index, cell.row, cell.col)) {
        opts.audio?.drop?.();
      } else {
        opts.audio?.cancel?.();
      }
    } else if (index != null && !wasDragging) {
      opts.onSelect(index);
      opts.audio?.pick?.();
    }

    resetPointerState();
  }

  /**
   * @param {PointerEvent} e
   */
  function onBoardPointerDown(e) {
    if (!opts.canInteract()) return;
    const cellEl = e.target.closest(".cell");
    if (!cellEl?.id?.startsWith("cell-")) return;

    const [, row, col] = cellEl.id.split("-").map(Number);
    pointerId = e.pointerId;
    pressCell = { row, col };
    longPressFired = false;
    dragging = false;

    cellEl.setPointerCapture(e.pointerId);

    longPressTimer = window.setTimeout(() => {
      longPressFired = true;
      if (opts.onPickup(row, col)) {
        cellEl.classList.add("pickup-hint");
        window.setTimeout(() => cellEl.classList.remove("pickup-hint"), 350);
        opts.audio?.pick?.();
      }
    }, LONG_PRESS_MS);

    e.preventDefault();
  }

  /**
   * @param {PointerEvent} e
   */
  function onBoardPointerMove(e) {
    if (pointerId !== e.pointerId || !pressCell) return;
    const cellEl = opts.boardEl.querySelector(`#cell-${pressCell.row}-${pressCell.col}`);
    const rect = cellEl?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    if (Math.hypot(dx, dy) > DRAG_THRESHOLD) cancelLongPress();
  }

  /**
   * @param {PointerEvent} e
   */
  function onBoardPointerUp(e) {
    if (pointerId !== e.pointerId || !pressCell) return;

    const { row, col } = pressCell;
    cancelLongPress();

    if (!longPressFired && !dragging) {
      const cellEl = opts.boardEl.querySelector(`#cell-${row}-${col}`);
      const isOccupied = cellEl && !cellEl.classList.contains("empty");

      if (isOccupied) {
        cellEl.classList.add("spark-igniting");
        opts.audio?.spark?.();
        window.setTimeout(() => {
          cellEl.classList.remove("spark-igniting");
          opts.onSpark(row, col);
        }, 260);
      } else {
        opts.onEmptyTap(row, col);
      }
    }

    resetPointerState();
  }

  function onContextMenu(e) {
    e.preventDefault();
    if (!opts.canInteract()) return;
    const cellEl = e.target.closest(".cell");
    if (!cellEl?.id?.startsWith("cell-")) return;
    const [, row, col] = cellEl.id.split("-").map(Number);
    if (opts.onPickup(row, col)) {
      cellEl.classList.add("pickup-hint");
      window.setTimeout(() => cellEl.classList.remove("pickup-hint"), 350);
      opts.audio?.pick?.();
    }
  }

  opts.handEl.addEventListener("pointerdown", onHandPointerDown);
  opts.handEl.addEventListener("pointermove", onHandPointerMove);
  opts.handEl.addEventListener("pointerup", onHandPointerUp);
  opts.handEl.addEventListener("pointercancel", resetPointerState);

  opts.boardEl.addEventListener("pointerdown", onBoardPointerDown);
  opts.boardEl.addEventListener("pointermove", onBoardPointerMove);
  opts.boardEl.addEventListener("pointerup", onBoardPointerUp);
  opts.boardEl.addEventListener("pointercancel", resetPointerState);
  opts.boardEl.addEventListener("contextmenu", onContextMenu);

  return {
    destroy() {
      resetPointerState();
      opts.handEl.removeEventListener("pointerdown", onHandPointerDown);
      opts.handEl.removeEventListener("pointermove", onHandPointerMove);
      opts.handEl.removeEventListener("pointerup", onHandPointerUp);
      opts.handEl.removeEventListener("pointercancel", resetPointerState);
      opts.boardEl.removeEventListener("pointerdown", onBoardPointerDown);
      opts.boardEl.removeEventListener("pointermove", onBoardPointerMove);
      opts.boardEl.removeEventListener("pointerup", onBoardPointerUp);
      opts.boardEl.removeEventListener("pointercancel", resetPointerState);
      opts.boardEl.removeEventListener("contextmenu", onContextMenu);
    },
  };
}

import { SIZE } from "./config.js";
import {
  computeTarget,
  emptyGrid,
  simulateCascade,
} from "./simulation.js";
import { playCascade } from "./cascadeRenderer.js";
import { createAudio } from "./audio.js";
import { analyzeAftermath, coldClassForKind } from "./aftermath.js";
import { getActivePerformance, handFromElements } from "./performances.js";
import { attachInteractions } from "./interaction.js";

export const VERSION = "vs-0.4.0-craftsmanship-c1";

/** @typedef {import("./config.js").Element} Element */
/** @typedef {"build"|"resolving"|"curtain"|"done"} Phase */

/**
 * @param {HTMLElement} root
 */
export function bootGame(root) {
  /** @type {Phase} */
  let phase = "build";
  /** @type {(Element|null)[][]} */
  let grid = emptyGrid();
  /** @type {{ el: Element, used: boolean }[]} */
  let hand = [];
  /** @type {number|null} */
  let sel = null;
  let target = 0;
  let best = 0;
  /** @type {Set<string>} */
  let litSet = new Set();
  /** @type {string|null} */
  let sparkOriginKey = null;
  /** @type {Map<string, import("./aftermath.js").ColdKind>|null} */
  let coldTaxonomy = null;
  /** @type {{ cancel: () => void }|null} */
  let activeCascade = null;

  const audio = createAudio();

  const boardEl = /** @type {HTMLDivElement} */ (root.querySelector("#board"));
  const handEl = /** @type {HTMLDivElement} */ (root.querySelector("#hand"));
  const svgEl = /** @type {SVGSVGElement} */ (root.querySelector("#travelSvg"));
  const chainEl = /** @type {HTMLDivElement} */ (root.querySelector("#vChain"));
  const hopeEl = /** @type {HTMLDivElement} */ (root.querySelector("#vHope"));
  const creditsEl = /** @type {HTMLDivElement} */ (root.querySelector("#credits"));
  const scoreEl = /** @type {HTMLDivElement} */ (root.querySelector("#vScore"));
  const metaEl = /** @type {HTMLDivElement} */ (root.querySelector("#vMeta"));
  const msgEl = /** @type {HTMLDivElement} */ (root.querySelector("#msg"));
  const versionEl = /** @type {HTMLDivElement} */ (root.querySelector("#version"));
  const muteBtn = /** @type {HTMLButtonElement} */ (root.querySelector("#btnMute"));

  const activePerformance = getActivePerformance();

  versionEl.textContent = VERSION;

  function loadPerformanceHand() {
    hand = handFromElements(activePerformance.handElements);
    target = computeTarget(hand);
    best = 0;
    clearBoard();
    console.info("[glyph:performance]", {
      version: VERSION,
      performanceId: activePerformance.id,
    });
  }

  function newHand() {
    loadPerformanceHand();
  }

  function clearBoard() {
    activeCascade?.cancel();
    activeCascade = null;
    grid = emptyGrid();
    hand.forEach((h) => (h.used = false));
    sel = null;
    phase = "build";
    litSet = new Set();
    sparkOriginKey = null;
    coldTaxonomy = null;
    root.classList.remove("performance");
    creditsEl.classList.remove("show");
    chainEl.textContent = "—";
    hopeEl.textContent = "Place runes. Tap one to call Action.";
    hopeEl.classList.remove("hot");
    scoreEl.textContent = "0";
    metaEl.textContent = "";
    svgEl.innerHTML = "";
    msgEl.textContent = "Drag a rune onto the board — or hold a placed rune to pick it up.";
    render();
  }

  function render() {
    handEl.innerHTML = "";
    hand.forEach((h, i) => {
      const d = document.createElement("div");
      d.className = `rune ${h.el}${h.used ? " used" : ""}${sel === i ? " sel" : ""}`;
      d.textContent = h.el;
      handEl.appendChild(d);
    });

    boardEl.innerHTML = "";
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement("div");
        const v = grid[r][c];
        const k = `${r},${c}`;
        let cls = `cell ${v || "empty"}`;
        if (v && phase === "build") cls += " spark-ready";
        if (sparkOriginKey === k) cls += " spark-origin";
        if (litSet.has(k)) {
          cls += " lit";
        } else if (v && phase !== "build") {
          if (phase === "curtain" || phase === "done") {
            const kind = coldTaxonomy?.get(k);
            cls += kind ? ` cold ${coldClassForKind(kind)}` : " cold";
          } else {
            cls += " cold";
          }
        }
        cell.className = cls;
        cell.id = `cell-${r}-${c}`;
        cell.textContent = v || "";
        boardEl.appendChild(cell);
      }
    }
  }

  function placeFromHand(handIndex, r, c) {
    if (phase !== "build" || hand[handIndex]?.used || grid[r][c]) return false;
    grid[r][c] = hand[handIndex].el;
    hand[handIndex].used = true;
    sel = null;
    render();
    return true;
  }

  function pickupAt(r, c) {
    if (phase !== "build" || !grid[r][c]) return false;
    const el = grid[r][c];
    const slot = hand.find((h) => h.used && h.el === el);
    if (slot) slot.used = false;
    grid[r][c] = null;
    render();
    return true;
  }

  function onSelect(index) {
    if (phase !== "build" || hand[index]?.used) return;
    sel = sel === index ? null : index;
    render();
  }

  function onEmptyTap(r, c) {
    if (phase !== "build" || grid[r][c]) return;
    if (sel === null) {
      hopeEl.textContent = "Pick a rune from your hand first.";
      return;
    }
    if (placeFromHand(sel, r, c)) {
      audio.drop();
    }
  }

  function spark(sr, sc) {
    if (phase !== "build" || !grid[sr][sc]) return;

    audio.resume();
    phase = "resolving";
    sel = null;
    root.classList.add("performance");
    creditsEl.classList.remove("show");
    litSet = new Set();
    sparkOriginKey = `${sr},${sc}`;
    render();

    const { steps, finalScore, chainLength } = simulateCascade(grid, sr, sc);
    const aftermath = analyzeAftermath(grid, sr, sc, steps);
    coldTaxonomy = aftermath.coldTaxonomy;

    console.info("[glyph:spark]", {
      version: VERSION,
      performanceId: activePerformance.id,
      sparkOrigin: [sr, sc],
      chainLength,
      litCount: steps.length,
      coldCount: coldTaxonomy.size,
      coldKinds: Object.fromEntries(coldTaxonomy),
    });

    if (!chainLength) {
      hopeEl.textContent = "Nothing connected.";
      phase = "done";
      showCredits(finalScore, chainLength);
      render();
      return;
    }

    activeCascade = playCascade(steps, {
      svgEl,
      getCell: (r, c) => document.getElementById(`cell-${r}-${c}`),
      onLitChange: (next) => {
        litSet = next;
        render();
      },
      onChainUpdate: (chain) => {
        chainEl.textContent = String(chain);
        chainEl.classList.add("bump");
        window.setTimeout(() => chainEl.classList.remove("bump"), 120);
      },
      onHopeUpdate: (text, hot) => {
        hopeEl.textContent = text;
        hopeEl.classList.toggle("hot", hot);
      },
      tone: audio.tone.bind(audio),
      curtain: audio.curtain.bind(audio),
      onCurtainCall: () => {
        phase = "curtain";
        render();
      },
      onCredits: (final, chain) => {
        activeCascade = null;
        showCredits(final, chain);
        render();
      },
    });
  }

  function showCredits(final, chain) {
    phase = "done";
    if (final > best) best = final;
    scoreEl.textContent = String(final);
    const hit = final >= target;
    metaEl.textContent =
      `${chain}-rune chain · Target ${target}` +
      (hit ? " · Beat it!" : ` · Short by ${target - final}`) +
      (best ? ` · Best this session ${best}` : "");
    creditsEl.classList.add("show");
  }

  attachInteractions({
    handEl,
    boardEl,
    rootEl: root,
    canInteract: () => phase === "build",
    onSelect,
    onPlace: placeFromHand,
    onPickup: pickupAt,
    onSpark: spark,
    onEmptyTap,
    audio,
  });

  root.querySelector("#btnNew").addEventListener("click", () => {
    audio.resume();
    newHand();
  });
  root.querySelector("#btnClear").addEventListener("click", () => {
    audio.resume();
    clearBoard();
  });
  muteBtn.addEventListener("click", () => {
    audio.setMuted(!audio.isMuted());
    muteBtn.textContent = audio.isMuted() ? "🔇 Muted" : "🔊 Sound";
  });

  document.body.addEventListener(
    "pointerdown",
    () => audio.resume(),
    { once: false, passive: true },
  );

  newHand();
}

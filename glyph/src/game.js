import { SIZE, ELEMENT_LABELS } from "./config.js";
import {
  computeTarget,
  createHand,
  emptyGrid,
  simulateCascade,
} from "./simulation.js";
import { playCascade } from "./cascadeRenderer.js";
import { createAudio } from "./audio.js";
import { analyzeAftermath, coldClassForKind } from "./aftermath.js";
import {
  SYNERGY_PATH,
  applyPreset,
  handFromElements,
  lockedKeysForPerformance,
  nextInSynergyPath,
  synergyPathIndex,
  targetForPerformance,
} from "./performances.js";
import { attachInteractions } from "./interaction.js";

export const VERSION = "vs-1.2.1-synergy-path";

/** @typedef {import("./config.js").Element} Element */
/** @typedef {import("./performances.js").Performance} Performance */
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
  /** @type {Performance|null} */
  let currentPerformance = SYNERGY_PATH[0];
  let synergyPathMode = true;
  /** @type {Set<string>} */
  let lockedKeys = new Set();
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
  const stageWrap = /** @type {HTMLDivElement} */ (root.querySelector(".stage-wrap"));
  const svgEl = /** @type {SVGSVGElement} */ (root.querySelector("#travelSvg"));
  const chainEl = /** @type {HTMLDivElement} */ (root.querySelector("#vChain"));
  const hopeEl = /** @type {HTMLDivElement} */ (root.querySelector("#vHope"));
  const targetEl = /** @type {HTMLDivElement|null} */ (root.querySelector("#vTarget"));
  const onboardEl = /** @type {HTMLParagraphElement|null} */ (root.querySelector(".onboard"));
  const creditsEl = /** @type {HTMLDivElement} */ (root.querySelector("#credits"));
  const scoreEl = /** @type {HTMLDivElement} */ (root.querySelector("#vScore"));
  const metaEl = /** @type {HTMLDivElement} */ (root.querySelector("#vMeta"));
  const msgEl = /** @type {HTMLDivElement} */ (root.querySelector("#msg"));
  const versionEl = /** @type {HTMLDivElement} */ (root.querySelector("#version"));
  const handModeEl = /** @type {HTMLParagraphElement|null} */ (root.querySelector("#handMode"));
  const pathStepEl = /** @type {HTMLParagraphElement|null} */ (root.querySelector("#pathStep"));
  const synergyTipEl = /** @type {HTMLParagraphElement|null} */ (
    root.querySelector("#synergyTip")
  );
  const btnNextLesson = /** @type {HTMLButtonElement|null} */ (
    root.querySelector("#btnNextLesson")
  );
  const muteBtn = /** @type {HTMLButtonElement} */ (root.querySelector("#btnMute"));

  versionEl.textContent = VERSION;

  function updateTargetDisplay() {
    if (!targetEl) return;
    targetEl.textContent =
      phase === "build" || phase === "done" ? `Target ${target}` : "";
  }

  function updateModeCopy() {
    if (handModeEl) {
      handModeEl.textContent = currentPerformance
        ? currentPerformance.label
        : "Random hand · all four elements";
    }
    if (pathStepEl) {
      if (synergyPathMode && currentPerformance) {
        const idx = synergyPathIndex(currentPerformance.id);
        pathStepEl.textContent =
          idx >= 0
            ? `Step ${idx + 1} of ${SYNERGY_PATH.length}`
            : "";
        pathStepEl.hidden = idx < 0;
      } else {
        pathStepEl.textContent = "";
        pathStepEl.hidden = true;
      }
    }
    if (onboardEl) {
      onboardEl.textContent = currentPerformance
        ? currentPerformance.invite
        : "Place runes so they touch. Beat the target. Tap one to spark.";
    }
  }

  function updateCreditsActions() {
    if (synergyTipEl) {
      if (synergyPathMode && currentPerformance?.synergyTip) {
        synergyTipEl.textContent = currentPerformance.synergyTip;
        synergyTipEl.hidden = false;
      } else {
        synergyTipEl.textContent = "";
        synergyTipEl.hidden = true;
      }
    }
    if (btnNextLesson) {
      const next =
        synergyPathMode && currentPerformance
          ? nextInSynergyPath(currentPerformance.id)
          : null;
      btnNextLesson.hidden = !next;
      btnNextLesson.textContent = next ? "Next lesson →" : "Next lesson →";
    }
  }

  function setHope(text, hot) {
    hopeEl.classList.remove("hope-shift");
    void hopeEl.offsetWidth;
    hopeEl.textContent = text;
    hopeEl.classList.toggle("hot", hot);
    hopeEl.classList.add("hope-shift");
  }

  /** @param {Performance} perf @param {{ resetBest?: boolean }} [opts] */
  function loadPerformance(perf, opts = {}) {
    currentPerformance = perf;
    hand = handFromElements(perf.handElements);
    target = targetForPerformance(perf);
    if (opts.resetBest !== false) best = 0;
    lockedKeys = lockedKeysForPerformance(perf);

    activeCascade?.cancel();
    activeCascade = null;
    grid = emptyGrid();
    applyPreset(perf, grid);
    hand.forEach((h) => (h.used = false));
    sel = null;
    phase = "build";
    litSet = new Set();
    sparkOriginKey = null;
    coldTaxonomy = null;
    root.classList.remove("performance", "curtain-call", "cascade-active");
    stageWrap?.classList.remove("curtain-call");
    creditsEl.classList.remove("show");
    if (synergyTipEl) synergyTipEl.hidden = true;
    if (btnNextLesson) btnNextLesson.hidden = true;
    chainEl.textContent = "—";
    chainEl.classList.remove("live");
    scoreEl.textContent = "0";
    metaEl.textContent = "";
    svgEl.innerHTML = "";

    if (perf.handElements.length === 0 && perf.preset?.length) {
      setHope("Board is ready — tap a rune to spark.", false);
      msgEl.textContent = "Tap a rune on the board to start the chain.";
    } else {
      setHope("Place runes. Tap one to call Action.", false);
      msgEl.textContent =
        "Drag a rune onto the board — or hold a placed rune to pick it up.";
    }

    updateModeCopy();
    updateTargetDisplay();
    render();
    console.info("[glyph:performance]", {
      version: VERSION,
      performanceId: perf.id,
      presetCells: perf.preset?.length ?? 0,
    });
  }

  function newHand() {
    currentPerformance = null;
    synergyPathMode = false;
    lockedKeys = new Set();
    hand = createHand();
    target = computeTarget(hand);
    best = 0;
    resetBoardState();
    updateModeCopy();
    updateTargetDisplay();
    console.info("[glyph:hand]", {
      version: VERSION,
      mode: "random",
      elements: hand.map((h) => h.el),
    });
  }

  function resetBoardState() {
    activeCascade?.cancel();
    activeCascade = null;
    grid = emptyGrid();
    hand.forEach((h) => (h.used = false));
    sel = null;
    phase = "build";
    litSet = new Set();
    sparkOriginKey = null;
    coldTaxonomy = null;
    root.classList.remove("performance", "curtain-call", "cascade-active");
    stageWrap?.classList.remove("curtain-call");
    creditsEl.classList.remove("show");
    if (synergyTipEl) synergyTipEl.hidden = true;
    if (btnNextLesson) btnNextLesson.hidden = true;
    chainEl.textContent = "—";
    chainEl.classList.remove("live");
    setHope("Place runes. Tap one to call Action.", false);
    scoreEl.textContent = "0";
    metaEl.textContent = "";
    svgEl.innerHTML = "";
    msgEl.textContent = "Drag a rune onto the board — or hold a placed rune to pick it up.";
    render();
  }

  function clearBoard() {
    if (currentPerformance) {
      loadPerformance(currentPerformance, { resetBest: false });
      return;
    }
    resetBoardState();
    updateTargetDisplay();
  }

  function render() {
    handEl.innerHTML = "";
    hand.forEach((h, i) => {
      const d = document.createElement("div");
      d.className = `rune ${h.el}${h.used ? " used" : ""}${sel === i ? " sel" : ""}`;
      d.textContent = h.el;
      d.setAttribute("aria-label", ELEMENT_LABELS[h.el]);
      handEl.appendChild(d);
    });

    boardEl.innerHTML = "";
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement("div");
        const v = grid[r][c];
        const k = `${r},${c}`;
        let cls = `cell ${v || "empty"}`;
        if (lockedKeys.has(k)) cls += " locked";
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
        if (v) cell.setAttribute("aria-label", ELEMENT_LABELS[v]);
        boardEl.appendChild(cell);
      }
    }
    updateTargetDisplay();
  }

  function placeFromHand(handIndex, r, c) {
    if (phase !== "build" || hand[handIndex]?.used || grid[r][c]) return false;
    if (lockedKeys.has(`${r},${c}`)) return false;
    grid[r][c] = hand[handIndex].el;
    hand[handIndex].used = true;
    sel = null;
    render();
    return true;
  }

  function pickupAt(r, c) {
    if (phase !== "build" || !grid[r][c]) return false;
    if (lockedKeys.has(`${r},${c}`)) return false;
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
      setHope("Pick a rune from your hand first.", false);
      return;
    }
    if (placeFromHand(sel, r, c)) {
      audio.drop();
    }
  }

  function spark(sr, sc) {
    if (phase !== "build" || !grid[sr][sc]) return;

    audio.resume();
    audio.startRoom();
    phase = "resolving";
    sel = null;
    root.classList.add("performance", "cascade-active");
    creditsEl.classList.remove("show");
    litSet = new Set();
    sparkOriginKey = `${sr},${sc}`;
    chainEl.classList.add("live");
    render();

    const { steps, finalScore, chainLength } = simulateCascade(grid, sr, sc);
    const aftermath = analyzeAftermath(grid, sr, sc, steps);
    coldTaxonomy = aftermath.coldTaxonomy;

    console.info("[glyph:spark]", {
      version: VERSION,
      performanceId: currentPerformance?.id ?? "random",
      sparkOrigin: [sr, sc],
      chainLength,
      litCount: steps.length,
      coldCount: coldTaxonomy.size,
      coldKinds: Object.fromEntries(coldTaxonomy),
    });

    if (!chainLength) {
      setHope("Nothing connected.", false);
      phase = "done";
      root.classList.remove("performance");
      chainEl.classList.remove("live");
      audio.stopRoom();
      showCredits(finalScore, chainLength);
      render();
      return;
    }

    activeCascade = playCascade(steps, {
      svgEl,
      sparkRow: sr,
      sparkCol: sc,
      getCell: (r, c) => document.getElementById(`cell-${r}-${c}`),
      onLitChange: (next) => {
        litSet = next;
        render();
      },
      onChainUpdate: (chain) => {
        chainEl.textContent = String(chain);
        chainEl.classList.add("bump");
        window.setTimeout(() => chainEl.classList.remove("bump"), 130);
      },
      onHopeUpdate: (text, hot) => setHope(text, hot),
      tone: audio.tone.bind(audio),
      frontierHit: audio.frontierHit.bind(audio),
      curtain: audio.curtain.bind(audio),
      onCurtainCall: () => {
        phase = "curtain";
        root.classList.add("curtain-call");
        stageWrap?.classList.add("curtain-call");
        render();
      },
      onCredits: (final, chain) => {
        activeCascade = null;
        chainEl.classList.remove("live");
        showCredits(final, chain);
        render();
      },
    });
  }

  function showCredits(final, chain) {
    phase = "done";
    root.classList.remove("cascade-active", "curtain-call");
    stageWrap?.classList.remove("curtain-call");
    if (final > best) best = final;
    scoreEl.textContent = String(final);
    const hit = final >= target;
    if (synergyPathMode) {
      metaEl.textContent =
        `${chain}-rune chain · Scored ${final}` +
        (target ? ` · Target ${target}` : "") +
        (hit ? " · Nice!" : " · Tap Next lesson when ready") +
        (synergyPathMode && currentPerformance && !nextInSynergyPath(currentPerformance.id)
          ? " · Path complete"
          : "");
    } else {
      metaEl.textContent =
        `${chain}-rune chain · Target ${target}` +
        (hit ? " · Beat it!" : ` · Short by ${target - final}`) +
        (best ? ` · Best this session ${best}` : "");
    }
    creditsEl.classList.add("show");
    updateCreditsActions();
    updateTargetDisplay();
  }

  function startSynergyPath() {
    synergyPathMode = true;
    loadPerformance(SYNERGY_PATH[0]);
  }

  function advanceSynergyPath() {
    if (!currentPerformance) return;
    const next = nextInSynergyPath(currentPerformance.id);
    if (!next) return;
    loadPerformance(next);
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
  root.querySelector("#btnPath")?.addEventListener("click", () => {
    audio.resume();
    startSynergyPath();
  });
  btnNextLesson?.addEventListener("click", () => {
    audio.resume();
    advanceSynergyPath();
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

  startSynergyPath();
}

import {
  cellCenter,
  hopeLine,
  isArc,
  SPARK_BEAT_MS,
  CURTAIN_HOLD_MS,
  stepDelay,
  travelDuration,
} from "./performance.js";

/** @typedef {import("./simulation.js").CascadeStep} CascadeStep */

/**
 * @typedef {Object} ToneFn
 * @property {(freq: number, dur?: number, vol?: number) => void} tone
 */

/**
 * @typedef {Object} CascadeRendererOptions
 * @property {SVGSVGElement} svgEl
 * @property {(r: number, c: number) => HTMLElement|null} getCell
 * @property {(litKeys: Set<string>) => void} onLitChange
 * @property {(chain: number) => void} onChainUpdate
 * @property {(text: string, hot: boolean) => void} onHopeUpdate
 * @property {ToneFn["tone"]} [tone]
 * @property {(steps: CascadeStep[]) => void} onCurtainCall
 * @property {(finalScore: number, chainLength: number) => void} onCredits
 */

/**
 * Animate cascade from pre-computed step log. Renderer follows sim — never guesses.
 * @param {CascadeStep[]} steps
 * @param {CascadeRendererOptions} opts
 * @returns {{ cancel: () => void }}
 */
export function playCascade(steps, opts) {
  const litSet = new Set();
  let cancelled = false;
  let timeoutId = 0;
  /** @type {number|null} */
  let rafId = null;

  const total = steps.length;

  function cancel() {
    cancelled = true;
    if (timeoutId) clearTimeout(timeoutId);
    if (rafId != null) cancelAnimationFrame(rafId);
    opts.svgEl.innerHTML = "";
  }

  if (!total) {
    opts.onHopeUpdate("Nothing connected.", false);
    opts.onCredits(0, 0);
    return { cancel };
  }

  opts.onHopeUpdate("Action!", false);
  opts.tone?.(180, 0.08, 0.08);

  let i = 0;

  timeoutId = window.setTimeout(() => playStep(), SPARK_BEAT_MS);

  function playStep() {
    if (cancelled) return;
    if (i >= total) {
      curtainCall();
      return;
    }

    const s = steps[i];
    const arc = isArc(s.fromRow, s.fromCol, s.r, s.c);
    const travel = travelDuration(i, total, arc);
    const hot = s.chain >= 2;

    opts.onHopeUpdate(hopeLine(s.chain, total, s.combo), hot);

    drawTravel(s.fromRow, s.fromCol, s.r, s.c, travel, () => {
      if (cancelled) return;

      litSet.add(`${s.r},${s.c}`);
      const cell = opts.getCell(s.r, s.c);
      if (cell) {
        cell.classList.remove("cold", "approaching");
        cell.classList.add("hit", "lit");
        window.setTimeout(() => cell.classList.remove("hit"), 320);
      }

      opts.onLitChange(new Set(litSet));
      opts.onChainUpdate(s.chain);

      const pitch = 280 + s.chain * 38 + (s.el === "C" ? 90 : 0) + (arc ? 25 : 0);
      opts.tone?.(pitch, 0.07, 0.09 + (s.chain / total) * 0.06);
      if (s.combo === "steam") {
        window.setTimeout(() => opts.tone?.(pitch * 1.3, 0.05, 0.07), 40);
      }

      i++;
      const pause = Math.max(28, stepDelay(i - 1, total) - travel);
      timeoutId = window.setTimeout(playStep, pause);
    });
  }

  function curtainCall() {
    if (cancelled) return;

    opts.svgEl.innerHTML = "";
    document.querySelectorAll(".approaching").forEach((el) => el.classList.remove("approaching"));

    const chain = steps.length;
    const final = steps[chain - 1].score;

    if (chain >= 3) {
      opts.onHopeUpdate("YES!", true);
      opts.tone?.(440, 0.12, 0.12);
      window.setTimeout(() => opts.tone?.(660, 0.15, 0.1), 80);
    } else {
      opts.onHopeUpdate(chain ? "Connected." : "", false);
    }

    opts.onChainUpdate(chain);
    opts.onCurtainCall(steps);

    timeoutId = window.setTimeout(() => {
      if (!cancelled) opts.onCredits(final, chain);
    }, CURTAIN_HOLD_MS);
  }

  /**
   * @param {number} fr
   * @param {number} fc
   * @param {number} tr
   * @param {number} tc
   * @param {number} dur
   * @param {() => void} onDone
   */
  function drawTravel(fr, fc, tr, tc, dur, onDone) {
    opts.svgEl.innerHTML = "";
    if (fr < 0) {
      onDone();
      return;
    }

    const a = cellCenter(fr, fc);
    const b = cellCenter(tr, tc);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(a.x));
    line.setAttribute("y1", String(a.y));
    line.setAttribute("x2", String(a.x));
    line.setAttribute("y2", String(a.y));
    line.setAttribute("stroke", "#fff");
    line.setAttribute("stroke-width", "1.2");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("opacity", "0.85");
    opts.svgEl.appendChild(line);

    const cell = opts.getCell(tr, tc);
    cell?.classList.add("approaching");

    const t0 = performance.now();

    function frame(now) {
      if (cancelled) return;
      const t = Math.min(1, (now - t0) / dur);
      line.setAttribute("x2", String(a.x + (b.x - a.x) * t));
      line.setAttribute("y2", String(a.y + (b.y - a.y) * t));
      if (t < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        cell?.classList.remove("approaching");
        opts.svgEl.innerHTML = "";
        onDone();
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  return { cancel };
}

import {
  cellCenter,
  easeOutCubic,
  hopeLine,
  isArc,
  SPARK_BEAT_MS,
  CURTAIN_HOLD_MS,
  stepDelay,
  travelDuration,
} from "./performance.js";

/** @typedef {import("./simulation.js").CascadeStep} CascadeStep */

/** Element stroke colors for travel lines */
const EL_STROKE = { F: "#ff5638", L: "#ffd033", W: "#38a8ff", C: "#c05cff" };

/**
 * @typedef {Object} CascadeRendererOptions
 * @property {SVGSVGElement} svgEl
 * @property {(r: number, c: number) => HTMLElement|null} getCell
 * @property {(litKeys: Set<string>) => void} onLitChange
 * @property {(chain: number) => void} onChainUpdate
 * @property {(text: string, hot: boolean) => void} onHopeUpdate
 * @property {(freq: number, dur?: number, vol?: number) => void} [tone]
 * @property {(strong: boolean) => void} [curtain]
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
  opts.tone?.(180, 0.1, 0.07);

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

    drawTravel(s, travel, () => {
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

      const pitch = 260 + s.chain * 42 + (s.el === "C" ? 85 : 0) + (arc ? 30 : 0);
      const vol = 0.07 + (s.chain / total) * 0.07;
      opts.tone?.(pitch, 0.08, vol);
      if (s.combo === "steam") {
        window.setTimeout(() => opts.tone?.(pitch * 1.35, 0.06, vol * 0.85), 45);
      }

      i++;
      const pause = Math.max(32, stepDelay(i - 1, total) - travel);
      timeoutId = window.setTimeout(playStep, pause);
    });
  }

  function curtainCall() {
    if (cancelled) return;

    opts.svgEl.innerHTML = "";
    document.querySelectorAll(".approaching").forEach((el) => el.classList.remove("approaching"));

    const chain = steps.length;
    const final = steps[chain - 1].score;
    const strong = chain >= 3;

    opts.onHopeUpdate(strong ? "YES!" : chain ? "Connected." : "", strong);
    opts.curtain?.(strong);
    opts.onChainUpdate(chain);
    opts.onCurtainCall(steps);

    timeoutId = window.setTimeout(() => {
      if (!cancelled) opts.onCredits(final, chain);
    }, CURTAIN_HOLD_MS);
  }

  /**
   * @param {CascadeStep} step
   * @param {number} dur
   * @param {() => void} onDone
   */
  function drawTravel(step, dur, onDone) {
    opts.svgEl.innerHTML = "";
    const { fromRow: fr, fromCol: fc, r: tr, c: tc, el } = step;

    if (fr < 0) {
      onDone();
      return;
    }

    const a = cellCenter(fr, fc);
    const b = cellCenter(tr, tc);
    const stroke = EL_STROKE[el] ?? "#fff";

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(a.x));
    line.setAttribute("y1", String(a.y));
    line.setAttribute("x2", String(a.x));
    line.setAttribute("y2", String(a.y));
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", "1.6");
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("opacity", "0.92");
    opts.svgEl.appendChild(line);

    const glow = document.createElementNS("http://www.w3.org/2000/svg", "line");
    glow.setAttribute("x1", String(a.x));
    glow.setAttribute("y1", String(a.y));
    glow.setAttribute("x2", String(a.x));
    glow.setAttribute("y2", String(a.y));
    glow.setAttribute("stroke", "#ffffff");
    glow.setAttribute("stroke-width", "0.6");
    glow.setAttribute("stroke-linecap", "round");
    glow.setAttribute("opacity", "0.55");
    opts.svgEl.appendChild(glow);

    const cell = opts.getCell(tr, tc);
    cell?.classList.add("approaching");

    const t0 = performance.now();

    function frame(now) {
      if (cancelled) return;
      const raw = Math.min(1, (now - t0) / dur);
      const t = easeOutCubic(raw);
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;
      line.setAttribute("x2", String(x));
      line.setAttribute("y2", String(y));
      glow.setAttribute("x2", String(x));
      glow.setAttribute("y2", String(y));
      if (raw < 1) {
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

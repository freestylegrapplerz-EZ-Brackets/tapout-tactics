import {
  cellCenter,
  easeOutCubic,
  frontierPitch,
  hopeLine,
  isArc,
  SPARK_BEAT_MS,
  CURTAIN_HOLD_MS,
  stepDelay,
  travelDuration,
} from "./performance.js";
import {
  elementFxName,
  lightningPoints,
  spawnStepFeedback,
} from "./cascadeFx.js";

/** @typedef {import("./simulation.js").CascadeStep} CascadeStep */
/** @typedef {import("./config.js").Element} Element */

/** Element stroke colors for travel lines */
const EL_STROKE = { F: "#ff5638", L: "#ffd033", W: "#38a8ff", C: "#c05cff" };

/**
 * @typedef {Object} CascadeRendererOptions
 * @property {SVGSVGElement} svgEl
 * @property {number} sparkRow
 * @property {number} sparkCol
 * @property {(r: number, c: number) => HTMLElement|null} getCell
 * @property {(litKeys: Set<string>) => void} onLitChange
 * @property {(chain: number) => void} onChainUpdate
 * @property {(text: string, hot: boolean) => void} onHopeUpdate
 * @property {(freq: number, dur?: number, vol?: number) => void} [tone]
 * @property {(el: Element, chain: number, total: number, arc: boolean) => void} [frontierHit]
 * @property {(strong: boolean) => void} [curtain]
 * @property {() => void} onCurtainCall
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
    document.querySelectorAll(".cascade-pop, .cascade-mult, .cascade-tag").forEach((el) => el.remove());
  }

  if (!total) {
    opts.onHopeUpdate("Nothing connected.", false);
    opts.onCredits(0, 0);
    return { cancel };
  }

  opts.onHopeUpdate("Action!", false);
  opts.tone?.(180, 0.12, 0.06);

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
    const prevMult = i > 0 ? steps[i - 1].mult : 1;

    opts.onHopeUpdate(hopeLine(s.chain, total, s.combo, s.el), hot);

    drawTravel(s, travel, arc, () => {
      if (cancelled) return;

      litSet.add(`${s.r},${s.c}`);
      const cell = opts.getCell(s.r, s.c);
      if (cell) {
        cell.classList.remove("cold", "approaching");
        cell.classList.add("hit", "lit");
        spawnStepFeedback(cell, s, prevMult, total);
        window.setTimeout(() => cell.classList.remove("hit"), 340);
      }

      opts.onLitChange(new Set(litSet));
      opts.onChainUpdate(s.chain);

      const pitch = frontierPitch(s.el, s.chain, total, arc);
      const vol = 0.055 + (s.chain / total) * 0.065;
      opts.frontierHit?.(s.el, s.chain, total, arc);
      opts.tone?.(pitch, 0.09, vol);
      if (s.combo === "steam") {
        window.setTimeout(() => opts.tone?.(pitch * 1.32, 0.07, vol * 0.8), 50);
      }
      if (s.el === "C") {
        window.setTimeout(() => opts.tone?.(pitch * 1.18, 0.08, vol * 0.9), 40);
      }

      i++;
      const pause = Math.max(36, stepDelay(i - 1, total) - travel);
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
    opts.onCurtainCall();

    timeoutId = window.setTimeout(() => {
      if (!cancelled) opts.onCredits(final, chain);
    }, CURTAIN_HOLD_MS);
  }

  /**
   * @param {CascadeStep} step
   * @param {number} dur
   * @param {boolean} arc
   * @param {() => void} onDone
   */
  function drawTravel(step, dur, arc, onDone) {
    opts.svgEl.innerHTML = "";
    const { fromRow: fr, fromCol: fc, r: tr, c: tc, el } = step;

    const a =
      fr < 0 ? cellCenter(opts.sparkRow, opts.sparkCol) : cellCenter(fr, fc);
    const b = cellCenter(tr, tc);
    const stroke = EL_STROKE[el] ?? "#fff";
    const fx = elementFxName(el);

    /** @type {SVGElement|null} */
    let travelShape = null;

    const glow = document.createElementNS("http://www.w3.org/2000/svg", "line");
    glow.setAttribute("x1", String(a.x));
    glow.setAttribute("y1", String(a.y));
    glow.setAttribute("x2", String(a.x));
    glow.setAttribute("y2", String(a.y));
    glow.setAttribute("stroke", "#ffffff");
    glow.setAttribute("stroke-width", "0.7");
    glow.setAttribute("stroke-linecap", "round");
    glow.setAttribute("opacity", "0.45");

    if (el === "L" && arc) {
      const pts = lightningPoints(a.x, a.y, a.x, a.y, tr * 5 + tc);
      const poly = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      poly.setAttribute("points", pts.map(([x, y]) => `${x},${y}`).join(" "));
      poly.setAttribute("fill", "none");
      poly.setAttribute("stroke", stroke);
      poly.setAttribute("stroke-width", "2.2");
      poly.setAttribute("stroke-linecap", "round");
      poly.setAttribute("stroke-linejoin", "round");
      poly.setAttribute("opacity", "0.95");
      poly.classList.add("travel-lightning");
      travelShape = poly;
      opts.svgEl.appendChild(travelShape);
      opts.svgEl.appendChild(glow);
    } else if (el === "W") {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(a.x));
      line.setAttribute("y1", String(a.y));
      line.setAttribute("x2", String(a.x));
      line.setAttribute("y2", String(a.y));
      line.setAttribute("stroke", stroke);
      line.setAttribute("stroke-width", "1.4");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("opacity", "0.55");
      travelShape = line;
      opts.svgEl.appendChild(travelShape);
      opts.svgEl.appendChild(glow);
    } else {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(a.x));
      line.setAttribute("y1", String(a.y));
      line.setAttribute("x2", String(a.x));
      line.setAttribute("y2", String(a.y));
      line.setAttribute("stroke", stroke);
      line.setAttribute("stroke-width", el === "F" ? "2.6" : el === "C" ? "2.2" : "2");
      line.setAttribute("stroke-linecap", "round");
      line.setAttribute("opacity", "0.92");
      if (el === "F") line.classList.add("travel-fire");
      if (el === "C") line.classList.add("travel-crystal");
      travelShape = line;
      opts.svgEl.appendChild(travelShape);
      opts.svgEl.appendChild(glow);
    }

    const head = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    head.setAttribute("cx", String(a.x));
    head.setAttribute("cy", String(a.y));
    head.setAttribute("r", el === "F" ? "2.2" : "1.8");
    head.setAttribute("fill", el === "F" ? "#ff8844" : "#fff");
    head.setAttribute("opacity", "0.95");
    opts.svgEl.appendChild(head);

    if (el === "F") {
      for (let p = 0; p < 3; p++) {
        const ember = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ember.setAttribute("cx", String(a.x));
        ember.setAttribute("cy", String(a.y));
        ember.setAttribute("r", "0.9");
        ember.setAttribute("fill", "#ffaa55");
        ember.setAttribute("opacity", "0.7");
        ember.classList.add("travel-ember");
        opts.svgEl.appendChild(ember);
      }
    }

    const cell = opts.getCell(tr, tc);
    cell?.classList.add("approaching", `approach-${fx}`);

    const t0 = performance.now();

    function frame(now) {
      if (cancelled) return;
      const raw = Math.min(1, (now - t0) / dur);
      const t = easeOutCubic(raw);
      const x = a.x + (b.x - a.x) * t;
      const y = a.y + (b.y - a.y) * t;

      if (travelShape instanceof SVGLineElement) {
        travelShape.setAttribute("x2", String(x));
        travelShape.setAttribute("y2", String(y));
        glow.setAttribute("x2", String(x));
        glow.setAttribute("y2", String(y));
      } else if (travelShape instanceof SVGPolylineElement) {
        const pts = lightningPoints(a.x, a.y, x, y, tr * 5 + tc + Math.floor(t * 3));
        travelShape.setAttribute("points", pts.map(([px, py]) => `${px},${py}`).join(" "));
        glow.setAttribute("x2", String(x));
        glow.setAttribute("y2", String(y));
      }

      head.setAttribute("cx", String(x));
      head.setAttribute("cy", String(y));

      document.querySelectorAll(".travel-ember").forEach((ember, idx) => {
        const lag = (idx + 1) * 0.08;
        const et = Math.max(0, t - lag);
        ember.setAttribute("cx", String(a.x + (b.x - a.x) * et));
        ember.setAttribute("cy", String(a.y + (b.y - a.y) * et - et * 2));
        ember.setAttribute("opacity", String(0.75 * (1 - et)));
      });

      if (raw < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        cell?.classList.remove(
          "approaching",
          "approach-fire",
          "approach-lightning",
          "approach-water",
          "approach-crystal",
        );
        opts.svgEl.innerHTML = "";
        onDone();
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  return { cancel };
}

/** @typedef {import("./simulation.js").CascadeStep} CascadeStep */
/** @typedef {import("./config.js").Element} Element */
/** @typedef {"good"|"great"|"excellent"} PopTier */

/**
 * Score pop color tier — green good, orange great, yellow excellent.
 * @param {CascadeStep} step
 * @param {number} prevMult multiplier before this step
 * @param {number} total chain length
 * @returns {PopTier}
 */
export function popTier(step, prevMult, total) {
  if (step.el === "C") return "excellent";
  if (step.combo === "steam" && step.gain >= 28) return "excellent";
  if (step.combo === "steam") return "great";
  const multDelta = step.mult - prevMult;
  if (multDelta >= 0.55) return "excellent";
  if (step.gain >= 24 || multDelta >= 0.24) return "great";
  if (step.chain >= Math.max(4, Math.floor(total * 0.65))) return "great";
  return "good";
}

/** @param {CascadeStep} step @param {number} prevMult */
export function shouldShowMultPop(step, prevMult) {
  return step.mult - prevMult >= 0.24;
}

/** @param {Element} el */
export function elementFxName(el) {
  return { F: "fire", L: "lightning", W: "water", C: "crystal" }[el] ?? "fire";
}

/**
 * Floating gain + multiplier feedback on a cell.
 * @param {HTMLElement|null} cell
 * @param {CascadeStep} step
 * @param {number} prevMult
 * @param {number} total
 */
export function spawnStepFeedback(cell, step, prevMult, total) {
  if (!cell) return;

  const fx = elementFxName(step.el);
  cell.classList.add(`fx-${fx}`);
  if (step.combo === "steam") cell.classList.add("fx-steam");
  window.setTimeout(() => {
    cell.classList.remove(`fx-${fx}`, "fx-steam");
  }, 620);

  const tier = popTier(step, prevMult, total);
  const pop = document.createElement("span");
  pop.className = `cascade-pop pop-${tier}`;
  pop.textContent = `+${step.gain}`;
  pop.setAttribute("aria-hidden", "true");
  cell.appendChild(pop);
  window.setTimeout(() => pop.remove(), 950);

  if (shouldShowMultPop(step, prevMult)) {
    const mult = document.createElement("span");
    mult.className = "cascade-mult";
    mult.textContent = `×${step.mult.toFixed(2)}`;
    mult.setAttribute("aria-hidden", "true");
    cell.appendChild(mult);
    window.setTimeout(() => mult.remove(), 1150);
  }

  if (step.combo === "steam") {
    const tag = document.createElement("span");
    tag.className = "cascade-tag tag-steam";
    tag.textContent = "STEAM";
    tag.setAttribute("aria-hidden", "true");
    cell.appendChild(tag);
    window.setTimeout(() => tag.remove(), 900);
  }

  if (step.el === "C") {
    const tag = document.createElement("span");
    tag.className = "cascade-tag tag-crystal";
    tag.textContent = "SURGE";
    tag.setAttribute("aria-hidden", "true");
    cell.appendChild(tag);
    window.setTimeout(() => tag.remove(), 900);
  }
}

/**
 * Deterministic zigzag for lightning travel (no RNG at Spark).
 * @param {number} x1 @param {number} y1 @param {number} x2 @param {number} y2
 * @param {number} seed
 */
export function lightningPoints(x1, y1, x2, y2, seed) {
  const segments = 5;
  /** @type [number, number][] */
  const pts = [[x1, y1]];
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const j = ((seed + i * 17) % 7) - 3;
    pts.push([x1 + (x2 - x1) * t + j * 0.55, y1 + (y2 - y1) * t - j * 0.35]);
  }
  pts.push([x2, y2]);
  return pts;
}

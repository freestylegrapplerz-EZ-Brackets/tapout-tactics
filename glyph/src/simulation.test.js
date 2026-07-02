import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  computeTarget,
  createHand,
  emptyGrid,
  getTargets,
  simulateCascade,
} from "./simulation.js";
import { BASE } from "./config.js";

function place(grid, r, c, el) {
  grid[r][c] = el;
}

describe("getTargets", () => {
  it("fire spreads to orthogonal neighbors only", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "F");
    place(grid, 1, 2, "W");
    place(grid, 2, 3, "L");
    place(grid, 3, 3, "C");

    const targets = getTargets(grid, 2, 2, "F");
    assert.deepEqual(
      targets.sort((a, b) => a[0] - b[0] || a[1] - b[1]),
      [
        [1, 2],
        [2, 3],
      ].sort((a, b) => a[0] - b[0] || a[1] - b[1])
    );
  });

  it("lightning jumps gaps to first rune in each line", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "L");
    place(grid, 2, 4, "F");

    const targets = getTargets(grid, 2, 2, "L");
    assert.deepEqual(targets, [[2, 4]]);
  });

  it("water and crystal use 8-neighbor spread", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "W");
    place(grid, 1, 1, "F");
    place(grid, 1, 3, "C");

    const targets = getTargets(grid, 2, 2, "W");
    assert.equal(targets.length, 2);
  });
});

describe("simulateCascade", () => {
  it("returns empty result when spark cell is empty", () => {
    const grid = emptyGrid();
    const result = simulateCascade(grid, 2, 2);
    assert.deepEqual(result, { steps: [], finalScore: 0, chainLength: 0 });
  });

  it("single rune produces one step with base score", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "F");
    const { steps, finalScore, chainLength } = simulateCascade(grid, 2, 2);

    assert.equal(chainLength, 1);
    assert.equal(finalScore, 10);
    assert.equal(steps[0].gain, 10);
    assert.equal(steps[0].chain, 1);
    assert.equal(steps[0].fromRow, -1);
    assert.equal(steps[0].fromCol, -1);
  });

  it("chains fire to adjacent rune with rising multiplier", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "F");
    place(grid, 2, 3, "F");

    const { steps, finalScore } = simulateCascade(grid, 2, 2);
    assert.equal(steps.length, 2);
    assert.equal(steps[0].score, 10);
    assert.equal(steps[1].gain, Math.round(10 * 1.15));
    assert.equal(steps[1].fromRow, 2);
    assert.equal(steps[1].fromCol, 2);
    assert.equal(finalScore, steps[1].score);
  });

  it("applies steam combo when water activated from fire source", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "F");
    place(grid, 2, 3, "W");

    const { steps } = simulateCascade(grid, 2, 2);
    const waterStep = steps.find((s) => s.el === "W");
    assert.ok(waterStep);
    assert.equal(waterStep.combo, "steam");
    assert.equal(waterStep.gain, Math.round(12 * 1.15) + 15);
  });

  it("crystal boosts multiplier on activation", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "C");

    const { steps } = simulateCascade(grid, 2, 2);
    assert.equal(steps[0].mult, 1.75);
  });

  it("matches hope-pass fixture: 2x2 fire block", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "F");
    place(grid, 2, 3, "F");
    place(grid, 3, 2, "F");
    place(grid, 3, 3, "F");

    const { steps, chainLength } = simulateCascade(grid, 2, 2);
    assert.equal(chainLength, 4);
    assert.equal(steps[0].chain, 1);
    assert.equal(steps[3].chain, 4);
    assert.equal(steps[steps.length - 1].score, steps.at(-1).score);
  });

  it("does not re-activate cells (deterministic BFS)", () => {
    const grid = emptyGrid();
    place(grid, 2, 2, "F");
    place(grid, 2, 3, "W");
    place(grid, 2, 4, "F");

    const { steps } = simulateCascade(grid, 2, 2);
    const keys = steps.map((s) => `${s.r},${s.c}`);
    assert.equal(keys.length, new Set(keys).size);
  });
});

describe("hand helpers", () => {
  it("createHand guarantees L, C, W present with fixed rng", () => {
    let i = 0;
    const seq = [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9];
    const hand = createHand(() => seq[i++]);
    assert.ok(hand.some((h) => h.el === "L"));
    assert.ok(hand.some((h) => h.el === "C"));
    assert.ok(hand.some((h) => h.el === "W"));
  });

  it("computeTarget matches hope-pass formula", () => {
    const hand = [{ el: "F" }, { el: "L" }, { el: "W" }, { el: "C" }];
    const sum = BASE.F + BASE.L + BASE.W + BASE.C;
    assert.equal(computeTarget(hand), Math.round(sum * 2.4));
  });
});

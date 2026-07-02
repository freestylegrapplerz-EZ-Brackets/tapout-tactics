import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { analyzeAftermath, coldClassForKind } from "./aftermath.js";
import { emptyGrid, simulateCascade } from "./simulation.js";

/** @param {number} r @param {number} c */
function stepAt(r, c) {
  return {
    r,
    c,
    el: "F",
    fromRow: -1,
    fromCol: -1,
    gain: 10,
    score: 10,
    chain: 1,
    combo: "",
    mult: 1.15,
  };
}

describe("analyzeAftermath", () => {
  it("classifies adjacent cold rune touching lit cell", () => {
    const grid = emptyGrid();
    grid[2][2] = "F";
    grid[3][3] = "W";

    const { coldTaxonomy } = analyzeAftermath(grid, 2, 2, [stepAt(2, 2)]);

    assert.equal(coldTaxonomy.get("3,3"), "adjacent");
  });

  it("classifies isolated cold rune far from lit cluster", () => {
    const grid = emptyGrid();
    grid[2][0] = "F";
    grid[4][4] = "W";

    const { coldTaxonomy } = analyzeAftermath(grid, 2, 0, [stepAt(2, 0)]);

    assert.equal(coldTaxonomy.get("4,4"), "isolated");
  });

  it("classifies one-gap cold across single empty cell", () => {
    const grid = emptyGrid();
    grid[2][1] = "F";
    grid[2][4] = "W";

    const { steps } = simulateCascade(
      (() => {
        const g = emptyGrid();
        g[2][1] = "F";
        g[2][2] = "F";
        return g;
      })(),
      2,
      1
    );
    const { coldTaxonomy } = analyzeAftermath(
      (() => {
        const g = emptyGrid();
        g[2][1] = "F";
        g[2][2] = "F";
        g[2][4] = "W";
        return g;
      })(),
      2,
      1,
      steps
    );

    assert.equal(coldTaxonomy.get("2,4"), "one_gap");
  });

  it("records spark origin key", () => {
    const grid = emptyGrid();
    grid[3][1] = "F";

    const { steps } = simulateCascade(grid, 3, 1);
    const { sparkOrigin } = analyzeAftermath(grid, 3, 1, steps);

    assert.equal(sparkOrigin, "3,1");
  });

  it("maps cold kinds to CSS class names", () => {
    assert.equal(coldClassForKind("one_gap"), "cold-one-gap");
    assert.equal(coldClassForKind("adjacent"), "cold-adjacent");
    assert.equal(coldClassForKind("isolated"), "cold-isolated");
  });
});

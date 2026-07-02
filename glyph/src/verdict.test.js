import assert from "node:assert";
import { describe, it } from "node:test";
import { runVerdict } from "./verdict.js";

describe("runVerdict", () => {
  it("celebrates full detonation when no cold runes", () => {
    const grid = [
      ["F", "F", null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    const v = runVerdict(new Map(), grid, 2);
    assert.equal(v.kind, "complete");
    assert.match(v.headline, /Every rune lit/);
  });

  it("prioritizes one_gap over adjacent for primary anchor", () => {
    const cold = new Map([
      ["2,3", "adjacent"],
      ["0,4", "one_gap"],
    ]);
    const grid = empty5();
    grid[2][3] = "W";
    grid[0][4] = "C";
    const v = runVerdict(cold, grid, 4);
    assert.equal(v.kind, "one_gap");
    assert.equal(v.primaryGapKey, "0,4");
  });

  it("describes adjacent miss in plain language", () => {
    const cold = new Map([["2,1", "adjacent"]]);
    const grid = empty5();
    grid[2][1] = "W";
    const v = runVerdict(cold, grid, 3);
    assert.equal(v.kind, "adjacent");
    assert.match(v.headline, /Water/);
    assert.match(v.headline, /right there/);
  });
});

function empty5() {
  return Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null));
}

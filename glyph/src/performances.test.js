import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emptyGrid, simulateCascade } from "./simulation.js";
import {
  PERFORMANCE_1,
  PERFORMANCE_1_HAND,
  PERFORMANCE_1_ID,
  PERFORMANCE_2,
  PERFORMANCE_2_ID,
  ALL_PERFORMANCES,
  applyPreset,
  getActivePerformance,
  getPerformance,
  handFromElements,
  lockedKeysForPerformance,
  targetForPerformance,
} from "./performances.js";
import { HAND_SIZE } from "./config.js";

describe("performances", () => {
  it("Performance 1 hand has correct size and composition", () => {
    assert.equal(PERFORMANCE_1.handElements.length, HAND_SIZE);
    assert.equal(PERFORMANCE_1_HAND.length, HAND_SIZE);
    assert.ok(PERFORMANCE_1.handElements.filter((e) => e === "F").length >= 2);
    assert.ok(PERFORMANCE_1.handElements.filter((e) => e === "W").length >= 1);
  });

  it("handFromElements marks all runes unused", () => {
    const hand = handFromElements(PERFORMANCE_1.handElements);
    assert.equal(hand.length, HAND_SIZE);
    assert.ok(hand.every((h) => h.used === false));
  });

  it("getActivePerformance returns Performance 1", () => {
    const p = getActivePerformance();
    assert.equal(p.id, PERFORMANCE_1_ID);
    assert.deepEqual(p.handElements, PERFORMANCE_1_HAND);
  });

  it("getPerformance loads Performance 2", () => {
    const p = getPerformance(PERFORMANCE_2_ID);
    assert.equal(p.id, PERFORMANCE_2_ID);
    assert.equal(p.handElements.length, 1);
    assert.equal(p.preset?.length, 7);
  });

  it("Performance 2 target matches solved board score", () => {
    assert.equal(targetForPerformance(PERFORMANCE_2), 121);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_2, grid);
    grid[2][3] = "F";
    const { finalScore, chainLength } = simulateCascade(grid, 2, 2);
    assert.equal(chainLength, 8);
    assert.equal(finalScore, 121);
  });

  it("Performance 2 teaches connect-before-spark", () => {
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_2, grid);
    const before = simulateCascade(grid, 2, 2);
    grid[2][3] = "F";
    const after = simulateCascade(grid, 2, 2);
    assert.ok(before.chainLength < after.chainLength);
    assert.equal(before.chainLength, 3);
    assert.equal(after.chainLength, 8);
  });

  it("locked keys cover preset cells only", () => {
    const keys = lockedKeysForPerformance(PERFORMANCE_2);
    assert.equal(keys.size, 7);
    assert.ok(keys.has("2,0"));
    assert.ok(!keys.has("2,3"));
  });

  it("ALL_PERFORMANCES lists P1 and P2", () => {
    assert.equal(ALL_PERFORMANCES.length, 2);
  });
});

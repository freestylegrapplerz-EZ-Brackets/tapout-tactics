import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emptyGrid, simulateCascade } from "./simulation.js";
import {
  PERFORMANCE_1,
  PERFORMANCE_1_HAND,
  PERFORMANCE_1_ID,
  PERFORMANCE_2,
  PERFORMANCE_2_ID,
  PERFORMANCE_3,
  PERFORMANCE_3_ID,
  PERFORMANCE_4,
  PERFORMANCE_4_ID,
  PERFORMANCE_5,
  PERFORMANCE_5_ID,
  PERFORMANCE_6,
  PERFORMANCE_6_ID,
  PERFORMANCE_7,
  PERFORMANCE_7_ID,
  PERFORMANCE_9,
  PERFORMANCE_11,
  PERFORMANCE_12,
  PERFORMANCE_12_ID,
  TRAINING_LEVELS,
  SYNERGY_PATH,
  ALL_PERFORMANCES,
  applyPreset,
  getActivePerformance,
  getPerformance,
  handFromElements,
  lockedKeysForPerformance,
  nextInSynergyPath,
  synergyPathIndex,
  targetForPerformance,
} from "./performances.js";

describe("performances", () => {
  it("Performance 1 is a guided gap-fill lesson with achievable target", () => {
    assert.equal(PERFORMANCE_1.handElements.length, 2);
    assert.equal(PERFORMANCE_1_HAND.length, 2);
    assert.equal(PERFORMANCE_1.preset?.length, 3);
    assert.equal(targetForPerformance(PERFORMANCE_1), 88);

    const grid = emptyGrid();
    applyPreset(PERFORMANCE_1, grid);
    grid[2][2] = "W";
    grid[2][3] = "F";
    const { finalScore, chainLength } = simulateCascade(grid, 2, 0);
    assert.equal(chainLength, 5);
    assert.equal(finalScore, 88);
  });

  it("handFromElements marks all runes unused", () => {
    const hand = handFromElements(PERFORMANCE_1.handElements);
    assert.equal(hand.length, 2);
    assert.ok(hand.every((h) => h.used === false));
  });

  it("getActivePerformance returns first synergy path step", () => {
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

  it("SYNERGY_PATH orders basics → synergies → advanced → graduation", () => {
    assert.equal(TRAINING_LEVELS.length, 12);
    assert.equal(SYNERGY_PATH.length, 12);
    assert.equal(TRAINING_LEVELS[0].id, PERFORMANCE_1_ID);
    assert.equal(TRAINING_LEVELS[2].id, PERFORMANCE_3_ID);
    assert.equal(TRAINING_LEVELS[5].id, PERFORMANCE_6_ID);
    assert.equal(TRAINING_LEVELS[6].id, PERFORMANCE_7_ID);
    assert.equal(TRAINING_LEVELS[11].id, PERFORMANCE_12_ID);
    assert.equal(ALL_PERFORMANCES.length, 12);
  });

  it("Performance 3 preset fills the board for spark-only lesson", () => {
    assert.equal(PERFORMANCE_3.handElements.length, 0);
    assert.equal(PERFORMANCE_3.preset?.length, 3);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_3, grid);
    assert.equal(grid[2][0], "F");
    assert.equal(grid[2][1], "F");
    assert.equal(grid[2][2], "W");
  });

  it("Performance 3 steam lesson scores from left Fire spark", () => {
    assert.equal(targetForPerformance(PERFORMANCE_3), 53);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_3, grid);
    const good = simulateCascade(grid, 2, 0);
    const wrong = simulateCascade(grid, 2, 2);
    assert.equal(good.finalScore, 53);
    assert.ok(good.steps.some((s) => s.combo === "steam"));
    assert.ok(wrong.finalScore < good.finalScore);
  });

  it("Performance 4 lightning lesson chains across gap", () => {
    assert.equal(targetForPerformance(PERFORMANCE_4), 22);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_4, grid);
    const { finalScore, chainLength } = simulateCascade(grid, 2, 1);
    assert.equal(chainLength, 2);
    assert.equal(finalScore, 22);
  });

  it("Performance 5 crystal lesson includes steam and crystal tail", () => {
    assert.equal(targetForPerformance(PERFORMANCE_5), 82);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_5, grid);
    const { finalScore, chainLength, steps } = simulateCascade(grid, 2, 0);
    assert.equal(chainLength, 5);
    assert.equal(finalScore, 82);
    assert.ok(steps.some((s) => s.combo === "steam"));
    assert.equal(steps[steps.length - 1].el, "C");
  });

  it("Performance 6 capstone uses all four elements", () => {
    assert.equal(targetForPerformance(PERFORMANCE_6), 112);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_6, grid);
    const { finalScore, chainLength, steps } = simulateCascade(grid, 0, 2);
    assert.equal(chainLength, 6);
    assert.equal(finalScore, 112);
    const els = new Set(steps.map((s) => s.el));
    assert.ok(els.has("F"));
    assert.ok(els.has("L"));
    assert.ok(els.has("W"));
    assert.ok(els.has("C"));
  });

  it("Performance 7 directorship lesson rewards left spark", () => {
    assert.equal(targetForPerformance(PERFORMANCE_7), 88);
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_7, grid);
    const left = simulateCascade(grid, 2, 0);
    const mid = simulateCascade(grid, 2, 2);
    assert.ok(left.finalScore > mid.finalScore);
    assert.equal(left.finalScore, 88);
  });

  it("Performance 9 build-row lesson scores with L-W-F extension", () => {
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_9, grid);
    grid[2][2] = "L";
    grid[2][3] = "W";
    grid[2][4] = "F";
    const { finalScore, chainLength } = simulateCascade(grid, 2, 0);
    assert.equal(chainLength, 5);
    assert.equal(finalScore, 85);
  });

  it("Performance 11 compose lesson reaches advanced target", () => {
    const grid = emptyGrid();
    applyPreset(PERFORMANCE_11, grid);
    grid[2][2] = "L";
    grid[2][3] = "W";
    grid[2][4] = "C";
    grid[1][2] = "F";
    grid[3][2] = "F";
    const { finalScore } = simulateCascade(grid, 2, 0);
    assert.equal(finalScore, 118);
  });

  it("Performance 12 is graduation with full curated hand", () => {
    assert.equal(PERFORMANCE_12.handElements.length, 8);
    assert.equal(PERFORMANCE_12.graduates, true);
    assert.equal(PERFORMANCE_12.phase, "graduation");
  });

  it("nextInSynergyPath advances through all training levels", () => {
    assert.equal(synergyPathIndex(PERFORMANCE_1_ID), 0);
    assert.equal(nextInSynergyPath(PERFORMANCE_1_ID)?.id, PERFORMANCE_2_ID);
    assert.equal(nextInSynergyPath(PERFORMANCE_11.id)?.id, PERFORMANCE_12_ID);
    assert.equal(nextInSynergyPath(PERFORMANCE_12_ID), null);
  });
});

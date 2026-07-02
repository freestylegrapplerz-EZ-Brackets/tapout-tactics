import test from "node:test";
import assert from "node:assert/strict";
import {
  BOARD_MYSTERIES,
  MYSTERY_2,
  MYSTERY_4,
  MYSTERY_5,
  MYSTERY_6,
  MYSTERY_7,
  nextBoard,
  asEncounter,
} from "./boardMysteries.js";
import { applyEncounterPreset, evaluateEncounter } from "./encounters.js";
import { simulateCascade, emptyGrid } from "./simulation.js";

test("BOARD_MYSTERIES has eight question-first boards", () => {
  assert.equal(BOARD_MYSTERIES.length, 8);
  for (const board of BOARD_MYSTERIES) {
    assert.ok(board.question.length > 10);
    assert.ok(board.objectiveLabel);
    assert.ok(board.victoryLine);
  }
});

test("nextBoard advances the sequence", () => {
  assert.equal(nextBoard("mystery-1-gap")?.id, "mystery-2-firestarter");
  assert.equal(nextBoard("mystery-8-heart"), null);
});

test("Mystery 1: W in gap connects three runes", () => {
  const board = BOARD_MYSTERIES[0];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][2] = "W";
  const result = simulateCascade(grid, 2, 1);
  assert.ok(evaluateEncounter(asEncounter(board), result, grid, 2, 1));
});

test("Mystery 2 Firestarter: orthogonal path awakens all five Fires", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_2), grid);
  grid[1][2] = "F";
  grid[2][2] = "F";
  grid[3][2] = "F";
  const result = simulateCascade(grid, 1, 1);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_2), result, grid, 1, 1));
  assert.equal(result.chainLength, 5);
});

test("Mystery 2 Firestarter: diagonal placement fails to reach both presets", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_2), grid);
  grid[2][2] = "F";
  grid[1][3] = "F";
  grid[2][3] = "F";
  const result = simulateCascade(grid, 1, 1);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_2), result, grid, 1, 1), false);
});

test("Mystery 3 The Jump: L at (2,1) bridges gap from spark (2,0)", () => {
  const board = BOARD_MYSTERIES[2];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][1] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.ok(evaluateEncounter(asEncounter(board), result, grid, 2, 0));
  assert.equal(result.chainLength, 3);
  assert.deepEqual(
    result.steps.map((s) => `${s.r},${s.c}:${s.el}`),
    ["2,0:F", "2,1:L", "2,4:F"],
  );
});

test("Mystery 3 The Jump: L at (2,2) cannot chain from required spark (2,0)", () => {
  const board = BOARD_MYSTERIES[2];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][2] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.equal(evaluateEncounter(asEncounter(board), result, grid, 2, 0), false);
});

test("Mystery 3 The Jump: L beside only right Fire fails", () => {
  const board = BOARD_MYSTERIES[2];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][3] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.equal(evaluateEncounter(asEncounter(board), result, grid, 2, 0), false);
});

test("Mystery 4 The Current: Water at (2,2) connects full chain", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_4), grid);
  grid[2][2] = "W";
  const result = simulateCascade(grid, 2, 1);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_4), result, grid, 2, 1));
  assert.equal(result.chainLength, 4);
  assert.deepEqual(
    result.steps.map((s) => `${s.r},${s.c}:${s.el}`),
    ["2,1:F", "2,2:W", "1,2:L", "2,3:F"],
  );
});

test("Mystery 4 The Current: Water in corner fails", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_4), grid);
  grid[0][0] = "W";
  const result = simulateCascade(grid, 2, 1);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_4), result, grid, 2, 1), false);
});

test("Mystery 4 The Current: only (2,2) placement wins", () => {
  const preset = MYSTERY_4.preset ?? [];
  const wins = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (preset.some((p) => p.row === r && p.col === c)) continue;
      const grid = emptyGrid();
      applyEncounterPreset(asEncounter(MYSTERY_4), grid);
      grid[r][c] = "W";
      const result = simulateCascade(grid, 2, 1);
      if (evaluateEncounter(asEncounter(MYSTERY_4), result, grid, 2, 1)) {
        wins.push(`${r},${c}`);
      }
    }
  }
  assert.deepEqual(wins, ["2,2"]);
});

test("Mystery 5 The Heart: F at (2,1) and L at (2,3) awaken Crystal last", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_5), grid);
  grid[2][1] = "F";
  grid[2][3] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_5), result, grid, 2, 0));
  assert.equal(result.chainLength, 5);
  assert.deepEqual(
    result.steps.map((s) => `${s.r},${s.c}:${s.el}`),
    ["2,0:F", "2,1:F", "2,2:W", "2,3:L", "2,4:C"],
  );
  const last = result.steps[result.steps.length - 1];
  assert.equal(last.el, "C");
  assert.equal(last.r, 2);
  assert.equal(last.c, 4);
});

test("Mystery 5 The Heart: sparking Crystal fails even with full chain", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_5), grid);
  grid[2][1] = "F";
  grid[2][3] = "L";
  const result = simulateCascade(grid, 2, 4);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_5), result, grid, 2, 4), false);
  assert.equal(result.steps[0].el, "C");
});

test("Mystery 5 The Heart: sparking Water fails required spark", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_5), grid);
  grid[2][1] = "F";
  grid[2][3] = "L";
  const result = simulateCascade(grid, 2, 2);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_5), result, grid, 2, 2), false);
});

test("Mystery 5 The Heart: disconnected Crystal fails", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_5), grid);
  grid[0][0] = "F";
  grid[0][1] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_5), result, grid, 2, 0), false);
});

test("Mystery 6: tapping Water alone fails", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_6), grid);
  const tap = simulateCascade(grid, 2, 4);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_6), tap, grid, 2, 4), false);
  grid[2][3] = "F";
  const proper = simulateCascade(grid, 2, 0);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_6), proper, grid, 2, 0));
});

test("Mystery 7: tapping island Water alone fails", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_7), grid);
  const tap = simulateCascade(grid, 0, 4);
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_7), tap, grid, 0, 4), false);
  grid[0][0] = "L";
  grid[0][3] = "F";
  const proper = simulateCascade(grid, 0, 0);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_7), proper, grid, 0, 0));
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  BOARD_MYSTERIES,
  MYSTERY_2,
  MYSTERY_4,
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
  assert.equal(nextBoard("mystery-1-gap")?.id, "mystery-2-column");
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

test("Mystery 2: column path from corner Fire", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_2), grid);
  grid[1][0] = "F";
  grid[2][0] = "F";
  grid[3][0] = "F";
  const result = simulateCascade(grid, 0, 0);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_2), result, grid, 0, 0));
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_2), result, grid, 4, 0), false);
});

test("Mystery 3: L placement enables 5-rune chain", () => {
  const board = BOARD_MYSTERIES[2];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][2] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.ok(evaluateEncounter(asEncounter(board), result, grid, 2, 0));
});

test("Mystery 4: left spark reaches Crystal, right spark fails", () => {
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(MYSTERY_4), grid);
  const left = simulateCascade(grid, 2, 0);
  const right = simulateCascade(grid, 4, 4);
  assert.ok(evaluateEncounter(asEncounter(MYSTERY_4), left, grid, 2, 0));
  assert.equal(evaluateEncounter(asEncounter(MYSTERY_4), right, grid, 4, 4), false);
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

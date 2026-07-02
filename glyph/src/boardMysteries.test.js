import test from "node:test";
import assert from "node:assert/strict";
import { BOARD_MYSTERIES, nextBoard, asEncounter } from "./boardMysteries.js";
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
  assert.equal(nextBoard("mystery-1-gap")?.id, "mystery-2-corner");
  assert.equal(nextBoard("mystery-8-heart"), null);
});

test("Mystery 1: W in gap connects three runes", () => {
  const board = BOARD_MYSTERIES[0];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][2] = "W";
  const result = simulateCascade(grid, 2, 1);
  assert.ok(evaluateEncounter(asEncounter(board), result, grid));
});

test("Mystery 3: L placement enables 5-rune chain", () => {
  const board = BOARD_MYSTERIES[2];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  grid[2][2] = "L";
  const result = simulateCascade(grid, 2, 0);
  assert.ok(evaluateEncounter(asEncounter(board), result, grid));
});

test("Mystery 4: spark from side F reaches Crystal", () => {
  const board = BOARD_MYSTERIES[3];
  const grid = emptyGrid();
  applyEncounterPreset(asEncounter(board), grid);
  const result = simulateCascade(grid, 2, 1);
  assert.ok(evaluateEncounter(asEncounter(board), result, grid));
});

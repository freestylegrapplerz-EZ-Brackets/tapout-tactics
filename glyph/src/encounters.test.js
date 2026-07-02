import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { emptyGrid, simulateCascade } from "./simulation.js";
import {
  ENCOUNTER_1,
  ENCOUNTER_2,
  ENCOUNTER_3,
  ENCOUNTER_5,
  ENCOUNTER_RUN,
  applyEncounterPreset,
  blockedKeysForEncounter,
  evaluateEncounter,
  nextEncounter,
} from "./encounters.js";

describe("encounters", () => {
  it("ENCOUNTER_RUN has five stages ending in a boss", () => {
    assert.equal(ENCOUNTER_RUN.length, 5);
    assert.equal(ENCOUNTER_RUN.at(-1)?.boss, true);
  });

  it("The Hollow scores on a connected row", () => {
    const grid = emptyGrid();
    applyEncounterPreset(ENCOUNTER_1, grid);
    grid[2][0] = "F";
    grid[2][1] = "F";
    grid[2][2] = "W";
    grid[2][3] = "F";
    grid[2][4] = "F";
    const result = simulateCascade(grid, 2, 0);
    assert.ok(evaluateEncounter(ENCOUNTER_1, result, grid));
  });

  it("The Scar requires routing around blocked stone", () => {
    const grid = emptyGrid();
    applyEncounterPreset(ENCOUNTER_2, grid);
    grid[1][1] = "F";
    grid[1][2] = "W";
    grid[1][3] = "F";
    const result = simulateCascade(grid, 2, 0);
    assert.equal(result.chainLength, 6);
    assert.ok(evaluateEncounter(ENCOUNTER_2, result, grid));
    assert.ok(blockedKeysForEncounter(ENCOUNTER_2).has("2,2"));
  });

  it("The Drowned Core breaks when Water is reached", () => {
    const grid = emptyGrid();
    applyEncounterPreset(ENCOUNTER_3, grid);
    const result = simulateCascade(grid, 2, 0);
    assert.ok(evaluateEncounter(ENCOUNTER_3, result, grid));
  });

  it("The Rime Warden breaks when Crystal heart is lit", () => {
    const grid = emptyGrid();
    applyEncounterPreset(ENCOUNTER_5, grid);
    const result = simulateCascade(grid, 2, 0);
    assert.ok(evaluateEncounter(ENCOUNTER_5, result, grid));
  });

  it("nextEncounter advances the run", () => {
    assert.equal(nextEncounter(ENCOUNTER_1.id)?.id, ENCOUNTER_2.id);
    assert.equal(nextEncounter(ENCOUNTER_5.id), null);
  });
});

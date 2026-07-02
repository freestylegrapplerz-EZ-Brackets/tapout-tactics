import test from "node:test";
import assert from "node:assert/strict";
import {
  parseRunPurpose,
  buildObjectiveLine,
  purposeVerdict,
  farthestPlacedKey,
} from "./runPurpose.js";

test("parseRunPurpose defaults to current", () => {
  assert.equal(parseRunPurpose(null), "current");
  assert.equal(parseRunPurpose(undefined), "current");
  assert.equal(parseRunPurpose("a"), "current");
});

test("parseRunPurpose reads awaken and farthest", () => {
  assert.equal(parseRunPurpose("b"), "awaken");
  assert.equal(parseRunPurpose("awaken"), "awaken");
  assert.equal(parseRunPurpose("c"), "farthest");
  assert.equal(parseRunPurpose("farthest"), "farthest");
});

test("buildObjectiveLine differs only by purpose", () => {
  assert.match(buildObjectiveLine("current"), /Link runes/);
  assert.match(buildObjectiveLine("awaken"), /awaken every rune/i);
  assert.match(buildObjectiveLine("farthest"), /farthest rune/i);
});

test("farthestPlacedKey picks edge from centroid", () => {
  const grid = Array.from({ length: 5 }, () => Array(5).fill(null));
  grid[2][2] = "F";
  grid[4][4] = "W";
  assert.equal(farthestPlacedKey(grid), "4,4");
});

test("purposeVerdict awaken reports cold rune", () => {
  const grid = Array.from({ length: 5 }, () => Array(5).fill(null));
  grid[0][0] = "F";
  grid[0][1] = "W";
  const v = purposeVerdict("awaken", grid, new Set(["0,0"]), 1);
  assert.match(v.headline, /Water stayed cold/);
  assert.match(v.subline, /1 of 2 runes never awoke/);
});

test("purposeVerdict farthest reports far rune when cold", () => {
  const grid = Array.from({ length: 5 }, () => Array(5).fill(null));
  grid[0][0] = "F";
  grid[4][4] = "W";
  const v = purposeVerdict("farthest", grid, new Set(["0,0"]), 1);
  assert.equal(v.headline, "The far rune stayed cold.");
  assert.match(v.subline, /Water/);
});

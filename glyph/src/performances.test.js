import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  PERFORMANCE_1_HAND,
  PERFORMANCE_1_ID,
  getActivePerformance,
  handFromElements,
} from "./performances.js";
import { HAND_SIZE } from "./config.js";

describe("performances", () => {
  it("Performance 1 hand has correct size and composition", () => {
    assert.equal(PERFORMANCE_1_HAND.length, HAND_SIZE);
    assert.ok(PERFORMANCE_1_HAND.filter((e) => e === "F").length >= 2);
    assert.ok(PERFORMANCE_1_HAND.filter((e) => e === "W").length >= 1);
  });

  it("handFromElements marks all runes unused", () => {
    const hand = handFromElements(PERFORMANCE_1_HAND);
    assert.equal(hand.length, HAND_SIZE);
    assert.ok(hand.every((h) => h.used === false));
  });

  it("getActivePerformance returns Performance 1 only", () => {
    const p = getActivePerformance();
    assert.equal(p.id, PERFORMANCE_1_ID);
    assert.deepEqual(p.handElements, PERFORMANCE_1_HAND);
  });
});

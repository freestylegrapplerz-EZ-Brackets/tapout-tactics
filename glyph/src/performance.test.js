import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cellCenter,
  easeOutCubic,
  frontierPitch,
  hopeLine,
  isArc,
  stepDelay,
  travelDuration,
} from "./performance.js";
import { SIZE } from "./config.js";

describe("performance timing", () => {
  it("stepDelay accelerates toward end of chain", () => {
    const total = 10;
    const early = stepDelay(0, total);
    const late = stepDelay(9, total);
    assert.ok(late < early);
    assert.equal(early, 172);
    assert.equal(late, 60);
  });

  it("travelDuration is longer for arc (lightning) hops", () => {
    const total = 8;
    const adj = travelDuration(2, total, false);
    const arc = travelDuration(2, total, true);
    assert.ok(arc > adj);
  });

  it("isArc detects non-adjacent propagation", () => {
    assert.equal(isArc(2, 2, 2, 3), false);
    assert.equal(isArc(2, 2, 2, 4), true);
  });

  it("hopeLine peaks near frontier end", () => {
    assert.equal(hopeLine(1, 5, ""), "It's spreading…");
    assert.equal(hopeLine(4, 5, ""), "One more…");
    assert.equal(hopeLine(5, 5, ""), "…");
    assert.equal(hopeLine(3, 5, "steam"), "Steam!");
    assert.equal(hopeLine(5, 5, "", "C"), "Crystal surge!");
  });

  it("cellCenter maps grid coords into 100x100 viewBox", () => {
    const c = cellCenter(0, 0);
    assert.ok(c.x > 0 && c.y > 0);
    const c2 = cellCenter(SIZE - 1, SIZE - 1);
    assert.ok(c2.x > c.x && c2.y > c.y);
  });

  it("easeOutCubic decelerates toward 1", () => {
    assert.equal(easeOutCubic(0), 0);
    assert.equal(easeOutCubic(1), 1);
    assert.ok(easeOutCubic(0.5) > 0.5);
  });

  it("frontierPitch rises with chain and arc hops", () => {
    const adj = frontierPitch("F", 2, 8, false);
    const arc = frontierPitch("L", 2, 8, true);
    assert.ok(arc > adj);
    assert.ok(frontierPitch("C", 5, 8, false) > frontierPitch("F", 5, 8, false));
  });
});

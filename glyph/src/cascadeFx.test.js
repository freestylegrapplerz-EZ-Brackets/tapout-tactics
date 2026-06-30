import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { popTier, shouldShowMultPop } from "./cascadeFx.js";

describe("cascadeFx", () => {
  it("popTier marks steam and crystal as great or excellent", () => {
    assert.equal(
      popTier(
        { el: "W", combo: "steam", gain: 31, mult: 1.7, chain: 3 },
        1.3,
        5,
      ),
      "excellent",
    );
    assert.equal(
      popTier(
        { el: "C", combo: "", gain: 10, mult: 2.05, chain: 3 },
        1.3,
        5,
      ),
      "excellent",
    );
    assert.equal(
      popTier({ el: "F", combo: "", gain: 12, mult: 1.3, chain: 2 }, 1.15, 8),
      "good",
    );
  });

  it("shouldShowMultPop on synergy multiplier bumps", () => {
    assert.ok(
      shouldShowMultPop({ el: "W", combo: "steam", gain: 31, mult: 1.7, chain: 3 }, 1.3),
    );
    assert.ok(!shouldShowMultPop({ el: "F", combo: "", gain: 12, mult: 1.15, chain: 1 }, 1));
  });
});

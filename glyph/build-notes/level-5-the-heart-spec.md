# Level 5 — The Heart (designer spec)

**Implemented:** vs-1.9.6-level5-heart  
**Source:** Puzzle design team (Greg)

## Spec (as delivered)

- **Question:** Which rune should the chain reach last?
- **Preset:** (2,0)=F, (2,2)=W, (2,4)=C
- **Anchor:** Crystal at (2,4)
- **Hand:** F, L
- **Win:** chain ≥ 5, requiredSpark (2,0), Crystal must activate last
- **Purpose:** Crystal is a destination — build the chain so energy reaches it at the very end

## Intended solution

Place F at (2,1), L at (2,3). Spark left Fire (2,0).

Chain: F → F → W → L → C (Crystal activates last)

## Engine note (important)

**Before this level:** the win evaluator only checked whether the anchor was *lit* somewhere in the chain (`break`) or whether chain length was met (`chain`). It did **not** distinguish Crystal first vs Crystal last.

**Added for Level 5:** `objective.mustActivateLast: true` — when set with an `anchor`, the final step in `result.steps` must be at the anchor cell. Without this, sparking Crystal at (2,4) would incorrectly win (chain 5, but C activates first).

`requiredSpark (2,0)` blocks sparking Water or Crystal as shortcuts.

## Cursor validation

| Check | Result |
|-------|--------|
| Intended solution works | ✅ |
| Crystal activates last | ✅ (enforced by `mustActivateLast`) |
| Spark Crystal fails | ✅ (C first + wrong spark) |
| Spark Water fails | ✅ (requiredSpark) |
| Disconnected Crystal fails | ✅ |
| Alternate F(2,3)/L(2,1) | ⚠️ Also wins — still has C last; does not bypass lesson |

## Alternate placement

F at (2,3) and L at (2,1) also produces a 5-rune chain with Crystal last (order F→L→W→F→C). Same lesson, different route. Flagged for designer review if strict single-solution is desired.

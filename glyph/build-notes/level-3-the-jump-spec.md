# Level 3 — The Jump (designer spec)

**Implemented:** vs-1.9.4-level3-jump  
**Source:** Puzzle design team (Greg)

## Spec (as delivered)

- **Question:** Can Lightning cross a gap that Fire cannot?
- **Preset:** (2,0)=F, (2,4)=F
- **Hand:** L
- **Win:** chain ≥ 3, requiredSpark (2,0)
- **Purpose:** Lightning is a bridge; Fire cannot cross the gap alone

## Cursor validation

| Check | Result |
|-------|--------|
| Intended lesson (Lightning jumps gap) | ✅ |
| Fire alone cannot solve | ✅ (no Fire in hand) |
| Only Lightning succeeds | ✅ |
| requiredSpark (2,0) enforced | ✅ |

## Mechanics note for designers

**Reference placement L at (2,2) + spark (2,0) does not chain under current Fire rules.**  
Fire only spreads to **orthogonally adjacent runes**. From (2,0), empty (2,1) blocks reach to (2,2).

**Working placement:** L at **(2,1)** — adjacent to left Fire. When sparked from (2,0), chain is F → L → (jump over empty cells) → F.

```
2 | F  L  .  .  F
     ↑ spark here
```

Same lesson: Lightning jumps what Fire cannot. One cell left of center.

**Alternative if L must be centered at (2,2):** change `requiredSpark` to (2,2) — spark Lightning, not left Fire. Awaiting designer choice.

## Verified failures

- L at (2,2), spark (2,0) — chain 1, fail
- L at (2,3), spark (2,0) — chain 1, fail

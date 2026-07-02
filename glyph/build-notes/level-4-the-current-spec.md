# Level 4 — The Current (designer spec)

**Implemented:** vs-1.9.8-level4-understanding  
**Source:** Puzzle design team (Greg)

## Spec (as delivered)

- **Question:** Where does Water belong?
- **Preset:** (2,1)=F, (2,3)=F, (1,2)=L
- **Hand:** W
- **Win:** chain ≥ 4
- **Purpose:** Water is a connector — belongs between things

## Intended solution

Place W at (2,2). Spark either Fire.

Chain: F → W → L → F (4 runes)

## Executive review (Mystery 4 redesign)

**Lesson under test:** Water connects the chain.  
**Not under test:** Spark origin.

`requiredSpark` was removed. If W is at (2,2) and the full chain awakens, the puzzle passes — regardless of which Fire the player sparks.

See [Level Bible](./level-bible.md) — Understanding Rule.

## What almost works (Almost Rule)

- **W in the wrong cell** (e.g. corner) — player sees how close placement is; chain doesn't fully connect.
- **Diagonal / off-bridge placement** — energy stalls; Water isn't acting as connector.

## Cursor validation

| Check | Result |
|-------|--------|
| W at (2,2) wins from left Fire spark | ✅ |
| W at (2,2) wins from right Fire spark | ✅ |
| Only (2,2) placement wins | ✅ |
| Corner / bypass placements fail | ✅ |

Design rules: [Level Bible](./level-bible.md)

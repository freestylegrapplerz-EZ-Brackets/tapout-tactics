# Level 4 — The Current (designer spec)

**Implemented:** vs-1.9.5-level4-current  
**Source:** Puzzle design team (Greg)

## Spec (as delivered)

- **Question:** Where does Water belong?
- **Preset:** (2,1)=F, (2,3)=F, (1,2)=L
- **Hand:** W
- **Win:** chain ≥ 4, requiredSpark (2,1)
- **Purpose:** Water is a connector — belongs between things

## Intended solution

Place W at (2,2). Spark left Fire (2,1).

Chain: F → W → L → F (4 runes)

## Cursor validation

| Check | Result |
|-------|--------|
| Intended solution works | ✅ |
| Water required | ✅ |
| Only one winning placement | ✅ (2,2) only |
| Corner placement fails | ✅ |
| requiredSpark (2,1) enforced | ✅ |

No mechanics notes — spec matches engine exactly.

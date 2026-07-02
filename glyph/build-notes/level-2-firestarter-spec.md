# Level 2 — Firestarter (designer spec)

**Implemented:** vs-1.9.3-level2-firestarter  
**Source:** Puzzle design team (Greg)  
**Workflow:** Designer spec → Cursor implementation

## Spec (as delivered)

- **Question:** Can Fire travel diagonally?
- **Preset:** (1,1)=F, (3,3)=F (locked)
- **Hand:** F, F, F
- **Win:** chain ≥ 5
- **Purpose:** Teach Fire propagates orthogonally only

## Intended solution

Place F at (1,2), (2,2), (3,2). Spark (1,1). Chain of 5 Fires.

## Verified failures

- Diagonal bridge attempts do not connect both preset Fires (chain stays 1 from upper spark).

## Levels locked by design

| Level | Name | Status |
|-------|------|--------|
| 1 | The Gap | Designer-approved — do not change |
| 2 | Firestarter | This spec |

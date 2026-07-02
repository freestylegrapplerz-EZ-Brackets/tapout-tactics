# Board Quality Pass — vs-1.9.1-board-quality

**Authorized by:** Greg (CEO) — Executive decision on quality definition  
**Branch:** `cursor/board-quality-pass-6013`

## New definition of quality

A board is judged by one question:

> **Does this board ask an interesting question?**

Every puzzle must have:
- One memorable spatial idea
- One elegant solution (or several)
- One "aha" moment

Weak puzzles are **replaced**, not optimized.

## Changes this build

| Mystery | Verdict | Action |
|---------|---------|--------|
| 1 The Gap | ✅ Keep | unchanged |
| 2 The Column | ❌→✅ Rebuilt | Corner→column; must spark top Fire, min chain 5 |
| 3 The Jump | ✅ Keep | unchanged |
| 4 The Fork | ❌→✅ Replaced | Left/right split; wrong spark fails |
| 5 The Wall | ⭐ Keep | unchanged |
| 6 Steam Door | 🟡 Rework | minChain 5 — no tap-Water bypass |
| 7 The Island | 🟡 Rework | minChain 4 — no tap-Water bypass |
| 8 The Heart | ⭐ Keep | unchanged |

## Constraint design (no new mechanics)

- `objective.minChain` — rejects trivial anchor-only sparks
- `requiredSpark` — win only if spark starts on a specific cell (Mystery 2)

## Sprint rule (locked)

Every sprint asks: **Does this board ask an interesting question?**

If yes → build it.  
If no → delete it.

Goal: **eight unforgettable questions** now. **One hundred** to learn the design language.

## Product identity (locked)

> *Every board asks a different spatial question, and you answer it by creating the perfect chain reaction.*

Handcrafted puzzle strategy game. Random Hand = sandbox after graduation.

## Play URL

https://freestylegrapplerz-ez-brackets.github.io/tapout-tactics/glyph/index.html

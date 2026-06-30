# GLYPH build notes — Synergy Path (`vs-1.2.0-synergy-path`)

**Date:** 2026-06-29  
**Branch:** `cursor/synergy-path-6013`

## What shipped

Guided **Synergy Path** — six ordered lessons that walk players from Fire/Water connection through each element’s role and how they combine.

| Step | Lesson | What it teaches |
|------|--------|-----------------|
| 1 | Connection · Fire + Water only | Touch to chain |
| 2 | Connection · link clusters | Bigger board = longer chain |
| 3 | Synergy · Fire wakes Water | **Steam** (+15, +0.25×) |
| 4 | Synergy · Lightning jumps gaps | **Leap** up to 3 cells |
| 5 | Synergy · Crystal at the tail | **+0.6×** late in chain |
| 6 | Synergy · all four together | Capstone chain |

## UX (no popup tutorial)

- **Step indicator** — “Step N of 6”
- **One-line invite** per lesson (onboard copy)
- **Visible target** during build
- **Board callouts** — “Steam!” / “Crystal surge!” during cascade
- **Synergy tip** after credits — one sentence explaining what happened
- **Next lesson →** button after credits to advance the path
- **Synergy Path** button restarts from step 1; **Random Hand** exits the path

## Files touched

- `glyph/src/performances.js` — P3–P6 presets, `SYNERGY_PATH`, helpers
- `glyph/src/game.js` — path mode, credits tip, next lesson
- `glyph/src/performance.js` — synergy hope lines
- `glyph/index.html` — path UI shell
- `glyph/src/theme.css` — step + credits styling

## Play

Hard refresh required. Version string at bottom: `vs-1.2.0-synergy-path`.

## Tests

`cd glyph && npm test` — performance + synergy path coverage for all six lessons.

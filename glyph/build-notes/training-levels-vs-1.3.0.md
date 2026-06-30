# GLYPH build notes — Training Levels (`vs-1.3.0-training-levels`)

**Date:** 2026-06-29  
**Branch:** `cursor/training-levels-6013`

## What shipped

Expanded the Synergy Path into **12 Training Levels** — training wheels that ramp from basics through advanced setup, then graduate into Random Hand.

## Level map

| Level | Phase | Lesson |
|------:|-------|--------|
| 1 | Basics | Fill the gap · build a chain |
| 2 | Basics | Link two clusters |
| 3 | Synergies | Fire wakes Water (steam) |
| 4 | Synergies | Lightning jumps gaps |
| 5 | Synergies | Crystal at the tail |
| 6 | Synergies | All four together |
| 7 | Advanced | Where you spark (directorship) |
| 8 | Advanced | Place Water for steam |
| 9 | Advanced | Extend the row (L→W→F) |
| 10 | Advanced | Crystal goes last |
| 11 | Advanced | Compose the whole toolkit |
| 12 | Graduation | Empty board · full hand → **Play for real** |

## UX

- Header: `Level N of 12 · Phase`
- Progress saved in `localStorage` — resume where you left off
- **Restart Training** from level 1
- Level 12 ends with **Play for real →** → Random Hand
- Completed training skips to Random Hand on next visit

## Version

`vs-1.3.0-training-levels` — hard refresh required.

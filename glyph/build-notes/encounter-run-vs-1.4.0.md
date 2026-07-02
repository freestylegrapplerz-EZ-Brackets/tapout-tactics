# GLYPH build notes — Encounter Run (`vs-1.4.0-encounter-run`)

**Branch:** `cursor/encounter-run-6013`

## What shipped

**Encounter Run** — a 5-stage campaign where chain reactions have a *purpose*, not just a score.

| # | Encounter | Goal |
|---|-----------|------|
| 1 | The Hollow | Awaken with score 70+ |
| 2 | The Scar | Route around blocked stone · chain 6+ |
| 3 | The Drowned Core | Break the Water anchor |
| 4 | The Split | Unite clusters · chain 7+ |
| 5 | **The Rime Warden** (boss) | Shatter the Crystal heart |

## Design intent (Constitution-safe)

- **Horizontal challenge** — new boards and objectives, not power upgrades
- **Objective variety** — score, chain length, break anchor (Phase 7)
- **Blocked cells** — different-looking boards without new sim rules
- **Victory/defeat lines** — the chain *means* something
- Progress saves in `localStorage`

## Flow

Training (12 levels) → **Encounter Run** (5 encounters) → Random Hand

Or jump to **Encounter Run** anytime from the main controls.

## Version

`vs-1.4.0-encounter-run`

# Board Mysteries — vs-1.9.0-board-mysteries

**Authorized by:** Greg (CEO) — Product fork  
**Branch:** `cursor/board-mysteries-6013`  
**Build:** `vs-1.9.0-board-mysteries`

## Product decision

GLYPH no longer assumes the player generates the interesting problem.

**Primary mode:** Board Mysteries — a sequence of curated spatial questions.  
**Secondary mode:** Random Hand — sandbox until proven otherwise.

> *"It's a game where every board is a new spatial mystery, and you solve it by building the perfect chain reaction."*

## What changed

- **`boardMysteries.js`** — 8 question-first boards (preset, blocked, anchor, hand, objective)
- **`game.js`** — boots to Board Mysteries; Random Hand demoted to secondary button
- **`index.html`** — new tagline; question shown in onboard line; control hierarchy updated

## What did NOT change

No new mechanics, progression systems, UI redesign, or scoring rules. Existing placement, spark, and cascade only.

## The eight mysteries

| # | Name | Spatial question |
|---|------|------------------|
| 1 | The Gap | What single rune bridges two Fires across one empty cell? |
| 2 | The Corner | Can Fire at the edge reach Water trapped in the far corner? |
| 3 | The Jump | Two shores, one gap — can a single Lightning bolt unite them? |
| 4 | The First Spark | The board is complete — but which rune should wake first? |
| 5 | The Wall | Stone blocks the straight path. Where does the chain go instead? |
| 6 | The Steam Door | Water waits behind the line. What placement turns it to steam? |
| 7 | The Island | A lone rune sits on a distant island — will the wave reach it? |
| 8 | The Heart | Crystal at the center, paths split — can one chain embrace it all? |

## CEO play protocol

Play mysteries **1 → 8** in order. After each board:

1. Was the **question** clear before you started placing?
2. Did solving it feel like answering a **specific** spatial puzzle — not "connect everything"?
3. Did you want to see **the next board** immediately?

If yes to #3 across the sequence, the product fork is validated.

## Play URL (after merge)

https://freestylegrapplerz-ez-brackets.github.io/tapout-tactics/glyph/index.html

Random Hand: click **Random Hand** button from any board.

## Not authorized yet

- Scarcity / opportunity-cost redesign
- New mechanics or progression
- Random Hand as primary mode

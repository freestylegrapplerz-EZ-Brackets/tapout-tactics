# Run Purpose Experiment — vs-1.8.0-exp

**Authorized by:** Greg (CEO)  
**Branch:** `cursor/run-purpose-experiment-6013`  
**Build:** `vs-1.8.0-exp`

## Hypothesis

Three identical builds. One variable: **run purpose**.

| Version | URL | Purpose |
|---------|-----|---------|
| **A** | `glyph/index.html` | Current experience (target score) |
| **B** | `glyph/exp-b.html` or `?pur=b` | Awaken every rune you placed |
| **C** | `glyph/exp-c.html` or `?pur=c` | Reach the farthest rune you placed |

Everything else is identical: same mechanics, UI, progression, encounters, tutorials, polish.

## What changed

- `runPurpose.js` — purpose parsing, build-phase objective copy, end-of-run verdict for B/C only
- `game.js` — wires purpose into Random Hand objective line and credits meta
- `exp-b.html` / `exp-c.html` — thin entry points for CEO play links

Version A is unchanged gameplay: Random Hand still shows **Target N** and score-vs-target credits.

Versions B and C only differ during **Random Hand**:
- **Build phase:** objective line replaces target line
- **Credits:** purpose verdict replaces target comparison in meta

Training and Encounter Run are untouched in all three versions.

## CEO play protocol

Play **~3 Random Hand runs** on each URL. Do not use Training or Encounter for this comparison.

After each run, note:

1. Did you know what you were trying to do **before** spark?
2. Did you want another run immediately?
3. Which version made the run feel like it had a purpose?

Compare A vs B vs C. The winner earns permanent run purpose.

## GitHub Pages (after merge)

- A: https://freestylegrapplerz-ez-brackets.github.io/tapout-tactics/glyph/index.html
- B: https://freestylegrapplerz-ez-brackets.github.io/tapout-tactics/glyph/exp-b.html
- C: https://freestylegrapplerz-ez-brackets.github.io/tapout-tactics/glyph/exp-c.html

## Not authorized

- Further run-purpose analysis
- New mechanics, UI redesign, progression, encounters, tutorials
- Retention experiments until this experiment completes

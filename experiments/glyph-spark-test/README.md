# GLYPH — Spark Test (disprove-it experiment)

This is **not** a game and **not** a prototype of GLYPH. It is the smallest possible object that tests one loop:

> **Placement → Spark → Cascade → Score**

Its only purpose is to answer three questions honestly — and ideally to *disprove* GLYPH cheaply before anyone commits production time.

## How to run

Open `index.html` in any modern browser (double-click it, or serve the folder). No build step, no dependencies, no internet. Sound is on by default (a rising-pitch crescendo during the cascade); there's a mute button.

## How to play (deliberately no in-game tutorial)

1. You get a random **hand** of 8 runes (Fire / Lightning / Water / Crystal).
2. Click a rune in your hand, then click an empty board cell to **place** it. Right-click a placed rune to pick it back up.
3. Make runes **touch** so a spark can travel between them.
4. Click any **placed** rune to **Spark** from there. Watch the chain resolve.
5. **New Hand** = fresh random runes. **Clear Board (same runes)** = retry the same hand with a new layout.

Rune rules (shown in-build as a legend):
- **Fire** ignites the 4 orthogonally touching runes.
- **Lightning** arcs to the nearest rune in each straight line (jumps gaps), range 3.
- **Water** spreads to all 8 surrounding runes (erupts to "steam" when fed by Fire/Lightning).
- **Crystal** splits to all 8 surrounding runes **and** boosts the score multiplier.

The multiplier grows with every activation, so the **end** of a chain is worth far more than the start — that's the intended crescendo.

> Note: this experiment intentionally leaves **Crystal overloaded** (it both branches *and* multiplies). That is the balance risk flagged in Phase 4 and is *out of scope here* — the experiment tests feel, not balance.

## The three questions this experiment must answer

1. **Ownership** — after Spark, does the tester say *"I caused that"* or *"the game caused that"*? Ownership is mandatory.
2. **Replay desire** — do they say *"I want to try again"* (not *"that was neat"*)?
3. **Payoff > setup** — does the detonation feel *bigger than the planning*? If the cascade doesn't exceed expectations, the project fails.

## Success criteria (watch for, don't prompt)

- Testers voluntarily replay multiple times.
- Testers begin experimenting with placements without being told to.
- Testers talk about strategies ("what if I put the crystal here…").
- Testers feel ownership of the result.

## Failure criteria

- "Neat." / "I get it." → one run and done.
- No experimentation, no desire to improve, no emotional attachment to the result.

## How to observe (suggested protocol)

- Say only: *"Place runes, then click one to spark. Try to score high."* Then stay quiet.
- Watch whether they replay **without being asked**. Count voluntary replays.
- Afterward ask one open question: *"What just happened?"* Listen for "I" (ownership) vs "it" (no ownership).
- Do **not** coach. The experiment is about whether the loop pulls them in on its own.

If testers replay, experiment, and say "I", GLYPH earns production. If they shrug, it doesn't — and the fallback is to re-run this exact test with the **FUSE** (fireworks) skin, which directly attacks the marketing/virality weaknesses noted in the red-team review.

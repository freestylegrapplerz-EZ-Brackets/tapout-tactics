# GLYPH — Phase 2: Core Mechanic Validation

*Pre-production, Phase 2. Scope is strictly the **core gameplay mechanic**. This document deliberately does **not** discuss progression, unlocks, economy, monetization, meta progression, content roadmap, art assets, or production. The only question: **what makes pressing Spark feel incredible?***

---

## PART 1 — Define the moment

The emotional heartbeat of one board: **calm intention → tightening tension → release → escalating delight → vindication → renewed desire.**

1. **Placing the first rune** — *Intention / optimism.* This is choosing where the spine of the plan begins. Low stakes, high possibility: "this is where my chain starts." The player feels like an architect setting a cornerstone.
2. **Placing the final rune** — *Tension / a held breath.* The board is now a loaded gun. The player is mentally simulating the cascade, half-seeing it fire. The feeling is "...I think this is going to work" — anticipation at its peak, with a flicker of doubt.
3. **Pressing Spark** — *Commitment / release.* The point of no return. A small, thrilling surrender: "I've done my part; now let's see if I was right." Like releasing a pinball plunger or tipping the first domino.
4. **Watching the cascade** — *Escalating delight.* The single most important window. It must arc: **recognition** ("yes — fire hits the oil, good, I planned that") → **escalation** ("...wait, it's still going") → **surprise** ("WHOA, that branch fired too"). A crescendo, not a flash.
5. **Seeing the final score** — *Vindication, or instructive failure.* On success: pride — the literal "I'm a genius" — and an instant urge to do it bigger. On a near miss: a *productive sting* — "I was SO close, and I can see exactly what I'd change." Never opaque, always forward momentum: "again, better."

If any step is emotionally flat, the mechanic has failed. Step 4 carries the whole experience and is the thing the prototype must nail.

---

## PART 2 — Player decisions

Every meaningful decision in a single board, with why it's interesting / what skill it tests / its tradeoff:

**1. Which rune to commit (from a limited set in hand).**
- *Interesting:* each rune is a tool with a functional role; choosing one commits to a synergy direction.
- *Skill:* evaluation and planning — reading potential.
- *Tradeoff:* a powerful specialized rune now vs. flexibility/space for later; specialization vs. adaptability.

**2. Where to place it — the topology.** *(The central decision.)*
- *Interesting:* position decides what touches what, which is the entire shape of the cascade. This is the architect's core act.
- *Skill:* spatial reasoning and foresight (chain-routing).
- *Tradeoff:* tight clusters (big local burst) vs. long routes (longer chains); maximize immediate adjacency vs. leave room to extend.

**3. Orientation — for directional runes only.**
- *Interesting:* runes that emit along a line let you aim and route the wave.
- *Skill:* spatial routing.
- *Tradeoff:* aim one strong line vs. spread shallowly. *(Kept as a property of specific runes, not universal — universal rotation would tax legibility for little gain.)*

**4. Where to place the Spark — the ignition origin.** *(The second layer of agency.)*
- *Interesting:* the same board lit from different origins produces different cascades, because propagation order changes which "first-hit" interactions fire and how the wave routes.
- *Skill:* sequencing foresight.
- *Tradeoff:* ignite the dense core (fast, big, but may dead-end) vs. ignite a tail to route the wave through everything.

**5. When to Spark — greed vs. safety.** *(The tension decision.)*
- *Interesting:* keep adding runes for a bigger chain, or fire now while the plan is clean?
- *Skill:* risk assessment and board-reading.
- *Tradeoff:* more runes = bigger potential but more crowding, less predictability, and tighter space.

**Decisions deliberately REMOVED as not meaningful:**
- **Order of placement** — only the *final board state* matters at Spark, so the sequence you built it in is irrelevant. Cut.
- **Confirm/undo busywork** — no decision content. Cut.
- Free rearrangement *before* Spark is allowed (it's a deliberate workbench, no timer) but is part of decisions #2/#3, not a separate decision.

The surviving set — **which / where / orientation / spark-point / when** — is tight and deep: two layers of spatial authorship (placement + ignition) wrapped in a push-your-luck (when).

---

## PART 3 — Cascade design

**What causes a rune to activate?** A rune activates if it is the Spark origin, or if an adjacent rune that just activated *reaches* it and its trigger condition is met. Base rule: **activation propagates between touching runes.**

**How does activation spread?** As a **deterministic breadth-first wave** outward from the Spark origin, one step at a time (so there is a visible, readable sequence). When a rune fires it does one simple thing — **spread** (activate neighbors), **reach** (jump a gap), **convert** (change the element passing through), or **amplify/split** (raise the multiplier and/or branch). The wave continues until nothing new can activate.

**How predictable should activation be?** **Locally: near-total.** Every *individual* interaction must be 100% knowable and certain (fire reaches oil → it ignites, always). **There is no RNG in resolution.** A board + a spark origin always produces the exact same cascade.

**How surprising should activation be?** **Globally: high.** The surprise comes not from randomness but from **combinatorial complexity** — branches, loops, and length-bonuses that compound past what a human can fully simulate in their head. Every surprise is fully explainable *in hindsight* (the resolution is traceable), so it reads as "I didn't compute that," never "the game cheated."

**Information the player MUST know before Spark:** every rune's element and its rule; the full adjacency map (what touches what); the chosen spark origin; the target to beat. The board is fully transparent — a sufficiently brilliant player *could* trace the whole chain by hand.

**Information that should remain uncertain:** the **aggregate outcome** — the total multiplier, the final reach, the score. The game must **not pre-compute and display the final number**, because that would turn the board into a solved calculator and murder the surprise. The uncertainty is **cognitive, not stochastic.**

### The line between "I planned that" and "Wow, I didn't expect that"

The line is **the scope of prediction**:

> **Local + qualitative = "I planned that."** **Global + quantitative = "Wow."**

A skilled player predicts the *qualitative shape* of the cascade ("it'll chain through here, branch at the crystal, jump that gap") but cannot hold the *quantitative total* in their head ("...for 4.7 billion"). The design target is to size the board and its branching factor so a master predicts roughly **70–80%** of the outcome and is delighted by the last **20–30%**. Determinism guarantees the "I planned that" is *always literally true*; human cognitive limits guarantee the "wow." We are deliberately tuning the system to sit **just past the threshold of mental simulation** — and finding that exact point is the prototype's #1 job.

---

## PART 4 — Element design

First, what **functional roles** does a chain-reaction engine actually need? Stripped of theme, depth comes from a few distinct roles whose interactions are **asymmetric** and **multiplicative**:
1. A **spreader** (so chains exist),
2. A **connector** (so reach/topology matters beyond immediate neighbors),
3. A **transformer** (so element type can change — the true source of combinatorial depth),
4. An **amplifier/brancher** (so there's a reason to route, and so chains split).

Now the assumed five, challenged:

- **Fire — KEEP.** *Role:* the **spreader** (activates adjacent flammables). *Necessary?* Yes — propagation is the foundation. *Unique?* Yes. *Decisions?* Yes (place near fuel, choose spread paths). The natural "the spark spreads" element.
- **Lightning — KEEP.** *Role:* the **connector** (arcs across gaps to non-adjacent runes). *Necessary?* Yes — gap-jumping makes spatial topology and clustering strategic. *Unique?* Yes. *Decisions?* Yes (bridge separate clusters).
- **Water — KEEP, but narrow its role.** *Role:* the **transformer/conduit** — it carries activation and *changes* what passes through (water + fire → steam burst; water + lightning → super-conduction). *Necessary?* Yes — the transformer is the depth engine (conditional, asymmetric combos). *The dousing/anti-fire role is CUT* — an element whose job is to *stop* chains fights the core fantasy and feels bad in a builder. Water keeps only its pro-chain conduct/convert identity.
- **Earth — CUT.** *Role as assumed:* an inert **blocker/wall**, which is fundamentally **anti-chain** and works against the entire fantasy. Its only salvageable use (a reflector that routes the wave) is a niche flavor that doesn't justify a core slot. Remove.
- **Ice — CUT.** Its "counter fire" role **duplicates** water's dousing (already cut), and its only distinctive role — a **delay/timing** layer — adds a whole new dimension (sequencing) that risks breaking legibility for marginal depth. Defer it; do not add a timing dimension until the base system proves it needs one.

**Add instead — Crystal.** *Role:* the **amplifier/brancher** — when activated it splits activation to *all* adjacent cells (branching) and raises the chain multiplier. *Why it's stronger than Earth/Ice:* branching is the single biggest depth lever (it makes topology explode combinatorially and makes "one spark, total chaos" achievable), and it is *pro-chain* and instantly legible (a crystal refracts/splits — everyone gets it).

### The smallest deepest set: **four elements**
**Fire (spread) · Lightning (reach) · Water (transform) · Crystal (amplify/split).**

- Four distinct, non-overlapping functional roles.
- Every element is **pro-chain** — none fights the fantasy.
- All are **self-explaining** (Pillar 4).
- Six pairwise interactions — rich but learnable: Fire+Water = steam burst; Lightning+Water = super-conduction (the "broken" enabler); Lightning+Crystal = split arc; Fire+Crystal = focused/amplified ignition; Fire+Lightning = accelerated spread; Water+Crystal = stored/condensed charge.

Three elements would be too shallow (no dedicated amplifier/brancher = topology matters less). Five-plus (re-adding Earth/Ice) adds legibility cost for depth the four already provide. **Four is the floor that maximizes interaction depth.**

---

## PART 5 — Failure analysis

The same three structural properties of the mechanic prevent failure at every horizon: **(a) deterministic, legible, traceable rules; (b) a cognitively-intractable optimization ceiling; (c) multiple viable topologies.**

**After 1 hour**
- *Boredom* if first chains are tiny and obvious. → Prevented because even a small deterministic board produces an emergent multi-step cascade (the intractable-sum kicks in immediately); the very first run should already deliver an "oh!"
- *Frustration* if the player can't tell why a chain stalled. → Prevented by self-explaining elements (Pillar 4) and a traceable resolution (Pillar 5): failure teaches.
- *Confusion* from too many rules. → Prevented by the four-element minimum, each legible; interactions are learned by watching, not reading.

**After 10 hours**
- *Boredom* from a single dominant strategy. → Prevented because the four roles enable genuinely different approaches (cluster-burst vs. long-route vs. branch-storm vs. convert-loops); the mechanic *allows* diverse topologies, so optimization keeps headroom.
- *Frustration* from feeling outcomes are luck. → Prevented by **zero RNG in resolution**: every result is 100% attributable to the player's board.
- *Confusion* from big cascades becoming mush. → Prevented by sequential wave propagation + a step-by-step trace: even a 30-link chain is followable.

**After 50 hours**
- *Boredom* from "solving" the game. → Prevented by a **high skill ceiling**: because maximizing the aggregate is cognitively intractable (chess/Tetris-like), the gap between a good board and an optimal board stays large indefinitely.
- *Frustration* from a bad hand of tools. → Prevented because two layers of agency (placement + spark-point) let a skilled architect extract a viable chain from almost any toolset.
- *Confusion / inconsistency.* → Prevented by **perfect rule consistency**: deterministic interactions mean mastery is never undermined by "why did that work last time?"

---

## PART 6 — The Spark Test

**Ugliest possible prototype — shapes, colors, numbers only. Would it still be fun? YES.**

Why: the fun lives entirely in **(1) meaningful placement decisions, (2) deterministic legible interactions, and (3) an emergent payoff bigger than the inputs** — none of which require art. 2048, Tetris, and chess are "shapes, colors, numbers," and they are among the most replayed games ever made. If GLYPH's core is real, a grid of colored squares with rules and a number that climbs after Spark already produces the "I planned that → whoa" arc.

**The one non-negotiable even in the ugly version:** the cascade must **resolve sequentially and legibly** — squares lighting in order while the number ticks up — not snap to a final total instantly. The crescendo (Part 1, step 4) is created by *timing and ordering*, which is not art. With sequential reveal, the ugly prototype is fun; without it, even a great mechanic feels flat.

This is exactly why the ugly prototype is the correct validation gate: it isolates the mechanic from every confound. **If colored squares are fun, art will only amplify it. If colored squares are boring, no particle effect can save it.**

---

## PART 7 — Final verdict

### 🟢 GREEN LIGHT — the core mechanic survives scrutiny.

It has a clear emotional heartbeat (Part 1), a tight set of genuinely deep decisions with two layers of spatial authorship plus push-your-luck (Part 2), a precise and defensible answer to the "planned vs. surprise" question via **deterministic resolution + cognitively-intractable aggregate** (Part 3), a **four-element minimum** that maximizes interaction depth while staying self-explaining (Part 4), and structural properties that prevent boredom/frustration/confusion at 1/10/50 hours (Part 5). It passes the Spark Test in principle (Part 6).

The single open question is **whether real boards land in the 70–80% predictable sweet spot** — and that is precisely a *tuning* question that only the ugly prototype can answer, which makes building it the correct next move. Green.

### The exact mechanic to prototype (nothing beyond the mechanic)

- A **grid board** (start 5×5; vary size during testing to find the sweet spot).
- A small **set of runes in hand** drawn from the four elements, each with **one simple, self-evident rule**.
- **Free placement and rearrangement** of those runes on the grid before sparking — deliberate, **no timer**.
- The player selects **one cell as the Spark origin**.
- On **Spark**: a **deterministic breadth-first propagation wave** from the origin. Each activated rune applies its rule; a **running chain multiplier** accrues (with diminishing returns to keep it bounded). Resolution plays out **sequentially and legibly** (cells light in order, number climbs), followed by a **post-cascade trace**.
- A **target threshold** to beat — purely to give the cascade a goal and create tension.

**The four runes and their starter rules:**
- **Fire** — on activation, activates orthogonally adjacent runes. *(spread)*
- **Lightning** — on activation, arcs to the nearest rune in a straight line within N cells, jumping empty gaps. *(reach)*
- **Water** — on activation, carries the incoming activation to all its neighbors and **converts** the interaction (fire→steam area-burst; lightning→line-wide super-conduction). *(transform/conduit)*
- **Crystal** — on activation, splits activation to **all** adjacent cells and adds to the chain multiplier. *(amplify/branch)*

**The prototype's #1 measurable goal:** find the board size + branching factor at which a skilled player predicts ~70–80% of the cascade and is delighted by the rest. That number is the whole game.

*(No progression, unlocks, economy, meta, roadmap, art, or production was decided in this phase — by design.)*

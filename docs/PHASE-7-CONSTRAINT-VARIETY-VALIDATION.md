# GLYPH — Phase 7: Constraint & Variety Validation

*Pre-production, Phase 7. Scope is strictly **constraints and replayability**. This document does **not** discuss monetization, economy, production, art, UI, progression, or unlocks. The only question: **what makes every board feel like a new puzzle?***

> **The governing principle of this phase:** *A good constraint adds a question; a bad constraint subtracts an answer.* Replayability comes from constraints that force **adaptation** (re-deploying general skill to a new problem), not from constraints that add **randomness** (luck) or **fake difficulty** (bigger numbers, fewer options). And the math that matters is **multiplicative**: a few high-quality constraint dimensions multiply into thousands of distinct problems.

---

## PART 1 — Constraint definition

**A constraint in GLYPH is any rule or condition that limits the player's freedom on a given board** — what tools you have, what you must achieve, and where/how you may act. Constraints are the *boundary conditions of the puzzle*.

**Why constraints are essential:** they are what turn "play GLYPH" into "solve *this* board." Each board is a distinct problem *because* its constraints differ. Variety, precisely defined, is simply **varying the constraints.**

**Why a game without constraints is eventually solved:** if every board grants identical freedom toward an identical goal, there is a single globally-optimal construction. Once a player (or the community) finds it, they repeat it forever — the game is solved and dies. *Varying* constraints prevent a universal solution: because the problem changes each time, the player must re-apply **general principles (skill)** rather than re-execute a **memorized solution**. This is the chess/roguelike truth — the position varies, so you can't memorize, you must understand.

---

## PART 2 — Sources of variety

Every candidate source, using only validated mechanics (a board, the four runes, a chosen spark, a threshold, a deterministic cascade). *Not assumed good — graded in Parts 3 and 5.*

1. **Objective / target *type*** — what "winning" means: maximize score, reach a chain length, activate a count of runes, use the fewest runes, hit an exact value, score using multiple elements.
2. **Rune distribution** — the *mix* of the four elements offered (Lightning-rich vs. Crystal-rich, etc.).
3. **Rune availability** — *which* element types are present at all this board.
4. **Rune quantity / placement cap** — how many runes you may use; scarcity vs. abundance.
5. **Board shape** — irregular outlines, holes, non-rectangular topologies.
6. **Board size** — 5×5 vs. larger.
7. **Placement restrictions** — blocked cells, cells limited to certain runes, or **pre-placed runes** you must build around.
8. **Spark restrictions** — a forced ignition origin, a limited choice of origins, or multiple required sparks.
9. **Special cells / board modifiers** — cells that amplify, block, or alter propagation.
10. **Threshold height** — how high the score bar is set.

---

## PART 3 — Strategic impact: adaptation vs. randomness

The decisive distinction:
- **Adaptation (good):** the variation changes *the problem* so a *different skillful response* becomes optimal — and the player has the information and agency to find it.
- **Randomness/noise (bad):** the variation changes the *outcome or difficulty* without changing the *quality of the decision*, or without giving agency to respond. Luck, not skill.
- **Fake difficulty (bad):** the board is made *harder* by removing options or cranking numbers rather than by demanding *better thinking*.

| Source | Effect | Verdict |
|---|---|---|
| **Objective type** | Redefines what "optimal" means → forces a *different archetype* | **Pure adaptation — the gold standard** |
| **Board shape** | Forces re-routing; breaks memorized patterns | **Strong adaptation** |
| **Placement restrictions / pre-placed runes** | New spatial problem to build around each time | **Strong adaptation** (if informed, not arbitrary) |
| **Rune distribution** | Pushes lever/archetype choice | **Adaptation *if bounded*** (else "bad hand" randomness) |
| **Rune availability** | Gates which archetypes are possible | **Adaptation if any subset is workable**, else randomness |
| **Rune quantity / placement cap** | Changes the optimization character (efficiency vs. scale) | **Adaptation** (mild, reliable) |
| **Spark restrictions** | Changes propagation order | **Mixed** — adaptation if "solve around a fixed origin," bad if it just deletes the spark decision |
| **Board size** | Mostly changes *scale*, not *thinking* | **Weak** (more of the same, not new) |
| **Special cells / modifiers** | New local rules to exploit | **High-risk** — adaptation if balanced, fake difficulty / dominant-strategy magnet if not |
| **Threshold height** | Same thinking, higher bar | **Bad as variety** — a difficulty *dial*, not a source of new puzzles |

**The principle:** *good variety changes what optimal means, or what the topology must be; bad variety changes how hard or how lucky without changing how to think.*

---

## PART 4 — Replayability analysis

- **10 boards:** distribution + objective variety alone make each distinct; novelty comes from *discovery*.
- **100 boards:** the *product* of (objective × distribution × shape × restrictions) means you rarely meet the same problem twice; novelty comes from *new archetype demands*.
- **1000 boards:** *categories* of board begin to recur — so novelty shifts toward **constraint *combinations*** (the interaction of two or three constraints producing problem types you haven't optimized) and toward **your own evolving skill seeing old problems anew** (the Phase-3 mastery loop).
- **10,000 boards:** no finite constraint vocabulary yields 10,000 *categorically* distinct puzzles, and we should be honest about that. What prevents repetition at this scale is three things working together: **(a)** the **multiplicative combinatorics of constraint *combinations*** (a few dimensions, each with several values, multiply into thousands of distinct problems); **(b)** the **deterministic-but-intractable core** — even a "seen" constraint set has an unsolved optimum you keep chasing (exactly why chess isn't repetitive after thousands of games); and **(c)** **player-skill evolution** re-framing familiar boards.

> The honest takeaway: *categorical* novelty is finite, but **combinatorial novelty × optimization novelty** is effectively unbounded. Replayability is the **product** of constraint dimensions, not their sum — and each cell of that product is itself an unsolved optimization.

---

## PART 5 — Constraint quality

*A good constraint forces new thinking; a bad constraint simply removes options.*

- **Objective type — A+.** Adds a question ("what does winning mean here?"); each value summons a different archetype. The richest, cheapest variety in the game.
- **Board shape — A.** Adds a routing question; defeats memorized patterns.
- **Placement restrictions / pre-placed runes — A− / B.** Adds a "build around this" question — *if informed and visible*; arbitrary or punishing versions degrade to fake difficulty.
- **Rune distribution — B+.** Adds a "which lever fits this hand?" question — *if bounded* so a viable line always exists; unbounded, it becomes a luck complaint.
- **Rune quantity / placement cap — B+.** Adds an efficiency question; reliable, low-risk.
- **Spark restrictions — B− / C.** Good as "solve around this origin"; bad when it merely deletes the spark decision (subtracts an answer).
- **Board size — C.** Mostly scale; rarely *new* thinking on its own.
- **Special cells / modifiers — B if disciplined, D if not.** Powerful but the easiest to turn into fake difficulty or a dominant-strategy magnet; use sparingly and balanced.
- **Threshold height — C/D as variety.** Same thinking, bigger bar. Acceptable only as a *difficulty tuning dial layered on real constraints*, never as a source of novelty.

> **The test for any candidate constraint: does it have *multiple skillful responses* and is it *fully visible before commitment*? If yes, it adds a question. If it has one response, is hidden, is unwinnable, or just scales numbers — it subtracts an answer.**

---

## PART 6 — The puzzle test

**Can the same player approach two different boards with two different strategies? Yes — and that is the definition of success here.**

Divergence is created when two boards carry *different constraint sets that make different archetypes optimal*:
- *Board A* — Lightning-rich distribution + "maximize score" objective + open board → the **Serpent** (long route).
- *Board B* — Crystal-rich distribution + "activate ≥ K runes" objective + irregular board with blocked cells → the **Bloom** (branch).

The *same player* plays Serpent on A and Bloom on B because the constraints **demand** it. The engine of divergence is the combination **objective type × rune distribution × board topology** — together they select which archetype wins. This is what makes "every board a new puzzle" literally true, and it is what gives each Phase-4 archetype its natural habitat.

The dependency to note: the puzzle test *requires* the Phase-4 balance. If one archetype were optimal across all constraint sets (the Crystal-collapse risk), there would be no divergence and every board would reduce to the same play. **Constraint variety and strategy balance are partners.**

---

## PART 7 — Failure analysis

- **Reduces strategy diversity:** constraints that always favor one archetype (e.g., if *every* objective is "maximize score," the highest-ceiling archetype always wins → convergence); or constraints too mild to matter. → *Fix:* objective variety must span the levers so different archetypes win different boards.
- **Creates frustration:** unbounded distribution randomness producing *unwinnable* hands; arbitrary placement/spark restrictions that feel unfair; **hidden** constraints the player can't plan around before committing. → *Fix:* bound the randomness (a viable line always exists), full information, informed restrictions only.
- **Creates fake difficulty:** cranking the threshold or shrinking resources without changing the *thinking*; spark-denial that just removes agency. → *Fix:* difficulty must come from *better-thinking-required* constraints, not bigger bars or fewer options.
- **Encourages dominant strategies:** special cells that are strictly good and always exploited identically; any constraint with a single trivially-best response; constraints that consistently reward the already-suspect Crystal lever. → *Fix:* every constraint must have *multiple viable responses* — a constraint with one answer is a bad constraint.

> Unifying rule: **a healthy constraint is visible, bounded (always winnable), has multiple skillful responses, and changes *how you think* — not just *how hard it is*.**

---

## PART 8 — Final verdict

### 🟢 GREEN LIGHT — GLYPH can generate years of meaningful variation.

Because replayability here is **multiplicative across a few high-quality constraint dimensions**, and because the deterministic-yet-intractable core means even a repeated constraint set still hides an unsolved optimum, GLYPH can stay fresh far longer than its authored content would suggest. The condition: **lean on adaptation-forcing constraints (objective type, board topology, distribution, restrictions); avoid fake-difficulty levers (threshold-cranking, option-removal); keep randomness bounded; and keep every constraint visible with multiple viable responses.** Held to that, every board is a genuinely new puzzle. Green.

### The smallest set of constraints that creates the largest replayability

Three multiplicative dimensions — the minimal powerful basis:

1. **Objective type** — *what "winning" means* (max score / chain length / activation count / fewest runes / exact value / element diversity). This selects the **archetype** and is the single richest source of new thinking.
2. **Rune distribution (bounded)** — *which tools you're handed*. This forces you to find the archetype that fits the hand, and guarantees you can't pre-plan one universal board.
3. **Board topology** — *shape plus a few placement restrictions / pre-placed runes*. This forces the spatial problem to be re-solved every time.

> **Objective × Distribution × Topology.** Three dimensions, each with a handful of values, multiply into thousands of categorically distinct problems — and because resolution is deterministic-but-intractable, *each one is itself an unsolved optimization.* That product, not any single lever, is the engine of years-long replayability — and it is small enough for a solo creator to author.

A fourth lever — **threshold height / resource quantity** — should exist only as an *optional difficulty dial layered on top of the three*, never as a substitute for them. Difficulty is a knob; variety is the product of the three real dimensions.

*(No progression, unlocks, monetization, economy, art, UI, or production was decided in this phase — by design.)*

# GLYPH — Phase 5: Decision Architecture Validation

*Pre-production, Phase 5. Scope is strictly **player decisions**. This document does **not** discuss progression, unlocks, economy, monetization, classes, content roadmap, or production. The only question: **is every major player action genuinely interesting?***

---

## PART 1 — Decision inventory

Every decision the player makes inside a single board, with why it's interesting / what information it considers / its tradeoff. Fake decisions are removed at the end.

**A. Which rune to commit (and whether to hold one).**
- *Interesting:* it sets the strategic direction — which score lever and archetype you're pursuing with this hand.
- *Information:* current board, the runes available, the target, what synergizes with what's already placed.
- *Tradeoff:* power now vs. flexibility/space later; specialize vs. stay adaptable; spend a rune vs. hold it to keep the board clean.

**B. Where to place it — the topology.**
- *Interesting:* position determines what touches what, which determines the entire cascade. This is the architect's core act.
- *Information:* adjacency to existing runes, propagation routes, room to extend, the spark-origin you're planning.
- *Tradeoff:* tight clustering (big local burst) vs. long routing (length multiplier); maximize adjacency now vs. leave space to extend.

**C. Orientation — for directional runes only.**
- *Interesting (conditionally):* a rune that emits along a line lets you aim and route the wave.
- *Information:* which targets sit along each possible line.
- *Tradeoff:* aim one strong line vs. spread shallowly.
- *Caveat:* this is only a real decision when **multiple worthwhile targets exist**; otherwise it has an obvious answer (see Part 2).

**D. Where to Spark — the ignition origin.**
- *Interesting:* the same board lit from different origins propagates in a different order, changing routing and any first-hit / order-dependent interactions.
- *Information:* the board topology, where order-dependent combos (e.g., a water node that needs its feeder to fire first) sit.
- *Tradeoff:* ignite the dense core (fast, big, may dead-end) vs. ignite a tail to route the wave through everything.

**E. When to Spark — the stop decision.**
- *Interesting:* both under-building and over-building lose; knowing the moment to commit is its own skill.
- *Information:* the target, the diminishing-returns knee, remaining runes, board crowding.
- *Tradeoff:* greed (a bigger chain) vs. safety (a cleaner, more predictable board).

**Fake decisions removed:**
- **Order of placement** — only the *final board state* matters at Spark, so the sequence you built it in is irrelevant. Cut.
- **Orientation of omnidirectional runes** — no decision content. Cut (kept only for directional runes, per C).
- **Confirm/undo clicks** — busywork, no content. Cut.
- **Rearranging placed runes before Spark** — not a separate decision; it is continuous with B (the board is a free workbench until ignition).

Surviving real decisions: **A (which), B (where), C (orientation, conditional), D (spark-origin), E (stop).** Two layers of spatial authorship wrapped in a push-your-luck.

---

## PART 2 — Decision quality

For each: obvious answer? uncertainty? tension? skill expression? Could two experts reasonably disagree?

| Decision | Obvious answer? | Uncertainty | Tension | Skill expression | Experts disagree? |
|---|---|---|---|---|---|
| **B. Where to place (topology)** | Almost never | High (intractable aggregate) | High (cluster vs. route) | Deepest | **Constantly** — this is where style diverges |
| **E. When to Spark (stop)** | No | Yes (the knee + target) | **Highest** (greed vs. safety) | High (EV calibration) | Yes — by risk appetite |
| **A. Which rune (incl. hold)** | Rarely | Yes (which lever to back) | Yes (specialize vs. flex) | High (evaluation) | Yes — same hand, different archetypes |
| **D. Where to Spark (origin)** | *Sometimes* (simple boards) | Yes on order-dependent boards | Medium-high | High (sequencing) | Yes — esp. conversion boards |
| **C. Orientation (directional)** | *Often* (one clear target) | Low-medium | Low-medium | Minor | Occasionally |

**Honest reads:**
- **B and E are consistently high-quality** — no obvious answer, real tension, deep skill, perpetual expert disagreement. These are the load-bearing decisions.
- **A is high-quality** and is the main *identity* decision.
- **D is variable-quality:** genuinely interesting on order-dependent boards (where a feeder must fire first), but can be near-obvious on a simple Serpent (light one end). It earns its keep because the *interesting* cases are exactly the high-skill ones.
- **C is the weakest — the one decision most at risk of being fake.** It is only interesting when multiple worthwhile targets compete for the line. It is acceptable as a *minor, conditional* layer, but it must never be the spine of a board's decision-making.

**Could two experts reasonably disagree?** On B, A, and E — yes, routinely and meaningfully. That is the strongest possible evidence the decisions are real.

---

## PART 3 — Decision frequency

**During the build phase, decision density is high:** every rune placed is simultaneously an A (which) and a B (where), so a board is a dense burst of weighty choices, punctuated by the E (stop) and D (spark-origin) decisions. Then comes the **resolution window** (watching the cascade), which is intentionally a *no-decision* beat — it is the payoff and the feedback signal (Phases 1 and 3), not a dead zone.

**Risks honestly identified:**
- **Autopilot on trivial "fill" placements.** Late in a board, once the plan is set, the last placements can become obvious filler. → Cure (decision-architecture level): keep the **target pressing** so even the final placement affects whether you clear it.
- **The over-powered board.** If a hand is far stronger than the target, the optimal play becomes obvious and the board is effectively *solved* → autopilot. → Cure: thresholds must stay high relative to the hand so optimization always matters. (Trivially-easy boards are the enemy of decision quality.)
- **The resolution window becoming a *wait*.** A no-decision beat is healthy only if it stays a *payoff*; an over-long cascade with nothing to do drifts toward a dead zone. → It must be paced as a satisfying crescendo, not idle time.
- **The Phase-4 balance risk.** If Crystal stays overloaded, expert decisions could trivialize into "place crystals," hollowing out B and A. Decision quality is therefore *downstream of the Phase-4 guardrail* as well.

None of these are fatal; all are governable. The core property is sound: **the build phase is decision-dense, with one intentional payoff beat.**

---

## PART 4 — Decision hierarchy

Ranked by impact on outcome and experience:

1. **B — Where to place (topology).** *The* decision; it is the game. Highest skill, highest frequency, defines every cascade.
2. **E — When to Spark (stop).** The tension heartbeat; a single high-leverage commit that gates everything.
3. **A — Which rune (incl. hold).** Sets the strategic direction for the whole board.
4. **D — Where to Spark (origin).** High leverage on order-dependent boards; the cleanest "I planned that" moments.
5. **C — Orientation.** A conditional, supporting layer.

**Which decisions create what:**
- **Mastery:** B (placement), D (spark-origin sequencing), and E (stop calibration). These reward skill growth most and have the highest ceilings.
- **Engagement:** E (the push-your-luck tension) is the moment-to-moment engagement engine; the rapid B/A placement loop sustains it.
- **Identity:** A (which rune / which lever) plus the cumulative topology of B define a player's archetype and style — this is where "your" GLYPH differs from someone else's.

---

## PART 5 — Analysis paralysis test

**Could players be overwhelmed? The mechanic has strong built-in governors.**
- **Bounded option space:** a small board and a limited hand cap how many placements and rune choices exist at any moment.
- **The intractability paradox (a subtle strength):** because the aggregate is *deliberately uncomputable* (Phase 2), the rational move is to **plan the qualitative shape and accept the quantitative surprise** rather than calculate to the end. Since you *can't* fully solve it, the system implicitly tells you to stop calculating and commit — intractability both *creates* the surprise *and* *suppresses* paralysis.
- **The stop decision is an escape hatch:** you can always just Spark, which naturally caps over-deliberation.

**Residual risk:** players temperamentally prone to over-optimizing may still stall, especially experts who can perceive many lines. The board-size and hand-size constraints are the real throttle on this.

**How much thinking should happen?** Enough to plan the *shape* and the *spark/stop* — not enough to compute the *total*. **Deliberate but decisive.**

**Ideal decision cadence:** a handful of weighty placements, then commit — a focused burst, not a multi-minute optimization slog. The rhythm is *plan → build → commit → witness*, repeated. Short and punchy protects both flow and anti-paralysis.

---

## PART 6 — Flow state test

- **Beginner flow:** a simple, low-load loop; placements feel exploratory; flow comes from *surprise and discovery*. Few decisions are made consciously — most are intuitive. (Risk: it can feel random until the interaction rules click.)
- **Intermediate flow:** planning 2–3 step combos; flow comes from *executing an intended combo and watching it work*. Decisions feel meaningful and mostly tractable.
- **Expert flow:** the whole board is perceived as a system; flow comes from *rapid pattern-judgment* plus the *tension of the stop decision* plus the *chase for optimization*. The expert perceives *more* decisions but resolves them *faster* via heuristics — flow at a higher altitude, like a master under time pressure.

**Does decision-making get more interesting with skill? YES — and this is the single healthiest property of the architecture.** The *same* decision deepens as you improve: placement goes from "make things touch" to "route a multi-branch optimization," and new layers (spark-origin sequencing, stop calibration, archetype flexing) become salient. Decisions **deepen** rather than trivialize, because intractability keeps the ceiling open.

**The one caveat:** this depends on the Phase-4 balance holding. If Crystal collapses the strategy space, expert decisions trivialize to "place crystals" and flow degrades into autopilot. Decision-depth and strategic-diversity are bound together.

---

## PART 7 — The "one more run" test

- **"Just one more run."** Created by **E (the stop decision)** married to **deterministic, legible feedback**: you see *exactly* how a different stop or placement would have cleared it, and the next hand is different — so you feel "I can do better with the skill I already have." Instant retry urge.
- **"I want to try something different."** Created by **A (which rune / which lever)**: realizing an unexplored archetype (Serpent instead of Bloom) might suit your style or a new hand. The strategy space surfacing alternatives is what turns repetition into experimentation.
- **"I almost had it."** Created by **E (stop) + D (spark-origin) + the target + the legible failure trace**: sparking just short and seeing precisely where the last few points slipped — "if I'd waited one more, lit the other end, placed that rune one cell over." This is the productive-failure engine.

Each of the three retention emotions traces to a *specific* decision, which is exactly what a healthy decision architecture should produce.

---

## PART 8 — Final verdict

### 🟢 GREEN LIGHT — the game generates enough meaningful decisions to sustain engagement.

The build phase is decision-dense; the load-bearing decisions (placement, stop, which-rune) are consistently high-quality with perpetual expert disagreement; decisions *deepen* with skill rather than trivializing; and each of the three retention emotions maps cleanly onto a specific decision.

**Hidden dead zones — found, and all manageable:**
- **Orientation (C)** is a sometimes-fake decision → keep it minor and conditional; never let it carry a board.
- **Autopilot on over-powered/trivial boards** → keep targets pressing so every placement matters.
- **The resolution window** is an intentional payoff beat, not a dead zone — but it must be *paced as a crescendo*, never a wait.
- **Decision-depth is bound to the Phase-4 balance** — if Crystal collapses the strategy space, expert decisions trivialize. The balance guardrail protects the decision architecture too.

None of these are structural failures; they are guardrails to hold during later phases.

### The single most important decision in GLYPH

> **Where to place each rune relative to the others — the construction of the board's topology (Decision B).**

This is the decision that defines the entire game. It is the architect's act made literal; it is the most frequent and the highest-skill choice; it is the only decision two experts disagree on *every single board*; and it is the source of mastery, identity, the "I planned that" emotion, and the visibly distinct boards of the spectator test. Every other decision is, in effect, a modifier on the topology you build: **the stop decision (E) decides *when* the structure is finished, and the spark-origin (D) decides *how* it ignites — but placement decides *what the structure is*.** Get placement right and GLYPH is a deep game; make placement shallow and nothing else can save it.

*(No progression, unlocks, economy, monetization, classes, roadmap, or production was decided in this phase — by design.)*

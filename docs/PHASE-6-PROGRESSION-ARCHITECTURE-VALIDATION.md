# GLYPH — Phase 6: Progression Architecture Validation

*Pre-production, Phase 6. Scope is strictly **progression**. This document does **not** discuss monetization, pricing, ads, cosmetics, live service, or production. The only question: **why does a player start another run?***

> **The foundational constraint inherited from Phases 1–5.** GLYPH's value rests on a deterministic, skill-attributable core (Phase 3) and a balanced multi-strategy space (Phase 4). The single greatest threat to that core is **progression that grants permanent power** — the classic roguelike self-sabotage. Every answer below is built to add progression *without* eroding skill attribution. The model to follow is **Slay the Spire / Into the Breach / Balatro**: unlocks add *variety and harder challenges*, never *raw strength*.

---

## PART 1 — Progression philosophy

**Primary: more MASTERY** — the *player* progresses, not the avatar. The numbers that go up live in the player's head (skill, knowledge), not in a save file's power stats.

**Strong supporting roles: more KNOWLEDGE** (learning interactions, motifs, hand→archetype mappings) and **more OPTIONS** (breadth of tools and situations to apply skill to).

**To be avoided as primary drivers:**
- **More POWER** — *the* foundation-killer. Permanent strength makes outcomes less attributable to skill (breaks Phase 3), trivializes boards into autopilot (breaks Phase 5), and invites power-ranked unlocks that collapse the strategy space (breaks Phase 4). Avoid entirely.
- **More CONTENT as the engine** — a content treadmill creates dependency on constant new production (fatal for a solo dev) and is shallow retention. Content may *expand* the option/knowledge space, but it must never *be* the progression engine.

> **The one-line philosophy: in GLYPH the player progresses, not the power bar. Progression adds *breadth and challenge*, never *strength*.**

---

## PART 2 — Short-term progression (within a single run)

Within a run, growth is healthy and desirable — *because it resets*, it creates momentum without permanent power creep. The feelings, in arc order:

- **Discovery** (early): "what is this run going to be about?" — reading the hand for its latent synergy.
- **Specialization** (middle): the run *commits* to an archetype (Serpent / Bloom / Alchemist / Jeweler / Core); it stops being generic and becomes "a run about length" or "a run about conversion."
- **Growth & momentum** (build): your board's potential compounds as you construct your engine, and the escalating target makes that growth feel *necessary*, not idle.
- **Climax** (late): a peak cascade against the hardest target of the run.

**How a run should evolve:** *open* (broad possibility) → *commit* (specialize on what you're offered) → *snowball* (compound the chosen lever) → *climax* (peak detonation) → *resolve*. A story arc: setup → rising action → climax.

The non-negotiable: this within-run growth must come from **the player's construction** (placement is the engine, per Phase 5), not from RNG handing out power. The progression *feeling* is **"my board is becoming a monster because *I* am engineering it."**

---

## PART 3 — Long-term progression (across runs)

**What keeps players returning:** primarily the mastery loop (Phase 3: predict → spark → compare → refine → bigger), plus exploring the *breadth* of the option space (new tools, situations, archetypes), plus chasing escalating challenge, plus the simple novelty that **every run's hand is a different puzzle.**

**What should unlock — horizontal, not vertical:**
- New runes / interactions added to the *offer pool* → more options and more puzzles (variety, not power).
- New *constraints and challenge tiers* → **harder, never easier** (ascension-style opt-in difficulty).
- New *board situations/configurations* → fresh problem types.
- Discovery tracking (a record of combos found) → a sense of "I've mapped more of the system."

**What should NEVER unlock:**
- Permanent power, stat boosts, or starting advantages that reduce difficulty.
- Anything that lets a player win *without engineering the cascade* (violates a Phase 1 "never add").
- Currency-bought strength, or any outcome influence not earned at the board.
- Grind gates that hide *core* strategic depth behind hours (the deep game must be reachable early; unlocks widen the pool, they don't ration the soul of the game).

**What must remain purely skill-based:** *the winning itself.* Outcome stays 100% attributable to the player. Progression changes **what is in the box** (variety and challenge), never **how hard you hit**.

> **The rule: horizontal unlocks (breadth) + opt-in harder challenge. Never vertical unlocks (strength). Even breadth should read as *sidegrades and new puzzles*, not upgrades.**

---

## PART 4 — Content vs. mastery

Ideal balance of where progression *comes from*:

- **Learning (mastery) — the dominant, renewable engine (~60%).** Skill has no cap; this is the long-tail engine and it costs no content production.
- **Experimentation — the bridge (~25%).** Trying archetypes, combos, and hands; self-renewing because the combinatorial space is vast.
- **Unlocking — a finite onboarding/breadth layer (~15%).** Front-loaded to seed the option space, then deliberately tapers.

**Why this balance:** unlocking is *finite* — if it's the primary driver, retention falls off a cliff the moment unlocks run out. Learning and experimentation are *infinite*. A healthy game uses unlocking to *seed* variety early, then hands the long tail to the renewable engines. This is doubly important for GLYPH: its learning/experimentation well is unusually deep (intractable optimization + a real strategy space), so it can lean on the renewable engines and **spend little on content** — an ideal fit for a solo developer who cannot out-produce a content treadmill.

---

## PART 5 — Retention analysis

- **1 hour:** the core payoff ("I'm a genius"), immediate discovery of interactions, and the "I almost had it" retry urge (Phase 5). *Mechanism:* the cascade feels great + instant comprehension + the first drip of new options.
- **10 hours:** the strategy space opening up — discovering the archetypes — plus breadth unlocks still arriving and visible early mastery (intending combos rather than stumbling). *Mechanism:* "I keep finding new ways to play, and I can see myself improving."
- **100 hours:** the mastery climb (Architect tier), internalizing the hand→archetype→constraint mappings, and harder challenge tiers. Unlocks have largely run out by now. *Mechanism:* "I'm measurably better and the ceiling is still above me." Retention here is carried by **mastery + experimentation + challenge**, not unlocks.
- **1000 hours:** intrinsic mastery, a living meta, self-set challenges, and skill-based comparison (daily seeds / leaderboards / records). *Mechanism:* "this is *my* game — I'm chasing the optimization frontier and competing on even terms." Only the renewable engines sustain this horizon. (Consistent with Phase 3: 1000h is realization-dependent on strategy breadth and balance.)

The shape of the retention curve: **unlocks carry the first ~10–20 hours; mastery and variety must carry everything after.** GLYPH is built to do exactly that.

---

## PART 6 — Failure analysis

How progression could accidentally damage the foundations:

- **Skill expression (Phase 3).** Permanent power unlocks → outcomes become attributable to *unlocks*, not *play* ("I won because of my upgrades"). Grind-to-win → time replaces skill. **This is the largest risk**, and it is fatal to the deterministic, skill-attributable core.
- **Strategy diversity (Phase 4).** A power-ranked unlock that is strictly better → it dominates → convergence (the Crystal-collapse failure, re-introduced via the unlock system). Locking archetypes behind grind → artificially thin early diversity. Unlocks must be **balanced sidegrades**, never upgrades.
- **Decision quality (Phase 5).** Progression that makes runs *easier* → over-powered boards → autopilot (the exact Phase-5 dead zone). An always-correct unlocked option → it removes a decision entirely. And playing *for unlocks* rather than *for the decisions* → extrinsic motivation crowding out the intrinsic engagement that the decision architecture depends on.

**The unifying risk: any *vertical* (power) progression damages all three foundations at once.** The defenses are structural: **keep progression horizontal (breadth), make difficulty opt-in-harder, balance every unlock as a sidegrade, and keep every outcome skill-attributable.**

---

## PART 7 — The reset question

**Why willingly restart, and why is the reset exciting rather than frustrating?**

A reset stings only when it costs you *power you earned*. **GLYPH's answer: there is no power to lose** — because progression lives in *you*, a reset costs nothing that matters and hands you everything that does:

- **The next run is a fresh, different puzzle** (variable hand) → curiosity pulls you in.
- **You carry forward the only progression that counts — your skill and knowledge** → you start the new run *better than you ended the last one*, with no reset to your actual capability.
- **The "I almost had it" + "I want to try something different" emotions** (Phase 5) are already aimed at the next run.
- **The start of a run is itself pleasurable** — the open canvas of maximum possibility — so a reset returns you to a *good* place, not a punishment.

> **The reframe: because power resets but skill doesn't, every restart isn't losing progress — it's *cashing in* the progress that lives in your head, on a brand-new puzzle.** Permadeath is exciting precisely when the meta-progression is *you*. (And note the corollary: the way to keep resets painless is to *never make power the progression* — if there is no earned power to lose, a reset can only ever feel like opportunity.)

---

## PART 8 — Final verdict

### 🟢 GREEN LIGHT — GLYPH can support meaningful progression without damaging Phases 1–5.

It can, **on one structural condition that this phase makes explicit**: progression must be **horizontal, not vertical**.
- **Primary engine = mastery** (the player progresses), with knowledge and options supporting it.
- **Unlocks = breadth and opt-in *harder* challenge**, balanced as sidegrades — never power, never "easier."
- **Outcomes stay 100% skill-attributable**, always.
- **Unlocking is a finite onboarding layer (~15%)**; the renewable engines (learning ~60%, experimentation ~25%) carry the long tail — which also makes GLYPH viable for a solo creator who cannot feed a content treadmill.

Held to those rules, progression *reinforces* the foundations instead of eroding them: it widens the option space the decision architecture acts on, deepens the strategy space, and feeds the mastery loop — while the deterministic skill core stays untouched. This is the proven model of the genre's most durable games. Green.

The only way this turns red is if power creep is allowed in — which is precisely the guardrail to enforce in every later phase.

### The single sentence — why players come back tomorrow

> **Because in GLYPH the power resets but you don't — so tomorrow's fresh, unfamiliar board is a new chance to prove you've become the sharper mind that yesterday's run made you.**

*(No monetization, pricing, ads, cosmetics, live service, or production was decided in this phase — by design.)*

# GLYPH — Teach Mastery Without Instruction

**Author:** Technical Director analysis (Executive Producer directive)  
**Status:** ANALYSIS ONLY — **no implementation authorized**  
**Trigger:** CEO playtest finding (Phase B, `vs-0.2.0-b4`)

**CEO sequence (verbatim intent):**

1. *"How should I have chained this together?"* — **excellent** (mastery appetite)
2. *"Am I playing this game right?"* — **problem** (communication failure)

**New production objective:** Teach mastery without instruction. Preserve calm and discovery.

**Forbidden:** Tutorials · arrows · dialogue · hint popups

---

## 1. Diagnosis

### What went right

The first thought is exactly what GLYPH should provoke. The player finished a performance and immediately wanted a **better authorship** — not a walkthrough. That is mastery hunger, not confusion about controls.

Constitution §5: *The board is a stage. The player is the director.*  
The CEO asked a **director's question** — *how should I have staged this?*

### What went wrong

The second thought collapses mastery hunger into **normative anxiety**. That question appears when:

| Player belief | Symptom |
|---|---|
| There is a **correct** way to play | "Am I playing right?" |
| Success criteria are **hidden** | "Am I playing right?" |
| The game **grades** before it **explains** | "Am I playing right?" |
| They were playing a **puzzle** not authoring a **performance** | "Am I playing right?" |

This is **not** a mechanics problem. Rules work. Cascade performs. Hope Pass parity holds.

This is a **communication problem**: **the game has not yet shown the player what excellence looks like — or what happened, in a form they can trust.**

### Constitutional framing

| Principle | Relevance |
|---|---|
| **§7** Every cascade tells a story. The board is evidence. | **Primary gap** — aftermath may not yet be legible enough to reconstruct causality |
| **§8** Trust is sacred — causality never obscured | Target/score without story reads as judgment, not explanation |
| **§5** Performance, not puzzle | Player may still be in "find the solution" mode |
| **§9** Curtain call before credits | Performance lands; **explanation may need to land after credits**, on the board |
| **§1** Never lie | Any teaching must show **true** topology — no fake "you almost had it" |

**Product > World.** All teaching mechanisms must live on the board and in factual aftermath — not lore, not modal copy.

---

## 2. Two different milestones (do not conflate)

The Executive Producer named two outcomes on different horizons. They require **different teaching systems**.

| Horizon | Player thought | What the game must provide |
|---|---|---|
| **After 1 run** | *"I know exactly why this happened."* | **Forensic aftermath** — board + credits state facts; player reconstructs causality without instruction |
| **After ~10 runs** | *"I know how to improve."* | **Anticipatory mastery** — placement phase quietly previews consequences; player authors better performances before Spark |

**Phase B optimized Minute 3 (hope during cascade).**  
**This gap lives primarily in Minutes 4–5 and between runs** — and in the **transition from performance back to authorship.**

Trying to solve both with one feature (e.g. a tutorial popup) would violate the directive and the Constitution.

**Production implication:** Ship **Run-1 clarity** before **Run-10 improvement**. Evidence each separately.

---

## 3. Why Phase B provoked the second question

Phase B delivered the **performance** (frontier, travel, lit/cold, curtain, credits). It did not yet deliver the **post-mortem**.

### What the player currently receives after Spark

| Signal | What it teaches | What it fails to teach |
|---|---|---|
| Lit runes | "These fired" | **Why** they fired in this order |
| Cold runes | "These didn't" | **Why** — wrong placement, wrong spark origin, or unreachable topology |
| Chain HUD | "This many activated" | How many **could have** with different authorship |
| Target / score | "You missed the bar" | **What** the bar represents in board terms |
| Hope text | Emotional beat | Nothing about topology |
| Letter labels (F/L/W/C) | Dev identity | Element **behavior** — reads like puzzle piece types |

### The specific anxiety path

```
Spark → strong performance → credits with target comparison
                ↓
"How should I have chained this?"  (good)
                ↓
Target says I failed / score is opaque / cold runes don't explain themselves
                ↓
"Am I playing this game right?"  (bad)
```

**Hypothesis:** The player understands that **something happened** but not **what they authored vs what the rules allowed**. They lack a **mental model of valid play**:

- Any placement is valid (performance, not puzzle)
- Excellence = longer connected chains, better spark origin, element synergies, multiplier timing
- Cold runes are not "wrong answers" — they are **evidence**

Until the board communicates that, target score feels like a hidden rubric.

---

## 4. Reference study — games that teach through interaction

Not to copy mechanics — to copy **communication patterns**.

| Game | How it teaches without instruction | GLYPH translation |
|---|---|---|
| **The Witness** | Environment is the only teacher; rules discovered by consequence; no popups | Board state after cascade must be **self-explanatory** to inspection |
| **Into the Breach** | Perfect information; aftermath shows exact causal chain of every tile | Step log already exists — **aftermath UI** should mirror it quietly on the board |
| **Mini Metro** | Lines and stations teach efficiency; you **see** the mistake in the map | **Placement-phase connectivity** — topology visible before Spark |
| **Dorfromantik** | Good placement **looks** harmonious; bad placement feels awkward before commit | Calm visual feedback when runes **connect vs isolate** during build |
| **Tetris** | Ghost piece + line-clear teach structure through repetition | Not ghost piece — but **connected cluster read** during placement |
| **Baba Is You** | Rule words physically pushable — rules ARE the level | Element **behavior visible in cascade** (steam, arc, 8-spread) — already partial |
| **Stephen's Sausage Roll** | Teaches by consequence only — harsh but honest | Cold runes as honest consequence, not punishment — must read as **information** |

### Pattern extracted

Games that avoid "Am I playing right?" share three traits:

1. **Legible causality** — after the action, you can trace why each outcome occurred  
2. **Visible topology during authorship** — you sense structure before committing  
3. **No hidden rubric on run 1** — first run teaches **what happened**; later runs teach **how to improve**

GLYPH has (1) in the sim, (2) barely, (3) not yet.

---

## 5. How the board becomes the teacher

**Principle:** The board teaches by **state**, not **speech**. Every proposal must pass: *If we removed all text, would a smart player still learn?*

### 5A. Forensic aftermath (Run 1 — highest priority)

**Goal:** After credits, player can point at the board and explain the cascade without facilitator help.

| Mechanism | Description | PRODUCT / WORLD | Calm? |
|---|---|---|---|
| **Cold taxonomy** | Distinguish cold runes by *why* they stayed cold — not with labels, with **visual state** | PRODUCT | Yes, if subtle |
| ↳ *Isolated cold* | Rune never adjacent to propagation graph from spark origin | | |
| ↳ *Adjacent cold* | Touches lit rune but wrong element path / wrong order / already spent | | |
| ↳ *Reachable cold* | One gap — frontier died one cell away (hope for next run, Constitution "cold runes are hope") | | |
| **Spark origin mark** | Origin cell retains distinct "Action" afterglow — teaches that **where you called Action matters** | PRODUCT | Yes |
| **Final frontier hold** | Brief pause on last travel line toward nearest cold neighbor before curtain (already hope-adjacent) | PRODUCT | Yes — must not fake near-miss |
| **Path memory** | Lit runes retain faint activation order or connection thread (not score) — shows **story sequence** | PRODUCT | Risk: busy — test |

**§7 compliance:** Player reconstructs cascade from board alone.

**Not allowed:** Arrows pointing to "correct" placement · ghost of optimal solution · "you should have" copy

### 5B. Placement-phase topology (Run 10 — second priority)

**Goal:** Before Spark, player **feels** which runes will chain.

| Mechanism | Description | Notes |
|---|---|---|
| **Connection whisper** | When placed runes share adjacency (per element rules), subtle shared glow or thread between them | Teaches "touch matters" without text |
| **Isolation read** | Placed rune with no valid neighbor reads visually lonely (slightly cooler, not red error) | Teaches grouping — not punishment |
| **Spark-origin preview** | On hover/tap of placed rune pre-Spark, faint pulse along **would-be** first hop (optional, high risk) | Could feel like hint — test carefully |
| **Element shape language** | Shape encodes spread pattern (cross, 8, line, arc) — when art arrives | Phase D synergy |

**Mini Metro rule:** The map teaches before you press "start."

### 5C. Credits as factual epilogue — not grade card

**Goal:** Credits confirm what the board already showed — never introduce new judgment.

| Current (Phase B) | Problem | Alternative direction |
|---|---|---|
| `3-rune chain · Target 240 · Short by 50` | Reads as report card | Factual story: `3 reached · 2 cold · 1 adjacent miss` |
| Target on first run | Implies hidden "right answer" | **Defer target visibility** until run 2? (hypothesis — needs evidence) |
| Score as hero number | Competes with causality | Score remains — but **after** board story lands |

**Whisper UI:** Numbers confirm feeling — they don't replace explanation.

---

## 6. How the aftermath explains the story

The cascade **performance** is the premiere. The **aftermath** is the program notes — silent, factual, on the same stage.

### Recommended narrative arc (no new copy blocks)

```
Performance (Phase B — done)
    → Curtain hold (done)
    → Board frozen: lit / cold / origin (partial — needs taxonomy)
    → Credits: factual counts, not advice (gap)
    → Player returns to build OR replays (Minute 5)
```

### Story beats the aftermath must answer (without words)

| Question player asks | Board must answer |
|---|---|
| Where did it start? | Spark origin visually distinct |
| Where did it go? | Lit set + travel memory |
| Where did it stop? | Final frontier vs nearest cold |
| What never had a chance? | Isolated cold cluster |
| What almost joined? | Adjacent cold / one-gap cold |
| Did I pick the wrong Action point? | Compare origin to largest cold cluster (implicit) |

If the board answers these, *"How should I have chained this?"* becomes a **solvable inspection puzzle** — not a request for tutorial.

*"Am I playing this game right?"* fades because there is no single "right" — only **what happened** and **what was possible**.

---

## 7. How players discover what excellence looks like

**Excellence in GLYPH is not one correct board.** It is:

- More runes reached in one performance  
- Higher multiplier utilization (chain length + Crystal + late-chain weight)  
- Element conversions (steam) authored intentionally  
- Better spark origin choice  

### Showing excellence without showing an answer key

| Approach | Verdict |
|---|---|
| Tutorial video of perfect chain | **Reject** |
| Arrow to optimal placement | **Reject** |
| Hint popup "try connecting these" | **Reject** |
| **Target score as aspirational benchmark** | **Keep** — but only after player understands causality (run 2+) |
| **Personal best on session** | **Keep** — self-referential excellence |
| **Board after great run feels visually complete** — most cells lit, cold only at edges | **Aspire to** — excellence **looks** full |
| **Player's own previous run ghost** (later) | **Post-slice** — compare to self, not expert |

**Key insight:** Excellence is **discovered** when the player sees a nearly-full lit board once — and the aftermath explains **why this one lit and the last one didn't**. They carry the image forward.

**The first "excellence model" is their own best performance** — not a designer-authored exemplar.

---

## 8. Rejected approaches (explicit)

| Approach | Why rejected |
|---|---|
| Tutorial modal / skippable screens | Violates EP directive + VS-FEELING Minute 0 |
| Arrows, pointers, highlight "correct" cells | Teaches dependency, breaks discovery, feels condescending |
| Dialogue / narrator | Breaks calm; Meridian is DNA not fantasy |
| Hint popups | Casino-adjacent; breaks trust (§1) |
| Element rule encyclopedia | Grind before play; kills Minute 0–1 |
| Forced first-run script ("place here") | Fake agency; violates §6 |
| Showing optimal solution after fail | Puzzle frame; not performance frame |
| More hope text explaining rules | World noise during Product beat |

---

## 9. Candidate interventions (prioritized — not approved)

When implementation is authorized, **one variable per cycle**. Suggested order based on CEO finding:

| Priority | Intervention | Serves | Milestone | Risk |
|---|---|---|---|---|
| **P0** | Cold rune taxonomy (visual states) | Run 1 causality | §7 | Medium — must stay subtle |
| **P0** | Spark origin persistent mark | Run 1 + Run 10 | §5, §7 | Low |
| **P1** | Credits as factual story (counts not advice) | Run 1 | §8, §9 | Low |
| **P1** | Final frontier pause toward nearest honest cold | Run 1 hope + causality | §4, §1 | High — must not fake |
| **P2** | Placement connectivity whisper | Run 10 improvement | §5 | Medium — clutter |
| **P2** | Defer target on first spark of session | Run 1 anxiety | §8 | Medium — needs playtest |
| **P3** | Element shape language | Run 10 | Legibility | Depends on art pass |
| **P3** | Activation order memory on lit cells | Run 1 story | §7 | Medium — visual noise |

**Reframes Phase C:** From "minimal onboarding copy" to **"board teaches causality"** — still no tutorial, still ≤3 lines copy, but **aftermath communication** becomes the sprint focus.

---

## 10. Evidence plan (before building)

When authorized to implement **one** P0 intervention, test with Playtest Protocol v1 adapted:

### Pre-build questions (CEO / facilitators)

| # | Question | Pass signal |
|---|---|---|
| 1 | After first cascade, can you explain **why** each cold rune stayed cold? | Points at board, not facilitator |
| 2 | Did you ask *"Am I playing this game right?"* | **No** — or only before second run |
| 3 | Did you ask *"How should I have chained this?"* | **Yes** — and could partially answer self |
| 4 | Did target/score feel like judgment or information? | Information |
| 5 | Voluntary second spark? | Yes, without nudge |

### Facilitator listen-for (verbatim quotes)

**Good:** *"I started here — it couldn't reach that one."* · *"These weren't touching."* · *"If I'd sparked from the other end…"*

**Bad:** *"Am I playing right?"* · *"What am I supposed to do?"* · *"Is there a correct solution?"*

---

## 11. Open questions for Executive Producer (before implementation)

1. **Phase C scope reframe:** Should Phase C be renamed/rescoped to **"Aftermath Communication"** rather than **"Onboarding Micro-Flow"**?
2. **Target on run 1:** Should the target score be **hidden on first cascade** and revealed on run 2 — to separate *understanding* from *grading*?
3. **P0 selection:** Approve **one** starting intervention — recommend **cold taxonomy + spark origin mark** as a pair only if EP allows two visual variables tied to one hypothesis.
4. **Hope Pass regression:** Aftermath changes apply to production build only — confirm Hope Pass stays frozen as performance baseline.
5. **CEO replay:** After analysis approval, should Greg replay `vs-0.2.0-b4` with **aftermath inspection script** (look at cold runes for 30 seconds before Clear Board) to validate diagnosis before we build?

---

## 12. Summary

| Finding | Response |
|---|---|
| *"How should I have chained this?"* | **Protect and answer** — through board evidence, not instruction |
| *"Am I playing this game right?"* | **Eliminate** — by showing causality before rubric, performance before puzzle |
| Run 1 milestone | Forensic aftermath — *"I know exactly why this happened"* |
| Run 10 milestone | Placement topology + element mastery — *"I know how to improve"* |
| Phase B status | Performance delivered; **explanation not yet delivered** |
| Next authorized work | **None** until EP approves analysis + selects one P0 intervention |

**The board is already constitutionally mandated to be evidence (§7). We have not yet made it a teacher.**

---

*Analysis complete. No code changed. Awaiting Executive Producer review.*

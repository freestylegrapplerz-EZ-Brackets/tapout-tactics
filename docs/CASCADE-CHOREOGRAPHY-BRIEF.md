# GLYPH — Cascade Choreography Brief

*Creative Director redirect, post–Phase 8 approval. The mechanic is proven. The product is now the **performance** of the cascade — not the mechanics, not the numbers, not particle fidelity.*

> **The one question (answered before any code):**
>
> **"If the score were hidden entirely, would the cascade still be exciting to watch?"**
>
> **Honest answer for the current Spark Test: No — not yet.**
>
> With score hidden, what remains is colored squares lighting in sequence with rising-pitch blips. That is *rhythm*, not *drama*. It may be mildly satisfying — like watching dominoes fall in slow motion — but it does not produce tension, disbelief, or the lean-forward *"will it reach one more?"* feeling. **The current payoff still depends on numbers going up.** The cascade performs like a **calculator with sound**, not a **show the player directed.**
>
> That is not a verdict against GLYPH. It is the precise diagnosis of what the next experiment must fix — and it can be fixed **without** changing a single rule.

---

## The reframe: from system to choreography

We have been optimizing a **resolution algorithm**.
We must now direct a **performance**.

Think less engineer. Think:
- **Film director** — beats, pacing, where the camera (player's eye) goes.
- **Composer** — tension and release, crescendo, silence before the downbeat.
- **Fireworks choreographer** — one fuse, escalating bursts, the finale saved for last.
- **Magician** — the setup is deliberate; the reveal exceeds expectation.

The player already proved they enjoy **building the board** (the setup).
Our job is to **reward them** (the reveal).

**Design toward:** the player leaning toward the screen, waiting to see if the wave reaches **one more rune**.

**Not toward:** prettier explosions, more particles, more mechanics, or a higher final integer.

> **Make people grin before we make them optimize.**

---

## The emotional journey (the scorecard for every cascade)

Every Spark must walk the player through this arc:

```
Curiosity      →  "What will happen if I light this?"
Confidence     →  "Yes — it's spreading, I planned this."
Tension        →  "Is it going to reach that one…?"
Release        →  The wave connects. Breath out.
Escalation     →  "It's STILL going — faster — bigger —"
Disbelief      →  "How is it still going?!"
Pride          →  "I did that."
```

**Current Spark Test coverage:**

| Beat | Present? | Why / why not |
|---|---|---|
| Curiosity | ✅ | Pre-spark planning works. |
| Confidence | ⚠️ | First 1–2 activations pop; weak sense of *travel*. |
| Tension | ❌ | No visible "frontier" racing toward an unfired rune. Nothing at stake *visually*. |
| Release | ❌ | Connections don't feel like *events* — just the next pop. |
| Escalation | ⚠️ | Slight timing compression; not felt in the body. |
| Disbelief | ❌ | Requires escalation + scale change + "still going" — missing. |
| Pride | ⚠️ | Arrives via score/target text, not via the performance itself. |

**The missing middle — Tension → Release → Escalation → Disbelief — is the entire show.** That is choreography, not mechanics.

---

## What "exciting with score hidden" actually requires

If numbers are removed, the cascade must carry drama through **only**:

1. **The frontier** — a visible wave moving toward runes that haven't fired yet. The eye tracks: *will it reach the crystal?*
2. **Rhythm that accelerates** — not faster math; faster *heartbeat*. The body feels urgency.
3. **Scale that grows** — later beats are *louder, brighter, bigger* than earlier beats. Same event, increasing weight.
4. **Silence and breath** — micro-pauses before critical connections (the magician's beat). Not dead air — *loaded* air.
5. **A finale that is clearly the finale** — the last rune to fire must feel like the last firework, not another pop.
6. **Aftermath** — a held moment where the board *glows* with what fired, and cold runes sit visible as "what you almost got."

None of these require score. All of them require **timing, rhythm, and staging**.

**The test for the next prototype:**
> Mute the game. Hide every number. Show only the board and the wave.
> Does the player lean forward? Do they grin? Do they gasp when the wave barely reaches the last rune?
> If yes → the performance works.
> If no → we are still building a calculator.

---

## Choreography principles (not engineering principles)

### 1. The frontier is the protagonist
The player's eye should follow **the edge of the chain** — the last activated rune and the runes it might reach next. Not the score box. Not the stat panel. **The wave.**

Staging rule: always make the *next possible target* visually obvious before it fires.

### 2. Every beat has a before and after
A rune doesn't "turn on." A rune is **approached → touched → ignites → sends energy onward.**

Three micro-beats per activation:
- **Approach** (energy traveling toward it — the tension beat)
- **Impact** (ignition — the release beat)
- **Send** (energy leaving — the setup for the next tension beat)

The Spark Test collapses all three into one instant pop. **That is why it feels flat.**

### 3. Rhythm is the primary language
Numbers are subtitles. **Rhythm is the movie.**

- Early chain: slower, lighter — *confidence building*
- Mid chain: accelerating — *escalation*
- Late chain: rapid, heavy — *disbelief*
- Final connection: **hold → HIT** — *pride*

The composer doesn't make every note equally loud. Neither should we.

### 4. Anticipation is manufactured
Fireworks choreographers don't just explode things — they **delay** the finale on purpose.

Tools (timing only, no new rules):
- 50–100ms **charge** on Spark press (the fuse is lit)
- Brief **slowdown** before a critical long jump (Lightning arc to a distant rune — will it connect?)
- **Hit-stop** (2–4 frames) on the largest activations
- **Accelerating** gaps between beats as chain grows

The player should feel time **stretch** before a close call and **compress** during a runaway chain.

### 5. Release is an event, not a transition
When the wave connects to a rune the player was watching — especially a Crystal or a cluster — that moment needs a **distinct beat**: slightly longer hold, slightly bigger impact, a clear "YES, it connected."

This is the fireworks equivalent of the shell bursting exactly where you were looking.

### 6. The finale is not the last pop — it is the last *meaning*
The final activation should answer: *"Did my plan work completely?"*

If cold runes remain, the finale is bittersweet — still a performance, still pride, but with visible "next time." If the board fully detonates, the finale is triumph.

Either way, the last beat must **land** — then **silence** — then aftermath glow. Do not snap instantly back to build mode. Let pride breathe for 400–600ms.

---

## What the next prototype optimizes (explicitly)

**YES:**
- Escalation (pace + weight)
- Timing (charge, hold, hit-stop, accelerate)
- Rhythm (composer's arc)
- Anticipation (frontier racing toward unfired runes)
- Release (connection moments)

**NO (for this iteration):**
- Graphical fidelity / particle systems
- More mechanics / runes / rules
- Progression / meta / content
- Score as the hero (score may exist but must be **demoted** — corner, small, or hidden by default for testing)

**The product feeling we are building toward:**
> The player leaning toward the monitor, waiting to see if the chain reaches one more rune.

That feeling does not come from a bigger number. It comes from **staging the wave.**

---

## Proposed performance structure (one cascade, as a director's shot list)

*Same rules. Same board. Same four runes. Different staging.*

| Time | Beat | Staging | Emotion |
|---|---|---|---|
| T−0 | Spark press | Fuse charge: board holds, 80ms silence, subtle pulse at origin | Curiosity → Tension |
| T+0 | First activation | Impact (medium). Energy **visibly sends** to neighbors. | Confidence |
| T+1…n | Mid-chain | Each beat: **approach line → impact → send**. Pace accelerates. Weight grows. | Tension → Release (repeat) |
| T+critical | Long jump / cluster | **Micro-slowdown** before arc. Will it reach? **Hold.** Connect. **Release.** | Tension peak |
| T+runaway | Late chain | Rapid beats, heaviest weight, rumble building | Escalation → Disbelief |
| T+final | Last rune | **Hit-stop → biggest impact → board hold → aftermath glow** | Pride |
| T+after | (Optional) score | Small, late, secondary — a footnote to the show | — |

Score, if shown at all, appears **after** the performance ends — like credits after the movie.

---

## Success criteria for Spark Test v2 (the performance experiment)

**Primary (mandatory):**
- With **score hidden**, tester leans forward during cascade.
- Tester has unprompted vocal reaction (*"oh!"*, *"yes!"*, *"OHHHH"*) — not describing numbers.
- Tester can answer *"what were you watching?"* with *"whether it would reach [that rune]"* — not *"the score going up."*

**Secondary:**
- Tester grins before optimizing.
- Tester replays to see a **performance**, not only to beat a number.

**Failure:**
- Tester says "I'd need to see the score to know if it was good."
- Cascade still feels like "cells lighting up."

---

## Relationship to Phase 8

Phase 8 identified the right **engineering levers** (travel lines, acceleration, climax). This brief reframes them as **choreographic tools**:

| Phase 8 lever | Choreography role |
|---|---|
| Travel lines | The **frontier** — the protagonist |
| Accelerating cadence | **Escalation** rhythm |
| Pre-spark charge | **Anticipation** — fuse lit |
| Hit-stop on final | **Release** + **Pride** landing |
| Layered audio | **Composer's crescendo** — not blips |
| Afterglow / cold cells | **Aftermath** — the story's denouement |

Same changes. Different intention. **We are not adding juice. We are directing a scene.**

---

## Final word

The mechanic earned the right to become a performance.

The player already loves building the board. **Reward them with a show they directed** — one where the question is *"will it reach one more?"* not *"what number will I get?"*

**Next step when approved:** Spark Test v2 — same rules, score hidden by default, choreography-only changes (approach → impact → send, frontier staging, rhythmic arc, finale hold). Still an experiment. Still disprove-or-prove.

*Make people grin before we make them optimize.*

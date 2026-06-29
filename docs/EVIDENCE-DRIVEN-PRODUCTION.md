# GLYPH — Evidence-Driven Production

**Status:** Active. This is studio culture for all production cycles from this point forward.

**Frozen artifacts (do not modify without Executive Producer approval):**
- Hope Pass build (`experiments/glyph-spark-test/hope-pass.html`)
- Playtest Protocol v1 (`docs/PLAYTEST-PROTOCOL-v1.md`)
- Studio Constitution (`docs/STUDIO-CONSTITUTION.md`)

**Current bottleneck:** Evidence — not development.

---

## The shift

We no longer ask:

> *"What would make the game better?"*

We ask:

> *"What did players actually do?"*

**Optimization is forbidden unless supported by player behavior.**

Better ideas do not win. **Better decisions based on better evidence** win.

---

## The production cycle

Every future production cycle follows this sequence — **in order, no skips:**

```
1. OBSERVE     — Run Playtest Protocol v1. Watch. Record. Do not interpret yet.
2. MEASURE     — Log CEO metrics. Aggregate sessions. Count, don't narrate.
3. EXPLAIN     — What happened? What did players do? (Not what we wish they did.)
4. HYPOTHESIZE — One sentence: "If we change X, we expect Y because Z (evidence)."
5. CHANGE ONE  — Single variable. One build delta. Frozen baseline preserved for comparison.
6. REPEAT      — Back to Observe with the new build + same protocol.
```

### Rules

| Rule | Meaning |
|---|---|
| **One change at a time** | Never optimize five variables simultaneously. |
| **Explainability** | Never lose the ability to say *why* a change worked or failed. |
| **Evidence before code** | No production work without a hypothesis tied to observed behavior. |
| **Protocol consistency** | Same playtest protocol until evidence says it must change (Amendment process). |
| **Constitution first** | Every change must name which principle it strengthens + what evidence justifies it now. |

---

## What counts as evidence

**Strong evidence (actionable):**
- Verbatim quotes across multiple testers
- Repeated behavior (e.g. 4/5 testers voluntary replay ≥2)
- Objective CEO metrics trending same direction
- Post-session answers clustering on frontier/hope vs score-only

**Weak evidence (not sufficient alone):**
- One tester's opinion
- Facilitator intuition
- "Industry best practice"
- Internal team preference
- This document's predictions

**Minimum bar for a production decision:** Executive Producer sets N per milestone. Protocol v1 recommends **≥5 independent sessions** before changing Hope Pass.

---

## Hypothesis template (required before any build change)

```
HYPOTHESIS ID: GLYPH-H-____

Evidence (observe + measure):
- Session IDs: 
- Pattern observed:
- Metrics:

Explain:
- What players actually did:

Hypothesis:
- If we change [ONE THING], we expect [OBSERVABLE BEHAVIOR] because [EVIDENCE].

Constitutional principle strengthened:
- §___ 

What we will NOT change this cycle:
- 

Success criteria (measurable):
- 

Failure criteria (measurable):
- 
```

If the hypothesis names more than **one** change — **reject it.** Split into separate cycles.

---

## Current milestone status

| Item | Status |
|---|---|
| **Milestone 1: Hope Pass** | SHIPPED — FROZEN |
| **Playtest Protocol v1** | SHIPPED — FROZEN |
| **Next action** | Collect evidence (≥N sessions) |
| **Next build change** | BLOCKED until hypothesis approved from evidence |

---

## Questions we are allowed to ask

- What did the player watch during the cascade?
- When did they say "come on" — if ever?
- How many times did they replay without being asked?
- Did payoff exceed planning in their words?
- What made them stop?

## Questions we are forbidden to ask (until evidence says otherwise)

- What would make this more fun?
- What feature should we add?
- What would Balatro do?
- Can we polish X while we're in there?

---

## Amendment linkage

This document operationalizes:
- **Constitution §13** — Prototype before doctrine (evidence forces change, not convenience)
- **Production gate** — Which principle? What player evidence?

Evidence-driven production does not override the Constitution. It governs **how and when** we are permitted to change the build.

---

*Observe. Measure. Explain. Hypothesize. Change one thing. Repeat.*

*Production continues.*

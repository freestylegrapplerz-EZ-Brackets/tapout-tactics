# GLYPH Level Bible

**Status:** Living document — Chapter 1+  
**Owners:** Puzzle design (Greg) · Implementation (Cursor)

Every board asks a different spatial question. The player answers by creating the perfect chain reaction. These rules govern how mysteries are designed, validated, and implemented.

---

## The quality bar

A board is judged by one question:

> **Does this board ask an interesting question?**

Every puzzle must have:
- One memorable spatial idea
- One elegant solution (or several that teach the same thing)
- One **"aha"** moment

Weak puzzles are **replaced**, not optimized.

---

## Rule 1 — The Understanding Rule

Every mystery must answer:

> **"What understanding are we testing?"**

Not:

> **"What exact move sequence are we testing?"**

If multiple solutions demonstrate the **same understanding**, they should be accepted. The game must never reject a player who has clearly learned the intended concept.

**Implementation guidance for Cursor:**
- Win conditions should encode the *spatial lesson*, not incidental constraints (e.g. spark origin) unless spark origin *is* the lesson.
- When validating a level, ask: *Would a player who got the idea still fail?* If yes, loosen the constraint or redesign.

**Example — Mystery 4 (The Current):**  
Lesson = *Water connects the chain.* Sparking either Fire with W at (2,2) passes. Spark origin is not the lesson.

---

## Rule 2 — The "Almost" Rule

Every mystery should contain:

> **One obvious wrong answer… that almost works.**

That creates the **"AHA."**

Without that, players either:
- **Solve it immediately** — no tension, no discovery.
- **Get stuck** — no near-miss to learn from, only confusion.

The almost-answer should *look* like success long enough to provoke reflection: *"Wait — I connected everything… so why didn't it feel right?"* or *"I was one cell off."*

**Design checklist:**
- [ ] Is there a placement or spark that lights most of the board / hits the chain count / *feels* close?
- [ ] Does the failure teach something specific (not random punishment)?
- [ ] Does the correct answer feel earned after seeing the almost-answer fail?

**Implementation guidance for Cursor:**
- Document the intended "almost" in each level spec under **What should FAIL** and **What almost works**.
- Do not remove the almost-answer during implementation unless it teaches the *wrong* lesson.
- If an almost-answer demonstrates the correct understanding, apply the Understanding Rule and accept it.

**Example — Mystery 4 (The Current):**  
Almost = Water in the wrong cell (corner, off the bridge) — chain breaks or stays short. Player feels how close placement is.  
*(Formerly: sparking the "wrong" Fire also looked like a full win — that tension is valid only if spark origin were the lesson; it wasn't, so we accept both sparks.)*

**Example — Mystery 2 (Firestarter):**  
Almost = diagonal Fire path — connects locally, never reaches both preset Fires. Player learns Fire doesn't travel diagonally by *almost* getting there.

---

## Rule 3 — One lesson only

Each mystery teaches **exactly one** permanent understanding. No compound lessons, no mechanic dumps.

If validation finds an alternate solution that teaches a *different* idea, the board needs redesign.

---

## Spec template (designer → Cursor)

Designers send levels in this shape. Cursor implements only — does not invent puzzles.

```
LEVEL / NAME / QUESTION / INVITE / OBJECTIVE_LABEL
BOARD (preset, blocked, anchor)
HAND
WIN CONDITION (type, value, special conditions)
VICTORY / DEFEAT / TIP lines
REFERENCE (intended placement, expected chain)
WHAT SHOULD FAIL
WHAT ALMOST WORKS (Almost Rule)
DESIGN PURPOSE (misconception removed → permanent understanding)
```

---

## Cursor validation checklist

Before merge, confirm:

- [ ] Intended solution works
- [ ] Understanding Rule — same lesson, multiple valid paths accepted where appropriate
- [ ] Almost Rule — documented almost-answer exists and behaves as designed
- [ ] One lesson only — no alternate solution teaches the wrong idea
- [ ] Engine supports the win condition (report limitations; do not silently fake it)

---

## Level 1

**The Gap** is **LOCKED** — do not change without designer approval.

---

## Changelog

| Date | Rule | Source |
|------|------|--------|
| 2026-07-02 | Understanding Rule | Executive review — Mystery 4 redesign |
| 2026-07-02 | Almost Rule | Executive review — Level Bible |

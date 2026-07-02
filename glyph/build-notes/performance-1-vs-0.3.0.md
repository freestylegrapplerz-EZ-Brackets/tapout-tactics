# Performance 1 Build Notes — `vs-0.3.0-performance-1`

**Milestone:** Performance 1 — First Five Performances (playtest)  
**Status:** Complete · **awaiting playtest**  
**Next:** Observe → Explain → Hypothesize Performance 2 · **Do not build P2 yet**

---

## Playable build

**Version:** `vs-0.3.0-performance-1`

**Play:**  
https://raw.githack.com/freestylegrapplerz-EZ-Brackets/tapout-tactics/cursor/next-game-strategy-6013/glyph/index.html

**Facilitator start line (only):**  
*"Place runes on the board, then tap one to spark. Try whatever you want — I'll ask questions when you're done."*

---

## What changed (Performance 1 only)

| Change | Detail |
|---|---|
| **Curated opening hand** | Fixed 8 runes: `F,F,W,F,F,W,F,F` — Fire to pair, Water as distinct orphan candidate |
| **Empty board** | Player authors full layout |
| **Performance id** | `performance-1` logged to console on load + spark (not shown in UI) |
| **New Hand** | Reloads same Performance 1 hand — not random |

## Question this performance poses (internal)

*"Will the lonely one fire?"*

## Purpose of playtest

**Not** merely to verify connection is learnable.

**To reveal how players naturally learn GLYPH** — including whether they disconnect runes on purpose, what they inspect after credits, and what they try on second Spark.

---

## What did NOT change

- Performances 2–5 — **not built** (hypotheses only)
- Onboarding copy — unchanged (≤3 lines invitation)
- Target score — visible, formula unchanged
- Cascade performance — unchanged
- Rules / sim — unchanged
- Hope Pass — frozen

---

## Known issues

1. **Lit vs cold may still be subtle** — CEO prior feedback; observe whether P1 playtesters see difference without facilitator
2. **Cold taxonomy outlines** may be unreadable — log `coldKinds` in console for facilitator; player sees visuals only
3. **Hand has 8 runes** — more than minimum 3 for pair+orphan; intentional room for experimentation

---

## Evidence to collect (Protocol v1 adapted)

| Observe | Record |
|---|---|
| First placement pattern | Connected cluster? Orphan? Disconnected intentionally? |
| First Spark origin | Which rune |
| After credits — where do eyes go? | Board? Score? Target? |
| Verbatim quotes | Especially *"lonely"*, *"touch"*, *"cold"*, *"right"* |
| Second Spark voluntary? | Y/N · same or different layout |
| Facilitator had to explain? | Y/N · what |

**Console (facilitator):** `[glyph:performance]` and `[glyph:spark]` include `performanceId`, `coldCount`, `coldKinds`.

---

## CEO / facilitator review questions

### Natural learning (primary)

1. **Did you intentionally place a rune away from the others?** If yes — why?
2. **After the first Spark, what did you look at first** — the bright runes, the dim runes, the score, or something else?
3. **In your own words, what happened to the runes that stayed dim?**
4. **Did you Spark again without being asked?** What did you try differently?

### Hypothesis test (connection)

5. **Did you discover that runes need to touch** — without being told?
6. **Did you ask *"Am I playing this game right?"*** — or a different question?

### Performance 2 authorization

7. **What question did you actually ask** during this session — not what we designed, what *you* asked?
8. **Based on this session alone, what should Performance 2 make you curious about?** (Facilitator records — do not suggest answers.)

### Authorization

9. **Performance 1 playtest: sufficient evidence to author P2?** Pass / need more sessions / revise P1 only.

---

## After your response

We **Explain → Hypothesize → authorize Performance 2 design from evidence** — not from `PERFORMANCE-HYPOTHESES.md` until evidence aligns.

Performances 2–5 remain hypotheses: `docs/PERFORMANCE-HYPOTHESES.md`

---

*Build one. Observe. Learn. Then continue.*

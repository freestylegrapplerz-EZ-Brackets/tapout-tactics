# P0 Build Notes — Board as Mirror (`vs-0.2.1-p0`)

**Milestone:** P0 — Aftermath causality (single hypothesis)  
**Status:** Complete · **awaiting CEO playtest**  
**Hypothesis:** If the player can immediately understand why every rune did or did not activate, *"Am I playing correctly?"* becomes *"How can I improve?"*

---

## Playable build

**Version:** `vs-0.2.1-p0`

**Play:**  
https://raw.githack.com/freestylegrapplerz-EZ-Brackets/tapout-tactics/cursor/next-game-strategy-6013/glyph/index.html

**Compare prior (Phase B):** `vs-0.2.0-b4` — same branch, prior commit

**How to test:**
1. Place 4–6 runes with mixed connections (include one gap and one isolated cluster if you can)
2. Spark from one rune
3. Watch cascade complete
4. **After credits appear, study the board for 30 seconds before Clear Board**
5. Note: spark origin ring + three cold visual states

---

## What changed (P0 only)

| Change | Implementation |
|---|---|
| **Spark origin persistence** | Cell where Action was called keeps a distinct warm double-ring glow through curtain and credits |
| **Cold rune taxonomy** | Three factual cold states after performance (no labels, no text) |

### Cold taxonomy (visual only — board mirror)

| Visual | Meaning (factual geometry) |
|---|---|
| **Dashed outline, medium fade** | Cold rune **touching** a lit rune (8-neighbor) |
| **Dotted outline, lighter fade** | Cold rune **one empty cell away** from lit on a straight line |
| **Heaviest fade, no outline** | Cold rune **isolated** — not touching lit, not one gap away |

Taxonomy appears at **curtain + credits** only — not during cascade (would lie about runes still pending).

---

## What did NOT change

- Target score — visible, unchanged
- Credits copy — unchanged
- Onboarding copy — unchanged
- Cascade performance / timing / audio — unchanged
- Rules / sim — unchanged
- Hope Pass — frozen

---

## Known issues

1. **Visual legend not in-game** — intentional (no text). First playtest may need 30s board inspection to learn the three cold states.
2. **Adjacent cold includes diagonal touch** — factual 8-neighbor geometry, not element propagation rules.
3. **One-gap is geometric** — one empty on straight line; does not show *why* rules blocked propagation.
4. **Spark origin + lit overlap** — origin is also lit; ring may be subtle on small screens.

---

## CEO review questions

*Play `vs-0.2.1-p0`. After credits, inspect the board before replay.*

### Hypothesis test

1. **Can you explain why each cold rune stayed cold** — using only the board — without guessing?
2. **Did the spark origin mark change your understanding** of where the performance started?
3. **Did you ask *"Am I playing this game right?"*** — or did it shift toward *"How can I improve?"*?
4. **Which cold visual state was most immediately readable** — dashed adjacent, dotted one-gap, or faded isolated?
5. **Which cold visual state was confusing or unreadable?**

### Comparison

6. **Compared to `vs-0.2.0-b4`, did the aftermath feel more like a mirror of what happened?**
7. **Did causality clarity increase hope for a second attempt** — voluntary replay?

### Authorization

8. **P0 hypothesis: pass, revise, or fail?** If revise — **one visual change only**.

---

## Technical

- `src/aftermath.js` — pure analysis from step log + grid
- 22 unit tests passing
- No sim changes

---

*Production stopped. Awaiting CEO playtest.*

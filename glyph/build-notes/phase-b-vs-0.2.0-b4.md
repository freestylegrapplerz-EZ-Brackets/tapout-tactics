# Phase B Build Notes — `vs-0.2.0-b4`

**Milestone:** Phase B — The Hope Performance  
**Status:** Complete · **awaiting CEO playtest**  
**Next milestone:** Phase C — **not authorized**

---

## Playable build

**Version:** `vs-0.2.0-b4` (shown bottom of screen)

**Play in browser:**  
https://raw.githack.com/freestylegrapplerz-EZ-Brackets/tapout-tactics/cursor/next-game-strategy-6013/glyph/index.html

**Local:**
```bash
cd glyph && npx --yes serve . -p 5173
# open http://localhost:5173
```

**How to test (2 minutes minimum):**
1. Place 3–5 runes so they connect (tap hand rune → tap empty cell)
2. Tap a placed rune to spark
3. Watch the cascade — do not look for score during performance
4. After credits appear, try **Clear Board** or **New Hand** and spark again

**Compare side-by-side (optional):**  
Hope Pass (frozen baseline):  
https://raw.githack.com/freestylegrapplerz-EZ-Brackets/tapout-tactics/cursor/next-game-strategy-6013/experiments/glyph-spark-test/hope-pass.html

---

## What changed

| Area | Phase B delivery |
|---|---|
| **Cascade playback** | Performance animates from pre-computed step log — sim runs first, renderer follows |
| **Frontier travel** | White SVG line moves source → target; destination cell pulses `approaching` |
| **Chain HUD** | Large chain count during performance; hope text updates ("Come on…", "One more…") |
| **Lit / cold board** | Activated runes glow; unactivated runes fade — board as evidence after wave |
| **Curtain call** | Brief hold → "YES!" on 3+ chains → credits slide in |
| **Score hidden** | Credits panel hidden until performance ends (§9) |
| **Audio** | Minimal tones on spark, travel arrival, curtain — mute toggle included |

## What did NOT change

- Hope Pass HTML — **frozen**
- Cascade rules — 4 elements, 5×5, deterministic BFS, steam combo, multiplier math
- No onboarding polish (Phase C)
- No calm art identity pass (Phase D)
- No meta, save, shop, full run

## Architecture

```
simulation.js  →  step log  →  cascadeRenderer.js  →  screen
                     ↑
              (never guessed by renderer)
```

---

## Known issues

1. **Hit flash may be subtle** — board re-renders after each step; lit/cold persists but pop animation can be lost mid-cascade.
2. **Lightning jumps look like adjacent hops** — arc hops get longer timing but same line visual; gap-jumps may not read clearly.
3. **Single-rune sparks feel quiet** — curtain says "Connected." not "YES!"; low emotional peak for solo runes.
4. **No placement polish** — Phase A interaction only; no soft settle animation or tap-target tuning.
5. **Dev subtitle visible** — "Phase B — watch the frontier" header copy still present (not shipping copy).
6. **VS-1 not run** — no external Protocol v1 sessions on this build yet.

---

## CEO review questions

*Play the build first. Answer while fresh.*

### Frontier (Minute 3 — VS-FEELING)

1. **During the cascade, where did your eyes go** — the travel line, the chain number, the hope text, or something else?
2. **Compared to Hope Pass side-by-side, does the frontier feel more alive, the same, or worse?** What specifically differs?
3. **Did you silently or verbally root for the chain to continue** ("come on", "one more", etc.)?

### Hope Contract

4. **Did pride land before the numbers** — did you feel the result before credits appeared?
5. **With score hidden mid-cascade, did you still care about the outcome?**

### First session (Minutes 0–2 — partial; Phase C not built)

6. **Could you place runes and spark without confusion** in under 60 seconds?
7. **What frustrated you** — if anything — during placement or first spark?

### Replay (Minute 5 signal)

8. **After credits, did you voluntarily spark again** without prompting? Why or why not?

### Authorization

9. **Phase B: pass, revise, or fail?** If revise — **one thing only** to change before Phase C.

---

## After your response

We review Phase B together. Phase C authorized only on your sign-off.

**Do not implement Phase C until this review is complete.**

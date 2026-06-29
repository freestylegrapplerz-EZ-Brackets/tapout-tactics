# GLYPH — Vertical Slice

Production build for Milestone 2. Proves the **Hope Contract** in a shippable-quality first session.

**Frozen reference:** `experiments/glyph-spark-test/hope-pass.html` (regression baseline — do not modify)

**Feeling target:** [docs/VS-FEELING.md](../docs/VS-FEELING.md)

---

## A1 — Tech stack (locked 2026-06-29)

| Decision | Choice | Rationale |
|---|---|---|
| Platform | **Web first** | Fastest iteration; Hope Pass already web-native |
| Language | **ES modules (vanilla JS)** | No build step for slice iteration; sim testable in Node |
| Rendering | **DOM + SVG** (Hope Pass evolution) | Travel lines, lit/cold states proven |
| Audio | **Web Audio API** | Hope Pass pattern; unlock on first tap |
| Tests | **Node built-in test runner** | Simulation kernel unit-tested without browser |
| Mobile | **Responsive layout required** | Mobile-first CSS; safe-area in slice |

**Not in slice:** Unity/Godot rewrite, React framework, save/cloud, meta systems.

---

## Run

```bash
cd glyph
npm test          # simulation kernel tests
```

Open `index.html` in a browser (local server required for ES modules):

```bash
npx --yes serve . -p 5173
```

**Live demo (branch):**  
https://raw.githack.com/freestylegrapplerz-EZ-Brackets/tapout-tactics/cursor/next-game-strategy-6013/glyph/index.html

**Smoke test (optional, requires Playwright):**

```bash
npx --yes serve . -p 5173 &
npm install --no-save playwright@1.49.0 && node scripts/smoke-phase-b.mjs
```

---

## Architecture

```
src/config.js          — frozen constants (Hope Pass parity)
src/simulation.js      — deterministic cascade + step log (A2)
src/performance.js     — timing + hope lines (Hope Pass parity)
src/cascadeRenderer.js — frontier playback from step log (B1–B4)
src/game.js            — board state + presentation glue
src/audio.js           — minimal Web Audio tones
index.html             — shell
```

**Phase B complete (`vs-0.2.0-b4`):** frontier travel, lit/cold, chain HUD, curtain call, credits after performance.

**Event log pattern:** `simulateCascade()` emits steps; `playCascade()` follows — never guesses.

---

## Production rule

Before every feature:

1. Which constitutional principle?
2. PRODUCT or WORLD?
3. If removed, which minute in VS-FEELING gets worse?
4. Player evidence?

If weak — postpone.

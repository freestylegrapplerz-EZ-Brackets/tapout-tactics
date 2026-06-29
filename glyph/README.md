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

Open `index.html` in a browser (local server recommended for ES modules):

```bash
npx --yes serve . -p 5173
```

---

## Architecture

```
src/config.js       — frozen constants (Hope Pass parity)
src/simulation.js   — deterministic cascade + step log (A2)
index.html          — presentation shell (grows through Phases B–E)
```

**Event log pattern:** `simulateCascade()` emits steps; renderer and audio subscribe to the same log. Sim never depends on presentation.

---

## Production rule

Before every feature:

1. Which constitutional principle?
2. PRODUCT or WORLD?
3. If removed, which minute in VS-FEELING gets worse?
4. Player evidence?

If weak — postpone.

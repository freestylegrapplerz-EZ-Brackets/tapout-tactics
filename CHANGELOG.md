# Changelog

## 2026-06-20

### Sandbox Design Documents Added

- Added `.gitignore` with rules for OS files, editor folders, logs, build output, and Python cache.
- Added `ARCHITECTURE.md` — full modular architecture plan covering all planned game systems, proposed module boundaries, and the first three safe refactor steps.
- Added `MODULE_MAP.md` — maps every current file to its primary and secondary game systems, documents coupling levels, and lists safe split targets for future refactors.
- Added `TECHNIQUE_DESIGN_REPORT.md` — audits the 103-technique database: technique index, missing techniques, position flow map, archetype support analysis, replayability risks, combo system recommendations, rarity guidance, and the next 150-technique roadmap.
- Added `PLAYABLE_STATE_CHECKLIST.md` — position readiness matrix that defines which positions can safely generate offers, which need fallback behavior, and which should stay hidden until they have more card depth.
- Added `POSITION_BUCKETS.md` — canonical position buckets listing all cards per position, preferred/defensive/offensive/transition/fallback card sets, and offer system rules.
- Added `INTEGRATION_CHECKLIST.md` — ordered integration plan for wiring `playableStates.js` into the gameplay loop with testable steps and rollback checkpoints.

---

## 2026-06-14

### Refactor Checkpoint

- Split the original single-script prototype into cleaner JavaScript files:
  - `cards.js`
  - `skills.js`
  - `poses.js`
  - `gameState.js`
  - `matchRules.js`
  - `ui.js`
  - `game.js`
- Updated `index.html` to load the new script files in the required order.
- Kept gameplay behavior unchanged during the refactor.
- Verified in the browser that the app loads, renders cards, renders the mat, shows the skill tree, shows pose buttons, and reports no console errors.

### Current Prototype Features

- Turn-based BJJ card choices.
- Stamina, points, position, and control systems.
- Opponent intent hints.
- Belt XP and stripe progression.
- Skill tree unlocks.
- Pose library preview.
- Sprite-based BJJ position visuals.
- Match result and coach review screen.

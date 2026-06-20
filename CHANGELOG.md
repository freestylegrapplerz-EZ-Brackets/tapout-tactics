# Changelog

## 2026-06-20

### GitHub Readiness

- Replaced the missing PNG logo dependency with a CSS-rendered Tapout Tactics brand mark.
- Switched pose previews and match position art to generated SVG grapplers by default, avoiding broken missing sprite images when the repo is opened from GitHub.
- Kept optional pose sprite support in `poses.js` behind `USE_EXTERNAL_POSE_SPRITES` for future asset imports.
- Updated README instructions for running the root-level app, publishing with GitHub Pages, and importing `Tapout_Tactics_SANDBOX_FOR_AI_EXPERIMENTS`.
- Expanded the manual smoke checklist to cover missing-art regressions.

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

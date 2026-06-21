# Tapout Tactics Architecture Plan

This document describes the intended modular architecture for the Tapout Tactics browser prototype. It is a planning document only; it does not change gameplay.

## Current Shape

Tapout Tactics currently runs as a plain HTML/CSS/JavaScript browser game. Files are loaded directly through script tags in `index.html`, and most systems communicate through shared globals such as `state`, `cards`, `skillTreesByStyle`, `poseSpriteMap`, and render functions.

That structure is workable for a prototype, but it makes future AI-assisted development harder because one change often requires reading several large files at once.

## Architecture Goals

1. Keep each gameplay system in its own module.
2. Make data files mostly passive and easy to inspect.
3. Make rule files responsible for behavior.
4. Make UI files responsible for rendering only.
5. Reduce cross-file globals over time.
6. Let future Codex tasks touch one or two files instead of the whole app.

## Proposed Modules

### Card System

Responsibility:
- Defines playable cards.
- Stores card ids, names, costs, types, requirements, text, and effects.
- Eventually should expose card metadata without directly owning all match logic.

Current files:
- `cards.js`
- Part of `ui.js` for card display
- Part of `techniques.js` for technique metadata

Should expose:
- `cards`
- `getCardById(cardId)`
- `getCardsByPosition(position)`
- `getCardsByArchetype(archetypeId)`

Should depend on:
- Technique Database for metadata
- Balance Data for cost/risk/reward values
- Match Engine only through structured effect definitions

Unnecessary coupling:
- Cards currently contain inline `play` functions that call match rule helpers directly.
- This makes card data and match resolution harder to separate.

### Technique Database

Responsibility:
- Stores the large Brazilian Jiu-Jitsu technique encyclopedia.
- Supports future cards, skill unlocks, pose art, animation planning, and collection browsing.

Current files:
- `techniques.js`
- `TECHNIQUE_DESIGN_REPORT.md`

Should expose:
- Technique records by id
- Card-to-technique lookup
- Position flow metadata
- Category, rarity, risk, reward, counters, follow-ups

Should depend on:
- No gameplay systems

Unnecessary coupling:
- Technique metadata is currently used by the UI, but the boundary between playable cards and reference techniques should stay explicit.

### Archetype System

Responsibility:
- Defines athlete identities: Wrestler, Guard Player, Pressure Passer, Back Hunter, Leg Locker.
- Stores archetype bonuses, starter cards, preferred card types, and future AI personality traits.

Current files:
- `gameState.js`
- `skills.js`
- `cards.js`

Should expose:
- `playerStyles`
- Starter card pools
- Archetype bonuses
- Archetype-specific unlock rules

Should depend on:
- Card System
- Skill Tree System
- Balance Data

Unnecessary coupling:
- Archetype data currently lives inside `gameState.js`, which also handles match setup, saves, XP, and hand drawing.

### Skill Tree System

Responsibility:
- Defines skill trees by archetype.
- Handles multi-rank upgrades, prerequisites, unlocks, bonuses, and reset/respec logic.

Current files:
- `skills.js`
- `gameState.js`
- `ui.js`

Should expose:
- `skillTreesByStyle`
- `activeSkillTree(styleId)`
- `skillRank(skillId, styleId)`
- `canUnlockSkill(skillId, styleId)`
- `unlockSkill(skillId)`
- `resetSkillTree(styleId)`

Should depend on:
- Archetype System
- Card System
- Save System

Unnecessary coupling:
- Skill rendering is mixed with unlock logic.
- Skill progress is stored in the same file as match state and deck drawing.

### Match Engine

Responsibility:
- Owns turn flow, stamina spending, card legality, card resolution, position changes, control, scoring, submissions, and match results.

Current files:
- `matchRules.js`
- Card `play` functions in `cards.js`
- Some review and submission bonus logic in `gameState.js`

Should expose:
- `canPlay(card, actor, matchState)`
- `resolveTurn(playerCard, opponentCard, matchState)`
- `setPosition(position)`
- `applyCardEffect(effect)`
- `finishMatch(result)`

Should depend on:
- Card System
- Status Effects
- Balance Data

Unnecessary coupling:
- Match resolution currently depends on card objects containing executable functions.
- Opponent AI lives in the same file as core rules.

### AI Opponent Logic

Responsibility:
- Chooses opponent cards.
- Applies opponent style preferences.
- Later can support named opponents, difficulty, habits, and scouting.

Current files:
- `matchRules.js`
- `gameState.js`

Should expose:
- `chooseOpponentCard(matchState, opponentProfile)`
- `getOpponentProfile(styleId)`

Should depend on:
- Card System
- Archetype System
- Match Engine legality checks

Unnecessary coupling:
- AI choice is currently embedded in `matchRules.js`, so changing AI risks touching match resolution.

### Status Effects

Responsibility:
- Handles temporary effects like control bonuses, stamina drain, chain bonuses, mind-game effects, and future conditions.

Current files:
- `gameState.js`
- `matchRules.js`

Should expose:
- `applyStatusEffect(effect)`
- `removeStatusEffect(effectId)`
- `getActiveEffects(actor)`
- `consumeTurnEffects()`

Should depend on:
- Match Engine
- Balance Data

Unnecessary coupling:
- Mind-game effects, style bonuses, chain bonuses, and submission bonuses are spread across multiple files.

### Deck Building

Responsibility:
- Determines unlocked cards, playable deck pools, draw rules, duplicate prevention, and future deck editing.

Current files:
- `gameState.js`
- `cards.js`
- `skills.js`

Should expose:
- `getUnlockedCards(styleId)`
- `buildDeck(styleId)`
- `drawHand(matchState)`
- `isCardUnlocked(cardId, styleId)`

Should depend on:
- Card System
- Skill Tree System
- Archetype System
- Save System

Unnecessary coupling:
- Hand drawing currently lives in `gameState.js` and directly checks style, skills, costs, and card legality.

### UI / Menus

Responsibility:
- Renders screens and listens for user input.
- Should not decide match rules.

Current files:
- `index.html`
- `ui.js`
- `styles.css`

Should expose:
- `render()`
- `renderMatch()`
- `renderHand()`
- `renderSkillTree()`
- `renderLibrary()`
- `renderVenues()`
- `renderReview()`

Should depend on:
- Public state selectors
- Card System display metadata
- Art Assets

Unnecessary coupling:
- `ui.js` renders all screens, builds card strategy notes, handles card display metadata, and calls gameplay actions.
- `styles.css` contains all visual systems in one large file.

### Save System

Responsibility:
- Handles localStorage keys, loading, saving, migration, reset, and future cloud save/export.

Current files:
- `gameState.js`

Should expose:
- `loadSave()`
- `saveProgress()`
- `saveSettings()`
- `resetProgress()`
- `migrateSaveVersion()`

Should depend on:
- No UI
- No match resolution

Unnecessary coupling:
- Save code currently sits beside match state, XP, skill trees, venues, and hand drawing.

### Art Assets

Responsibility:
- Maps positions and techniques to visuals.
- Stores sprite mappings, pose library entries, animation sequences, mat art, venue art, and logo assets.

Current files:
- `poses.js`
- `venues.js`
- `assets/`
- Some CSS in `styles.css`

Should expose:
- `poseLibraryList`
- `positionPoseMap`
- `poseSpriteMap`
- `techniquePoseSequence`
- `venueData`

Should depend on:
- Technique Database ids
- Position names

Unnecessary coupling:
- `poses.js` currently mixes pose data, sprite mapping, animation sequences, SVG fallback drawing, and scene rendering.

### Audio

Responsibility:
- Future sound effects, crowd noise, card sounds, impact sounds, venue ambience, and music.

Current files:
- None

Should expose:
- `playSound(soundId)`
- `playMusic(trackId)`
- `setAudioEnabled(enabled)`

Should depend on:
- Event System

Unnecessary coupling:
- None yet.

### Event System

Responsibility:
- Allows systems to communicate without direct imports or global calls.
- Example events: `card:played`, `turn:resolved`, `position:changed`, `match:ended`, `xp:awarded`.

Current files:
- None

Should expose:
- `emit(eventName, payload)`
- `on(eventName, handler)`
- `off(eventName, handler)`

Should depend on:
- No gameplay systems

Unnecessary coupling:
- The app currently relies on direct function calls and shared globals.

### Localization

Responsibility:
- Stores text strings separately from logic for future copy editing and translation.

Current files:
- Text is spread across `cards.js`, `ui.js`, `gameState.js`, `matchRules.js`, `skills.js`

Should expose:
- `t(key, params)`
- String dictionaries

Should depend on:
- No gameplay systems

Unnecessary coupling:
- Card text, UI labels, log messages, skill descriptions, and review copy are embedded directly in logic files.

### Balance Data

Responsibility:
- Stores tunable numbers such as stamina costs, success chances, XP values, submission modifiers, control limits, and archetype bonuses.

Current files:
- `cards.js`
- `gameState.js`
- `matchRules.js`
- `skills.js`

Should expose:
- `BALANCE`
- Cost tables
- Success chance tables
- XP tables
- Archetype modifier tables

Should depend on:
- No UI

Unnecessary coupling:
- Balance values are currently scattered across card definitions, match rules, skill trees, and state helpers.

## First Three Safe Refactor Steps

### Step 1: Extract Documentation And Contracts

Create or maintain documentation for:
- Card schema
- Technique schema
- Position names
- Event names
- Module ownership

Risk:
- Very low.

Why first:
- Future AI tasks become faster because the expected boundaries are explicit.

### Step 2: Split `ui.js` By Screen Without Changing Behavior

Move rendering functions into focused UI files:
- `ui.match.js`
- `ui.cards.js`
- `ui.skills.js`
- `ui.library.js`
- `ui.venues.js`
- `ui.review.js`
- `ui.navigation.js`

Keep the same global functions at first so the browser still works.

Risk:
- Low to medium.

Why second:
- UI changes are frequent, and `ui.js` is already large enough that future tasks waste time reading unrelated screens.

### Step 3: Split `gameState.js` Into Save, Progression, Deck, And Match State

Suggested pieces:
- `saveSystem.js`
- `progressionSystem.js`
- `deckSystem.js`
- `archetypeSystem.js`
- `matchState.js`

Keep existing globals temporarily, then move toward cleaner selectors.

Risk:
- Medium.

Why third:
- `gameState.js` is the main place where unrelated systems are tangled together.

## Refactor Rule

Every migration step should keep the game playable at `http://127.0.0.1:4173/`, keep existing cards intact, and avoid changing card balance unless the task specifically asks for balance work.

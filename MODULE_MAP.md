# Tapout Tactics Module Map

This file maps the current project files to the intended game systems. It is meant to help future AI-assisted changes stay focused.

## Current Files

| File | Current Role | Primary Module | Secondary Modules | Coupling Level |
|---|---|---|---|---|
| `.gitignore` | Git ignore rules | Project Config | None | Low |
| `index.html` | DOM structure and script load order | UI / Menus | Startup, Screen Layout | Medium |
| `styles.css` | All app styling | UI / Menus | Art Assets, Card Presentation, Venues | High |
| `game.js` | Startup and initialization | Startup | UI / Menus, Match State | Low |
| `cards.js` | Playable cards and inline effects | Card System | Match Engine, Balance Data, Technique Database | High |
| `techniques.js` | Technique database and metadata | Technique Database | Card System, Collection System | Medium |
| `TECHNIQUE_DESIGN_REPORT.md` | Design report for technique database | Technique Database | Design Documentation | Low |
| `skills.js` | Skill tree data by archetype | Skill Tree System | Archetype System, Card Unlocks, Balance Data | Medium |
| `gameState.js` | State, progression, saves, deck draw, style data, review helpers | Match State | Save System, Deck Building, Archetype System, Skill Tree System, Review System | Very High |
| `matchRules.js` | Turn resolution, AI selection, card legality, position changes, scoring | Match Engine | AI Opponent Logic, Status Effects, Balance Data | High |
| `ui.js` | Rendering for every screen, card UI metadata, event listeners | UI / Menus | Card System, Skill Tree System, Art Assets, Match Review | Very High |
| `poses.js` | Pose library, sprite mapping, animation sequences, SVG rendering | Art Assets | Animation System, Technique Database, UI / Menus | Very High |
| `venues.js` | Venue data | Venue System | Art Assets, UI / Menus | Low |
| `README.md` | Project overview and run instructions | Documentation | None | Low |
| `CHANGELOG.md` | Change history | Documentation | None | Low |
| `TESTING.md` | Manual testing checklist | Testing | Documentation | Low |
| `assets/tapout-tactics-logo.png` | Game logo | Art Assets | Branding | Low |
| `assets/sprites/*.png` | Pose and technique artwork | Art Assets | Pose Library, Card Art, Animation Planning | Low |

## Current Script Load Order

The browser loads files in this order:

1. `venues.js`
2. `techniques.js`
3. `skills.js`
4. `cards.js`
5. `poses.js`
6. `gameState.js`
7. `matchRules.js`
8. `ui.js`
9. `game.js`

This matters because most files currently depend on globals created by earlier scripts.

## Module Ownership

### Startup

Files:
- `game.js`
- `index.html`

Owns:
- Initial app boot
- Event binding kickoff
- First render
- New match startup

Should not own:
- Card logic
- Skill logic
- AI logic
- Save logic

### Card System

Files:
- `cards.js`
- Card display metadata currently in `ui.js`
- Card technique metadata currently in `techniques.js`

Owns:
- Playable card list
- Card ids
- Card names
- Card costs
- Card types
- Position requirements
- Card text
- Future structured card effects

Exposes:
- Playable card data
- Card lookup by id
- Card filters by position/type/archetype

Current coupling to reduce:
- Inline `play` functions call match helper functions directly.
- Card cost and balance values live directly in the card list.

### Technique Database

Files:
- `techniques.js`
- `TECHNIQUE_DESIGN_REPORT.md`

Owns:
- Technique encyclopedia
- Positional variations
- Risk/reward suggestions
- Follow-ups
- Counters
- Archetype synergies
- Future card-generation source data

Exposes:
- Technique lookup
- Technique metadata by card
- Category and rarity suggestions

Current coupling to reduce:
- UI reads technique metadata directly. This is acceptable for now, but should eventually go through a Card Metadata adapter.

### Archetype System

Files:
- Archetype data currently in `gameState.js`
- Skill tree data in `skills.js`
- Starter cards and key cards referenced in `gameState.js`

Owns:
- Wrestler identity
- Guard Player identity
- Pressure Passer identity
- Back Hunter identity
- Leg Locker identity
- Archetype starter cards
- Archetype favorite card types
- Archetype bonuses

Exposes:
- Archetype list
- Current archetype
- Archetype card preferences
- Archetype modifiers

Current coupling to reduce:
- Archetypes are mixed into state, progression, skill trees, and deck drawing.

### Skill Tree System

Files:
- `skills.js`
- Skill progress helpers in `gameState.js`
- Skill tree rendering in `ui.js`

Owns:
- Skill nodes
- Branches
- Ranks
- Prerequisites
- Unlocks
- Respec/reset rules

Exposes:
- Active skill tree
- Skill rank
- Available skill points
- Unlock eligibility
- Skill unlock action

Current coupling to reduce:
- Skill tree data and skill progress are separate, but rendering and unlocking still rely on shared globals.

### Match Engine

Files:
- `matchRules.js`
- Card effects in `cards.js`
- Some bonus/review helpers in `gameState.js`

Owns:
- Turn flow
- `canPlay`
- `resolveCards`
- Stamina spending
- Position movement
- Control changes
- Points
- Submission attempts
- Match result

Exposes:
- `playTurn`
- `canPlay`
- `resolveTurn`
- Position helpers
- Scoring helpers

Current coupling to reduce:
- AI logic is embedded in match rules.
- Card effects are executable functions instead of structured data.
- Submission bonus logic is split between `matchRules.js` and `gameState.js`.

### AI Opponent Logic

Files:
- `matchRules.js`
- Opponent profiles in `gameState.js`

Owns:
- Opponent card choice
- Opponent style preferences
- Future difficulty settings
- Future named opponent behavior

Exposes:
- `chooseOpponentCard`
- AI profile data

Current coupling to reduce:
- AI currently calls card legality and stamina checks inside the match rules file.

### Status Effects And Mind Games

Files:
- `gameState.js`
- `matchRules.js`

Owns:
- Mind-game setup effects
- Temporary bonuses
- Stamina drain modifiers
- Submission bonuses
- Control modifiers
- Future status conditions

Exposes:
- Active effects
- Apply effect
- Remove effect
- Consume once-per-turn effects

Current coupling to reduce:
- Mind-game setup, chain bonuses, skill bonuses, and style bonuses are handled in different places.

### Deck Building And Card Unlocks

Files:
- `gameState.js`
- `skills.js`
- `cards.js`

Owns:
- Unlocked cards
- Starter cards
- Skill-unlocked cards
- Hand drawing
- Duplicate prevention
- Future deck editing

Exposes:
- `getUnlockedCards`
- `drawHand`
- `cardUnlocked`
- `buildDeckForStyle`

Current coupling to reduce:
- Hand drawing depends on card legality, selected style, unlocked skills, stamina, and Breathe fallback all in one function.

### UI / Menus

Files:
- `index.html`
- `ui.js`
- `styles.css`

Owns:
- Screen tabs
- Match screen
- Card hand rendering
- Skill tree rendering
- Pose library rendering
- Venue rendering
- Result overlay
- Match review display

Exposes:
- Render methods
- Event listeners

Current coupling to reduce:
- `ui.js` contains rendering for every screen plus card strategy metadata and card art HTML.
- UI directly calls gameplay functions such as `playTurn`, `newMatch`, `unlockSkill`, and `setVenue`.

### Save System

Files:
- `gameState.js`

Owns:
- LocalStorage keys
- Load progression
- Save progression
- Save selected venue
- Save match reviews
- Future save migrations

Exposes:
- Load/save functions

Current coupling to reduce:
- Save code is mixed with match setup, progression, review generation, and deck drawing.

### Art Assets And Pose Library

Files:
- `poses.js`
- `venues.js`
- `assets/`
- Art-related CSS in `styles.css`

Owns:
- Pose names
- Position-to-pose mappings
- Sprite paths
- Technique animation sequences
- SVG fallback scenes
- Venue data
- Logo and sprite assets

Exposes:
- `poseLibraryList`
- `positionPoseMap`
- `poseSpriteMap`
- `techniquePoseSequence`
- `matSceneSvg`
- `techniqueAnimationSvg`

Current coupling to reduce:
- Pose data, sprite mappings, SVG rendering, and animation sequencing are all in one large file.

### Balance Data

Files:
- `cards.js`
- `skills.js`
- `matchRules.js`
- `gameState.js`

Owns:
- Stamina costs
- Control caps
- Submission chance values
- XP rewards
- Archetype modifiers
- Skill bonuses
- Chain bonuses

Exposes:
- Tunable constants
- Balance tables

Current coupling to reduce:
- Balance values are scattered, making tuning risky.

### Event System

Files:
- None yet

Should own:
- Event bus for decoupling systems.

Future events:
- `card:played`
- `turn:started`
- `turn:resolved`
- `position:changed`
- `submission:attempted`
- `match:ended`
- `xp:awarded`
- `skill:unlocked`

### Audio

Files:
- None yet

Should own:
- Sound effects
- Venue ambience
- Card sounds
- Match impact sounds

Future dependency:
- Event System

### Localization

Files:
- None yet

Current text sources:
- `cards.js`
- `skills.js`
- `ui.js`
- `gameState.js`
- `matchRules.js`

Should own:
- UI labels
- Card text
- Log messages
- Review copy
- Future translation dictionaries

## Most Coupled Files

### 1. `gameState.js`

Why it is too coupled:
- Owns match creation.
- Owns player progression.
- Owns XP and belts.
- Owns style progress.
- Owns localStorage.
- Owns hand drawing.
- Owns skill unlock helpers.
- Owns review generation.
- Owns selected venue and mind-game state.

Safe split targets:
- Save System
- Progression System
- Deck System
- Archetype System
- Match Review System

### 2. `ui.js`

Why it is too coupled:
- Renders every screen.
- Contains card clarity metadata.
- Contains card art helpers.
- Renders skill trees.
- Renders pose library.
- Renders venues.
- Renders reviews.
- Calls gameplay actions directly.

Safe split targets:
- Match UI
- Card UI
- Skill UI
- Venue UI
- Pose Library UI
- Review UI
- Navigation UI

### 3. `poses.js`

Why it is too coupled:
- Stores pose list.
- Stores sprite map.
- Stores position map.
- Stores animation sequence map.
- Builds SVG scenes.
- Handles fallback visuals.

Safe split targets:
- Pose Data
- Sprite Map
- Animation Sequence Data
- SVG Fallback Renderer

### 4. `matchRules.js`

Why it is too coupled:
- Resolves turns.
- Chooses opponent cards.
- Applies counters.
- Handles submissions.
- Handles scoring.
- Tracks positions.
- Applies stamina.
- Contains chain bonuses.

Safe split targets:
- Match Engine
- Opponent AI
- Position System
- Submission System
- Chain/Combo System
- Scoring System

### 5. `cards.js`

Why it is too coupled:
- Stores card data.
- Stores stamina costs.
- Stores position requirements.
- Stores text.
- Executes gameplay via inline `play` functions.

Safe split targets:
- Card Data
- Card Effects
- Balance Data

## First 3 Safe Refactor Steps

### Step 1: Split UI Rendering By Screen

Goal:
- Reduce the size and responsibility of `ui.js`.

Suggested files:
- `ui.match.js`
- `ui.cards.js`
- `ui.skills.js`
- `ui.library.js`
- `ui.venues.js`
- `ui.review.js`
- `ui.navigation.js`

Rules:
- Keep the existing global function names during the first split.
- Do not change visual design.
- Do not change gameplay.

Why this is safest:
- It mostly moves rendering code without changing game rules.

### Step 2: Extract Save And Progression From `gameState.js`

Goal:
- Move localStorage, XP, belts, style XP, and review persistence out of the main state file.

Suggested files:
- `saveSystem.js`
- `progressionSystem.js`

Rules:
- Keep the same localStorage keys.
- Keep existing save data compatible.
- Do not reset player progress.

Why this is second:
- It reduces risk in future skill tree and archetype work.

### Step 3: Extract Deck Drawing And Unlock Logic

Goal:
- Move hand drawing, unlocked cards, starter cards, and skill-unlocked cards into one Deck Building module.

Suggested file:
- `deckSystem.js`

Rules:
- Preserve current hand behavior first.
- Preserve Breathe fallback.
- Preserve archetype starter cards.
- Add tests or manual checks for key positions.

Why this is third:
- Card depth is becoming central to the game, and deck logic needs its own boundary before adding many more cards.

## Refactor Safety Checklist

Before each refactor:
- Check git status.
- Make a checkpoint commit if needed.
- Identify exactly which module is being changed.

After each refactor:
- Run JavaScript syntax checks.
- Load `http://127.0.0.1:4173/`.
- Confirm 3 cards render.
- Confirm a card can be played.
- Confirm position changes still work.
- Confirm skill tree still renders.
- Confirm pose library still renders.

## Recommended Future Rule For Codex Tasks

Future prompts should name the module being changed.

Examples:

- "Only work in the Card System. Do not touch UI or match rules."
- "Only work in the Skill Tree System and Save System."
- "Only split `ui.js` into UI modules. Do not change rendering output."
- "Only add data to the Technique Database. Do not add playable cards."

This keeps AI-assisted development faster and safer.

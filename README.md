# Tapout Tactics Prototype

Tapout Tactics is a browser prototype for a Brazilian Jiu-Jitsu strategy card game. The current build is a static HTML/CSS/JavaScript app with no build step.

## How To Run

From the `Tapout_Tactics_Prototype` folder, start a local web server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/
```

You can also open `index.html` directly, but the local server is preferred because it behaves more like a normal browser app.

## File Structure

- `index.html` - Page structure and script load order.
- `styles.css` - Layout, card styling, mat styling, result screen, belt display, and responsive rules.
- `skills.js` - Skill tree data and base unlocked card data.
- `cards.js` - Card definitions only: names, costs, requirements, text, types, and play handlers.
- `poses.js` - Pose library list, pose sprite mappings, pose rendering, and technique animation sequences.
- `gameState.js` - Match setup, player/opponent state, stamina constants, belt/XP data, unlock persistence, and match review state.
- `matchRules.js` - Core match rules: card resolution, combo rules, stamina spending, scoring, submissions, position changes, and win conditions.
- `ui.js` - DOM rendering only: hand, mat, belt panel, skill tree display, pose library buttons, result screen, and match review display.
- `game.js` - Startup/init only: wires buttons and starts a new match.
- `assets/` - Logo and pose sprite images used by the prototype.

## Script Load Order

The prototype uses plain browser scripts, so load order matters:

```html
<script src="skills.js"></script>
<script src="cards.js"></script>
<script src="poses.js"></script>
<script src="gameState.js"></script>
<script src="matchRules.js"></script>
<script src="ui.js"></script>
<script src="game.js"></script>
```

## Current Game Loop

1. A new match starts against a random opponent archetype.
2. The player chooses a grappling style and mental-game read.
3. The player receives three playable card options.
4. The opponent shows an intent hint before the player acts.
5. The player chooses one card each turn.
6. The opponent acts at the same time.
7. Rules resolve counters, stamina costs, scoring, position changes, control, submissions, and combo bonuses.
8. The mat animation shows the move or resulting position.
9. The player gains XP after the match.
10. The result screen shows a coach review with timeline, finish odds, chains, and notes.

## Known Limitations

- This is still a static prototype, not a mobile app build.
- There is no automated test suite yet.
- Browser local storage is used for XP, skills, and recent match reviews.
- Card balance is early and not final.
- Some pose art is placeholder-level and still needs review.
- Animations are pose-sequence based, not full character-rig animation.
- Match review is useful but still basic and can give mixed feedback on edge cases.
- The project has no module bundler, package manager, or deployment setup yet.

# Testing Checklist

Use this checklist after each refactor or feature change.

## Browser Smoke Test

- [ ] Browser loads with no console errors.
- [ ] 3 cards render in the player hand.
- [ ] Player can pick a card.
- [ ] Opponent acts after the player card is selected.
- [ ] Stamina updates after a turn.
- [ ] Position updates after a move.
- [ ] XP/belt display works.
- [ ] Skill tree renders.
- [ ] New Match button works.

## Suggested Manual Flow

1. Start the local server.
2. Open `http://127.0.0.1:4173/`.
3. Confirm the opening hand has three cards.
4. Pick one card.
5. Confirm the roll log updates.
6. Confirm stamina changes.
7. Confirm the mat animation or position changes.
8. Click `New Match`.
9. Confirm the match resets cleanly.

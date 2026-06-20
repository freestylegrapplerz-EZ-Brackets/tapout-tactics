# Tapout Tactics Integration Checklist

This document is the source of truth for integrating `playableStates.js` into the gameplay loop.

Use it alongside:

- `PLAYABLE_STATE_CHECKLIST.md`
- `IMPLEMENTATION_ROADMAP.md`
- `TAPOUT_TACTICS_MASTER_BIBLE.md`

The goal is to make the integration process ordered, testable, and reversible before we wire anything into the hand / offer system.

---

## Purpose

`playableStates.js` is the machine-readable gatekeeper for position readiness.

This checklist defines the safest order for wiring it into the prototype without breaking the current playable loop.

---

## Phase 1: Data Availability, Zero Gameplay Change

### Step 1
**File:** `index.html`

Add `playableStates.js` to the script load order.

**Expected behavior:**

- `playableStates` becomes available globally
- no gameplay changes yet
- no offer generation changes yet

**Required tests:**

- Browser still loads at `http://127.0.0.1:4173/`
- No console errors
- Confirm `window.playableStates` exists in DevTools

**Success criteria:**

- The new readiness data is loaded before any future gameplay logic needs it
- The current prototype still behaves exactly the same

---

### Step 2
**File:** `ui.shared.js`

Add small read helpers only.

Recommended helpers:

- `getPlayableState(positionId)`
- `isPositionHidden(positionId)`
- `isPositionOfferSafe(positionId)`
- `isFallbackOnly(positionId)`

These helpers should read from:

- `playableStates`
- `playableStateById`

**Expected behavior:**

- still no gameplay change
- just cleaner access to readiness data

**Required tests:**

- Syntax check
- Browser still loads
- No console errors

**Success criteria:**

- The app has a clean way to ask whether a position is ready, hidden, or fallback-only
- No match behavior has changed yet

---

## Rollback Checkpoint

### Step 3
**Action:** create a checkpoint before editing `matchRules.js`

This is the rollback point before the first gameplay-affecting change.

**Expected behavior:**

- no gameplay change
- easy recovery point if offer logic needs adjustment

**Required tests:**

- Git status is clean or intentionally staged
- Browser still loads
- Existing match flow still works

**Success criteria:**

- We can safely revert to this point if the offer gate needs tuning

---

## Phase 2: Offer System Integration

### Step 4
**File:** `matchRules.js`

Make the offer generator consult `playableStates.js` before scoring or fallback selection.

This is where the gatekeeper becomes active.

**Expected behavior:**

- hidden positions are excluded from normal offers
- fallback-only positions use safer selection rules
- `Breathe` only appears when no real option remains
- offer generation becomes position-aware instead of only card-pool-aware

**Required tests:**

- Syntax check
- Browser still loads
- Test offers from:
  - Standing
  - Front Headlock
  - Turtle
  - Back Control
  - Closed Guard
  - Mount
  - Ashi Garami
- Confirm hidden positions do not appear
- Confirm `Breathe` is not the first answer while real legal cards exist

**Success criteria:**

- Offers respect position readiness
- The prototype remains playable
- The hand system still produces meaningful choices

---

### Step 5
**File:** `ui.match.js`

Optionally show a small reason/debug line for why a card was offered, filtered, or suppressed.

**Expected behavior:**

- no gameplay logic change
- improved clarity for debugging and testing

**Required tests:**

- Browser loads
- Play one match
- Confirm layout still works
- Confirm offers still make sense visually

**Success criteria:**

- We can understand the gatekeeper’s decisions during playtesting

---

### Step 6
**File:** `gameState.js` only if needed

Only use this if we discover a real need for shared position normalization, fallback state, or helper routing.

**Expected behavior:**

- still no intentional gameplay change
- only support cleanup if required

**Required tests:**

- Syntax check
- Playtest key positions again

**Success criteria:**

- Any shared state support is kept minimal and does not destabilize the prototype

---

## File-by-File Edit Order

1. `index.html`
2. `ui.shared.js`
3. Rollback checkpoint
4. `matchRules.js`
5. `ui.match.js`
6. `gameState.js` only if required

---

## Required Tests After Each Step

### After Step 1
- Browser load check
- Console check
- Confirm `playableStates` exists globally

### After Step 2
- Syntax check
- Browser load check
- Console check

### After Step 3
- Verify rollback point is available
- Confirm current prototype still runs

### After Step 4
- Syntax check
- Browser load check
- Offer checks from the major positions
- Hidden position checks
- `Breathe` fallback check

### After Step 5
- Browser load check
- One full match playthrough
- UI layout check

### After Step 6
- Syntax check
- Key-position playtest

---

## Success Criteria by Phase

### Phase 1 Success

- `playableStates.js` is available to the app
- no gameplay has changed
- the prototype still loads cleanly

### Rollback Checkpoint Success

- we have a safe revert point before offer logic changes

### Phase 2 Success

- the hand / offer system respects position readiness
- hidden positions stay hidden
- fallback-only positions remain usable but conservative
- `Breathe` remains a true last resort
- the current playable prototype still works

---

## Notes

- Do not wire the offer generator until Phase 1 is verified.
- Keep changes small and reversible.
- If a step creates uncertainty, stop at the checkpoint and reassess before moving deeper.


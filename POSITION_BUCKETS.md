# POSITION_BUCKETS

This document defines the **canonical position buckets** for Tapout Tactics and maps the current card pool to each bucket so we can validate the offer system before adding more cards.

## Offer Priority Order

When generating a hand, the offer system should use this order:

1. **Position Validity**
2. **Archetype Fit**
3. **Loadout Fit**
4. **Resource Constraints**
5. **Fallback**

### Offer Rules

- **Position Validity** comes first. A card must make sense from the current grappling position.
- **Archetype Fit** decides which legal cards feel most like the selected fighter style.
- **Loadout Fit** narrows the pool to the player’s chosen build.
- **Resource Constraints** remove cards the player cannot realistically pay for right now.
- **Fallback** only happens if the hand would otherwise be too small or too empty.

### Fallback Principle

- `Breathe` should be a **true fallback**, not the default answer.
- If a position has fewer than 3 meaningful choices after the first four filters, the system can widen to safe fallback cards.
- If a position still cannot reach 3, `Breathe` may appear as the last resort.

---

## Canonical Position Buckets

> Note: this document uses **Guard** as the bottom-guard family bucket.  
> `Closed Guard` and `Open Guard` are currently treated as sub-labels of Guard, not separate live buckets.
>
> `Single Leg X` is currently a weak / feeder bucket in the live pool and should be treated carefully until more dedicated cards exist.

---

## Standing

### Cards that can appear
- Double Leg
- Guard Pull
- Sprawl
- Arm Drag
- Wrist Control
- Collar Tie
- Snapdown
- Slide By
- Single Leg
- Body Lock Trip
- Inside Trip
- Ankle Pick
- Duck Under
- Hip Toss
- Guillotine
- High Crotch
- Mat Return
- Fireman's Carry
- Suplex
- Breathe

### Preferred cards
- Wrist Control
- Collar Tie
- Snapdown
- Arm Drag
- Slide By
- Single Leg
- Double Leg
- High Crotch
- Body Lock Trip
- Ankle Pick
- Duck Under

### Defensive cards
- Sprawl
- Wrist Control
- Collar Tie
- Breathe

### Offensive cards
- Double Leg
- Single Leg
- High Crotch
- Body Lock Trip
- Inside Trip
- Ankle Pick
- Duck Under
- Hip Toss
- Mat Return
- Fireman's Carry
- Suplex
- Guillotine

### Transition cards
- Wrist Control
- Collar Tie
- Snapdown
- Slide By
- Arm Drag
- Guard Pull

### Fallback cards
- Wrist Control
- Collar Tie
- Sprawl
- Guard Pull
- Breathe

### Enough cards?
- **Yes**

---

## Front Headlock

### Cards that can appear
- Headlock Pressure
- Slide By
- Guillotine
- D'Arce Choke
- Anaconda Choke
- Go Behind
- Cow Catcher
- Clock Choke
- Crucifix Control
- Breathe

### Preferred cards
- Guillotine
- D'Arce Choke
- Anaconda Choke
- Go Behind
- Slide By
- Cow Catcher

### Defensive cards
- Headlock Pressure
- Crucifix Control
- Breathe

### Offensive cards
- Guillotine
- D'Arce Choke
- Anaconda Choke
- Clock Choke

### Transition cards
- Slide By
- Go Behind
- Cow Catcher
- Crucifix Control

### Fallback cards
- Headlock Pressure
- Slide By
- Go Behind
- Breathe

### Enough cards?
- **Yes**

---

## Turtle

### Cards that can appear
- Frame
- Hand Fight
- Protect Neck
- Breathe

### Preferred cards
- Frame
- Hand Fight
- Protect Neck

### Defensive cards
- Frame
- Hand Fight
- Protect Neck
- Breathe

### Offensive cards
- None currently in the live pool

### Transition cards
- None currently in the live pool

### Fallback cards
- Frame
- Hand Fight
- Protect Neck
- Breathe

### Enough cards?
- **No**

---

## Back Control

### Cards that can appear
- Rear Naked Choke
- Seatbelt Control
- Mat Return
- Suplex
- Body Triangle
- Bow and Arrow Choke
- Clock Choke
- Crucifix Control
- Breathe

### Preferred cards
- Seatbelt Control
- Body Triangle
- Rear Naked Choke
- Bow and Arrow Choke
- Clock Choke

### Defensive cards
- Seatbelt Control
- Body Triangle
- Breathe

### Offensive cards
- Rear Naked Choke
- Bow and Arrow Choke
- Clock Choke

### Transition cards
- Mat Return
- Suplex
- Crucifix Control

### Fallback cards
- Seatbelt Control
- Body Triangle
- Crucifix Control
- Breathe

### Enough cards?
- **Yes, but narrow**

---

## Guard

### Cards that can appear
- Flower Sweep
- Frame
- Armbar
- Triangle
- Arm Drag
- Wrist Control
- Hip Bump Sweep
- Scissor Sweep
- Butterfly Sweep
- Ashi Garami Entry
- Guillotine
- Kimura
- Tripod Sweep
- Pendulum Sweep
- Lumberjack Sweep
- Butterfly Hooks
- Omoplata
- Omoplata Sweep
- Single Leg X Entry
- Breathe

### Preferred cards
- Frame
- Wrist Control
- Butterfly Hooks
- Hip Bump Sweep
- Scissor Sweep
- Butterfly Sweep
- Triangle
- Armbar
- Omoplata
- Ashi Garami Entry

### Defensive cards
- Frame
- Wrist Control
- Breathe

### Offensive cards
- Armbar
- Triangle
- Guillotine
- Kimura
- Omoplata
- Hip Bump Sweep
- Scissor Sweep
- Butterfly Sweep
- Tripod Sweep
- Pendulum Sweep
- Lumberjack Sweep
- Omoplata Sweep

### Transition cards
- Hip Bump Sweep
- Scissor Sweep
- Butterfly Hooks
- Ashi Garami Entry
- Single Leg X Entry
- Flower Sweep

### Fallback cards
- Frame
- Wrist Control
- Butterfly Hooks
- Breathe

### Enough cards?
- **Yes**

---

## Half Guard Top

### Cards that can appear
- Knee Slice
- Shoulder Pressure
- Wrist Control
- Leg Drag
- Body Lock Pass
- Backstep Pass
- Kimura
- D'Arce Choke
- Shin Pin Pass
- Over Under Pass
- Smash Pass
- Kneebar
- Breathe

### Preferred cards
- Knee Slice
- Body Lock Pass
- Leg Drag
- Over Under Pass
- Smash Pass
- Backstep Pass
- Shin Pin Pass

### Defensive cards
- Shoulder Pressure
- Wrist Control
- Breathe

### Offensive cards
- Knee Slice
- Leg Drag
- Body Lock Pass
- Backstep Pass
- Shin Pin Pass
- Over Under Pass
- Smash Pass
- Kimura
- D'Arce Choke
- Kneebar

### Transition cards
- Backstep Pass
- Shin Pin Pass
- Wrist Control
- Shoulder Pressure

### Fallback cards
- Shoulder Pressure
- Wrist Control
- Breathe

### Enough cards?
- **Yes**

---

## Half Guard Bottom

### Cards that can appear
- Hip Escape
- Frame
- Recover Guard
- Butterfly Sweep
- Old School Sweep
- Ashi Garami Entry
- Butterfly Hooks
- Single Leg X Entry
- Breathe

### Preferred cards
- Frame
- Hip Escape
- Recover Guard
- Butterfly Sweep
- Old School Sweep
- Butterfly Hooks

### Defensive cards
- Hip Escape
- Frame
- Recover Guard
- Breathe

### Offensive cards
- Butterfly Sweep
- Old School Sweep

### Transition cards
- Ashi Garami Entry
- Butterfly Hooks
- Single Leg X Entry

### Fallback cards
- Frame
- Recover Guard
- Breathe

### Enough cards?
- **Borderline, but playable**

---

## Side Control

### Cards that can appear
- Shoulder Pressure
- Step To Mount
- Kimura
- Arm Triangle
- D'Arce Choke
- Knee On Belly
- North South Control
- Americana
- Breathe

### Preferred cards
- Shoulder Pressure
- Knee On Belly
- Step To Mount
- Kimura
- Arm Triangle
- Americana

### Defensive cards
- Shoulder Pressure
- Breathe

### Offensive cards
- Kimura
- Arm Triangle
- D'Arce Choke
- Americana

### Transition cards
- Step To Mount
- Knee On Belly
- North South Control

### Fallback cards
- Shoulder Pressure
- Step To Mount
- Breathe

### Enough cards?
- **Yes**

---

## Mount

### Cards that can appear
- Shoulder Pressure
- Armbar
- Arm Triangle
- Americana
- Breathe

### Preferred cards
- Armbar
- Americana
- Arm Triangle
- Shoulder Pressure

### Defensive cards
- Shoulder Pressure
- Breathe

### Offensive cards
- Armbar
- Americana
- Arm Triangle

### Transition cards
- Shoulder Pressure

### Fallback cards
- Shoulder Pressure
- Breathe

### Enough cards?
- **Borderline**

---

## Ashi Garami

### Cards that can appear
- Straight Ankle Lock
- Heel Hook
- Ashi Control
- Toe Hold
- Kneebar
- Breathe

### Preferred cards
- Ashi Control
- Straight Ankle Lock
- Heel Hook
- Toe Hold
- Kneebar

### Defensive cards
- Ashi Control
- Breathe

### Offensive cards
- Straight Ankle Lock
- Heel Hook
- Toe Hold
- Kneebar

### Transition cards
- Ashi Control

### Fallback cards
- Ashi Control
- Breathe

### Enough cards?
- **Borderline**

---

## Single Leg X

### Cards that can appear
- Single Leg X is not yet a true live bucket in the current playable pool.
- The current pool only contains feeder / entry style cards that can lead into it:
  - Ashi Garami Entry
  - Single Leg X Entry
  - Butterfly Hooks
  - Breathe

### Preferred cards
- Ashi Garami Entry
- Single Leg X Entry
- Butterfly Hooks

### Defensive cards
- Breathe

### Offensive cards
- None currently as a dedicated Single Leg X finish family

### Transition cards
- Ashi Garami Entry
- Single Leg X Entry
- Butterfly Hooks

### Fallback cards
- Breathe

### Enough cards?
- **No**

---

## Quick Validation Summary

- **Strong buckets:** Standing, Front Headlock, Back Control, Guard, Half Guard Top, Side Control
- **Playable but narrow:** Half Guard Bottom, Mount, Ashi Garami
- **Needs real expansion:** Turtle, Single Leg X

## Implementation Rule of Thumb

If a position has fewer than 3 meaningful cards after filtering:

1. Try the position bucket.
2. Try archetype-valid cards in the same bucket.
3. Try loadout-valid feeder cards that lead into the bucket.
4. Only then allow fallback cards.
5. Use `Breathe` last.


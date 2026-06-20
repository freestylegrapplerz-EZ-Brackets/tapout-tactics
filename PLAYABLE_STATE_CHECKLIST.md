# Tapout Tactics Playable State Checklist

This checklist separates **playability** from **art completeness**.

Use it to decide:

- which positions can already participate in the match loop,
- which positions need temporary fallback behavior,
- which positions should stay hidden for now,
- and which archetypes are already testable in a meaningful way.

## Checklist Definitions

- **Safe To Offer Now?** Can this position appear in the hand / offer system without creating dead ends or confusing loops?
- **Safe To AI Use?** Can the AI choose this position without breaking the match flow?
- **Requires Placeholder Art?** Does this position still need temporary art to be usable?
- **Requires Additional Art Before Release?** Does this position still need more approved art before it should ship?
- **Requires Additional Gameplay Support?** Does this position need more cards, counters, transitions, or fallback logic before it feels complete?

## Offer-Safe Evaluation Criteria

A position should only be treated as **fully offer-safe** when it has enough meaningful branching to avoid feeling linear.

Use these criteria together:

1. **Art Coverage**
2. **Offensive Branch Count**
3. **Defensive Branch Count**
4. **Transition Branch Count**
5. **AI Decision Variety**

If a position has art but only one real lane, it is **present** but not yet **fully offer-safe**.

## Playable State Matrix

| Position | Safe To Offer Now? | Safe To AI Use? | Requires Placeholder Art? | Requires Additional Art Before Release? | Requires Additional Gameplay Support? | Recommended State | Notes |
|---|---|---|---|---|---|---|---|
| **Standing** | Yes | Yes | No | No | No | Ready | Core entry state. Good for wrestler chains, hand fighting, takedowns, and guard pulls. |
| **Front Headlock** | Yes | Yes | No | No | No | Ready | Strong, playable hub for snapdown, guillotine, go-behind, and back-take chains. |
| **Turtle** | Yes | Yes | No | No | Some | Ready with fallback | Usable now because it already supports back-control / escape flow, but it still benefits from more branching. |
| **Back Control** | Yes | Yes | No | No | No | Ready | Stable end-state for back-hunter chains; already supports offense and defense. |
| **Guard (Closed Guard family)** | Yes | Yes | No | No | No | Ready | This should be treated as the approved closed-guard chain, not generic open guard. |
| **Open Guard** | No | No | Yes | Yes | Yes | Hidden | Too broad and too shallow right now; keep out of the main offer pool until it has more branch depth. |
| **Half Guard Top** | Yes | Yes | Yes | Yes | Yes | Playable with temporary art | Can participate now, but it still needs stronger visual and gameplay support to feel robust. |
| **Half Guard Bottom** | Yes | Yes | Yes | Yes | Yes | Playable with temporary art | Similar to top half guard: usable, but should rely on fallback logic until the card pool deepens. |
| **Side Control** | Yes | Yes | Yes | Yes | Some | Playable with temporary art | Important position, but it still needs more visual support and more follow-up branches before release polish. |
| **Mount** | Yes | Yes | Yes | Yes | Some | Near-ready / playable with temporary art | The new Mount → Armbar From Mount chain improves this a lot, but Mount still needs more branching before it becomes fully offer-safe. Current missing lanes include Arm Triangle, Americana, High Mount, Mount To Back, and Mount Escapes. |
| **Ashi Garami** | Yes | Yes | Yes | Yes | Some | Playable with temporary art | Works as a meaningful leg-lock node, but should still lean on conservative fallback logic. |
| **Single Leg X** | No | No | Yes | Yes | Yes | Hidden | Not ready for the main offer system yet; it needs more support and cleaner branching. |

## Practical Readiness Summary

### Ready to participate in the gameplay loop now

- Standing
- Front Headlock
- Turtle
- Back Control
- Closed Guard / Guard (approved chain)

### Playable, but should rely on temporary fallback behavior

- Half Guard Top
- Half Guard Bottom
- Side Control
- Mount
- Ashi Garami

### Should stay hidden for now

- Open Guard
- Single Leg X

## Archetype Test Readiness

### Already meaningful to test

- **Wrestler**: Standing, Front Headlock, Turtle, Back Control
- **Guard Player**: Closed Guard / Guard chain
- **Back Hunter**: Front Headlock, Turtle, Back Control

### Partially testable, but still dependent on fallback logic

- **Pressure Passer**: Side Control, Mount, Half Guard Top
- **Leg Locker**: Ashi Garami

## Implementation Rule

When the offer system builds a hand, it should prefer:

1. **Position validity**
2. **Archetype fit**
3. **Loadout fit**
4. **Resource constraints**
5. **Fallback**

If a position cannot produce enough meaningful choices, it should not escalate to generic filler too early.  
`Breathe` should remain a true fallback, not the default answer.

### Full Offer-Safe Rule

A position is **fully offer-safe** only if it can consistently generate:

- at least 3 meaningful choices,
- at least 2 distinct offensive lanes,
- at least 1 defensive or counter lane,
- and at least 1 transition lane that does not funnel into a dead end.

Mount currently satisfies **presence** and **basic art coverage**, but it should still be treated as **near-ready** until those branching thresholds are met.

## Offer System Authority Rules

Treat this checklist as the source of truth for the hand offer system.

### 1) Positions allowed to generate offers

Only positions marked **Ready** or **Near-ready / playable with temporary art** may generate normal offers.

Current allowed positions:

- Standing
- Front Headlock
- Turtle
- Back Control
- Guard (Closed Guard family)
- Half Guard Top
- Half Guard Bottom
- Side Control
- Mount
- Ashi Garami

### 2) Positions that require fallback behavior

These positions may appear, but their offers should use fallback selection rules if the ideal card pool is thin:

- Turtle
- Half Guard Top
- Half Guard Bottom
- Side Control
- Mount
- Ashi Garami

### 3) Positions hidden from normal gameplay

These should not be offered in the standard hand pool yet:

- Open Guard
- Single Leg X

### 4) When `Breathe` is allowed to appear

`Breathe` is allowed only when:

- the current position has no valid position-aligned cards left,
- the current stamina cannot support any valid offensive or transitional card,
- or the position is intentionally using fallback behavior and still has no meaningful choices after archetype/loadout filtering.

`Breathe` should never be the first or default answer while a real grappling option exists.

### 5) When placeholder art is acceptable

Placeholder art is acceptable only for positions marked **Playable with temporary art** or **Near-ready / playable with temporary art**.

Placeholder art is **not** acceptable for:

- Ready positions
- Hidden positions

That keeps implementation flexible without pretending a position is more complete than it actually is.

## Release Guidance

- **Ship-safe positions** are the ones that can already support real player decisions without feeling like dead ends.
- **Fallback positions** are acceptable in development and playtests, but they should not be the only focus of release polish yet.
- **Hidden positions** should not be offered until they have more branching, clearer counters, and enough cards to support 3 meaningful choices most of the time.

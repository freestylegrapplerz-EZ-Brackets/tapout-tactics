# GLYPH build notes — Cascade FX (`vs-1.4.1-cascade-fx`)

**Branch:** `cursor/encounter-run-6013`

## What shipped

Visual cascade feedback — element bursts, floating numbers, multiplier flashes.

### Element travel + hit FX

| Element | Visual |
|---------|--------|
| **Fire** | Ember trail + fire burst on hit |
| **Water** | Ripple rings spreading outward |
| **Lightning** | Jagged bolt on arc jumps |
| **Crystal** | Arcane conic burst + SURGE tag |

### Floating numbers

| Color | Meaning |
|-------|---------|
| **Green** | Good hit — base activation |
| **Orange** | Great — steam, strong gain, late chain |
| **Yellow** | Excellent — Crystal surge, big synergy |
| **Cyan ×1.70** | Multiplier flash on big mult jumps |

Tags: **STEAM** / **SURGE** on synergy activations.

Hard refresh — `vs-1.4.1-cascade-fx`

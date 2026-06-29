# GLYPH — Creative Direction Bible v1

**Status:** Ratified for all visual, audio, and UX development.  
**Authority:** Sits below the [Studio Constitution](./STUDIO-CONSTITUTION.md) (mechanics & trust) and above feature-level art decisions.

**Product positioning (Greg / Executive Producer):**

> **We are NOT optimizing for adrenaline, intensity, or spectacle alone.**  
> **We ARE optimizing for: comfort · calm · mental escape · hope · mastery.**

**Emotional target:**

> *"A strategy game that helps people unwind while still feeling intelligent."*

**The dual engine:**

| Role | Emotion |
|---|---|
| **Engine (during cascade)** | **Hope** — participatory, quiet rooting for the frontier |
| **Destination (whole session)** | **Comfort** — the player leaves calmer, clearer, gently satisfied |

Hope is the pulse. Comfort is the room.

**Reference constellation (feel, not copy):**

| Game | What we take |
|---|---|
| **Tetris Effect** | Flow state, synesthetic calm, glow without chaos, "zone" as peace |
| **Dorfromantik** | Cozy placement satisfaction, no urgency, pastoral intelligence |
| **Mini Metro** | Clean geometry, soft efficiency, quiet competence |
| **Monument Valley** | Contemplative beauty, impossible clarity, unhurried wonder |
| **The Witness** | Intellectual satisfaction in silence, respect for player intelligence |
| **Journey** | Emotional arc through restraint, beauty as feeling not noise |

**Anti-references (what GLYPH is not):**

Diablo, bullet hell, casino UI, neon esports, slot-machine flash, anxiety timers, FOMO red dots.

---

## 1. The emotional place

Before color or shape, answer the place:

> **GLYPH is a quiet room at dusk where you arrange glowing stones on a slate table, light one, and watch a gentle chain of light spread — hoping it reaches one more — then sit back, satisfied, a little smarter than when you sat down.**

The player enters **mental escape** — not distraction (numbing scroll) but **absorption** (healthy flow). They feel **intelligent** because the game respects their mind: deterministic, legible, deep. They feel **comfort** because nothing screams, nothing rushes, nothing punishes their nervous system.

**The room should feel quiet.**  
**The music should breathe.**  
**The visuals should glow.**  
**The interaction should become meditative.**  
**The player should gradually enter flow.**

---

## 2. Color language

### Philosophy

Color in GLYPH is **luminous, not loud**. Elements **glow from within** against a subdued world — like embers on dark stone, not fireworks on a black sky. Saturation is **controlled**; contrast comes from **light**, not from neon clash.

The palette says: *safe · warm-cool balance · twilight · intelligence · rest.*

### Core palette

| Role | Direction | Rationale |
|---|---|---|
| **Ground / stage** | Deep blue-charcoal, blue-grey slate | Calm base; reduces eye strain; "table at dusk" |
| **Empty space** | Slightly lifted charcoal, not pure black | Soft depth; avoids harsh void |
| **Fire** | Warm amber-rose ember, not alarm red | Heat without aggression |
| **Lightning** | Soft gold-white, not electric yellow | Energy without sting |
| **Water** | Cool cerulean-teal, desaturated | Flow, breath, calm |
| **Crystal** | Gentle violet-lilac with inner white core | Wonder without casino purple |
| **Hope / frontier accent** | Warm white-gold thread | The wave — visible, soft, never strobe |
| **Lit / afterglow** | Element color at 40–60% bloom, retained softly | Memory of the performance — evidence, not flash |
| **Cold / unfired** | Same hue, 25% opacity, desaturated | Gentle "almost" — not punishment grey |

### Rules

- **No pure #FF0000, no pure #00FF00, no strobe pairs.** Comfort rejects visual assault.
- **Maximum one accent moment per cascade** — the curtain-call beat — and even that is **warm swell**, not explosion.
- **UI chrome** lives in the ground palette; **elements** carry the color story.
- **Accessibility:** every element readable in colorblind modes via **shape + luminance**, not color alone (see Shape language).

### What color must never do

- Scream "Jackpot!"
- Simulate urgency (flashing red timers)
- Compete with the frontier for attention during cascade

---

## 3. Shape language

### Philosophy

Shapes are **readable, soft, and intentional** — runes as **crafted tokens**, not gamey icons. Geometry says *thoughtful · ancient-modern · tactile · calm intelligence.*

### Rune / element shapes

| Element | Shape character | Readability |
|---|---|---|
| **Fire** | Rounded triangle / soft chevron, open flame silhouette | Reads "upward spread" without sharp points |
| **Lightning** | Broken line / zig with **rounded joints** | Energy path, not aggressive bolt |
| **Water** | Soft circle or three-dot flow mark | Continuity, pooling |
| **Crystal** | Hex or diamond with **beveled soft corners** | Refraction without shard violence |

- **Corner radius:** consistent (approx. 8–12% of cell) — nothing pixel-sharp except at micro-detail level.
- **Stroke weight:** medium-light; inner glow carries identity more than heavy outline.
- **Grid cells:** rounded square or soft hex — **Mini Metro** clarity, **Monument Valley** gentleness.

### Board / stage shape

- The board is a **framed plane** — a deliberate object in space (slate, stone, lacquered wood in lore), not an abstract grid floating in void.
- **Frame** provides containment = psychological safety = comfort.

### Rules

- No skulls, spikes, jagged horror geometry.
- No casino chips, slot reels, card-frame clutter.
- Silhouettes must read at 32px without text labels.

---

## 4. Animation language

### Philosophy

Animation in GLYPH **breathes**. It does not **barrage**. Motion follows **inhale → move → exhale → rest**. The frontier **glides**; it does not **snap**. Even acceleration during cascade is **elegant compression of breath**, not panic.

**Reconcile with Constitution:** Hope still requires escalation — but escalation is **crescendo**, not **assault**. Think **John Williams on low volume**, not EDM drop.

### The three motions

| Motion | Character | Duration feel |
|---|---|---|
| **Approach (frontier travel)** | Soft line or particle thread, ease-in-out | Longest beat — hope lives here |
| **Impact (activation)** | Gentle bloom inward, 1.0→1.08 scale max | Short, satisfying, never cartoon bounce |
| **Afterglow (rest)** | Slow fade to lit state, 300–800ms | Evidence persists; room to process |

### Placement (build phase)

- Rune settles onto cell with **soft landing** (ease-out, minimal overshoot).
- Pick-up: **lift** slightly, opacity fade — respectful, not twitchy.
- No shake on invalid placement — quiet refusal (dim flash or gentle bump back).

### Cascade (performance phase)

- **Accelerating cadence** allowed — but cap peak speed so the eye can still track. **Flow, not frenzy.**
- **No screen shake.** Comfort rejects vestibular stress.
- **No hit-stop freeze** that feels like a fighting game — optional **micro-pause (40–60ms)** only on final connection if it reads as **breath**, not **impact frame**.
- Travel lines: **tapered, soft-edged**, opacity falloff — comet tail, not laser.

### Curtain call

- Final lit board **holds** 600–900ms — **Monument Valley** pause.
- Credits/score **ease in** from below or fade — **after** the held moment.

### Forbidden motion

- Strobe, flash white full-screen
- Violent shake, chromatic aberration abuse
- Slot-machine reel spin
- Aggressive elastic bounce (Duolingo owl energy)

---

## 5. Lighting philosophy

### Philosophy

Light in GLYPH is **diegetic and calm** — the runes emit; the world receives. The player looks at **gentle sources in a dim room**, not a stadium show.

### Key principles

1. **Low ambient, high local** — stage is dusk; runes are candles.
2. **Rim light** on board frame — subtle separation from background (Journey / Witness horizon softness).
3. **Frontier** = thin bright thread or soft volumetric streak — **leading actor**, not floodlight.
4. **Lit cells** retain **soft bloom**; cold cells fall into **quiet shadow** — story through light, not greyscale punishment.
5. **No directional strobe** simulating explosions.

### Environment light

- Background: **gradual gradient** (deep blue-grey → slightly warmer at horizon). Optional **very slow** drift (60s+ cycle) for living calm — **Tetris Effect** ambient life.
- Optional subtle **particle dust** in air — low count, slow — "quiet room with afternoon light."

### Emotional function

Lighting says: *you are safe here · this is yours · watch the light travel · rest when it settles.*

---

## 6. Audio philosophy

### Philosophy

**The room should feel quiet.** Music and SFX **breathe** — space between notes is as important as notes. Audio supports **hope** (lean-in) and **comfort** (lean-back).

### Music

- **Genre direction:** Ambient electronic, soft piano, gentle synth pads, minimal percussion — **Tetris Effect** zones, **Journey** restraint, **Dorfromantik** warmth.
- **Tempo:** 60–80 BPM equivalent feel; no double-time anxiety.
- **Structure:** Build phase = sparse, contemplative. Cascade = **layers enter gradually** — not drop. Curtain call = **resolve to consonance** — exhale chord.
- **No:** dubstep drops, casino jingles, victory fanfares, aggressive drums.

### Sound design

| Event | Character |
|---|---|
| **Place rune** | Soft stone-on-slate tick, warm |
| **Spark / Action** | Single gentle ignition — candle, not match strike |
| **Frontier travel** | Quiet whoosh or tonal glide — rising pitch **subtle** |
| **Activation** | Element-specific **soft** texture (ember crackle low, water droplet, crystal chime) |
| **Chain milestone** | Optional soft harmonic layer — not stinger |
| **Curtain call** | Pad swell + resolution; silence after |
| **Credits appear** | Minimal — maybe one soft tone |

### Mix philosophy

- **Dynamic range preserved** — not brick-walled mobile game loudness.
- **Default volume conservative** — player turns up if they want; comfort default is **quiet room**.
- **Mute / low-audio mode** must still pass Hope Pass (visual pacing carries hope).

### Reconcile with Hope Pass v1

Hope Pass used rising blips — **production audio replaces blips with tonal breath.** Same crescendo **shape**, different **texture**.

---

## 7. UI philosophy

### Philosophy

UI is **invisible until needed**, **legible when glanced**, **never loud**. The board is the hero; UI is **whisper**.

### Layout

- **Board centered** — focal calm (Monument Valley composition).
- **Hand / tools** below board — reach without clutter.
- **Frontier HUD** during cascade: **chain count** large, soft typography — not esports overlay.
- **Score / credits:** **after performance** — Constitution §9. During play: hidden or whisper-small.

### Typography

- **Primary:** Rounded humanist sans OR refined serif for titles only — **intelligent, not gamer**.
- **Weight:** Regular / medium — avoid heavy black condensed esports fonts.
- **Size:** generous line-height; no dense stat walls.

### Interaction

- **One-thumb mobile, mouse calm on desktop** — no frantic clicking.
- **No countdown timers** visible during thoughtful placement.
- **No red notification badges.**
- **Undo / pick-up:** gentle, forgiving — comfort allows experimentation (Constitution: hope from agency).

### Feedback

- Success: **warm glow, soft copy** — "Connected." not "DOMINATING!"
- Near miss: **kind language** — "One more link next time." not "FAILED"

### UI anti-patterns

- Loot box aesthetics
- Battle pass banners
- Flashing "NEW!"
- Leaderboard pop-ups mid-thought

---

## 8. Environmental storytelling

### Philosophy

GLYPH does not need a cinematic story. It needs a **place** — a **consistent emotional location** the player returns to for mental escape.

### The place (recommended direction)

**The Quiet Atelier / Twilight Study**

A personal space for thought — not a battlefield, not a casino. Where the player is a **scholar of light** arranging **sigils** on a **working surface** in a room that exists just outside everyday stress.

- **Time of day:** perpetual gentle dusk — transition time, reflective, unhurried.
- **Weather (if shown):** still; optional slow rain on window far background — comfort rain, not storm.
- **No characters on screen** — the player **is** the presence. (Journey shows companions rarely; Witness shows no one; Dorfromantik shows no avatar.)
- **Objects:** board, maybe distant shelf blur, soft horizon — **minimal**.

### Lore depth

- **Mechanical lore only at first:** elements behave as natural forces — fire spreads, water flows. No wiki required.
- **Deeper lore optional later:** who made the sigils? — delivered through **environmental detail**, never mandatory text walls.

### Seasonal / variant rooms (future)

- Same **comfort baseline** — autumn study, winter hearth, summer dusk — palette shift, not identity shift.

### Storytelling rule

Environment answers: *"Where do I go to think?"* — not *"Who am I fighting?"*

---

## 9. Emotional pacing

### Philosophy

Session arc mirrors **comfort meditation with intellectual engagement**:

```
Arrive → Settle → Focus → Hope → Release → Satisfaction → Rest → Return willingness
```

### Phase pacing

| Phase | Duration feel | Emotional goal | Sensory level |
|---|---|---|---|
| **Arrive / menu** | 2–5s to board | Transition from real world; soft entry | Low |
| **Build / block** | 1–3 min unhurried | Calm focus, mastery, agency | Low–medium |
| **Pre-Spark** | 1–3s | Quiet commitment — "Action." | Medium stillness |
| **Cascade** | 15–90s | Hope, lean-in, crescendo **within calm** | Medium → medium-high |
| **Curtain call** | 0.6–1.2s hold | Release, pride, exhale | Peak then drop |
| **Credits / reflect** | 3–10s | Satisfaction, "I understand" | Low |
| **Between runs** | Player-controlled | No pressure — **Dorfromantik** "one more tile" not "one more match" | Low |

### Session length target

- **Single board:** 2–5 minutes — commute calm, not marathon stress.
- **Session:** 15–30 minutes natural stop — **healthy escape**, not addiction loop.
- **No** energy systems forcing anxiety exit.

### Reconcile hope + comfort

- **Hope** = slight lean-forward during cascade — **engagement without cortisol.**
- **Comfort** = no punishment, no screaming, safe to fail, safe to pause, leave calmer.

**Test:** After 20 minutes, is the player **more settled** than when they started? (Not just "more excited.")

---

## 10. Camera philosophy

### Philosophy

Camera is **stable, respectful, contemplative** — **Witness** stillness, **Monument Valley** considered angles. The player is not chasing the action; the action unfolds **in a frame they trust**.

### Rules

- **Fixed orthographic or very slight perspective** on board — no shaky cam, no dramatic zooms every activation.
- **Optional micro-zoom** (2–3%) on curtain call only — gentle emphasis, not COD killcam.
- **Frontier travel** may use **subtle pan** to keep lead actor in comfortable view — slow ease, never snap.
- **Mobile:** board scales to fit; UI anchors bottom; no clutter at edges.
- **Never** rotate camera during cascade — vestibular comfort.

### Composition

- Board occupies **60–70%** visual weight.
- Horizon / environment **soft upper third** — breathing room (sky in Journey, island in Witness).
- **Negative space is intentional** — calm requires room.

---

## 11. Visual identity

### One-line identity

> **GLYPH — quiet intelligence that glows.**

### Logo / wordmark direction (when designed)

- **GLYPH** as wordmark: refined, spaced lettering — could suggest rune geometry without literal skulls/flames.
- Icon: **single soft sigil** — abstract chain or glowing node — readable at 32px.
- **No:** aggressive mascots, muscle men, slot machine motifs.

### Marketing stills (future)

- **Glow in dusk**, not explosion in darkness.
- **Still frames** must work — comfort games sell **peace**, not only motion (reconcile red-team store risk: lead with **beautiful calm board + soft lit chain**, not empty grid).

### Tone of voice (copy)

- Calm, confident, respectful of intelligence.
- **"Arrange. Ignite. Hope."** not **"BUILD INSANE COMBOS!!!"**
- Error copy kind; success copy warm.

### Identity test questions

1. Would this asset belong in **Monument Valley**'s world more than **Diablo**'s?
2. Does it help the player **unwind**?
3. Does it still let them feel **smart**?
4. Does it **increase hope** without **decreasing comfort**?

All four must be yes.

---

## 12. Constitution alignment check

| Constitution | Creative Bible |
|---|---|
| §2 Make players hope | Hope engine — frontier glow, travel pacing |
| §3 Punctuation not sentence | Cascade crescendo **within** calm — not hype reel |
| §4 Frontier lead actor | Lighting + animation follow frontier |
| §9 Curtain call before credits | Pacing + UI — hold before score |
| §1 Never lie | No fake drama; honest glow on real propagation |
| §10 Grin before optimize | Comfort **enables** grin — not anxiety grind |
| Comfort destination (new) | **Primary lens for all sensory decisions** |

**If comfort and hope conflict:** reduce intensity, preserve **legible hope**. Never sacrifice trust for comfort. Never sacrifice comfort for spectacle.

---

## 13. What we do not do in visual development (yet)

- **No final assets** until Creative Bible reviewed by Executive Producer + Greg.
- **No asset pipeline** until first **static mood board** (6–8 reference composites) approved against this document.
- **No implementation** until evidence from Hope Pass playtests informs whether pacing is **too calm** (insufficient hope) — one variable at a time.

**First visual deliverable when approved:** Mood board pack (still images only) — "Twilight Atelier" — not playable build.

---

## 14. The question we now answer

> **"What emotional place does GLYPH become for the player?"**

**Answer:**

GLYPH becomes **the quiet room you choose when you want your mind engaged but your body at rest** — where hoping the light reaches one more stone is the gentlest form of excitement, and leaving the session feels like **putting down a good book**, not **surviving a battle.**

Hope is the pulse while you watch.  
Comfort is the place you return to.  
Mastery is the respect you feel.  
Escape is the gift you give yourself.

---

*Creative Direction Bible v1 — product identity for calm strategic hope. Mechanics validated; the room now needs walls, light, and breath.*

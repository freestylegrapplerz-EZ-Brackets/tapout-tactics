# GLYPH — Vertical Slice Production Plan (Milestone 2)

**Author:** Technical Director planning document  
**Audience:** Greg (CEO), Executive Producer, Creative Director  
**Status:** APPROVED — implementation authorized 2026-06-29 (CEO)

**Frozen inputs (do not redesign):**
- [Studio Constitution](./STUDIO-CONSTITUTION.md)
- Emotional contract · Hope Pass build · Playtest Protocol v1
- [Creative Direction Bible v1](./CREATIVE-DIRECTION-BIBLE.md)
- [Meridian Room DNA](./MERIDIAN-ROOM-DNA.md) — environmental DNA, subordinate to Product

**The Vertical Slice question:**

> *If someone downloaded GLYPH today, would the first five minutes convince them to play another five?*

**CEO Amendment 1 — Hope Contract, not product proof:**

The Vertical Slice is **not** attempting to prove GLYPH. It is attempting to prove the **Hope Contract**. Every production decision:

> *Does this increase the player's feeling of hope?*

If not, it is probably not part of the Vertical Slice.

**Feeling target:** [VS-FEELING.md](./VS-FEELING.md)

**What we are NOT doing in Milestone 2 planning:**
- Full game · content pipeline · meta progression · monetization · multiple biomes · classes · shop · daily seeds · Steam page assets at scale

**What we ARE doing:**
- Plan **one extraordinary first experience** — the smallest shippable-quality proof that the emotional contract lands in a real build (not Hope Pass HTML).

---

## SECTION 1 — What the Vertical Slice is

### Definition

The Vertical Slice is a **single-session, first-time-player experience** — approximately **5–10 minutes** — that delivers the **complete emotional arc** once:

```
Arrive calm → understand through doing → arrange with agency →
Spark (Action) → hope at the frontier → curtain call → pride →
voluntary second attempt
```

It is **one vertical cut** through **Product** (strategy loop) and **World** (Meridian Room DNA at whisper level) — polished enough to show externally, small enough to finish.

### Included

| Area | Vertical Slice scope |
|---|---|
| **Core loop** | Placement → Spark → deterministic cascade → curtain call → credits (same rules as Hope Pass) |
| **Elements** | Fire, Lightning, Water, Crystal — **only these four** |
| **Board** | One size (5×5), one topology (rectangular, framed "slate table") |
| **Hand** | One hand size (8 runes), random deal — pre-Spark variety only |
| **Objective** | One objective type: **beat a target score** (same as Hope Pass) |
| **Sessions** | **One intro board** + **repeatable practice boards** within first visit (New Hand / Clear Board) |
| **Onboarding** | **Minimal** — 3 lines max total copy before first Spark; teach by doing |
| **Frontier performance** | Travel + lit/cold + chain HUD + hope pacing (Hope Pass v2 direction, production quality) |
| **Visual identity (minimum)** | Dusk slate stage, elemental glow, Meridian DNA materials — **not** placeholder grey boxes |
| **Audio (minimum)** | Room tone, placement tick, spark ignition, travel/activation tones, curtain resolve |
| **UI** | Calm shell: board hero, hand, frontier HUD during cascade, credits after — **no** meta screens |
| **Platform** | **One primary target** for slice: mobile-first **or** web — pick one in CEO approval (recommendation: **web first** for fastest iteration, mobile layout required in slice) |
| **Performance** | Stable 60fps (or locked 30 on low mobile) during cascade on target device class |
| **Evidence** | Playtest Protocol v1 at **VS-1, VS-2, VS-3** gates (Section 8) |

### Intentionally excluded

| Excluded | Why |
|---|---|
| Meta progression / unlocks | Not needed to prove first 5 → next 5 |
| Shop / economy / currencies | Constitution: horizontal progression later |
| Multiple objective types | One variable; Objective × Distribution × Topology is Phase 7 full game |
| Classes / Skies / Sigils | Content, not first experience |
| Full run structure (8–12 trials) | First session = **2–4 sparks max**, not 30-minute descent |
| Save / cloud / accounts | Session is self-contained in browser/app |
| Leaderboards / daily seed | Social layer later |
| Full soundtrack album | Minimum audio only |
| Lore / observatory narrative | Meridian Room is DNA, not fantasy |
| Monetization · ads · IAP | Forbidden until product proven |
| Multiple biomes / environments | One room tone |
| Crystal balance pass (full) | Hope Pass overload acknowledged; **one** tuning pass in slice, not full meta |
| Localization | English only |
| Accessibility beyond colorblind shapes + mute | Nice-to-have post-slice |

### Where the Vertical Slice ends

**End state for a first-time player:**

1. They completed **at least one full cascade** with curtain call.
2. They were offered **voluntary replay** (Clear Board or New Hand) with **no prompt**.
3. The build **returns them to placement** — not a menu of features.
4. **No cliffhanger** requiring unlock — the loop is complete in one sitting.

**Slice ends at:** *"I understand what this is, I felt hope at the frontier, I want one more try — and nothing is locked behind a wall I can't reach in minute six."*

**Hard boundary:** If it requires explaining meta, shop, or "come back tomorrow," it is **beyond** the slice.

---

## SECTION 2 — Production milestones

Each milestone: **why it exists · success looks like · done when**

---

### M1 — Core Gameplay Feel (Cascade Performance)

**Why:** The Vertical Slice lives or dies on **hope at the frontier** — Product #1. Hope Pass proved mechanic; slice must prove **feel** in production build.

**Success:** Playtesters watch the **wave**, not the score; unprompted "come on" / replay; payoff ≥ planning in post questions.

**Done when:** VS-2 gate passes (Section 8) on **device class target** with score hidden mid-cascade.

---

### M2 — Interaction Polish (Build Phase)

**Why:** First minute must feel **meditative, not fiddly** — comfort destination starts at placement.

**Success:** Place / pick-up / Spark are **one-thumb reliable**; no mis-taps; placement feels **soft landing** not arcade snap.

**Done when:** 5 external testers complete first placement without facilitator help; no confusion logged after minute 1 in Protocol.

---

### M3 — Visual Identity (Minimum Viable Calm)

**Why:** Greybox fails CEO positioning — player must feel **calm**, not "dev build." Meridian DNA at **material/light** level only.

**Success:** Disappearance test passes — calm without observatory lore; Product legibility unchanged or improved.

**Done when:** Mood-board-aligned **slate stage + elemental glow + dusk ground** shipped; Creative Director sign-off on still frame.

---

### M4 — Animation Language (Breath, Not Barrage)

**Why:** Constitution + Creative Bible — escalation within calm; frontier **glides**.

**Success:** No screen shake; cascade accelerates but remains **trackable**; curtain call **hold** reads as exhale.

**Done when:** Animation checklist in Creative Bible §4 satisfied for **approach · impact · afterglow · curtain**.

---

### M5 — Audio (Minimum Emotional Set)

**Why:** Room should feel **quiet**; audio supports hope without casino stingers.

**Success:** Session feels calmer with audio on; mute mode still passes VS-2 (Product > World).

**Done when:** Minimum set (Section 6) implemented and mixed at **conservative default volume**.

---

### M6 — UI Shell (Whisper UI)

**Why:** Board is hero; credits after performance (§9). First 5 minutes must not explain features.

**Success:** Zero tutorial modal; ≤3 lines copy total before first Spark; frontier HUD readable at glance.

**Done when:** UI inventory (Section 5) complete; no meta navigation exists in build.

---

### M7 — Onboarding Micro-Flow

**Why:** First minute observation in Protocol — confusion kills 5→5.

**Success:** Pre-play answer clusters on "chain reaction / place and spark" without facilitator explanation.

**Done when:** VS-1 gate: ≤1 confusion flag in first minute for **majority** of testers.

---

### M8 — Game Feel Integration Pass

**Why:** Individual systems working ≠ **one extraordinary experience**.

**Success:** Full 5-minute session feels like **one room**, not stitched systems.

**Done when:** VS-3 gate — CEO question answered yes for **≥70%** of Protocol sessions (threshold set by EP).

---

### M9 — Performance & Stability

**Why:** Frame drops during cascade break hope and trust.

**Success:** No jank during 10-link cascade on min-spec target; no memory leak over 15-minute session.

**Done when:** Performance checklist signed on **named devices** (2 min, 2 mid).

---

### M10 — Build & Playtest Infrastructure

**Why:** Evidence-driven production requires **repeatable builds** and tagged gates.

**Success:** One command / link produces slice build; version string logged on Protocol sheet.

**Done when:** Facilitators can run VS-1/2/3 without developer in room.

---

### Intentionally NOT milestones in Vertical Slice

- Save system · cloud · achievements · full run · shop · meta · localization · marketing trailer · full OST

---

## SECTION 3 — Priority ranking

### Critical (slice cannot ship without)

| Task | Milestone |
|---|---|
| Deterministic cascade sim (Hope Pass parity) | M1 |
| Frontier travel + lit/cold + chain HUD | M1 |
| Curtain call before credits | M1, M6 |
| Placement / Spark / pick-up interaction | M2 |
| Score hidden during cascade | M6 |
| Slate stage + elemental read (color/shape) | M3 |
| First-minute onboarding (minimal) | M7 |
| VS-1 / VS-2 / VS-3 playtests | M10 |
| Stable performance during cascade | M9 |

### Important (strongly improves 5→5; ship slice only if time allows before VS-3)

| Task | Milestone |
|---|---|
| Approach/impact/afterglow animation polish | M4 |
| Minimum audio set + mix | M5 |
| Dusk environment gradient (DNA) | M3 |
| Soft placement/settle animation | M4 |
| Colorblind-safe shapes on elements | M3 |
| Mobile safe-area layout | M6 |
| "New Hand" / "Clear Board" affordance clarity | M2 |

### Nice to Have (postpone unless Critical/Important done)

| Task | Why postpone |
|---|---|
| Haptic feedback | World enhancement |
| Ambient slow gradient drift | World |
| Rune placement particles | World |
| Near-miss copy variations | Content |
| Settings screen (beyond mute) | Scope |
| Analytics pipeline | Not evidence gate requirement |
| Crystal balance deep pass | Full game tuning |
| Second board size | Content |
| Steam / App Store packaging | Post-slice |

---

## SECTION 4 — Technical risk review

### Biggest implementation risks

| Risk | Impact | Mitigation |
|---|---|---|
| **Cascade sim + animation desync** | Breaks trust (§1) | Single source of truth: sim completes first, renderer **follows** recorded steps — never guess |
| **Mobile performance with travel lines + glow** | Product failure | Cap simultaneous effects; object pool; test on min-spec **at M1**, not M9 only |
| **Scope creep into meta/run structure** | Never finish slice | Constitution scope list (Section 1); CEO approval for any addition |
| **Over-building engine for full game** | Expensive rewrite | Slice architecture: **data-driven runes OK**, but **no** shop/run manager — YAGNI |
| **Audio latency on mobile web** | Weak spark moment | Primary platform decision early; Web Audio unlock on first tap |
| **Onboarding too much / too little** | 5→5 fail | VS-1 gate only; one change per cycle |
| **World art delaying Product** | Product > World | Placeholder **allowed only** where Disappearance test still passes |

### Build order (systems)

**Build first:**
1. **Simulation kernel** — identical to Hope Pass rules, unit-testable, step log output
2. **Cascade renderer** — frontier travel, lit/cold, timing from step log
3. **Input + board state** — placement, pick-up, spark origin
4. **UI state machine** — build → performance → curtain → credits → build

**Build second:**
5. Visual materials (slate, glow) on existing renderer
6. Animation curves tied to step timing
7. Audio triggers bound to same step events

**Wait until after VS-2:**
8. Environment polish (gradient, frame detail)
9. Additional juice (particles, haptics)
10. Any "nice to have" from Section 3

### Avoiding expensive rewrites

- **Event log pattern:** Every cascade emits `{from, to, element, chainIndex, score}` — renderer, audio, analytics (later) subscribe to **same log**
- **Separate sim from presentation** — tuning timing never touches rules
- **One scene / one board** — no scene loader for slice
- **Config as data** — rune rules in JSON/JS object, not hardcoded sprawl — **but** no content pipeline tooling yet
- **Do not build meta save format** — session state in memory only

---

## SECTION 5 — Art direction planning (no artwork yet)

### Principle: maximum impact, minimum effort

**Product art (Critical):**
- **Readable element identity** at cell size — color + **shape** (colorblind)
- **Lit vs cold** state — hope story on board
- **Frontier travel** visible — line or glow thread (can be code-drawn, not textured)
- **Cell frame** — slate/table readability

**World art (Important, whisper level):**
- **Board frame** — stone/slate bezel suggesting Meridian DNA
- **Background** — static or very slow **dusk gradient** (single asset or CSS/shader)
- **No** dome, telescope, or observatory props in slice — **disappearance test**

### Placeholder allowed

| Asset | Placeholder OK? |
|---|---|
| Rune interior detail | Yes — flat glow + letter/shape |
| Background | Yes — gradient only |
| UI chrome | Yes — simple panels matching palette |
| Hand rune icons | Yes — match board rune style |
| Particle effects | Yes — none or minimal |
| Character / props | Yes — **none in slice** |

### Polish first (order)

1. **Element read + lit/cold** (Product)
2. **Frontier travel visibility** (Product)
3. **Slate table surface + frame** (Product + World)
4. **Dusk background gradient** (World)
5. **Typography / frontier HUD styling** (Product)
6. **Rune settle animation** (Important)
7. Everything else — **post VS-3**

### Artwork inventory (required list — not produced yet)

| Asset | Count | Priority |
|---|---|---|
| Element glyph shapes (4) | 4 | Critical |
| Cell slate texture or shader | 1 | Critical |
| Board frame | 1 | Important |
| Background gradient | 1 | Important |
| UI font choice | 1 | Important |
| App icon | 0 in slice | Postpone |

**Total unique art decisions:** ~8 — not 80.

---

## SECTION 6 — Audio planning

### Minimum audio required

| Event | Character | Priority |
|---|---|---|
| **Room tone** (menu/build loop) | Low ventilation breath, seamless loop | Important |
| **Place rune** | Soft stone tick | Critical |
| **Pick up rune** | Soft lift tone | Nice |
| **Spark / Action** | Gentle ignition — candle, not match | Critical |
| **Frontier travel** | Quiet tonal glide (pitch follows progress) | Critical |
| **Activation** | Element-specific **soft** texture (4 variants) | Important |
| **Steam combo** | Distinct soft whoosh (Water conversion) | Important |
| **Chain milestone** | Optional harmonic at 5 / 10 — **subtle** | Nice |
| **Curtain call resolve** | Pad swell + consonance, then fade | Critical |
| **Credits appear** | Single soft tone or silence only | Nice |

### Explicitly excluded from slice audio

- Full soundtrack with melodies
- Voiceover tutorial
- Casino stingers
- Aggressive percussion
- Adaptive music middleware (Wwise/FMOD) — **unless** already in stack; use Web Audio / Godot native for slice

### Mix philosophy

- Default volume **quiet** — Creative Bible
- **Mute must pass VS-2** — Product over World

### Emotional priority order

1. Spark ignition + travel (hope begins)
2. Activation clarity (trust / legibility)
3. Curtain resolve (comfort landing)
4. Room tone (comfort envelope)
5. Everything else

---

## SECTION 7 — Production roadmap (dependency order)

**No time estimates — strict sequence.**

```
PHASE A — Foundation (blocking)
A1. Tech stack lock for slice (web canvas / Godot / retain HTML evolution) — CEO sign-off
A2. Simulation kernel + step log (parity with Hope Pass)
A3. Input + board state machine
A4. Basic renderer: cells, placement, no juice

PHASE B — The Hope Performance (blocking)
B1. Cascade playback from step log
B2. Frontier travel + approaching state
B3. Lit/cold + chain HUD
B4. Curtain call timing + credits reveal
→ EVIDENCE GATE VS-1 (greybox+feel ok)

PHASE C — First-Minute Product
C1. Minimal onboarding copy + first-run flow
C2. Interaction polish (tap targets, pick-up)
C3. New Hand / Clear Board
→ EVIDENCE GATE VS-2 (hope question)

PHASE D — Calm Identity (parallel after B stable)
D1. Element shapes + colorblind read
D2. Slate surface + frame
D3. Dusk background
D4. UI whisper shell

PHASE E — Integration
E1. Animation breath pass (M4)
E2. Minimum audio bind to step log (M5)
E3. Performance pass on target devices (M9)
→ EVIDENCE GATE VS-3 (5→5 question)

PHASE F — Slice Complete
F1. Build tagging + Protocol infrastructure (M10)
F2. Buffer for **one-variable** fixes from VS-3
F3. CEO / EP slice review — ship externally?
```

**Rule:** No Phase D work before **B4** complete (Product before World polish).  
**Rule:** No Phase E2 before **VS-2 pass** OR parallel only if VS-2 is trending pass on frontier metrics.

---

## SECTION 8 — Evidence gates

**Do not wait until slice is "finished" to test.**

| Gate | When | Build state | Primary question | Pass criteria (EP sets N) |
|---|---|---|---|---|
| **VS-0** | Complete (baseline) | Hope Pass frozen | Mechanic + voluntary replay | Already passed founder test |
| **VS-1** | End of Phase B | Cascade performs; ugly art OK | Frontier as lead actor? | Protocol: hope language OR frontier focus in ≥3/5; no "numbers only" in Q2 |
| **VS-2** | End of Phase C | Onboarding + interaction | 5→5 minute 5? | ≥3/5 voluntary 2nd spark within 10 min; Q4 cites non-score reason |
| **VS-3** | End of Phase E | Calm identity + audio | Full emotional contract? | ≥70% "calm" or "hope" in post; CEO 5→5 question yes |
| **VS-4** | Pre-external show | Slice tagged | Disappearance + Product | Meridian invisible; Product rubric ≥8/10 facilitator avg |
| **GREENLIGHT** | Vertical Slice complete | Tagged build | Hope Contract earned next investment? | **GREEN** continue · **YELLOW** revise · **RED** stop (CEO Amendment 2) |

**On fail:** Evidence → Explain → Hypothesize → **Change ONE thing** → re-gate.  
**Do not** proceed to next Phase until **gate owner** (EP) releases.

**Frozen during gates:** Constitution · emotional contract · **core rules** (4 elements, deterministic cascade).

---

## SECTION 9 — Scope protection

### Likely temptations — DO NOT BUILD YET

| Temptation | Why it will appear | Response |
|---|---|---|
| "Just add a shop between boards" | Feels like progression | Post-slice; violates VS boundary |
| "One more element" | Content excitement | Frozen four elements |
| "Full descent of 12 trials" | Feels like real game | Slice = 5–10 min, not 30 |
| "Unlock system for variety" | Retention anxiety | Constitution §11 |
| "Daily challenge" | Virality | Product unproven externally |
| "Better particles" | Juice dopamine | World; after VS-2 |
| "Story text about observatory" | Meridian drift | DNA not fantasy |
| "Rewrite in Unity for future" | Tech anxiety | Pick stack once in A1 |
| "Multiplayer / share replay" | Social | Post-slice |
| "Tutorial skippable 5-screen" | Fear of confusion | VS-1 decides **one** onboarding change |
| "Balance Crystal properly across meta" | Phase 4 debt | One slice tuning pass only |
| "Achievements" | Dopamine | Post-slice |
| "Analytics dashboard" | Metrics | Minimal logging OK; no dashboard |

### Scope protection rule

Any addition requires written answer:

1. Which constitutional principle?
2. Which **VS gate** does it unblock?
3. Product or World bucket?
4. What **one thing** gets cut if we add this?

If gate answer is "none" — **reject**.

---

## SECTION 10 — CEO review: 200 hours investment

**Context:** Greg has ~200 hours. Not calendar — **effort allocation**. Goal: maximize probability VS-3 pass and external-ready slice.

### Recommended allocation

| Category | % | Hours (~) | Why |
|---|---|---|---|
| **Gameplay Feel (cascade + interaction)** | **35%** | **70** | Product #1; VS-1/VS-2 live here; hope frontier is the contract |
| **Testing & evidence** | **20%** | **40** | Run Protocol sessions, aggregate, **one-variable** fixes — evidence-driven culture |
| **UI (whisper shell + onboarding)** | **15%** | **30** | First minute + credits timing; cheap vs feel but gates 5→5 |
| **Art (minimum calm identity)** | **12%** | **24** | Slate, glow, shapes — **not** environment illustration rabbit hole |
| **Audio (minimum set)** | **8%** | **16** | Bind to step log after feel proven; high ROI at curtain |
| **Polish / integration pass** | **5%** | **10** | M8 — only after VS-2 trending pass |
| **Performance / stability** | **3%** | **6** | Target devices; fix blockers only |
| **Refactoring** | **1%** | **2** | Only if sim/renderer split debt blocks gates |
| **Documentation** | **1%** | **2** | Gate logs, hypothesis records — not design docs |

### Why this split

- **Gameplay Feel 35%:** Hope Pass proved mechanic in HTML; slice fails if production build loses hope. Greg's time should **bias to playing, tuning timing, watching Protocol tapes** — not building meta.
- **Testing 20%:** Constitution says evidence over optimization. **40 hours of facilitator time** (Greg or recruited testers) is worth more than 40 hours of particles.
- **UI 15%:** Small surface area; high impact on minute 1 and §9 curtain call.
- **Art 12%:** Minimum viable calm — **stop at disappearance test**, not illustration portfolio.
- **Audio 8%:** After cascade timing stable; emotional landing at low cost.
- **Polish 5%:** Reserved — **earn it** with VS-2 pass, don't pre-spend.
- **Refactoring 1%:** Slice is throwaway-safe if sim/log pattern clean; don't gold-plate architecture.

### What Greg should NOT spend 200 hours on

- Meta systems · content authoring · marketing · full OST · engine rewrite · lore · multiple platforms day one

### Success definition for 200 hours

**VS-3 passed** + at least **5 external Protocol v1 sessions** logged + build Greg is **willing to send to one trusted outsider** with no explanation beyond: *"Place runes, tap one to spark."*

---

## Approval checklist

- [x] CEO approves this plan (2026-06-29)
- [ ] EP approves evidence gates VS-1/2/3 thresholds (N testers)
- [ ] Creative Director approves art/audio minimum lists
- [x] **A1 tech stack** decision recorded — `glyph/README.md`
- [x] Hope Pass remains frozen as regression reference
- [x] First implementation task **A2 simulation kernel** — in progress (`glyph/src/simulation.js`)
- [x] **VS-FEELING.md** created (CEO Amendment 3)

---

## Final word

The Vertical Slice is **not** GLYPH the product.

It is **GLYPH the proof** — that a stranger in five minutes feels **calm**, **intelligent**, and **hopeful enough to spark again**.

Build the performance. Let the Meridian Room whisper. Protect the scope. Test before you polish.

*Approved. Building.*

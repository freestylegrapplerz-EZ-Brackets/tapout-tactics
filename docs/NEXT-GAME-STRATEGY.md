# Next-Game Strategy: Concept Analysis & Game Vision

*Written from the perspective of a veteran indie designer / creative director / mobile product strategist. The goal is not the most technically impressive game — it is the most **addictive, replayable, commercially viable** game a solo developer can realistically **finish and launch** using AI tools.*

---

## 0. Reframing your assumptions (read this first)

Your instincts are good but I want to sharpen them, because the framing decides everything downstream.

**Your stated lesson:** "Niche audiences and complex artwork slow development."

**The deeper, more useful version:** The thing that kills solo developers is **content-heavy design**, not art per se. A game where *every unit of fun requires a bespoke asset* (a new animation, a new hand-drawn level, a new illustrated character) scales linearly with developer hours and dies. A game where *the rules generate the content* (synergies, procedural runs, number systems) scales exponentially with player enjoyment for almost no extra art.

- Vampire Survivors reuses a tiny pool of sprites. The *combinations* are the content.
- Balatro is ~150 cards/jokers drawn as flat icons. The *synergies* are the content.
- 2048 has **zero** art. The *math* is the content.

So the rule isn't "avoid art." It's: **build systemic games where rules generate replayability, and use art only as flat, reusable icons** — exactly the kind of asset AI image tools are *good* at (single clean objects, icons, items) and bad at (two entangled human bodies in a kimura, which is your current Tapout Tactics pain).

**Three assumptions I'm going to push back on directly:**

1. **"My next project should be a brand-new game (e.g. Rise of a Champion)."** A fighter/athlete career game is *adjacent to Tapout Tactics* and walks straight back into the same art/animation trap. Building it splits your focus and re-incurs the exact cost you just learned to avoid. I rank it last for that reason.

2. **"Mobile is the target."** Be clear-eyed: the F2P mobile market is the single hardest place on earth for a solo dev to *launch successfully*. Discoverability is pay-to-win (you compete on user-acquisition ad spend you don't have), and retention/monetization benchmarks are brutal. The realistic solo success pattern in 2024–2026 is **Steam-first premium roguelike** (Balatro, Luck be a Landlord, Brotato all started/thrived on PC/Steam), *then* port to mobile once it's proven and funded. So I optimize for "systemic roguelike that ships on Steam premium first, mobile port second" — it's still mobile-shaped (one-thumb, short sessions), but it doesn't depend on winning an ad-auction arms race on day one.

3. **"Most addictive = best."** Addictive without *finishable* is worthless. I am weighting **"can a solo dev actually ship this"** above raw fun, exactly as you asked.

---

## Part 1 — Concept Analysis

I'll analyze your five, plus two stronger contenders I'm injecting into the comparison (as you invited). Each concept's interpretation is stated explicitly, since several were just titles.

### Scoring rubric (so the ranking isn't "preference")

Each concept is scored 1–10 on six axes, then weighted toward your real goal:

| Axis | Weight | Why |
|---|---|---|
| Solo finishability | ×3 | The #1 predictor of success for a solo dev |
| Commercial / launch viability | ×2 | Will it actually find an audience & sell |
| Replayability / retention | ×2 | The engine of long-term revenue |
| Art feasibility with AI | ×2 | Directly addresses your bottleneck |
| Monetization | ×1 | Captured value |
| Viral potential | ×1 | Free user acquisition |

Max score = 110.

---

### 1. Treasure Tower
*Interpretation: a vertical climb/loot game — ascend procedurally generated tower floors, fight/loot, upgrade gear, prestige and push higher.*

- **Core loop:** Climb floor → fight/loot → upgrade → push higher → die/prestige → repeat with permanent gains.
- **Why players keep playing:** "One more floor," loot dopamine, numbers-go-up gear progression.
- **Viral potential:** Medium — big-climb / lucky-drop clips are shareable but not inherently funny.
- **Mobile market potential:** Strong — vertical orientation, one-hand play, snackable runs.
- **Art complexity:** Medium — needs item icons, enemy icons, tower tilesets. AI handles items/icons well; **no body animation required**.
- **Programming complexity:** Medium — procedural floors, loot tables, balancing curves.
- **Replayability:** **7/10** — high if build variety is real; generic if loot is flat.
- **Monetization:** Strong — idle/gacha-friendly (skip timers, loot boxes, double rewards, ad-for-loot).
- **Solo feasibility:** 7/10.
- **Risks:** Crowded genre with no built-in identity; needs a sharp hook; balancing depth is real work.
- **Long-term expansion:** New biomes, gear sets, seasonal towers, prestige layers — solid runway.

**Score: 73/110** — Finish 7×3, Viability 6×2, Replay 7×2, Art 7×2, Monet 7, Viral 5.

---

### 2. Infinite Elevator
*Interpretation (strongest framing): a Reigns-style encounter game — you operate an endless elevator; each floor is a passenger/event/decision; manage resources; go as high as you can; meta unlocks. (Could also be a pure endless-ascent arcade game; the encounter framing is far stronger, so I score that.)*

- **Core loop:** Doors open → passenger/event → choose (swipe/tap) → consequences ripple your resources → ascend → push for a high floor → run ends → meta unlock.
- **Why players keep playing:** Curiosity ("what's on the next floor?"), narrative/situational variety, run-to-run differences.
- **Viral potential:** Medium-high — funny/absurd events screenshot and share well.
- **Mobile market potential:** Excellent — pure swipe/tap, one hand, perfect short sessions.
- **Art complexity:** **Low** — icon/portrait/text driven. AI is *genuinely strong* at single character portraits and item icons (the opposite of grappling tangles).
- **Programming complexity:** Low-to-medium — an event/flag system + content pipeline. The real bottleneck is **writing lots of events** — which is *exactly* what AI text tools accelerate. Strong AI-leverage match.
- **Replayability:** **6–7/10** — narrative content gets "seen." Mitigate with systemic/randomized events + run-modifying builds.
- **Monetization:** Medium — cosmetics, event/expansion packs, ad-gating. Narrative games monetize *weaker* than systemic ones (once you've seen the content, you stop).
- **Solo feasibility:** 8/10 — very low tech risk.
- **Risks:** Content burnout & repetition; novelty wears off; weaker long-tail retention/monetization than an engine-builder.
- **Long-term expansion:** Themed floor packs, recurring characters, branching meta-arcs.

**Score: 76/110** — Finish 8×3, Viability 6×2, Replay 6×2, Art 8×2, Monet 5, Viral 7.

---

### 3. Growing Planet
*Interpretation: an idle/incremental terraforming game — generate resources, evolve a planet through visual stages (barren rock → water → life → civilization → spacefaring), prestige to restart with multipliers.*

- **Core loop:** Generate resource → buy generators/upgrades → unlock next planet stage → hit a wall → prestige for multipliers → climb faster → repeat.
- **Why players keep playing:** Incremental dopamine, visual transformation milestones, prestige loops, **offline progress that pulls you back** (the idle retention superpower).
- **Viral potential:** Medium — satisfying transformation timelapses; not inherently social.
- **Mobile market potential:** Excellent — idle is mobile-*native*; thrives on background/offline play and notifications.
- **Art complexity:** **Low-to-medium** — one planet rendered in discrete stages + particle effects + upgrade icons. Extremely asset-light; could even be procedural/shader-driven. No animation rigs.
- **Programming complexity:** Medium — big-number math, prestige curves. The genre is well-understood; the *real* skill is **tuning the progression curve** (this is where idle games live or die).
- **Replayability:** **7/10** — prestige loops are inherently replayable but can tip into grind.
- **Monetization:** **Strong (9/10)** — idle is one of the top-monetizing mobile genres: time-skips, auto-collectors, double-offline, ad-for-boost. Excellent ad+IAP fit.
- **Solo feasibility:** 8/10 — a *proven* solo genre (many solo idle hits).
- **Risks:** Very saturated; retention hinges entirely on a tuned curve + content cadence; the existential question is "is it *fun* or just numbers?" — it needs a real identity/hook to stand out.
- **Long-term expansion:** Multiple planets → solar systems → galaxy meta; ascension layers; events. **Near-infinite content runway** with minimal new art.

**Score: 84/110** — Finish 8×3, Viability 8×2, Replay 7×2, Art 8×2, Monet 9, Viral 5. *(Strongest of your original five.)*

---

### 4. Dungeon Architect
*Interpretation: a build-and-defend game — design a dungeon, place traps/monsters, waves of heroes invade, earn resources, expand and optimize (Dungeon Keeper × tower defense).*

- **Core loop:** Design layout → place traps/monsters → heroes invade → watch the sim → earn resources → upgrade/expand → harder waves.
- **Why players keep playing:** Creativity + optimization; the joy of watching your build perform; meta unlocks.
- **Viral potential:** Medium-high — clever/devious builds are very shareable.
- **Mobile market potential:** Medium — building UIs are fiddly on small screens; better on PC/tablet.
- **Art complexity:** **Medium-high** — tiles, multiple monster types, hero types, traps; AI can do tiles/icons but variety compounds, and real-time combat risks re-introducing animation needs.
- **Programming complexity:** **High** — pathfinding, enemy AI, simulation, wave balancing. The heaviest of your five by a wide margin.
- **Replayability:** **8/10** — creative sandbox + roguelike potential is genuinely deep.
- **Monetization:** Medium-strong — content packs, cosmetics, expansions.
- **Solo feasibility:** **5/10** — easy to *start*, very hard to *finish and balance*. Classic scope-creep death trap.
- **Risks:** Scope creep, simulation complexity, balancing nightmare, awkward mobile UI.
- **Long-term expansion:** Huge (themes, hero types, shareable builds) — but each expansion is *expensive* to make.

**Score: 65/110** — Finish 5×3, Viability 6×2, Replay 8×2, Art 5×2, Monet 6, Viral 6.

---

### 5. Rise of a Champion
*Interpretation: a fighter/athlete career game — create a fighter, train stats, fight matches, climb rankings, unlock moves and a career arc.*

- **Core loop:** Train (stats) → fight → win/lose → earn → upgrade → climb rankings → title shot.
- **Why players keep playing:** Career arc, stat optimization, rivalry/narrative pull.
- **Viral potential:** Low-medium.
- **Mobile market potential:** Medium-strong *if* it's a management/text sim; poor if it's an action game.
- **Art complexity:** **This is a fork in the road.** As an **action/fighting game it re-creates the exact BJJ art + animation trap you're trying to escape.** As a **pure text/stat manager** (boxing/MMA manager style) art is low. The framing decides survival.
- **Programming complexity:** Medium (as a stat/sim manager); high (as an action game).
- **Replayability:** **6/10** — career sims are often "play once or twice"; needs roguelike/randomized careers to extend.
- **Monetization:** Medium — energy/training timers, cosmetics.
- **Solo feasibility:** 6/10 as a manager, 4/10 as an action game.
- **Risks:** **Repeats your current trap**, is **adjacent to Tapout Tactics** (so it competes with your live project instead of diversifying), and career sims have weak long-tail retention.
- **Long-term expansion:** Multiple sports/disciplines, dynasty mode.

**Score: 62/110** — Finish 6×3, Viability 5×2, Replay 6×2, Art 6×2, Monet 6, Viral 4. *(Lower still if built as an action game.)*

---

### + Injected Contender A — Symbol-Synergy Roguelike
*The "engine-builder" pattern: a grid of symbols/tiles that interact via adjacency and type to score against an escalating target. Think Luck be a Landlord / Balatro. Both were built by solo devs with flat icon art.*

- **Core loop:** Place/draw symbols → adjacency & type rules trigger combos → score → hit the escalating target → spend earnings in a shop on new symbols/upgrades/rule-benders → snowball → run ends → meta unlock.
- **Why players keep playing:** **Build discovery** and synergy dopamine — the holy grail of replayability. "One more run" is structural, not bolted on.
- **Viral potential:** **High** — broken-combo clips ("look what my build did") are the most shareable content in gaming right now.
- **Mobile market potential:** Excellent — turn-based, one-thumb, fully pausable.
- **Art complexity:** **Very low** — clean icons/symbols only; AI generates these trivially and consistently; **zero animation**.
- **Programming complexity:** Medium — the engine is systemic but **turn-based and deterministic**, which is very tractable solo. The hard part is content/balance, which is *iterative tuning*, not hard tech.
- **Replayability:** **9/10**.
- **Monetization:** Medium-strong — cosmetics, symbol/expansion packs, season pass, ad-for-reroll. Ethical *and* effective.
- **Solo feasibility:** **9/10** — *literally proven* by solo devs (Balatro = one person; Luck be a Landlord = one person).
- **Risks:** Genre is heating up — needs a distinct hook/theme; balance is ongoing.
- **Long-term expansion:** Endless symbol packs, themed "classes," daily seeds, modes — the best content-per-art-hour ratio in games.

**Score: 96/110** — Finish 9×3, Viability 8×2, Replay 9×2, Art 10×2, Monet 7, Viral 8.

---

### + Injected Contender B — Abstract Auto-Survivor
*Vampire Survivors built with deliberately abstract/geometric art (you are a glowing orb; enemies are shapes) so the art bottleneck disappears entirely.*

- **Core loop:** Auto-attack while you move to dodge → survive waves → level up → draft an upgrade → builds snowball → boss/timer → meta unlock.
- **Why players keep playing:** Power-fantasy snowball + build variety + short runs.
- **Viral potential:** **High** — screen-filling bullet-hell chaos clips.
- **Mobile market potential:** Strong — one thumb to move, attacks are automatic.
- **Art complexity:** **Low** if abstract (orbs, shapes, particles) — *sidesteps the art trap*; AI + particle systems suffice. Minimal animation.
- **Programming complexity:** **Medium-high** — hundreds of entities, collision/performance on mobile, many interacting upgrades. The heaviest of my two injected picks (but still proven-solo: Brotato, etc.).
- **Replayability:** **9/10**.
- **Monetization:** Medium — character/skin unlocks, ad-for-revive/double, content packs.
- **Solo feasibility:** 7–8/10.
- **Risks:** Performance/optimization, genre saturation, and "game feel/juice" is genuinely hard to nail.
- **Long-term expansion:** Characters, maps, weapons, modes.

**Score: 85/110** — Finish 7×3, Viability 8×2, Replay 9×2, Art 8×2, Monet 6, Viral 8.

---

## Part 2 — Ranking (by likelihood a solo dev finishes AND launches successfully)

| Rank | Concept | Score | One-line verdict |
|---|---|---|---|
| 🥇 1 | **Symbol-Synergy Roguelike** *(injected)* | **96** | Best replay-per-art-hour ratio in existence; proven solo; the clear winner. |
| 🥈 2 | **Abstract Auto-Survivor** *(injected)* | **85** | Insanely retentive, art-light if abstract; heavier engineering/perf risk. |
| 🥉 3 | **Growing Planet** *(idle)* | **84** | Best of your original five; top monetization; needs a real identity to escape saturation. |
| 4 | **Infinite Elevator** *(Reigns-like)* | **76** | Cheap to build, charming, but weaker retention/monetization once content is seen. |
| 5 | **Treasure Tower** | **73** | Solid and shippable, but generic without a sharp hook. |
| 6 | **Dungeon Architect** | **65** | Deepest sandbox, but high tech + scope risk; the classic solo-dev graveyard. |
| 7 | **Rise of a Champion** | **62** | Re-enters your art/animation trap and overlaps Tapout Tactics. Avoid for now. |

**Among your original five only:** Growing Planet > Infinite Elevator > Treasure Tower > Dungeon Architect > Rise of a Champion.

**The honest headline:** none of your five is *wrong*, but the **systemic engine-builder roguelike** beats all of them on the metric you actually care about. That's the strongest concept I discovered during analysis, and it's what the new ideas below converge on — not by coincidence, but because it's the optimal shape for your exact constraints.

---

## Part 3 — Ten new original concepts

All meet the bar: understandable in <10 seconds, highly addictive, broad audience, minimal (flat/icon) art, strong progression, mobile-shaped, solo-buildable with AI. Anchored to your reference games (Vampire Survivors / Balatro / Stack / 2048).

1. **Skillet** — *Balatro meets a cozy kitchen.* Drag ingredient tiles onto a skillet grid; neighbors combine into flavor combos that score points to fill escalating dinner orders. *Feels like:* Balatro + cooking. *Art:* food icons (AI-trivial, universally appealing). **(My pick — full doc below.)**

2. **Prism** — Rotate gem nodes to route a beam of light through targets; roguelike upgrades bend, split, and amplify the beam. *Feels like:* a chill puzzle with a roguelike engine. *Art:* pure geometry + glow shaders (near-zero assets).

3. **Tiny Kingdom** — One card a turn; balance four kingdom meters (gold, faith, army, people) against AI-generated events. *Feels like:* Reigns. *Art:* single card portraits (AI's strong suit).

4. **Number Garden** — Plant numbered seeds that grow and merge in real time; prestige into rarer seeds with new merge rules. *Feels like:* 2048 × idle. *Art:* minimal tiles/sprouts.

5. **Loop Raiders** — An auto-runner on a circular track; you place terrain/enemy/loot tiles on the loop to build your own run. *Feels like:* Loop Hero, mobile-first. *Art:* tiles/icons.

6. **Deck of Dungeons** — A solitaire-style dungeon crawl on a 3×3 card grid: fight, equip, and survive by playing cards; meta unlocks. *Feels like:* Card Crawl × 2048. *Art:* cards.

7. **Overcharge** — A dice-engine roguelike: build a battery of dice and modifiers to power an ever-hungrier city grid. *Feels like:* Luck be a Landlord with dice. *Art:* icons + pips.

8. **Bloomstack** — One-tap stacking, but each block is a module granting synergy bonuses; height is your score, modules are your build. *Feels like:* Stack + roguelike. *Art:* simple textured blocks.

9. **Hex Hive** — Place hex tiles to grow a bee colony; adjacency synergies + idle honey production while away. *Feels like:* a cozy systemic builder. *Art:* hex icons.

10. **Word Engine** — Balatro with letters: build words, then attach "modifier" tiles (double-vowel, combo-chain, etc.) to smash escalating score targets. *Feels like:* Balatro + Scrabble. *Art:* **literally none** — text + UI only; the lowest-risk art profile possible.

**Pattern to notice:** the strongest ideas all collapse into *"systemic engine-builder roguelike with flat icon (or zero) art."* That convergence is the whole strategic point — it's the design shape that maximizes replayability per art-hour, which is the single most important ratio for a solo dev using AI tools.

---

## Part 4 — Game Vision Document: **SKILLET** *(working title)*

*Selected as the single strongest concept: it has the #1-ranked shape (symbol-synergy roguelike), the lowest-risk art profile (food icons — the easiest, most broadly appealing thing AI image tools make), a built-in escalating goal (dinner orders = score targets), and a cozy theme that broadens the audience well beyond hardcore roguelike players (including the large casual/cozy segment that Balatro's abstract theme leaves on the table).*

### Elevator pitch
> **Balatro in a kitchen.** Drag ingredient tiles onto your skillet — neighboring ingredients fuse into flavor combos that score points to complete escalating dinner orders. Every run you draft a wild new pantry, discover broken recipes, and push deeper into the night's menu. One thumb, one minute a round, infinite combos.

### Core loop (one "ticket")
1. An **Order** appears with a target value (escalates each ticket).
2. You hold a small **hand of ingredient tiles** and a 4×4 **skillet grid**.
3. **Place tiles.** Adjacency + type rules fire combos (e.g. *Tomato + Basil = "Caprese" ×2*; *3 peppers in a row = "Spicy Chain" escalating bonus*; *Egg next to anything = "Binds" copies a neighbor*).
4. **Serve.** Combos resolve into a score. Hit the target → advance and earn coins.
5. **Market** between tickets: buy new ingredients, upgrade tiles, buy **Techniques** (persistent rule-benders = the "jokers"), or reroll.
6. Orders escalate; your pantry snowballs; a full run = **a "service" of ~8–12 tickets**.
7. Miss a target → run ends → bank meta XP + unlocks → next run starts fresh with a new draft.

### Progression loop
- **In-run (minutes):** draft pantry → spot a synergy → snowball → survive harder orders. The dopamine is *discovery* — finding a combo the game didn't tell you about.
- **Meta (weeks):** unlock new ingredients, new Techniques, and new **Kitchens** (starting classes that change the base rules — e.g. "Bakery" rewards stacking sweets; "Street Food" rewards speed/cheap tiles). Plus a **Recipe Codex** that tracks every combo you've discovered (collection compulsion), **daily seeds** (retention), and **Heat Levels** (ascension-style difficulty modifiers for hardcore replay).

### Session length
- One ticket: **30–60 seconds.** A full run: **8–15 minutes.** Pausable and resumable at any moment — designed for a bus ride or a coffee break.

### Meta progression
- XP per run → unlock pool (ingredients, Techniques, Kitchens).
- Recipe Codex completion (the "gotta find them all" hook).
- Heat Levels per Kitchen (Balatro's "Ante/Stake" model) for replay depth.
- Daily challenge with a shared seed + leaderboard.

### Art direction
- **Flat, warm, high-contrast icon art.** Each ingredient = one clean icon, generated by AI against a **single fixed style prompt / reference image** for consistency. No characters, no scenes, no animation rigs.
- **Juice over assets:** all "wow" comes from tweens, particle bursts, screen shake, satisfying number pop-ups, and chunky SFX — not from drawn frames. (This is *exactly* how Balatro/2048 feel great with almost no art.)
- Cozy, appetizing palette. The whole game is **icons + UI + numbers + particles** → zero traditional art pipeline, and a complete escape from the grappling/animation trap.

### UI philosophy
- **One thumb, bottom-anchored.** Everything reachable and readable on a phone held in one hand.
- Tap-to-place + drag; instant, legible feedback on *which* combos fired and why (a clear resolve log).
- No menu deeper than two levels. Colorblind-safe palette + shapes. Tactile, immediate, satisfying.

### Monetization strategy
**Premium-first, F2P-port later** (per the Part-0 reality check):
- **Phase 1 (Steam / itch premium):** sell it for a fair one-time price. Proven path for solo systemic roguelikes; no UA arms race; builds a reputation and a wishlist audience.
- **Phase 2 (mobile port):** free with **ethical** rewarded ads (reroll, one "reheat"/revive, double coins) + a one-time **"Chef's Pass"** that removes ads and unlocks cosmetic plating.
- **Ongoing:** seasonal **cosmetic** plate/skin packs; paid **Cuisine Pack** expansions (new ingredients/Techniques/Kitchens). **Never pay-to-win** — sell content, cosmetics, and convenience only. Daily challenge + leaderboard + season cadence drive retention and LTV.

### MVP feature list (the shippable vertical slice)
- 1 starting **Kitchen**, 1 grid size (4×4).
- **~30–40 ingredients** across **5–6 clear synergy families**.
- **~15–20 Techniques** (jokers).
- Order/target escalation curve + coins + **Market** (buy / upgrade / reroll).
- Run structure (8–12 tickets), clear win/lose, meta XP, ~10 unlockables.
- **Recipe Codex** (discovery tracking).
- **Daily seed** challenge.
- Save/resume, settings, full SFX + juice pass, basic run stats.
- Ship on **one platform first** (a polished web/PC build to validate the loop cheaply, then wrap for mobile).

### Expansion roadmap
- **v1.1** — more ingredients/Techniques, achievements, leaderboards.
- **v1.2** — additional **Kitchens** (classes): the single biggest replay multiplier per unit of work.
- **v1.3** — **Heat Levels** (ascension difficulty) for the hardcore retention tail.
- **v1.4** — paid **Cuisine Packs** (Sushi, Bakery, Street Food, BBQ) — primary monetization lever.
- **v1.5** — weekly modifiers/events, seasonal cosmetics, cloud save, one-tap run sharing.
- **Long-term** — community/shared seeds, daily tournaments, full Steam release with mobile cross-progression.

### Recommended tech stack for *you* specifically
You already write vanilla **HTML/CSS/JavaScript** (that's how Tapout Tactics is built). So:
- **Prototype the loop *this week* in JS/Canvas** — you can validate "is the combo discovery fun?" in your existing skillset, fast and free.
- For the **real, shippable build**, move to **Godot 4** (free, first-class 2D/UI, exports to mobile *and* Steam, and AI assistants are good at GDScript). It removes the mobile-packaging and performance headaches you'd hit shipping a serious game in raw web.

---

## Part 5 — What this means for Tapout Tactics (your live project)

Since Tapout Tactics is the repo we're working in, the strategically honest take:

- **Good news: it's already a *card* game.** That's the right shape. Cards/icons are AI-friendly. Your trap is *only* the grappling **pose sprites and technique animations** — not the core design.
- **Recommendation:** stop chasing animated grappling visuals. Lean fully into a **clean card/icon presentation** (position shown as a stylized diagram/icon, not an animated rig). The same "engine-builder / synergy" philosophy from this doc could even *deepen* Tapout Tactics — make card synergies and chains the star, the way jokers are in Balatro.
- **Treat Tapout Tactics as your "learning vehicle"**: finish a tight, art-light version of it, *apply every lesson here*, and let it teach you the systemic-roguelike muscles you'll reuse on Skillet. Don't start "Rise of a Champion" — it's the same trap wearing a new shirt.

---

*Bottom line: build a **systemic engine-builder roguelike with flat icon art**, ship it **premium on PC/Steam first**, then port to mobile. **Skillet** is the strongest specific expression of that for your constraints. And for the project in front of us, push Tapout Tactics toward clean card/icon presentation and synergy-driven depth instead of animation.*

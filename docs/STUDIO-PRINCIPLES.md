# GLYPH — Studio Principles

*Creative principles for the culture of the project. Not mechanics. Not features. Not implementation. These outlive every system we build.*

> **Context:** We are no longer designing systems. We are defining the culture of GLYPH. Every future feature, feedback pass, content pack, and port must survive this wall — or it does not ship.

---

## The three proposed principles — challenged, then affirmed

### Principle 1: The game never lies.

> *No fake suspense. No fake uncertainty. No hidden manipulation. Trust is sacred.*

**Challenge:**

| Objection | Verdict |
|---|---|
| *"Is theatrical timing a lie?"* — An 80ms fuse beat before Spark when the outcome is already determined. | **Not a lie** if it does not misrepresent *what will happen* — only *when you see it*. A stage light dimming before a scene isn't lying about the script. **Lying** is implying the chain *might* stop when code knows it won't. |
| *"Is juice a lie?"* — Visual/audio exaggeration beyond literal simulation. | **Not a lie** if it amplifies **true events** — a real connection can feel bigger without claiming a fake one happened. **Lying** is showing an activation that didn't occur. |
| *"Is hiding the score a lie?"* | **No** — omission of future information is not misrepresentation. Showing a pre-computed final score *would* be lying about the present moment. |
| *"Do tutorials lie by simplifying?"* | **Risk:** oversimplifying interactions ("fire always spreads") teaches false rules. Teach **true rules**, simply — not false rules, conveniently. |
| *"Does difficulty tuning lie?"* — Targets that feel reachable but aren't. | **Gray zone.** Unwinnable hands violate trust. **Hard but fair** is not lying; **unwinnable without telling the player** is. |

**Affirmed — with precision:**

> **The game never lies about causality, outcome, or the player's agency.**
> Staging, timing, and juice may **amplify truth** — they may never **fabricate** it.

---

### Principle 2: Every cascade tells a story.

> *After every run, the player should reconstruct what happened. The board is evidence. Not decoration.*

**Challenge:**

| Objection | Verdict |
|---|---|
| *"What if the cascade is too fast to read?"* | Then we failed the principle — **legibility is mandatory**, not optional. Speed without story is noise. |
| *"What if we clear the board immediately?"* | **Destroys evidence.** Aftermath / afterglow / trace must persist long enough for the story to land. |
| *"Do failures tell a story?"* | **Must.** Cold runes are the story of *"almost."* A failure with no readable cause teaches nothing and kills hope for the next run. |
| *"Does minimal UI conflict with this?"* | No — **the board IS the UI.** Decoration is skins on cells; evidence is fired vs. unfired, path taken, frontier path visible. |

**Affirmed — with precision:**

> **Every cascade must be readable in hindsight without a replay log.**
> The board after Spark is a **crime scene the player investigates** — who fired, who didn't, why the chain stopped. If they can't reconstruct it, we didn't tell a story — we ran a calculation.

---

### Principle 3: Hope must come from agency.

> *Never from randomness. The player hopes because they made a decision. Not because they rolled a die.*

**Challenge:**

| Objection | Verdict |
|---|---|
| *"We defended random hands before Spark (Phase 3/6)."* | **Not a contradiction** — but the principle needs a **scope clause.** Randomness in **setup** (which runes you're dealt) creates variety; **hope during the performance** must come from **placement and Spark choices.** The player hopes because they blocked the stage — not because the deck was kind. |
| *"What about daily seeds?"* | **Fine** — shared puzzle, full agency in performance. |
| *"Can you hope for a good hand?"* | **Weak hope** — lottery hope. Acceptable as *curiosity* between runs ("what will I get?"), **forbidden** as the core cascade emotion. |
| *"Does monetization RNG betray this?"* | **Yes, culturally** — loot boxes, gacha pulls, "reroll for better cards" make hope transactional. Incompatible with this principle regardless of mechanics. |

**Affirmed — with precision:**

> **Hope during the cascade is always hope in one's own decisions.**
> Randomness may vary the **stage** between performances. It may never decide the **performance.**

---

## The complete wall — creative principles for all future development

Organized as **non-negotiables** (never violate), **emotional core** (the hope stack), and **craft** (how we honor the core).

---

### 🚫 NEVER VIOLATE

**1. The game never lies.**
No fake suspense, fake uncertainty, or hidden manipulation. Staging amplifies truth; it never fabricates it.

**2. Hope comes from agency — during the performance.**
The player hopes because they placed the runes and chose the Spark — not because the game rolled a die at resolution.

**3. The player progresses, not the power bar.**
Progression adds breadth and challenge, never permanent strength that makes outcomes untrustworthy. *(Phase 6)*

**4. The director is not a gambler.**
Placement is always meaningful. No RNG board layouts, no resolution luck, no winning without engineering the cascade. *(Phase 1)*

**5. Never decrease hope to increase metrics.**
No timer pressure, no energy gates, no dark patterns, no "watch ad to reroll" that replaces earned hope with purchased hope.

---

### ❤️ THE HOPE STACK — emotional core

**6. Make players hope.**
The design objective. Every decision: *does this increase or decrease hope?*

**7. The explosion is the punctuation mark, not the sentence.**
The sentence is hope — rooting for the frontier. Spectacle serves the sentence; it never replaces it.

**8. The frontier is the lead actor.**
The player's eye follows the edge of propagation — what they're rooting for. Not the score box. Not particles. The wave.

**9. The board is a stage; the player is the director.**
Not a puzzle to solve — a performance to author. Spark is "Action!" The curtain call comes before the reviews. *(Hope doc)*

**10. Grin before optimize.**
If the first response is "how do I min-max?" instead of "come on… one more…," we failed the performance. Delight precedes depth.

**11. Trust is sacred.**
When the chain reaches, the player must believe **they caused it.** Any system that muddies causality — RNG resolution, pay-to-win, opaque rules — violates trust and kills hope.

**12. Every cascade tells a story.**
The board after Spark is evidence. Fired vs. cold. Path taken. Readable without a log. Failures teach; successes celebrate.

---

### 🎬 CRAFT — how we honor the core

**13. Legibility is a feature, not a compromise.**
Every interaction intuitable; every cascade traceable. *Elements explain themselves.* *(Phase 1 Pillar 4)*

**14. One Spark, total chaos — honestly.**
The whole board should be detonatable from one deliberate trigger — but "chaos" must remain **readable chaos**, not noise. *(Phase 1 Pillar 1, refined)*

**15. Predict enough to feel smart; be surprised enough to feel delight.**
The sweet spot is cognitive, not random. Deterministic rules; human limits create the "wow." *(Phase 2)*

**16. The curtain call before the credits.**
Score, targets, and meta feedback come **after** the performance lands — never competing with the frontier during the cascade.

**17. Confirmation feeds hope; hope feeds the next beat.**
Each connection is a micro-"YES!" that renews hope for the next rune — not a flat sequence of identical pops.

**18. Cold runes are hope for the next performance.**
What's left unfired is not failure decoration — it's the **sequel hook.** *"Next time I'll connect those."*

**19. Depth is data, not animation.**
Replayability comes from combinatorial systems — not from bespoke assets per interaction. Protect the solo-dev viability that made this project possible.

**20. If score were hidden, it should still matter.**
The hope pass is the quality gate. Numbers confirm what the player already felt — they don't create the feeling.

---

## What would make future developers accidentally betray the emotional core?

These are the **most likely betrayal paths** — not from malice, but from habit, genre convention, or "standard game design":

| Betrayal | Why it happens | Which principles it breaks |
|---|---|---|
| **Resolution RNG** ("critical hit on cascade") | "Adds excitement" | 1, 2, 3, 4, 11 |
| **Score pop-ups as hero feedback mid-cascade** | "Players need feedback" | 6, 7, 8, 16, 20 |
| **Pre-computed outcome preview** | "QoL for experts" | 1, 6, 15, 20 |
| **Permanent power meta-progression** | "Retention best practice" | 3, 4, 11 |
| **Timers on placement** | "Mobile engagement" | 4, 5, 6, 10 |
| **Particle budget over frontier clarity** | "Juice pass" | 7, 8, 12, 14 |
| **Fake near-miss animations** | "Hollywood moment" | 1, 11 |
| **Dominant strategy left unbalanced** | "Ship content, tune later" | 6, 10 (same play every time = no hope variation) |
| **Onboarding that teaches numbers first** | "Show the score loop" | 7, 10, 12 |
| **F2P reroll / gacha for runes** | "Monetization" | 3, 5, 11 |
| **Real-time / twitch mode** | "Broader appeal" | 4, 6, 8 (destroys deliberate hope) |
| **Clearing board before story lands** | "Fast retry loop" | 12, 16, 18 |
| **Content treadmill instead of system depth** | "Need more stuff" | 19, 6 (novelty without hope) |
| **Store screenshots over in-game truth** | Marketing pressure | 1, 20 |

**The pattern:** Most betrayals come from importing **genre defaults** (RNG excitement, power creep, timer pressure, score-as-feedback) that are **incompatible with a participatory hope engine.**

When in doubt: **would this make a player watch numbers instead of root for the frontier?** If yes — betrayal.

---

## The wall — print these

*Short enough to hang. Long enough to judge every decision.*

```
GLYPH STUDIO PRINCIPLES

1.  THE GAME NEVER LIES.
2.  MAKE PLAYERS HOPE.
3.  THE EXPLOSION IS PUNCTUATION — NOT THE SENTENCE.
4.  THE FRONTIER IS THE LEAD ACTOR.
5.  THE BOARD IS A STAGE. THE PLAYER IS THE DIRECTOR.
6.  HOPE COMES FROM AGENCY — NOT FROM RANDOMNESS AT SPARK.
7.  EVERY CASCADE TELLS A STORY. THE BOARD IS EVIDENCE.
8.  TRUST IS SACRED. IF THEY CAUSED IT, THEY MUST KNOW THEY CAUSED IT.
9.  THE CURTAIN CALL BEFORE THE CREDITS. PERFORMANCE FIRST — SCORE AFTER.
10. GRIN BEFORE OPTIMIZE.
11. THE PLAYER PROGRESSES — NOT THE POWER BAR.
12. IF SCORE WERE HIDDEN, IT SHOULD STILL MATTER.
```

Twelve lines. Every feature survives the list or it doesn't ship.

---

## Culture statement

GLYPH is not a genre exercise. It is a **trust contract** between the game and a player who built something and wants to know if it works.

We do not manipulate them into feeling something false.
We do not ask them to hope in luck instead of hope in themselves.
We do not rush past the moment they lean forward and whisper *"come on."*

We stage honest performances on honest stages.
We let the frontier be the star.
We let pride land before the numbers.

**This culture outlives every mechanic.**
When the runes change, the classes change, the platform changes — these principles remain.

*We are defining the culture of the project. Build accordingly.*

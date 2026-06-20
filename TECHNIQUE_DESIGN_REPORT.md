# Tapout Tactics Technique Database Design Report

Date: 2026-06-16

## Scope

This report audits `techniques.js` as a design foundation for future cards, skill trees, animation planning, and collection systems.

No gameplay rules were changed for this report.

## Database Snapshot

- Total techniques: 103
- Current purpose: future design data only, not active match balance
- Categories represented: Standing, Takedown, Throw, Guard, Passing, Pins, Escapes, Sweeps, Submissions, Leg Locks, Counters, Transitions, Scramble
- Rarity spread: 27 Common, 33 Rare, 29 Epic, 14 Legendary
- Unlock spread: 25 Base, 21 Early, 31 Mid, 26 Late

## Technique Index

| Technique | Starting Position | Ending Position | Category | Archetypes | Stamina | Risk | Reward |
|---|---|---|---|---|---:|---:|---:|
| Standing Neutral | Match Start, Standing | Hand Fighting, Collar Tie | Standing / Position | Wrestler, Back Hunter | 0 | 1 | 1 |
| Wrist Control | Standing, Bottom Guard | Arm Drag, Russian Tie | Standing / Hand Fighting | Wrestler, Back Hunter, Guard Player | 1 | 1 | 2 |
| Collar Tie | Standing | Snapdown, Duck Under | Standing / Hand Fighting | Wrestler, Pressure Passer, Back Hunter | 1 | 1 | 2 |
| Inside Tie | Standing, Collar Tie | Body Lock, Knee Tap | Standing / Hand Fighting | Wrestler, Pressure Passer | 1 | 1 | 2 |
| Pummeling | Standing, Collar Tie | Underhook, Overhook | Standing / Hand Fighting | Wrestler, Pressure Passer | 1 | 1 | 2 |
| Underhook | Standing, Pummeling | Body Lock, Knee Tap | Standing / Clinch Control | Wrestler, Pressure Passer, Back Hunter | 1 | 2 | 3 |
| Whizzer | Standing, Single Leg Entry | Sprawl, Front Headlock | Standing / Counter | Wrestler, Back Hunter | 1 | 2 | 3 |
| Standing Arm Drag | Standing, Wrist Control | Back Take, Single Leg | Standing / Setup | Back Hunter, Wrestler, Guard Player | 2 | 2 | 4 |
| Snapdown | Standing, Collar Tie | Front Headlock, Guillotine | Standing / Setup | Wrestler, Back Hunter | 2 | 2 | 4 |
| Level Change | Standing, Collar Tie | Double Leg Entry, Single Leg Entry | Standing / Setup | Wrestler | 1 | 1 | 3 |
| Double Leg | Standing, Level Change | Top Half Guard, Top Guard | Takedown / Shot | Wrestler | 2 | 3 | 4 |
| Blast Double | Standing, Level Change | Side Control, Top Half Guard | Takedown / Power Shot | Wrestler | 4 | 4 | 5 |
| Single Leg | Standing, Level Change | Top Half Guard, Top Guard | Takedown / Shot | Wrestler, Leg Locker, Back Hunter | 2 | 2 | 4 |
| High Crotch | Standing, Level Change | Double Leg, Tree Top | Takedown / Shot | Wrestler | 2 | 3 | 4 |
| Ankle Pick | Standing, Collar Tie | Top Guard, Top Half Guard | Takedown / Off-Balance | Wrestler, Pressure Passer | 2 | 2 | 3 |
| Knee Tap | Standing, Underhook | Top Half Guard, Side Control | Takedown / Clinch | Wrestler, Pressure Passer | 2 | 2 | 4 |
| Body Lock Trip | Standing, Body Lock | Side Control, Top Half Guard | Takedown / Clinch | Wrestler, Pressure Passer | 3 | 3 | 4 |
| Inside Trip | Standing, Body Lock | Top Guard, Top Half Guard | Takedown / Trip | Wrestler, Pressure Passer | 2 | 2 | 3 |
| Outside Trip | Standing, Body Lock | Side Control, Top Half Guard | Takedown / Trip | Wrestler, Pressure Passer | 2 | 3 | 4 |
| Duck Under | Standing, Collar Tie | Back Control, Mat Return | Takedown / Back Take | Back Hunter, Wrestler | 2 | 2 | 5 |
| Mat Return | Back Body Lock, Duck Under | Top Turtle, Back Control | Takedown / Back Control | Wrestler, Back Hunter | 3 | 3 | 5 |
| Hip Toss | Standing, Overhook | Side Control, Mount | Throw / Hip Throw | Wrestler, Pressure Passer | 3 | 4 | 5 |
| Suplex | Back Body Lock, Body Lock | Side Control, Top Half Guard | Throw / Big Throw | Wrestler | 4 | 5 | 5 |
| Fireman's Carry | Standing, Wrist Control | Side Control, Top Turtle | Throw / Sacrifice Throw | Wrestler | 3 | 4 | 4 |
| Guard Pull | Standing, Collar Tie | Closed Guard, Open Guard | Guard / Entry | Guard Player, Leg Locker | 1 | 2 | 3 |
| Closed Guard | Guard Pull, Bottom Guard | Armbar From Closed Guard, Triangle From Closed Guard | Guard / Position | Guard Player | 0 | 1 | 3 |
| Open Guard | Guard Pull, Closed Guard Opened | Tripod Sweep, De La Riva | Guard / Position | Guard Player, Leg Locker | 0 | 2 | 4 |
| Butterfly Guard | Open Guard, Bottom Guard | Butterfly Sweep, Arm Drag | Guard / Seated Guard | Guard Player, Leg Locker, Back Hunter | 1 | 2 | 4 |
| Bottom Half Guard | Bottom Guard, Mounted Escape | Old School Sweep, Underhook | Guard / Position | Guard Player, Leg Locker, Wrestler | 0 | 3 | 3 |
| Top Half Guard | Double Leg, Single Leg | Knee Slice, Backstep Pass | Passing / Position | Pressure Passer, Wrestler | 0 | 2 | 4 |
| De La Riva Guard | Open Guard | De La Riva Sweep, Back Take | Guard / Open Guard | Guard Player, Leg Locker | 1 | 3 | 4 |
| Spider Guard | Open Guard | Triangle, Omoplata | Guard / Open Guard | Guard Player | 2 | 3 | 4 |
| Lasso Guard | Open Guard, Spider Guard | Triangle, Omoplata | Guard / Open Guard | Guard Player | 2 | 3 | 4 |
| X-Guard | Open Guard, Single Leg X | Technical Stand Up, Sweep | Guard / Open Guard | Guard Player, Leg Locker | 2 | 3 | 5 |
| Single Leg X | Open Guard, Butterfly Guard | Ashi Garami, Straight Ankle Lock | Leg Locks / Entry Position | Leg Locker, Guard Player | 2 | 3 | 5 |
| Knee Slice Pass | Top Half Guard, Top Guard | Side Control, Knee On Belly | Passing / Pass | Pressure Passer, Wrestler | 2 | 2 | 4 |
| Torreando Pass | Top Guard, Open Guard | Side Control, Knee On Belly | Passing / Pass | Pressure Passer | 2 | 2 | 4 |
| Leg Drag | Top Guard, Open Guard | Side Control, Back Exposure | Passing / Pass | Pressure Passer, Back Hunter | 2 | 3 | 5 |
| Body Lock Pass | Top Guard, Top Half Guard | Side Control, Mount | Passing / Pressure Pass | Pressure Passer, Wrestler | 3 | 3 | 5 |
| Backstep Pass | Top Half Guard | Side Control, Leg Drag | Passing / Half Guard Pass | Pressure Passer, Leg Locker | 2 | 3 | 4 |
| Smash Pass | Top Guard, Open Guard | Side Control, Mount | Passing / Pressure Pass | Pressure Passer | 3 | 3 | 5 |
| Knee On Belly | Side Control, Torreando Pass | Mount, Armbar | Pins / Control Position | Pressure Passer, Back Hunter | 1 | 2 | 4 |
| Side Control | Pass, Throw | Mount, Knee On Belly | Pins / Control Position | Pressure Passer, Back Hunter | 0 | 1 | 4 |
| Mount | Side Control, Knee On Belly | Armbar From Mount, Arm Triangle | Pins / Dominant Position | Pressure Passer, Guard Player | 0 | 1 | 5 |
| Back Control | Arm Drag, Duck Under | Rear Naked Choke, Bow And Arrow | Pins / Dominant Position | Back Hunter, Wrestler | 0 | 1 | 5 |
| Turtle | Sprawl, Technical Bridge | Back Control, Front Headlock | Scramble / Defensive Position | Back Hunter, Wrestler | 0 | 4 | 3 |
| North South | Side Control, Sprawl | North South Choke, Kimura | Pins / Control Position | Pressure Passer | 1 | 2 | 4 |
| Front Headlock | Snapdown, Sprawl | Guillotine, D'Arce | Pins / Control Position | Wrestler, Back Hunter | 0 | 2 | 5 |
| Bridge Escape | Mounted | Bottom Half Guard, Top Guard | Escapes / Mount Escape | Wrestler, Guard Player | 2 | 2 | 3 |
| Elbow Escape | Mounted | Bottom Half Guard, Bottom Guard | Escapes / Mount Escape | Guard Player | 2 | 1 | 3 |
| Hip Escape | Mounted, Under Side Control | Bottom Half Guard, Bottom Guard | Escapes / Pin Escape | Guard Player, Leg Locker | 1 | 1 | 3 |
| Reguard | Bottom Half Guard, Under Side Control | Bottom Guard, Open Guard | Escapes / Guard Recovery | Guard Player, Leg Locker | 2 | 1 | 3 |
| Ghost Escape | Under Side Control | Turtle, Back Take | Escapes / Side Control Escape | Back Hunter, Guard Player | 3 | 3 | 5 |
| Technical Bridge | Mounted, Under Side Control | Turtle, Standing | Escapes / Scramble Escape | Back Hunter, Wrestler | 2 | 3 | 4 |
| Hip Bump Sweep | Closed Guard, Bottom Guard | Mount, Top Guard | Sweeps / Closed Guard | Guard Player | 2 | 2 | 4 |
| Scissor Sweep | Closed Guard, Bottom Guard | Top Guard, Mount | Sweeps / Closed Guard | Guard Player | 2 | 2 | 4 |
| Flower Sweep | Closed Guard, Bottom Guard | Mount | Sweeps / Closed Guard | Guard Player | 2 | 2 | 5 |
| Butterfly Sweep | Butterfly Guard, Bottom Guard | Top Half Guard, Top Guard | Sweeps / Butterfly Guard | Guard Player, Leg Locker | 2 | 2 | 4 |
| Old School Sweep | Bottom Half Guard | Top Half Guard, Top Guard | Sweeps / Half Guard | Guard Player, Leg Locker, Wrestler | 2 | 3 | 4 |
| Tripod Sweep | Open Guard | Top Guard, Standing | Sweeps / Open Guard | Guard Player | 2 | 2 | 4 |
| De La Riva Sweep | De La Riva Guard | Top Guard, Back Take | Sweeps / Open Guard | Guard Player, Leg Locker | 3 | 3 | 5 |
| Armbar From Closed Guard | Closed Guard, Bottom Guard | Tapout | Submissions / Arm Lock | Guard Player | 3 | 3 | 5 |
| Armbar From Mount | Mount | Tapout | Submissions / Arm Lock | Pressure Passer, Guard Player | 3 | 3 | 5 |
| Armbar From Back Control | Back Control | Tapout | Submissions / Arm Lock | Back Hunter | 3 | 3 | 5 |
| Flying Armbar | Standing, Collar Tie | Tapout, Bottom Guard | Submissions / Flying Attack | Guard Player, Back Hunter | 4 | 5 | 5 |
| Triangle From Closed Guard | Closed Guard, Bottom Guard | Tapout | Submissions / Choke | Guard Player | 3 | 3 | 5 |
| Mounted Triangle | Mount | Tapout | Submissions / Choke | Guard Player, Pressure Passer | 4 | 3 | 5 |
| Flying Triangle | Standing, Collar Tie | Tapout, Bottom Guard | Submissions / Flying Attack | Guard Player | 4 | 5 | 5 |
| Standing Guillotine | Standing, Front Headlock | Tapout, Bottom Guard | Submissions / Choke | Wrestler, Guard Player, Back Hunter | 3 | 3 | 5 |
| Guillotine From Guard | Bottom Guard, Closed Guard | Tapout | Submissions / Choke | Guard Player, Wrestler | 3 | 3 | 5 |
| Rear Naked Choke | Back Control | Tapout | Submissions / Choke | Back Hunter | 3 | 2 | 5 |
| Arm Triangle | Mount, Side Control | Tapout | Submissions / Choke | Pressure Passer, Wrestler | 3 | 2 | 5 |
| D'Arce Choke | Front Headlock, Top Half Guard | Tapout | Submissions / Choke | Wrestler, Back Hunter, Pressure Passer | 3 | 3 | 5 |
| Anaconda Choke | Front Headlock, Turtle | Tapout | Submissions / Choke | Wrestler, Back Hunter | 3 | 3 | 5 |
| Kimura From Closed Guard | Closed Guard, Bottom Guard | Tapout, Sweep | Submissions / Shoulder Lock | Guard Player | 3 | 3 | 5 |
| Kimura From Side Control | Side Control, North South | Tapout, Back Take | Submissions / Shoulder Lock | Pressure Passer, Back Hunter | 3 | 2 | 5 |
| Americana | Mount, Side Control | Tapout | Submissions / Shoulder Lock | Pressure Passer | 3 | 2 | 4 |
| Omoplata | Closed Guard, Open Guard | Tapout, Sweep | Submissions / Shoulder Lock | Guard Player | 3 | 3 | 5 |
| North South Choke | North South, Side Control | Tapout | Submissions / Choke | Pressure Passer | 3 | 2 | 5 |
| Ezekiel Choke | Mount, Top Guard | Tapout | Submissions / Choke | Pressure Passer | 3 | 3 | 4 |
| Bow And Arrow Choke | Back Control | Tapout | Submissions / Gi Choke | Back Hunter | 4 | 3 | 5 |
| Ashi Garami | Open Guard, Butterfly Guard | Straight Ankle Lock, Heel Hook | Leg Locks / Entanglement | Leg Locker, Guard Player | 2 | 3 | 5 |
| Straight Ankle Lock | Ashi Garami, Single Leg X | Tapout | Leg Locks / Submission | Leg Locker | 3 | 3 | 5 |
| Inside Heel Hook | Saddle, Inside Sankaku | Tapout | Leg Locks / Submission | Leg Locker | 4 | 5 | 5 |
| Outside Heel Hook | Ashi Garami, Outside Ashi | Tapout | Leg Locks / Submission | Leg Locker | 4 | 5 | 5 |
| Kneebar | Ashi Garami, Backstep | Tapout | Leg Locks / Submission | Leg Locker | 3 | 4 | 5 |
| Toe Hold | Ashi Garami, 50/50 | Tapout | Leg Locks / Submission | Leg Locker | 3 | 4 | 5 |
| Imanari Roll | Standing | Ashi Garami, Heel Hook | Leg Locks / Flying Entry | Leg Locker | 4 | 5 | 5 |
| Saddle / Inside Sankaku | Ashi Garami, Backstep | Inside Heel Hook, Kneebar | Leg Locks / Entanglement | Leg Locker | 3 | 4 | 5 |
| 50/50 | Open Guard, Ashi Garami | Toe Hold, Heel Hook | Leg Locks / Entanglement | Leg Locker, Guard Player | 2 | 3 | 4 |
| Sprawl | Standing, Opponent Shot | Front Headlock, Turtle | Counters / Takedown Counter | Wrestler, Back Hunter | 1 | 1 | 4 |
| Frame | Bottom Guard, Bottom Half Guard | Hip Escape, Reguard | Counters / Pressure Counter | Guard Player, Leg Locker | 1 | 1 | 3 |
| Protect Neck | Back Taken, Caught Front Headlock | Hand Fight, Escape | Counters / Submission Defense | Back Hunter, Wrestler, Guard Player | 1 | 1 | 3 |
| Hand Fight | Back Taken, Caught Front Headlock | Standing, Guard | Counters / Grip Defense | Back Hunter, Leg Locker, Wrestler | 1 | 1 | 3 |
| Posture | Top Guard, Closed Guard | Guard Break, Standing Guard Break | Counters / Guard Defense | Pressure Passer, Wrestler | 1 | 1 | 3 |
| Standing Guard Break | Top Guard, Closed Guard | Open Guard, Torreando | Transitions / Guard Break | Pressure Passer | 2 | 2 | 4 |
| Knee-In-Tailbone Break | Top Guard, Closed Guard | Open Guard, Knee Slice | Transitions / Guard Break | Pressure Passer | 2 | 2 | 3 |
| Go Behind | Front Headlock, Sprawl | Back Control, Side Control | Transitions / Front Headlock Transition | Back Hunter, Wrestler | 2 | 2 | 5 |
| Seatbelt Control | Back Control, Go Behind | Rear Naked Choke, Bow And Arrow | Transitions / Back Control | Back Hunter | 1 | 1 | 5 |
| Hook Retention | Back Control | RNC, Bow And Arrow | Transitions / Back Control | Back Hunter | 1 | 1 | 4 |
| Guard Retention | Bottom Guard, Open Guard | Open Guard, Closed Guard | Transitions / Defense | Guard Player, Leg Locker | 1 | 1 | 3 |
| Technical Stand Up | Open Guard, Butterfly Guard | Standing, Single Leg | Transitions / Escape | Wrestler, Guard Player, Leg Locker | 1 | 2 | 3 |
| Scramble | Failed Shot, Turtle | Standing, Back Control | Transitions / Neutral Chaos | Back Hunter, Wrestler | 1 | 3 | 4 |

## Missing Techniques

The database is wide enough to support early card design, but it is still missing important depth.

### High-Priority Missing Standing And Wrestling

- Russian tie / 2-on-1
- Slide by as its own technique, separate from go-behind
- Snapdown to go-behind
- Front headlock spin behind
- Head outside single
- Low single
- Tree-top finish
- Switch / sit-out
- Granby roll
- Reshot after sprawl
- Whizzer kick / uchi mata counter
- Collar drag
- Arm spin
- Sumi gaeshi
- Tomoe nage

### High-Priority Missing Guard And Sweeps

- Pendulum sweep
- Lumberjack sweep
- Waiter sweep
- X-guard technical stand-up sweep
- Single-leg X sweep
- Reverse De La Riva
- Knee shield half guard
- Deep half guard
- Lockdown / electric chair
- Octopus guard
- Williams guard
- Closed guard clamp
- Overhook guard
- 100 percent sweep

### High-Priority Missing Passing

- X-pass
- Long-step pass
- Shin-pin pass
- Headquarters position
- Weave pass
- Over-under pass
- Double-under pass
- Stack pass
- Folding pass
- Float pass
- Leg pummel pass
- Knee cut with underhook

### High-Priority Missing Escapes And Counters

- Side control underhook escape
- Side control far-side frame escape
- North-south escape
- Turtle sit-out
- Back escape to mat
- Back escape to safe side
- Mount kipping escape
- Submission-specific escapes for armbar, triangle, guillotine, heel hook, ankle lock
- Grip breaks from collar/sleeve/seatbelt
- Counter-armbar
- Counter-triangle
- Counter-kimura roll

### High-Priority Missing Submissions

- Cross collar choke
- Baseball bat choke
- Loop choke
- Paper cutter choke
- Canto choke
- Tarikoplata
- Wrist lock
- Bicep slicer
- Calf slicer
- Estima lock
- Aoki lock
- Baratoplata
- Peruvian necktie
- Von Flue choke
- Bulldog choke
- Twister

## Position Flow Map

### Clean Core Loop

Standing -> Hand Fighting -> Setup -> Takedown or Guard Pull -> Guard / Half Guard -> Pass or Sweep -> Dominant Pin -> Submission

### Strong Existing Chains

- Standing -> Collar Tie -> Snapdown -> Front Headlock -> Guillotine / D'Arce / Anaconda
- Standing -> Level Change -> Double Leg -> Top Half Guard -> Knee Slice -> Side Control -> Mount -> Armbar / Arm Triangle
- Standing -> Arm Drag -> Back Control -> Seatbelt Control -> Rear Naked Choke / Bow And Arrow
- Standing -> Guard Pull -> Closed Guard -> Hip Bump / Scissor / Flower Sweep -> Mount
- Open Guard -> Ashi Garami -> Straight Ankle Lock / Heel Hook
- Side Control -> North South -> Kimura / North South Choke
- Top Guard -> Standing Guard Break -> Open Guard -> Torreando -> Knee On Belly -> Mount

### Dead Ends Or Weak Links

- Spider Guard and Lasso Guard lead to attacks but do not yet have enough pass/counter responses.
- Turtle has danger but needs more defender choices besides scramble or technical bridge.
- North South has submissions but needs clearer escapes and transitions.
- Back Control has strong finishes but not enough retention/counterplay.
- Leg lock positions are dangerous but need more defense, clearing, and counter-entanglement options.
- Throws are exciting but under-connected; they need entries and failed-throw consequences.

### Unrealistic Or Needs Clarification

- Mounted Triangle should require Mount or failed mount defense, not be broadly accessible.
- Flying Armbar and Flying Triangle should be high-risk special cards with severe failure penalties.
- Ezekiel from Top Guard is realistic but should probably require strong posture/control, not be a generic top guard attack.
- Top Half Guard should distinguish top player attacking vs bottom player underhooking. Right now the labels may become confusing.

## Archetype Support

### Wrestler

Current support: strongest overall.

Wrestler has takedowns, front headlock routes, sprawls, mat returns, throws, and some top control. This archetype can become too complete unless guard submissions and leg attacks require real investment.

Needs next:
- More chain wrestling decisions
- Failed shot risk
- Reshot and mat return routes
- Front headlock finish specialization
- Anti-guard-pull tools

### Guard Player

Current support: strong but not yet deep enough.

Guard Player has closed guard, open guard, butterfly, sweeps, armbar, triangle, omoplata, kimura, and retention. This is good, but the guard ecosystem needs more defensive loops so the player feels clever rather than passive.

Needs next:
- More guard retention cards
- More guard-to-submission traps
- More sleeve/collar control setups
- More open guard branches
- More anti-pressure counters

### Pressure Passer

Current support: strong but linear.

Pressure Passer has knee slice, body lock, smash, leg drag, side control, mount, north south, and chokes. It risks becoming "pass, hold, submit" unless bottom-player counters are sharp.

Needs next:
- Pass chain choices
- Pressure vs mobility tradeoffs
- Stamina drain identity
- Mount retention
- More control-based win pressure

### Back Hunter

Current support: good identity but needs more routes.

Back Hunter has arm drag, duck under, mat return, back control, seatbelt, hook retention, RNC, bow-and-arrow, go-behind, and scramble. This archetype is promising because it creates big momentum swings.

Needs next:
- More back takes from turtle, side control, leg drag, and front headlock
- Seatbelt battles
- Hook insertion and body triangle
- Back escape counterplay
- Rolling back takes

### Leg Locker

Current support: dangerous but too narrow.

Leg Locker has ashi garami, single-leg X, saddle, 50/50, ankle lock, heel hook, kneebar, toe hold, Imanari. The finishing package is strong, but it needs more entries, grip fighting, and escapes so it does not become all-or-nothing.

Needs next:
- More entry paths from passing, guard, and failed takedowns
- Leg pummeling
- Heel slip / boot defense
- Cross ashi
- Reap position
- Counter-leg-lock battles

## Replayability Analysis

### Dominant Strategy Risks

- Wrestler may become the safest archetype if takedowns lead to top control too reliably.
- Pressure Passer may become repetitive if passing cards always lead toward Side Control or Mount without meaningful bottom counters.
- Leg Locker may become swingy: either useless before entry or instantly lethal after entry.
- Back Hunter may become too strong if Back Control gives easy RNC access without hook/seatbelt mini-battles.
- Guard Player may become too reactive unless guard attacks create real fear.

### Repetitive Gameplay Risks

- If cards only say "gain control" or "change position," players will optimize obvious value instead of planning sequences.
- If stamina recovery is too safe, every low-stamina turn becomes "Breathe."
- If submissions are only percent rolls, finishes may feel random instead of earned.
- If counters are not visible on cards, losses will feel unfair.

### Cards That May Never Be Played

- Low-reward setup cards without combo bonuses.
- Escapes that cost too much stamina compared to accepting a bad position.
- Throws with high risk but no unique upside.
- Defensive cards that do not also improve future position.

### Cards That May Always Be Played

- Any card that gives control, improves position, and has low stamina cost.
- Any submission with high success and no serious failed-position penalty.
- Any pass that skips directly from open guard to mount.
- Any archetype card that is universally useful instead of style-specific.

## Recommended Combo System

### Wrestling Chains

- Wrist Control -> Arm Drag -> Back Take -> Seatbelt -> RNC
- Collar Tie -> Snapdown -> Front Headlock -> Guillotine
- Collar Tie -> Snapdown -> Front Headlock -> D'Arce
- Level Change -> Double Leg -> Top Half Guard -> Knee Slice -> Side Control
- Single Leg -> Tree Top -> Mat Return -> Top Half Guard
- Sprawl -> Front Headlock -> Go Behind -> Back Control

### Guard Chains

- Guard Pull -> Closed Guard -> Hip Bump Sweep -> Mount -> Armbar
- Closed Guard -> Overhook Control -> Triangle -> Armbar Follow-Up
- Closed Guard -> Kimura -> Hip Bump Sweep -> Mount
- Open Guard -> De La Riva -> Back Take -> Seatbelt
- Butterfly Guard -> Arm Drag -> Back Take
- Butterfly Guard -> Sweep -> Top Half Guard -> Pass

### Pressure Passing Chains

- Posture -> Standing Guard Break -> Torreando -> Knee On Belly -> Mount
- Top Half Guard -> Crossface -> Knee Slice -> Side Control -> Mount
- Top Guard -> Body Lock Pass -> Side Control -> Mount -> Arm Triangle
- Open Guard -> Leg Drag -> Side Control -> Back Exposure
- Side Control -> North South -> Kimura

### Back Hunter Chains

- Arm Drag -> Back Take -> Seatbelt -> Hook Retention -> RNC
- Duck Under -> Mat Return -> Back Control -> Bow And Arrow
- Sprawl -> Front Headlock -> Go Behind -> Back Control
- Leg Drag -> Back Exposure -> Seatbelt -> RNC
- Scramble -> Back Control -> RNC

### Leg Locker Chains

- Open Guard -> Single Leg X -> Ashi Garami -> Straight Ankle Lock
- Butterfly Guard -> Ashi Garami -> Outside Heel Hook
- Failed Pass -> Backstep -> Saddle -> Inside Heel Hook
- Imanari Roll -> Ashi Garami -> Heel Hook
- 50/50 -> Toe Hold -> Heel Hook Threat

## Collection And Rarity Recommendations

### Common

Common cards should teach the game and create position flow.

Examples:
- Standing Neutral
- Wrist Control
- Collar Tie
- Inside Tie
- Pummeling
- Level Change
- Guard Pull
- Closed Guard
- Open Guard
- Side Control
- Mount
- Back Control
- Frame
- Posture
- Guard Retention

### Rare

Rare cards should create real choices and moderate combo planning.

Examples:
- Double Leg
- Single Leg
- Snapdown
- Ankle Pick
- Knee Slice
- Torreando
- Hip Bump Sweep
- Scissor Sweep
- Butterfly Sweep
- Sprawl
- Reguard
- Armbar From Mount
- Triangle From Closed Guard
- Straight Ankle Lock

### Epic

Epic cards should feel like build-defining tools.

Examples:
- Arm Drag
- Duck Under
- Mat Return
- Body Lock Pass
- Leg Drag
- Smash Pass
- Ghost Escape
- De La Riva Sweep
- Omoplata
- D'Arce
- Anaconda
- Kimura From Side Control
- Saddle
- 50/50

### Legendary

Legendary cards should be dramatic, rare, risky, or archetype-defining.

Examples:
- Blast Double
- Suplex
- Flying Armbar
- Flying Triangle
- Bow And Arrow
- Inside Heel Hook
- Outside Heel Hook
- Imanari Roll
- Twister, when added
- Canto Choke, when added
- Berimbolo, when added
- Worm Guard, when added

## Future Content Roadmap

### Next 50 Techniques

1. Russian Tie
2. Slide By
3. Snapdown Go-Behind
4. Front Headlock Spin
5. Low Single
6. Head Outside Single
7. Tree Top Finish
8. Switch
9. Sit-Out
10. Granby Roll
11. Collar Drag
12. Arm Spin
13. Sumi Gaeshi
14. Tomoe Nage
15. Uchi Mata Counter
16. Knee Shield Half Guard
17. Deep Half Guard
18. Lockdown
19. Electric Chair
20. Pendulum Sweep
21. Lumberjack Sweep
22. Waiter Sweep
23. X-Guard Sweep
24. Single-Leg X Sweep
25. Reverse De La Riva
26. Octopus Guard
27. Williams Guard
28. Overhook Guard
29. X-Pass
30. Long-Step Pass
31. Shin-Pin Pass
32. Headquarters
33. Over-Under Pass
34. Double-Under Pass
35. Stack Pass
36. Weave Pass
37. North-South Escape
38. Side Control Underhook Escape
39. Back Escape To Mat
40. Back Escape To Safe Side
41. Kipping Escape
42. Cross Collar Choke
43. Baseball Bat Choke
44. Loop Choke
45. Paper Cutter Choke
46. Wrist Lock
47. Bicep Slicer
48. Calf Slicer
49. Estima Lock
50. Von Flue Choke

### Next 100 Techniques

The next 100 should add depth in specific families rather than random moves:

- 15 more wrestling chain entries and counters
- 15 more guard retention and open guard systems
- 15 more passing chains and pass counters
- 15 more side control / mount / back control maintenance tools
- 15 more submission defenses and escape-specific counters
- 10 more leg lock entries, defenses, and counter-leg-locks
- 10 more gi chokes and lapel-based techniques
- 5 high-rarity signature moves

### Signature Techniques

- Blast Double
- Suplex
- Flying Armbar
- Flying Triangle
- Berimbolo
- Imanari Roll
- Inside Heel Hook
- Bow And Arrow
- Twister
- Canto Choke
- Worm Guard Sweep
- Matrix Back Take

### Belt-Locked Technique Ideas

- White Belt: posture, frame, hip escape, bridge, closed guard, double leg, basic guard pull
- Blue Belt: knee slice, armbar, triangle, RNC, scissor sweep, torreando, sprawl
- Purple Belt: leg drag, D'Arce, anaconda, omoplata, De La Riva, X-guard, ashi garami
- Brown Belt: saddle, bow and arrow, ghost escape, deep half, rolling back take, kimura trap
- Black Belt: Imanari roll, inside heel hook, flying triangle, berimbolo, twister, advanced lapel systems
- Coral / Endgame: legendary boss techniques, rare signature chains, tournament-only variants

### Archetype-Exclusive Technique Ideas

Wrestler:
- Blast Double
- Mat Return
- Chain Wrestling
- Front Headlock Ride
- Suplex

Guard Player:
- Flying Triangle
- Omoplata
- Williams Guard
- Pendulum Sweep
- Triangle-Armbar Chain

Pressure Passer:
- Smash Pass
- Body Lock Pass
- Over-Under Pass
- Mount Pressure
- North-South Choke

Back Hunter:
- Rolling Back Take
- Seatbelt Trap
- Bow And Arrow
- Matrix Back Take
- Hook Retention Mastery

Leg Locker:
- Imanari Roll
- Saddle
- Inside Heel Hook
- Outside Heel Hook
- Toe Hold Chain

## First Improvements To Make After Review

1. Add technique metadata to card display only.
   This improves clarity without changing balance.

2. Add a position-flow helper.
   Cards should visibly show "success leads to" and "countered by."

3. Add archetype filters in the future Technique Library.
   This makes collection feel organized and helps players understand builds.

4. Add failure consequences later.
   High-risk moves like flying submissions and heel hooks need clear downside.

5. Build one finished archetype tree first.
   Wrestler is the cleanest test case because the standing-to-top-control loop is already strong.

## Design Verdict

The current database is a strong foundation, but it should not become 103 playable cards yet.

The best next step is to use the data to improve card clarity and planning:

- Works from
- Leads to
- Countered by
- Combo hints
- Archetype identity
- Rarity and unlock fantasy

The biggest design risk is building a huge realistic BJJ encyclopedia without turning it into meaningful turn choices. Fun should win over realism when they conflict.

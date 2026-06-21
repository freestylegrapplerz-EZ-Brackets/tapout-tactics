// Split from the original prototype script. Keep load order in index.html.

const cards = [
  {
    id: "double-leg",
    name: "Double Leg",
    type: "takedown",
    cost: 2,
    requires: ["Standing"],
    text: "Score 2 points and land in Top Half Guard. Loses hard to Sprawl.",
    play: (state, actor) => takedownTo(state, actor, "Top Half Guard", 2, "blast through a double leg", "blasts through a double leg")
  },
  {
    id: "guard-pull",
    name: "Guard Pull",
    type: "guard",
    cost: 1,
    requires: ["Standing"],
    text: "Move safely to Bottom Guard. No points, but opens guard attacks.",
    play: (state, actor) => setRelativePosition(state, actor, "Bottom Guard", actionLine(actor, "pull guard", "pulls guard"))
  },
  {
    id: "sprawl",
    name: "Sprawl",
    type: "counter",
    cost: 1,
    requires: ["Standing"],
    text: "Counters takedowns. If they shoot, you stuff it into Front Headlock.",
    play: (state, actor) => addControl(state, actor, 1, actionLine(actor, "stay heavy with a sprawl", "stays heavy with a sprawl"))
  },
  {
    id: "knee-slice",
    name: "Knee Slice",
    type: "pass",
    cost: 2,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Pass to Side Control and score 3 points unless they Frame.",
    play: (state, actor) => passGuard(state, actor, "Side Control", 3)
  },
  {
    id: "pressure",
    name: "Shoulder Pressure",
    type: "pressure",
    cost: 1,
    requires: ["Top Guard", "Top Half Guard", "Side Control", "Mount"],
    text: "Gain control and drain 1 opponent stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "apply shoulder pressure", "applies shoulder pressure"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "hip-escape",
    name: "Hip Escape",
    type: "escape",
    cost: 1,
    requires: ["Bottom Half Guard", "Under Side Control", "Mounted", "Caught Ashi Garami"],
    text: "Recover one step toward guard.",
    play: (state, actor) => escapeTowardGuard(state, actor)
  },
  {
    id: "bridge",
    name: "Bridge",
    type: "escape",
    cost: 2,
    requires: ["Under Side Control", "Mounted"],
    text: "Explode out of Mount into Bottom Half Guard.",
    play: (state, actor) => setRelativePosition(state, actor, "Bottom Half Guard", actionLine(actor, "bridge and turn", "bridges and turns"))
  },
  {
    id: "closed-guard-sweep",
    name: "Flower Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Sweep to Mount and score 2 points.",
    play: (state, actor) => {
      score(state, actor, 2);
      setRelativePosition(state, actor, "Mount", actionLine(actor, "hit a flower sweep", "hits a flower sweep"));
    }
  },
  {
    id: "frame",
    name: "Frame",
    type: "counter",
    cost: 1,
    requires: ["Bottom Guard", "Bottom Half Guard", "Under Side Control", "Mounted", "Caught Front Headlock", "Back Taken", "Turtle", "Caught Ashi Garami"],
    text: "Blocks passing pressure and reduces opponent control.",
    play: (state, actor) => addControl(state, other(actor), -1, actionLine(actor, "frame and slow the attack", "frames and slows the attack"))
  },
  {
    id: "armbar",
    name: "Armbar",
    type: "submission",
    cost: 3,
    requires: ["Mount", "Bottom Guard"],
    text: "Attack the arm. Stronger with high control or low opponent stamina.",
    play: (state, actor) => submissionAttack(state, actor, "armbar")
  },
  {
    id: "triangle",
    name: "Triangle",
    type: "submission",
    cost: 3,
    requires: ["Bottom Guard"],
    text: "Trap the neck and arm from guard.",
    play: (state, actor) => submissionAttack(state, actor, "triangle")
  },
  {
    id: "rear-naked-choke",
    name: "Rear Naked Choke",
    type: "submission",
    cost: 3,
    requires: ["Back Control"],
    text: "The highest percentage finish from the back.",
    play: (state, actor) => submissionAttack(state, actor, "rear naked choke")
  },
  {
    id: "arm-drag",
    name: "Arm Drag",
    type: "guard",
    cost: 2,
    requires: ["Standing", "Bottom Guard"],
    text: "Take the back if you have more stamina.",
    play: (state, actor) => {
      const success = state[actor].stamina >= state[other(actor)].stamina;
      if (success) {
        score(state, actor, 4);
        setRelativePosition(state, actor, "Back Control", actionLine(actor, "take the back from an arm drag", "takes the back from an arm drag"));
      } else {
        addLog(state, actionLine(actor, "miss the arm drag", "misses the arm drag"));
      }
    }
  },
  {
    id: "reguard",
    name: "Recover Guard",
    type: "escape",
    cost: 2,
    requires: ["Bottom Half Guard", "Under Side Control"],
    text: "Recover Bottom Guard and reset the danger.",
    play: (state, actor) => setRelativePosition(state, actor, "Bottom Guard", actionLine(actor, "recover guard", "recovers guard"))
  },
  {
    id: "mount",
    name: "Step To Mount",
    type: "pass",
    cost: 2,
    requires: ["Side Control"],
    text: "Advance to Mount and score 4 points.",
    play: (state, actor) => {
      score(state, actor, 4);
      setRelativePosition(state, actor, "Mount", actionLine(actor, "step over to mount", "steps over to mount"));
    }
  },
  {
    id: "wrist-control",
    name: "Wrist Control",
    type: "setup",
    cost: 1,
    requires: ["Standing", "Bottom Guard", "Top Guard", "Top Half Guard"],
    text: "Win the hand fight. Gain control and make your next attack safer.",
    play: (state, actor) => addControl(state, actor, 1, actionLine(actor, "win wrist control", "wins wrist control"))
  },
  {
    id: "collar-tie",
    name: "Collar Tie",
    type: "setup",
    cost: 1,
    requires: ["Standing"],
    text: "Control posture from standing and drain 1 opponent stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "snap into a collar tie", "snaps into a collar tie"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "snapdown",
    name: "Snapdown",
    type: "setup",
    cost: 2,
    requires: ["Standing"],
    text: "Pull the head down and threaten front headlock attacks.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "snap the head down", "snaps the head down"));
      setRelativePosition(state, actor, "Front Headlock", actionLine(actor, "claim front headlock control", "claims front headlock control"));
    }
  },
  {
    id: "headlock-pressure",
    name: "Headlock Pressure",
    type: "pressure",
    cost: 1,
    requires: ["Front Headlock"],
    text: "Keep their posture broken. Gain control and drain 1 stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "keep heavy front headlock pressure", "keeps heavy front headlock pressure"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "slide-by",
    name: "Slide By",
    type: "setup",
    cost: 2,
    requires: ["Standing", "Front Headlock"],
    text: "Clear the tie and cut behind. Take the back if you have equal or better stamina.",
    play: (state, actor) => conditionalBackTake(state, actor, "slide by to the back", "slides by to the back")
  },
  {
    id: "single-leg",
    name: "Single Leg",
    type: "takedown",
    cost: 2,
    requires: ["Standing"],
    text: "Score 2 points and land in Top Half Guard.",
    play: (state, actor) => takedownTo(state, actor, "Top Half Guard", 2, "finish a single leg", "finishes a single leg")
  },
  {
    id: "body-lock",
    name: "Body Lock Trip",
    type: "takedown",
    cost: 3,
    requires: ["Standing"],
    text: "A clinch trip to Side Control. Strong, but expensive.",
    play: (state, actor) => takedownTo(state, actor, "Side Control", 2, "hit a body lock trip", "hits a body lock trip")
  },
  {
    id: "inside-trip",
    name: "Inside Trip",
    type: "takedown",
    cost: 2,
    requires: ["Standing"],
    text: "Score 2 and land in Top Guard. Better when you have control.",
    play: (state, actor) => takedownTo(state, actor, "Top Guard", 2, "reap the inside trip", "reaps the inside trip")
  },
  {
    id: "ankle-pick",
    name: "Ankle Pick",
    type: "takedown",
    cost: 2,
    requires: ["Standing"],
    text: "A quick level change. Score 2 if you have control, otherwise gain control.",
    play: (state, actor) => {
      if (hasControlEdge(state, actor)) {
        takedownTo(state, actor, "Top Guard", 2, "pick the ankle", "picks the ankle");
      } else {
        addControl(state, actor, 1, actionLine(actor, "threaten the ankle pick", "threatens the ankle pick"));
      }
    }
  },
  {
    id: "duck-under",
    name: "Duck Under",
    type: "takedown",
    cost: 2,
    requires: ["Standing"],
    text: "Slip under the arm and take the back when your stamina is not lower.",
    play: (state, actor) => conditionalBackTake(state, actor, "duck under to the back", "ducks under to the back")
  },
  {
    id: "hip-toss",
    name: "Hip Toss",
    type: "takedown",
    cost: 3,
    requires: ["Standing"],
    text: "Big throw to Side Control. Costs stamina but changes the match fast.",
    play: (state, actor) => takedownTo(state, actor, "Side Control", 2, "launch a hip toss", "launches a hip toss")
  },
  {
    id: "torreando",
    name: "Torreando Pass",
    type: "pass",
    cost: 2,
    requires: ["Top Guard"],
    text: "Bullfighter pass to Side Control and score 3.",
    play: (state, actor) => passTo(state, actor, "Side Control", 3, "circle to a torreando pass", "circles to a torreando pass")
  },
  {
    id: "leg-drag",
    name: "Leg Drag",
    type: "pass",
    cost: 2,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Drag the legs across and threaten the back.",
    play: (state, actor) => passTo(state, actor, "Side Control", 3, "drag the legs across", "drags the legs across")
  },
  {
    id: "body-lock-pass",
    name: "Body Lock Pass",
    type: "pass",
    cost: 3,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Expensive pressure pass. Lock the hips, gain control, and grind to Side Control.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "lock the hips", "locks the hips"));
      passTo(state, actor, "Side Control", 3, "finish the body lock pass", "finishes the body lock pass");
    }
  },
  {
    id: "backstep-pass",
    name: "Backstep Pass",
    type: "pass",
    cost: 2,
    requires: ["Top Half Guard"],
    text: "Backstep out of half guard to Side Control.",
    play: (state, actor) => passTo(state, actor, "Side Control", 3, "backstep out of half guard", "backsteps out of half guard")
  },
  {
    id: "elbow-escape",
    name: "Elbow Escape",
    type: "escape",
    cost: 2,
    requires: ["Mounted"],
    text: "Shrimp to recover Bottom Half Guard from Mount.",
    play: (state, actor) => setRelativePosition(state, actor, "Bottom Half Guard", actionLine(actor, "shrimp to half guard", "shrimps to half guard"))
  },
  {
    id: "technical-bridge",
    name: "Technical Bridge",
    type: "escape",
    cost: 2,
    requires: ["Mounted", "Under Side Control"],
    text: "Bridge to Turtle. Safer than staying pinned, but not fully escaped yet.",
    play: (state, actor) => setRelativePosition(state, actor, "Turtle", actionLine(actor, "technical bridge to turtle", "technical bridges to turtle"))
  },
  {
    id: "hip-bump-sweep",
    name: "Hip Bump Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Sit up and sweep to Mount. Scores 2.",
    play: (state, actor) => sweepTo(state, actor, "Mount", 2, "hit a hip bump sweep", "hits a hip bump sweep")
  },
  {
    id: "scissor-sweep",
    name: "Scissor Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Classic sweep to Top Guard. Scores 2 and reverses momentum.",
    play: (state, actor) => sweepTo(state, actor, "Top Guard", 2, "slice through a scissor sweep", "slices through a scissor sweep")
  },
  {
    id: "butterfly-sweep",
    name: "Butterfly Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard", "Bottom Half Guard"],
    text: "Use hooks to elevate and sweep to Top Half Guard.",
    play: (state, actor) => sweepTo(state, actor, "Top Half Guard", 2, "elevate with a butterfly sweep", "elevates with a butterfly sweep")
  },
  {
    id: "old-school-sweep",
    name: "Old School Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Half Guard"],
    text: "Come up from half guard and sweep to Top Half Guard.",
    play: (state, actor) => sweepTo(state, actor, "Top Half Guard", 2, "come up on an old school sweep", "comes up on an old school sweep")
  },
  {
    id: "ashi-garami-entry",
    name: "Ashi Garami Entry",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard", "Bottom Half Guard"],
    text: "Trap one leg and enter Ashi Garami. Sets up ankle locks and heel hooks.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "enter ashi garami", "enters ashi garami"));
      setRelativePosition(state, actor, "Ashi Garami", actionLine(actor, "trap the leg in ashi garami", "traps the leg in ashi garami"));
    }
  },
  {
    id: "guillotine",
    name: "Guillotine",
    type: "submission",
    cost: 3,
    requires: ["Standing", "Bottom Guard", "Front Headlock"],
    text: "Attack the neck from front headlock, guard, or a scramble.",
    play: (state, actor) => submissionAttack(state, actor, "guillotine")
  },
  {
    id: "kimura",
    name: "Kimura",
    type: "submission",
    cost: 3,
    requires: ["Bottom Guard", "Side Control", "Top Half Guard"],
    text: "Isolate the shoulder. Strong when you have control.",
    play: (state, actor) => submissionAttack(state, actor, "kimura")
  },
  {
    id: "arm-triangle",
    name: "Arm Triangle",
    type: "submission",
    cost: 3,
    requires: ["Mount", "Side Control"],
    text: "Pressure choke from top control.",
    play: (state, actor) => submissionAttack(state, actor, "arm triangle")
  },
  {
    id: "darce",
    name: "D'Arce Choke",
    type: "submission",
    cost: 3,
    requires: ["Front Headlock", "Top Half Guard", "Side Control"],
    text: "Thread the arm through the neck from front headlock pressure.",
    play: (state, actor) => submissionAttack(state, actor, "D'Arce choke")
  },
  {
    id: "anaconda",
    name: "Anaconda Choke",
    type: "submission",
    cost: 3,
    requires: ["Front Headlock"],
    text: "Roll through from front headlock and squeeze.",
    play: (state, actor) => submissionAttack(state, actor, "anaconda choke")
  },
  {
    id: "straight-ankle-lock",
    name: "Straight Ankle Lock",
    type: "submission",
    cost: 3,
    requires: ["Ashi Garami"],
    text: "Finish from Ashi Garami by trapping the foot under your armpit.",
    play: (state, actor) => submissionAttack(state, actor, "straight ankle lock")
  },
  {
    id: "heel-hook",
    name: "Heel Hook",
    type: "submission",
    cost: 4,
    requires: ["Ashi Garami"],
    text: "High-risk finish from leg entanglement. Expensive, but dangerous when opponent is tired.",
    play: (state, actor) => submissionAttack(state, actor, "heel hook")
  },
  {
    id: "hand-fight",
    name: "Hand Fight",
    type: "escape",
    cost: 1,
    requires: ["Caught Front Headlock", "Back Taken", "Turtle", "Caught Ashi Garami"],
    text: "Peel grips, square up, or clear the trapped leg. Escape back to Standing.",
    play: (state, actor) => setRelativePosition(state, actor, "Standing", actionLine(actor, "peel the hands and square up", "peels the hands and squares up"))
  },
  {
    id: "protect-neck",
    name: "Protect Neck",
    type: "counter",
    cost: 1,
    requires: ["Caught Front Headlock", "Back Taken", "Turtle"],
    text: "Hide the neck and slow the finish. Reduce opponent control.",
    play: (state, actor) => addControl(state, other(actor), -1, actionLine(actor, "protect the neck and hand fight", "protects the neck and hand fights"))
  },
  {
    id: "seatbelt-pressure",
    name: "Seatbelt Control",
    type: "pressure",
    cost: 1,
    requires: ["Back Control"],
    text: "Stay glued to the back. Gain control and drain 1 stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "tighten seatbelt control", "tightens seatbelt control"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "high-crotch",
    name: "High Crotch",
    type: "takedown",
    cost: 2,
    requires: ["Standing"],
    text: "Attack the leg from a level change. Scores 2 and lands in Top Half Guard.",
    play: (state, actor) => takedownTo(state, actor, "Top Half Guard", 2, "climb into a high crotch finish", "climbs into a high crotch finish")
  },
  {
    id: "mat-return",
    name: "Mat Return",
    type: "takedown",
    cost: 2,
    requires: ["Standing", "Back Control"],
    text: "Return a fleeing opponent to the mat. Scores 2 and keeps top pressure.",
    play: (state, actor) => takedownTo(state, actor, "Top Guard", 2, "drag the hips down with a mat return", "drags the hips down with a mat return")
  },
  {
    id: "front-headlock-spin",
    name: "Go Behind",
    type: "setup",
    cost: 2,
    requires: ["Front Headlock"],
    text: "Spin behind from front headlock. Take the back if stamina is equal or better.",
    play: (state, actor) => conditionalBackTake(state, actor, "spin behind from front headlock", "spins behind from front headlock")
  },
  {
    id: "cow-catcher",
    name: "Cow Catcher",
    type: "takedown",
    cost: 3,
    requires: ["Front Headlock"],
    text: "Turn front headlock pressure into Side Control. Scores 2.",
    play: (state, actor) => takedownTo(state, actor, "Side Control", 2, "run the cow catcher to side control", "runs the cow catcher to side control")
  },
  {
    id: "firemans-carry",
    name: "Fireman's Carry",
    type: "takedown",
    cost: 3,
    requires: ["Standing"],
    text: "Explosive throw from wrist control or inside tie. Scores 2 to Side Control.",
    play: (state, actor) => takedownTo(state, actor, "Side Control", 2, "hit a fireman's carry", "hits a fireman's carry")
  },
  {
    id: "suplex",
    name: "Suplex",
    type: "takedown",
    cost: 4,
    requires: ["Standing", "Back Control"],
    text: "Legendary big throw. Expensive, but lands straight in Side Control.",
    play: (state, actor) => takedownTo(state, actor, "Side Control", 2, "launch a suplex", "launches a suplex")
  },
  {
    id: "tripod-sweep",
    name: "Tripod Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Kick the base and sweep to Top Guard. Scores 2.",
    play: (state, actor) => sweepTo(state, actor, "Top Guard", 2, "knock the base out with a tripod sweep", "knocks the base out with a tripod sweep")
  },
  {
    id: "pendulum-sweep",
    name: "Pendulum Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Angle out and swing the leg through. Scores 2 and lands in Mount.",
    play: (state, actor) => sweepTo(state, actor, "Mount", 2, "swing through a pendulum sweep", "swings through a pendulum sweep")
  },
  {
    id: "lumberjack-sweep",
    name: "Lumberjack Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Attack both legs as they stand. Scores 2 and comes up to Top Guard.",
    play: (state, actor) => sweepTo(state, actor, "Top Guard", 2, "chop the base with a lumberjack sweep", "chops the base with a lumberjack sweep")
  },
  {
    id: "butterfly-hooks",
    name: "Butterfly Hooks",
    type: "setup",
    cost: 1,
    requires: ["Bottom Guard", "Bottom Half Guard"],
    text: "Build seated guard elevation. Gain control and set up sweeps or Ashi Garami.",
    play: (state, actor) => addControl(state, actor, 1, actionLine(actor, "build butterfly hooks", "builds butterfly hooks"))
  },
  {
    id: "omoplata",
    name: "Omoplata",
    type: "submission",
    cost: 3,
    requires: ["Bottom Guard"],
    text: "Trap the shoulder from guard. Strong when opponents post or drive forward.",
    play: (state, actor) => submissionAttack(state, actor, "omoplata")
  },
  {
    id: "omoplata-sweep",
    name: "Omoplata Sweep",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard"],
    text: "Use the shoulder trap to come on top. Scores 2 and lands in Top Guard.",
    play: (state, actor) => sweepTo(state, actor, "Top Guard", 2, "roll through an omoplata sweep", "rolls through an omoplata sweep")
  },
  {
    id: "x-pass",
    name: "X-Pass",
    type: "pass",
    cost: 2,
    requires: ["Top Guard"],
    text: "Step around open guard before hooks settle. Scores 3 to Side Control.",
    play: (state, actor) => passTo(state, actor, "Side Control", 3, "step around with an X-pass", "steps around with an X-pass")
  },
  {
    id: "shin-pin-pass",
    name: "Shin Pin Pass",
    type: "pass",
    cost: 2,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Pin the shin and flatten the hips. Scores 3 to Side Control.",
    play: (state, actor) => passTo(state, actor, "Side Control", 3, "pin the shin and pass", "pins the shin and passes")
  },
  {
    id: "over-under-pass",
    name: "Over Under Pass",
    type: "pass",
    cost: 3,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Heavy pressure pass. Gain control and score 3 to Side Control.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "lock over-under pressure", "locks over-under pressure"));
      passTo(state, actor, "Side Control", 3, "finish the over-under pass", "finishes the over-under pass");
    }
  },
  {
    id: "smash-pass",
    name: "Smash Pass",
    type: "pass",
    cost: 3,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Crush the knees across and pass. Scores 3, gains control, and drains stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "smash the knees across", "smashes the knees across"));
      drainStamina(state, other(actor), 1);
      passTo(state, actor, "Side Control", 3, "settle the smash pass", "settles the smash pass");
    }
  },
  {
    id: "knee-on-belly",
    name: "Knee On Belly",
    type: "pressure",
    cost: 2,
    requires: ["Side Control"],
    text: "Score 2 and make the bottom player carry your weight. Stays in Side Control.",
    play: (state, actor) => {
      score(state, actor, 2);
      addControl(state, actor, 1, actionLine(actor, "drive knee-on-belly pressure", "drives knee-on-belly pressure"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "north-south-control",
    name: "North South Control",
    type: "pressure",
    cost: 1,
    requires: ["Side Control"],
    text: "Switch angles from Side Control. Gain control and threaten chokes or Kimuras.",
    play: (state, actor) => addControl(state, actor, 1, actionLine(actor, "switch to north-south control", "switches to north-south control"))
  },
  {
    id: "americana",
    name: "Americana",
    type: "submission",
    cost: 3,
    requires: ["Mount", "Side Control"],
    text: "Isolate the shoulder from top control. Common pressure-passer finish.",
    play: (state, actor) => submissionAttack(state, actor, "americana")
  },
  {
    id: "body-triangle",
    name: "Body Triangle",
    type: "pressure",
    cost: 2,
    requires: ["Back Control"],
    text: "Lock the hips from the back. Gain control and drain 1 stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "lock a body triangle", "locks a body triangle"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "bow-and-arrow",
    name: "Bow And Arrow Choke",
    type: "submission",
    cost: 3,
    requires: ["Back Control"],
    text: "Gi choke from back control. A strong Back Hunter finish.",
    play: (state, actor) => submissionAttack(state, actor, "bow and arrow choke")
  },
  {
    id: "clock-choke",
    name: "Clock Choke",
    type: "submission",
    cost: 3,
    requires: ["Back Control", "Front Headlock"],
    text: "Circle around a broken posture and attack the neck.",
    play: (state, actor) => submissionAttack(state, actor, "clock choke")
  },
  {
    id: "crucifix-control",
    name: "Crucifix Control",
    type: "pressure",
    cost: 2,
    requires: ["Back Control", "Front Headlock"],
    text: "Trap an arm while attacking the back. Gain control and open chokes.",
    play: (state, actor) => addControl(state, actor, 1, actionLine(actor, "trap the arm in crucifix control", "traps the arm in crucifix control"))
  },
  {
    id: "single-leg-x-entry",
    name: "Single Leg X Entry",
    type: "guard",
    cost: 2,
    requires: ["Bottom Guard", "Bottom Half Guard"],
    text: "Enter leg entanglement from guard and threaten Ashi Garami.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "thread into single leg X", "threads into single leg X"));
      setRelativePosition(state, actor, "Ashi Garami", actionLine(actor, "connect to ashi garami", "connects to ashi garami"));
    }
  },
  {
    id: "ashi-control",
    name: "Ashi Control",
    type: "pressure",
    cost: 1,
    requires: ["Ashi Garami"],
    text: "Control the knee line before finishing. Gain control and drain 1 stamina.",
    play: (state, actor) => {
      addControl(state, actor, 1, actionLine(actor, "tighten ashi control", "tightens ashi control"));
      drainStamina(state, other(actor), 1);
    }
  },
  {
    id: "toe-hold",
    name: "Toe Hold",
    type: "submission",
    cost: 3,
    requires: ["Ashi Garami"],
    text: "Rotational foot lock from leg entanglement.",
    play: (state, actor) => submissionAttack(state, actor, "toe hold")
  },
  {
    id: "kneebar",
    name: "Kneebar",
    type: "submission",
    cost: 3,
    requires: ["Ashi Garami", "Top Half Guard"],
    text: "Straight-line leg attack. Strong when the knee line is trapped.",
    play: (state, actor) => submissionAttack(state, actor, "kneebar")
  },
  {
    id: "leg-pummel-escape",
    name: "Leg Pummel Escape",
    type: "escape",
    cost: 1,
    requires: ["Caught Ashi Garami"],
    text: "Clear the knee line and recover Bottom Guard.",
    play: (state, actor) => setRelativePosition(state, actor, "Bottom Guard", actionLine(actor, "pummel the leg free", "pummels the leg free"))
  },
  {
    id: "knee-elbow-escape",
    name: "Knee Elbow Escape",
    type: "escape",
    cost: 2,
    requires: ["Mounted"],
    text: "Build a frame and recover Bottom Guard from Mount.",
    play: (state, actor) => setRelativePosition(state, actor, "Bottom Guard", actionLine(actor, "connect knee and elbow to recover guard", "connects knee and elbow to recover guard"))
  },
  {
    id: "rest",
    name: "Breathe",
    type: "recovery",
    cost: 0,
    requires: ["Standing", "Top Guard", "Bottom Guard", "Top Half Guard", "Bottom Half Guard", "Side Control", "Under Side Control", "Mount", "Mounted", "Back Control", "Back Taken", "Front Headlock", "Caught Front Headlock", "Turtle", "Ashi Garami", "Caught Ashi Garami"],
    text: "Recover 3 stamina, but give up a little control. Always available.",
    play: (state, actor) => {
      const recoveryAmount = actor === "player" && hasBonus("recovery") ? 4 : 3;
      state[actor].stamina = Math.min(getMaxStamina(actor), state[actor].stamina + recoveryAmount);
      addControl(state, other(actor), 1, actionLine(actor, "take a deliberate breath", "takes a deliberate breath"));
    }
  },
  {
    id: "breathe-and-hold",
    name: "Breathe and Hold",
    type: "recovery",
    cost: 0,
    requires: ["Top Guard", "Top Half Guard", "Side Control", "Mount", "Front Headlock", "Back Control", "Ashi Garami"],
    text: "Recover 2 stamina from a dominant position and tighten control. No control penalty.",
    play: (state, actor) => {
      state[actor].stamina = Math.min(getMaxStamina(actor), state[actor].stamina + 2);
      addControl(state, actor, 1, actionLine(actor, "settle the weight and breathe", "settles the weight and breathes"));
    }
  },
  {
    id: "technical-standup",
    name: "Technical Standup",
    type: "recovery",
    cost: 0,
    requires: ["Bottom Guard", "Bottom Half Guard", "Under Side Control", "Mounted", "Back Taken", "Caught Front Headlock", "Turtle", "Caught Ashi Garami"],
    text: "Recover 4 stamina and reset to Standing, but give opponent 2 points for the escape.",
    play: (state, actor) => {
      state[actor].stamina = Math.min(getMaxStamina(actor), state[actor].stamina + 4);
      score(state, other(actor), 2);
      setRelativePosition(state, actor, "Standing", actionLine(actor, "technical standup and reset", "stands up and resets"));
    }
  },
  {
    id: "adrenaline-burst",
    name: "Adrenaline Burst",
    type: "recovery",
    cost: 0,
    requires: ["Standing", "Top Guard", "Bottom Guard", "Top Half Guard", "Bottom Half Guard", "Side Control", "Under Side Control", "Mount", "Mounted", "Back Control", "Back Taken", "Front Headlock", "Caught Front Headlock", "Turtle", "Ashi Garami", "Caught Ashi Garami"],
    text: "Hit the timing window for a big stamina surge. Perfect: +5. Good: +3. Miss: +2 and −1 control.",
    play: (state, actor) => {
      const result = actor === "player" ? (state.pendingAdrenalineResult || "good") : "good";
      const amounts = { perfect: 5, good: 3, miss: 2 };
      const amount = amounts[result] || 3;
      state[actor].stamina = Math.min(getMaxStamina(actor), state[actor].stamina + amount);
      state.pendingAdrenalineResult = null;
      if (result === "miss") {
        addLog(state, `${actor === "player" ? "You mistimed" : `${state.ai.name} mistimes`} the burst — small recovery only.`);
      } else {
        const label = result === "perfect" ? "Perfect timing!" : "Good timing!";
        addLog(state, `${label} ${actor === "player" ? "You surge" : `${state.ai.name} surges`} with +${amount} stamina.`);
      }
    }
  }
];

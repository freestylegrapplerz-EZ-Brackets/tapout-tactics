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
    text: "Counters takedowns. If they shoot, you end in Top Half Guard.",
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
    requires: ["Bottom Half Guard", "Under Side Control", "Mounted"],
    text: "Recover one step toward guard.",
    play: (state, actor) => escapeTowardGuard(state, actor)
  },
  {
    id: "bridge",
    name: "Bridge",
    type: "escape",
    cost: 2,
    requires: ["Mounted"],
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
    requires: ["Bottom Guard", "Bottom Half Guard", "Under Side Control", "Mounted"],
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
    requires: ["Standing", "Bottom Guard", "Top Guard"],
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
    cost: 2,
    requires: ["Top Guard", "Top Half Guard"],
    text: "Lock the hips, gain control, and grind toward Side Control.",
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
    text: "Bridge to turtle and reset to standing.",
    play: (state, actor) => setRelativePosition(state, actor, "Standing", actionLine(actor, "technical bridge back to the feet", "technical bridges back to the feet"))
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
    requires: ["Bottom Guard", "Bottom Half Guard"],
    text: "Enter the legs and attack the ankle.",
    play: (state, actor) => submissionAttack(state, actor, "straight ankle lock")
  },
  {
    id: "heel-hook",
    name: "Heel Hook",
    type: "submission",
    cost: 4,
    requires: ["Bottom Guard", "Bottom Half Guard"],
    text: "High-risk leg attack. Expensive, but dangerous when opponent is tired.",
    play: (state, actor) => submissionAttack(state, actor, "heel hook")
  },
  {
    id: "hand-fight",
    name: "Hand Fight",
    type: "escape",
    cost: 1,
    requires: ["Caught Front Headlock", "Back Taken"],
    text: "Peel hands and square up. Escape back to Standing.",
    play: (state, actor) => setRelativePosition(state, actor, "Standing", actionLine(actor, "peel the hands and square up", "peels the hands and squares up"))
  },
  {
    id: "protect-neck",
    name: "Protect Neck",
    type: "counter",
    cost: 1,
    requires: ["Caught Front Headlock", "Back Taken"],
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
    id: "rest",
    name: "Breathe",
    type: "recovery",
    cost: 0,
    requires: ["Standing", "Top Guard", "Bottom Guard", "Top Half Guard", "Bottom Half Guard", "Side Control", "Under Side Control", "Mount", "Mounted", "Back Control", "Back Taken", "Front Headlock", "Caught Front Headlock"],
    text: "Recover 2 stamina, but give up a little control.",
    play: (state, actor) => {
      const recoveryAmount = actor === "player" && hasBonus("recovery") ? 3 : 2;
      state[actor].stamina = Math.min(getMaxStamina(actor), state[actor].stamina + recoveryAmount);
      addControl(state, actor, -1, actionLine(actor, "take a breath", "takes a breath"));
    }
  }
];


// Archetype-specific progression data. Keep this file data-only so the rules
// and UI can read it without owning the tree design.

const baseUnlockedCards = new Set([
  "rest",
  "wrist-control",
  "collar-tie",
  "sprawl",
  "pressure",
  "knee-slice",
  "guard-pull",
  "headlock-pressure",
  "slide-by",
  "guillotine",
  "hip-escape",
  "bridge",
  "mount",
  "armbar",
  "americana",
  "seatbelt-pressure",
  "body-triangle",
  "rear-naked-choke",
  "butterfly-hooks",
  "frame",
  "hand-fight",
  "protect-neck",
  "ashi-control",
  "straight-ankle-lock",
  "toe-hold",
  "knee-elbow-escape",
  "leg-pummel-escape"
]);

const styleStarterCards = {
  wrestler: new Set(["double-leg", "snapdown", "headlock-pressure", "slide-by", "high-crotch", "front-headlock-spin"]),
  "guard-player": new Set(["closed-guard-sweep", "triangle", "tripod-sweep", "butterfly-hooks"]),
  "pressure-passer": new Set(["body-lock", "knee-slice", "pressure", "x-pass", "knee-on-belly"]),
  "back-hunter": new Set(["arm-drag", "slide-by", "seatbelt-pressure", "rear-naked-choke", "front-headlock-spin"]),
  "leg-locker": new Set(["ashi-garami-entry", "straight-ankle-lock", "single-leg-x-entry", "ashi-control"])
};

const skillTreesByStyle = {
  wrestler: [
    {
      branch: "Takedown Chain",
      skills: [
        {
          id: "double-leg-specialist",
          name: "Double Leg Specialist",
          ranks: 3,
          effect: "Improves your main shot and keeps Double Leg central to the build.",
          unlocks: ["double-leg", "high-crotch"],
          bonus: "double-leg"
        },
        {
          id: "single-leg-specialist",
          name: "Single Leg Specialist",
          ranks: 2,
          requires: ["double-leg-specialist"],
          effect: "Unlocks Single Leg so missed shots can chain into another attack.",
          unlocks: ["single-leg"]
        },
        {
          id: "ankle-pick-chain",
          name: "Ankle Pick Chain",
          ranks: 2,
          requires: ["single-leg-specialist"],
          effect: "Unlocks Ankle Pick as the quick off-balance follow-up.",
          unlocks: ["ankle-pick"]
        },
        {
          id: "mat-return-finisher",
          name: "Mat Return Finish Path",
          requires: ["ankle-pick-chain"],
          effect: "Unlocks Duck Under and Mat Return so chain wrestling can become top control.",
          unlocks: ["duck-under", "mat-return"],
          bonus: "back-control"
        }
      ]
    },
    {
      branch: "Front Headlock",
      skills: [
        {
          id: "snap-downs",
          name: "Snap Downs",
          ranks: 3,
          effect: "Makes Snapdown a reliable setup into front headlock pressure.",
          unlocks: ["snapdown"]
        },
        {
          id: "front-headlock-control",
          name: "Front Headlock Control",
          ranks: 3,
          requires: ["snap-downs"],
          effect: "Front headlock attacks gain more control and finish threat.",
          unlocks: ["headlock-pressure", "front-headlock-spin", "crucifix-control"],
          bonus: "front-headlock"
        },
        {
          id: "wrestler-guillotine",
          name: "Wrestler Guillotine",
          ranks: 2,
          requires: ["front-headlock-control"],
          effect: "Unlocks Guillotine as the fast choke payoff.",
          unlocks: ["guillotine"],
          bonus: "front-headlock"
        },
        {
          id: "front-headlock-finish",
          name: "D'Arce / Anaconda Finish",
          requires: ["wrestler-guillotine"],
          effect: "Unlocks D'Arce, Anaconda, and Cow Catcher as late-tree front-headlock payoffs.",
          unlocks: ["darce", "anaconda", "cow-catcher", "clock-choke"],
          bonus: "chokes"
        }
      ]
    },
    {
      branch: "Big Throw",
      skills: [
        {
          id: "body-lock-wrestling",
          name: "Body Lock Wrestling",
          ranks: 2,
          effect: "Unlocks Body Lock so you can force upper-body takedowns.",
          unlocks: ["body-lock"]
        },
        {
          id: "inside-trip",
          name: "Inside Trip",
          ranks: 2,
          requires: ["body-lock-wrestling"],
          effect: "Unlocks Inside Trip from clinch pressure.",
          unlocks: ["inside-trip"]
        },
        {
          id: "hip-toss",
          name: "Hip Toss",
          ranks: 2,
          requires: ["inside-trip"],
          effect: "Unlocks Hip Toss for big momentum swings.",
          unlocks: ["hip-toss", "firemans-carry"]
        },
        {
          id: "throw-to-mount",
          name: "Throw To Mount",
          requires: ["hip-toss"],
          effect: "Unlocks Mount and Suplex as the control payoff after throws.",
          unlocks: ["mount", "suplex"],
          bonus: "pressure"
        }
      ]
    },
    {
      branch: "Top Control",
      skills: [
        {
          id: "heavy-sprawl",
          name: "Heavy Sprawl",
          ranks: 2,
          effect: "Counters create more control when opponents shoot.",
          bonus: "frames"
        },
        {
          id: "pressure-passing-wrestler",
          name: "Ride And Pass",
          ranks: 2,
          requires: ["heavy-sprawl"],
          effect: "Unlocks Body Lock Pass to turn takedowns into top pressure.",
          unlocks: ["body-lock-pass"],
          bonus: "pressure"
        },
        {
          id: "mount-ride",
          name: "Mount Ride",
          ranks: 2,
          requires: ["pressure-passing-wrestler"],
          effect: "Unlocks Mount and improves top-control turns.",
          unlocks: ["mount"],
          bonus: "pressure"
        },
        {
          id: "arm-triangle-wrestler",
          name: "Arm Triangle Finish",
          requires: ["mount-ride"],
          effect: "Unlocks Arm Triangle as the top-pressure finish.",
          unlocks: ["arm-triangle"],
          bonus: "chokes"
        }
      ]
    }
  ],

  "guard-player": [
    {
      branch: "Sweep Game",
      skills: [
        {
          id: "closed-guard",
          name: "Closed Guard Base",
          ranks: 2,
          effect: "Strengthens your first guard attacks and keeps sweeps available.",
          unlocks: ["closed-guard-sweep", "tripod-sweep"]
        },
        {
          id: "hip-bump-chain",
          name: "Hip Bump Chain",
          ranks: 2,
          requires: ["closed-guard"],
          effect: "Unlocks Hip Bump Sweep as an explosive guard option.",
          unlocks: ["hip-bump-sweep", "pendulum-sweep"]
        },
        {
          id: "scissor-sweep-chain",
          name: "Scissor Sweep Chain",
          ranks: 2,
          requires: ["closed-guard"],
          effect: "Unlocks Scissor Sweep for collar-and-sleeve off-balancing.",
          unlocks: ["scissor-sweep", "lumberjack-sweep"]
        },
        {
          id: "sweep-to-finish",
          name: "Sweep To Submission",
          requires: ["hip-bump-chain", "scissor-sweep-chain"],
          effect: "Unlocks Armbar so sweep threats can become finish threats.",
          unlocks: ["armbar"],
          bonus: "armbar"
        }
      ]
    },
    {
      branch: "Triangle / Armbar",
      skills: [
        {
          id: "triangle-skill",
          name: "Triangle Trap",
          ranks: 3,
          effect: "Improves Triangle attacks from guard.",
          unlocks: ["triangle"],
          bonus: "triangle"
        },
        {
          id: "armbar-skill",
          name: "Armbar Chain",
          ranks: 3,
          requires: ["triangle-skill"],
          effect: "Unlocks Armbar and improves arm isolation finishes.",
          unlocks: ["armbar"],
          bonus: "armbar"
        },
        {
          id: "kimura-skill",
          name: "Kimura Trap",
          ranks: 2,
          requires: ["armbar-skill"],
          effect: "Unlocks Kimura as a grip-fighting submission path.",
          unlocks: ["kimura", "omoplata"],
          bonus: "kimura"
        },
        {
          id: "guard-chokes",
          name: "Guard Choke Threat",
          requires: ["kimura-skill"],
          effect: "Unlocks Guillotine and Omoplata Sweep as counters when opponents drive forward.",
          unlocks: ["guillotine", "omoplata-sweep"],
          bonus: "chokes"
        }
      ]
    },
    {
      branch: "Retention",
      skills: [
        {
          id: "frames",
          name: "Frames",
          ranks: 2,
          effect: "Defensive frames gain more control while you survive.",
          bonus: "frames"
        },
        {
          id: "escapes",
          name: "Hip Escape Layers",
          ranks: 2,
          requires: ["frames"],
          effect: "Escapes become cheaper and more useful in bad positions.",
          bonus: "cost-reduction"
        },
        {
          id: "guard-recovery",
          name: "Guard Recovery",
          ranks: 3,
          requires: ["escapes"],
          effect: "Unlocks Reguard and reduces its stamina cost.",
          unlocks: ["reguard"],
          bonus: "guard-recovery"
        },
        {
          id: "guard-inversions",
          name: "Inversion Counter",
          requires: ["guard-recovery"],
          effect: "Unlocks Ashi Garami Entry as a recovery-to-attack payoff.",
          unlocks: ["ashi-garami-entry", "single-leg-x-entry"],
          bonus: "ashi"
        }
      ]
    },
    {
      branch: "Butterfly / Counter",
      skills: [
        {
          id: "butterfly-guard",
          name: "Butterfly Guard",
          ranks: 2,
          effect: "Unlocks Butterfly Sweep for seated guard offense.",
          unlocks: ["butterfly-sweep", "butterfly-hooks"]
        },
        {
          id: "old-school-sweep",
          name: "Old School Sweep",
          ranks: 2,
          requires: ["butterfly-guard"],
          effect: "Unlocks Old School Sweep from half guard scrambles.",
          unlocks: ["old-school-sweep"]
        },
        {
          id: "guard-leg-entry",
          name: "Sweep Into Ashi",
          requires: ["old-school-sweep"],
          effect: "Unlocks Ashi Garami Entry from guard reactions.",
          unlocks: ["ashi-garami-entry"],
          bonus: "ashi"
        },
        {
          id: "guard-ankle-lock",
          name: "Straight Ankle Lock",
          requires: ["guard-leg-entry"],
          effect: "Unlocks Straight Ankle Lock as the leg-entry finish.",
          unlocks: ["straight-ankle-lock"],
          bonus: "ankle-lock"
        }
      ]
    }
  ],

  "pressure-passer": [
    {
      branch: "Knee Slice",
      skills: [
        {
          id: "knee-slice-skill",
          name: "Knee Slice",
          ranks: 3,
          effect: "Improves Knee Slice control and keeps it in your passing game.",
          unlocks: ["knee-slice", "x-pass"],
          bonus: "knee-slice"
        },
        {
          id: "backstep-pass",
          name: "Backstep Pass",
          ranks: 2,
          requires: ["knee-slice-skill"],
          effect: "Unlocks Backstep Pass when half guard gets sticky.",
          unlocks: ["backstep-pass", "shin-pin-pass"]
        },
        {
          id: "leg-drag-skill",
          name: "Leg Drag",
          ranks: 2,
          requires: ["backstep-pass"],
          effect: "Unlocks Leg Drag as the angle-change pass.",
          unlocks: ["leg-drag", "over-under-pass"],
          bonus: "knee-slice"
        },
        {
          id: "pass-to-back",
          name: "Pass To Back Exposure",
          requires: ["leg-drag-skill"],
          effect: "Unlocks Rear Naked Choke as a pass-to-back finisher.",
          unlocks: ["rear-naked-choke"],
          bonus: "rnc"
        }
      ]
    },
    {
      branch: "Body Lock",
      skills: [
        {
          id: "body-lock-passing",
          name: "Body Lock Passing",
          ranks: 3,
          effect: "Unlocks Body Lock Pass and boosts pressure passing.",
          unlocks: ["body-lock-pass", "smash-pass"],
          bonus: "pressure"
        },
        {
          id: "smash-pass",
          name: "Smash Pass",
          ranks: 2,
          requires: ["body-lock-passing"],
          effect: "Unlocks Torreando and North-South Control to force the legs aside and settle pressure.",
          unlocks: ["torreando", "north-south-control"]
        },
        {
          id: "mount-pressure",
          name: "Mount Pressure",
          ranks: 3,
          requires: ["smash-pass"],
          effect: "Unlocks Mount, Knee On Belly, and Americana as dominant-pin payoffs.",
          unlocks: ["mount", "knee-on-belly", "americana"],
          bonus: "pressure"
        },
        {
          id: "arm-triangle-passer",
          name: "Arm Triangle Finish",
          requires: ["mount-pressure"],
          effect: "Unlocks Arm Triangle as the pressure-passing finish.",
          unlocks: ["arm-triangle"],
          bonus: "chokes"
        }
      ]
    },
    {
      branch: "Heavy Pressure",
      skills: [
        {
          id: "pressure-passing",
          name: "Pressure Passing",
          ranks: 3,
          effect: "Pressure cards gain more value and drain momentum.",
          unlocks: ["pressure"],
          bonus: "pressure"
        },
        {
          id: "top-half-smash",
          name: "Top Half Smash",
          ranks: 2,
          requires: ["pressure-passing"],
          effect: "Improves Top Half Guard control and pass chains.",
          bonus: "knee-slice"
        },
        {
          id: "kimura-trap-passer",
          name: "Kimura Trap",
          ranks: 2,
          requires: ["top-half-smash"],
          effect: "Unlocks Kimura when opponents frame hard.",
          unlocks: ["kimura", "americana"],
          bonus: "kimura"
        },
        {
          id: "smother-finish",
          name: "Smother Finish Path",
          requires: ["kimura-trap-passer"],
          effect: "Unlocks Arm Triangle and D'Arce as top-pressure finishes.",
          unlocks: ["arm-triangle", "darce"],
          bonus: "chokes"
        }
      ]
    },
    {
      branch: "Conditioning",
      skills: [
        {
          id: "maximum-stamina",
          name: "Big Gas Tank",
          ranks: 2,
          effect: "Raises maximum stamina for long pressure rounds.",
          bonus: "max-stamina"
        },
        {
          id: "recovery",
          name: "Pressure Recovery",
          ranks: 2,
          requires: ["maximum-stamina"],
          effect: "Recovery turns become stronger for attrition builds.",
          bonus: "cost-reduction"
        },
        {
          id: "efficient-movement",
          name: "Efficient Movement",
          ranks: 3,
          requires: ["recovery"],
          effect: "Takedowns, passes, and escapes cost less stamina.",
          bonus: "cost-reduction"
        },
        {
          id: "card-draw",
          name: "Deep Pressure Deck",
          requires: ["efficient-movement"],
          effect: "Adds more style cards into your hand draw weighting.",
          bonus: "card-draw"
        }
      ]
    }
  ],

  "back-hunter": [
    {
      branch: "Back Take",
      skills: [
        {
          id: "arm-drag-chain",
          name: "Arm Drag Chain",
          ranks: 3,
          effect: "Arm Drag becomes your main route to angles.",
          unlocks: ["arm-drag"],
          bonus: "back-control"
        },
        {
          id: "slide-by-chain",
          name: "Slide By",
          ranks: 2,
          requires: ["arm-drag-chain"],
          effect: "Unlocks Slide By as a second angle attack.",
          unlocks: ["slide-by", "front-headlock-spin"]
        },
        {
          id: "duck-under-back",
          name: "Duck Under",
          ranks: 2,
          requires: ["slide-by-chain"],
          effect: "Unlocks Duck Under to convert hand fighting into back exposure.",
          unlocks: ["duck-under"]
        },
        {
          id: "seatbelt-control",
          name: "Seatbelt Control",
          ranks: 3,
          requires: ["duck-under-back"],
          effect: "Unlocks Seatbelt Pressure and Body Triangle for back-control pressure.",
          unlocks: ["seatbelt-pressure", "body-triangle"],
          bonus: "back-control"
        }
      ]
    },
    {
      branch: "Choke Finish",
      skills: [
        {
          id: "hook-retention",
          name: "Hook Retention",
          ranks: 2,
          effect: "Back Control becomes harder to lose.",
          bonus: "back-control"
        },
        {
          id: "rnc-skill",
          name: "Rear Naked Choke",
          ranks: 3,
          requires: ["hook-retention"],
          effect: "Unlocks and improves Rear Naked Choke.",
          unlocks: ["rear-naked-choke"],
          bonus: "rnc"
        },
        {
          id: "hand-fight-finish",
          name: "Hand Fight To Finish",
          ranks: 2,
          requires: ["rnc-skill"],
          effect: "Protect Neck and Hand Fight become part of the choke battle.",
          bonus: "rnc"
        },
        {
          id: "bow-and-arrow-path",
          name: "Choke Specialist",
          requires: ["hand-fight-finish"],
          effect: "Adds Guillotine, Bow And Arrow, and Clock Choke as scramble choke payoffs.",
          unlocks: ["guillotine", "bow-and-arrow", "clock-choke"],
          bonus: "chokes"
        }
      ]
    },
    {
      branch: "Scramble",
      skills: [
        {
          id: "technical-bridge",
          name: "Technical Bridge",
          ranks: 2,
          effect: "Unlocks Technical Bridge for scramble escapes.",
          unlocks: ["technical-bridge"]
        },
        {
          id: "scramble-reguard",
          name: "Scramble Reguard",
          ranks: 2,
          requires: ["technical-bridge"],
          effect: "Unlocks Reguard so defense can restart the hunt.",
          unlocks: ["reguard"],
          bonus: "guard-recovery"
        },
        {
          id: "scramble-single",
          name: "Scramble Single",
          ranks: 2,
          requires: ["scramble-reguard"],
          effect: "Unlocks Single Leg from scramble reactions.",
          unlocks: ["single-leg"]
        },
        {
          id: "scramble-to-back",
          name: "Scramble To Back",
          requires: ["scramble-single"],
          effect: "Unlocks Duck Under and boosts back-control transitions.",
          unlocks: ["duck-under"],
          bonus: "back-control"
        }
      ]
    },
    {
      branch: "Front Headlock Angle",
      skills: [
        {
          id: "snap-down-back-hunter",
          name: "Snapdown Angle",
          ranks: 2,
          effect: "Unlocks Snapdown as a route to front headlock and back takes.",
          unlocks: ["snapdown"]
        },
        {
          id: "front-headlock-back-hunter",
          name: "Front Headlock Spin",
          ranks: 2,
          requires: ["snap-down-back-hunter"],
          effect: "Front Headlock gains more control for go-behind attacks.",
          unlocks: ["headlock-pressure", "front-headlock-spin", "crucifix-control"],
          bonus: "front-headlock"
        },
        {
          id: "darce-back-hunter",
          name: "D'Arce Trap",
          ranks: 2,
          requires: ["front-headlock-back-hunter"],
          effect: "Unlocks D'Arce as the front-headlock finish.",
          unlocks: ["darce"],
          bonus: "chokes"
        },
        {
          id: "anaconda-back-hunter",
          name: "Anaconda Finish",
          requires: ["darce-back-hunter"],
          effect: "Unlocks Anaconda as the second front-headlock finish.",
          unlocks: ["anaconda"],
          bonus: "chokes"
        }
      ]
    }
  ],

  "leg-locker": [
    {
      branch: "Ashi Entries",
      skills: [
        {
          id: "ashi-garami",
          name: "Ashi Garami",
          ranks: 3,
          effect: "Improves leg entanglement control and keeps Ashi Garami central.",
          unlocks: ["ashi-garami-entry", "ashi-control"],
          bonus: "ashi"
        },
        {
          id: "butterfly-entry",
          name: "Butterfly Entry",
          ranks: 2,
          requires: ["ashi-garami"],
          effect: "Unlocks Butterfly Sweep as a leg-entry setup.",
          unlocks: ["butterfly-sweep"]
        },
        {
          id: "single-leg-x-entry",
          name: "Single Leg X Entry",
          ranks: 2,
          requires: ["butterfly-entry"],
          effect: "Unlocks Single Leg and Single Leg X to connect wrestling into leg attacks.",
          unlocks: ["single-leg", "single-leg-x-entry"]
        },
        {
          id: "entry-counter",
          name: "Counter Entry",
          requires: ["single-leg-x-entry"],
          effect: "Unlocks Old School Sweep and Leg Pummel Escape as counters into legs.",
          unlocks: ["old-school-sweep", "leg-pummel-escape"],
          bonus: "ashi"
        }
      ]
    },
    {
      branch: "Straight Ankle Lock",
      skills: [
        {
          id: "ankle-lock-skill",
          name: "Ankle Lock Specialist",
          ranks: 3,
          effect: "Improves Straight Ankle Lock finishes.",
          unlocks: ["straight-ankle-lock"],
          bonus: "ankle-lock"
        },
        {
          id: "ankle-lock-control",
          name: "Ankle Lock Control",
          ranks: 2,
          requires: ["ankle-lock-skill"],
          effect: "Ashi Garami gains control before the finish.",
          unlocks: ["ashi-control"],
          bonus: "ashi"
        },
        {
          id: "leg-lock-recovery",
          name: "Recover To Legs",
          ranks: 2,
          requires: ["ankle-lock-control"],
          effect: "Unlocks Reguard so failed leg attacks do not end the round.",
          unlocks: ["reguard"],
          bonus: "guard-recovery"
        },
        {
          id: "ankle-lock-finisher",
          name: "Straight Ankle Finish",
          requires: ["leg-lock-recovery"],
          effect: "Adds Heel Hook as the late-tree leg-lock threat.",
          unlocks: ["heel-hook"],
          bonus: "heel-hook"
        }
      ]
    },
    {
      branch: "Heel Hook",
      skills: [
        {
          id: "heel-hook-entry",
          name: "Heel Exposure",
          ranks: 2,
          effect: "Improves leg-lock setups from scrambles.",
          bonus: "ashi"
        },
        {
          id: "heel-hook-skill",
          name: "Heel Hook Specialist",
          ranks: 3,
          requires: ["heel-hook-entry"],
          effect: "Unlocks and improves Heel Hook finishes.",
          unlocks: ["heel-hook"],
          bonus: "heel-hook"
        },
        {
          id: "toe-hold-path",
          name: "Toe Hold Path",
          ranks: 2,
          requires: ["heel-hook-skill"],
          effect: "Adds Toe Hold and Kimura as counters when they defend legs.",
          unlocks: ["toe-hold", "kimura"],
          bonus: "kimura"
        },
        {
          id: "kneebar-path",
          name: "Kneebar Finish Path",
          requires: ["toe-hold-path"],
          effect: "Adds Kneebar and Armbar as straight-line finishing concepts from entanglements.",
          unlocks: ["kneebar", "armbar"],
          bonus: "armbar"
        }
      ]
    },
    {
      branch: "Leg Defense",
      skills: [
        {
          id: "leg-lock-hand-fight",
          name: "Leg Lock Hand Fight",
          ranks: 2,
          effect: "Hand fighting and defense turns support leg entanglements.",
          unlocks: ["leg-pummel-escape"],
          bonus: "frames"
        },
        {
          id: "leg-lock-frames",
          name: "Inverted Frames",
          ranks: 2,
          requires: ["leg-lock-hand-fight"],
          effect: "Escapes and frames cost less while hunting legs.",
          bonus: "cost-reduction"
        },
        {
          id: "maximum-stamina-leg-locker",
          name: "Leg Lock Gas Tank",
          ranks: 2,
          requires: ["leg-lock-frames"],
          effect: "Raises maximum stamina for long entanglement exchanges.",
          bonus: "max-stamina"
        },
        {
          id: "card-draw-leg-locker",
          name: "Deep Leg Lock Deck",
          requires: ["maximum-stamina-leg-locker"],
          effect: "Adds more style cards into your hand draw weighting.",
          bonus: "card-draw"
        }
      ]
    }
  ]
};

const skillTree = skillTreesByStyle.wrestler;

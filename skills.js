// Split from the original prototype script. Keep load order in index.html.

const skillTree = [
  {
    branch: "Takedowns",
    skills: [
      { id: "double-leg-specialist", name: "Double Leg Specialist", effect: "Unlocks stronger double-leg chains.", unlocks: ["double-leg"] },
      { id: "single-leg-specialist", name: "Single Leg Specialist", effect: "Unlocks Single Leg and High Crotch style entries.", unlocks: ["single-leg"] },
      { id: "snap-downs", name: "Snap Downs", effect: "Unlocks Snapdown to front headlock chains.", unlocks: ["snapdown"] },
      { id: "front-headlock-control", name: "Front Headlock Control", effect: "Improves guillotine, D'Arce, and anaconda attacks.", bonus: "front-headlock" }
    ]
  },
  {
    branch: "Guard",
    skills: [
      { id: "closed-guard", name: "Closed Guard", effect: "Unlocks core closed guard attacks.", unlocks: ["guard-pull", "triangle", "armbar"] },
      { id: "butterfly-guard", name: "Butterfly Guard", effect: "Unlocks Butterfly Sweep.", unlocks: ["butterfly-sweep"] },
      { id: "guard-inversions", name: "Inversions", effect: "Unlocks advanced guard paths later.", bonus: "guard-combos" }
    ]
  },
  {
    branch: "Passing",
    skills: [
      { id: "knee-slice-skill", name: "Knee Slice", effect: "Improves knee slice control.", unlocks: ["knee-slice"], bonus: "knee-slice" },
      { id: "pressure-passing", name: "Pressure Passing", effect: "Shoulder Pressure gains extra control.", unlocks: ["pressure"], bonus: "pressure" },
      { id: "leg-drag-skill", name: "Leg Drag", effect: "Unlocks Leg Drag passing.", unlocks: ["leg-drag"] },
      { id: "body-lock-passing", name: "Body Lock Passing", effect: "Unlocks Body Lock Pass.", unlocks: ["body-lock-pass"] }
    ]
  },
  {
    branch: "Submissions",
    skills: [
      { id: "armbar-skill", name: "Armbar", effect: "Unlocks and improves armbars.", unlocks: ["armbar"], bonus: "armbar" },
      { id: "triangle-skill", name: "Triangle", effect: "Unlocks and improves triangles.", unlocks: ["triangle"], bonus: "triangle" },
      { id: "kimura-skill", name: "Kimura", effect: "Unlocks Kimura attacks.", unlocks: ["kimura"] },
      { id: "chokes", name: "Chokes", effect: "Improves choke success.", unlocks: ["guillotine", "darce", "anaconda"], bonus: "chokes" }
    ]
  },
  {
    branch: "Back Attack",
    skills: [
      { id: "seatbelt-control", name: "Seatbelt Control", effect: "Improves back control.", unlocks: ["arm-drag"], bonus: "back-control" },
      { id: "hook-retention", name: "Hook Retention", effect: "Back attacks gain control.", bonus: "hooks" },
      { id: "rnc-skill", name: "Rear Naked Choke", effect: "Unlocks and improves RNC.", unlocks: ["rear-naked-choke"], bonus: "rnc" }
    ]
  },
  {
    branch: "Leg Locks",
    skills: [
      { id: "ashi-garami", name: "Ashi Garami", effect: "Unlocks leg lock entries.", bonus: "ashi" },
      { id: "ankle-lock-skill", name: "Straight Ankle Lock", effect: "Unlocks ankle locks.", unlocks: ["straight-ankle-lock"] },
      { id: "heel-hook-skill", name: "Heel Hook", effect: "Unlocks heel hooks.", unlocks: ["heel-hook"] }
    ]
  },
  {
    branch: "Defense",
    skills: [
      { id: "frames", name: "Frames", effect: "Unlocks Frame and improves defense.", unlocks: ["frame"], bonus: "frames" },
      { id: "escapes", name: "Escapes", effect: "Unlocks core escapes.", unlocks: ["hip-escape", "bridge", "reguard", "hand-fight"] },
      { id: "guard-recovery", name: "Guard Recovery", effect: "Recover Guard costs less stamina.", bonus: "guard-recovery" }
    ]
  },
  {
    branch: "Conditioning",
    skills: [
      { id: "maximum-stamina", name: "Maximum Stamina", effect: "+2 max stamina.", bonus: "max-stamina" },
      { id: "recovery", name: "Recovery", effect: "Breathe recovers more stamina.", bonus: "recovery" },
      { id: "card-draw", name: "Card Draw Bonus", effect: "Style cards appear more often.", bonus: "card-draw" },
      { id: "efficient-movement", name: "Reduced Costs", effect: "Some techniques cost 1 less.", bonus: "cost-reduction" }
    ]
  }
];

const baseUnlockedCards = new Set([
  "rest", "wrist-control", "collar-tie", "sprawl", "guard-pull", "double-leg",
  "hip-escape", "bridge", "frame", "closed-guard-sweep", "knee-slice",
  "arm-drag", "reguard", "mount", "guillotine", "hand-fight",
  "headlock-pressure", "protect-neck"
]);


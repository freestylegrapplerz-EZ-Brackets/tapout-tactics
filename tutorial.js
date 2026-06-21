// Tutorial mode — scripted 6-turn guided first match for new players.
// Teaches: grip fighting, chains, dominant positions, back control, and the RNC finish.

const TUTORIAL_STEPS = [
  {
    turn: 1,
    cardId: "collar-tie",
    opponentCardId: "wrist-control",
    position: "Standing",
    title: "Step 1 of 6 — Win the Hand Fight",
    tip: "Collar Tie costs only 1 stamina, wins the grip fight, and drains 1 of their stamina. It's the safest first move in BJJ. Tap the glowing card.",
    afterTitle: "The grip fight is yours.",
    afterTip: "You have +1 control now. The Wrestler is already at 9 stamina. Every setup card you play opens a bigger attack next turn.",
    chainHint: null,
    forceResult: null
  },
  {
    turn: 2,
    cardId: "snapdown",
    opponentCardId: "collar-tie",
    position: "Standing",
    title: "Step 2 of 6 — Trigger the Chain Combo",
    tip: "Collar Tie → Snapdown is a CHAIN COMBO. The game rewards sequences, not random attacks. Playing Snapdown now gets a bonus AND moves you to Front Headlock — their head is controlled.",
    afterTitle: "Chain Bonus triggered!",
    afterTip: "You triggered 'Collar Tie to Snapdown' — bonus control. Front Headlock is your first dominant position. Their neck is now exposed to chokes.",
    chainHint: "collar-tie>snapdown",
    forceResult: null
  },
  {
    turn: 3,
    cardId: "guillotine",
    opponentCardId: "protect-neck",
    position: "Front Headlock",
    title: "Step 3 of 6 — Attack with a Chain Bonus",
    tip: "Snapdown → Guillotine is ANOTHER chain — +22% finish bonus. With your control advantage the choke is dangerous. In BJJ you hunt finishes from dominant positions. Attack!",
    afterTitle: "Close — but they survived.",
    afterTip: "The Guillotine missed, but you had +22% chain bonus, +2 control, and high stamina. That's how you build submission threats: set up the position, stack the bonuses, then attack. Now — take their back.",
    chainHint: "snapdown>guillotine",
    forceResult: "miss"
  },
  {
    turn: 4,
    cardId: "front-headlock-spin",
    opponentCardId: "protect-neck",
    position: "Front Headlock",
    title: "Step 4 of 6 — Take the Back",
    tip: "Go Behind converts Front Headlock into Back Control — the most dominant position in all of BJJ. It scores 4 points AND sets up the highest-percentage finish in the game.",
    afterTitle: "Back Control — 4 points!",
    afterTip: "You're on their back with hooks in and a seatbelt grip. Rear Naked Choke from here is the most common submission finish in real BJJ. One setup turn, then we end this.",
    chainHint: null,
    forceResult: "backtake"
  },
  {
    turn: 5,
    cardId: "seatbelt-pressure",
    opponentCardId: "protect-neck",
    position: "Back Control",
    title: "Step 5 of 6 — Set the Table",
    tip: "Seatbelt Control adds +1 control and drains their stamina. You'll reach maximum control (+3) for the choke. In BJJ this is called 'setting the table' — you make the finish inevitable before you attempt it.",
    afterTitle: "Maximum control. They're tired.",
    afterTip: "You now have +3 control and their stamina is low. Your Rear Naked Choke finish chance is over 70%. Control + fatigue + position = the finishing formula. This is the moment.",
    chainHint: null,
    forceResult: null
  },
  {
    turn: 6,
    cardId: "rear-naked-choke",
    opponentCardId: "protect-neck",
    position: "Back Control",
    title: "Step 6 of 6 — Finish It",
    tip: "Rear Naked Choke with +3 control, a tired opponent, Back Control position, and 5 turns of setup. Your finish chance is at its absolute peak. Every move you played built toward this moment. Squeeze.",
    afterTitle: "TAP! You finished with the RNC.",
    afterTip: "That was a complete BJJ sequence: grip fight → chain combo → dominant position → setup → finish. You just played Tapout Tactics the right way.",
    chainHint: null,
    forceResult: "finish"
  }
];

const TUTORIAL_GRADE_BREAKDOWN = [
  {
    category: "Chain Game",
    grade: "A+",
    detail: "You triggered two consecutive chain combos: Collar Tie → Snapdown → Guillotine. Building 3-card sequences is the highest skill expression in Tapout Tactics."
  },
  {
    category: "Position Ladder",
    grade: "A",
    detail: "You reached Front Headlock, then escalated to Back Control. Climbing the position ladder — from neutral to dominant — is how professionals approach BJJ."
  },
  {
    category: "Finish Discipline",
    grade: "A",
    detail: "Your Guillotine came with a +22% chain bonus and +2 control. Your RNC came with maximum control and a tired opponent. Both attacks were perfectly timed."
  },
  {
    category: "Result",
    grade: "A+",
    detail: "Submission victory by Rear Naked Choke. You didn't wait to win on points — you built the conditions for a finish and executed it. That's the highest achievement in this game."
  }
];

// ── Tutorial state helpers ────────────────────────────────────────────────

function getCurrentTutorialStep() {
  if (!state?.tutorialMode) return null;
  return TUTORIAL_STEPS.find((s) => s.turn === state.turn) || null;
}

function getTutorialCardId() {
  return getCurrentTutorialStep()?.cardId || null;
}

function isTutorialActive() {
  return !!state?.tutorialMode;
}

function endTutorialMode() {
  if (state) state.tutorialMode = false;
}

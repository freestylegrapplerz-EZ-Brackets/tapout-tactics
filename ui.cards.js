// Card rendering, rarity, strategy, and card art UI.
const intentMetaByType = {
  submission: { label: "Finish", className: "finish" },
  pass: { label: "Control", className: "control" },
  pressure: { label: "Control", className: "control" },
  setup: { label: "Setup", className: "setup" },
  takedown: { label: "Setup", className: "setup" },
  guard: { label: "Setup", className: "setup" },
  counter: { label: "Counter", className: "counter" },
  escape: { label: "Escape", className: "escape" },
  recovery: { label: "Reset", className: "reset" }
};

const defaultStrategyByType = {
  submission: {
    threat: "Finish Threat 3/3",
    stat: "35% base finish chance",
    strong: "Boosted by control, fatigue, skills, and chains",
    risk: "Miss costs 1 extra stamina",
    leads: ["Tapout"]
  },
  takedown: {
    threat: "Entry Threat 2/3",
    stat: "Scores 2 points",
    strong: "Starts your top game",
    risk: "Weak into Sprawl",
    leads: ["Top Half Guard", "Passing"]
  },
  pass: {
    threat: "Control Threat 2/3",
    stat: "Scores on position advance",
    strong: "Builds dominant control",
    risk: "Weak into frames and guard recovery",
    leads: ["Side Control", "Mount"]
  },
  pressure: {
    threat: "Pressure Tool 2/3",
    stat: "+1 control",
    strong: "Drains stamina and raises finish odds",
    risk: "Low score if they escape",
    leads: ["Better Finish Odds"]
  },
  guard: {
    threat: "Reversal Threat 2/3",
    stat: "Creates sweeps, back takes, or guard attacks",
    strong: "Sweeps always land — control boosts your SUBMISSIONS, not sweep success",
    risk: "Weak if posture wins",
    leads: ["Top Position", "Submissions"]
  },
  setup: {
    threat: "Chain Starter 1/3",
    stat: "Builds control or posture advantage",
    strong: "Opens stronger next-turn cards",
    risk: "Low immediate scoring value",
    leads: ["Combos"]
  },
  counter: {
    threat: "Counter Window 2/3",
    stat: "Stops the right attack",
    strong: "Punishes predictable offense",
    risk: "Low value if opponent ignores it",
    leads: ["Control Swing"]
  },
  escape: {
    threat: "Survival Tool 1/3",
    stat: "Improves bad positions",
    strong: "Stops opponent momentum",
    risk: "Usually does not score",
    leads: ["Guard Recovery", "Neutral"]
  },
  recovery: {
    threat: "Reset 1/3",
    stat: "+2 stamina",
    strong: "Sets up a bigger next turn",
    risk: "Gives up a little control",
    leads: ["More Stamina"]
  }
};

const cardStrategyNotes = {
  "collar-tie": {
    threat: "Grip Fight 1/3",
    stat: "+1 control, -1 opponent stamina",
    strong: "Feeds Snapdown and Arm Drag chains",
    risk: "No score unless you follow up",
    leads: ["Snapdown", "Arm Drag"]
  },
  "snapdown": {
    threat: "Chain Starter 2/3",
    stat: "+1 control and Front Headlock",
    strong: "Turns posture breaks into chokes",
    risk: "Weak if they hand fight free",
    leads: ["Front Headlock", "Guillotine", "Anaconda"]
  },
  "headlock-pressure": {
    threat: "Control Lock 2/3",
    stat: "+1 control, -1 opponent stamina",
    strong: "Makes front headlock finishes scarier",
    risk: "Loses value if they square up",
    leads: ["Guillotine", "D'Arce", "Anaconda"]
  },
  "guillotine": {
    threat: "Finish Threat 3/3",
    stat: "35% base finish chance",
    strong: "Strong vs tired opponents and Front Headlock",
    risk: "Fails if head control escapes",
    flavor: "Crushes opponents who leave their head exposed.",
    leads: ["Tapout"]
  },
  "darce": {
    strong: "Strong after Snapdown or heavy passing",
    risk: "Needs head-and-arm control",
    leads: ["Tapout"]
  },
  "anaconda": {
    strong: "Strong after Snapdown pressure",
    risk: "Fails if they flatten out or clear the arm",
    leads: ["Tapout"]
  },
  "double-leg": {
    stat: "Scores 2 points into Top Half Guard",
    strong: "Explosive when opponent is low on stamina",
    risk: "Loses hard to Sprawl",
    leads: ["Top Half Guard", "Body Lock Pass", "Knee Slice"]
  },
  "single-leg": {
    stat: "Scores 2 points into Top Half Guard",
    strong: "Pairs with Body Lock Pass",
    risk: "Can stall if opponent sprawls",
    leads: ["Top Half Guard", "Body Lock Pass"]
  },
  "sprawl": {
    stat: "Counters takedowns",
    strong: "Best when opponent wants wrestling",
    risk: "Weak if they choose guard or setup",
    leads: ["Front Headlock", "Guillotine", "D'Arce"]
  },
  "guard-pull": {
    stat: "Safe entry to Bottom Guard",
    strong: "Turns standing into guard attacks",
    risk: "No points gained",
    leads: ["Triangle", "Armbar", "Sweeps"]
  },
  "arm-drag": {
    stat: "Back take if stamina is equal or better",
    strong: "Strong after Wrist Control",
    risk: "Misses if you are behind on stamina",
    leads: ["Back Control", "Rear Naked Choke"]
  },
  "knee-slice": {
    stat: "Scores 3 points into Side Control",
    strong: "Pairs with Mount",
    risk: "Weak into Frame",
    leads: ["Side Control", "Mount", "Arm Triangle"]
  },
  "torreando": {
    stat: "Scores 3 points into Side Control",
    strong: "Strong against open guard legs",
    risk: "Weak if hips recover first",
    leads: ["Side Control", "Knee On Belly"]
  },
  "leg-drag": {
    stat: "Scores 3 points into Side Control",
    strong: "Threatens back exposure",
    risk: "Needs leg control to stick",
    leads: ["Side Control", "Back Control"]
  },
  "body-lock-pass": {
    stat: "Costs 3, +1 control, scores 3",
    strong: "Heavy against guard players",
    risk: "Costs tempo if they frame early",
    leads: ["Side Control", "Mount"]
  },
  "mount": {
    stat: "Scores 4 points",
    strong: "Opens high-value finishes",
    risk: "Bridge and elbow escape can reset it",
    leads: ["Arm Triangle", "Armbar"]
  },
  "closed-guard-sweep": {
    stat: "Scores 2 and lands in Mount",
    strong: "Immediately creates armbar danger",
    risk: "Needs broken posture",
    leads: ["Mount", "Armbar"]
  },
  "hip-bump-sweep": {
    stat: "Scores 2 and lands in Mount",
    strong: "Explosive vs leaning opponents",
    risk: "Weak if opponent stays low and posted",
    leads: ["Mount", "Armbar"]
  },
  "scissor-sweep": {
    stat: "Scores 2 into Top Guard",
    strong: "Turns guard into passing pressure",
    risk: "Needs collar-and-sleeve control",
    leads: ["Top Guard", "Knee Slice"]
  },
  "butterfly-sweep": {
    stat: "Scores 2 into Top Half Guard",
    strong: "Creates leg-lock entry follow-ups",
    risk: "Needs hooks and posture control",
    leads: ["Top Half Guard", "Ashi Garami"]
  },
  "old-school-sweep": {
    stat: "Scores 2 into Top Half Guard",
    strong: "Strong from half guard scrambles",
    risk: "Can expose leg lock counters",
    leads: ["Top Half Guard", "Ashi Garami"]
  },
  "ashi-garami-entry": {
    threat: "Leg Trap 2/3",
    stat: "+1 control and enters Ashi Garami",
    strong: "Turns bottom guard into real leg-lock danger",
    risk: "Needs a finish or they can clear the leg",
    leads: ["Straight Ankle Lock", "Heel Hook"]
  },
  "straight-ankle-lock": {
    strong: "Strong after Ashi Garami Entry",
    risk: "Fails if the leg slips free",
    leads: ["Tapout"]
  },
  "heel-hook": {
    threat: "Finish Threat 3/3",
    stat: "35% base finish chance",
    strong: "Very strong from Ashi Garami vs tired opponents",
    risk: "High stamina cost if it misses",
    leads: ["Tapout"]
  },
  "hip-escape": {
    stat: "Recovers one step toward guard",
    strong: "Best before control snowballs",
    risk: "Does not score",
    leads: ["Bottom Half Guard", "Bottom Guard"]
  },
  "elbow-escape": {
    stat: "Escapes Mount to Bottom Half Guard",
    strong: "Stops mount pressure",
    risk: "Still leaves you underneath",
    leads: ["Bottom Half Guard", "Recover Guard"]
  },
  "bridge": {
    stat: "Explodes Mount into Bottom Half Guard",
    strong: "Best when opponent is high in mount",
    risk: "Costs 2 stamina from a bad spot",
    leads: ["Bottom Half Guard", "Recover Guard"]
  },
  "technical-bridge": {
    stat: "Escapes pressure into Turtle",
    strong: "Stops being flattened out",
    risk: "Still gives the opponent back/choke threats",
    leads: ["Turtle", "Hand Fight"]
  },
  "hand-fight": {
    stat: "Escapes back to Standing",
    strong: "Best vs Back Control, Front Headlock, Turtle, or trapped legs",
    risk: "No score, pure survival",
    leads: ["Standing"]
  },
  "protect-neck": {
    stat: "Counters chokes and pressure",
    strong: "Buys time against Back Control, Front Headlock, or Turtle attacks",
    risk: "Does not improve position by itself",
    leads: ["Hand Fight", "Escape"]
  }
};

function cardIntent(card) {
  return intentMetaByType[card.type] || { label: "Move", className: "setup" };
}

function cardStrategy(card) {
  return {
    ...(defaultStrategyByType[card.type] || defaultStrategyByType.setup),
    ...(cardStrategyNotes[card.id] || {})
  };
}

function cardTechnique(card) {
  if (typeof techniqueForCard !== "function") return null;
  return techniqueForCard(card);
}

function cleanMetadataList(items, fallback = []) {
  const source = Array.isArray(items) && items.length ? items : fallback;
  return source.filter(Boolean);
}

function shortMetadataList(items, fallbackText = "None listed") {
  const cleanItems = cleanMetadataList(items);
  if (!cleanItems.length) return fallbackText;
  return cleanItems.slice(0, 3).join(", ");
}

function normalizedRarity(rarity) {
  const value = String(rarity || "common").toLowerCase();
  return rarityLabels[value] ? value : "common";
}

const rarityByCardId = {
  "rear-naked-choke": "legendary",
  "heel-hook": "legendary",
  "arm-triangle": "legendary",
  darce: "legendary",
  anaconda: "legendary",
  "double-leg": "epic",
  "arm-drag": "epic",
  armbar: "epic",
  triangle: "epic",
  kimura: "epic",
  "body-lock-pass": "epic",
  "leg-drag": "epic",
  "ashi-garami-entry": "epic",
  "hip-toss": "epic",
  guillotine: "epic",
  "single-leg": "rare",
  snapdown: "rare",
  "duck-under": "rare",
  "inside-trip": "rare",
  "ankle-pick": "rare",
  torreando: "rare",
  "hip-bump-sweep": "rare",
  "scissor-sweep": "rare",
  "butterfly-sweep": "rare",
  mount: "rare"
};

const rarityLabels = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary"
};

function cardRarity(card) {
  const technique = cardTechnique(card);
  return rarityByCardId[card.id] || normalizedRarity(technique?.raritySuggestion);
}

function cardCategory(card) {
  const technique = cardTechnique(card);
  if (technique?.category) return technique.category;
  if (["double-leg", "single-leg", "body-lock", "inside-trip", "ankle-pick", "duck-under", "hip-toss", "snapdown", "sprawl", "arm-drag"].includes(card.id)) return "Wrestling";
  if (["ashi-garami-entry", "straight-ankle-lock", "heel-hook"].includes(card.id)) return "Leg Locks";
  if (["rear-naked-choke", "seatbelt-pressure"].includes(card.id)) return "Back Attacks";
  if (card.type === "guard") return "Guard";
  if (card.type === "pass" || card.type === "pressure") return "Passing";
  if (card.type === "submission") return "Submissions";
  if (card.type === "escape" || card.type === "counter") return "Defense";
  return "Technique";
}

function cardTechniqueType(card) {
  const technique = cardTechnique(card);
  if (technique?.subcategory && technique?.category) return `${technique.subcategory} / ${technique.category}`;
  const specialLabels = {
    "arm-drag": "Sweep / Takedown",
    "double-leg": "Wrestling / Takedown",
    "single-leg": "Wrestling / Takedown",
    snapdown: "Setup / Front Headlock",
    "knee-slice": "Pass / Control",
    "body-lock-pass": "Pass / Pressure",
    "leg-drag": "Pass / Back Exposure",
    "guard-pull": "Guard / Entry",
    "ashi-garami-entry": "Leg Lock / Entry",
    "straight-ankle-lock": "Leg Lock / Finish",
    "rear-naked-choke": "Back Attack / Finish",
    mount: "Position / Control",
    rest: "Recovery / Reset"
  };
  if (specialLabels[card.id]) return specialLabels[card.id];
  const intent = cardIntent(card).label;
  return `${intent} / ${cardCategory(card)}`;
}

function cardQuote(card) {
  const quotes = {
    "arm-drag": "Control the grip, control the fight.",
    "double-leg": "Change levels first. Finish second.",
    snapdown: "Break posture before you chase the neck.",
    guillotine: "A loose head becomes a problem fast.",
    "knee-slice": "Win the knee line, win the pass.",
    mount: "Pressure turns position into panic.",
    "rear-naked-choke": "Hooks first, patience second, finish last.",
    "ashi-garami-entry": "Trap the leg before hunting the lock.",
    "straight-ankle-lock": "Pinch the knees and make the foot matter.",
    "heel-hook": "Small rotation. Big consequence.",
    rest: "Breathe now, attack later."
  };
  return quotes[card.id] || "Build the exchange one grip at a time.";
}

function chainBonusText(rule) {
  const parts = [];
  if (rule.submission) parts.push(`+${rule.submission}% finish`);
  if (rule.control) parts.push(`+${rule.control} control`);
  return parts.join(", ");
}

function outgoingChainHints(cardId) {
  return Object.entries(chainRules)
    .filter(([key]) => key.startsWith(`${cardId}>`))
    .map(([key, rule]) => {
      const nextId = key.split(">")[1];
      const nextCard = cards.find((candidate) => candidate.id === nextId);
      const nextName = nextCard ? nextCard.name : nextId;
      return `${nextName}: ${chainBonusText(rule)}`;
    })
    .slice(0, 2);
}

function chipsHtml(items, className) {
  return items.map((item) => `<span class="${className}">${escapeHtml(item)}</span>`).join("");
}

const POSITION_ABBREV = {
  "Standing": "STAND",
  "Top Guard": "TOP GD",
  "Bottom Guard": "BOT GD",
  "Top Half Guard": "HALF T",
  "Bottom Half Guard": "HALF B",
  "Side Control": "SC",
  "Under Side Control": "USC",
  "Mount": "MNT",
  "Mounted": "MTND",
  "Back Control": "BACK",
  "Back Taken": "BCK TKN",
  "Front Headlock": "FHL",
  "Caught Front Headlock": "C-FHL",
  "Turtle": "TRTL",
  "Ashi Garami": "ASHI",
  "Caught Ashi Garami": "C-ASHI"
};

function positionChipsHtml(card, currentPosition) {
  return (card.requires || []).map((pos) => {
    const isCurrent = pos === currentPosition;
    return `<span class="card-position-chip${isCurrent ? " chip-current" : ""}">${POSITION_ABBREV[pos] || pos}</span>`;
  }).join("");
}

function renderHand() {
  els.cardHand.innerHTML = "";
  state.hand.forEach((card) => {
    const button = document.createElement("button");
    const rarity = cardRarity(card);
    const effectiveCost = effectiveCardCost(card, "player");
    button.className = `card rarity-${rarity}`;
    button.type = "button";
    button.dataset.type = card.type;
    button.dataset.rarity = rarity;
    button.disabled = state.finished || state.animating || state.player.stamina < effectiveCost;
    const intent = cardIntent(card);
    const strategy = cardStrategy(card);
    const technique = cardTechnique(card);
    const worksFrom = cleanMetadataList(technique?.worksFrom, card.requires);
    const successLeads = cleanMetadataList(technique?.leadsTo, strategy.leads).slice(0, 4);
    const counters = cleanMetadataList(technique?.counters).slice(0, 3);
    const followUps = cleanMetadataList(technique?.followUps).slice(0, 3);
    const riskReward = technique
      ? `Risk ${technique.riskLevel}/5 | Reward ${technique.rewardLevel}/5`
      : strategy.risk;
    const chain = getChainBonus(state.lastPlayerCardId, card.id);
    const chainHints = outgoingChainHints(card.id);
    const comboText = chainHints.length
      ? chainHints.join(" / ")
      : followUps.length
        ? `Follow-ups: ${followUps.join(", ")}.`
        : `Leads to ${successLeads.slice(0, 3).join(", ")}.`;
    button.innerHTML = `
      <div class="card-frame">
        <div class="card-topline">
          <span class="rarity-lockup">
            <span class="rarity-gem" aria-hidden="true"></span>
            <span>${rarityLabels[rarity]}</span>
          </span>
          <span class="card-stamina"><strong>${effectiveCost}</strong><small>STA</small></span>
        </div>
        <strong class="card-title">${escapeHtml(card.name)}</strong>
        <span class="card-technique-type">${escapeHtml(cardTechniqueType(card))}</span>
        <div class="card-position-chips">${positionChipsHtml(card, state.position)}</div>
        <div class="card-art" aria-hidden="true">${cardArt(card)}</div>
        <div class="card-body">
          <div class="card-kicker">
            <span class="intent-badge intent-${intent.className}">${intent.label}</span>
            <span class="threat-label">${strategy.threat}</span>
          </div>
          <p class="card-flavor">${escapeHtml(strategy.flavor || card.text)}</p>
          <div class="card-info">
            <div class="card-info-row">
              <span>From</span>
              <strong>${escapeHtml(shortMetadataList(worksFrom))}</strong>
            </div>
            <div class="card-info-row">
              <span>Effect</span>
              <p>${escapeHtml(strategy.stat)} <em>${escapeHtml(strategy.strong)}</em></p>
            </div>
            <div class="card-info-row">
              <span>Countered By</span>
              <p>${escapeHtml(shortMetadataList(counters, "No direct counter listed"))}</p>
            </div>
            <div class="card-info-row">
              <span>Risk / Reward</span>
              <p>${escapeHtml(riskReward)}</p>
            </div>
            <div class="card-info-row">
              <span>Combo</span>
              <p>${escapeHtml(comboText)}</p>
            </div>
          </div>
          ${chain ? `<div class="active-combo">Active Combo: ${escapeHtml(chain.label)} (${escapeHtml(chainBonusText(chain))})</div>` : ""}
          <div class="card-leads">
            <span class="card-section-label">Success Leads To</span>
            <div class="lead-chips">${chipsHtml(successLeads, "lead-chip")}</div>
          </div>
          <blockquote>${escapeHtml(cardQuote(card))}</blockquote>
          <div class="card-footer">
            <span>Technique</span>
            <span>${escapeHtml(cardCategory(card))}</span>
          </div>
        </div>
      </div>
    `;
    button.addEventListener("click", () => handleCardClick(card.id));
    els.cardHand.appendChild(button);
  });
}

function cardArt(card) {
  const artByType = {
    setup: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="46" cy="28" r="10" fill="#dff8e8"/>
        <circle cx="94" cy="28" r="10" fill="#ffd5cf"/>
        <path d="M52 40 C63 52 77 52 88 40" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <path d="M58 44 L82 44" stroke="#f3c76b" stroke-width="8" stroke-linecap="round"/>
        <path d="M38 46 L24 62 M102 46 L116 62" stroke="#ffd5cf" stroke-width="7" stroke-linecap="round"/>
        <path d="M66 24 C72 14 82 14 88 24" fill="none" stroke="#8fe6b1" stroke-width="5" stroke-linecap="round"/>
      </svg>`,
    takedown: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="38" cy="22" r="10" fill="#dff8e8"/>
        <circle cx="98" cy="22" r="10" fill="#ffd5cf"/>
        <path d="M42 34 C58 45 73 49 92 42" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <path d="M98 34 L86 60" stroke="#ffd5cf" stroke-width="10" stroke-linecap="round"/>
        <path d="M52 50 L30 64 M58 52 L78 66" stroke="#dff8e8" stroke-width="8" stroke-linecap="round"/>
        <path d="M83 43 L112 54" stroke="#ffd5cf" stroke-width="8" stroke-linecap="round"/>
      </svg>`,
    guard: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="70" cy="52" r="10" fill="#dff8e8"/>
        <path d="M42 58 C58 42 82 42 98 58" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <circle cx="70" cy="24" r="10" fill="#ffd5cf"/>
        <path d="M70 34 L70 56" stroke="#ffd5cf" stroke-width="12" stroke-linecap="round"/>
        <path d="M52 38 L34 25 M88 38 L106 25" stroke="#dff8e8" stroke-width="8" stroke-linecap="round"/>
      </svg>`,
    counter: `
      <svg viewBox="0 0 140 80" role="img">
        <path d="M31 42 C48 20 72 18 91 34" fill="none" stroke="#ffd5cf" stroke-width="9" stroke-linecap="round"/>
        <path d="M48 50 L92 32" stroke="#dff8e8" stroke-width="12" stroke-linecap="round"/>
        <circle cx="38" cy="54" r="10" fill="#dff8e8"/>
        <circle cx="98" cy="29" r="10" fill="#ffd5cf"/>
        <path d="M75 17 L96 17 L88 7" fill="none" stroke="#f3c76b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    pass: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="48" cy="26" r="10" fill="#dff8e8"/>
        <path d="M52 38 L78 50 L104 42" fill="none" stroke="#dff8e8" stroke-width="11" stroke-linecap="round"/>
        <circle cx="88" cy="56" r="9" fill="#ffd5cf"/>
        <path d="M50 62 C68 44 92 42 112 58" fill="none" stroke="#ffd5cf" stroke-width="9" stroke-linecap="round"/>
        <path d="M70 26 L96 18" stroke="#67d391" stroke-width="6" stroke-linecap="round"/>
      </svg>`,
    pressure: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="56" cy="25" r="10" fill="#dff8e8"/>
        <path d="M58 36 C72 49 88 50 104 42" fill="none" stroke="#dff8e8" stroke-width="13" stroke-linecap="round"/>
        <circle cx="85" cy="58" r="9" fill="#ffd5cf"/>
        <path d="M44 61 L112 61" stroke="#ffd5cf" stroke-width="10" stroke-linecap="round"/>
        <path d="M67 42 L92 56" stroke="#67d391" stroke-width="7" stroke-linecap="round"/>
      </svg>`,
    escape: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="56" cy="56" r="10" fill="#dff8e8"/>
        <path d="M42 58 C58 45 75 43 94 54" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <circle cx="90" cy="28" r="10" fill="#ffd5cf"/>
        <path d="M88 38 L70 54" stroke="#ffd5cf" stroke-width="10" stroke-linecap="round"/>
        <path d="M36 35 C25 43 25 58 37 66" fill="none" stroke="#6fa8ff" stroke-width="6" stroke-linecap="round"/>
        <path d="M33 34 L47 35 L39 23" fill="none" stroke="#6fa8ff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
    submission: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="58" cy="42" r="10" fill="#dff8e8"/>
        <circle cx="88" cy="42" r="10" fill="#ffd5cf"/>
        <path d="M48 55 C62 23 87 23 102 55" fill="none" stroke="#dff8e8" stroke-width="10" stroke-linecap="round"/>
        <path d="M68 40 L96 40" stroke="#f06a5f" stroke-width="8" stroke-linecap="round"/>
        <path d="M52 60 L38 70 M99 60 L113 70" stroke="#ffd5cf" stroke-width="7" stroke-linecap="round"/>
      </svg>`,
    recovery: `
      <svg viewBox="0 0 140 80" role="img">
        <circle cx="70" cy="28" r="12" fill="#dff8e8"/>
        <path d="M70 42 L70 62" stroke="#dff8e8" stroke-width="12" stroke-linecap="round"/>
        <path d="M50 50 L35 38 M90 50 L105 38" stroke="#dff8e8" stroke-width="8" stroke-linecap="round"/>
        <path d="M34 22 C45 10 59 9 70 19 C81 9 95 10 106 22" fill="none" stroke="#f3c76b" stroke-width="6" stroke-linecap="round"/>
      </svg>`
  };
  return artByType[card.type] || artByType.recovery;
}

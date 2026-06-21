// Meta Progression — unlock tree, stats tracking, announcer, card back system.
// Loaded before gameState.js and ui files.

// ── Unlock definitions ────────────────────────────────────────────────────

const UNLOCK_DEFS = {
  opponents: [
    { id: "wrestler",         name: "The Wrestler",       always: true },
    { id: "triangle-hunter",  name: "Triangle Hunter",    always: true },
    { id: "pressure-passer",  name: "Pressure Passer",    condition: { type: "wins",    value: 3  }, hint: "Win 3 matches" },
    { id: "scrambler",        name: "The Scrambler",      condition: { type: "wins",    value: 7  }, hint: "Win 7 matches" },
    { id: "leg-locker",       name: "The Leg Locker",     condition: { type: "wins",    value: 12 }, hint: "Win 12 matches" },
    { id: "clinch-king",      name: "The Clinch King",    condition: { type: "belt",    value: "blue"   }, hint: "Reach Blue Belt" },
    { id: "ground-specialist",name: "Ground Specialist",  condition: { type: "wins",    value: 20 }, hint: "Win 20 matches" },
    { id: "the-champion",     name: "The Champion",       condition: { type: "belt",    value: "purple" }, hint: "Reach Purple Belt" }
  ],
  venues: [
    { id: "academy",      name: "Old School Academy",     always: true },
    { id: "local-event",  name: "Local Grappling Event",  condition: { type: "wins",    value: 1  }, hint: "Win 1 match" },
    { id: "open-arena",   name: "Open Tournament",        condition: { type: "wins",    value: 5  }, hint: "Win 5 matches" },
    { id: "beach",        name: "Beach Rollout",          condition: { type: "wins",    value: 8  }, hint: "Win 8 matches" },
    { id: "championship", name: "World Finals Arena",     condition: { type: "belt",    value: "blue" }, hint: "Reach Blue Belt" },
    { id: "street",       name: "Street Open Mat",        condition: { type: "matches", value: 15 }, hint: "Play 15 matches" }
  ],
  cardBacks: [
    { id: "default",    name: "White Gi",           always: true },
    { id: "blue-gi",    name: "Blue Gi",            condition: { type: "belt",        value: "blue"          }, hint: "Reach Blue Belt" },
    { id: "tatami",     name: "Tatami Grid",        condition: { type: "wins",        value: 10              }, hint: "Win 10 matches" },
    { id: "no-gi",      name: "No-Gi Rashguard",    condition: { type: "achievement", value: "chain-reaction" }, hint: "Land a chain combo" },
    { id: "champion",   name: "Champion Gold",      condition: { type: "belt",        value: "purple"        }, hint: "Reach Purple Belt" }
  ],
  announcers: [
    { id: "neutral",    name: "Neutral",            symbol: "🎙️",  always: true },
    { id: "coach",      name: "The Coach",          symbol: "📋",  condition: { type: "wins",  value: 1  }, hint: "Win your first match" },
    { id: "hype",       name: "Hype Man",           symbol: "🔥",  condition: { type: "wins",  value: 5  }, hint: "Win 5 matches" },
    { id: "technical",  name: "Technical Analyst",  symbol: "🥋",  condition: { type: "belt",  value: "blue" }, hint: "Reach Blue Belt" }
  ]
};

// ── Persistence ───────────────────────────────────────────────────────────

const PROGRESSION_STATS_KEY = "tapoutTacticsProgressionStats";
const UNLOCKED_ITEMS_KEY    = "tapoutTacticsUnlockedItems";
const SELECTED_CARD_BACK_KEY = "tapoutTacticsCardBack";
const SELECTED_ANNOUNCER_KEY = "tapoutTacticsAnnouncer";

function loadProgressionStats() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESSION_STATS_KEY) || "{}");
  } catch { return {}; }
}

function saveProgressionStats(stats) {
  localStorage.setItem(PROGRESSION_STATS_KEY, JSON.stringify(stats));
}

function loadUnlockedItems() {
  try {
    return new Set(JSON.parse(localStorage.getItem(UNLOCKED_ITEMS_KEY) || "[]"));
  } catch { return new Set(); }
}

function saveUnlockedItems(set) {
  localStorage.setItem(UNLOCKED_ITEMS_KEY, JSON.stringify([...set]));
}

function getProgressionStats() {
  const s = loadProgressionStats();
  return {
    totalWins:    Number(s.totalWins)    || 0,
    totalMatches: Number(s.totalMatches) || 0,
    currentBelt:  s.currentBelt          || "white"
  };
}

function recordMatchResult(won) {
  const s = getProgressionStats();
  s.totalMatches += 1;
  if (won) s.totalWins += 1;
  // Belt derived from global playerXp (loaded at runtime)
  if (typeof getBeltProgress === "function" && typeof playerXp !== "undefined") {
    s.currentBelt = getBeltProgress(playerXp).current.short;
  }
  saveProgressionStats(s);
  return s;
}

function selectedCardBack() {
  return localStorage.getItem(SELECTED_CARD_BACK_KEY) || "default";
}

function setCardBack(id) {
  localStorage.setItem(SELECTED_CARD_BACK_KEY, id);
  applyCardBack(id);
}

function selectedAnnouncer() {
  return localStorage.getItem(SELECTED_ANNOUNCER_KEY) || "neutral";
}

function setAnnouncer(id) {
  localStorage.setItem(SELECTED_ANNOUNCER_KEY, id);
}

// ── Unlock checking ───────────────────────────────────────────────────────

function isItemUnlocked(id) {
  // Always-unlocked items
  for (const category of Object.values(UNLOCK_DEFS)) {
    const def = category.find((d) => d.id === id);
    if (def?.always) return true;
  }
  return loadUnlockedItems().has(id);
}

function evaluateCondition(condition, stats, achievements) {
  if (!condition) return false;
  const { type, value } = condition;
  if (type === "wins")    return stats.totalWins >= value;
  if (type === "matches") return stats.totalMatches >= value;
  if (type === "belt") {
    const beltOrder = ["white", "blue", "purple", "brown", "black", "coral"];
    return beltOrder.indexOf(stats.currentBelt) >= beltOrder.indexOf(value);
  }
  if (type === "achievement") return achievements.has(value);
  return false;
}

function checkAndGrantUnlocks(stats, achievements) {
  const existing = loadUnlockedItems();
  const newUnlocks = [];
  for (const category of Object.values(UNLOCK_DEFS)) {
    for (const def of category) {
      if (def.always || existing.has(def.id)) continue;
      if (evaluateCondition(def.condition, stats, achievements)) {
        existing.add(def.id);
        newUnlocks.push(def);
      }
    }
  }
  if (newUnlocks.length) {
    saveUnlockedItems(existing);
    newUnlocks.forEach((def) => flashUnlockToast(def));
  }
  return newUnlocks;
}

function getUnlockedOpponents() {
  return UNLOCK_DEFS.opponents.filter((d) => d.always || isItemUnlocked(d.id));
}

function getUnlockedVenues() {
  return UNLOCK_DEFS.venues.filter((d) => d.always || isItemUnlocked(d.id));
}

function getNextUnlocks(limit = 3) {
  const stats = getProgressionStats();
  const achievements = typeof loadAchievements === "function" ? new Set(loadAchievements()) : new Set();
  const all = Object.values(UNLOCK_DEFS).flat();
  return all
    .filter((d) => !d.always && !isItemUnlocked(d.id))
    .slice(0, limit);
}

function progressTowardCondition(condition, stats) {
  if (!condition) return { current: 0, total: 1 };
  const { type, value } = condition;
  if (type === "wins")    return { current: Math.min(stats.totalWins, value),    total: value };
  if (type === "matches") return { current: Math.min(stats.totalMatches, value), total: value };
  if (type === "belt")    return { current: null, total: null };
  if (type === "achievement") return { current: null, total: null };
  return { current: 0, total: 1 };
}

// ── Unlock toast ──────────────────────────────────────────────────────────

function flashUnlockToast(def) {
  if (typeof escapeHtml !== "function") return;
  const toast = document.createElement("div");
  toast.className = "unlock-toast";
  toast.innerHTML = `
    <div class="unlock-toast-badge">NEW</div>
    <div class="unlock-toast-body">
      <strong>Unlocked: ${escapeHtml(def.name)}</strong>
      <span>${escapeHtml(def.hint || "")}</span>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("unlock-toast-visible"), 60);
  setTimeout(() => {
    toast.classList.remove("unlock-toast-visible");
    setTimeout(() => toast.remove(), 500);
  }, 4000);
  if (typeof SFX !== "undefined") SFX.select();
}

// ── Card back CSS ─────────────────────────────────────────────────────────

function applyCardBack(id) {
  document.documentElement.dataset.cardBack = id || "default";
}

// Apply on load
applyCardBack(selectedCardBack());

// ── Announcer text transformer ────────────────────────────────────────────

function announceCardChoice(playerName, opponentName) {
  const ann = selectedAnnouncer();
  if (ann === "hype")      return `${playerName.toUpperCase()}!! Opponent fires back with ${opponentName}!`;
  if (ann === "technical") return `Player selects ${playerName} — position-appropriate technique. Opponent counters with ${opponentName}.`;
  if (ann === "coach")     return `Good read with ${playerName}. They went ${opponentName} — adjust next turn.`;
  return `You choose ${playerName}. Opponent chooses ${opponentName}.`;
}

function announceChain(label) {
  const ann = selectedAnnouncer();
  if (ann === "hype")      return `CHAIN BONUS! ${label} — that's how you link attacks!`;
  if (ann === "technical") return `Combination confirmed: ${label}. Sequential technique bonus applied.`;
  if (ann === "coach")     return `That's the chain — ${label}. Keep building sequences.`;
  return `Chain bonus: ${label}.`;
}

function announceSubmissionMiss(attacker, subName, roll, chance) {
  const ann = selectedAnnouncer();
  const label = `[roll ${roll} vs ${chance}% needed]`;
  if (ann === "hype")      return `SO CLOSE! ${attacker} throws the ${subName} ${label} — they survive this time!`;
  if (ann === "technical") return `${attacker} initiates ${subName} ${label}. Insufficient control differential — defense holds.`;
  if (ann === "coach")     return `${attacker} attacks the ${subName} ${label}. Build more control before the next attempt.`;
  return `${attacker} attacks ${subName} ${label} — opponent survives.`;
}

function announceFinish(attacker, subName) {
  const ann = selectedAnnouncer();
  if (ann === "hype")      return `TAP TAP TAP!! ${attacker} FINISHES the ${subName}! IT'S OVER!`;
  if (ann === "technical") return `${attacker} secures the ${subName}. Clean mechanical finish — opponent taps.`;
  if (ann === "coach")     return `That's a finish. ${subName} by ${attacker}. Perfect setup-to-payoff sequence.`;
  return `${attacker} finishes the ${subName}. Tap!`;
}

function announceScore(actor, points, position) {
  const ann = selectedAnnouncer();
  if (ann === "hype")      return `+${points} POINTS!! ${actor === "player" ? "You're building a lead!" : "They're taking control!"}`;
  if (ann === "technical") return `${points} point${points > 1 ? "s" : ""} awarded. ${position} established.`;
  if (ann === "coach")     return `${points} on the board. Keep working the position.`;
  return null; // default uses existing log entries
}

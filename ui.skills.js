// Progression and archetype skill tree UI.
function renderProgression() {
  const progress = getBeltProgress(playerXp);
  const style = selectedStyle();
  const currentStyleProgress = styleProgressFor(style.id);
  els.beltName.textContent = progress.current.name;
  els.xpText.textContent = `${playerXp} XP`;
  els.beltGraphic.innerHTML = beltGraphic(progress);
  els.nextBeltText.textContent = progress.next
    ? `${progress.currentProgress}/${progress.needed} XP to ${progress.next.name} - ${progress.stripes}/4 stripes`
    : "Max rank reached";
  els.xpBar.style.width = `${progress.percent}%`;
  els.styleProgressText.textContent = `${style.name} mastery: ${currentStyleProgress.xp} XP, ${skillSpentPointsForStyle(style.id)} skill points spent`;
}

function renderSkillTree() {
  const tree = activeSkillTree();
  els.skillPointText.textContent = `${availableSkillPoints()} ${selectedStyle().name} Skill Points`;
  els.skillTree.innerHTML = "";
  tree.forEach((branch) => {
    const branchEl = document.createElement("div");
    branchEl.className = "skill-branch";
    branchEl.innerHTML = `<h3>${escapeHtml(branch.branch)}</h3>`;
    branch.skills.forEach((skill) => {
      const rank = skillRank(skill.id);
      const maxRank = skillMaxRank(skill);
      const maxed = rank >= maxRank;
      const prereqsMet = skillPrereqsMet(skill);
      const prereqText = (skill.requires || [])
        .filter((requiredId) => skillRank(requiredId) < 1)
        .map((requiredId) => findSkill(requiredId)?.name || requiredId)
        .join(", ");
      const button = document.createElement("button");
      button.className = `skill-node${rank > 0 ? " unlocked" : ""}${maxed ? " maxed" : ""}${!prereqsMet ? " locked" : ""}`;
      button.type = "button";
      button.disabled = maxed || !prereqsMet || availableSkillPoints() < 1;
      button.innerHTML = `
        <div class="skill-node-top">
          <strong>${escapeHtml(skill.name)}</strong>
          <em>Rank ${rank}/${maxRank}</em>
        </div>
        <span>${escapeHtml(skill.effect)}</span>
        ${skill.unlocks?.length ? `<small>Unlocks: ${escapeHtml(skill.unlocks.map(cardNameById).join(", "))}</small>` : ""}
        ${skill.bonus ? `<small>Bonus: ${escapeHtml(skill.bonus.replaceAll("-", " "))}</small>` : ""}
        ${!prereqsMet ? `<small class="skill-lock">Requires: ${escapeHtml(prereqText)}</small>` : ""}
      `;
      button.addEventListener("click", () => unlockSkill(skill.id));
      branchEl.appendChild(button);
    });
    els.skillTree.appendChild(branchEl);
  });
}

function cardNameById(cardId) {
  return cards.find((card) => card.id === cardId)?.name || cardId;
}

// ── Career Path UI ────────────────────────────────────────────────────────

function renderCareerPath() {
  renderCareerStats();
  renderNextUnlocks();
  renderUnlockedRoster();
  renderCardBackSelector();
  renderAnnouncerSelector();
}

function renderCareerStats() {
  const el = document.getElementById("careerStats");
  if (!el || typeof getProgressionStats !== "function") return;
  const s = getProgressionStats();
  el.innerHTML = `<strong>${s.totalWins}</strong> wins &nbsp;·&nbsp; <strong>${s.totalMatches}</strong> matches`;
}

function renderNextUnlocks() {
  const el = document.getElementById("nextUnlocksList");
  if (!el || typeof getNextUnlocks !== "function") return;
  const next = getNextUnlocks(4);
  if (!next.length) {
    el.innerHTML = `<div class="next-unlock-item"><strong>All items unlocked!</strong><small>You have everything.</small></div>`;
    return;
  }
  const stats = typeof getProgressionStats === "function" ? getProgressionStats() : {};
  el.innerHTML = next.map((def) => {
    const prog = typeof progressTowardCondition === "function"
      ? progressTowardCondition(def.condition, stats)
      : { current: null, total: null };
    const hasBar = prog.current !== null && prog.total !== null;
    const pct = hasBar ? Math.round((prog.current / prog.total) * 100) : 0;
    return `
      <div class="next-unlock-item">
        <strong>${escapeHtml(def.name)}</strong>
        <small>${escapeHtml(def.hint || "")}</small>
        ${hasBar ? `
          <div class="next-unlock-progress">
            <span style="width:${pct}%"></span>
          </div>
          <small style="margin-top:0.2rem;color:var(--blue)">${prog.current} / ${prog.total}</small>
        ` : ""}
      </div>
    `;
  }).join("");
}

function renderUnlockedRoster() {
  const el = document.getElementById("unlockedRoster");
  if (!el || typeof UNLOCK_DEFS === "undefined") return;
  const ICONS = {
    "wrestler": "🤼", "triangle-hunter": "🔺", "pressure-passer": "⚖️",
    "scrambler": "💥", "leg-locker": "🦵", "clinch-king": "🤛",
    "ground-specialist": "🎯", "the-champion": "🏆"
  };
  el.innerHTML = UNLOCK_DEFS.opponents.map((def) => {
    const unlocked = def.always || (typeof isItemUnlocked === "function" && isItemUnlocked(def.id));
    return `
      <div class="roster-slot ${unlocked ? "roster-unlocked" : "roster-locked"}" title="${unlocked ? def.name : "???"}">
        <span class="roster-slot-icon">${unlocked ? (ICONS[def.id] || "🥋") : "🔒"}</span>
        <span class="roster-slot-name">${unlocked ? escapeHtml(def.name.replace("The ", "")) : "???"}</span>
      </div>
    `;
  }).join("");
}

function renderCardBackSelector() {
  const el = document.getElementById("cardBackSelector");
  if (!el || typeof UNLOCK_DEFS === "undefined") return;
  const current = typeof selectedCardBack === "function" ? selectedCardBack() : "default";
  el.innerHTML = UNLOCK_DEFS.cardBacks.map((def) => {
    const unlocked = def.always || (typeof isItemUnlocked === "function" && isItemUnlocked(def.id));
    const isActive = def.id === current;
    return `
      <button type="button" class="card-back-btn${isActive ? " active" : ""}${!unlocked ? " locked" : ""}"
        ${!unlocked ? "disabled title=\"" + escapeHtml(def.hint || "") + "\"" : ""}
        data-cardback-id="${def.id}">
        <strong>${escapeHtml(def.name)}</strong>
        ${!unlocked ? `<small>${escapeHtml(def.hint || "")}</small>` : `<small>${isActive ? "Selected ✓" : "Click to use"}</small>`}
      </button>
    `;
  }).join("");
  el.querySelectorAll("[data-cardback-id]").forEach((btn) => {
    if (!btn.disabled) btn.addEventListener("click", () => {
      if (typeof setCardBack === "function") setCardBack(btn.dataset.cardbackId);
      renderCardBackSelector();
    });
  });
}

function renderAnnouncerSelector() {
  const el = document.getElementById("announcerSelector");
  if (!el || typeof UNLOCK_DEFS === "undefined") return;
  const current = typeof selectedAnnouncer === "function" ? selectedAnnouncer() : "neutral";
  el.innerHTML = UNLOCK_DEFS.announcers.map((def) => {
    const unlocked = def.always || (typeof isItemUnlocked === "function" && isItemUnlocked(def.id));
    const isActive = def.id === current;
    return `
      <button type="button" class="announcer-btn${isActive ? " active" : ""}${!unlocked ? " locked" : ""}"
        ${!unlocked ? "disabled title=\"" + escapeHtml(def.hint || "") + "\"" : ""}
        data-announcer-id="${def.id}">
        <strong>${def.symbol || "🎙️"} ${escapeHtml(def.name)}</strong>
        ${!unlocked ? `<small>${escapeHtml(def.hint || "")}</small>` : `<small>${isActive ? "Active ✓" : "Click to select"}</small>`}
      </button>
    `;
  }).join("");
  el.querySelectorAll("[data-announcer-id]").forEach((btn) => {
    if (!btn.disabled) btn.addEventListener("click", () => {
      if (typeof setAnnouncer === "function") setAnnouncer(btn.dataset.announcerId);
      renderAnnouncerSelector();
    });
  });
}

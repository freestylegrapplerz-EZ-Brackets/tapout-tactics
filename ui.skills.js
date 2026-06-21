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

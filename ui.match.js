// Match screen controls and intent copy.
function renderStyleButtons() {
  els.styleButtons.innerHTML = "";
  playerStyles.forEach((style) => {
    const progress = styleProgressFor(style.id);
    const button = document.createElement("button");
    button.className = `style-button${style.id === selectedStyleId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <strong>${style.name}</strong>
      <small>${style.summary}</small>
      <span>${progress.xp} XP / ${skillSpentPointsForStyle(style.id)} points spent</span>
    `;
    button.addEventListener("click", () => setStyle(style.id));
    els.styleButtons.appendChild(button);
  });
}

function renderMindGameButtons() {
  els.mindGameButtons.innerHTML = "";
  const activeMindGame = mindGames.find((mindGame) => mindGame.id === selectedMindGameId) || mindGames[0];
  els.mindGameStatus.textContent = `Read: ${activeMindGame.name}`;
  mindGames.forEach((mindGame) => {
    const button = document.createElement("button");
    button.className = `mind-game-button${mindGame.id === selectedMindGameId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${mindGame.name}</strong><small>${mindGame.summary}</small>`;
    button.addEventListener("click", () => setMindGame(mindGame.id));
    els.mindGameButtons.appendChild(button);
  });
}

function intentText(card) {
  if (!card || state.finished) return "Match is over.";
  const intentByType = {
    setup: `${state.ai.name} is hand fighting for ${card.name}.`,
    takedown: `${state.ai.name} is loading up a takedown.`,
    counter: `${state.ai.name} looks ready to counter.`,
    pass: `${state.ai.name} is trying to pass.`,
    pressure: `${state.ai.name} is pressuring forward.`,
    escape: `${state.ai.name} is looking for space.`,
    guard: `${state.ai.name} is setting a guard attack.`,
    submission: `${state.ai.name} is hunting a finish.`,
    recovery: `${state.ai.name} may slow down and recover.`
  };
  return intentByType[card.type] || `${state.ai.name} is adjusting.`;
}

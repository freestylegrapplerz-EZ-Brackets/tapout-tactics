// Split from the original prototype script. Keep load order in index.html.
const els = {
  appShell: document.getElementById("appShell"),
  screenTabs: document.querySelectorAll("[data-screen-tab]"),
  screenPanels: document.querySelectorAll("[data-screen-panel]"),
  playerPoints: document.getElementById("playerPoints"),
  opponentPoints: document.getElementById("opponentPoints"),
  turnCount: document.getElementById("turnCount"),
  playerStaminaBar: document.getElementById("playerStaminaBar"),
  opponentStaminaBar: document.getElementById("opponentStaminaBar"),
  playerStaminaText: document.getElementById("playerStaminaText"),
  opponentStaminaText: document.getElementById("opponentStaminaText"),
  positionName: document.getElementById("positionName"),
  positionPath: document.getElementById("positionPath"),
  controlText: document.getElementById("controlText"),
  opponentName: document.getElementById("opponentName"),
  actionBanner: document.getElementById("actionBanner"),
  matCanvas: document.getElementById("matCanvas"),
  matScene: document.getElementById("matScene"),
  intentText: document.getElementById("intentText"),
  styleButtons: document.getElementById("styleButtons"),
  mindGameButtons: document.getElementById("mindGameButtons"),
  mindGameStatus: document.getElementById("mindGameStatus"),
  venueButtons: document.getElementById("venueButtons"),
  venueStatus: document.getElementById("venueStatus"),
  venueToMatchButton: document.getElementById("venueToMatchButton"),
  resultOverlay: document.getElementById("resultOverlay"),
  resultTitle: document.getElementById("resultTitle"),
  resultDetails: document.getElementById("resultDetails"),
  resultScore: document.getElementById("resultScore"),
  resultStyle: document.getElementById("resultStyle"),
  resultXp: document.getElementById("resultXp"),
  reviewVerdict: document.getElementById("reviewVerdict"),
  reviewGrade: document.getElementById("reviewGrade"),
  reviewSummary: document.getElementById("reviewSummary"),
  reviewNotes: document.getElementById("reviewNotes"),
  reviewTimeline: document.getElementById("reviewTimeline"),
  skillPointText: document.getElementById("skillPointText"),
  styleProgressText: document.getElementById("styleProgressText"),
  resetStyleProgressButton: document.getElementById("resetStyleProgressButton"),
  skillTree: document.getElementById("skillTree"),
  poseLibraryButtons: document.getElementById("poseLibraryButtons"),
  exitPosePreviewButton: document.getElementById("exitPosePreviewButton"),
  beltName: document.getElementById("beltName"),
  beltGraphic: document.getElementById("beltGraphic"),
  xpText: document.getElementById("xpText"),
  nextBeltText: document.getElementById("nextBeltText"),
  xpBar: document.getElementById("xpBar"),
  rematchButton: document.getElementById("rematchButton"),
  nextMatchButton: document.getElementById("nextMatchButton"),
  log: document.getElementById("log"),
  cardHand: document.getElementById("cardHand"),
  newMatchButton: document.getElementById("newMatchButton")
};

function render() {
  renderScreenState();
  renderStyleButtons();
  renderMindGameButtons();
  renderVenueButtons();
  els.playerPoints.textContent = state.player.points;
  els.opponentPoints.textContent = state.opponent.points;
  els.turnCount.textContent = Math.min(state.turn, MAX_TURNS);
  els.playerStaminaBar.style.width = `${(state.player.stamina / getMaxStamina("player")) * 100}%`;
  els.opponentStaminaBar.style.width = `${state.opponent.stamina * 10}%`;
  els.playerStaminaText.textContent = `${state.player.stamina} stamina`;
  els.opponentStaminaText.textContent = `${state.opponent.stamina} stamina`;
  els.positionName.textContent = state.position;
  els.positionPath.innerHTML = positionPathHtml();
  els.opponentName.textContent = state.ai.name;
  els.controlText.textContent = controlLabel();
  els.log.innerHTML = state.log.slice(0, 7).map((entry) => `<div>${entry}</div>`).join("");
  els.actionBanner.textContent = previewPose
    ? `Previewing ${poseLabel(previewPose)}`
    : state.animating
      ? `Executing ${state.animation.card.name}...`
      : state.log[0];
  els.matCanvas.className = previewPose
    ? `mat-canvas pose-preview venue-${selectedVenue().id}`
    : matCanvasClass();
  els.matScene.innerHTML = previewPose
    ? poseSceneSvg(previewPose, { title: poseLabel(previewPose), note: "Pose Library Preview" })
    : state.animating
      ? techniqueAnimationSvg(state.animation)
      : matSceneSvg(state.position);
  els.intentText.textContent = intentText(state.intentCard);
  renderProgression();
  renderSkillTree();
  renderPoseLibraryButtons();
  renderResult();
  renderHand();
}

function renderScreenState() {
  els.appShell.className = `game-shell screen-${activeScreen}`;
  els.screenTabs.forEach((button) => {
    const active = button.dataset.screenTab === activeScreen;
    button.classList.toggle("active", active);
    button.setAttribute("aria-current", active ? "page" : "false");
  });
  els.screenPanels.forEach((panel) => {
    const screens = (panel.dataset.screenPanel || "").split(" ");
    panel.hidden = !screens.includes(activeScreen);
  });
}

function matCanvasClass() {
  const position = state.animating ? state.animation.fromPosition : state.position;
  const moveType = state.animating ? state.animation.card.type : state.lastMoveType;
  return `mat-canvas venue-${selectedVenue().id} position-${slugify(position)}${moveType ? ` move-${moveType}` : ""}${state.animating ? " technique-playing" : ""}`;
}

function pulseMat() {
  els.matCanvas.classList.remove("pulse-action");
  void els.matCanvas.offsetWidth;
  els.matCanvas.classList.add("pulse-action");
}

function beltGraphic({ current, stripes }) {
  const stripeHtml = Array.from({ length: stripes }, () => `<span class="stripe"></span>`).join("");
  return `
    <div class="rank-belt ${current.short}-belt" style="--belt-color: ${current.color}">
      <div class="rank-bar">${stripeHtml}</div>
    </div>
  `;
}

function controlLabel() {
  if (state.control > 0) return `You have +${state.control} control`;
  if (state.control < 0) return `${state.ai.name} has +${Math.abs(state.control)} control`;
  return "Neutral control";
}

function slugify(value) {
  return value.toLowerCase().replaceAll(" ", "-");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getPlayableState(positionId) {
  return playableStateById?.[positionId] || null;
}

function isPositionHidden(positionId) {
  return getPlayableState(positionId)?.status === "hidden";
}

function isPositionOfferSafe(positionId) {
  return !!getPlayableState(positionId)?.offerSafe;
}

function isFallbackOnly(positionId) {
  return getPlayableState(positionId)?.status === "fallback_only";
}

function isPositionAiSafe(positionId) {
  return !!getPlayableState(positionId)?.aiSafe;
}

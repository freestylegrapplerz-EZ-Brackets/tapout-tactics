// Startup/init only. Core data, state, rules, poses, and rendering live in the sibling files.
els.newMatchButton.addEventListener("click", openPreMatchModal);
els.rematchButton.addEventListener("click", () => newMatch(pendingOpponent));
els.nextMatchButton.addEventListener("click", openPreMatchModal);
document.getElementById("viewProgressButton")?.addEventListener("click", () => {
  els.resultOverlay.hidden = true;
  setActiveScreen("athlete");
});
document.getElementById("logToggleButton")?.addEventListener("click", () => {
  const log = document.getElementById("log");
  const btn = document.getElementById("logToggleButton");
  if (!log || !btn) return;
  const hidden = log.classList.toggle("log-hidden");
  btn.textContent = hidden ? "Show Log" : "Hide Log";
  btn.setAttribute("aria-expanded", String(!hidden));
});
els.screenTabs.forEach((button) => {
  button.addEventListener("click", () => setActiveScreen(button.dataset.screenTab));
});
els.venueToMatchButton.addEventListener("click", () => setActiveScreen("match"));
els.resetStyleProgressButton.addEventListener("click", resetSelectedStyleProgress);
els.exitPosePreviewButton.addEventListener("click", () => {
  previewPose = null;
  activeScreen = "match";
  render();
});
document.getElementById("tutorialContinueButton")?.addEventListener("click", () => {
  hideTutorialAfter();
  if (isTutorialActive()) showTutorialCoach();
});
document.getElementById("startTutorialButton")?.addEventListener("click", () => {
  if (typeof startTutorial === "function") startTutorial();
});
openPreMatchModal();

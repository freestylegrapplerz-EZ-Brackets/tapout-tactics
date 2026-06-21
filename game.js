// Startup/init only. Core data, state, rules, poses, and rendering live in the sibling files.
els.newMatchButton.addEventListener("click", openPreMatchModal);
els.rematchButton.addEventListener("click", () => newMatch(pendingOpponent));
els.nextMatchButton.addEventListener("click", openPreMatchModal);
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
openPreMatchModal();

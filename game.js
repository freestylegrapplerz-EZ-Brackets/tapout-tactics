// Startup/init only. Core data, state, rules, poses, and rendering live in the sibling files.
els.newMatchButton.addEventListener("click", newMatch);
els.rematchButton.addEventListener("click", newMatch);
els.nextMatchButton.addEventListener("click", newMatch);
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
newMatch();

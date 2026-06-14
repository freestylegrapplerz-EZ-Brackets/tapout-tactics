// Startup/init only. Core data, state, rules, poses, and rendering live in the sibling files.

els.newMatchButton.addEventListener("click", newMatch);
els.rematchButton.addEventListener("click", newMatch);
els.nextMatchButton.addEventListener("click", newMatch);
els.exitPosePreviewButton.addEventListener("click", () => {
  previewPose = null;
  render();
});
newMatch();

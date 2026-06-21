// Pose library button UI.
function renderPoseLibraryButtons() {
  els.exitPosePreviewButton.hidden = !previewPose;
  els.poseLibraryButtons.innerHTML = "";
  poseLibraryList.forEach((item) => {
    const button = document.createElement("button");
    button.className = `pose-button${previewPose === item.pose ? " active" : ""}`;
    button.type = "button";
    button.textContent = item.label;
    button.addEventListener("click", () => {
      previewPose = item.pose;
      render();
    });
    els.poseLibraryButtons.appendChild(button);
  });
}

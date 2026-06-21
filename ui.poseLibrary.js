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
  renderPositionGuide();
}

function renderPositionGuide() {
  const el = document.getElementById("positionGuideList");
  if (!el || typeof bjjPositionGuide === "undefined") return;

  const currentPos = state?.position || null;

  el.innerHTML = bjjPositionGuide.map((pos) => {
    const isActive = currentPos === pos.id;
    const attackHtml = pos.attacks.length
      ? `<div class="pg-section"><span class="pg-label">Attacks</span><div class="pg-chips">${pos.attacks.map((a) => `<span class="pg-chip pg-chip-attack">${escapeHtml(a)}</span>`).join("")}</div></div>`
      : "";
    const subHtml = pos.submissions.length
      ? `<div class="pg-section"><span class="pg-label">Submissions</span><div class="pg-chips">${pos.submissions.map((s) => `<span class="pg-chip pg-chip-sub">${escapeHtml(s)}</span>`).join("")}</div></div>`
      : "";
    const transHtml = pos.transitionsTo.length
      ? `<div class="pg-section"><span class="pg-label">Goes To</span><div class="pg-chips">${pos.transitionsTo.map((t) => `<span class="pg-chip pg-chip-trans">${escapeHtml(t)}</span>`).join("")}</div></div>`
      : "";
    const chainHtml = pos.chainSetups.length
      ? `<div class="pg-section"><span class="pg-label">Key Chains</span><div class="pg-chips">${pos.chainSetups.map((c) => `<span class="pg-chip pg-chip-chain">${escapeHtml(c)}</span>`).join("")}</div></div>`
      : "";
    const missingHtml = pos.missingInGame.length
      ? `<div class="pg-section"><span class="pg-label pg-label-muted">Not Yet In Game</span><div class="pg-chips">${pos.missingInGame.map((m) => `<span class="pg-chip pg-chip-missing">${escapeHtml(m)}</span>`).join("")}</div></div>`
      : "";

    return `
      <details class="pg-card${isActive ? " pg-card-active" : ""}" ${isActive ? "open" : ""}>
        <summary class="pg-summary">
          <span class="pg-icon">${pos.icon}</span>
          <div class="pg-title-block">
            <strong>${escapeHtml(pos.name)}</strong>
            <span class="pg-tier">${escapeHtml(pos.tier)}</span>
          </div>
          ${isActive ? `<span class="pg-current-badge">Current</span>` : ""}
        </summary>
        <div class="pg-body">
          <p class="pg-desc">${escapeHtml(pos.description)}</p>
          ${attackHtml}${subHtml}${transHtml}${chainHtml}
          <div class="pg-tip">💡 ${escapeHtml(pos.tip)}</div>
          ${missingHtml}
        </div>
      </details>
    `;
  }).join("");
}

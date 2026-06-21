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
  renderStaminaPips("playerStaminaPips", state.player.stamina, getMaxStamina("player"), "player");
  renderStaminaPips("opponentStaminaPips", state.opponent.stamina, MAX_STAMINA, "opponent");
  els.playerStaminaText.textContent = `${state.player.stamina} / ${getMaxStamina("player")}`;
  els.opponentStaminaText.textContent = `${state.opponent.stamina} / ${MAX_STAMINA}`;
  els.positionName.textContent = state.position;
  els.positionPath.innerHTML = positionPathHtml();
  els.opponentName.textContent = state.ai.name;
  els.controlText.textContent = controlLabel();
  renderControlGauge();
  renderIntentBox();
  els.log.innerHTML = state.log.slice(0, 7).map((entry) => {
    const cls = logEntryClass(entry);
    return `<div${cls ? ` class="${cls}"` : ""}>${escapeHtml(entry)}</div>`;
  }).join("");
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
  renderProgression();
  renderSkillTree();
  renderCareerPath();
  renderAchievements();
  renderPoseLibraryButtons();
  renderResult();
  renderTurnTrack();
  renderReviewHistory();
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

// ── Turn track ────────────────────────────────────────────────────────────────

function renderTurnTrack() {
  const el = document.getElementById("turnTrack");
  if (!el) return;
  el.innerHTML = Array.from({ length: MAX_TURNS }, (_, i) => {
    const turnNum = i + 1;
    const isDone = turnNum < state.turn;
    const isCurrent = turnNum === Math.min(state.turn, MAX_TURNS) && !state.finished;
    return `<span class="turn-pip${isDone ? " turn-pip-done" : isCurrent ? " turn-pip-current" : ""}"></span>`;
  }).join("");
}

// ── Pre-match modal ───────────────────────────────────────────────────────────

function openPreMatchModal() {
  const pool = typeof getUnlockedOpponents === "function"
    ? getUnlockedOpponents().map((d) => opponents.find((o) => o.id === d.id)).filter(Boolean)
    : opponents;
  pendingOpponent = pool[Math.floor(Math.random() * pool.length)];
  document.getElementById("preMatchOpponentName").textContent = pendingOpponent.name;
  document.getElementById("preMatchOpponentStyle").textContent = pendingOpponent.style;
  renderPreMatchStyleButtons();
  renderPreMatchMindButtons();
  renderPreMatchVenueRow();
  document.getElementById("preMatchModal").hidden = false;
}

function closePreMatchModal() {
  document.getElementById("preMatchModal").hidden = true;
}

function renderPreMatchStyleButtons() {
  const container = document.getElementById("preMatchStyleButtons");
  if (!container) return;
  container.innerHTML = "";
  playerStyles.forEach((style) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pre-match-style-btn${style.id === selectedStyleId ? " active" : ""}`;
    btn.innerHTML = `<strong>${escapeHtml(style.name)}</strong><small>${escapeHtml(style.summary)}</small>`;
    btn.addEventListener("click", () => {
      selectedStyleId = style.id;
      saveSelectedStyleId();
      renderPreMatchStyleButtons();
    });
    container.appendChild(btn);
  });
}

function renderPreMatchMindButtons() {
  const container = document.getElementById("preMatchMindButtons");
  if (!container) return;
  container.innerHTML = "";
  mindGames.forEach((mg) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pre-match-mind-btn${mg.id === selectedMindGameId ? " active" : ""}`;
    btn.innerHTML = `<strong>${escapeHtml(mg.name)}</strong><small>${escapeHtml(mg.summary)}</small>`;
    btn.addEventListener("click", () => {
      selectedMindGameId = mg.id;
      renderPreMatchMindButtons();
    });
    container.appendChild(btn);
  });
}

function renderPreMatchVenueRow() {
  const container = document.getElementById("preMatchVenueRow");
  if (!container) return;
  container.innerHTML = "";
  venues.forEach((venue) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `pre-match-venue-btn venue-card-${venue.id}${venue.id === selectedVenueId ? " active" : ""}`;
    btn.innerHTML = `
      <span class="pre-match-venue-preview"></span>
      <strong>${escapeHtml(venue.name)}</strong>
      <small>${escapeHtml(venue.tier)}</small>
    `;
    btn.addEventListener("click", () => {
      setVenue(venue.id);
      renderPreMatchVenueRow();
    });
    container.appendChild(btn);
  });
}

// Wire up pre-match modal buttons (called once after DOM is ready via game.js)
(function wirePreMatchModal() {
  const fightBtn = document.getElementById("preMatchFightButton");
  const cancelBtn = document.getElementById("preMatchCancelButton");
  if (fightBtn) fightBtn.addEventListener("click", () => { closePreMatchModal(); newMatch(pendingOpponent); });
  if (cancelBtn) cancelBtn.addEventListener("click", () => {
    closePreMatchModal();
    // If no match has been started yet, start one automatically
    if (!state) newMatch();
  });
})();

// ── Adrenaline Burst timing bar ───────────────────────────────────────────

let _timingRafId = null;
let _timingPos = 0;       // 0..1, tracks indicator position
let _timingResolved = false;

function showTimingWindow(onResolve) {
  const overlay = document.getElementById("timingOverlay");
  const track   = document.getElementById("timingBarTrack");
  const indicator = document.getElementById("timingIndicator");
  const btn     = document.getElementById("timingClickButton");
  const resultEl = document.getElementById("timingResult");
  if (!overlay || !indicator || !btn) { onResolve("good"); return; }

  _timingResolved = false;
  resultEl.hidden = true;
  btn.disabled = false;
  overlay.hidden = false;

  const PERIOD_MS = 1600;
  const start = performance.now();

  function tick(now) {
    const elapsed = (now - start) % (PERIOD_MS * 2);
    const t = elapsed / PERIOD_MS;
    _timingPos = t <= 1 ? t : 2 - t;                  // ping-pong 0→1→0
    const trackW = track.offsetWidth;
    const indW   = indicator.offsetWidth || 14;
    indicator.style.left = `${Math.round(_timingPos * (trackW - indW))}px`;
    if (!_timingResolved) _timingRafId = requestAnimationFrame(tick);
  }
  _timingRafId = requestAnimationFrame(tick);

  // Auto-resolve after 6 s to prevent orphaned overlays
  const autoTimeout = setTimeout(() => resolve("miss"), 6000);

  function resolve(result) {
    if (_timingResolved) return;
    _timingResolved = true;
    clearTimeout(autoTimeout);
    cancelAnimationFrame(_timingRafId);

    const labels = { perfect: "Perfect! +5", good: "Good! +3", miss: "Miss... +2" };
    const classes = { perfect: "timing-result-perfect", good: "timing-result-good", miss: "timing-result-miss" };
    resultEl.textContent = labels[result];
    resultEl.className = `timing-result ${classes[result]}`;
    resultEl.hidden = false;
    btn.disabled = true;

    if (typeof SFX !== "undefined") {
      if (result === "perfect") SFX.adrenalinePerfect();
      else if (result === "good") SFX.adrenalineGood();
      else SFX.adrenalineMiss();
    }

    setTimeout(() => {
      overlay.hidden = true;
      onResolve(result);
    }, 700);
  }

  btn.onclick = () => {
    // pos: 0.35–0.65 = perfect, 0.15–0.85 = good, else miss
    const pos = _timingPos;
    if (pos >= 0.35 && pos <= 0.65) resolve("perfect");
    else if (pos >= 0.15 && pos <= 0.85) resolve("good");
    else resolve("miss");
  };
}

function handleCardClick(cardId) {
  if (cardId === "adrenaline-burst") {
    showTimingWindow((result) => {
      state.pendingAdrenalineResult = result;
      if (result === "perfect") state.gotPerfectAdrenaline = true;
      playTurn(cardId);
    });
  } else {
    playTurn(cardId);
  }
}

// ── Stamina pips ──────────────────────────────────────────────────────────

function renderStaminaPips(elId, stamina, max) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = Array.from({ length: max }, (_, i) =>
    `<span class="stamina-pip${i >= stamina ? " stamina-pip-empty" : ""}"></span>`
  ).join("");
}

// ── Control gauge ─────────────────────────────────────────────────────────

function renderControlGauge() {
  const el = document.getElementById("controlGauge");
  if (!el) return;
  const c = state.control; // -3 to +3
  el.innerHTML = Array.from({ length: 7 }, (_, i) => {
    const pos = i - 3;
    let cls;
    if (pos === 0) cls = "control-pip-neutral";
    else if (pos > 0 && pos <= c) cls = "control-pip-player";
    else if (pos < 0 && pos >= c) cls = "control-pip-opponent";
    else cls = "control-pip-empty";
    return `<span class="control-pip ${cls}"></span>`;
  }).join("");
}

// ── Color-coded log ───────────────────────────────────────────────────────

function logEntryClass(entry) {
  const low = String(entry).toLowerCase();
  if (low.includes("tap!") || (low.includes("finish") && low.includes("wins"))) return "log-finish";
  if (low.includes("chain bonus") || low.includes("active combo")) return "log-chain";
  if (low.includes("adrenaline") || low.includes("breath") || low.includes("burst") || low.includes("recover") || low.includes("standup")) return "log-stamina";
  if (low.includes("scores") || low.includes("wins ") || low.includes("-0") || low.includes(" points")) return "log-score";
  if (low.includes("control")) return "log-control";
  if (low.includes("survives") || low.includes("attacks") || low.includes("attack a") || low.includes("attack an")) return "log-attempt";
  return "";
}

// ── Intent box urgency ────────────────────────────────────────────────────

function renderIntentBox() {
  const box = document.querySelector(".intent-box");
  const text = els.intentText;
  if (!box || !text) return;
  text.textContent = intentText(state.intentCard);
  const type = state.intentCard?.type;
  const urgencyClass =
    ["submission"].includes(type) ? "intent-danger" :
    ["takedown", "pressure", "pass"].includes(type) ? "intent-warning" :
    ["counter", "escape"].includes(type) ? "intent-safe" : "intent-neutral";
  box.className = `intent-box ${urgencyClass}`;
}

// ── Achievements render ───────────────────────────────────────────────────

function renderAchievements() {
  const container = document.getElementById("achievementsList");
  if (!container) return;
  const unlocked = new Set(loadAchievements());
  container.innerHTML = achievementDefs.map((def) => {
    const done = unlocked.has(def.id);
    return `
      <div class="achievement-card ${done ? "achievement-unlocked" : "achievement-locked"}">
        <span class="achievement-icon">${def.icon}</span>
        <strong>${escapeHtml(def.name)}</strong>
        <span>${escapeHtml(def.desc)}</span>
      </div>
    `;
  }).join("");
}

// ── Match intro ───────────────────────────────────────────────────────────

function showMatchIntro(opponent, venue) {
  const overlay = document.getElementById("matchIntroOverlay");
  if (!overlay) return;
  document.getElementById("matchIntroOpponentName").textContent = opponent.name;
  document.getElementById("matchIntroOpponentStyle").textContent = opponent.style;
  document.getElementById("matchIntroVenue").textContent = venue?.name || "Old School Academy";
  overlay.hidden = false;
  setTimeout(() => { overlay.hidden = true; }, 1800);
}

// ── Belt ceremony ─────────────────────────────────────────────────────────

function checkAndShowBeltCeremony(previousXp, newXp) {
  const prev = getBeltProgress(previousXp);
  const next = getBeltProgress(newXp);
  if (prev.current.short === next.current.short) return;
  const overlay = document.getElementById("beltCeremonyOverlay");
  if (!overlay) return;
  document.getElementById("beltCeremonyName").textContent = next.current.name;
  document.getElementById("beltCeremonyGraphic").innerHTML = beltGraphic(next);
  document.getElementById("beltCeremonyXp").textContent = `${newXp} XP total`;
  overlay.hidden = false;
  if (typeof SFX !== "undefined") SFX.beltUp();
  setTimeout(() => { overlay.hidden = true; }, 4000);
}

// ── Next opponent preview ─────────────────────────────────────────────────

function renderNextOpponentPreview() {
  const preview = document.getElementById("nextOpponentPreview");
  if (!preview || !state.result) return;
  const next = opponents[Math.floor(Math.random() * opponents.length)];
  preview._nextOpponent = next;
  document.getElementById("nextOpponentName").textContent = next.name;
  document.getElementById("nextOpponentStyle").textContent = next.style;
  preview.hidden = false;
  const btn = document.getElementById("fightNextOpponentButton");
  if (btn) {
    btn.onclick = () => {
      els.resultOverlay.hidden = true;
      newMatch(preview._nextOpponent);
    };
  }
}

// ── Camera flash ──────────────────────────────────────────────────────────

function triggerCameraFlash() {
  const el = document.createElement("div");
  el.className = "camera-flash";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

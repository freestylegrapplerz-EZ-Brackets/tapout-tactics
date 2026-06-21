// Match result and review UI.
function renderResult() {
  if (!state.result || state.animating) {
    els.resultOverlay.hidden = true;
    return;
  }
  const xpBefore = playerXp;
  awardMatchXp();
  const review = finalizeMatchReview();
  const resultClass = state.result.title === "Victory" ? "result-win" :
    state.result.title === "Defeat" ? "result-loss" : "result-draw";
  els.resultOverlay.className = `result-overlay ${resultClass}`;
  els.resultTitle.textContent = state.result.title;
  els.resultDetails.textContent = state.result.detail;
  els.resultScore.textContent = `Score ${state.result.score}`;
  els.resultStyle.textContent = `Style: ${state.style.name}`;
  els.resultXp.textContent = `+${state.result.xp} belt XP, +${state.result.xp} ${state.style.name} XP`;
  renderMatchReview(review);
  els.resultOverlay.hidden = false;
  if (typeof triggerCameraFlash === "function") triggerCameraFlash();
  if (typeof checkAndShowBeltCeremony === "function") setTimeout(() => checkAndShowBeltCeremony(xpBefore, playerXp), 600);
  if (typeof renderNextOpponentPreview === "function") renderNextOpponentPreview();
}

function renderMatchReview(review) {
  if (!review) return;
  els.reviewVerdict.textContent = review.verdict;
  els.reviewGrade.textContent = review.grade;
  els.reviewSummary.innerHTML = `
    <span>${review.turns.length} turns</span>
    <span>${review.result.finalPosition}</span>
    <span>${review.result.finalPath.join(" -> ")}</span>
  `;
  els.reviewNotes.innerHTML = review.notes.map((note) => `
    <article>
      <strong>${escapeHtml(note.title)}</strong>
      <p>${escapeHtml(note.text)}</p>
    </article>
  `).join("");
  els.reviewTimeline.innerHTML = review.turns.map(turnReviewHtml).join("");
}

function turnReviewHtml(turn) {
  const chain = turn.chain
    ? `<span class="timeline-chain">${escapeHtml(turn.chain.label)}${turn.chain.submission ? `, +${turn.chain.submission}% finish` : ""}${turn.chain.control ? `, +${turn.chain.control} control` : ""}</span>`
    : "";
  const attempts = turn.finishAttempts.map((attempt) => `
    <span class="${attempt.succeeded ? "finish-made" : "finish-missed"}">
      ${escapeHtml(attempt.attacker)} ${escapeHtml(attempt.submissionName)}: roll ${attempt.roll} vs ${chanceText(attempt.chance)}
    </span>
  `).join("");
  const pointSwing = turn.after.playerPoints !== turn.before.playerPoints || turn.after.opponentPoints !== turn.before.opponentPoints
    ? `<span>Score ${turn.before.playerPoints}-${turn.before.opponentPoints} -> ${turn.after.playerPoints}-${turn.after.opponentPoints}</span>`
    : "";
  return `
    <article class="timeline-turn">
      <div>
        <strong>Turn ${turn.turn}: ${escapeHtml(turn.playerCard.name)} vs ${escapeHtml(turn.opponentCard.name)}</strong>
        <small>${escapeHtml(turn.fromPosition)} -> ${escapeHtml(turn.toPosition)}</small>
      </div>
      <div class="timeline-details">
        <span>Stamina ${turn.before.playerStamina}-${turn.before.opponentStamina} -> ${turn.after.playerStamina}-${turn.after.opponentStamina}</span>
        <span>Control ${turn.before.control} -> ${turn.after.control}</span>
        ${pointSwing}
        ${chain}
        ${attempts}
      </div>
    </article>
  `;
}

function chanceText(chance) {
  return chance >= 100 ? "100%+" : `${chance}%`;
}

// ── Review tab history ────────────────────────────────────────────────────────

function renderReviewHistory() {
  const container = document.getElementById("reviewHistory");
  if (!container) return;

  let reviews = [];
  try {
    reviews = JSON.parse(localStorage.getItem(MATCH_REVIEW_STORAGE_KEY) || "[]");
  } catch { reviews = []; }

  if (!reviews.length) {
    container.innerHTML = `
      <div class="review-empty-card">
        <p class="eyebrow">No matches yet</p>
        <h2>Finish a match to generate a breakdown.</h2>
        <p>Your last 5 match reviews will appear here after each match ends.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = reviews.map((review) => {
    const result = review.result || {};
    const won = result.title === "Victory";
    const lost = result.title === "Defeat";
    const date = review.createdAt ? new Date(review.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "";
    return `
      <article class="review-history-card ${won ? "review-history-win" : lost ? "review-history-loss" : "review-history-draw"}">
        <div class="review-history-header">
          <div>
            <strong class="review-history-title">${escapeHtml(result.title || "Unknown")}</strong>
            <span>vs ${escapeHtml(review.opponent || "Unknown")} · ${escapeHtml(review.playerStyle || "—")}</span>
            ${date ? `<small>${date}</small>` : ""}
          </div>
          <span class="review-history-grade">${escapeHtml(review.grade || "—")}</span>
        </div>
        <div class="review-history-meta">
          <span>Score: ${escapeHtml(result.score || "—")}</span>
          <span>Mind: ${escapeHtml(review.mindGame || "—")}</span>
          <span>${escapeHtml(result.detail || "")}</span>
        </div>
        <div class="review-history-verdict">${escapeHtml(review.verdict || "")}</div>
        ${review.notes?.length ? `
          <div class="review-history-notes">
            ${review.notes.map((note) => `
              <div class="review-history-note">
                <strong>${escapeHtml(note.title)}</strong>
                <p>${escapeHtml(note.text)}</p>
              </div>
            `).join("")}
          </div>
        ` : ""}
        <details class="review-history-timeline">
          <summary>${review.turns?.length || 0} turns</summary>
          <div>${(review.turns || []).map(turnReviewHtml).join("")}</div>
        </details>
      </article>
    `;
  }).join("");
}

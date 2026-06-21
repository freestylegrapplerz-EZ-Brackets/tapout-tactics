// Match result and review UI.
function renderResult() {
  if (!state.result || state.animating) {
    els.resultOverlay.hidden = true;
    return;
  }
  awardMatchXp();
  const review = finalizeMatchReview();
  els.resultTitle.textContent = state.result.title;
  els.resultDetails.textContent = state.result.detail;
  els.resultScore.textContent = `Score ${state.result.score}`;
  els.resultStyle.textContent = `Style: ${state.style.name}`;
  els.resultXp.textContent = `+${state.result.xp} belt XP, +${state.result.xp} ${state.style.name} XP`;
  renderMatchReview(review);
  els.resultOverlay.hidden = false;
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

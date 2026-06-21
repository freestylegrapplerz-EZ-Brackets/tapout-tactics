// Venue selection UI.
function renderVenueButtons() {
  if (!els.venueButtons) return;
  const activeVenue = selectedVenue();
  els.venueStatus.textContent = `Venue: ${activeVenue.name}`;
  els.venueButtons.innerHTML = "";
  const unlockedIds = typeof getUnlockedVenues === "function"
    ? new Set(getUnlockedVenues().map((d) => d.id))
    : new Set(venues.map((v) => v.id));
  venues.forEach((venue) => {
    const unlocked = unlockedIds.has(venue.id);
    const venueDef = typeof UNLOCK_DEFS !== "undefined"
      ? UNLOCK_DEFS.venues.find((d) => d.id === venue.id)
      : null;
    const button = document.createElement("button");
    button.className = `venue-button venue-card-${venue.id}${venue.id === activeVenue.id ? " active" : ""}${!unlocked ? " venue-locked" : ""}`;
    button.type = "button";
    button.disabled = !unlocked;
    button.innerHTML = `
      <span class="venue-preview" aria-hidden="true"></span>
      <span class="venue-copy">
        <em>${unlocked ? venue.tier : "🔒 Locked"}</em>
        <strong>${venue.name}</strong>
        <small>${unlocked ? venue.summary : (venueDef?.hint || "Keep playing to unlock")}</small>
        ${unlocked ? `<b>${venue.detail}</b>` : ""}
      </span>
    `;
    if (unlocked) button.addEventListener("click", () => setVenue(venue.id));
    els.venueButtons.appendChild(button);
  });
}

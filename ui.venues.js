// Venue selection UI.
function renderVenueButtons() {
  if (!els.venueButtons) return;
  const activeVenue = selectedVenue();
  els.venueStatus.textContent = `Venue: ${activeVenue.name}`;
  els.venueButtons.innerHTML = "";
  venues.forEach((venue) => {
    const button = document.createElement("button");
    button.className = `venue-button venue-card-${venue.id}${venue.id === activeVenue.id ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `
      <span class="venue-preview" aria-hidden="true"></span>
      <span class="venue-copy">
        <em>${venue.tier}</em>
        <strong>${venue.name}</strong>
        <small>${venue.summary}</small>
        <b>${venue.detail}</b>
      </span>
    `;
    button.addEventListener("click", () => setVenue(venue.id));
    els.venueButtons.appendChild(button);
  });
}

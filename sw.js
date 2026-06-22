// Tapout Tactics service worker — caches all game files for offline play.
const CACHE = "tapout-tactics-v3";
const ASSETS = [
  "/tapout-tactics/",
  "/tapout-tactics/index.html",
  "/tapout-tactics/styles.css",
  "/tapout-tactics/progression.js",
  "/tapout-tactics/venues.js",
  "/tapout-tactics/bjjPositions.js",
  "/tapout-tactics/tutorial.js",
  "/tapout-tactics/sound.js",
  "/tapout-tactics/techniques.js",
  "/tapout-tactics/skills.js",
  "/tapout-tactics/cards.js",
  "/tapout-tactics/poses.js",
  "/tapout-tactics/playableStates.js",
  "/tapout-tactics/gameState.js",
  "/tapout-tactics/matchRules.js",
  "/tapout-tactics/ui.shared.js",
  "/tapout-tactics/ui.match.js",
  "/tapout-tactics/ui.venues.js",
  "/tapout-tactics/ui.review.js",
  "/tapout-tactics/ui.skills.js",
  "/tapout-tactics/ui.poseLibrary.js",
  "/tapout-tactics/ui.cards.js",
  "/tapout-tactics/game.js",
  "/tapout-tactics/assets/tapout-tactics-logo.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  // Network first for HTML (always get latest), cache first for everything else
  if (e.request.url.endsWith(".html") || e.request.url.endsWith("/")) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((cached) => cached || fetch(e.request))
    );
  }
});

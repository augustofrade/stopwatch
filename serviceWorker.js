const CACHE_NAME = "V1";
const STATIC_CACHE_URLS = ["/", "style.css", "stopwatch.js", "enum.js", "TimeDisplay.js", "Timer.js"];

self.addEventListener("install", event => {
    console.log("Service Worker installing.");
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_CACHE_URLS))
      );
});
  
self.addEventListener("activate", event => {
    console.log("Service Worker activating.");
});

self.addEventListener("fetch", event => {
    // Cache-First Strategy
    event.respondWith(
      caches
        .match(event.request) // check if the request has already been cached
        .then(cached => cached || fetch(event.request)) // otherwise request network
    );
});
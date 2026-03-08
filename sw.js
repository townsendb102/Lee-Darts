// sw.js - The Cache Assassin
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force the phone to install this update immediately
});

self.addEventListener('activate', (e) => {
  // This hunts down ALL old, broken caches on the user's phone and deletes them
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => caches.delete(cache))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // This tells the phone: NEVER use offline cache again. Always pull the live internet version.
  e.respondWith(fetch(e.request));
});

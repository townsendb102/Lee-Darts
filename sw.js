// This forces the phone to update the app immediately
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
});

// This hunts down the old, broken caches and permanently deletes them
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          return caches.delete(cache);
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// This tells the app: "Always use the internet to get the newest files!"
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch((err) => {
      console.log("Network request failed, user might be offline.");
    })
  );
});

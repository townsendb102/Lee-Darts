self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('raf-darts-v1').then((cache) => {
      return cache.addAll([
        './index.html',
        './51693.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
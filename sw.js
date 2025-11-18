
const CACHE_NAME = 'nu-cgpa-genius-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // External assets handled by runtime caching
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  
  // For HTML requests (navigation), try Network first, then Cache.
  // This ensures users always get the latest version of the app structure.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  // For other resources (CSS, JS, Images), try Cache first, then Network.
  // This provides speed for assets that change less frequently.
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request).then((networkResponse) => {
          // Optional: Cache new assets dynamically
          // if (networkResponse.ok) {
          //   caches.open(CACHE_NAME).then(cache => cache.put(request, networkResponse.clone()));
          // }
          return networkResponse;
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
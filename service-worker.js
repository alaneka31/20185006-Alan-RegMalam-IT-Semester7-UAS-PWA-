// service-worker.js

const CACHE_NAME = 'my-cache';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/indexdb.html',
        '/cv.html',
        '/styles.css',
        '/app.js',
        '/profil.jpg',
        // tambahkan file-file lain yang perlu di-cache
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/path-to-icon/icon.png', // Ganti dengan path ikon yang sesuai
    badge: '/path-to-badge/badge.png', // Ganti dengan path badge yang sesuai
  };

  event.waitUntil(
    self.registration.showNotification('Judul Push Notification', options)
  );
});

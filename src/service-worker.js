/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

clientsClaim();
self.skipWaiting();

// ✅ Safely use __WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Fallback network strategy
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html').then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

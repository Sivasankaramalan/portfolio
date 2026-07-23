const CACHE_NAME = 'sivasankaramalan-v2';
const urlsToCache = [
  '/',
  '/playbook',
  '/playbook/mobile',
  '/icon.svg',
  '/manifest.json'
];

// Never cache resume/API PDF responses — they change when the file is replaced
function shouldBypassCache(request) {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith('/resume') ||
    url.pathname.startsWith('/api/resume') ||
    url.pathname.endsWith('.pdf')
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  if (shouldBypassCache(event.request)) {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    ).then(() => self.clients.claim())
  );
});

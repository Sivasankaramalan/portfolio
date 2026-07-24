const CACHE_NAME = 'sivasankaramalan-v3';
const STATIC_CACHE_URLS = ['/icon.svg', '/manifest.json'];

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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_CACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (shouldBypassCache(request)) {
    event.respondWith(fetch(request));
    return;
  }

  // Page navigations always go to the network first so visitors see the
  // latest deployed content. Cache is only a fallback for offline use —
  // previously this was cache-first, which meant the homepage could be
  // stuck on a stale snapshot forever once installed.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    );
    return;
  }

  // Static assets (JS/CSS/images/fonts) are safe to serve cache-first —
  // Next.js fingerprints their filenames, so a new deploy ships new URLs
  // instead of relying on this cache being invalidated.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok && request.method === 'GET') {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
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

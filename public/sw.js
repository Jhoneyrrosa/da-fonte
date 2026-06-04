// v2 — limpa caches antigos (v1 tinha CSS roxo)
const CACHE_NAME = 'da-fonte-v2';

self.addEventListener('install', (event) => {
  // Assume controle imediatamente, sem esperar aba ser fechada
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(['/', '/index.html', '/manifest.json'])
    )
  );
});

self.addEventListener('activate', (event) => {
  // Apaga todos os caches de versões anteriores
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignora requisições externas (fontes, imagens Unsplash, etc.)
  if (url.origin !== self.location.origin) return;

  // Assets com hash no nome (/assets/index-XXXX.js, .css) são imutáveis:
  // cache-first é seguro — quando o conteúdo muda, o hash muda junto.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) =>
          cached ||
          fetch(event.request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // index.html e navegação: network-first para sempre buscar a versão mais recente.
  // Fallback para cache apenas se offline.
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match('/index.html'))
      )
  );
});

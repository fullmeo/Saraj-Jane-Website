/**
 * Service Worker pour le site de Sarah Jane Iffra
 * Gère le cache et les fonctionnalités hors ligne
 */

const CACHE_NAME = 'sarah-jane-iffra-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/css/animations.css',
  '/js/main.js',
  '/js/animations.js',
  '/manifest.json',
  '/assets/favicon.ico',
  '/assets/icon-192x192.png',
  '/assets/icon-512x512.png',
  '/assets/apple-touch-icon.png',
  '/assets/safari-pinned-tab.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@400;700&display=swap'
];

// Installation du Service Worker et mise en cache des ressources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Mise en cache des ressources statiques');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise en cache:', error);
      })
  );
  self.skipWaiting();
});

// Activation du Service Worker et nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Stratégie de mise en cache: Cache First, puis réseau avec mise à jour du cache
self.addEventListener('fetch', (event) => {
  // Ne pas mettre en cache les requêtes vers l'API ou d'autres domaines externes
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.url.includes('/api/') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Renvoyer la réponse en cache si elle existe
        if (cachedResponse) {
          return cachedResponse;
        }

        // Sinon, récupérer depuis le réseau
        return fetch(event.request)
          .then((response) => {
            // Vérifier si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Mettre à jour le cache avec la nouvelle réponse
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
      .catch(() => {
        // En cas d'erreur, renvoyer une page de secours si disponible
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      })
  );
});

// Gestion des messages (pour la mise à jour du contenu en arrière-plan)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

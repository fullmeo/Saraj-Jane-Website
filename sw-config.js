// Configuration du Service Worker
const CACHE_NAME = 'sarah-jane-iffra-v1';
const OFFLINE_URL = '/offline.html';

// Fichiers à mettre en cache lors de l'installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/style.css',
  '/css/responsive.css',
  '/css/animations.css',
  '/css/gallery.css',
  '/css/lightbox.css',
  '/css/videos.css',
  '/js/main.js',
  '/js/animations.js',
  '/js/videos.js',
  '/js/admin-auth.js',
  '/js/firebase-config.js',
  '/images/logo.png',
  '/images/favicon.ico',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/images/og-image.jpg',
  '/public/seo.json'
];

// Extensions de fichiers à mettre en cache
const CACHEABLE_EXTENSIONS = [
  '.html',
  '.css',
  '.js',
  '.json',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.ico'
];

// Chemins à exclure du cache
const EXCLUDE_FROM_CACHE = [
  '/service-worker.js',
  '/sw-config.js',
  '/firebase-messaging-sw.js',
  '/manifest.json',
  '/browserconfig.xml'
];

// Stratégie de mise en cache : Cache First, fallback sur réseau
const cacheFirst = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Mise en cache des réponses valides
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // En cas d'erreur réseau, retourner la page hors ligne
    if (request.mode === 'navigate') {
      return caches.match(OFFLINE_URL);
    }
    throw error;
  }
};

// Installation du Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Mise en cache des ressources statiques');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Ignorer les requêtes non-GET et les requêtes vers des domaines externes
  if (event.request.method !== 'GET' || 
      !url.origin.startsWith(self.location.origin) ||
      EXCLUDE_FROM_CACHE.some(path => url.pathname.endsWith(path))) {
    return;
  }
  
  // Mise en cache des fichiers statiques
  if (CACHEABLE_EXTENSIONS.some(ext => url.pathname.endsWith(ext))) {
    event.respondWith(cacheFirst(event.request));
    return;
  }
  
  // Pour les pages, utiliser la stratégie Network First
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Mise en cache des pages visitées
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseClone));
          return response;
        })
        .catch(() => {
          // En cas d'erreur, retourner la page hors ligne
          return caches.match(OFFLINE_URL);
        })
    );
  }
});

// Gestion des messages (pour les mises à jour en arrière-plan)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Names of the cache used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'v1';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  'index.html',
  './', // Alias for index.html
  'assets/css/style.css',
  'assets/js/main.js'
];


self.addEventListener('install', (event) => {
  event.waitUntil(async function() {
    const cache = await caches.open(PRECACHE);
    await cache.addAll(PRECACHE_URLS);
  }());
});
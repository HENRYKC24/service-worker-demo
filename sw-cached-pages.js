// Specify cache name
const cacheName = 'v1';

// specify resources to be cached
const cacheResources = [
  'index.html',
  'about.html',
  'css/styles.css',
  'js/main.js'
];
// Install service worker here
self.addEventListener('install', (e) => {
  console.log('Service Worker installed');
  e.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      cache.addAll(cacheResources);
    })
    .then(() => {
      return self.skipWaiting();
    })
  )
});
// Activate service worker here
self.addEventListener('activate', (e) => {
  console.log('Service Worker activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      console.log(cacheNames);
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Not same and removing as a result...");
            return caches.delete(cache);
          }
        })
      )
    })
  )
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})

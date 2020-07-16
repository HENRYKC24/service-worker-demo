// Specify cache name
const cacheName = 'v2';

// Install service worker here
self.addEventListener('install', (e) => {
  console.log('Service Worker installed');
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
  console.log('Service Worker Fetching resources...');
  e.respondWith(
    fetch(e.request)
    .then(res => {
      const clonedRes = res.clone();
      caches.open(cacheName)
      .then(cache => {
        cache.put(e.request, clonedRes);
      });
      return res;
    }).catch(err => caches.match(e.request)
    .then(res => res))
  )
})

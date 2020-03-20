const statiCache = 'food-static';
const dynamiCache = 'food-dynamic';
const assets = [
    '/',
    '/index.html',
    '/icon.png',
    '/manifest.json',
    '/assets/app.js',
    '/assets/jquery-3.4.1.slim.min.js',
    '/assets/script.js',
    '/assets/style.css'
];

// install serviceWorker
self.addEventListener('install', evt => {
    // console.log('ServiceWorker telah diinstall');
    caches.open(statiCache).then(cache => {
        cache.addAll(assets);
    })
});

// activate event
self.addEventListener('activate', evt => {
    // console.log('ServiceWorker telah diaktifkan');
    evt.waitUntil(
        caches.keys().then(keys => {
            // console.log(keys);
            return Promise.all(
                keys.filter(key => key !== statiCache && key !== dynamiCache)
                .map(key => caches.delete(key))
            )
        })
    );
});

// fetch event
self.addEventListener('fetch', evt => {
    // console.log('fetch event', evt);
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamiCache).then(cache => {
                        cache.put(evt.request, fetchRes.clone());
                        return fetchRes;
                    })
                });
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1) {
                    return caches.match('/page/fallback.html');
                }
            })
        )
    }
});
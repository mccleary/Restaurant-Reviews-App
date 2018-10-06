// navigator.serviceWorker.register('/sw.js').then(function(reg) {
//   console.log('yay!');
// }).catch(function(err) {
//   console.log('Boo!');
// });

var staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cacheAll([
        'index.html',
        'restaurant.html',
        '/css/main.css',
        '/css.responsive.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'sw.js',
        '/img/*'
      ])
    }));
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(function(response) {
      if(response.status == 404) {
        return new Response('Oops, Something went wrong!');
      }
      return response;
    }).catch(function() {
      return new Response('Oh no, still not right!');
    })
  );
});

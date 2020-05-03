/*self.addEventListener('install', function(event) {
  self.skipWaiting();
  
  var offlinePage = new Request('offline.html');
  event.waitUntil(
  fetch(offlinePage).then(function(response) {
    return caches.open('offline2').then(function(cache) {
      return cache.put(offlinePage, response);
    });
  }));
}); self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
        return caches.open('offline2').then(function(cache) {
          return cache.match('offline.html');
      });
    }));
}); self.addEventListener('refreshOffline', function(response) {
  return caches.open('offline2').then(function(cache) {
    return cache.put(offlinePage, response);
  });
}); self.addEventListener('push', function (event) {
  var data = event.data.json();   var opts = {
    body: data.body,
    icon: data.icon,
    data: {
      url: data.url
    }
  };
  event.waitUntil(self.registration.showNotification(data.title, opts));
}); self.addEventListener('notificationclick', function(event) {
  var data = event.notification.data;   event.notification.close();   event.waitUntil(
    clients.openWindow(data.url)
  );
});
*/




// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "ToDo-replace-this-name.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});


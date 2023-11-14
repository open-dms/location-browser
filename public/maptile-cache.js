const installEvent = () => {
  self.addEventListener("install", () => {
    console.log("maptile cache service worker installed");
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.log("maptile cache service worker activated");
  });
};
activateEvent();

const cacheName = "maptile-cache";

const cacheClone = async (e) => {
  const cachedResponse = await caches.match(e.request);

  if (cachedResponse) {
    return cachedResponse;
  }

  const response = await fetch(e.request);

  if (response.url.search(/api\.maptiler\.com/) !== -1) {
    const cache = await caches.open(cacheName);
    const resClone = response.clone();
    await cache.put(e.request, resClone);
  }

  return response;
};

self.addEventListener("fetch", (e) => {
  e.respondWith(cacheClone(e));
});

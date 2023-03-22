const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

//register route for caching 
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//asset caching
registerRoute(
  //callback function that will filter the requests to cache JS and CSS files
({ request }) => ['style', 'script', 'worker'].includes(request.destination),
//requesting the cache storage as well as network 
new StaleWhileRevalidate({
  //name of cache storage.
  cacheName: 'asset-cache',
  plugins: [
    //plugin to cache responses with headers to a maximum-age of 30 days
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
}));

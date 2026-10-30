const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  fallbacks: { document: '/offline' },
  runtimeCaching: [
    {
      urlPattern: /^\//,
      handler: 'NetworkFirst',
      options: { cacheName: 'vitrolinha-pages', networkTimeoutSeconds: 5, expiration: { maxEntries: 20, maxAgeSeconds: 24 * 60 * 60 } },
    },
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'vitrolinha-static', expiration: { maxEntries: 200, maxAgeSeconds: 365 * 24 * 60 * 60 } },
    },
    {
      urlPattern: /\/_next\/image\?.*/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'vitrolinha-images', expiration: { maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 } },
    },
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'vitrolinha-fonts', expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 }, cacheableResponse: { statuses: [0, 200] } },
    },
    {
      urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/.*/i,
      handler: 'NetworkFirst',
      options: { cacheName: 'vitrolinha-supabase', networkTimeoutSeconds: 5, expiration: { maxEntries: 100, maxAgeSeconds: 5 * 60 }, cacheableResponse: { statuses: [0, 200] } },
    },
    {
      urlPattern: /^https:\/\/(i\.scdn\.co|mosaic\.scdn\.co|.*\.spotifycdn\.com)\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'vitrolinha-spotify-img', expiration: { maxEntries: 200, maxAgeSeconds: 7 * 24 * 60 * 60 }, cacheableResponse: { statuses: [0, 200] } },
    },
    {
      urlPattern: /^https:\/\/(e-cdns-images|cdns-images)\.dzcdn\.net\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'vitrolinha-deezer-img', expiration: { maxEntries: 200, maxAgeSeconds: 7 * 24 * 60 * 60 }, cacheableResponse: { statuses: [0, 200] } },
    },
    {
      urlPattern: /^https:\/\/lastfm\.freetls\.fastly\.net\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'vitrolinha-lastfm-img', expiration: { maxEntries: 100, maxAgeSeconds: 7 * 24 * 60 * 60 }, cacheableResponse: { statuses: [0, 200] } },
    },
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'mosaic.scdn.co' },
      { protocol: 'https', hostname: '*.spotifycdn.com' },
      { protocol: 'https', hostname: 'e-cdns-images.dzcdn.net' },
      { protocol: 'https', hostname: 'cdns-images.dzcdn.net' },
      { protocol: 'https', hostname: 'lastfm.freetls.fastly.net' },
      { protocol: 'https', hostname: '*.last.fm' },
    ],
  },
}

module.exports = withPWA(nextConfig)
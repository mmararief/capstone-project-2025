import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Pastikan ini cara yang benar untuk integrasi Tailwind Anda, atau gunakan setup PostCSS standar
import path from "path";
import { fileURLToPath } from "url"; // 1. Impor fileURLToPath dari 'url'
import { VitePWA } from 'vite-plugin-pwa';

// 2. Dapatkan __dirname versi ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ["favicon.ico", "logo.png", "logo2.png", "robots.txt", "apple-touch-icon.png", "vite.svg"],
      manifest: {
        name: 'Capstone Project 2025',
        short_name: 'Capstone2025',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1A3636',
        description: 'Aplikasi wisata Jakarta berbasis PWA.',
        icons: [
          {
            src: '/logo2.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logo2.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
          screenshots: [
          {
            "src": "/ss-desktop.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide"
          },
          {
            "src": "/ss-mobile.jpg",
            "sizes": "540x720",
            "type": "image/jpg",
            "form_factor": "narrow"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          // Cache gambar agar tetap tersedia offline
          {
            urlPattern: /^https?:.*\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          // Cache data destinasi dari API agar tetap tersedia offline
          {
            urlPattern: /\/places(\?.*)?$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "places-api-cache",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/nominatim.openstreetmap.org\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "osm-geocode-cache",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 }
            }
          },
          {
            urlPattern: /^https:\/\/api\.mapbox\.com\//,
            handler: "NetworkFirst",
            options: {
              cacheName: "mapbox-cache",
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 }
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      // 3. Sekarang __dirname sudah terdefinisi dengan benar
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

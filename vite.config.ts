import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite' // <--- 1. Thêm dòng này

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // <--- 2. Thêm dòng này
    VitePWA({
      registerType: 'autoUpdate',
      
      // Khai báo các file tĩnh cần cache để chạy offline
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'], 
      
      manifest: {
        name: 'Field Survey ODK',        // Tên đầy đủ của App
        short_name: 'Survey App',        // Tên ngắn gọn hiển thị dưới icon trên màn hình điện thoại
        description: 'Ứng dụng khảo sát hiện trường Offline',
        theme_color: '#2563eb',          // Màu thanh trạng thái (status bar) của điện thoại - (Màu Blue-600)
        background_color: '#ffffff',     // Màu nền khi app đang load
        display: 'standalone',           // QUAN TRỌNG NHẤT: Ép trình duyệt ẩn thanh URL, nhìn y hệt App Native
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Giúp icon bo tròn đẹp mắt trên Android
          }
        ]
      },

      // Cấu hình Workbox: Cache toàn bộ HTML, CSS, JS để mở app khi không có Wifi
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,vue,ts}'],
        cleanupOutdatedCaches: true,
      }
    })
  ]
})
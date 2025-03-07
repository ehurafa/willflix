import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  base: '/willflix/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Willflix',
        short_name: 'Willflix',
        description: 'Educação e diversão para crianças',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // proxy to test local
      '/api/videos': {
        target: 'https://agenciacardeal.com.br',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/videos/, '/willflix-videos/'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "src/styles/variables";
        @use "src/styles/mixins";
        `,
      },
    },
  },
});

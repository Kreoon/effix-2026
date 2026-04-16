import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  publicDir: false,
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: '/index-v3.html',
    hmr: { overlay: false }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: 'index-v3.html',
        thanks: 'thank-you.html'
      }
    }
  }
});

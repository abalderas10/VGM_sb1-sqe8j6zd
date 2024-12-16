import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-navigation-menu', 'lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge']
        }
      }
    }
  },
  server: {
    port: 8080,
    hmr: {
      overlay: true
    }
  },
});
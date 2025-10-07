import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  },
  publicDir: 'public',
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 4173,
    strictPort: true,
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})

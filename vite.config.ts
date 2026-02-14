import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
  },
  preview: {
    port: 4173,
    strictPort: false,
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: false,
  },
})
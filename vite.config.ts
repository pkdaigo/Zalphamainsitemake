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
    
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          
          // Radix UI
          if (id.includes('@radix-ui')) {
            return 'vendor-radix'
          }
          
          // Material UI
          if (id.includes('@mui') || id.includes('@emotion')) {
            return 'vendor-mui'
          }
          
          // 3D libraries
          if (id.includes('three') || id.includes('@react-three')) {
            return 'vendor-three'
          }
          
          // Charts
          if (id.includes('recharts')) {
            return 'vendor-charts'
          }
          
          // Animation
          if (id.includes('motion')) {
            return 'vendor-animation'
          }
          
          // Forms
          if (id.includes('react-hook-form') || id.includes('react-day-picker') || id.includes('date-fns')) {
            return 'vendor-forms'
          }
          
          // DnD
          if (id.includes('react-dnd')) {
            return 'vendor-dnd'
          }
          
          // Other node_modules (catch remaining vendor code)
          if (id.includes('node_modules')) {
            return 'vendor-other'
          }
        },
      },
    },
    
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

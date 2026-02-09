import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Increase chunk size warning limit for Vercel deployment
    chunkSizeWarningLimit: 1500,
    
    // Optimize bundle splitting for better caching and performance
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          
          // UI libraries - Radix UI
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
          
          // Material UI
          'vendor-mui': [
            '@mui/material',
            '@mui/icons-material',
            '@emotion/react',
            '@emotion/styled',
          ],
          
          // 3D libraries
          'vendor-three': [
            'three',
            '@react-three/fiber',
            '@react-three/drei',
          ],
          
          // Charts and visualization
          'vendor-charts': ['recharts'],
          
          // Animation
          'vendor-animation': ['motion'],
          
          // Form handling
          'vendor-forms': [
            'react-hook-form',
            'react-day-picker',
            'date-fns',
          ],
          
          // DnD and interactions
          'vendor-dnd': [
            'react-dnd',
            'react-dnd-html5-backend',
          ],
          
          // Third-party integrations
          'vendor-integrations': [
            '@d-id/client-sdk',
            'react-plaid-link',
            'jspdf',
            'react-qr-code',
          ],
          
          // Utilities
          'vendor-utils': [
            'clsx',
            'class-variance-authority',
            'tailwind-merge',
            'lucide-react',
            'sonner',
          ],
          
          // Other UI components
          'vendor-ui-misc': [
            'react-slick',
            'react-responsive-masonry',
            'react-resizable-panels',
            'embla-carousel-react',
            'vaul',
            'cmdk',
            'next-themes',
            'input-otp',
            '@popperjs/core',
            'react-popper',
          ],
        },
      },
    },
    
    // Optimize for production - use esbuild (faster, built into Vite)
    minify: 'esbuild',
    
    // Source maps for debugging (disable in production if needed)
    sourcemap: false,
    
    // Target modern browsers for smaller bundle size
    target: 'es2020',
  },
  
  // Preview server configuration (for `pnpm preview`)
  preview: {
    port: 4173,
    strictPort: false,
  },
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    host: true, // Listen on all addresses
    open: false,
  },
})
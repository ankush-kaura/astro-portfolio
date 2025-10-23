import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://ankush-kaura.github.io/astro-portfolio/',
  base: '',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  build: {
    // Optimize for production
    assets: 'assets',
    // Inline small assets
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Optimize CSS
      cssMinify: true,

      // Use esbuild for better compatibility (no additional dependencies needed)
      minify: 'esbuild',
      // Generate optimized chunks
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            ui: ['@radix-ui/react-dropdown-menu', '@radix-ui/react-slot'],
            vendor: ['lucide-react', 'clsx', 'class-variance-authority'],
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/styles.css'
            }
            return 'assets/[name].[ext]'
          },
        },
      },
      // Optimize assets
      assetsInlineLimit: 4096,
      // Enable source maps for production debugging (optional)
      sourcemap: false,
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@astrojs/react/client.js',
        'lucide-react',
        'clsx',
        'tailwind-merge'
      ],
    },
    // Enable CSS code splitting
    css: {
      devSourcemap: false,
    },
  },
  // Enable compression for GitHub Pages
  compressHTML: true,
})

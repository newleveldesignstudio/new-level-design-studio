import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import sitemapPlugin from 'vite-plugin-sitemap'
import { SITEMAP_ROUTES } from './src/data/routes'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
  plugins: [
    // Dev-only: kimi inspect attributes must never reach production HTML
    // (they expose source paths and bloat every prerendered page).
    ...(mode === 'development' ? [inspectAttr()] : []),
    react(),
    sitemapPlugin({
      hostname: 'https://newlvlstudio.com',
      dynamicRoutes: SITEMAP_ROUTES,
      exclude: ['/netlify-forms'],
      generateRobotsTxt: false,
      outDir: 'dist',
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-router', 'react-helmet-async'],
          'vendor-motion': ['framer-motion'],
          'vendor-gsap': ['gsap', 'lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

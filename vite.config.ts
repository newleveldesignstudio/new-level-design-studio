import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import sitemapPlugin from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    inspectAttr(),
    react(),
    sitemapPlugin({
      hostname: 'https://newlvlstudio.com',
      dynamicRoutes: [
        '/services',
        '/works',
        '/studio',
        '/journal',
        '/packages',
        '/starter-pack',
        '/contact',
        '/privacy',
        '/terms',
        '/port-orange-website-design',
        '/daytona-beach-website-design',
        '/volusia-county-website-design',
        '/central-florida-website-design',
        '/works/the-grass-guys',
        '/works/dh-luxury-roofing',
        '/works/volusia-legal-group',
        '/works/ember-oak-coffee',
        '/works/love-handles-bbq',
        '/works/coastal-standard-realty',
        '/works/el-taller-2026',
        '/works/la-tequila-2026',
        '/works/the-best-landscape-2026',
      ],
      exclude: ['/netlify-forms'],
      generateRobotsTxt: false,
      outDir: 'dist',
    }),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

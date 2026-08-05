import { articles } from './articles';

/**
 * Single source of truth for the site's public URL surface.
 *
 * Consumed by:
 *  - vite.config.ts        → sitemap generation (vite-plugin-sitemap)
 *  - scripts/prerender.mjs → indirectly: it prerenders exactly the URLs in
 *    the generated sitemap, so sitemap and prerender cannot drift apart.
 *
 * NOT consumed by src/App.tsx — routes there are declared manually with their
 * components. When you add a route to App.tsx, add it here too (and vice
 * versa). The prerender step fails loudly if a route listed here renders the
 * Page Not Found screen, which catches a manifest entry missing from App.tsx.
 *
 * Deliberately excluded: /ops (private, noindexed internal dashboard).
 */

export const STATIC_PUBLIC_ROUTES = [
  '/',
  '/services',
  '/works',
  '/studio',
  '/michael-vail',
  '/journal',
  '/packages',
  '/starter-pack',
  '/website-care',
  '/real-estate-web-design',
  '/real-estate-marketing-website',
  '/proof',
  '/local-visibility-setup',
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
  '/works/crescent-harbor',
  '/works/coastal-standard-realty',
  '/works/el-taller-2026',
  '/works/la-tequila-2026',
  '/works/the-best-landscape-2026',
  '/works/aureline-estates',
  '/works/stone-timber-remodeling',
  '/works/lotus-beauty-house',
  '/works/the-grooming-forge',
  '/works/blend-house-smoothie-bar',
  '/works/liquid-legacy-pools',
  '/free-seo-tools',
  '/free-local-visibility-check',
  '/local-visibility-insights',
  '/local-visibility-insights/website-trust',
  '/local-visibility-insights/customer-decision-path',
  '/local-visibility-insights/google-profile-completeness',
  '/local-visibility-insights/contact-information',
  '/local-visibility-insights/review-recency',
  '/local-visibility-insights/mobile-readiness',
] as const;

/** One route per journal article, derived from the article data itself. */
export const JOURNAL_ROUTES: string[] = articles.map((a) => `/journal/${a.slug}`);

/** Every public route, including '/'. */
export const PUBLIC_ROUTES: string[] = [...STATIC_PUBLIC_ROUTES, ...JOURNAL_ROUTES];

/** What vite-plugin-sitemap needs: every public route except '/' (added automatically). */
export const SITEMAP_ROUTES: string[] = PUBLIC_ROUTES.filter((r) => r !== '/');

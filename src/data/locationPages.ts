/**
 * Shared manifest of the four local-SEO landing pages. Single source of
 * truth for cross-linking between them (LocalLandingPage's "Other Areas We
 * Serve" module) so the link text/href pairs can't drift from Footer.tsx or
 * from each other. Link text matches Footer.tsx exactly — no new copy.
 */

export type LocationSlug = 'port-orange' | 'daytona-beach' | 'volusia-county' | 'central-florida';

export interface LocationPageLink {
  slug: LocationSlug;
  name: string;
  href: string;
}

export const LOCATION_PAGES: LocationPageLink[] = [
  { slug: 'port-orange', name: 'Port Orange Website Design', href: '/port-orange-website-design/' },
  { slug: 'daytona-beach', name: 'Daytona Beach Website Design', href: '/daytona-beach-website-design/' },
  { slug: 'volusia-county', name: 'Volusia County Web Design', href: '/volusia-county-website-design/' },
  { slug: 'central-florida', name: 'Central Florida Local Business Websites', href: '/central-florida-website-design/' },
];

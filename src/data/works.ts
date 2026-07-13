/**
 * Lightweight navigational manifest of the work/case-study detail pages.
 *
 * Purpose: drive the <RelatedProjects> module so every project page links to
 * a few relevant siblings (fixes "only one incoming internal link"). This is
 * intentionally a slim {slug, title, industry} list — the rich card content
 * for the /works grid still lives in Works.tsx. Keep this in sync when a work
 * detail page is added or removed (industry strings must match Works.tsx).
 */

export interface WorkSummary {
  slug: string;
  title: string;
  industry: string;
}

export const workSummaries: WorkSummary[] = [
  { slug: 'stone-timber-remodeling', title: 'Stone & Timber Remodeling', industry: 'Contractors' },
  { slug: 'dh-luxury-roofing', title: 'DH Luxury Roofing', industry: 'Contractors' },
  { slug: 'love-handles-bbq', title: 'Love Handles BBQ', industry: 'Restaurants' },
  { slug: 'el-taller-2026', title: 'El Taller 2026', industry: 'Restaurants' },
  { slug: 'la-tequila-2026', title: 'La Tequila 2026', industry: 'Restaurants' },
  { slug: 'ember-oak-coffee', title: 'Ember & Oak Coffee Co.', industry: 'Coffee & Cafés' },
  { slug: 'blend-house-smoothie-bar', title: 'Blend House Smoothie Bar', industry: 'Coffee & Cafés' },
  { slug: 'the-grass-guys', title: 'The Grass Guys', industry: 'Local Services' },
  { slug: 'the-best-landscape-2026', title: 'The Best Landscape 2026', industry: 'Local Services' },
  { slug: 'aureline-estates', title: 'Aureline Estates', industry: 'Real Estate' },
  { slug: 'crescent-harbor', title: 'Crescent Harbor Realty', industry: 'Real Estate' },
  { slug: 'coastal-standard-realty', title: 'Coastal Standard Realty', industry: 'Real Estate' },
  { slug: 'volusia-legal-group', title: 'Volusia Legal Group', industry: 'Law Firms' },
  { slug: 'lotus-beauty-house', title: 'Lotus Beauty House', industry: 'Salons & Barbers' },
  { slug: 'liquid-legacy-pools', title: 'Liquid Legacy Pools', industry: 'Local Services' },
];

/**
 * Pick up to `count` related projects for a given slug. Candidates are walked
 * in cyclic order starting *after* this project, taking same-industry siblings
 * first (topically relevant) then filling with the nearest others. Rotating
 * the start point distributes incoming links evenly, so every page — including
 * the last member of a large industry group — both links out to and receives
 * links from a stable set of siblings, with no orphans or build-to-build drift.
 */
export function getRelatedProjects(slug: string, count = 3): WorkSummary[] {
  const idx = workSummaries.findIndex((w) => w.slug === slug);
  if (idx === -1) return [];
  const self = workSummaries[idx];
  const n = workSummaries.length;
  const rotated = Array.from({ length: n - 1 }, (_, k) => workSummaries[(idx + 1 + k) % n]);
  const chosen: WorkSummary[] = [];

  for (const w of rotated) {
    if (chosen.length >= count) break;
    if (w.industry === self.industry) chosen.push(w);
  }
  for (const w of rotated) {
    if (chosen.length >= count) break;
    if (!chosen.includes(w)) chosen.push(w);
  }
  return chosen;
}

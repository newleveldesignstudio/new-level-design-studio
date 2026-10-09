/**
 * Website-focused homepage copy removed from the homepage in the October 2026
 * repositioning (websites + lead systems + business workflows). The homepage
 * repeated the website argument several times; this approved copy is kept here
 * as source material for a future standalone resource page. Not rendered yet.
 */

/** Was the homepage "Why It Matters" section. */
export const WHY_A_WEBSITE_MATTERS = {
  eyebrow: 'WHY IT MATTERS',
  heading: 'Your website has to earn trust before the first call.',
  intro:
    'Most people decide how they feel about a business within seconds of landing on its website. A few things make that first impression work in your favor:',
  points: [
    'Clear services reduce hesitation before someone reaches out.',
    'Better structure makes it easier to understand what you actually do.',
    'Trust signals help people feel safer picking up the phone or sending a message.',
    'Mobile clarity matters — most people are checking you out quickly, on their phone.',
  ],
  image: {
    src: '/nlds/images/port-orange-local-business-storefront-first-impression-trust-new-level-design-studio.webp',
    alt: 'Modern local business storefront',
  },
} as const;

/** Was the homepage "What We Build" capabilities strip (website-only). */
export const WEBSITE_CAPABILITIES = [
  {
    label: 'Mobile-First Websites',
    desc: 'Structured for how local customers actually search and browse — fast, clean, and built around a clear inquiry path.',
  },
  {
    label: 'Local SEO Structure',
    desc: 'On-page foundations, location pages, and schema markup that give your local market a real chance to find you.',
  },
  {
    label: 'Clear Inquiry Paths',
    desc: 'Quote requests, contact flows, and booking CTAs designed to reduce friction and generate real calls and messages.',
  },
  {
    label: 'Branded Visual Systems',
    desc: 'Logos, graphics, and imagery that stay consistent across your website, Google Business Profile, and social platforms.',
  },
] as const;

/** Was the homepage "Website Success Checklist" section. */
export const WEBSITE_SUCCESS_CHECKLIST = {
  eyebrow: 'WEBSITE SUCCESS CHECKLIST',
  heading: 'What Your Website Needs to Work',
  items: [
    { num: '01', title: 'Clear First Impression', desc: 'Visitors should understand who you are and why you matter within seconds of landing.' },
    { num: '02', title: 'Strong Headline', desc: 'Simple. Specific. Direct.' },
    { num: '03', title: 'Premium Brand Presentation', desc: 'Look established before people compare.' },
    { num: '04', title: 'Mobile-First Layout', desc: 'Built for the screen most of your customers are actually using to find you.' },
    { num: '05', title: 'Clear Service Structure', desc: 'Make the offer easy to understand.' },
    { num: '06', title: 'Trust Signals', desc: 'Proof that builds confidence before the first conversation — concept work, credentials, and social presence.' },
    { num: '07', title: 'Clear Call to Action', desc: 'Give visitors one clear next step.' },
    { num: '08', title: 'Fast Load Speed', desc: 'Performance shapes perception.' },
    { num: '09', title: 'Local SEO Foundation', desc: 'A properly structured site gives your local market a real chance to find you.' },
    { num: '10', title: 'Ongoing Maintenance', desc: 'Keep the site sharp after launch.' },
  ],
} as const;

/** Was the homepage "First Impressions" section (replaced by "Where Local Businesses Lose Opportunities"). */
export const FIRST_IMPRESSION = {
  heading: 'Your first impression is already happening.',
  body: 'Most people form an opinion in seconds. We help businesses own that moment — with a website that feels considered, a brand that feels confident, and visuals that feel like someone who cares made them.',
  panels: [
    { title: 'Website Design', desc: 'Most visitors decide whether to call or scroll past within seconds. A professionally structured website is the clearest signal your business is worth contacting.' },
    { title: 'Brand Direction', desc: 'Scattered graphics and mismatched imagery quietly signal that no one is in charge. A unified visual system makes every touchpoint feel intentional.' },
    { title: 'Website Copy & Visual Support', desc: 'Branded graphics, launch assets, and supporting content keep the website and the rest of the business looking consistent wherever customers encounter it.' },
  ],
} as const;

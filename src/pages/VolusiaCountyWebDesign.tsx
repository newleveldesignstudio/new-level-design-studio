import { Link } from 'react-router-dom';
import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Volusia County Web Design for Local Businesses | NLDS',
  seoDescription: 'Website design for local businesses across Volusia County — Port Orange, Daytona Beach, Ormond Beach, New Smyrna Beach, DeLand, and nearby areas.',
  canonical: 'https://newlvlstudio.com/volusia-county-website-design',
  citySlug: 'volusia-county',
  breadcrumbName: 'Volusia County Web Design',
  cityName: 'Volusia County',
  areaServed: ['Volusia County', 'Port Orange', 'Daytona Beach', 'Ormond Beach', 'New Smyrna Beach', 'DeLand'],
  eyebrow: 'Volusia County, Florida',
  h1: 'Volusia County Web Design for Local Businesses',
  intro: 'Volusia County stretches from Port Orange and Daytona Beach to Ormond Beach, New Smyrna Beach, DeLand, and beyond. We work with local businesses across the county to build websites, brand systems, and visual content that create a stronger, more credible online presence — wherever you operate.',
  helpFix: [
    {
      title: 'No Consistent Brand Across Platforms',
      desc: 'Businesses spread across the county often look different on their website, Google listing, and social media. We build visual systems that stay consistent everywhere customers find you.',
    },
    {
      title: 'Limited Local Visibility Across the Region',
      desc: 'Getting found across Volusia County takes more than a basic website. We structure your site and content to support local search across the communities you actually serve.',
    },
    {
      title: 'Generic Templates That Don\'t Reflect the Business',
      desc: 'Cookie-cutter websites don\'t build trust. We design sites that feel custom to your business — without the long timelines or enterprise price tag.',
    },
    {
      title: 'No Clear Direction After Launch',
      desc: 'Most businesses launch a website and then let it sit. Our Website Care plan keeps your site current, polished, and working — so it continues to build trust and support your business long after launch.',
    },
  ],
  trustHeading: 'Regional Coverage, Local Focus',
  trustBody: 'From Port Orange and Daytona Beach to Ormond Beach, New Smyrna Beach, DeLand, and beyond — we build websites and brand systems for Volusia County businesses that need to look more established, rank better locally, and make it easier for customers to reach them.',
  ctaHeading: 'Ready to Build a Stronger Presence Across Volusia County?',
  ctaBody: 'Tell us where you operate and what your business needs — we will put together the right plan for your market.',
  localNotes: {
    eyebrow: 'VOLUSIA COUNTY',
    heading: 'One business, several towns',
    body: (
    <>
      <p>Contractors, cleaners and other service businesses often cover more than one town. A common mistake is a separate thin page for every town. A stronger approach is one clear site that names the areas you really serve, shows the work you do, and makes the estimate request easy — with your Google profile service area set to match.</p>
      <p>NLDS is based in Port Orange and works with businesses across Volusia County. Contractors can start with <Link to="/contractor-website-design/" style={{ color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 }}>contractor website design</Link>. If you serve homes and businesses in several cities, start with the <Link to="/packages/" style={{ color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 }}>website packages</Link> or <Link to="/contact/" style={{ color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 }}>tell us about your service area</Link>.</p>
    </>
    ),
  },
  examples: {
    heading: 'Contractor and service-business demos',
    intro: 'Industry demos and concept builds for service businesses, labelled as on the Work page.',
    items: [
      { title: 'Precision Line Roofing', label: 'Industry Demo / Concept Build', industry: 'Contractors', href: '/works/precision-line-roofing/' },
      { title: 'Arctic Airworks', label: 'Industry Demo / Concept Build', industry: 'Local Services', href: '/works/arctic-airworks/' },
      { title: 'Volusia Legal Group', label: 'Industry Demo', industry: 'Law Firms', href: '/works/volusia-legal-group/' },
      { title: 'The Best Landscape 2026', label: 'Concept Build', industry: 'Local Services', href: '/works/the-best-landscape-2026/' },
    ],
  },
  faq: [
    {
      q: 'I operate in more than one Volusia County city — can you build one consistent system for all my locations?',
      a: 'Yes. Keeping your website, Google Business Profile, and social visuals consistent across every location you serve is a core part of what we do — so your brand looks like one business, not several different ones.',
    },
    {
      q: 'Do you work with businesses across all of Volusia County?',
      a: 'Yes — Port Orange, Daytona Beach, Ormond Beach, New Smyrna Beach, DeLand, Edgewater, and the surrounding areas are all part of our regular service area.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. Depending on what is not working, that can mean a full redesign, a visual refresh, or targeted fixes to specific pages.',
    },
    {
      q: 'Do you offer website maintenance after launch?',
      a: 'Yes. Website Care runs $99 a month and covers content updates, image swaps, link and form checks, and a monthly review — across however many locations you operate.',
    },
    {
      q: 'How do I know which package is right for my business?',
      a: 'Describe your business and where you operate, and we will point you toward the right fit — a single-location site, a multi-location structure, or ongoing Website Care for a site you already have.',
    },
  ],
};

export default function VolusiaCountyWebDesign() {
  return <LocalLandingPage config={config} />;
}

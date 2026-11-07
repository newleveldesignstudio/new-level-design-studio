import { Link } from 'react-router-dom';
import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Port Orange Website Design for Local Businesses | NLDS',
  seoDescription: 'Premium, mobile-first website design for Port Orange, FL businesses — built for local trust, clear branding, and real inquiries.',
  canonical: 'https://newlvlstudio.com/port-orange-website-design',
  citySlug: 'port-orange',
  breadcrumbName: 'Port Orange Website Design',
  cityName: 'Port Orange',
  areaServed: ['Port Orange', 'Daytona Beach', 'Ormond Beach', 'New Smyrna Beach', 'Volusia County'],
  eyebrow: 'Port Orange, Florida',
  h1: 'Website Design for Port Orange Businesses',
  intro: 'Port Orange is a growing community with strong local businesses across services, food, fitness, beauty, and home improvement. We build premium websites and brand systems that help Port Orange businesses look more established, get found locally, and turn website visitors into real inquiries.',
  helpFix: [
    {
      title: 'Outdated or Generic Websites',
      desc: 'Many Port Orange businesses are still running on templates that looked dated five years ago. We build clean, well-crafted sites that match how good your business actually is.',
    },
    {
      title: 'Hard to Reach on Mobile',
      desc: 'Most people looking for a local restaurant, salon, or contractor are on their phones. We design mobile-first so your site works well on the screen your customers actually use.',
    },
    {
      title: 'Unclear Services or Next Steps',
      desc: 'If visitors cannot quickly understand what you do and how to reach you, they leave. We structure your site around clarity — what you do, who you serve, and what to do next.',
    },
    {
      title: 'No Local Search Foundation',
      desc: 'A properly built website is the starting point for being found in Port Orange searches. We structure pages, metadata, and content to support local visibility from day one.',
    },
  ],
  trustHeading: 'Built for Port Orange Businesses Ready to Look the Part',
  trustBody: 'From restaurants and salons to contractors and service providers serving 32127 and surrounding neighborhoods — we help Port Orange businesses build a sharper, more credible online presence without the enterprise price tag.',
  ctaHeading: 'Ready to Build a Stronger Online Presence in Port Orange?',
  ctaBody: 'Tell us about your business and we will show you what a premium website and visual system can do for your local presence.',
  localNotes: {
    eyebrow: 'PORT ORANGE',
    heading: 'A website that matches your Google profile',
    body: (
    <>
      <p>When a customer in Port Orange finds you on Google Maps, the next tap is your website. It should agree with the profile: the same business name, phone number, services and service area. It should also answer the first question quickly — do you do what I need, and do you work where I am?</p>
      <p>NLDS is based in Port Orange. We start with your services, the neighborhoods you cover and the one action you want visitors to take, then build the site around those. Website packages start at $499 — the <Link to="/packages/" style={{ color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 }}>Packages page</Link> lays out what each one includes, and <Link to="/website-care/" style={{ color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 }}>Website Care</Link> keeps the site current after launch.</p>
    </>
    ),
  },
  examples: {
    heading: 'Recent concept builds for local service businesses',
    intro: 'NLDS concept builds, labelled as on the Work page. They show how we structure a local business site.',
    items: [
      { title: 'Liquid Legacy Pools', label: 'Concept Build', industry: 'Local Services', href: '/works/liquid-legacy-pools/' },
      { title: 'Stone & Timber Remodeling', label: 'Concept Build', industry: 'Contractors', href: '/works/stone-timber-remodeling/' },
      { title: 'Lotus Beauty House', label: 'Concept Build', industry: 'Salons & Barbers', href: '/works/lotus-beauty-house/' },
      { title: 'The Grooming Forge', label: 'Concept Build', industry: 'Salons & Barbers', href: '/works/the-grooming-forge/' },
    ],
  },
  faq: [
    {
      q: 'Is New Level Design Studio actually based in Port Orange?',
      a: 'Yes — Port Orange is our home base, and it is where most of our client relationships start. We also work with businesses throughout Daytona Beach, Ormond Beach, New Smyrna Beach, and the wider Volusia County and Central Florida area.',
    },
    {
      q: 'What kind of local businesses do you typically build for in Port Orange?',
      a: 'Mostly service-based businesses — restaurants, salons, contractors, and home-improvement companies looking for a cleaner, more credible online presence than a generic template can offer.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. We can redesign your current site, refresh the visuals, restructure the layout, or fix specific problem areas — a full rebuild is not always necessary.',
    },
    {
      q: 'Do you offer website maintenance after launch?',
      a: 'Yes. Website Care starts at $99 a month and covers content updates, image swaps, link and form checks, and a monthly review, so your site stays current long after launch.',
    },
    {
      q: 'How do I know which package I need?',
      a: 'Tell us about your business and what is not working, and we will recommend the right starting point — whether that is the Visual Starter Pack, a full website build, or Website Care for an existing site.',
    },
  ],
};

export default function PortOrangeWebDesign() {
  return <LocalLandingPage config={config} />;
}

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
  faq: [
    {
      q: 'Do you work with businesses across all of Volusia County?',
      a: 'Yes. We work with businesses in Port Orange, Daytona Beach, Ormond Beach, New Smyrna Beach, DeLand, Edgewater, and surrounding areas throughout the county.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. We can redesign, refresh, or improve what you already have — or rebuild from scratch if that makes more sense for your business.',
    },
    {
      q: 'Do you offer website maintenance after launch?',
      a: 'Yes. Website Care runs $99/month and takes care of the maintenance side — content updates, image swaps, link and form checks, plus a monthly review — across however many locations you operate.',
    },
    {
      q: 'Can you create visuals for Google Business Profile and social media?',
      a: 'Yes. Brand visuals are part of our core offering — covers, banners, post graphics, and any assets your business needs to look consistent across every platform.',
    },
    {
      q: 'How do I know which package is right for my business?',
      a: 'Start with a quick conversation. Describe your business and what you need — we will point you toward the right fit, whether that is a Visual Starter Pack, a full website, or a complete brand system.',
    },
  ],
};

export default function VolusiaCountyWebDesign() {
  return <LocalLandingPage config={config} />;
}

import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Port Orange Website Design for Local Businesses | NLDS',
  seoDescription: 'Premium website design for local businesses in Port Orange, Florida. Clean, mobile-first websites with clear brand direction and ongoing care — built to earn trust and drive real inquiries.',
  canonical: 'https://newlvlstudio.com/port-orange-website-design',
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
  faq: [
    {
      q: 'Do you work with businesses outside Port Orange?',
      a: 'Yes. While we are based in Port Orange and focused on Volusia County, we work with local businesses across Daytona Beach, Ormond Beach, New Smyrna Beach, DeLand, and Central Florida.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Absolutely. We can redesign your current site, refresh the visuals, improve the structure, or just fix the parts that are not working. You do not need to start from scratch.',
    },
    {
      q: 'Do you offer website maintenance after launch?',
      a: 'Yes. Our Website Care plan keeps your website current, polished, and working at $99/month — covering content updates, image swaps, link and form checks, and a monthly review.',
    },
    {
      q: 'Can you create visuals for Google Business Profile and Facebook?',
      a: 'Yes. Brand visuals are a core part of what we offer — including graphics for your Google Business Profile, Facebook cover, social posts, and any other platform your business uses.',
    },
    {
      q: 'How do I know which package I need?',
      a: 'The best starting point is a quick conversation. Tell us about your business and what you are trying to fix or build, and we will point you toward the right fit — whether that is a Visual Starter Pack, a full website build, or something in between.',
    },
  ],
};

export default function PortOrangeWebDesign() {
  return <LocalLandingPage config={config} />;
}

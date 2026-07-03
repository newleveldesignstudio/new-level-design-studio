import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Central Florida Website Design | NLDS',
  seoDescription: 'Premium website design for growing local businesses across Central Florida. Clean, well-crafted websites with clear brand direction and ongoing care — built for credibility, local visibility, and real inquiries.',
  canonical: 'https://newlvlstudio.com/central-florida-website-design',
  eyebrow: 'Central Florida',
  h1: 'Website Design for Central Florida Local Businesses',
  intro: 'Central Florida is home to thousands of growing local businesses — from service providers and contractors to restaurants, wellness studios, and specialty shops. We build premium websites and brand systems that help these businesses look more credible, get found online, and generate real customer inquiries.',
  helpFix: [
    {
      title: 'Websites That Don\'t Match the Quality of the Business',
      desc: 'Your work may be excellent, but if your website looks dated or amateur, customers second-guess before they call. We close that gap with clean, well-crafted sites that reflect your actual quality.',
    },
    {
      title: 'Hard to Find in Local Search',
      desc: 'In a large market, visibility requires structure. We build websites with local SEO foundations that help the right customers find you in the specific areas you serve.',
    },
    {
      title: 'No Consistent Brand Across Web and Social',
      desc: 'Inconsistent visuals across platforms signal a lack of professionalism. We build design systems that keep your business looking sharp everywhere people look.',
    },
    {
      title: 'No Ongoing Support or Maintenance',
      desc: 'A launched website without attention quickly looks stale. Our Website Care plan keeps your site current, polished, and working — so it continues to support your business long after launch.',
    },
  ],
  trustHeading: 'Built for Growing Local Businesses Across Central Florida',
  trustBody: 'We work with local businesses across Central Florida who need a more credible, better-organized online presence. Whether you are just starting or ready to upgrade, we help you look the part and make it easier for customers to choose you.',
  ctaHeading: 'Ready to Build a Stronger Online Presence Across Central Florida?',
  ctaBody: 'Tell us about your business and service area — we will show you what a premium website and brand system can do for your growth.',
  faq: [
    {
      q: 'Do you work with businesses across Central Florida?',
      a: 'Yes. We work with local businesses throughout Central Florida — from the Space Coast and Orlando metro to the Volusia County coast and surrounding areas.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. We can redesign, improve, or rebuild your existing site — whatever makes the most sense for where your business is right now.',
    },
    {
      q: 'Do you offer ongoing website maintenance?',
      a: 'Yes. Our Website Care plan keeps your website current, polished, and working at $99/month — covering content updates, link and form checks, image swaps, and a monthly review.',
    },
    {
      q: 'Can you create visuals for Google Business Profile and Facebook?',
      a: 'Yes. Brand visuals are part of our core services — including graphics for Google Business Profile, Facebook, social posts, and any other platform your business uses.',
    },
    {
      q: 'What is the best way to get started?',
      a: 'The easiest first step is a quick conversation. Tell us about your business, your service area, and what you are trying to fix or build — we will match you to the right starting point.',
    },
  ],
};

export default function CentralFloridaWebDesign() {
  return <LocalLandingPage config={config} />;
}

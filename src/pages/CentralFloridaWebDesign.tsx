import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Central Florida Website Design | NLDS',
  seoDescription: 'Website design for growing Central Florida businesses — clean, credible sites built for local visibility and real inquiries.',
  canonical: 'https://newlvlstudio.com/central-florida-website-design',
  citySlug: 'central-florida',
  breadcrumbName: 'Central Florida Local Business Websites',
  cityName: 'Central Florida',
  areaServed: ['Central Florida', 'Volusia County', 'Port Orange', 'Daytona Beach'],
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
      q: 'Central Florida is a huge region — do you only work with businesses near Volusia County?',
      a: 'Our home base is Port Orange, but we work with growing local businesses across the wider Central Florida area, from the Space Coast and Orlando metro to the Volusia County coast.',
    },
    {
      q: 'My business is growing fast — can my website keep up?',
      a: 'That is exactly what Website Care is built for. Instead of a site that goes stale after launch, ongoing updates and a monthly review keep it current as your business, services, or locations change.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. We can redesign, refresh, or rebuild your existing site — whatever fits where your business is right now.',
    },
    {
      q: 'Do you offer ongoing website maintenance?',
      a: 'Yes. Website Care starts at $99 a month and covers content updates, image swaps, link and form checks, and a monthly review, so your site keeps working as your business grows.',
    },
    {
      q: 'What is the best way to get started?',
      a: 'The easiest way to start is a short conversation about your business and service area — from there we will recommend the right package, from a Visual Starter Pack to a full website build.',
    },
  ],
};

export default function CentralFloridaWebDesign() {
  return <LocalLandingPage config={config} />;
}

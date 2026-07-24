import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Daytona Beach Website Design | NLDS',
  seoDescription: 'Website design for Daytona Beach businesses that need to stand out fast — mobile-first, trust-building sites for a competitive market.',
  canonical: 'https://newlvlstudio.com/daytona-beach-website-design',
  citySlug: 'daytona-beach',
  breadcrumbName: 'Daytona Beach Website Design',
  cityName: 'Daytona Beach',
  areaServed: ['Daytona Beach', 'Port Orange', 'Ormond Beach', 'New Smyrna Beach', 'Volusia County'],
  eyebrow: 'Daytona Beach, Florida',
  h1: 'Website Design for Daytona Beach Local Businesses',
  intro: 'Daytona Beach is a competitive market with a mix of tourism, hospitality, restaurants, service providers, and local businesses all competing for the same attention. We build websites and visual systems that help Daytona Beach businesses stand out, build trust faster, and make it easier for customers to take action.',
  helpFix: [
    {
      title: 'Blending In with Competitors',
      desc: 'In a high-traffic market like Daytona, a generic website is invisible. We build sites that immediately communicate what makes your business different and worth choosing.',
    },
    {
      title: 'Weak First Impression for New Visitors',
      desc: 'Tourism and foot traffic create one-shot opportunities. Your website needs to communicate quality instantly — no confusing navigation, no guessing what you do or how to reach you.',
    },
    {
      title: 'Outdated Visual Direction',
      desc: 'Customers compare before they contact. We help Daytona Beach businesses upgrade their look so they feel current, credible, and worth reaching out to.',
    },
    {
      title: 'No Clear Path to the Next Step',
      desc: 'Menu, hours, contact form, reservations — whatever action matters most to your business needs to be one obvious click away. We build sites around that single next step.',
    },
  ],
  trustHeading: 'Built to Win in a Competitive Market',
  trustBody: 'Whether you are running a restaurant near the strip, a service business serving beachside neighborhoods, or a local brand trying to stand out — we help Daytona Beach businesses look sharper and convert more attention into real customers.',
  ctaHeading: 'Ready to Stand Out in Daytona Beach?',
  ctaBody: 'Tell us about your business and we will show you what a premium website and visual system can do for your local visibility and customer conversions.',
  faq: [
    {
      q: 'Why does a Daytona Beach business need a stronger website than businesses elsewhere?',
      a: 'Daytona Beach mixes heavy tourism with local competition, so many visitors are making a one-time decision with no prior relationship to your business. An outdated or generic website costs you that first impression before you get a chance to make your case in person.',
    },
    {
      q: 'Do you work with seasonal or tourism-driven businesses?',
      a: 'Yes. Restaurants, hospitality, and service businesses that see seasonal swings in foot traffic are a big part of who we build for in Daytona Beach — fast-loading pages and one clear next step matter most when visitors decide in seconds.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. We can redesign, restructure, or simply sharpen the visuals on your existing site — you do not need to start over to see a real improvement.',
    },
    {
      q: 'Do you offer website maintenance after launch?',
      a: 'Yes. Website Care starts at $99 a month and covers ongoing updates — content changes, image swaps, link and form checks, and a monthly review — so your site does not quietly fall behind.',
    },
    {
      q: 'How do I know which package is right for my business?',
      a: 'Start with a short conversation about your business — we will recommend the right starting point, from the $129 Visual Starter Pack up to a full website build.',
    },
  ],
};

export default function DaytonaBeachWebDesign() {
  return <LocalLandingPage config={config} />;
}

import LocalLandingPage from '@/components/LocalLandingPage';
import type { LocalPageConfig } from '@/components/LocalLandingPage';

const config: LocalPageConfig = {
  seoTitle: 'Daytona Beach Website Design | NLDS',
  seoDescription: 'Premium website design for local businesses in Daytona Beach, Florida. Clean, mobile-first websites with clear brand direction and ongoing care — built to earn trust and drive real inquiries.',
  canonical: 'https://newlvlstudio.com/daytona-beach-website-design',
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
      q: 'Do you work with businesses outside Daytona Beach?',
      a: 'Yes. We serve businesses across Port Orange, Ormond Beach, New Smyrna Beach, DeLand, and the wider Volusia County and Central Florida area.',
    },
    {
      q: 'Can you help if I already have a website?',
      a: 'Yes. We can redesign your current site, improve the layout, refresh the visuals, or address specific problems — without requiring a full rebuild every time.',
    },
    {
      q: 'Do you offer website maintenance after launch?',
      a: 'Yes. Our Website Care plan keeps your website current, polished, and working at $99/month — covering content updates, image swaps, link checks, and a monthly review.',
    },
    {
      q: 'Can you create visuals for my Google Business Profile and social pages?',
      a: 'Yes. We build brand visuals that work across your website, Google Business Profile, Facebook, and any other platform where your business shows up.',
    },
    {
      q: 'How do I know which package is right for my business?',
      a: 'The best first step is a quick conversation. Tell us about your business and what you need — we will match you to the right starting point, from a $129 Starter Pack to a full website and brand system.',
    },
  ],
};

export default function DaytonaBeachWebDesign() {
  return <LocalLandingPage config={config} />;
}

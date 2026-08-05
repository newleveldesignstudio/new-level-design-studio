import { Link } from 'react-router-dom';
import { BookOpen, ClipboardCheck, Home as HomeIcon, Video, Search, LifeBuoy, Star, Share2 } from 'lucide-react';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const MORE_THAN_A_WEBSITE = [
  { label: 'Professional branding', desc: 'A site built around your name and brokerage — not a shared layout every other agent is using too.' },
  { label: 'Mobile-first design', desc: 'Built and tested for the phone browsing that most real estate traffic actually happens on.' },
  { label: 'Fast performance', desc: 'Pages built to load quickly, not weighed down by bloated page-builder plugins.' },
  { label: 'Local SEO', desc: 'Page titles, meta descriptions, and header structure set correctly from launch.' },
  { label: 'Google Search Console', desc: 'Verified and submitted to Google so your site can actually be indexed and found.' },
  { label: 'Google Business Profile support', desc: 'Your website and GBP kept aligned instead of working against each other.' },
  { label: 'Bing Webmaster support', desc: 'Submitted to Bing too, so you’re not relying on a single search engine.' },
  { label: 'Lead capture', desc: 'Working inquiry forms placed where buyers and sellers actually convert.' },
  { label: 'Automated email notifications', desc: 'Form submissions route straight to your inbox — no manually checking a dashboard.' },
];

const MARKETING_PLATFORM_FEATURES = [
  {
    icon: BookOpen,
    label: 'Resource Center',
    desc: 'A dedicated hub of buyer and seller guidance that keeps your site useful long after launch.',
  },
  {
    icon: ClipboardCheck,
    label: 'Seller Readiness Score',
    desc: 'An interactive checklist that helps sellers gauge listing readiness and gives you a natural reason to follow up.',
  },
  {
    icon: HomeIcon,
    label: 'Listing Launch Pages',
    desc: 'Dedicated property pages built for each active listing — photos, details, and a direct path to inquire.',
  },
  {
    icon: Video,
    label: 'Professional Listing Videos',
    desc: 'Vertical, social-ready videos built from your listing photos for standout property marketing.',
  },
  {
    icon: Search,
    label: 'Local SEO',
    desc: 'Search structure built in from day one, not bolted on after the site is already live.',
  },
  {
    icon: LifeBuoy,
    label: 'Website Care',
    desc: 'Ongoing support, checkups, and reasonable updates so the site stays current without you managing it.',
  },
  {
    icon: Star,
    label: 'Google Reviews integration',
    desc: 'Your Google reviews linked prominently, so trust you’ve already earned shows up on your own site.',
  },
  {
    icon: Share2,
    label: 'Social media integration',
    desc: 'Your active social profiles connected directly from the site, keeping every channel pointed back to you.',
  },
];

const REAL_RESULTS = [
  { label: 'Automated lead routing', desc: 'Showing requests, listing questions, and home value requests route by email automatically — no manual checking required.' },
  { label: 'Resource Center', desc: 'A live hub of buyer, seller, and relocation guidance built directly into the site.' },
  { label: 'Seller Readiness Score', desc: 'An interactive checklist tool built as part of the Resource Center.' },
  { label: 'Google indexing', desc: 'Verified in Google Search Console with pages actively submitted for indexing.' },
  { label: 'Listing presentation', desc: 'Dedicated listing pages built around real property photos and details.' },
  { label: 'Professional video support', desc: 'Vertical listing video production available as part of the ongoing build.' },
];

const pageSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://newlvlstudio.com/real-estate-marketing-website/#webpage',
  name: 'Why Our Realtor Websites Are Different',
  description:
    'What makes an NLDS realtor website different from a template: a complete real estate marketing platform, not just a website.',
  about: { '@id': 'https://newlvlstudio.com/#business' },
};

export default function RealEstateMarketingWebsite() {
  const includedRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '[data-reveal-item]',
  });
  const platformRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '[data-reveal-item]',
  });
  const resultsRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '[data-reveal-item]',
  });

  return (
    <div>
      <SEO
        title="Realtor Website Design & Real Estate Marketing Websites | New Level Design Studio"
        description="Real estate web design built as a complete marketing platform — realtor websites in Florida with local SEO, lead capture, and IDX-ready structure when appropriate."
        canonical="https://newlvlstudio.com/real-estate-marketing-website"
        jsonLd={[
          localBusinessSchema(),
          pageSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Services', url: 'https://newlvlstudio.com/services/' },
            { name: 'Why Our Realtor Websites Are Different', url: 'https://newlvlstudio.com/real-estate-marketing-website/' },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">WHY OUR REALTOR WEBSITES ARE DIFFERENT</p>
          <h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.07,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 760,
            }}
          >
            A Real Estate Website Built to Help You Stand Out Online
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 600 }}
          >
            Most realtor websites are templates with a name swapped in. NLDS builds a complete
            real estate marketing platform — branding, local SEO, lead capture, and tools that keep
            working long after launch.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/contact/?service=realtor-website" className="btn-primary">
              Schedule a Consultation
            </Link>
            <Link to="/real-estate-web-design/" className="btn-secondary">
              See Realtor Website Pricing
            </Link>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* More Than a Website */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">MORE THAN A WEBSITE</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            Built to Become Your Digital Office
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            A realtor website shouldn't just sit online looking presentable. It should function like
            a second office — reachable, working, and set up correctly behind the scenes.
          </p>
          <div ref={includedRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 mt-12">
            {MORE_THAN_A_WEBSITE.map((item) => (
              <div
                key={item.label}
                data-reveal-item
                style={{ borderTop: '1px solid var(--silver-grey)', padding: '20px 0' }}
                className="flex items-start gap-3"
              >
                <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 3 }}>
                  —
                </span>
                <div>
                  <div className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                    {item.label}
                  </div>
                  <div className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Platform */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">A COMPLETE MARKETING PLATFORM</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            Not Just a Website. A Marketing Platform.
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}
          >
            These are tools we build directly into realtor sites — some standard, some rolled out as
            part of an active build.
          </p>
          <div ref={platformRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {MARKETING_PLATFORM_FEATURES.map((item) => (
              <div
                key={item.label}
                data-reveal-item
                style={{ border: '1px solid var(--border-color)', padding: 'clamp(20px, 2.5vw, 28px)' }}
              >
                <item.icon size={22} strokeWidth={1.5} color="var(--charcoal)" />
                <h3 className="font-sans font-semibold mt-4" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                  {item.label}
                </h3>
                <p className="font-sans mt-2" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Designed for Growth */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">DESIGNED FOR GROWTH</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            A Website That Keeps Improving, Not One That Sits Still
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            A template site is finished the day it launches. An NLDS realtor website is treated as
            an ongoing asset — new content, SEO improvements, and monthly updates through Website
            Care keep it current instead of static.
          </p>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            As a business grows, the site is built to grow with it — future expansion, additional
            listing tools, and IDX/MLS integration when it makes sense for your brokerage and
            provider.
          </p>
        </div>
      </section>

      {/* Real Results */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">REAL RESULTS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            Built and Live for a Real Florida Brokerage Team
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}
          >
            Joseph Iaconis &amp; Eileen Wynne, REALTORS&reg; with Worth Clark Realty, are a live NLDS
            portfolio example — shown here for the site itself, not client figures or private details.
          </p>

          <div ref={resultsRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 mt-10">
            {REAL_RESULTS.map((item) => (
              <div
                key={item.label}
                data-reveal-item
                style={{ borderTop: '1px solid var(--silver-grey)', padding: '20px 0' }}
                className="flex items-start gap-3"
              >
                <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 3 }}>
                  —
                </span>
                <div>
                  <div className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                    {item.label}
                  </div>
                  <div className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <a href="https://jandehomesfl.com/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              View Live Realtor Website
            </a>
            <Link to="/real-estate-web-design/" className="btn-secondary">
              See Realtor Website Pricing
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to Raise the Standard?"
        body="Tell us about your brokerage, your listings, and your goals — we'll put together a clear scope and price before anything begins."
        buttonText="Schedule a Consultation"
        buttonTo="/contact/?service=realtor-website"
      />
    </div>
  );
}

import { Link } from 'react-router-dom';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import ProcessSection from '@/components/ProcessSection';
import FinalCTA from '@/components/FinalCTA';

const CTA_URL = '/contact/?service=local-visibility-setup';

const setupItems = [
  {
    title: 'Website Trust Signals',
    desc: 'Clear service pages, real contact information, and no broken links or dead-end pages.',
  },
  {
    title: 'Google Business Profile Alignment',
    desc: 'Business name, categories, service areas, and hours that match what is on your website.',
  },
  {
    title: 'Citation & Listing Consistency',
    desc: 'Your name, address, and phone number checked across the directories that matter most.',
  },
  {
    title: 'Review Link & Review Flow',
    desc: 'A simple, direct way for happy customers to leave a review — no gating, no gimmicks.',
  },
  {
    title: 'Service-Area Clarity',
    desc: 'The cities and neighborhoods you actually serve, stated clearly instead of left vague.',
  },
  {
    title: 'Local SEO Page Basics',
    desc: 'Titles, headings, and page structure that reflect what you do and where you do it.',
  },
  {
    title: 'Contact & Conversion Paths',
    desc: 'One clear way for a customer to call, message, or request a quote — no confusion about the next step.',
  },
];

const whoItHelps = [
  'Contractors',
  'Realtors',
  'Lawn Care & Landscaping',
  'Tree Service Companies',
  'Pressure Washing Companies',
  'Roofers & Remodelers',
];

const whyItMatters = [
  {
    title: 'Customers need confidence before calling',
    desc: 'Most people check more than one source before they pick up the phone. Mismatched information reads as risk, not as a small detail.',
  },
  {
    title: 'Google and AI systems need clear, consistent information',
    desc: 'Local search and AI-powered answers rely on your name, address, phone number, and service area matching everywhere they show up.',
  },
  {
    title: 'A website should support your Google profile, not sit next to it',
    desc: 'Your website and your Google Business Profile should tell the same story — not compete with two different versions of your business.',
  },
];

const processSteps = [
  { number: '01', title: 'Review', description: 'We review your current website, Google Business Profile, and listings to see where the signals do not line up.' },
  { number: '02', title: 'Clean Up', description: 'We fix the most important visibility gaps first — the ones most likely to cost you a customer.' },
  { number: '03', title: 'Connect', description: 'Your website, profile, listings, and review path get connected into one clearer, more consistent system.' },
];

const faqs = [
  {
    q: 'Is this the same as SEO?',
    a: 'It overlaps with local SEO, but this is narrower and more practical — it is about getting your basic business information correct and consistent everywhere, not a broad ongoing SEO campaign.',
  },
  {
    q: 'Do I need a website if I already have a Google Business Profile?',
    a: 'A Google Business Profile alone has limited space to explain your services, service area, and pricing. A website gives customers a fuller picture and gives your Google profile something solid to link to.',
  },
  {
    q: 'Can this help if my business only has a Facebook page?',
    a: 'Yes. A Facebook page is a start, but it is not a substitute for a website you control. We can build a proper website and align it with your Facebook page, Google profile, and listings.',
  },
  {
    q: 'Do you guarantee rankings?',
    a: 'No. Nobody can honestly guarantee search rankings. What we do is clean up the concrete visibility and trust basics that are within your control.',
  },
  {
    q: 'Is this included with Website Care?',
    a: 'Not automatically — Website Care covers ongoing content updates, link checks, and monthly review. Local Visibility Setup is a separate, one-time cleanup that can be added to a new build, an existing site, or discussed alongside Website Care.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Port Orange, Daytona Beach, and the wider Volusia County and Central Florida area.',
  },
];

const serviceSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://newlvlstudio.com/local-visibility-setup/#service',
  name: 'Local Visibility Setup',
  serviceType: 'Local Visibility Setup',
  description:
    'Website, Google Business Profile, listings, reviews, and service-area alignment for local businesses in Port Orange and Volusia County.',
  provider: { '@id': 'https://newlvlstudio.com/#business' },
  areaServed: [
    'Port Orange',
    'Daytona Beach',
    'Ormond Beach',
    'New Smyrna Beach',
    'Volusia County',
    'Central Florida',
  ],
};

const faqSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function LocalVisibilitySetup() {
  return (
    <div>
      <SEO
        title="Local Visibility Setup for Port Orange Businesses | New Level Design Studio"
        description="Get your website, Google Business Profile, reviews, listings, and service areas aligned so local customers can find and trust your business."
        canonical="https://newlvlstudio.com/local-visibility-setup"
        jsonLd={[
          localBusinessSchema(),
          serviceSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Services', url: 'https://newlvlstudio.com/services/' },
            { name: 'Local Visibility Setup', url: 'https://newlvlstudio.com/local-visibility-setup/' },
          ]),
          faqSchema,
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">LOCAL VISIBILITY SETUP</p>
          <h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.07,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 720,
            }}
          >
            Local Visibility Setup for Port Orange Businesses
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 580 }}
          >
            Help local customers find you, trust you, and contact you with a stronger website and
            cleaner local search foundation.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to={CTA_URL} className="btn-primary">
              Discuss Local Visibility Setup
            </Link>
            <Link to="/packages/" className="btn-secondary">View Website Packages</Link>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '0 0 100px' }}>
        <div className="container-nlds">
          <p className="eyebrow">THE PROBLEM</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            Local customers check more than your website
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            Before someone calls a local business, they often see the Google Business Profile, a
            review or two, a Facebook page, a directory listing, and the website itself — usually in
            that order. Most local businesses do not have one giant marketing problem. They have
            several small visibility gaps: an outdated website, weak Google profile signals,
            inconsistent listings, an unclear service area, no real review flow, or no obvious next
            step for a customer to take. If those pieces do not line up, trust drops before the phone
            ever rings.
          </p>
        </div>
      </section>

      {/* What We Set Up / Clean Up */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE SET UP</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            The Basics Most Local Businesses Are Missing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {setupItems.map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                  {item.title}
                </h3>
                <p className="font-sans mt-3" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It Helps */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHO THIS HELPS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            Built for Local Service Businesses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
            {whoItHelps.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  padding: '32px',
                }}
              >
                <span
                  className="font-sans font-semibold uppercase text-center"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.1em', color: 'var(--charcoal)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p
            className="font-sans mt-8"
            style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 620 }}
          >
            And any local service business in Port Orange, Daytona Beach, or the wider Volusia
            County area that wants its website, Google profile, and listings telling the same
            story.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHY IT MATTERS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            Trust Is Built Before the Phone Rings
          </h2>
          <div className="flex flex-col mt-12" style={{ gap: 0 }}>
            {whyItMatters.map((item, i) => (
              <div key={i} className="flex items-start gap-5" style={{ borderBottom: '1px solid var(--silver-grey)', padding: '24px 0' }}>
                <span
                  className="font-sans shrink-0"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                    {item.title}
                  </h3>
                  <p className="font-sans mt-2" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 640 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <ProcessSection
        eyebrow="HOW IT WORKS"
        heading="A Simple, Three-Step Process"
        steps={processSteps}
      />

      {/* Offer / CTA */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds" style={{ maxWidth: 680 }}>
          <p className="eyebrow">HOW TO GET STARTED</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Available as Part of a Build, or as an Add-On
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
          >
            Local Visibility Setup is available as part of a new website build, or as a visibility
            add-on for a business that already has a website. Either way, it starts with the same
            first step — a look at what is currently in place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={CTA_URL} className="btn-primary">Discuss Local Visibility Setup</Link>
            <Link to="/services/" className="btn-secondary">View All Services</Link>
          </div>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
          >
            Not ready to commit?{' '}
            <Link to="/free-local-visibility-check/" className="font-sans" style={{ color: 'var(--charcoal)' }}>
              Get a free local visibility check
            </Link>{' '}
            first.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">FAQ</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1, maxWidth: 560 }}
          >
            Common Questions
          </h2>
          <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--silver-grey)', padding: '28px 0' }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1.4 }}>
                  {item.q}
                </h3>
                <p className="font-sans mt-3" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p
            className="font-sans mt-10"
            style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
          >
            Serving{' '}
            <Link to="/port-orange-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Port Orange</Link>,{' '}
            <Link to="/daytona-beach-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Daytona Beach</Link>,{' '}
            <Link to="/volusia-county-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Volusia County</Link>, and{' '}
            <Link to="/central-florida-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Central Florida</Link>.
            {' '}Already have a website? See{' '}
            <Link to="/website-care/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Website Care</Link>{' '}
            for ongoing upkeep, or read{' '}
            <Link to="/local-visibility-insights/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Local Visibility Insights</Link>{' '}
            for more on how customers evaluate local businesses.
          </p>
        </div>
      </section>

      <FinalCTA
        heading="Ready to Clean Up Your Local Visibility?"
        body="Tell us about your business and we'll show you where the gaps are and what to fix first."
        buttonText="Discuss Local Visibility Setup"
        buttonTo={CTA_URL}
      />
    </div>
  );
}

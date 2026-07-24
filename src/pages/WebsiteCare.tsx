import { Link } from 'react-router-dom';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import { WEBSITE_CARE_INCLUSIONS } from '@/data/serviceTerminology';

const faqs = [
  {
    q: 'What does Website Care include?',
    a: 'Website Care covers small content updates and text changes, image swaps and media updates, broken link checks and fixes, a basic monthly site review, priority email support, and light performance monitoring.',
  },
  {
    q: 'How much does Website Care cost?',
    a: 'Website Care starts at $99 a month. As with our website packages, this is a starting point — final scope can vary for larger or multi-location sites.',
  },
  {
    q: 'What isn’t included in Website Care?',
    a: 'Website Care is not unlimited redesign work, full SEO management, paid advertising, custom development, or emergency support — those are quoted separately.',
  },
  {
    q: 'When does Website Care start — right after launch, or later?',
    a: 'Every NLDS website includes a First 90 Days review right after launch. Website Care is the ongoing plan for businesses that want that same attention — updates, checks, and a monthly review — continuing after those first 90 days.',
  },
];

const serviceSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://newlvlstudio.com/website-care/#service',
  name: 'Website Care',
  serviceType: 'Website Care',
  description:
    'Ongoing website maintenance for local businesses — content updates, image swaps, broken link checks, and a monthly review.',
  provider: { '@id': 'https://newlvlstudio.com/#business' },
  areaServed: [
    'Port Orange',
    'Daytona Beach',
    'Ormond Beach',
    'New Smyrna Beach',
    'Volusia County',
    'Central Florida',
  ],
  offers: {
    '@type': 'Offer',
    price: '99',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: '99',
      priceCurrency: 'USD',
      unitText: 'MONTH',
    },
  },
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

export default function WebsiteCare() {
  return (
    <div>
      <SEO
        title="Website Care | Ongoing Website Support for Local Businesses | NLDS"
        description="Website Care keeps your site current, polished, and working after launch — content updates, image swaps, link checks, and a monthly review, starting at $99/month."
        canonical="https://newlvlstudio.com/website-care"
        jsonLd={[
          localBusinessSchema(),
          serviceSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Services', url: 'https://newlvlstudio.com/services/' },
            { name: 'Website Care', url: 'https://newlvlstudio.com/website-care/' },
          ]),
          faqSchema,
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">WEBSITE CARE</p>
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
            Keep your website sharp after launch.
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 580 }}
          >
            Most websites start strong and quietly fall behind — outdated content, broken links,
            slow load times, and a presence that no longer reflects the business. Website Care keeps
            yours current, polished, and working for you every month.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/contact/?service=website-maintenance" className="btn-primary">
              Ask About Website Care
            </Link>
            <Link to="/packages/" className="btn-secondary">View Website Packages</Link>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* What's Included + Price */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '0 0 100px' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="eyebrow">WHAT'S INCLUDED</p>
              <h2
                className="font-serif mt-4"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1 }}
              >
                Ongoing Support to Keep Your Site Sharp
              </h2>
              <p
                className="font-sans mt-5"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
              >
                Keeps your site from feeling abandoned after launch — small updates, link checks,
                content swaps, and polish handled for you every month.
              </p>
              <p
                className="font-sans mt-6"
                style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
              >
                Website Care is not unlimited redesign work, full SEO management, paid advertising,
                custom development, or emergency support unless separately quoted.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}
              >
                What Is Included
              </p>
              <ul className="mt-5 flex flex-col" style={{ gap: 12 }}>
                {WEBSITE_CARE_INCLUSIONS.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 2 }}>
                      —
                    </span>
                    <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--body-text)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                  Starting at
                </span>
                <span className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                  $99/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
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
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/contact/?service=website-maintenance" className="btn-primary">Ask About Website Care</Link>
            <Link to="/packages/" className="btn-secondary">View Packages</Link>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Ready to keep your site working as hard as you do?"
        body="Tell us about your website and we'll show you what Website Care covers for your business."
        buttonText="Ask About Website Care"
        buttonTo="/contact/?service=website-maintenance"
      />
    </div>
  );
}

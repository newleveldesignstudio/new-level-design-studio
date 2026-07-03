import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import { localBusinessSchema } from '@/components/SEO';

export interface LocalPageConfig {
  seoTitle: string;
  seoDescription: string;
  canonical: string;
  eyebrow: string;
  h1: string;
  intro: string;
  helpFix: Array<{ title: string; desc: string }>;
  trustHeading: string;
  trustBody: string;
  ctaHeading: string;
  ctaBody: string;
  faq?: Array<{ q: string; a: string }>;
}

export default function LocalLandingPage({ config }: { config: LocalPageConfig }) {
  const schemas: Record<string, unknown>[] = [localBusinessSchema()];
  if (config.faq && config.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return (
    <div>
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        canonical={config.canonical}
        jsonLd={schemas}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">{config.eyebrow}</p>
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
            {config.h1}
          </h1>
          <p
            className="font-sans mt-6"
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--muted-text)',
              maxWidth: 580,
            }}
          >
            {config.intro}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/contact" className="btn-primary">Get a Free Website Review</Link>
            <Link to="/works" className="btn-secondary">View Our Work</Link>
          </div>
          <p className="font-sans mt-5" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}>
            Need brand assets before a full website?{' '}
            <Link
              to="/starter-pack"
              style={{ color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 }}
            >
              View the $129 Visual Starter Pack →
            </Link>
          </p>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE BUILD</p>
          <h2
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: 'var(--charcoal)',
              lineHeight: 1.1,
              maxWidth: 560,
            }}
          >
            Premium websites and brand systems built for local businesses.
          </h2>
          <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {[
              {
                num: '01',
                title: 'Website Design',
                desc: 'Clean, mobile-first websites built to help local businesses look established, load fast, and make it easy for visitors to take action.',
              },
              {
                num: '02',
                title: 'Brand Direction',
                desc: 'Clear visual direction and consistent brand presentation — ensuring your website, marketing assets, and public-facing materials all reflect the same standard and communicate the same business.',
              },
              {
                num: '03',
                title: 'Brand & Content Support',
                desc: 'Supporting website copy, brand-aligned visuals, launch assets, and project-specific content scoped around the website and business goals.',
              },
              {
                num: '04',
                title: 'Website Care',
                desc: 'Ongoing website quality, visibility, and trust management — so your site stays current, polished, and working for you long after launch.',
              },
            ].map((item) => (
              <div
                key={item.num}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
                style={{ borderTop: '1px solid var(--silver-grey)', padding: '28px 0' }}
              >
                <span
                  className="font-serif shrink-0"
                  style={{ fontSize: '1.5rem', color: 'var(--silver-grey)', lineHeight: 1, minWidth: 40 }}
                >
                  {item.num}
                </span>
                <div className="flex-1">
                  <h3
                    className="font-sans font-semibold"
                    style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans mt-2"
                    style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 540 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/services" className="btn-secondary">See All Services</Link>
            <Link to="/packages" className="btn-secondary">View Packages</Link>
          </div>
        </div>
      </section>

      {/* What We Help Fix */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">COMMON ISSUES WE FIX</p>
          <h2
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              color: 'var(--charcoal)',
              lineHeight: 1.1,
              maxWidth: 560,
            }}
          >
            What Most Local Websites Get Wrong
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mt-12">
            {config.helpFix.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5"
                style={{ borderBottom: '1px solid var(--silver-grey)', padding: '24px 0' }}
              >
                <span
                  className="font-sans shrink-0"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="font-sans font-semibold"
                    style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans mt-1"
                    style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust block */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow">LOCAL FOCUS</p>
              <h2
                className="font-serif mt-4"
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                  color: 'var(--charcoal)',
                  lineHeight: 1.1,
                }}
              >
                {config.trustHeading}
              </h2>
              <p
                className="font-sans mt-6"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 480 }}
              >
                {config.trustBody}
              </p>
              <Link to="/contact" className="btn-primary mt-8 inline-block">
                Get a Free Website Review
              </Link>
            </div>

            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(28px, 3vw, 40px)',
              }}
            >
              <p className="eyebrow" style={{ marginBottom: 16 }}>What You Get</p>
              <div className="flex flex-col" style={{ gap: 0 }}>
                {[
                  'A website built for your specific market',
                  'Mobile-first design from day one',
                  'Clear service structure and calls to action',
                  'Local SEO foundation baked in',
                  'Brand visuals that stay consistent',
                  'Ongoing Website Care if you need it',
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{ borderBottom: '1px solid var(--silver-grey)', padding: '12px 0' }}
                  >
                    <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 2 }}>—</span>
                    <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--body-text)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {config.faq && config.faq.length > 0 && (
        <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
          <div className="container-nlds">
            <p className="eyebrow">FAQ</p>
            <h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                color: 'var(--charcoal)',
                lineHeight: 1.1,
                maxWidth: 560,
              }}
            >
              Common Questions
            </h2>
            <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
              {config.faq.map((item, i) => (
                <div
                  key={i}
                  style={{ borderBottom: '1px solid var(--silver-grey)', padding: '28px 0' }}
                >
                  <h3
                    className="font-sans font-semibold"
                    style={{ fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1.4 }}
                  >
                    {item.q}
                  </h3>
                  <p
                    className="font-sans mt-3"
                    style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}
                  >
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">Get a Free Website Review</Link>
              <Link to="/packages" className="btn-secondary">View Packages</Link>
            </div>
          </div>
        </section>
      )}

      <FinalCTA
        heading={config.ctaHeading}
        body={config.ctaBody}
        buttonText="Get a Free Website Review"
        buttonTo="/contact"
      />
    </div>
  );
}

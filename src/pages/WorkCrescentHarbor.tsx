import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';

const DEMO_URL = 'https://crescent-harbor-realty-nlds.netlify.app';

export default function WorkCrescentHarbor() {
  return (
    <div>
      <SEO
        title="Crescent Harbor Realty — Website Demo | NLDS"
        description="A boutique coastal real estate website demo by New Level Design Studio, built with a split-screen editorial hero, GSAP scroll animations, featured property presentation, neighborhood editorial grid, and buyer/seller advisory pathways."
        canonical="https://newlvlstudio.com/works/crescent-harbor"
        ogImage="https://newlvlstudio.com/nlds/images/crescent-harbor-realty-coastal-real-estate-website-demo-nlds.jpg"
        ogType="article"
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <Link
            to="/works"
            className="font-sans"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted-text)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ← Selected Work
          </Link>

          <div style={{ maxWidth: 760, marginTop: 32 }}>
            <p className="eyebrow">Boutique Real Estate Website Demo</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Crescent Harbor Realty
            </h1>
            <p
              className="font-sans mt-6"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 560,
              }}
            >
              A boutique coastal real estate concept built for buyers, sellers, and investors who
              expect clear guidance, elevated presentation, and local market strategy. Crescent
              Harbor Realty is an industry demo built to show what a modern real estate web
              experience can look like when design, motion, and editorial structure work together.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8" style={{ minWidth: 0 }}>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ minWidth: 0 }}
              >
                View Industry Demo →
              </a>
              <Link to="/contact" className="btn-secondary" style={{ minWidth: 0 }}>
                Discuss Your Website
              </Link>
            </div>
          </div>

          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Thumbnail */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '64px 0 0' }}>
        <div className="container-nlds">
          <img
            src="/nlds/images/crescent-harbor-realty-coastal-real-estate-website-demo-nlds.jpg"
            alt="Crescent Harbor Realty coastal real estate website demo by New Level Design Studio"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              border: '1px solid var(--border-color)',
            }}
          />
        </div>
      </section>

      {/* Case Study Body */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0 120px' }}>
        <div className="container-nlds">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20"
            style={{ maxWidth: 1040 }}
          >
            {/* Left: sidebar meta */}
            <div className="lg:col-span-4">
              <div style={{ position: 'sticky', top: 120 }}>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Category</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                  >
                    Boutique Real Estate Website
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Market Focus</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.65 }}
                  >
                    Waterfront Homes<br />
                    Coastal Estates<br />
                    Marina Properties<br />
                    Private Representation
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Deliverables</p>
                  <ul
                    className="font-sans"
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--charcoal)',
                      lineHeight: 1.7,
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {[
                      'Editorial split-screen hero',
                      'GSAP scroll animation system',
                      'Featured property horizontal scroll',
                      'Neighborhood editorial grid',
                      'Sell & Buy tab advisory section',
                      'Our Method trust section',
                      'Contact / consultation flow',
                      'Brand token design system',
                      'Mobile-first responsive layout',
                    ].map((item) => (
                      <li key={item} style={{ color: 'var(--muted-text)' }}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ display: 'block', width: '100%', textAlign: 'center' }}
                  >
                    View Industry Demo →
                  </a>
                  <Link
                    to="/contact"
                    className="btn-secondary"
                    style={{ display: 'block', width: '100%', textAlign: 'center' }}
                  >
                    Discuss Your Website
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: editorial content */}
            <div className="lg:col-span-8">
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Overview</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Crescent Harbor Realty is a boutique coastal real estate concept built for buyers,
                  sellers, and investors who expect clear guidance, elevated property presentation,
                  and a local market strategy that works in their favor. The project called for a
                  single-page experience with genuine scroll motion, editorial section design, and
                  a visual system that earns trust before any conversation begins.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Problem</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Most coastal real estate websites feel like repainted MLS portals — property cards
                  with no hierarchy, no motion, no editorial presence, and no clear sense of who the
                  agency is or what makes them worth a conversation. Buyers and sellers increasingly
                  judge representation by the quality of the digital experience before the first
                  showing. Generic templates fail that test before the page even loads.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Direction</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  New Level Design Studio built a single-page real estate experience centered on
                  editorial quality and GSAP-powered scroll motion. Each section has a distinct
                  design language: a split-screen hero with entrance animations, a horizontally
                  pinned featured property strip, a 12-column neighborhood editorial grid, a tabbed
                  sell/buy advisory layout with sticky lifestyle photography, and a five-step
                  consultation methodology section. The result feels like a brand publication, not a
                  listing site.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Design Direction</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                    marginBottom: 24,
                  }}
                >
                  The visual system uses a coastal-specific token palette — porcelain backgrounds,
                  atlantic blue accents, deep-tide headlines, and sea-glass section breaks.
                  Typography pairs Fraunces variable serif for editorial presence with Figtree
                  sans-serif for clarity and warmth.
                </p>
                <ul
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {[
                    'Porcelain / sea-glass / atlantic blue coastal palette — brand-specific CSS tokens',
                    'Fraunces variable serif — editorial headlines with italic range',
                    'Figtree sans-serif — warm, readable body and UI type',
                    'Split-screen hero: 52% editorial copy, 48% architectural photography',
                    'Dark gradient scrims on all full-bleed photo panels for legibility',
                    'Per-property accent palette for Featured card identity',
                    'Featured card horizontal pin scroll with GSAP ScrollTrigger',
                    'Neighborhood 12-column editorial grid with featured card spanning 2 rows',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Key Features</p>
                <ul
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {[
                    'GSAP entrance animations: eyebrow → headline → body → CTA stagger on load',
                    'GSAP parallax: left content scrolls -40px, hero image scales 1.05× on scroll',
                    'Horizontal pin scroll for five featured property cards',
                    'Neighborhood editorial grid: CSS Grid 12-column, first card spans 6col×2row',
                    'Sell/Buy ARIA tablist with per-tab GSAP re-entrance animation',
                    'Sticky lifestyle photo panel with scrim and label overlay',
                    'Our Method section: five-step numbered process with scroll stagger',
                    'Trust section: agent profile cards and client testimonials',
                    'Contact section with consultation form and 555 fictional phone',
                    'Footer with strong demo disclaimer and NLDS attribution',
                    'noindex/nofollow meta + robots.txt — not indexed by search engines',
                    'React + Vite + TypeScript — clean modern build',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Outcome</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  The final demo gives New Level Design Studio a real estate portfolio example that
                  demonstrates how GSAP motion, editorial section design, and coastal brand identity
                  can combine into a single-page experience that feels premium without being
                  overwrought. It shows local real estate professionals what a web presence built
                  for trust, clarity, and conversion actually looks like in practice.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Why This Matters</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  In coastal real estate, first impressions happen online — not at the showing.
                  A website that reads like a template suggests the representation will feel like a
                  template. By combining genuine scroll motion, editorial structure, and a
                  market-specific visual identity, Crescent Harbor demonstrates how a boutique
                  agency can present itself at the same caliber as the properties it represents —
                  before a single conversation happens.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans"
                  style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--charcoal)',
                    paddingBottom: 2,
                    display: 'inline-block',
                  }}
                >
                  View Industry Demo →
                </a>
                <Link
                  to="/contact"
                  className="font-sans"
                  style={{
                    fontSize: '0.8125rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-text)',
                    textDecoration: 'none',
                    borderBottom: '1px solid var(--muted-text)',
                    paddingBottom: 2,
                    display: 'inline-block',
                  }}
                >
                  Discuss Your Website →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

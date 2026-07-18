import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import RelatedProjects from '@/components/RelatedProjects';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

const DEMO_URL = 'https://liquid-legacy-pools-nlds.netlify.app';

export default function WorkLiquidLegacyPools() {
  return (
    <div>
      <SEO
        title="Liquid Legacy Pools — Luxury Pool Website Concept | NLDS"
        description="A premium pool design and construction website concept created to show how high-ticket outdoor-living businesses can present craftsmanship, finished work, and a clear consultation path with resort-level polish."
        canonical="https://newlvlstudio.com/works/liquid-legacy-pools"
        ogImage="https://newlvlstudio.com/nlds/images/liquid-legacy-pools-luxury-pool-website-concept-nlds.png"
        ogType="article"
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <Link
            to="/works/"
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
            <p className="eyebrow">Pool Design & Construction Website · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Liquid Legacy Pools
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
              A premium pool design and construction website concept created by New Level Design
              Studio to show how a high-ticket outdoor-living business can present craftsmanship,
              finished work, and a clear consultation path with the polish its projects deserve.
            </p>

            <ConceptDisclosure />

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Concept Website
              </a>
              <Link to="/contact/" className="btn-secondary">
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
            src="/nlds/images/liquid-legacy-pools-luxury-pool-website-concept-nlds.webp"
            alt="Liquid Legacy Pools luxury pool design and construction website concept"
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
                    Pool Design & Construction Website
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
                      'Website concept',
                      'Full-bleed photographic hero',
                      'Editorial project gallery',
                      'Project detail pages with specs',
                      'Process page',
                      'Mobile-responsive layout',
                      'Live Netlify demo',
                    ].map((item) => (
                      <li key={item} style={{ color: 'var(--muted-text)' }}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24 }}>
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ display: 'inline-block' }}
                  >
                    View Concept Website
                  </a>
                </div>
              </div>
            </div>

            {/* Right: editorial content */}
            <div className="lg:col-span-8">
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Overview</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  Liquid Legacy Pools is a concept case study created by New Level Design Studio to
                  explore what a luxury pool design-build company's website could look like at the
                  high end of the outdoor-living market — cinematic photography, an editorial
                  project gallery, and a scroll-driven motion system built to match the scale of a
                  six-figure pool project.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Problem</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  Premium pool builders sell six-figure outdoor environments, but most of their
                  websites still read like a general contractor's — stock photography, generic
                  service cards, no sense of the craftsmanship or scale of the finished work.
                  Homeowners researching a project this size expect the site to feel as considered
                  as the pool itself.
                </p>
              </div>

              <WorkDemonstrates
                points={[
                  'A cinematic, editorial presentation built for six-figure project budgets.',
                  'A project gallery structured around individual case studies — location, investment range, timeline, materials.',
                  'A scroll-driven motion system that reads as resort-level as the finished pools.',
                ]}
              />

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Direction</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  The concept uses a full-bleed photographic hero, a project slider with individual
                  case-study pages for each build, and considered scroll pacing modeled on
                  high-end hospitality and landscape sites. Every project page carries its own
                  investment range, timeline, and materials list, so the level of craftsmanship is
                  communicated before a homeowner ever picks up the phone.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Design Focus</p>
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
                    'Full-bleed photographic hero with editorial typography',
                    'Project gallery with individual case-study pages',
                    'Investment range, timeline, and materials per project',
                    'Scroll-driven motion system',
                    'Mobile-first responsive layout',
                    'Premium, resort-inspired visual system',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Website Goals</p>
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
                    'Help prospective clients gauge project scale and investment quickly',
                    'Present finished work with the same polish as the pools themselves',
                    'Make requesting a consultation feel like the natural next step',
                    'Support local discovery for a high-ticket, considered-purchase service',
                    'Drive consultation requests, not just browsing',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32 }}>
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
                  }}
                >
                  View Concept Website at liquid-legacy-pools-nlds.netlify.app →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProjects currentSlug="liquid-legacy-pools" />

      <FinalCTA
        heading="Want This for Your Business?"
        body="New Level Design Studio builds websites for local service businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Discuss Your Website"
        buttonTo="/contact/"
      />
    </div>
  );
}

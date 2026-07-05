import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

const DEMO_URL = 'https://lotus-beauty-house-nlds.netlify.app';

const eyebrowStyle = { marginBottom: 16 } as const;
const bodyStyle = {
  fontSize: '1.0625rem',
  lineHeight: 1.75,
  color: 'var(--muted-text)',
} as const;
const sectionStyle = {
  borderTop: '1px solid var(--border-color)',
  paddingTop: 32,
  marginBottom: 48,
} as const;
const listStyle = {
  fontSize: '1.0625rem',
  lineHeight: 1.75,
  color: 'var(--muted-text)',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 12,
};

export default function WorkLotusBeautyHouse() {
  return (
    <div>
      <SEO
        title="Lotus Beauty House Website Concept | New Level Design Studio"
        description="A premium hair and nail salon website concept by New Level Design Studio, built to show how local beauty businesses can create a stronger first impression online."
        canonical="https://newlvlstudio.com/works/lotus-beauty-house"
        ogImage="https://newlvlstudio.com/nlds/images/lotus-beauty-house-salon-website-concept-nlds.jpg"
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
            <p className="eyebrow">Hair & Nail Salon Website Concept · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Lotus Beauty House
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
              A premium editorial website concept for a local hair and nail studio, designed to feel
              polished, calm, and easy to act on.
            </p>

            <ConceptDisclosure />

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Concept
              </a>
              <Link to="/contact" className="btn-secondary">
                Start a Website Project
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
            src="/nlds/images/lotus-beauty-house-salon-website-concept-nlds.jpg"
            alt="Lotus Beauty House hair and nail salon website concept"
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
                    Hair & Nail Salon Website
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Location / Market</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                  >
                    Port Orange, FL
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
                      'Editorial hero section',
                      'Service cards for hair and nails',
                      'Specialist-focused section',
                      'Color-supported gallery',
                      'Review section',
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
                    View Concept
                  </a>
                </div>
              </div>
            </div>

            {/* Right: editorial content */}
            <div className="lg:col-span-8">
              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>Overview</p>
                <p className="font-sans" style={bodyStyle}>
                  Lotus Beauty House is a premium hair and nail salon website concept created by New
                  Level Design Studio to show how a local beauty business can turn services, trust,
                  reviews, and booking information into a polished online presence.
                </p>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>The Challenge</p>
                <p className="font-sans" style={bodyStyle}>
                  Local salons often rely heavily on Google, Facebook, word-of-mouth, and scattered
                  photos. That can work, but it does not always give new clients one clear place to
                  understand the services, trust the experience, and know how to book.
                </p>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>The Direction</p>
                <p className="font-sans" style={bodyStyle}>
                  We created a premium editorial salon concept with a calm visual system, clear
                  service structure, mobile-first booking flow, review-ready trust sections, and a
                  stronger first impression for beauty clients.
                </p>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>What the Site Includes</p>
                <ul className="font-sans" style={listStyle}>
                  {[
                    'Editorial hero section',
                    'Service cards for hair and nails',
                    'Specialist-focused section',
                    'Color-supported gallery',
                    'Review/testimonial section',
                    'Contact and booking area',
                    'Premium static location card',
                    'Mobile-friendly navigation',
                    'Clear booking CTAs',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>Design System</p>
                <p className="font-sans" style={{ ...bodyStyle, marginBottom: 16 }}>
                  Direction A: Premium Editorial Salon — paired Instrument Serif with Manrope across a
                  warm ivory, blush, muted rose, espresso, and plum-brown palette, with restrained
                  champagne accents used sparingly.
                </p>
                <p className="font-sans" style={bodyStyle}>
                  No neon, glitter, cartoon beauty icons, or cheap salon-template styling.
                </p>
              </div>

              <WorkDemonstrates
                points={[
                  'A calmer, more premium first impression for a local hair and nail studio.',
                  'A clear service structure that separates hair and nail offerings without clutter.',
                  'A mobile-first booking flow and review-ready trust sections built to convert.',
                ]}
              />

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>Best Fit</p>
                <p className="font-sans" style={{ ...bodyStyle, marginBottom: 16 }}>
                  This concept is designed for:
                </p>
                <ul className="font-sans" style={listStyle}>
                  {[
                    'Hair salons',
                    'Nail salons',
                    'Lash studios',
                    'Brow studios',
                    'Beauty bars',
                    'Med-spa-adjacent local businesses',
                    'Independent stylists ready for a stronger online presence',
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
                  View Concept at lotus-beauty-house-nlds.netlify.app →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Want This for Your Salon?"
        body="New Level Design Studio builds websites for local hair and nail salons across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Start a Website Project"
        buttonTo="/contact"
      />
    </div>
  );
}

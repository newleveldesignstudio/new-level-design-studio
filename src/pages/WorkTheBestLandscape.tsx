import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import ConceptDisclosure from '@/components/ConceptDisclosure';

const DEMO_URL = 'https://the-best-landscape-2026.netlify.app/';

export default function WorkTheBestLandscape() {
  return (
    <div>
      <SEO
        title="The Best Landscape — Landscaping Website Concept | NLDS"
        description="A premium landscaping website concept designed to improve first impressions, service clarity, local trust, and customer inquiries."
        canonical="https://newlvlstudio.com/works/the-best-landscape-2026"
        ogImage="https://newlvlstudio.com/nlds/images/the-best-landscape-2026-landscaping-website-concept-nlds.jpg"
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
            <p className="eyebrow">Landscaping Website · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              The Best Landscape 2026
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
              A premium landscaping website concept created by New Level Design Studio to show how a
              local landscaping business can present its services more clearly, look more credible
              online, and make it easier for potential customers to request work.
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
              <Link to="/contact" className="btn-secondary">
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
            src="/nlds/images/the-best-landscape-2026-landscaping-website-concept-nlds.jpg"
            alt="The Best Landscape landscaping website concept"
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
                    Landscaping Website
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
                      'Landscaping landing page',
                      'Mobile-responsive layout',
                      'Service presentation',
                      'Local business positioning',
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
                  The Best Landscape 2026 is a concept case study created by New Level Design Studio
                  to show how a local landscaping business can create trust quickly, explain services
                  clearly, and make the next customer action obvious. The concept explores a premium
                  website direction built around credibility and inquiry generation.
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
                  Many landscaping websites feel generic, outdated, or unclear. Potential customers
                  want to understand services, service areas, project quality, and contact options
                  before reaching out. Most existing sites fail to answer those questions quickly or
                  confidently.
                </p>
              </div>

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
                  The concept uses a clean local-service layout, strong visual hierarchy, clear
                  service framing, and mobile-first conversion paths built around trust and inquiry
                  generation. Every section is designed to reduce friction and move the visitor
                  toward contact.
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
                    'Strong first impression',
                    'Clear service presentation',
                    'Local business credibility',
                    'Mobile-first browsing',
                    'Easy quote and request path',
                    'Trust-focused visual hierarchy',
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
                    'Help visitors understand the business quickly',
                    'Make services easy to scan',
                    'Build confidence before contact',
                    'Support local discovery',
                    'Drive quote requests, calls, or contact form submissions',
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
                  View Concept Website at the-best-landscape-2026.netlify.app →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Want This for Your Business?"
        body="New Level Design Studio builds websites for local service businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

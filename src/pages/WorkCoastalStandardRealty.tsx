import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import RelatedProjects from '@/components/RelatedProjects';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

const DEMO_URL = 'https://coastal-standard-realty-nlds.netlify.app';

export default function WorkCoastalStandardRealty() {
  return (
    <div>
      <SEO
        title="Coastal Standard Realty — Website Demo | NLDS"
        description="A luxury coastal real estate website demo by New Level Design Studio, built with editorial design, property presentation, buyer and seller pathways, and local market-area structure."
        canonical="https://newlvlstudio.com/works/coastal-standard-realty"
        ogImage="https://newlvlstudio.com/nlds/images/coastal-standard-realty-luxury-coastal-real-estate-website-demo-nlds.jpg"
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
            <p className="eyebrow">Luxury Real Estate Website · Industry Demo</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Coastal Standard Realty
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
              A luxury coastal real estate website built for private-client confidence. Coastal
              Standard Realty is a boutique real estate concept designed for distinctive coastal
              homes, waterfront properties, and high-trust buyer and seller representation across
              Florida's Atlantic coast.
            </p>

            <ConceptDisclosure />

            <div className="flex flex-wrap items-center gap-4 mt-8" style={{ minWidth: 0 }}>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ minWidth: 0 }}
              >
                View Concept Website →
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
            src="/nlds/images/coastal-standard-realty-luxury-coastal-real-estate-website-demo-nlds.jpg"
            alt="Coastal Standard Realty real estate website concept"
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
                    Luxury Real Estate Website
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Location Focus</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.65 }}
                  >
                    New Smyrna Beach<br />
                    Port Orange<br />
                    Daytona Beach Shores<br />
                    Palm Coast
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
                      'Luxury real estate website concept',
                      'Homepage system',
                      'Featured property layout',
                      'Property index page',
                      'Seller advisory page',
                      'Buyer representation page',
                      'About page',
                      'Contact / private consultation page',
                      'Local market-area structure',
                      'Editorial visual direction',
                      'Mobile-responsive layout',
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
                    View Concept Website →
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
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  Coastal Standard Realty is a boutique real estate concept representing luxury
                  coastal homes, waterfront properties, and private residential moves along
                  Florida's Atlantic coast. The project called for a digital presence that matched
                  the caliber of the homes being represented — calm, editorial, advisory-grade, and
                  built to earn trust before the first conversation.
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
                  Luxury real estate clients do not respond to generic property websites. They need
                  a digital experience that feels curated, calm, and credible — aligned with the
                  value of the homes being represented. The challenge was to create a real estate
                  site that felt more like a private advisory firm than a standard listing template,
                  without relying on flashy design that would undermine the quiet confidence the
                  brand requires.
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
                  New Level Design Studio created a premium editorial website system with refined
                  typography, image-led property presentation, clear buyer and seller pathways,
                  market-area structure, and a private consultation flow. The site was designed to
                  support both visual trust and conversion clarity without feeling loud or overbuilt.
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
                  The visual system uses warm ivory backgrounds, deep charcoal typography, muted
                  coastal tones, refined serif headlines, and a floating dark editorial navigation
                  treatment. The overall direction is calm, premium, and advisory-focused rather
                  than generic real estate template design.
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
                    'Warm ivory / coastal stone color palette — not white, not blue',
                    'Large editorial serif headlines for property names and section titles',
                    'Floating dark pill navigation — readable on every page background',
                    'Full-width hero property layout with overlay metadata',
                    'Hairline rule editorial structure for market areas and process steps',
                    'Restrained property card system with real coastal photography',
                    'Split-layout hero pairing editorial copy with architectural imagery',
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
                    'Editorial luxury homepage with curated property presentation',
                    'Featured property hero layout with pricing and spec overlay',
                    'Dedicated buyer and seller advisory pathways',
                    'Six-area market coverage with editorial index structure',
                    'Five-step private consultation and closing process',
                    'Private consultation CTA system across all pages',
                    'Refined typography and real coastal photography hierarchy',
                    'Mobile-first responsive structure — no horizontal scroll',
                    'Static Next.js build — fast load, clean architecture',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Outcome</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  The final demo gives New Level Design Studio a premium real estate portfolio
                  example that shows how a local business website can be elevated into a high-end
                  brand experience with stronger positioning, visual trust, and clearer conversion
                  paths. It demonstrates what is possible for coastal real estate clients along
                  Florida's Atlantic coast who want a website that reflects the quality of the
                  homes they represent.
                </p>
              </div>

              <WorkDemonstrates
                points={[
                  'A private, considered first impression instead of a generic listing template.',
                  'Clear buyer and seller pathways that guide visitors toward a consultation.',
                  'A market-area structure that communicates competence before the first call.',
                ]}
              />

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
                  View Concept Website →
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
                  Need a website that feels more established? Start a project →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProjects currentSlug="coastal-standard-realty" />

      <FinalCTA
        heading="Need a Website That Feels More Established?"
        body="New Level Design Studio builds premium websites for real estate groups, professional services, and local businesses across Volusia County and the Florida coast."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

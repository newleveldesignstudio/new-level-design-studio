import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

export default function WorkAurelineEstates() {
  return (
    <div>
      <SEO
        title="Aureline Estates Website Concept | New Level Design Studio"
        description="A luxury coastal real estate website concept by New Level Design Studio, created to showcase refined branding, premium property presentation, and elevated digital trust."
        canonical="https://newlvlstudio.com/works/aureline-estates"
        ogImage="https://newlvlstudio.com/nlds/images/aureline-estates-luxury-real-estate-website-concept-nlds.png"
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
            <p className="eyebrow">Luxury Real Estate Website · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Aureline Estates
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
              A boutique luxury real estate website concept for Florida's Atlantic coastal market.
              Aureline Estates was built to show how a high-end brokerage can present itself with
              editorial confidence — a 4K video hero, curated property collection, private
              consultation flow, and full multi-page architecture across six coastal markets.
            </p>

            <ConceptDisclosure />

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="https://harmonious-sorbet-38230a.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Concept Website →
              </a>
              <a href="#case-study" className="btn-secondary">
                View Case Study →
              </a>
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
            src="/nlds/images/aureline-estates-luxury-real-estate-website-concept-nlds.webp"
            srcSet="/nlds/images/aureline-estates-luxury-real-estate-website-concept-nlds-w768.webp 768w, /nlds/images/aureline-estates-luxury-real-estate-website-concept-nlds.webp 1280w"
            sizes="(max-width: 768px) 100vw, 1200px"
            width={1280}
            height={6505}
            decoding="async"
            alt="Aureline Estates real estate website concept"
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
      <section id="case-study" style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0 120px' }}>
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
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>
                    Luxury Real Estate Website
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Market Focus</p>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.65 }}>
                    Port Orange<br />
                    Daytona Beach<br />
                    Ponce Inlet<br />
                    New Smyrna Beach<br />
                    Ormond Beach<br />
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
                      '4K video hero with scroll parallax',
                      'Full multi-page site architecture',
                      'Property collection with filter system',
                      'Individual property detail pages',
                      'Buyer and seller advisory pages',
                      'Six-market coverage structure',
                      'About page with principal profiles',
                      'Calendly consultation flow',
                      'Contact and inquiry page',
                      'Mobile-first responsive build',
                      'Local image asset system',
                      'SEO-structured page titles',
                    ].map((item) => (
                      <li key={item} style={{ color: 'var(--muted-text)' }}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Concept Website</p>
                  <a
                    href="https://harmonious-sorbet-38230a.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--charcoal)',
                      textDecoration: 'none',
                      borderBottom: '1px solid var(--border-color)',
                      paddingBottom: 2,
                    }}
                  >
                    aurelineestates.netlify.app →
                  </a>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24 }}>
                  <Link to="/contact" className="btn-primary" style={{ display: 'inline-block' }}>
                    Discuss Your Website
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: editorial content */}
            <div className="lg:col-span-8">
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Overview</p>
                <p className="font-sans" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}>
                  Aureline Estates is a boutique luxury real estate website concept representing
                  private coastal homes, waterfront properties, and high-trust buyer and seller
                  representation across Florida's Atlantic coast. The concept was built to
                  demonstrate what a luxury real estate brokerage website can look and feel like
                  when the design genuinely matches the caliber of the homes being sold — calm,
                  editorial, and built to earn trust before the first conversation.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Problem</p>
                <p className="font-sans" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}>
                  Most local real estate websites — even those representing high-value properties —
                  feel like templates. They default to stock photography, aggressive CTAs, and
                  generic color palettes that undermine the quiet confidence luxury buyers expect.
                  The opportunity was to build something that felt like a private advisory firm:
                  restrained, editorial, and architecturally precise.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Direction</p>
                <p className="font-sans" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}>
                  New Level Design Studio built a full multi-page React/Vite site with a 4K
                  autoplay video hero, scroll-triggered parallax scale effect, a curated
                  six-property collection with filter and detail pages, buyer and seller advisory
                  sections, a six-market area structure, principal profiles, and a Calendly-powered
                  private consultation flow — all backed by a verified local image asset system and
                  mobile-first responsive layout.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Design Direction</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)', marginBottom: 24 }}
                >
                  The visual system uses warm ivory backgrounds, deep navy and charcoal typography,
                  a bronze accent system, and Rajdhani display headlines. Every section breathes
                  — generous padding, restrained card layouts, and hairline rule editorial
                  structure communicate premium quality without shouting.
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
                    'Ivory / navy / bronze color system — no generic real estate blue',
                    'Rajdhani display font — geometric, refined, distinctive',
                    'Floating pill navigation with scroll-aware glass effect',
                    '4K video hero with Framer Motion scroll scale — no static poster flash',
                    'Double-bezel card architecture for all property cards',
                    'Hairline rule editorial structure throughout all sections',
                    'Full local image asset system — 19 verified coastal property photos',
                    'Ocean terrace CTA section with soft navy overlay — no abstract objects',
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
                    '4K autoplay video hero with scroll parallax and ivory text overlay',
                    'Six-property curated collection with filter by coastal market',
                    'Individual property detail pages with gallery, specs, and neighborhood copy',
                    'Buyer and seller advisory pages with process steps',
                    'Six-market coverage structure — Port Orange to Palm Coast',
                    'About page with principal portraits and editorial philosophy section',
                    'Calendly private consultation modal integrated site-wide',
                    'Fully verified local image system — no remote URL dependencies',
                    'Mobile-first layout — no text over video on mobile',
                    'Clean React/Vite build — fast, no CMS dependency',
                    'SEO title and meta structure for each page',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Outcome</p>
                <p className="font-sans" style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}>
                  Aureline Estates gives New Level Design Studio a premium real estate portfolio
                  example that demonstrates what is possible when luxury real estate clients invest
                  in a website that reflects the quality of the homes they represent. The full
                  multi-page architecture, 4K video hero, local property photography, and
                  consultation-first structure show how editorial web design can replace
                  template-driven real estate websites across Florida's coastal market.
                </p>
              </div>

              <WorkDemonstrates
                points={[
                  'A calmer, more confident first impression for luxury coastal buyers and sellers.',
                  'How a boutique brokerage can read as established rather than templated.',
                  'A path built to build trust with high-intent buyers before the first conversation.',
                ]}
              />

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32 }}>
                <Link
                  to="/contact"
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
                  Need a website that reflects the quality of what you offer? Start a project →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Need a Website That Feels More Established?"
        body="New Level Design Studio builds premium websites for real estate groups, professional services, and local businesses across Volusia County and the Florida coast."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

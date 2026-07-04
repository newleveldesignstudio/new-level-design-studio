import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

const DEMO_URL = 'https://stone-timber-remodeling-14f1e213.netlify.app';

export default function WorkStoneTimberRemodeling() {
  return (
    <div>
      <SEO
        title="Stone & Timber Remodeling Website Concept | New Level Design Studio"
        description="Explore a cinematic contractor website concept featuring responsive video, scroll-driven storytelling, premium project presentation, and an accessible consultation flow."
        canonical="https://newlvlstudio.com/works/stone-timber-remodeling"
        ogImage="https://newlvlstudio.com/nlds/images/stone-timber-remodeling-cinematic-contractor-website-concept-nlds.jpg"
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
            <p className="eyebrow">Contractor Website · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Stone &amp; Timber Remodeling
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
              A premium contractor concept designed to feel more like an architectural experience
              than a conventional construction website. Full-screen video, scroll-driven
              storytelling, and a structured consultation flow built for Central Florida.
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

      {/* Hero screenshot */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '64px 0 0' }}>
        <div className="container-nlds">
          <img
            src="/nlds/images/st-cs-01-hero.webp"
            alt="Stone & Timber Remodeling cinematic full-screen video hero"
            loading="eager"
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
                    Contractor Website · Cinematic Experience
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Project Type</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.65 }}
                  >
                    Concept Build<br />
                    Fictional brand<br />
                    Demo metrics<br />
                    Stock media
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
                      'Full-screen responsive video hero',
                      'Fixed transparent navigation',
                      'Scroll-controlled hero transition',
                      'Pinned horizontal narrative (desktop)',
                      'Plan · Build · Deliver sequence',
                      'Vertical narrative fallback (mobile)',
                      'Slot-machine metric animation',
                      'Editorial featured-project section',
                      'Multi-step consultation form',
                      'Cinematic closing footer',
                      'Reduced-motion accessibility',
                      'Responsive WebM/MP4 handling',
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
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Stone &amp; Timber Remodeling was developed as a high-end contractor concept for
                  Central Florida. The goal was to move beyond the standard contractor-template
                  format and create a cinematic, scroll-led experience built around construction,
                  material detail, and project confidence. This is a fictional portfolio concept —
                  not a real client engagement.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Challenge</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Most contractor websites rely on predictable hero sections, service cards, stock
                  imagery, and generic calls to action. The challenge was to create a website that
                  could communicate craftsmanship, project control, and premium positioning before a
                  visitor read every detail.
                </p>
              </div>

              <WorkDemonstrates
                points={[
                  'A stronger first impression for contractors who want to look established, not templated.',
                  'Scroll-driven storytelling used in place of a static service-card layout.',
                  'A structured, multi-step consultation flow that makes requesting an estimate feel considered.',
                ]}
              />

              {/* Plan scene screenshot */}
              <div style={{ marginBottom: 48 }}>
                <img
                  src="/nlds/images/st-cs-02-plan-scene.webp"
                  alt="Stone & Timber Remodeling — Plan scene in pinned horizontal narrative"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                  }}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Approach</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                    marginBottom: 24,
                  }}
                >
                  The site is structured around a single scrollable journey rather than separate
                  pages — each section transitions with intent.
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
                    'Full-screen responsive video hero with WebM/MP4 and poster fallback',
                    'Large restrained typography over full-bleed construction media',
                    'Fixed transparent navigation that reads cleanly over dark video',
                    'Scroll-controlled hero transition from video into narrative',
                    'Pinned horizontal narrative on desktop — Plan, Build, and Deliver scenes progress as the user scrolls',
                    'Vertical narrative fallback on tablet and mobile with full scene visibility',
                    'Slot-machine metric animation on key project statistics',
                    'Editorial featured-project presentation with full-bleed photography',
                    'Multi-step consultation form with validation',
                    'Cinematic closing footer with full-width construction imagery',
                    'Reduced-motion and prefers-reduced-motion accessibility handling',
                    'Responsive poster images for every video segment',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              {/* Build + Deliver scenes */}
              <div style={{ marginBottom: 16 }}>
                <img
                  src="/nlds/images/st-cs-03-build-scene.webp"
                  alt="Stone & Timber Remodeling — Build scene in pinned horizontal narrative"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                    marginBottom: 16,
                  }}
                />
                <img
                  src="/nlds/images/st-cs-04-deliver-scene.webp"
                  alt="Stone & Timber Remodeling — Deliver scene in pinned horizontal narrative"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                  }}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48, marginTop: 48 }}>
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
                  Dark Architectural with Material Editorial relief. The visual system moves between
                  two registers — cinematic and editorial — to hold attention across a long scroll.
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
                    'Deep charcoal surfaces in full-bleed video and narrative sections',
                    'Warm plaster and limestone sections providing editorial contrast and readability',
                    'Restrained copper accents as the primary brand tone',
                    'Satoshi Variable — geometric sans at display and body weight throughout',
                    'Construction and material-focused imagery at every section break',
                    'Deliberate contrast between cinematic dark scenes and warm editorial content',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              {/* Metrics screenshot */}
              <div style={{ marginBottom: 48 }}>
                <img
                  src="/nlds/images/st-cs-05-metrics.webp"
                  alt="Stone & Timber Remodeling — slot-machine metric animation section"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                  }}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Motion System</p>
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
                    'GSAP — core animation engine throughout',
                    'ScrollTrigger — scroll-scrubbed media transforms and section pin control',
                    'SplitText — headline reveal animations and character-level entrance timing',
                    'Lenis — smooth scroll implementation with consistent scrub behavior',
                    'Scroll-scrubbed media transforms — video and image scale, opacity, and position driven by scroll position',
                    'Desktop pin distance — narrative section pinned for full Plan · Build · Deliver progression',
                    'Scene-to-scene media progression — each scroll scene transitions to the next via scrubbed opacity and transform',
                    'Mobile fallback — full vertical narrative sequence without pin scroll',
                    'Reduced-motion fallback — all GSAP instances respect prefers-reduced-motion',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              {/* Featured project + consultation */}
              <div style={{ marginBottom: 16 }}>
                <img
                  src="/nlds/images/st-cs-06-featured-project.webp"
                  alt="Stone & Timber Remodeling — editorial featured project section"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                    marginBottom: 16,
                  }}
                />
                <img
                  src="/nlds/images/st-cs-07-consultation.webp"
                  alt="Stone & Timber Remodeling — multi-step consultation form"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                  }}
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48, marginTop: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Technical Implementation</p>
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
                    'React 19 · TypeScript 5.9 · Vite 7',
                    'GSAP 3.15 — ScrollTrigger and SplitText plugins',
                    'Lenis 1.3 — smooth scroll with consistent scrub behavior',
                    'React Hook Form 7.8 · Zod 4.4 — multi-step consultation form validation',
                    'Netlify Forms — zero-backend form submission handling',
                    'Responsive WebM/MP4 — video served with format fallback and poster image per breakpoint',
                    'Responsive image srcset — scene photography loaded at appropriate resolution per viewport',
                    'Accessibility-conscious motion handling — all animations respect prefers-reduced-motion',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              {/* Footer + mobile screenshots */}
              <div style={{ marginBottom: 48 }}>
                <img
                  src="/nlds/images/st-cs-08-footer.webp"
                  alt="Stone & Timber Remodeling — cinematic closing footer"
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    border: '1px solid var(--border-color)',
                    marginBottom: 16,
                  }}
                />
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <img
                    src="/nlds/images/st-cs-09-mobile-hero.webp"
                    alt="Stone & Timber Remodeling — mobile hero view"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                  <img
                    src="/nlds/images/st-cs-10-mobile-narrative.webp"
                    alt="Stone & Timber Remodeling — mobile narrative sequence"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      border: '1px solid var(--border-color)',
                    }}
                  />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Outcome</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  The final concept demonstrates how a contractor website can move beyond a
                  conventional brochure layout and use cinematic media, scroll choreography, and a
                  structured consultation flow to create a stronger premium impression.
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

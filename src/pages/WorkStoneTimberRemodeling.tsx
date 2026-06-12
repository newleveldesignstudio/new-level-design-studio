import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';

const DEMO_URL = 'https://stone-timber-remodeling.netlify.app';

export default function WorkStoneTimberRemodeling() {
  return (
    <div>
      <SEO
        title="Stone & Timber Remodeling — Case Study | NLDS"
        description="A premium construction remodeling website concept by New Level Design Studio, showing how a local contractor can present services, project proof, service-area SEO, and estimate requests with a stronger first impression."
        canonical="https://newlvlstudio.com/works/stone-timber-remodeling"
        ogImage="https://newlvlstudio.com/nlds/images/stone-timber-remodeling-construction-remodeling-website-concept-nlds.jpg"
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
            <p className="eyebrow">Case Study</p>
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
              A premium construction remodeling website concept built to show how a local
              contractor can present services, project proof, service-area SEO, and estimate
              requests with a stronger first impression.
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
            src="/nlds/images/stone-timber-remodeling-construction-remodeling-website-concept-nlds.jpg"
            alt="Stone & Timber Remodeling construction remodeling website concept"
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
                    Construction Remodeling Website Concept
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Location Focus</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.65 }}
                  >
                    Port Orange<br />
                    New Smyrna Beach<br />
                    Ormond Beach<br />
                    Volusia County
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
                      'Local SEO landing page structure',
                      'Image-led hero with parallax',
                      'Before/after comparison slider',
                      'Editorial service sections',
                      'Featured project storytelling',
                      'Project gallery',
                      'Service-area structure',
                      'Reviews placeholder system',
                      'Estimate request flow',
                      'Mobile estimate bar',
                      'Scroll motion system',
                    ].map((item) => (
                      <li key={item} style={{ color: 'var(--muted-text)' }}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24 }}>
                  <Link
                    to="/contact"
                    className="btn-primary"
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
                  Stone &amp; Timber Remodeling is an industry demo for the construction remodeling
                  space. The concept models a licensed local remodeler serving Port Orange and
                  Volusia County, and was built to answer one question: what does a contractor
                  website look like when it is designed to win the homeowner's trust in the first
                  two seconds?
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
                  Most local remodeling websites look interchangeable: a stock template, a wall of
                  text, tiny service cards, and no real project proof. Homeowners comparing three
                  contractors can't tell who does premium work — so they decide on price instead of
                  craft. The sites also tend to ignore local search intent, leaving "kitchen
                  remodeling in [city]" queries to national lead-gen aggregators.
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
                  New Level Design Studio built an image-led landing experience around a single
                  conversion goal: the free estimate request. The page pairs editorial photography
                  with a city-targeted heading structure, a draggable before/after reveal, a
                  scroll-driven featured project story, and an always-reachable estimate path —
                  including a persistent call/estimate bar on mobile.
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
                  The visual system is warm and material: deep ink and bark tones, plaster
                  backgrounds, and a copper accent drawn from job-site bronze hardware. A serif
                  display face pairs with a utilitarian mono for labels — editorial, not corporate.
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
                    'Dusk-photography hero with film grain and staggered headline entrance',
                    'Alternating editorial service rows instead of generic card grids',
                    'Draggable before/after frame with bronze divider',
                    'Sticky featured-project story with annotated build phases',
                    'Masonry project gallery with masked hover zoom',
                    'Dark "why homeowners choose us" section over workshop photography',
                    'Reduced-motion and no-JS fallbacks for every animation',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Local SEO Structure</p>
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
                    'City-targeted H1: "Construction Remodeling in Port Orange"',
                    'Keyword H3 per service — kitchens, baths, flooring, additions, repairs, exteriors, whole-home',
                    'Service-area section with future city-page routes',
                    'Local FAQ targeting cost, permits, and timeline queries',
                    'Google Business Profile review placeholder system',
                    'Config-driven content for fast rebranding to a real client',
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
                  The finished demo shows remodeling contractors what their web presence could be:
                  a site that looks like the quality of the work, ranks for the searches homeowners
                  actually make, and turns visits into estimate requests. It serves as the
                  industry reference build for contractor projects at New Level Design Studio.
                </p>
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
                  View Industry Demo →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Building or Remodeling Your Web Presence?"
        body="New Level Design Studio builds premium websites for contractors, trades, and local service businesses across Volusia County."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

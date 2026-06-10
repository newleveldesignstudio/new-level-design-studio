import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';

const DEMO_URL = 'https://ember-oak-coffee-nlds.netlify.app/';

export default function WorkEmberOakCoffee() {
  return (
    <div>
      <SEO
        title="Ember & Oak Coffee Co. — Website Concept | NLDS"
        description="A premium coffee shop and small-batch roaster website concept — editorial homepage, product sections, café visit details, wholesale inquiry, journal layout, and mobile-first design."
        canonical="https://newlvlstudio.com/works/ember-oak-coffee"
        ogImage="https://newlvlstudio.com/nlds/images/ember-oak-coffee-website-concept-nlds.png"
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
            <p className="eyebrow">Coffee Shop Website Concept — Demo Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Ember &amp; Oak Coffee Co.
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
              A fictional premium coffee shop and small-batch roaster concept designed by New Level
              Design Studio to show how a café website can feel polished, editorial, and sales-ready.
              The homepage covers the full customer journey — from roast discovery to wholesale
              inquiry — in a single, mobile-first build.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Live Demo
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
            src="/nlds/images/ember-oak-coffee-website-concept-nlds.png"
            alt="Ember & Oak Coffee Co. website concept"
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
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>
                    Coffee Shop Website Concept
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Industry</p>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>
                    Coffee Shop / Café
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Note</p>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                    Ember &amp; Oak Coffee Co. is a fictional brand. This is a demo build created
                    to demonstrate what a specialty coffee shop website can look like — not a real
                    client project.
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
                      'Homepage design',
                      'Product section structure',
                      'Coffee finder block',
                      'Seasonal feature section',
                      'Café visit section',
                      'Wholesale inquiry section',
                      'Journal / content layout',
                      'Newsletter signup',
                      'Mobile-responsive build',
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
                    View Live Demo
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
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Ember &amp; Oak Coffee Co. is a premium homepage concept for a small-batch coffee
                  roaster and café. It demonstrates how a specialty coffee brand can use a single
                  polished webpage to communicate craft, product range, café experience, wholesale
                  services, and editorial content — without ever feeling like a generic template.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Problem</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Most local coffee shop websites are limited to a basic menu page and social links.
                  A specialty roaster needs much more: product discovery, sourcing story, café hours
                  and directions, wholesale inquiry positioning, and content that builds a loyal
                  audience over time. Most sites in this space leave revenue on the table by failing
                  to address any of these beyond the basics.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Direction</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  The concept uses a warm parchment and espresso brand palette with editorial
                  typography and real photography to create a premium feel. The homepage works as a
                  complete customer journey — from first impression to purchase, visit, wholesale
                  inquiry, or newsletter signup — while staying clean, fast, and mobile-first
                  throughout.
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
                    'Warm parchment and espresso brand palette with copper accents',
                    'Editorial serif typography for a premium, intentional tone',
                    'Full-bleed barista hero with gradient depth system',
                    'Best-sellers product grid with roast-level color gradients',
                    'Café visit section with location, hours, and directions',
                    'Wholesale pitch section framed as a B2B service',
                    'Journal cards to support content and SEO',
                    'Mobile-first layout with clean responsive stacking',
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
                    'Drive direct coffee product sales with a clear shop flow',
                    'Communicate sourcing story and roast craft to build brand loyalty',
                    'Convert café visitors with clear hours, location, and directions',
                    'Generate wholesale inquiries from local restaurants and offices',
                    'Build a returning audience through journal content and newsletter',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Result</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  A premium, full-editorial homepage concept that shows how an independent coffee
                  brand can build the complete customer experience online — from first discovery and
                  product browsing to café visits, wholesale inquiry, and repeat engagement through
                  content. This is a fictional demo, not a real client project.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Why This Matters</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  For an independent coffee shop, the difference between a basic menu page and a
                  real web presence is revenue. A well-built site opens paths — wholesale, online
                  orders, catering — that a Facebook page or simple site never can. It also builds
                  the kind of brand recognition that keeps regulars loyal and turns first-time
                  visitors into returning customers. Content-driven structure also supports long-term
                  local SEO and helps the brand get found in search.
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
                  View Live Demo at ember-oak-coffee-nlds.netlify.app →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Want This for Your Business?"
        body="New Level Design Studio builds websites for local businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

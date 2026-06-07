import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';

const DEMO_URL = 'https://love-handles-bbq-nlds.netlify.app';

export default function WorkLoveHandlesBbq() {
  return (
    <div>
      <SEO
        title="Love Handles BBQ Website Concept | New Level Design Studio"
        description="A local BBQ catering and food truck website concept by New Level Design Studio for Love Handles BBQ in Ormond Beach, Florida."
        canonical="https://newlvlstudio.com/works/love-handles-bbq"
        ogImage="https://newlvlstudio.com/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach.png"
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
            <p className="eyebrow">BBQ Catering / Food Truck Website</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Love Handles BBQ
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
              A local BBQ catering and food truck website concept built to make the menu, catering
              inquiries, reviews, and contact options easier to find — created by New Level Design
              Studio for Love Handles BBQ in Ormond Beach, Florida.
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
            src="/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach.png"
            alt="Love Handles BBQ catering website concept"
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
                    BBQ Catering / Food Truck Website
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Location</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                  >
                    Ormond Beach, FL
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
                      'Homepage direction',
                      'Everyday truck menu page',
                      'Catering inquiry flow',
                      'Food truck events page',
                      'Contact page',
                      'Local SEO structure',
                      'Mobile-first layout',
                      'Review / social proof links',
                      'Netlify demo deployment',
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
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  Love Handles BBQ is a local BBQ catering and food truck business based in Ormond
                  Beach, Florida. The goal was to create a cleaner, more useful web presence that
                  helps visitors quickly understand the menu, catering options, service area, reviews,
                  and contact information.
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
                  The existing online presence had issues that made the business harder to trust and
                  harder to book. The site had mislabeled navigation, confusing page URLs, shop and
                  cart behavior that did not fit the business, product-style pages,
                  placeholder-style content, and a weak catering flow.
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
                  New Level Design Studio rebuilt the concept as a local lead-generation website
                  focused on catering inquiries, everyday truck menu visibility, food truck events,
                  mobile usability, local SEO, review links, and clear calls to action throughout.
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
                    'Mobile-first hero with clean image banner and content below',
                    'Catering inquiry as the primary conversion goal',
                    'Everyday truck menu presented clearly without friction',
                    'Social proof and review links integrated throughout',
                    'Local SEO structure for Ormond Beach and Volusia County',
                    'Direct phone and contact paths visible at all scroll depths',
                    'Brand-consistent charcoal and red visual system',
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
                    'Drive catering inquiries and direct contact',
                    'Present the everyday truck menu clearly and accessibly',
                    'Build trust through social proof and awards',
                    'Support local discovery across Volusia and Flagler County',
                    'Make the mobile experience fast, clear, and easy to act on',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Result</p>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '1.0625rem',
                    lineHeight: 1.75,
                    color: 'var(--muted-text)',
                  }}
                >
                  A cleaner, faster, easier-to-use demo site that presents Love Handles BBQ as a
                  serious local catering and food truck brand while keeping the focus on booking,
                  menu visibility, and direct contact.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Why This Matters</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  For a catering and food truck business, the website is where booking decisions get
                  made. If the catering inquiry path is unclear, the menu is buried, or the mobile
                  experience feels slow and confusing, customers book elsewhere. A focused, clean web
                  presence turns casual online attention into direct catering inquiries — which is
                  where the real revenue comes from. Local SEO structure and social proof integration
                  also help the brand build long-term visibility in the Volusia County market.
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
                  View Live Demo at love-handles-bbq-nlds.netlify.app →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Want This for Your Business?"
        body="New Level Design Studio builds websites for local food, catering, and service businesses across Volusia County. Tell us what you need."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

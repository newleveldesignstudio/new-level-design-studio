import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import RelatedProjects from '@/components/RelatedProjects';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

const DEMO_URL = 'https://dh-luxury-roofing-nlds.netlify.app/';

export default function WorkDhLuxuryRoofing() {
  return (
    <div>
      <SEO
        title="DH Luxury Roofing — Roofing Website Concept | NLDS"
        description="A premium roofing landing page concept built around trust, inspections, and clear lead generation — with a video-led hero, slate and charcoal visual system, and mobile-first lead capture."
        canonical="https://newlvlstudio.com/works/dh-luxury-roofing"
        ogImage="https://newlvlstudio.com/nlds/images/dh-luxury-roofing-homepage-concept-nlds.png"
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
            <p className="eyebrow">Roofing Website · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              DH Luxury Roofing
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
              A premium roofing landing page concept created by New Level Design Studio for a
              home-services brand built around trust, inspections, and clear lead generation. The
              concept uses a video-led hero, a slate and charcoal visual system, and a mobile-first
              approach to convert homeowners into inspection leads.
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
            src="/nlds/images/dh-luxury-roofing-homepage-concept-nlds.webp"
            srcSet="/nlds/images/dh-luxury-roofing-homepage-concept-nlds-w768.webp 768w, /nlds/images/dh-luxury-roofing-homepage-concept-nlds.webp 1672w"
            sizes="(max-width: 768px) 100vw, 1200px"
            width={1672}
            height={941}
            decoding="async"
            alt="DH Luxury Roofing website concept"
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
                    Roofing Website
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Industry</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                  >
                    Roofing / Home Services
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
                      'Premium single-page landing page',
                      'Hero background video integration',
                      'Free inspection lead form',
                      'Roofing service cards',
                      'Project image system',
                      'Storm damage and metal roof visuals',
                      'Local service-area section',
                      'Mobile-responsive layout',
                      'Slate-charcoal brand color system',
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
                  DH Luxury Roofing is a premium landing page concept designed for a roofing company
                  that needs to look trustworthy, polished, and conversion-ready. The page uses a
                  dark charcoal and slate visual system, a video-led hero, direct phone CTA,
                  inspection form, roofing service cards, financing and insurance support, local
                  service-area content, testimonials, FAQ, and a final lead form.
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
                  Most roofing websites rely on loud urgency, generic stock images, and cluttered
                  calls to action. That makes the brand feel cheaper than the work it wants to sell.
                  Homeowners need clarity: what services are offered, whether inspections are free,
                  how storm damage is handled, whether financing exists, and how quickly they can
                  request help.
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
                  The concept reframes the roofing company as calm, premium, and reliable. The
                  homepage leads with a strong inspection CTA, clear phone access, a background hero
                  video, real roofing imagery, and a structured lead form. Supporting sections
                  explain financing, storm documentation, service areas, recent projects, and trust
                  signals without making the page feel aggressive.
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
                    'Calm, premium visual system over loud urgency',
                    'Video-led hero with dark charcoal overlay',
                    'Clear inspection CTA as primary conversion action',
                    'Real project imagery for roofing work',
                    'Two-column lead form with trust content',
                    'Mobile-first layout with fixed call bar',
                    'Local service-area positioning for Volusia County',
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
                    'Convert homeowners into free inspection leads',
                    'Build trust before contact through credibility signals',
                    'Communicate services, financing, and storm support clearly',
                    'Support local discovery across Port Orange and Volusia County',
                    'Drive phone calls, form submissions, and inspection bookings',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <WorkDemonstrates
                points={[
                  'A stronger trust-first impression for homeowners comparing roofing companies online.',
                  'A clear inspection path that turns interest into a scheduled call.',
                  'Local SEO structure built to help the business get found in Volusia County searches.',
                ]}
              />

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
                  View Concept Website at dh-luxury-roofing-nlds.netlify.app →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProjects currentSlug="dh-luxury-roofing" />

      <FinalCTA
        heading="Want This for Your Business?"
        body="New Level Design Studio builds websites for local service businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import RelatedProjects from '@/components/RelatedProjects';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

const DEMO_URL = 'https://the-grooming-forge-nlds.netlify.app';

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

export default function WorkTheGroomingForge() {
  return (
    <div>
      <SEO
        title="The Grooming Forge Website Concept | New Level Design Studio"
        description="A cinematic barbershop website concept (Ironwood & Blade) by New Level Design Studio, built to show motion-driven local-business web design with a booking-first conversion path."
        canonical="https://newlvlstudio.com/works/the-grooming-forge"
        ogImage="https://newlvlstudio.com/nlds/images/the-grooming-forge-barbershop-website-concept-nlds.jpg"
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
            <p className="eyebrow">Barbershop Website Concept · Concept Build</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              The Grooming Forge
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
              A cinematic website concept for a fictional premium barbershop brand, Ironwood &amp;
              Blade, built to show what motion, imagery, and a booking-first structure can do for a
              local grooming business.
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
              <Link to="/contact/" className="btn-secondary">
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
            src="/nlds/images/the-grooming-forge-barbershop-website-concept-nlds.webp"
            srcSet="/nlds/images/the-grooming-forge-barbershop-website-concept-nlds-w768.webp 768w, /nlds/images/the-grooming-forge-barbershop-website-concept-nlds.webp 1424w"
            sizes="(max-width: 768px) 100vw, 1200px"
            width={1424}
            height={830}
            decoding="async"
            alt="The Grooming Forge (Ironwood & Blade) barbershop website concept hero section"
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
                    Barbershop Website Concept
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Type</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                  >
                    Premium local business website / Lovable build
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
                      'Cinematic hero entrance animation',
                      'Scroll-triggered section reveals',
                      'Grayscale-to-color team cards',
                      'Services, pricing & hours sections',
                      'Persistent mobile booking CTA',
                      'Reduced-motion support',
                      'Mobile-first responsive build',
                      'Live Lovable demo',
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
                  The Grooming Forge is a cinematic barbershop website concept created by New Level
                  Design Studio for a fictional brand, Ironwood &amp; Blade, to show how motion,
                  imagery, and a sharp editorial system can turn a local grooming business into a
                  destination worth booking.
                </p>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>The Challenge</p>
                <p className="font-sans" style={bodyStyle}>
                  Local barbershop websites tend to default to generic templates or a bare listing
                  page — no atmosphere, no motion, and no sense of the craft happening in the chair.
                  Visitors need to feel the room before they book a seat in it.
                </p>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>The Direction</p>
                <p className="font-sans" style={bodyStyle}>
                  We built a cinematic concept around a sharp charcoal, bone, and ember-red editorial
                  system: a scroll-driven motion system, full-bleed photography, grayscale-to-color
                  team cards, and a single, persistent conversion path built entirely around booking
                  a chair — visible on mobile at every scroll position.
                </p>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>What the Site Includes</p>
                <ul className="font-sans" style={listStyle}>
                  {[
                    'Cinematic hero entrance with staggered text and image motion',
                    'Scroll-triggered reveals across every section',
                    'Services menu with icon-led cards and pricing',
                    'Flat-rate price list',
                    'Team section with grayscale-to-color hover cards',
                    'Hours & booking section',
                    'Testimonial carousel',
                    'Persistent mobile booking CTA',
                    'Reduced-motion support throughout',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>Design System</p>
                <p className="font-sans" style={{ ...bodyStyle, marginBottom: 16 }}>
                  Editorial dark theme — near-black ink and charcoal surfaces, bone-white typography,
                  and a single ember-red accent used sparingly for CTAs, icons, and interaction
                  states, not as a dominant color.
                </p>
                <p className="font-sans" style={bodyStyle}>
                  No generic scissors icon, no clip-art razor, no boxed badge logo — the wordmark is
                  a restrained typographic lockup with a single ember-red detail mark.
                </p>
              </div>

              <WorkDemonstrates
                points={[
                  'A cinematic, motion-driven first impression for a premium local barbershop.',
                  'A grayscale-to-color team presentation that adds polish without extra content.',
                  'A single, persistent booking CTA that stays visible on mobile at every scroll position.',
                ]}
              />

              <div style={sectionStyle}>
                <p className="eyebrow" style={eyebrowStyle}>Best Fit</p>
                <p className="font-sans" style={{ ...bodyStyle, marginBottom: 16 }}>
                  This concept is designed for:
                </p>
                <ul className="font-sans" style={listStyle}>
                  {[
                    'Barbershops',
                    'Men’s grooming studios',
                    'Straight-razor and traditional shave shops',
                    'Independent barbers ready for a stronger online presence',
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
                  View Concept on Lovable →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProjects currentSlug="the-grooming-forge" />

      <FinalCTA
        heading="Want This for Your Barbershop?"
        body="New Level Design Studio builds websites for local barbershops and salons across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Start a Website Project"
        buttonTo="/contact/"
      />
    </div>
  );
}

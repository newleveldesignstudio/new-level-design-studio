import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';

export default function WorkBlendHouseSmoothieBar() {
  return (
    <div>
      <SEO
        title="Blend House Smoothie Bar | Smoothie Shop Website Concept by New Level Design Studio"
        description="A mobile-first smoothie shop website concept by New Level Design Studio — clear menu sections, featured products, local SEO structure, trust signals, and direct order CTAs for a local juice bar."
        canonical="https://newlvlstudio.com/works/blend-house-smoothie-bar"
        ogImage="https://newlvlstudio.com/nlds/images/blend-house-smoothie-bar-website-concept-nlds.jpg"
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
            <p className="eyebrow">Smoothie Shop Website Concept — Industry Demo</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              Blend House Smoothie Bar
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
              A mobile-first website concept for a local smoothie and juice bar built around menu
              clarity, stronger product visuals, and faster customer action. Blend House is a
              fictional brand created by New Level Design Studio to demonstrate what a smoothie
              shop website can look and perform like.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link to="/contact" className="btn-primary">
                Discuss Your Website
              </Link>
              <Link to="/works" className="btn-secondary">
                View All Work
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
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              backgroundColor: 'var(--silver-grey)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/nlds/images/blend-house-smoothie-bar-website-concept-nlds.jpg"
              alt="Blend House Smoothie Bar website concept"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
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
                    Website · Brand Visuals · Local SEO Structure
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Industry</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                  >
                    Smoothie Bar / Juice Bar / Wellness Café
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Note</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
                  >
                    Blend House Smoothie Bar is a fictional brand. This is a concept build created
                    to demonstrate what a local smoothie shop website can look like — not a real
                    client project.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Location Focus</p>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.65 }}
                  >
                    Port Orange<br />
                    Daytona Beach<br />
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
                      'Website concept',
                      'Menu structure',
                      'Featured product layout',
                      'Mobile ordering flow',
                      'Brand visual direction',
                      'Review / trust signal section',
                      'Hours, location, and contact CTAs',
                      'Local SEO foundation',
                      'Mobile-first responsive build',
                    ].map((item) => (
                      <li key={item} style={{ color: 'var(--muted-text)' }}>— {item}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24 }}>
                  <Link
                    to="/contact"
                    className="btn-primary"
                    style={{ display: 'inline-block' }}
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
                  Blend House Smoothie Bar is a concept website for a local smoothie and juice bar.
                  The project demonstrates how a food and wellness business can move beyond Instagram
                  as its primary online presence and build a proper website that converts walk-in
                  traffic, drives online orders, and shows up in local search — without losing the
                  approachable, energetic brand tone a smoothie shop needs.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Problem</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  Most local smoothie shops rely on Instagram, an outdated PDF menu, or a weak Google
                  Business profile. Customers cannot quickly see menu options, pricing, hours,
                  location, or how to order — so they move on. When there is no clear web presence,
                  the business loses both the first-time visitor who searched online and the returning
                  customer who wanted to check the menu before driving over.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>The Direction</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  New Level Design Studio designed a mobile-first concept built around the three
                  things a smoothie shop customer needs most: what is on the menu, where the shop is,
                  and how to order or visit. The design uses strong product photography, clean menu
                  card layouts, and trust signals to turn a first visit into a regular customer — all
                  from a fast, simple page that works on any phone.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Design Direction</p>
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
                    'Fresh but premium — clean layout, intentional typography, quality photography',
                    'Strong hero with product image and a clear first action (order or visit)',
                    'Menu section built for scanning — names, descriptions, and category filters',
                    'Featured product cards with photography and direct CTA per item',
                    'Hours, location, and phone number always one tap away on mobile',
                    'Review-style trust signals to build credibility before the first visit',
                    'Local SEO structure with schema, city keywords, and Google Maps integration',
                    'Smoothie product colors contained within the concept — NLDS brand remains neutral',
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
                    'Make the menu easy to find and read on mobile',
                    'Drive online orders and in-store visits from search traffic',
                    'Build trust with new customers through reviews and brand clarity',
                    'Get the business found when someone searches for smoothies or juice bars nearby',
                    'Replace Instagram DMs and phone calls with a clear, direct order or contact path',
                  ].map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Outcome</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  The Blend House concept gives New Level Design Studio a portfolio example that shows
                  exactly what a local food and wellness business gets when they invest in a real
                  website. This is a fictional concept build, not a real client project.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 }}>
                <p className="eyebrow" style={{ marginBottom: 16 }}>Why This Matters</p>
                <p
                  className="font-sans"
                  style={{ fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' }}
                >
                  A smoothie shop that relies on Instagram alone is invisible to anyone who searches
                  Google. A proper mobile-first website — with a real menu, real hours, a real address,
                  and real reviews — shows up in local search, builds trust before the first visit,
                  and makes it easy for a customer to take action. For a food business in a
                  competitive local market, that presence is not optional. It is the difference
                  between being found and being skipped.
                </p>
              </div>

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
                  Want a site like this for your business? Start a project →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Own a Food or Wellness Business?"
        body="New Level Design Studio builds mobile-first websites for local restaurants, cafés, smoothie bars, and wellness businesses across Volusia County. Let us show what your business can look like online."
        buttonText="Discuss Your Website"
        buttonTo="/contact"
      />
    </div>
  );
}

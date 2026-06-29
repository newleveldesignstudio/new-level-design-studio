import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { EXTERNAL_LINKS } from '@/lib/links';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

const studioLinks = [
  { text: 'Home', href: '/' },
  { text: 'Works', href: '/works' },
  { text: 'Services', href: '/services' },
  { text: 'Packages', href: '/packages' },
  { text: 'Starter Pack', href: '/starter-pack' },
  { text: 'Studio', href: '/studio' },
  { text: 'About the Founder', href: '/michael-vail' },
  { text: 'Journal', href: '/journal' },
  { text: 'Contact', href: '/contact' },
  { text: 'Free SEO Tools', href: '/free-seo-tools' },
  { text: 'Local Visibility Insights', href: '/local-visibility-insights' },
];

const serviceLinks = [
  { text: 'Website Design', href: '/services' },
  { text: 'Website Maintenance', href: '/services' },
  { text: 'Brand Visuals', href: '/services' },
  { text: 'Content Systems', href: '/services' },
];

const localLinks = [
  { text: 'Port Orange Website Design', href: '/port-orange-website-design' },
  { text: 'Daytona Beach Website Design', href: '/daytona-beach-website-design' },
  { text: 'Volusia County Web Design', href: '/volusia-county-website-design' },
  { text: 'Central Florida Local Business Websites', href: '/central-florida-website-design' },
];

const legalLinks = [
  { text: 'Privacy Policy', href: '/privacy' },
  { text: 'Terms & Conditions', href: '/terms' },
];

function IconEmail() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63a19.79 19.79 0 01-3.07-8.62A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.23v2.69z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function Footer() {
  const [localOpen, setLocalOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const mutedLink: React.CSSProperties = {
    fontSize: '0.875rem',
    color: 'var(--muted-text)',
    textDecoration: 'none',
    lineHeight: '1.6',
  };

  const colLabel: React.CSSProperties = {
    fontSize: '0.75rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--charcoal)',
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-main)', paddingTop: 64 }}>
      <div className="container-nlds">

        {/* ── Brand banner: wide horizontal lockup matching reference ── */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          paddingBottom: 36,
          marginBottom: 40,
          borderBottom: '1px solid var(--silver-grey)',
        }}>
          {/* Oversized N watermark — faint background */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '-0.02em',
              top: '50%',
              transform: 'translateY(-55%)',
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(200px, 26vw, 380px)',
              lineHeight: 1,
              color: 'var(--silver-grey)',
              opacity: 0.35,
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            N
          </span>

          {/* Content layer above watermark */}
          <div style={{ position: 'relative', zIndex: 1, paddingTop: 48, paddingBottom: 8 }}>

            {/* Row 1: NEW LEVEL + DESIGN/STUDIO stacked right */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 'clamp(10px, 2vw, 28px)',
              marginBottom: 'clamp(10px, 1.4vw, 18px)',
              flexWrap: 'wrap',
            }}>
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.5rem, 8.5vw, 7rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                  color: 'var(--charcoal)',
                  margin: 0,
                }}
              >
                NEW LEVEL
              </p>

              {/* DESIGN / rule / STUDIO stacked */}
              <div style={{ paddingBottom: '0.18em', flexShrink: 0 }}>
                <p
                  className="font-sans uppercase"
                  style={{ fontSize: '0.6875rem', letterSpacing: '0.22em', color: 'var(--muted-text)', lineHeight: 1.3, margin: 0 }}
                >
                  DESIGN
                </p>
                <div style={{ height: 1, backgroundColor: 'var(--silver-grey)', margin: '5px 0' }} aria-hidden="true" />
                <p
                  className="font-sans uppercase"
                  style={{ fontSize: '0.6875rem', letterSpacing: '0.22em', color: 'var(--muted-text)', lineHeight: 1.3, margin: 0 }}
                >
                  STUDIO
                </p>
              </div>
            </div>

            {/* Services tagline */}
            <p
              className="font-sans uppercase"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.18em',
                color: 'var(--muted-text)',
                margin: '0 0 12px',
              }}
            >
              WEBSITES · BRAND VISUALS · CONTENT SYSTEMS
            </p>

            {/* Thin horizontal rule */}
            <div style={{ height: 1, backgroundColor: 'var(--silver-grey)', marginBottom: 12 }} aria-hidden="true" />

            {/* Bottom row: location left, tagline right */}
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
              style={{ gap: 6 }}
            >
              <p
                className="font-sans uppercase"
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.15em',
                  color: 'var(--muted-text)',
                  margin: 0,
                }}
              >
                PORT ORANGE · DAYTONA BEACH · VOLUSIA COUNTY
              </p>
              <em
                className="font-serif"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.25rem)', color: 'var(--charcoal)' }}
              >
                Raise the Standard.
              </em>
            </div>
          </div>
        </div>

        {/* ── Main grid: brand block left, nav columns right ── */}
        {/* Mobile: stacks. Tablet (md): 3-col. Desktop (lg): 6-col. */}
        <div className="md:grid md:grid-cols-3 md:gap-10 lg:grid-cols-6 lg:gap-12">

          {/* Brand + contact + social — 1 col on tablet, 2 cols on desktop */}
          <div className="md:col-span-1 lg:col-span-2 mb-8 md:mb-0">
            <p
              className="font-sans"
              style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--muted-text)', marginBottom: 18, maxWidth: 300 }}
            >
              Premium websites, visuals, and content systems for local businesses ready to look established online.
            </p>

            <div className="flex flex-col" style={{ gap: 10, marginBottom: 20 }}>
              <a
                href="mailto:michael@newlvlstudio.com"
                className="font-sans no-underline flex items-center transition-colors duration-200"
                style={{ ...mutedLink, gap: 8 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
              >
                <IconEmail /> michael@newlvlstudio.com
              </a>
              <a
                href="tel:+13868465754"
                className="font-sans no-underline flex items-center transition-colors duration-200"
                style={{ ...mutedLink, gap: 8 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
              >
                <IconPhone /> (386) 846-5754
              </a>
              <a
                href={EXTERNAL_LINKS.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans no-underline flex items-center transition-colors duration-200"
                style={{ ...mutedLink, gap: 8 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
              >
                <IconMapPin /> Google Business Profile
              </a>
            </div>

            {/* Social */}
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 14 }}>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', color: 'var(--muted-text)', marginBottom: 8 }}
              >
                Follow NLDS
              </p>
              <nav aria-label="Follow NLDS on social media">
                <div className="flex flex-wrap" style={{ gap: '2px 0' }}>
                  {SOCIAL_LINKS.map((social, i) => (
                    <span key={social.platform}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.ariaLabel}
                        className="font-sans no-underline transition-colors duration-200"
                        style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                      >
                        {social.platform}
                      </a>
                      {i < SOCIAL_LINKS.length - 1 && (
                        <span
                          aria-hidden="true"
                          style={{ margin: '0 5px', color: 'var(--silver-grey)', fontSize: '0.8125rem' }}
                        >
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </nav>
            </div>
          </div>

          {/* Nav columns — 2 cols on tablet, 4 cols on desktop */}
          <div className="md:col-span-2 lg:col-span-4">
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">

              {/* Studio */}
              <div>
                <p className="font-sans uppercase" style={colLabel}>Studio</p>
                <div className="flex flex-col mt-3" style={{ gap: 8 }}>
                  {studioLinks.map((link) => (
                    <Link
                      key={link.href + link.text}
                      to={link.href}
                      className="font-sans no-underline transition-colors duration-200"
                      style={mutedLink}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="font-sans uppercase" style={colLabel}>Services</p>
                <div className="flex flex-col mt-3" style={{ gap: 8 }}>
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.text}
                      to={link.href}
                      className="font-sans no-underline transition-colors duration-200"
                      style={mutedLink}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Local Pages — accordion on mobile, expanded on tablet+ */}
              <div className="col-span-2 md:col-span-1">
                <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 16 }}>
                  {/* Mobile only: toggle button */}
                  <button
                    type="button"
                    onClick={() => setLocalOpen((v) => !v)}
                    className="flex items-center justify-between w-full md:hidden"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    aria-expanded={localOpen}
                  >
                    <span className="font-sans flex items-center gap-2 uppercase" style={colLabel}>
                      <IconMapPin /> Local Pages
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {localOpen ? '−' : '+'}
                    </span>
                  </button>
                  {/* Tablet+: plain label */}
                  <p className="font-sans uppercase hidden md:flex items-center gap-2" style={colLabel}>
                    <IconMapPin /> Local Pages
                  </p>
                  {/* Links: hidden on mobile until open, always visible on tablet+ */}
                  <div className={`${localOpen ? 'block' : 'hidden'} md:block`}>
                    <div className="flex flex-col mt-3" style={{ gap: 8 }}>
                      {localLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="font-sans no-underline transition-colors duration-200"
                          style={mutedLink}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal — accordion on mobile, expanded on tablet+ */}
              <div className="col-span-2 md:col-span-1">
                <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 16 }}>
                  {/* Mobile only: toggle button */}
                  <button
                    type="button"
                    onClick={() => setLegalOpen((v) => !v)}
                    className="flex items-center justify-between w-full md:hidden"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                    aria-expanded={legalOpen}
                  >
                    <span className="font-sans flex items-center gap-2 uppercase" style={colLabel}>
                      <IconShield /> Legal
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: 1 }}
                      aria-hidden="true"
                    >
                      {legalOpen ? '−' : '+'}
                    </span>
                  </button>
                  {/* Tablet+: plain label */}
                  <p className="font-sans uppercase hidden md:flex items-center gap-2" style={colLabel}>
                    <IconShield /> Legal
                  </p>
                  {/* Links */}
                  <div className={`${legalOpen ? 'block' : 'hidden'} md:block`}>
                    <div className="flex flex-col mt-3" style={{ gap: 8 }}>
                      {legalLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="font-sans no-underline transition-colors duration-200"
                          style={mutedLink}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                        >
                          {link.text}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <motion.div
          className="flex flex-col items-center justify-center py-5 mt-10"
          style={{ borderTop: '1px solid var(--silver-grey)' }}
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p
            className="font-sans"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)', marginBottom: 4 }}
          >
            © 2026 New Level Design Studio
          </p>
          <p
            className="font-sans"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
          >
            Port Orange • Daytona Beach • Volusia County
          </p>
        </motion.div>

      </div>
    </footer>
  );
}

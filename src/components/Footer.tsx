import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp } from '@/lib/motion';
import { EXTERNAL_LINKS } from '@/lib/links';

const footerColumns = [
  {
    label: 'Studio',
    links: [
      { text: 'Home', href: '/' },
      { text: 'Works', href: '/works' },
      { text: 'Services', href: '/services' },
      { text: 'Packages', href: '/packages' },
      { text: 'Studio', href: '/studio' },
      { text: 'Journal', href: '/journal' },
      { text: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Services',
    links: [
      { text: 'Website Design', href: '/services' },
      { text: 'Website Maintenance', href: '/services' },
      { text: 'Brand Visuals', href: '/services' },
      { text: 'Content Systems', href: '/services' },
      { text: 'Starter Pack', href: '/starter-pack' },
    ],
  },
  {
    label: 'Local',
    links: [
      { text: 'Port Orange Website Design', href: '/port-orange-website-design' },
      { text: 'Daytona Beach Website Design', href: '/daytona-beach-website-design' },
      { text: 'Volusia County Web Design', href: '/volusia-county-website-design' },
      { text: 'Central Florida Local Business Websites', href: '/central-florida-website-design' },
    ],
  },
  {
    label: 'Legal',
    links: [
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export default function Footer() {
  const columnsRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    start: 'top 85%',
    childSelector: '.footer-col',
  });

  const wordmarkRef = useScrollReveal<HTMLDivElement>({
    y: 20,
    duration: 1.2,
    stagger: 0,
    start: 'top 90%',
  });

  const shouldReduceMotion = useReducedMotion();

  return (
    <footer style={{ backgroundColor: 'var(--bg-main)', paddingTop: 80 }}>
      <div className="container-nlds">
        {/* Top row - link grid */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Brand block */}
          <div className="footer-col col-span-2 md:col-span-4 lg:col-span-1 lg:pr-8">
            <p
              className="font-sans uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--charcoal)' }}
            >
              NEW LEVEL DESIGN STUDIO
            </p>
            <p
              className="font-sans mt-4"
              style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-text)', maxWidth: 280 }}
            >
              Premium websites, visuals, and content systems for local businesses ready to look established online.
            </p>
            <div className="mt-5 flex flex-col" style={{ gap: 16 }}>
              <a
                href="mailto:michael@newlvlstudio.com"
                className="font-sans no-underline transition-colors duration-200"
                style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
              >
                michael@newlvlstudio.com
              </a>
              <a
                href="tel:+13868465754"
                className="font-sans no-underline transition-colors duration-200"
                style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
              >
                (386) 846-5754
              </a>
              <a
                href={EXTERNAL_LINKS.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans no-underline transition-colors duration-200"
                style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
              >
                Google Business Profile
              </a>
            </div>
          </div>

          {footerColumns.map((col, i) => (
            <div key={i} className="footer-col">
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--charcoal)' }}
              >
                {col.label}
              </p>
              <div className="mt-3 flex flex-col" style={{ gap: 8 }}>
                {col.links.map((link, j) => (
                  <Link
                    key={j}
                    to={link.href}
                    className="font-sans transition-colors duration-200 no-underline"
                    style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Giant Wordmark */}
        <div ref={wordmarkRef} className="mt-20 relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(3rem, 12vw, 12rem)',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: 'var(--charcoal)',
                wordBreak: 'keep-all',
              }}
            >
              NEW LEVEL
            </h2>

            <div className="flex flex-col items-start lg:items-end mt-4 lg:mt-0 lg:mb-4">
              <div className="flex flex-col" style={{ lineHeight: 1.4 }}>
                <span
                  className="font-sans uppercase"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.3em', color: 'var(--charcoal)' }}
                >
                  DESIGN
                </span>
                <span
                  className="font-sans uppercase"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.3em', color: 'var(--charcoal)' }}
                >
                  STUDIO
                </span>
              </div>
              <div style={{ width: 40, height: 1, backgroundColor: 'var(--charcoal)', margin: '12px 0' }} />
              <em
                className="font-serif"
                style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}
              >
                Raise the Standard.
              </em>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between py-8 mt-8"
          style={{ borderTop: '1px solid var(--silver-grey)' }}
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p
              className="font-sans"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
            >
              New Level Design Studio
            </p>
            <span
              className="hidden sm:inline font-sans"
              style={{ fontSize: '0.75rem', color: 'var(--silver-grey)' }}
            >
              |
            </span>
            <p
              className="font-sans"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
            >
              Raise the Standard.
            </p>
          </div>
          <p
            className="font-sans mt-2 sm:mt-0"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
          >
            Port Orange &bull; Daytona Beach &bull; Volusia County
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

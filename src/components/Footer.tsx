import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const footerColumns = [
  {
    label: 'FLORIDA',
    links: ['Port Orange, FL 32127', 'Volusia County'],
    isText: true,
  },
  {
    label: 'CONTACT',
    links: [
      { text: 'hello@newlvlstudio.com', href: 'mailto:hello@newlvlstudio.com' },
      { text: '(386) 846-5754', href: 'tel:+13868465754' },
      { text: 'newlvlstudio.com', href: '/' },
    ],
    isMixed: true,
  },
  {
    label: 'COMPANY',
    links: [
      { text: 'Home', href: '/' },
      { text: 'About Us', href: '/studio' },
      { text: 'Works', href: '/works' },
      { text: 'Services', href: '/services' },
      { text: 'The Studio', href: '/studio' },
      { text: 'Packages', href: '/packages' },
      { text: 'Starter Pack', href: '/starter-pack' },
    ],
    isNav: true,
  },
  {
    label: 'CONTACT',
    links: [
      { text: 'Contact', href: '/contact' },
      { text: 'Terms', href: '/terms' },
      { text: 'Privacy', href: '/privacy' },
    ],
    isNav: true,
  },
  {
    label: 'SERVICES',
    links: ['Website Design', 'Brand Visuals', 'Short-Form Video', 'Ongoing Support'],
    isText: true,
  },
  {
    label: 'SERVICE AREA',
    links: ['Port Orange', 'Daytona Beach', 'Volusia County', 'Central Florida'],
    isText: true,
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

  return (
    <footer style={{ backgroundColor: 'var(--bg-main)', paddingTop: 64 }}>
      <div className="container-nlds">
        {/* Top row - link grid */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-0"
        >
          {/* Brand block */}
          <div className="footer-col col-span-2 md:col-span-3 lg:col-span-1 lg:pr-6 lg:[border-right:1px_solid_var(--silver-grey)]">
            <p
              className="font-sans uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--charcoal)' }}
            >
              NEW LEVEL DESIGN STUDIO
            </p>
            <p
              className="font-sans mt-4"
              style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--muted-text)' }}
            >
              We craft premium websites, visuals, and short-form content for local businesses ready to look bigger online.
            </p>
          </div>


          {footerColumns.map((col, i) => (
            <div key={i} className="footer-col lg:px-6">
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--charcoal)' }}
              >
                {col.label}
              </p>
              <div className="mt-3" style={{ lineHeight: 2.0 }}>
                {col.isText &&
                  col.links.map((link, j) => (
                    <p key={j} className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                      {link}
                    </p>
                  ))}
                {(col.isMixed || col.isNav) &&
                  col.links.map((link: any, j) =>
                    link.href ? (
                      <Link
                        key={j}
                        to={link.href}
                        className="block font-sans transition-colors duration-200 no-underline"
                        style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <p key={j} className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                        {link}
                      </p>
                    )
                  )}
              </div>
            </div>
          ))}
        </div>

        {/* Giant Wordmark */}
        <div ref={wordmarkRef} className="mt-16 relative">
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
        <div
          className="flex flex-col sm:flex-row items-center justify-between py-8 mt-8"
          style={{ borderTop: '1px solid var(--silver-grey)' }}
        >
          <p
            className="font-sans"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
          >
            &copy; 2026 New Level Design Studio
          </p>
          <p
            className="font-sans mt-2 sm:mt-0"
            style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
          >
            newlvlstudio.com
          </p>
          <div className="flex items-center mt-2 sm:mt-0" style={{ gap: 24 }}>
            <Link
              to="/terms"
              className="font-sans no-underline transition-colors duration-200"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
            >
              Terms
            </Link>
            <Link
              to="/privacy"
              className="font-sans no-underline transition-colors duration-200"
              style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--muted-text)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

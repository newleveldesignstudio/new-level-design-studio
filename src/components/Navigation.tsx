import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavScroll } from '@/hooks/useNavScroll';
import { getLenis } from '@/hooks/useLenis';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Works', path: '/works' },
  { label: 'The Studio', path: '/studio' },
  { label: 'Packages', path: '/packages' },
  { label: 'Starter Pack', path: '/starter-pack' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useNavScroll(100);
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 80,
          backgroundColor: scrolled ? 'rgba(247, 247, 243, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <div className="container-nlds h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="uppercase no-underline flex items-center shrink-0"
            style={{ color: 'var(--charcoal)', gap: '10px' }}
          >
            <span
              className="font-serif"
              style={{
                fontSize: '20px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                color: '#1E1F20',
              }}
            >
              NEW LEVEL
            </span>
            <span
              className="font-sans"
              style={{
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                color: '#676C70',
              }}
            >
              DESIGN STUDIO
            </span>
          </Link>

          {/* Desktop Nav + CTA */}
          <div className="hidden lg:flex items-center shrink-0" style={{ gap: 52 }}>
            <div className="flex items-center" style={{ gap: 28 }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleNavClick}
                  className="font-sans text-sm uppercase no-underline transition-colors duration-200 whitespace-nowrap"
                  style={{
                    letterSpacing: '0.12em',
                    color: location.pathname === link.path ? 'var(--charcoal)' : 'var(--muted-text)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.currentTarget.style.color = 'var(--muted-text)';
                    }
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              onClick={handleNavClick}
              className="btn-primary shrink-0"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center"
            style={{ width: 32, height: 32, gap: 6 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block transition-transform duration-300"
              style={{
                width: 20,
                height: 1,
                backgroundColor: 'var(--charcoal)',
                transform: menuOpen ? 'rotate(45deg) translateY(3.5px)' : 'none',
              }}
            />
            <span
              className="block transition-opacity duration-300"
              style={{
                width: 20,
                height: 1,
                backgroundColor: 'var(--charcoal)',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block transition-transform duration-300"
              style={{
                width: 20,
                height: 1,
                backgroundColor: 'var(--charcoal)',
                transform: menuOpen ? 'rotate(-45deg) translateY(-3.5px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--bg-main)', paddingTop: 80 }}
        >
          <div className="flex flex-col items-center" style={{ gap: 32 }}>
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className="font-serif no-underline"
                style={{
                  fontSize: '2rem',
                  color: 'var(--charcoal)',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="btn-primary mt-8"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

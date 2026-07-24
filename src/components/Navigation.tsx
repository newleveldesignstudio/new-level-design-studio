import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavScroll } from '@/hooks/useNavScroll';
import { getLenis } from '@/hooks/useLenis';
import { menuOverlay, staggerContainer, menuItem } from '@/lib/motion';
import { PRIMARY_SERVICES, SUPPORTING_CAPABILITIES } from '@/data/serviceTerminology';

type DropdownLink = {
  label: string;
  path: string;
  description?: string;
};

type NavItem = {
  label: string;
  path: string;
  activePrefixes?: string[];
  dropdown?: {
    title: string;
    description: string;
    links: DropdownLink[];
  };
};

/*
  TODO: When individual work category pages are created, update the Works
  dropdown link paths below:
    Contractors       → '/works/contractors'
    Restaurants       → '/works/restaurants'
    Salons & Barbers  → '/works/salons-barbers'
    Real Estate       → '/works/real-estate'
    Fitness           → '/works/fitness'
    Medical / Wellness→ '/works/medical-wellness'
    Local Services    → '/works/local-services'
*/

/*
  TODO: When individual service pages are created, update the Services
  dropdown link paths below:
    Website Design  → '/services/website-design'
    Website Redesign→ '/services/website-redesign'
    Brand Direction → '/services/brand-direction'
  Website Care now has its own page (/website-care/) — done, not a TODO.
*/

const navItems: NavItem[] = [
  {
    label: 'Services',
    path: '/services/',
    dropdown: {
      title: 'Services',
      description: 'Core ways we help local businesses improve their online presence.',
      links: [
        { label: PRIMARY_SERVICES[0], path: '/services/#website-design', description: 'Professional websites built for clarity, trust, and action.' },
        { label: PRIMARY_SERVICES[1], path: '/services/', description: 'A structured rebuild for a site that no longer represents the business.' },
        { label: PRIMARY_SERVICES[2], path: '/website-care/', description: 'Ongoing website quality, visibility, and trust management.' },
        { label: SUPPORTING_CAPABILITIES[0], path: '/services/', description: 'Visual identity support for businesses that need a sharper presentation.' },
        { label: SUPPORTING_CAPABILITIES[2], path: '/services/', description: 'Location-targeted structure that helps local search understand your service area.' },
        { label: SUPPORTING_CAPABILITIES[1], path: '/services/#website-copy-visual-support', description: 'Branded graphics, launch assets, and supporting content that keep your business consistent.' },
      ],
    },
  },
  {
    label: 'Works',
    path: '/works/',
    dropdown: {
      title: 'Works',
      description: 'Selected website, branding, and content direction for local businesses.',
      links: [
        { label: 'All Work', path: '/works/' },
        { label: 'Contractors', path: '/works/?industry=contractors' },
        { label: 'Restaurants', path: '/works/?industry=restaurants' },
        { label: 'Salons & Barbers', path: '/works/?industry=salons-barbers' },
        { label: 'Real Estate', path: '/works/?industry=real-estate' },
        { label: 'Fitness', path: '/works/?industry=fitness' },
        { label: 'Medical / Wellness', path: '/works/?industry=medical-wellness' },
        { label: 'Local Services', path: '/works/?industry=local-services' },
      ],
    },
  },
  { label: 'Packages', path: '/packages/' },
  {
    label: 'Studio',
    path: '/studio/',
    activePrefixes: ['/studio', '/journal', '/michael-vail'],
    dropdown: {
      title: 'THE STUDIO',
      description: 'Articles, notes, and practical guidance on websites, visuals, branding, and local business growth.',
      links: [
        { label: 'Studio Overview', path: '/studio/' },
        { label: 'About the Founder', path: '/michael-vail/' },
        { label: 'All Articles', path: '/journal/' },
        { label: 'Website Strategy', path: '/journal/?category=website-strategy' },
        { label: 'Local Business Growth', path: '/journal/?category=local-business-growth' },
        { label: 'Visual Direction', path: '/journal/?category=visual-direction' },
        { label: 'Website Insights', path: '/journal/?category=content-systems' },
        { label: 'Brand Presence', path: '/journal/?category=brand-presence' },
      ],
    },
  },
  {
    label: 'Resources',
    path: '/journal/',
    activePrefixes: ['/journal', '/free-seo-tools', '/local-visibility-insights'],
    dropdown: {
      title: 'RESOURCES',
      description: 'Free tools and articles on websites, local SEO, and business visibility.',
      links: [
        { label: 'Journal', path: '/journal/', description: 'Practical articles on websites, visuals, and local business growth.' },
        { label: 'Free SEO Tools', path: '/free-seo-tools/', description: 'Check website speed, indexing, structured data, and local visibility.' },
        { label: 'Local Visibility Insights', path: '/local-visibility-insights/', description: 'Practical guidance on how customers find, evaluate, and contact local businesses.' },
      ],
    },
  },
];

/* Desktop dropdown animation */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: 4, transition: { duration: 0.15, ease: 'easeIn' as const } },
};

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  useNavScroll(100);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  /* Lock body scroll when mobile menu is open */
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

  /* Close dropdowns and menu on route change (pathname or search params) */
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setOpenDropdown(null);
    setMenuOpen(false);
    setOpenMobileAccordion(null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [location.pathname, location.search]);

  /* Clear dropdown timer on unmount */
  useEffect(() => {
    return () => {
      if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    };
  }, []);

  /* Trap Tab focus within the mobile menu overlay so it can't leak into
     hidden page content behind it (the overlay covers the page visually
     but does not remove it from tab order on its own) */
  useEffect(() => {
    if (!menuOpen) return;
    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const toggle = menuToggleRef.current;
      const panel = mobileMenuRef.current;
      if (!toggle || !panel) return;
      const panelFocusable = Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      ).filter((el) => el.offsetParent !== null);
      const focusable = [toggle, ...panelFocusable];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleTrap);
    return () => document.removeEventListener('keydown', handleTrap);
  }, [menuOpen]);

  /* Escape key closes dropdowns and mobile menu */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* Global focusout: close dropdown when focus leaves the dropdown container */
  useEffect(() => {
    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      const container = target.closest('.dropdown-container') as HTMLElement | null;
      if (container) {
        if (!relatedTarget || !container.contains(relatedTarget)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('focusout', handleFocusOut);
    return () => document.removeEventListener('focusout', handleFocusOut);
  }, []);

  /* Click outside closes desktop dropdowns */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (openDropdown) {
        const container = dropdownRefs.current.get(openDropdown);
        if (container && !container.contains(e.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [openDropdown]);

  const handleNavClick = useCallback((path?: string) => {
    setMenuOpen(false);
    setOpenMobileAccordion(null);
    // Hash links scroll to their section (handled by the target page);
    // forcing scroll-to-top here would fight that.
    if (path?.includes('#')) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: true });
  }, []);

  const handleDropdownEnter = useCallback((label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setOpenDropdown(label);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownTimer.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  }, []);

  const isItemActive = useCallback((item: NavItem) => {
    if (item.activePrefixes) {
      return item.activePrefixes.some((p) => location.pathname.startsWith(p));
    }
    return location.pathname === item.path;
  }, [location.pathname]);

  const toggleMobileAccordion = useCallback((label: string) => {
    setOpenMobileAccordion((prev) => (prev === label ? null : label));
  }, []);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          height: 80,
          backgroundColor: '#F7F6F1',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="container-nlds h-full flex items-center justify-between">
          {/* Brand Lockup */}
          <Link
            to="/"
            onClick={() => handleNavClick()}
            className="no-underline flex items-center shrink-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
            aria-label="New Level Design Studio home"
          >
            {/* Desktop: monogram + text lockup */}
            <div className="hidden sm:flex items-center" style={{ gap: 10 }}>
              <img
                src="/images/new-level-design-studio-logo-transparent-header.png"
                alt="New Level Design Studio NL monogram"
                className="block"
                style={{ height: 40, width: 'auto' }}
              />
              <div className="flex flex-col items-start" style={{ gap: 3 }}>
                <span
                  className="font-serif"
                  style={{
                    fontSize: '17px',
                    letterSpacing: '0.1em',
                    lineHeight: 1,
                    color: 'var(--charcoal)',
                  }}
                >
                  NEW LEVEL
                </span>
                <div
                  style={{
                    width: 22,
                    height: 1,
                    backgroundColor: 'var(--silver-grey)',
                  }}
                />
                <span
                  className="font-sans uppercase"
                  style={{
                    fontSize: '9.5px',
                    letterSpacing: '0.22em',
                    lineHeight: 1,
                    color: 'var(--muted-text)',
                  }}
                >
                  DESIGN STUDIO
                </span>
              </div>
            </div>

            {/* Mobile: monogram + brand name (compact horizontal lockup) */}
            <div className="sm:hidden flex items-center" style={{ gap: 10 }}>
              <img
                className="block"
                src="/images/new-level-design-studio-logo-transparent-header.png"
                alt="New Level Design Studio NL monogram"
                style={{ height: 40, width: 'auto' }}
              />
              <span
                className="font-serif"
                style={{
                  fontSize: 15,
                  letterSpacing: '0.01em',
                  lineHeight: 1.05,
                  color: 'var(--charcoal)',
                  whiteSpace: 'nowrap',
                }}
              >
                New Level Design Studio
              </span>
            </div>
          </Link>

          <div className="flex-1 min-w-[24px]" />

          {/* Desktop Nav + CTA */}
          <div className="hidden xl:flex items-center shrink-0" style={{ gap: 32 }}>
            <div className="flex items-center" style={{ gap: 20 }}>
              {navItems.map((item) => {
                const hasDropdown = !!item.dropdown;
                const isOpen = openDropdown === item.label;
                return (
                  <div
                    key={item.path}
                    ref={(el) => {
                      if (el) dropdownRefs.current.set(item.label, el);
                      else dropdownRefs.current.delete(item.label);
                    }}
                    className="relative dropdown-container"
                    data-dropdown-label={item.label}
                    onMouseEnter={() => hasDropdown && handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleNavClick()}
                      onFocus={() => hasDropdown && handleDropdownEnter(item.label)}
                      className="font-sans text-sm uppercase no-underline transition-colors duration-200 whitespace-nowrap focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
                      style={{
                        letterSpacing: '0.12em',
                        color: isItemActive(item) ? 'var(--charcoal)' : 'var(--muted-text)',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                      onMouseLeave={(e) => {
                        if (!isItemActive(item)) {
                          e.currentTarget.style.color = 'var(--muted-text)';
                        }
                      }}
                      {...(hasDropdown ? { 'aria-expanded': isOpen, 'aria-haspopup': 'true' } : {})}
                    >
                      {item.label}
                    </Link>

                    {/* Desktop Dropdown Panel */}
                    <AnimatePresence>
                      {hasDropdown && isOpen && (
                        <motion.div
                          className="absolute left-0 top-full pt-3 z-50"
                          style={{ minWidth: 320 }}
                          variants={shouldReduceMotion ? undefined : dropdownVariants}
                          initial={shouldReduceMotion ? undefined : 'hidden'}
                          animate={shouldReduceMotion ? undefined : 'visible'}
                          exit={shouldReduceMotion ? undefined : 'exit'}
                        >
                          <div
                            style={{
                              backgroundColor: 'var(--surface)',
                              border: '1px solid var(--border-color)',
                              padding: '32px',
                              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
                            }}
                          >
                            <p
                              className="font-sans uppercase"
                              style={{
                                fontSize: '0.6875rem',
                                letterSpacing: '0.2em',
                                color: 'var(--muted-text)',
                              }}
                            >
                              {item.dropdown!.title}
                            </p>
                            <p
                              className="font-sans mt-3"
                              style={{
                                fontSize: '0.875rem',
                                lineHeight: 1.55,
                                color: 'var(--muted-text)',
                              }}
                            >
                              {item.dropdown!.description}
                            </p>
                            <div
                              className="mt-5 flex flex-col"
                              style={{ gap: 2 }}
                            >
                              {item.dropdown!.links.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.path}
                                  onClick={() => handleNavClick(sub.path)}
                                  className="font-sans no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
                                  style={{
                                    fontSize: '0.9375rem',
                                    color: 'var(--charcoal)',
                                    padding: '7px 0',
                                    lineHeight: 1.4,
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                                >
                                  {sub.description ? (
                                    <span className="flex flex-col">
                                      <span>{sub.label}</span>
                                      <span
                                        className="font-sans"
                                        style={{
                                          fontSize: '0.8125rem',
                                          color: 'var(--muted-text)',
                                          lineHeight: 1.45,
                                          marginTop: 2,
                                        }}
                                      >
                                        {sub.description}
                                      </span>
                                    </span>
                                  ) : (
                                    sub.label
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <Link
              to="/contact/"
              onClick={() => handleNavClick()}
              className="btn-primary shrink-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
            >
              Start a Website Project
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={menuToggleRef}
            className="xl:hidden flex flex-col justify-center items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
            style={{ width: 32, height: 32, gap: 6 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
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
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed inset-0 z-40 overflow-auto"
            style={{ backgroundColor: 'var(--bg-main)' }}
            variants={shouldReduceMotion ? undefined : menuOverlay}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            animate={shouldReduceMotion ? undefined : 'visible'}
            exit={shouldReduceMotion ? undefined : 'exit'}
          >
            <div className="min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6">
              <motion.div
                className="flex flex-col items-center w-full max-w-sm"
                style={{ gap: 8 }}
                variants={shouldReduceMotion ? undefined : staggerContainer}
                initial={shouldReduceMotion ? undefined : 'hidden'}
                animate={shouldReduceMotion ? undefined : 'visible'}
              >
                {navItems.map((item) => {
                  const hasDropdown = !!item.dropdown;
                  const accordionOpen = openMobileAccordion === item.label;
                  const panelId = `mobile-panel-${item.label.toLowerCase().replace(/\s+/g, '-')}`;

                  return (
                    <motion.div
                      key={item.path}
                      className="w-full"
                      variants={shouldReduceMotion ? undefined : menuItem}
                    >
                      {hasDropdown ? (
                        <div className="w-full">
                          <button
                            className="w-full font-serif no-underline flex items-center justify-between focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
                            style={{
                              fontSize: '1.75rem',
                              color: 'var(--charcoal)',
                              padding: '12px 0',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              borderBottom: '1px solid var(--silver-grey)',
                            }}
                            onClick={() => toggleMobileAccordion(item.label)}
                            aria-expanded={accordionOpen}
                            aria-controls={panelId}
                          >
                            <span>{item.label}</span>
                            <span
                              className="font-sans"
                              style={{
                                fontSize: '0.75rem',
                                letterSpacing: '0.1em',
                                color: 'var(--muted-text)',
                                transition: 'transform 0.2s ease',
                                transform: accordionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              }}
                            >
                              ▼
                            </span>
                          </button>

                          <AnimatePresence>
                            {accordionOpen && (
                              <motion.div
                                id={panelId}
                                className="flex flex-col overflow-hidden"
                                style={{ padding: '8px 0 16px' }}
                                initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                                animate={shouldReduceMotion ? undefined : { height: 'auto', opacity: 1 }}
                                exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                                transition={shouldReduceMotion ? undefined : { duration: 0.2 }}
                              >
                                <p
                                  className="font-sans"
                                  style={{
                                    fontSize: '0.875rem',
                                    lineHeight: 1.5,
                                    color: 'var(--muted-text)',
                                    padding: '4px 0 12px',
                                  }}
                                >
                                  {item.dropdown!.description}
                                </p>
                                {item.dropdown!.links.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    to={sub.path}
                                    onClick={() => handleNavClick(sub.path)}
                                    className="font-sans no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
                                    style={{
                                      fontSize: '1rem',
                                      color: 'var(--charcoal)',
                                      padding: '10px 0',
                                      lineHeight: 1.4,
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => handleNavClick()}
                          className="font-serif no-underline block focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
                          style={{
                            fontSize: '1.75rem',
                            color: 'var(--charcoal)',
                            padding: '12px 0',
                            borderBottom: '1px solid var(--silver-grey)',
                          }}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
                <motion.div variants={shouldReduceMotion ? undefined : menuItem} className="mt-6">
                  <Link
                    to="/contact/"
                    onClick={() => handleNavClick()}
                    className="btn-primary focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-nlds-charcoal"
                  >
                    Start a Website Project
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

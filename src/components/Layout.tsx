import { useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import PageTransition from './PageTransition';

export default function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  /* Native hash navigation scrolls #main-content into view, but does not
     move keyboard focus onto a non-interactive element. Focus it manually
     (preventScroll avoids fighting the native scroll the anchor already did). */
  const handleSkipLinkClick = () => {
    mainRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <a href="#main-content" className="skip-link" onClick={handleSkipLinkClick}>Skip to main content</a>
      <Navigation />
      <main id="main-content" tabIndex={-1} ref={mainRef}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import PageTransition from './PageTransition';

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Navigation />
      <main>
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

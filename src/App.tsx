import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Works from '@/pages/Works';
import Studio from '@/pages/Studio';
import Packages from '@/pages/Packages';
import StarterPack from '@/pages/StarterPack';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Works />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/starter-pack" element={<StarterPack />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </>
  );
}

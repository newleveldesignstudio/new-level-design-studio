import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '@/hooks/useLenis';

/**
 * Scrolls to the element named by the URL hash (/page/#section), offset for the
 * fixed 80px header. Delayed so it runs after the global scroll-to-top on route change.
 */
export function useHashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -100, immediate: reduce });
      else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(timer);
  }, [hash]);
}

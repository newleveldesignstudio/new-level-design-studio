import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Temporary debug: add ?nolenis=1 to URL to test ScrollTrigger without Lenis
    const skipLenis = window.location.search.includes('nolenis');
    if (skipLenis) {
      console.log('[Lenis] Skipped for debugging — native scroll active');
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    lenisInstance = lenis;
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // When ScrollTrigger refreshes (resize, layout changes), tell Lenis to recalculate
    const onSTRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onSTRefresh);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onSTRefresh);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}

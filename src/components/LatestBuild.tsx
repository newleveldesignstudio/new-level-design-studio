import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './LatestBuild.css';

const DEMO_URL = 'https://precision-line-roofing-demo.netlify.app';
const IMG = '/nlds/images/precision-line-roofing-industry-demo-website-concept-nlds';
const PHONE = '/nlds/images/precision-line-roofing-industry-demo-mobile-site-nlds';
const ALT_DESKTOP = 'Precision Line Roofing industry demo website, desktop view of the storm-ready roofing hero';
const ALT_PHONE = 'Precision Line Roofing industry demo website, phone view';

/** Latest featured build: the Precision Line Roofing industry demo (concept, not a client project). */
export default function LatestBuild() {
  const revealRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8, stagger: 0.14, start: 'top 80%', childSelector: '.lb-reveal' });
  const screenRef = useRef<HTMLDivElement>(null);

  // Preview clip: tablet/desktop only, fetched when the section is near the viewport, plays while mostly visible, never under reduced motion.
  useEffect(() => {
    const screen = screenRef.current;
    const video = screen?.querySelector('video');
    if (!screen || !video) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(min-width: 768px)').matches) return;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      for (const [type, src] of [['video/webm', '/videos/precision-line-roofing-demo-preview-nlds.webm'], ['video/mp4', '/videos/precision-line-roofing-demo-preview-nlds.mp4']] as const) {
        const s = document.createElement('source'); s.src = src; s.type = type; video.append(s);
      }
      video.preload = 'auto'; video.load();
    };
    const onPlaying = () => screen.classList.add('is-playing');
    video.addEventListener('playing', onPlaying);
    const near = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) load(); }, { rootMargin: '300px 0px' });
    const vis = new IntersectionObserver(es => {
      for (const e of es) {
        if (!loaded) continue;
        if (e.intersectionRatio >= 0.35 && video.paused) video.play().catch(() => {});
        else if (e.intersectionRatio < 0.1 && !video.paused) video.pause();
      }
    }, { threshold: [0, 0.1, 0.35] });
    near.observe(screen); vis.observe(screen);
    return () => { near.disconnect(); vis.disconnect(); video.removeEventListener('playing', onPlaying); };
  }, []);

  return (
    <section id="latest-build" aria-labelledby="latest-build-heading" style={{ backgroundColor: 'var(--bg-soft)', borderTop: '1px solid var(--silver-grey)', borderBottom: '1px solid var(--silver-grey)', padding: 'clamp(56px, 9vw, 110px) 0' }}>
      <div className="container-nlds">
        <div ref={revealRef}>
          <div className="lb-reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="eyebrow">LATEST BUILD</p>
            <p className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}>Industry Concept · 2026</p>
          </div>
          <div className="lb-reveal mt-5"><SectionDivider /></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 mt-10 lg:mt-14 items-center">
            <div className="lg:col-span-5">
              <h2 id="latest-build-heading" className="font-serif lb-reveal" style={{ fontSize: 'clamp(1.875rem, 4.2vw, 3.25rem)', color: 'var(--charcoal)', lineHeight: 1.08, letterSpacing: '-0.015em' }}>
                A roofing website that doesn&rsquo;t look like every other roofing website.
              </h2>
              <p className="font-serif lb-reveal mt-7" style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}>Precision Line Roofing</p>
              <p className="font-sans lb-reveal mt-3" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.7, maxWidth: 460 }}>
                An interactive industry concept combining scroll-driven storytelling, mobile-first navigation, project proof and a conversion-focused inspection journey.
              </p>
              <div className="lb-reveal mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="btn-primary lb-cta">
                  View the live demo <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (Precision Line Roofing industry demo, opens in a new tab)</span>
                </a>
                <Link to="/works/" className="text-link">See all work</Link>
              </div>
              <p className="font-sans lb-reveal mt-6" style={{ fontSize: '0.75rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 420 }}>
                Industry Demo. Precision Line Roofing is a concept built by NLDS to show what a roofing website can be. It is not a client project.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="lb-stage lb-reveal">
                <div className="lb-browser-wrap">
                  <div className="lb-browser">
                    <div className="lb-bar" aria-hidden="true">
                      <span className="lb-dots"><i /><i /><i /></span>
                      <span className="lb-url">precision-line-roofing-demo.netlify.app</span>
                    </div>
                    <div className="lb-screen" ref={screenRef}>
                      <picture>
                        <source type="image/webp" srcSet={`${IMG}-w768.webp 768w, ${IMG}.webp 1440w`} sizes="(min-width: 1024px) 58vw, 90vw" />
                        <img src={`${IMG}.webp`} width={1440} height={900} alt={ALT_DESKTOP} loading="lazy" decoding="async" />
                      </picture>
                      <video muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture />
                    </div>
                  </div>
                  <div className="lb-phone lb-phone-over">
                    <img src={`${PHONE}-w768.webp`} width={780} height={1688} alt={ALT_PHONE} loading="lazy" decoding="async" />
                  </div>
                </div>
                <div className="lb-phone lb-phone-solo">
                  <img src={`${PHONE}-w768.webp`} width={780} height={1688} alt={ALT_PHONE} loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

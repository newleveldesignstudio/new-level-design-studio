import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import './LatestBuild.css';
import './HomeServicesFeatured.css';

/** Homepage featured pair: the two home-service industry demos (concept builds, not client projects). Replaces the single "Latest Build" block. */
const PL = '/nlds/images/precision-line-roofing-industry-demo-website-concept-nlds';
const PL_PHONE = '/nlds/images/precision-line-roofing-industry-demo-mobile-site-nlds';
const AA = '/nlds/images/arctic-airworks-hvac-industry-demo-website-concept-nlds';
const AA_PHONE = '/nlds/images/arctic-airworks-hvac-industry-demo-mobile-site-nlds';

type Pick = { id: 'pl' | 'aa'; name: string; category: string; description: string; strengths: string[]; demoUrl: string; demoHost: string; study: string; img: string; phone: string; alt: string; phoneAlt: string };
const PICKS: Pick[] = [
  {
    id: 'pl',
    name: 'Precision Line Roofing',
    category: 'Roofing Website Concept',
    description: 'A premium Florida roofing concept built around homeowner trust, roof inspections and a clear path to requesting service.',
    strengths: ['Inspection-first conversion path', 'Premium charcoal and copper visual system', 'Trust-driven service structure'],
    demoUrl: 'https://precision-line-roofing-demo.netlify.app',
    demoHost: 'precision-line-roofing-demo.netlify.app',
    study: '/works/precision-line-roofing/',
    img: PL,
    phone: PL_PHONE,
    alt: 'Precision Line Roofing industry demo website, desktop view of the storm-ready roofing hero',
    phoneAlt: 'Precision Line Roofing industry demo website, phone view',
  },
  {
    id: 'aa',
    name: 'Arctic Airworks',
    category: 'HVAC Website Concept',
    description: 'An interactive HVAC concept built around Florida heat, whole-home comfort and system clarity.',
    strengths: ['Condenser transformation scroll hero', 'Whole-Home Comfort Network sequence', 'Mobile-first motion with a reduced-motion fallback'],
    demoUrl: 'https://arctic-airworks-demo.netlify.app',
    demoHost: 'arctic-airworks-demo.netlify.app',
    study: '/works/arctic-airworks/',
    img: AA,
    phone: AA_PHONE,
    alt: 'Arctic Airworks industry demo website, desktop view of the opened HVAC condenser hero',
    phoneAlt: 'Arctic Airworks industry demo website, phone view of the opened condenser',
  },
];

export default function HomeServicesFeatured() {
  const revealRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8, stagger: 0.14, start: 'top 80%', childSelector: '.lb-reveal' });
  const plScreen = useRef<HTMLDivElement>(null);

  // Precision Line keeps its existing lazy preview: tablet/desktop only, fetched near the viewport, plays while mostly visible, never under reduced motion.
  useEffect(() => {
    const screen = plScreen.current;
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
    <section id="home-services" aria-labelledby="home-services-heading" style={{ backgroundColor: 'var(--bg-soft)', borderTop: '1px solid var(--silver-grey)', borderBottom: '1px solid var(--silver-grey)', padding: 'clamp(56px, 9vw, 110px) 0' }}>
      <div className="container-nlds">
        <div ref={revealRef}>
          <div className="lb-reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
            <p className="eyebrow">FEATURED CONCEPTS</p>
            <p className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}>Home Services · Industry Demos</p>
          </div>
          <div className="lb-reveal mt-5"><SectionDivider /></div>

          <div className="lb-reveal mt-10 lg:mt-14" style={{ maxWidth: 760 }}>
            <h2 id="home-services-heading" className="font-serif" style={{ fontSize: 'clamp(1.875rem, 4.2vw, 3.25rem)', color: 'var(--charcoal)', lineHeight: 1.08, letterSpacing: '-0.015em' }}>
              Built for Local Service Businesses
            </h2>
            <p className="font-sans mt-5" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.7, maxWidth: 560 }}>
              Different industries need different customer journeys. These concepts show how strategy, design and motion change with the business.
            </p>
          </div>

          <div className="hs-pair mt-12 lg:mt-16">
            {PICKS.map((p) => (
              <article key={p.id} className={`hs-item hs-${p.id}`} aria-labelledby={`hs-${p.id}-name`}>
                <div className="hs-stage lb-reveal">
                  <div className="hs-mat">
                    <div className="lb-browser-wrap hs-browser-wrap">
                      <div className="lb-browser">
                        <div className="lb-bar" aria-hidden="true">
                          <span className="lb-dots"><i /><i /><i /></span>
                          <span className="lb-url">{p.demoHost}</span>
                        </div>
                        <div className="lb-screen" ref={p.id === 'pl' ? plScreen : undefined}>
                          <picture>
                            <source type="image/webp" srcSet={`${p.img}-w768.webp 768w, ${p.img}.webp 1440w`} sizes="(min-width: 1024px) 44vw, 90vw" />
                            <img src={`${p.img}.webp`} width={1440} height={900} alt={p.alt} loading="lazy" decoding="async" />
                          </picture>
                          {p.id === 'pl' && <video muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} disablePictureInPicture />}
                        </div>
                      </div>
                      <div className="lb-phone lb-phone-over hs-phone">
                        <img src={`${p.phone}-w768.webp`} width={780} height={1688} alt={p.phoneAlt} loading="lazy" decoding="async" />
                      </div>
                    </div>
                    <div className="lb-phone lb-phone-solo">
                      <img src={`${p.phone}-w768.webp`} width={780} height={1688} alt={p.phoneAlt} loading="lazy" decoding="async" />
                    </div>
                  </div>
                </div>

                <div className="hs-meta lb-reveal">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}>{p.category}</span>
                    <span className="font-sans uppercase" style={{ fontSize: '0.625rem', letterSpacing: '0.15em', color: 'var(--muted-text)', border: '1px solid var(--silver-grey)', padding: '2px 8px' }}>Industry Demo / Concept Build</span>
                  </div>
                  <h3 id={`hs-${p.id}-name`} className="font-serif mt-3" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}>{p.name}</h3>
                  <p className="font-sans mt-3" style={{ fontSize: '0.9375rem', color: 'var(--body-text)', lineHeight: 1.6, maxWidth: 480 }}>{p.description}</p>
                  <ul className="hs-strengths font-sans mt-4">
                    {p.strengths.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                  <div className="hs-ctas">
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary hs-btn">
                      View Concept <span aria-hidden="true">↗</span>
                      <span className="sr-only"> ({p.name} industry demo, opens in a new tab)</span>
                    </a>
                    <Link to={p.study} className="btn-secondary hs-btn">Case Study<span className="sr-only">: {p.name}</span></Link>
                  </div>
                  <p className="hs-note font-sans">Industry Demo &middot; Concept build by NLDS &middot; Not a client project.</p>
                </div>
              </article>
            ))}
          </div>

          <div className="lb-reveal hs-contrast mt-12 lg:mt-24">
            <h3 className="font-serif" style={{ fontSize: 'clamp(1.375rem, 2.6vw, 2rem)', color: 'var(--charcoal)', lineHeight: 1.15, letterSpacing: '-0.01em' }}>
              We don&rsquo;t design the same website twice.
            </h3>
            <div className="hs-contrast-grid font-sans">
              <p><strong>Precision Line</strong> Built around trust, inspections and homeowner confidence.</p>
              <p><strong>Arctic Airworks</strong> Built around comfort, system clarity and interactive storytelling.</p>
            </div>
            <p className="font-serif" style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>Same strategy discipline. Different business problem. Different solution.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

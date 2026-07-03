import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import ValueCard from '@/components/ValueCard';
import FramedImage from '@/components/FramedImage';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import DiagonalLine from '@/components/DiagonalLine';
import { MonitorIcon, FramesIcon, SupportIcon, PageIcon } from '@/components/icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO, { localBusinessSchema, websiteSchema } from '@/components/SEO';
import ScrollTriggerSequence from '@/components/ScrollTriggerSequence';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/nlds/images/dh-luxury-roofing-homepage-concept-nlds.png',
    alt: 'DH Luxury Roofing website concept',
    category: 'Roofing Contractor — Concept Build',
    title: 'DH Luxury Roofing',
    description: 'Most roofing sites look dated and aggressive. This concept shows the alternative — video-led hero, inspection CTA, and mobile-first lead capture.',
    link: { text: 'View Concept', to: '/works/dh-luxury-roofing' },
  },
  {
    image: '/nlds/images/volusia-legal-group-law-firm-website-concept-nlds.png',
    alt: 'Volusia Legal Group website concept',
    category: 'Law Firm — Concept Build',
    title: 'Volusia Legal Group',
    description: 'A professional-services concept built around clear practice-area messaging, trust signals, and an easy consultation request path for local clients.',
    link: { text: 'View Concept', to: '/works/volusia-legal-group' },
  },
  {
    image: '/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach.png',
    alt: 'Love Handles BBQ website concept',
    category: 'BBQ Catering & Food Truck — Concept Build',
    title: 'Love Handles BBQ',
    description: 'Booking was buried and mobile flow was weak. Rebuilt around catering inquiries, a food truck events page, and direct contact paths.',
    link: { text: 'View Concept', to: '/works/love-handles-bbq' },
  },
];

export default function Home() {
  const impressionRef = useRef<HTMLElement>(null);
  const impressionTextRef = useRef<HTMLDivElement>(null);
  const impressionPanelsRef = useRef<HTMLDivElement>(null);
  // Scroll reveals
  const servicesRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.service-card' });
  const worksRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.work-card' });

  // Split editorial parallax
  const splitRef = useRef<HTMLDivElement>(null);
  const splitImageRef = useRef<HTMLImageElement>(null);
  const whyTextRef = useRef<HTMLDivElement>(null);
  const workHeadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = splitRef.current;
    const image = splitImageRef.current;
    if (!container || !image) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: '-3%' },
        {
          y: '3%',
          ease: 'none',
          scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);


  // Why It Matters reveal
  useEffect(() => {
    const el = whyTextRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Selected Work heading reveal
  useEffect(() => {
    const el = workHeadingRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // "A Better First Impression" simple fade-up reveal
  useEffect(() => {
    const section = impressionRef.current;
    const textBlock = impressionTextRef.current;
    const panelsBlock = impressionPanelsRef.current;
    if (!section || !textBlock || !panelsBlock) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(textBlock.children, { opacity: 0, y: 24 });
      gsap.set(panelsBlock.children, { opacity: 0, y: 32 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      tl.to(textBlock.children, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
      }).to(
        panelsBlock.children,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.16,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <SEO
        title="Premium Websites for Local Businesses | NLDS"
        description="Premium websites, Website Care, Brand Direction, and Brand & Content Support for local businesses in Port Orange, Daytona Beach, Volusia County, and Central Florida."
        canonical="https://newlvlstudio.com/"
        jsonLd={[localBusinessSchema(), websiteSchema()]}
      />
      {/* ScrollTrigger visual hero — with desktop CTA overlay */}
      <ScrollTriggerSequence
        overlay={
          <div className="st-cta-panel">
            <p className="st-cta-kicker">Port Orange, Florida</p>
            <h2 className="st-cta-headline">Websites built to earn trust before the first call.</h2>
            <div className="st-cta-row">
              <Link to="/contact" className="btn-primary st-cta-btn">
                Get a Free Website Review
              </Link>
              <Link to="/works" className="btn-secondary st-cta-btn">
                View the Work
              </Link>
            </div>
          </div>
        }
      />

      {/* Hero copy + CTA — full section below ST visual on all breakpoints */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 10vw, 120px) 0' }}>
        <div className="container-nlds">
          <p className="eyebrow" style={{ fontSize: '0.8125rem' }}>Port Orange, Florida</p>
          <h1
            className="font-serif"
            style={{
              fontSize: 'clamp(2.75rem, 6.5vw, 5rem)',
              color: 'var(--charcoal)',
              lineHeight: 1.05,
              marginTop: 20,
              maxWidth: 900,
            }}
          >
            Premium Websites for Local Businesses in Port Orange, Daytona Beach, and Volusia County.
          </h1>
          <p
            className="font-sans"
            style={{
              fontSize: 'clamp(1.0625rem, 1.4vw, 1.375rem)',
              lineHeight: 1.65,
              color: 'var(--body-text)',
              maxWidth: 760,
              marginTop: 28,
            }}
          >
            New Level Design Studio builds premium websites for local businesses that need to look credible, get found, and turn visitors into real inquiries.
          </p>
          <div
            className="hero-cta-buttons flex flex-col sm:flex-row items-start sm:items-center"
            style={{ gap: 16, marginTop: 40 }}
          >
            <Link to="/contact" className="btn-primary w-full sm:w-auto">
              Get a Free Website Review
            </Link>
            <Link to="/works" className="btn-secondary w-full sm:w-auto">
              View the Work
            </Link>
          </div>
          <p
            className="font-sans"
            style={{
              fontSize: '0.8125rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted-text)',
              marginTop: 36,
            }}
          >
            Port Orange &nbsp;·&nbsp; Daytona Beach &nbsp;·&nbsp; Ormond Beach &nbsp;·&nbsp; New Smyrna Beach &nbsp;·&nbsp; Volusia County
          </p>
        </div>
      </section>

      {/* Resource callout — secondary editorial strip */}
      <section style={{ backgroundColor: 'var(--bg-soft)', borderTop: '1px solid var(--silver-grey)', borderBottom: '1px solid var(--silver-grey)', padding: 'clamp(40px, 5vw, 56px) 0' }}>
        <div className="container-nlds">
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center' }}
          >
            <div>
              <p className="eyebrow" style={{ fontSize: '0.6875rem' }}>FREE WEBSITE + SEO RESOURCES</p>
              <h2
                className="font-serif mt-4"
                style={{
                  fontSize: 'clamp(1.5rem, 2.75vw, 2.125rem)',
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                }}
              >
                Check Your Website and Local Visibility
              </h2>
              <p
                className="font-sans mt-4"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.65,
                  color: 'var(--muted-text)',
                  maxWidth: 480,
                }}
              >
                Use 12 free tools to check website speed, Google indexing, structured data, local search presence, visitor behavior, and technical performance.
              </p>
            </div>
            <div className="flex flex-col items-start lg:items-end" style={{ gap: 10 }}>
              <Link to="/free-seo-tools" className="btn-primary">
                Check Your Website
              </Link>
              <p
                className="font-sans"
                style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
              >
                No paid software required. Account-based tools are labeled clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section style={{ backgroundColor: 'var(--bg-soft)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '40px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '32px 40px' }}>
            <div>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: 'var(--muted-text)', marginBottom: 8 }}
              >
                Studio Location
              </p>
              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
                Port Orange, FL
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                Serving Volusia County &amp; Central Florida
              </p>
            </div>
            <div>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: 'var(--muted-text)', marginBottom: 8 }}
              >
                What We Build
              </p>
              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
                Websites That Earn Trust
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                First impressions, local structure, and clear inquiry paths
              </p>
            </div>
            <div>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: 'var(--muted-text)', marginBottom: 8 }}
              >
                Concept Builds
              </p>
              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
                10+ Portfolio Concepts
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                Portfolio concepts showing how local businesses could look online — not paying client work.
              </p>
            </div>
            <div>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: 'var(--muted-text)', marginBottom: 8 }}
              >
                Free Website Review
              </p>
              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
                No Commitment
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                We'll review your site and tell you exactly what's working and what isn't
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A Better First Impression */}
      <section
        ref={impressionRef}
        className="hero-next-section"
        style={{ backgroundColor: 'var(--bg-main)' }}
      >
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: editorial text */}
            <div ref={impressionTextRef} className="flex flex-col justify-center">
              <p
                className="font-sans uppercase"
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.25em',
                  color: 'var(--muted-text)',
                }}
              >
                First Impressions
              </p>
              <h2
                className="font-serif mt-5"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  color: 'var(--charcoal)',
                  lineHeight: 1.08,
                  maxWidth: 460,
                }}
              >
                Your first impression is already happening.
              </h2>
              <p
                className="font-sans mt-6"
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.65,
                  color: 'var(--body-text)',
                  maxWidth: 420,
                }}
              >
                Most people form an opinion in seconds. We help businesses own that moment — with a website that feels considered, a brand that feels confident, and visuals that feel like someone who cares made them.
              </p>
            </div>

            {/* Right: 3 clean stacked panels */}
            <div ref={impressionPanelsRef} className="flex flex-col" style={{ gap: 0 }}>
              {/* Panel 01 */}
              <div
                style={{
                  borderBottom: '1px solid var(--silver-grey)',
                  padding: '36px 0',
                }}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-sans shrink-0"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: 'var(--muted-text)',
                      minWidth: 22,
                    }}
                  >
                    01
                  </span>
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: '1.35rem',
                        color: 'var(--charcoal)',
                        lineHeight: 1.2,
                      }}
                    >
                      Website Design
                    </h3>
                    <p
                      className="font-sans mt-2"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--body-text)',
                        maxWidth: 320,
                      }}
                    >
                      Most visitors decide whether to call or scroll past within seconds. A professionally structured website is the clearest signal your business is worth contacting.
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel 02 */}
              <div
                style={{
                  borderBottom: '1px solid var(--silver-grey)',
                  padding: '36px 0',
                }}
              >
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-sans shrink-0"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: 'var(--muted-text)',
                      minWidth: 22,
                    }}
                  >
                    02
                  </span>
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: '1.35rem',
                        color: 'var(--charcoal)',
                        lineHeight: 1.2,
                      }}
                    >
                      Brand Direction
                    </h3>
                    <p
                      className="font-sans mt-2"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--body-text)',
                        maxWidth: 320,
                      }}
                    >
                      Scattered graphics and mismatched imagery quietly signal that no one is in charge. A unified visual system makes every touchpoint feel intentional.
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel 03 */}
              <div style={{ padding: '36px 0 0' }}>
                <div className="flex items-baseline gap-5">
                  <span
                    className="font-sans shrink-0"
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.15em',
                      color: 'var(--muted-text)',
                      minWidth: 22,
                    }}
                  >
                    03
                  </span>
                  <div>
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: '1.35rem',
                        color: 'var(--charcoal)',
                        lineHeight: 1.2,
                      }}
                    >
                      Brand & Content Support
                    </h3>
                    <p
                      className="font-sans mt-2"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--body-text)',
                        maxWidth: 320,
                      }}
                    >
                      Branded graphics, launch assets, and supporting content keep the website and the rest of the business looking consistent wherever customers encounter it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Local Businesses Work With NLDS */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHY LOCAL BUSINESSES WORK WITH NLDS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', maxWidth: 600, lineHeight: 1.15 }}
          >
            A clearer website, a sharper presence, and one direct path to more inquiries.
          </h2>
          <div className="mt-12">
            <SectionDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Founder-Led Studio
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Work directly with Michael Vail — no bloated agency handoff, no generic template process.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Built for Local Search
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Structured around services, locations, calls, quote requests, and the way customers actually browse.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Website-First System
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Strategy, copy, layout, visuals, launch support, and ongoing care handled as one connected presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Presence Image */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container-nlds">
          <img
            src="/nlds/images/port-orange-local-business-online-presence-system-websites-brand-visuals-video-nlds.png"
            alt="Website and brand visuals mockup"
            loading="lazy"
            className="img-muted"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </div>
      </section>

      {/* A Website Should Do More Than Exist */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT A WEBSITE SHOULD DO</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', maxWidth: 640, lineHeight: 1.15 }}
          >
            A website that works turns visitors into inquiries.
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 560 }}
          >
            A strong website should clarify what you do, build trust quickly, guide visitors toward action, and stay sharp after launch.
          </p>
          <div className="mt-12">
            <SectionDivider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <ValueCard
              title="Clear Message"
              description="Explain what you do in seconds. Visitors should know who you are, what you offer, and why it matters."
            />
            <ValueCard
              title="Premium Presentation"
              description="Look established before people compare. Clean design, sharp visuals, and consistent branding signal professionalism."
            />
            <ValueCard
              title="Local Visibility"
              description="Build the foundation for people in your market to find you. A structured, fast, and properly built site is the starting point for local search."
            />
            <ValueCard
              title="Ongoing Support"
              description="Keep the site sharp after launch. A website that never changes starts to feel forgotten."
            />
          </div>
        </div>
      </section>

      {/* What We Help Fix */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE HELP FIX</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 580 }}
          >
            Common Problems We Solve
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 560 }}
          >
            Most local businesses do not lose leads because they are bad at what they do. They lose trust when their online presence does not match the quality of their work.
          </p>
          <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {[
              'Outdated websites that make the business look smaller than it is',
              'Weak first impressions before customers call',
              'Inconsistent branding across website, Google, Facebook, and social posts',
              'No clear path from visitor to quote, booking, or contact',
              'Local competitors looking more credible online',
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5"
                style={{ borderBottom: '1px solid var(--silver-grey)', padding: '20px 0' }}
              >
                <span
                  className="font-sans shrink-0"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-sans" style={{ fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1.55 }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
          <Link to="/contact" className="btn-primary mt-10 inline-block">
            Get a Free Website Review
          </Link>
        </div>
      </section>

      {/* Local Trust Strip */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '24px 0' }}>
        <div className="container-nlds">
          <SectionDivider />
          <p
            className="font-sans text-center mt-6 uppercase"
            style={{ fontSize: '0.75rem', letterSpacing: '0.25em', color: 'var(--muted-text)' }}
          >
            Serving Port Orange, Daytona Beach, Ormond Beach, New Smyrna Beach, Volusia County &amp; Central Florida
          </p>
        </div>
      </section>

      {/* Core Services */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE DO</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', maxWidth: 600, lineHeight: 1.15 }}
          >
            Clean design, sharp content, and a direct path to more inquiries.
          </h2>
          <div className="mt-12">
            <SectionDivider />
          </div>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="service-card">
              <ServiceCard
                icon={<MonitorIcon />}
                title="Website Design"
                description="Custom-coded sites structured for your services, local area, and how customers search — built to turn visitors into direct inquiries."
                link={{ text: 'See Services', to: '/services' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<SupportIcon />}
                title="Website Care"
                description="Monthly updates, checks, and small fixes so the site stays credible after launch."
                link={{ text: 'See Services', to: '/services' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<FramesIcon />}
                title="Brand Direction"
                description="Visual identity, graphics, and web imagery that keep the business looking consistent and credible across platforms."
                link={{ text: 'See Services', to: '/services' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<PageIcon />}
                title="Brand & Content Support"
                description="Branded graphics, launch assets, and supporting content that keep the website and the rest of the business looking consistent."
                link={{ text: 'See Services', to: '/services' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div ref={whyTextRef} className="flex flex-col justify-center">
              <p className="eyebrow">WHY IT MATTERS</p>
              <h2
                className="font-serif mt-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
              >
                Credible design earns trust before the first call.
              </h2>
              <p
                className="font-sans mt-6"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
              >
                Most people decide how they feel about a business within seconds of landing on its website or seeing its content. We help local businesses earn that trust faster with clean design, clear messaging, and a visual system that feels sharp from the start.
              </p>
              <Link to="/contact" className="btn-primary mt-8 inline-block self-start">
                Get a Free Website Review
              </Link>
            </div>
            <div className="relative">
              <FramedImage src="/nlds/images/port-orange-local-business-storefront-first-impression-trust-new-level-design-studio.png" alt="Modern local business storefront" aspectRatio="4/3" />
              <DiagonalLine direction="tl-br" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder-Led Trust Block */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0' }}>
        <div className="container-nlds">
          <div
            style={{
              borderTop: '1px solid var(--silver-grey)',
              borderBottom: '1px solid var(--silver-grey)',
              padding: 'clamp(40px, 5vw, 56px) 0',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <p className="eyebrow">FOUNDER-LED STUDIO</p>
                <h2
                  className="font-serif mt-4"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                    color: 'var(--charcoal)',
                    lineHeight: 1.15,
                    maxWidth: 580,
                  }}
                >
                  Work directly with the person responsible for the strategy, design, and final
                  result.
                </h2>
                <p
                  className="font-sans mt-5"
                  style={{
                    fontSize: '1rem',
                    color: 'var(--muted-text)',
                    lineHeight: 1.65,
                    maxWidth: 560,
                  }}
                >
                  New Level Design Studio is led by Michael Vail in Port Orange, Florida. Every
                  project receives direct attention, clear communication, and a website-first
                  strategy built around stronger trust and better local visibility.
                </p>
                <Link to="/michael-vail" className="btn-primary mt-8 inline-block">
                  Meet Michael
                </Link>
              </div>
              <div className="lg:col-span-5 flex justify-start lg:justify-end">
                <img
                  src="/images/founder/michael-vail-founder-portrait-new-level-design-studio.webp"
                  alt="Michael Vail, founder and creative director of New Level Design Studio"
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    maxWidth: 280,
                    maxHeight: 380,
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The NLDS Method */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow text-center">THE NLDS METHOD</p>
          <h2
            className="font-serif text-center mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            A Clear Process for Building a Sharper Online Presence
          </h2>

          <div className="mt-16 flex flex-col" style={{ gap: 0 }}>
            {[
              { number: '01', title: 'Audit the Current Presence', description: 'We review what you have, what is working, and where the gaps are.' },
              { number: '02', title: 'Clarify the Offer', description: 'We define what you do, who you serve, and what makes your business the right choice.' },
              { number: '03', title: 'Structure the Website', description: 'We map pages, navigation, and content so visitors can find what they need without confusion.' },
              { number: '04', title: 'Design the Visual System', description: 'We build a clean, consistent look that feels sharp across every page and platform.' },
              { number: '05', title: 'Build and Launch', description: 'We code, test, refine, and launch a site that performs well and loads fast.' },
              { number: '06', title: 'Maintain and Improve', description: 'We keep the site updated, monitored, and ready to grow with your business.' },
            ].map((step, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
                style={{
                  borderTop: '1px solid var(--silver-grey)',
                  padding: '32px 0',
                }}
              >
                <span
                  className="font-serif shrink-0"
                  style={{
                    fontSize: '2rem',
                    color: 'var(--silver-grey)',
                    lineHeight: 1,
                    minWidth: 48,
                  }}
                >
                  {step.number}
                </span>
                <div className="flex-1">
                  <h3
                    className="font-sans font-semibold"
                    style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans mt-2"
                    style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 520 }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Editorial */}
      <section ref={splitRef} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Dark Panel */}
          <div
            className="flex flex-col justify-center"
            style={{ backgroundColor: 'var(--black-metal)', padding: 'clamp(60px, 8vw, 120px) clamp(40px, 5vw, 80px)' }}
          >
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--white)', lineHeight: 1.15 }}
            >
              Built for Local Businesses Competing for Stronger Online Presence.
            </h2>
            <p
              className="font-sans mt-6"
              style={{ fontSize: '1rem', color: 'var(--platinum-grey)', lineHeight: 1.6, maxWidth: 440 }}
            >
              From contractors and restaurants to beauty studios and real estate — we help local businesses across Volusia County build a sharper, more credible online presence.
            </p>
            <Link
              to="/contact"
              className="btn-primary mt-10 inline-block self-start"
            >
              Get a Free Website Review
            </Link>
          </div>

          {/* Photography */}
          <div className="relative overflow-hidden min-h-[280px] md:min-h-[400px] lg:min-h-[60vh]">
            <img
              ref={splitImageRef}
              src="/nlds/images/port-orange-local-businesses-established-online-presence-new-level-design-studio.png"
              alt="Row of local business storefronts"
              className="img-muted absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scale(1.06)' }}
              loading="lazy"
            />
            <DiagonalLine direction="bl-tr" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Capabilities Proof Strip */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '72px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE BUILD</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              {
                label: 'Mobile-First Websites',
                desc: 'Structured for how local customers actually search and browse — fast, clean, and built around a clear inquiry path.',
              },
              {
                label: 'Local SEO Structure',
                desc: 'On-page foundations, location pages, and schema markup that give your local market a real chance to find you.',
              },
              {
                label: 'Clear Inquiry Paths',
                desc: 'Quote requests, contact flows, and booking CTAs designed to reduce friction and generate real calls and messages.',
              },
              {
                label: 'Branded Visual Systems',
                desc: 'Logos, graphics, and imagery that stay consistent across your website, Google Business Profile, and social platforms.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 20 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                  {item.label}
                </h3>
                <p className="font-sans mt-2" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p
            className="font-sans mt-10 uppercase"
            style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)', lineHeight: 1.7 }}
          >
            Built for contractors, restaurants, coffee shops, salons, real estate, fitness, and local service providers
          </p>
          <p
            className="font-sans mt-2 uppercase"
            style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)', lineHeight: 1.7 }}
          >
            Port Orange &nbsp;·&nbsp; Daytona Beach &nbsp;·&nbsp; Ormond Beach &nbsp;·&nbsp; New Smyrna Beach &nbsp;·&nbsp; Volusia County
          </p>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div ref={workHeadingRef}>
            <p className="eyebrow">SELECTED WORK</p>
            <h2
              className="font-serif mt-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              A Few Projects Built to Raise the Standard
            </h2>
            <p
              className="font-sans mt-4"
              style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 520 }}
            >
              Concept builds and portfolio demos showing how NLDS structures stronger first impressions for service businesses, restaurants, contractors, law firms, real estate, wellness, and local brands.
            </p>
          </div>
          <div ref={worksRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {projects.map((project, i) => (
              <div key={i} className="work-card">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/works" className="btn-primary">View All Work</Link>
            <p
              className="font-sans"
              style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}
            >
              Restaurants, contractors, law firms, real estate, fitness, and more.
            </p>
          </div>
        </div>
      </section>

      {/* What Your Website Needs to Work */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WEBSITE SUCCESS CHECKLIST</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            What Your Website Needs to Work
          </h2>
          <div className="mt-12">
            <SectionDivider />
          </div>

          {/* 4 key pillars — always visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mt-12">
            {[
              { num: '01', title: 'Clear First Impression', desc: 'Visitors should understand who you are and why you matter within seconds of landing.' },
              { num: '04', title: 'Mobile-First Layout', desc: 'Built for the screen most of your customers are actually using to find you.' },
              { num: '06', title: 'Trust Signals', desc: 'Proof that builds confidence before the first conversation — portfolio, credentials, and social presence.' },
              { num: '09', title: 'Local SEO Foundation', desc: 'A properly structured site gives your local market a real chance to find you.' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-5"
                style={{
                  borderBottom: '1px solid var(--silver-grey)',
                  padding: '24px 0',
                }}
              >
                <span
                  className="font-sans shrink-0"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}
                >
                  {item.num}
                </span>
                <div>
                  <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                    {item.title}
                  </h3>
                  <p className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Full checklist — collapsed by default, preserved for SEO */}
          <details className="mt-6">
            <summary
              className="font-sans uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', cursor: 'pointer', userSelect: 'none', listStyle: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <span>See full checklist</span>
              <span style={{ fontSize: '0.625rem' }}>▼</span>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mt-4">
              {[
                { num: '02', title: 'Strong Headline', desc: 'Simple. Specific. Direct.' },
                { num: '03', title: 'Premium Brand Presentation', desc: 'Look established before people compare.' },
                { num: '05', title: 'Clear Service Structure', desc: 'Make the offer easy to understand.' },
                { num: '07', title: 'Clear Call to Action', desc: 'Give visitors one clear next step.' },
                { num: '08', title: 'Fast Load Speed', desc: 'Performance shapes perception.' },
                { num: '10', title: 'Ongoing Maintenance', desc: 'Keep the site sharp after launch.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-5"
                  style={{ borderBottom: '1px solid var(--silver-grey)', padding: '24px 0' }}
                >
                  <span
                    className="font-sans shrink-0"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                      {item.title}
                    </h3>
                    <p className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </section>

      {/* Launch Is Not the Finish Line */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow">AFTER LAUNCH</p>
              <h2
                className="font-serif mt-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
              >
                Websites Need Attention After Launch.
              </h2>
              <p
                className="font-sans mt-5"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
              >
                After your website goes live, it still needs small updates, checks, refinements, and support to stay sharp. Our Website Care plan helps local businesses keep their site maintained without needing a full redesign every time something changes.
              </p>
              <Link to="/contact" className="btn-primary mt-8 inline-block">
                Ask About Website Care
              </Link>
            </div>

            <div
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(32px, 4vw, 48px)',
              }}
            >
              <div className="flex items-baseline justify-between">
                <h3
                  className="font-serif"
                  style={{ fontSize: '1.5rem', color: 'var(--charcoal)' }}
                >
                  Website Care
                </h3>
                <span
                  className="font-sans"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
                >
                  Starting at $99/mo
                </span>
              </div>
              <div className="mt-4" style={{ width: '100%', height: 1, backgroundColor: 'var(--silver-grey)' }} />
              <ul className="mt-6 flex flex-col" style={{ gap: 12 }}>
                {[
                  'Monthly website check',
                  'Small content updates',
                  'Link and form checks',
                  'Basic performance review',
                  'Priority support',
                  'Ongoing site polish',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="font-sans shrink-0"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--silver-grey)',
                        marginTop: 2,
                      }}
                    >
                      —
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: '0.9375rem', color: 'var(--body-text)' }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Website Review CTA */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0' }}>
        <div className="container-nlds">
          <div
            style={{
              borderTop: '1px solid var(--silver-grey)',
              borderBottom: '1px solid var(--silver-grey)',
              padding: '48px 0',
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="eyebrow">FREE WEBSITE REVIEW</p>
                <h2
                  className="font-serif mt-4"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 440 }}
                >
                  Not sure what your site needs?
                </h2>
                <p
                  className="font-sans mt-4"
                  style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 440 }}
                >
                  Send your current website and I'll review the first impression, mobile layout, CTA path, and local SEO foundation — and let you know what I'd change.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <Link to="/contact" className="btn-primary">
                  Get a Free Website Review
                </Link>
                <p
                  className="font-sans mt-3"
                  style={{ fontSize: '0.75rem', color: 'var(--muted-text)', letterSpacing: '0.05em' }}
                >
                  No commitment. Just a direct, honest look.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA buttonText="Get a Free Website Review" />

    </div>
  );
}

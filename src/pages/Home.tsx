import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import ValueCard from '@/components/ValueCard';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import DiagonalLine from '@/components/DiagonalLine';
import { MonitorIcon, FramesIcon, SupportIcon, PageIcon } from '@/components/icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO, { localBusinessSchema, websiteSchema } from '@/components/SEO';
import VideoHero from '@/components/VideoHero';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import { EXTERNAL_LINKS } from '@/lib/links';
import { getLenis } from '@/hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    image: '/nlds/images/dh-luxury-roofing-homepage-concept-nlds-w768.webp',
    alt: 'DH Luxury Roofing website concept',
    category: 'Roofing Contractor — Concept Build',
    title: 'DH Luxury Roofing',
    description: 'Most roofing sites look dated and aggressive. This concept shows the alternative — video-led hero, inspection CTA, and mobile-first lead capture.',
    link: { text: 'View Concept', to: '/works/dh-luxury-roofing/' },
  },
  {
    image: '/nlds/images/volusia-legal-group-law-firm-website-concept-nlds-w768.webp',
    alt: 'Volusia Legal Group website concept',
    category: 'Law Firm — Concept Build',
    title: 'Volusia Legal Group',
    description: 'A professional-services concept built around clear practice-area messaging, trust signals, and an easy consultation request path for local clients.',
    link: { text: 'View Concept', to: '/works/volusia-legal-group/' },
  },
  {
    image: '/nlds/images/love-handles-bbq-catering-website-demo-ormond-beach-w768.webp',
    alt: 'Love Handles BBQ website concept',
    category: 'BBQ Catering & Food Truck — Concept Build',
    title: 'Love Handles BBQ',
    description: 'Booking was buried and mobile flow was weak. Rebuilt around catering inquiries, a food truck events page, and direct contact paths.',
    link: { text: 'View Concept', to: '/works/love-handles-bbq/' },
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
  const workHeadingRef = useRef<HTMLDivElement>(null);
  const reviewsHeadingRef = useRef<HTMLDivElement>(null);

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


  // Hash links (/#what-we-build, /#leadstrike, nav Systems items) scroll to their section.
  // Delayed so it runs after the global scroll-to-top on route change (same pattern as Services).
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -100, immediate: reduce });
      else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash]);

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

  // Client Reviews heading reveal
  useEffect(() => {
    const el = reviewsHeadingRef.current;
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

  // "Where Local Businesses Lose Opportunities" simple fade-up reveal
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
        description="Websites, redesign, care, brand direction, and copy & visual support for local businesses in Port Orange, Daytona Beach, Volusia County, and Central Florida."
        canonical="https://newlvlstudio.com/"
        jsonLd={[localBusinessSchema(), websiteSchema()]}
      />
      {/* Video hero */}
      <VideoHero />

      {/* Resource callout — secondary editorial strip */}
      <section style={{ backgroundColor: 'var(--bg-soft)', borderTop: '1px solid var(--silver-grey)', borderBottom: '1px solid var(--silver-grey)', padding: 'clamp(40px, 5vw, 56px) 0' }}>
        <div className="container-nlds">
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 'clamp(24px, 4vw, 48px)', alignItems: 'center' }}
          >
            <div>
              <p className="eyebrow" style={{ fontSize: '0.6875rem' }}>FREE BUSINESS VISIBILITY TOOLS</p>
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
              <Link to="/free-seo-tools/" className="btn-primary">
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
                Founder-Led Studio
              </p>
              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
                Port Orange, Florida
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                Direct work with Michael Vail — no agency handoff
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
                Built Around Real Business Problems
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                Websites, lead systems, and workflows designed around how local businesses actually operate.
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
                10+ Independent Concept Builds
              </p>
              <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5 }}>
                Built by NLDS to show the strategy, structure, and design direction we bring to local businesses
              </p>
            </div>
            <div>
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.625rem', letterSpacing: '0.22em', color: 'var(--muted-text)', marginBottom: 8 }}
              >
                Google Business Profile
              </p>
              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
                Verified Local Business
              </p>
              <a
                href={EXTERNAL_LINKS.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans"
                style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', marginTop: 4, lineHeight: 1.5, display: 'inline-block', textDecoration: 'underline', textUnderlineOffset: 3 }}
              >
                View our profile on Google →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Where Local Businesses Lose Opportunities */}
      <section
        ref={impressionRef}
        className="hero-next-section"
        style={{ backgroundColor: 'var(--bg-main)' }}
      >
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: heading */}
            <div ref={impressionTextRef} className="flex flex-col justify-center">
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                  color: 'var(--charcoal)',
                  lineHeight: 1.08,
                  maxWidth: 460,
                }}
              >
                Where Local Businesses Lose Opportunities
              </h2>
            </div>

            {/* Right: 3 stacked panels */}
            <div ref={impressionPanelsRef} className="flex flex-col" style={{ gap: 0 }}>
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
                      Get Found
                    </h3>
                    <p
                      className="font-sans uppercase mt-1"
                      style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: 'var(--muted-text)' }}
                    >
                      Website &amp; Visibility
                    </p>
                    <p
                      className="font-sans mt-2"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--body-text)',
                        maxWidth: 320,
                      }}
                    >
                      Make it easy for customers to understand the business, trust it, and contact it.
                    </p>
                  </div>
                </div>
              </div>
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
                      Respond
                    </h3>
                    <p
                      className="font-sans uppercase mt-1"
                      style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: 'var(--muted-text)' }}
                    >
                      Lead Response
                    </p>
                    <p
                      className="font-sans mt-2"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--body-text)',
                        maxWidth: 320,
                      }}
                    >
                      Capture new inquiries and make sure hot leads don&rsquo;t sit unanswered.
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: '36px 0 0',
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
                      Operate
                    </h3>
                    <p
                      className="font-sans uppercase mt-1"
                      style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: 'var(--muted-text)' }}
                    >
                      Business Workflows
                    </p>
                    <p
                      className="font-sans mt-2"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--body-text)',
                        maxWidth: 320,
                      }}
                    >
                      Reduce repetitive tasks and connect processes that currently depend on manual work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Why Local Businesses Work With NLDS */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
        <div className="container-nlds">
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', maxWidth: 600, lineHeight: 1.15 }}
          >
            Why Local Businesses Work With NLDS
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
                Built for Local Businesses
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Structured around services, locations, calls, quote requests, and the way customers actually browse.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Practical Before Complex
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                We start with the simplest fix that solves the problem and add tools only when they earn their place.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Clear Scope &amp; Pricing
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Starter, Core, and Pro Website packages make it clear what you're getting and what it costs.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Built to Connect
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Websites, forms, inboxes, and lead notifications set up to work together instead of as separate pieces.
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
              <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                Ongoing Support
              </h3>
              <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                Every launch includes 90 days of review and fine-tuning, with Website Care available after that.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Presence Image */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(40px, 6vw, 80px) 0' }}>
        <div className="container-nlds">
          <img
            src="/nlds/images/website-care-after-launch-proof-wynne-iaconis-realty-nlds.webp"
            srcSet="/nlds/images/website-care-after-launch-proof-wynne-iaconis-realty-nlds-w768.webp 768w, /nlds/images/website-care-after-launch-proof-wynne-iaconis-realty-nlds.webp 1672w"
            sizes="(max-width: 768px) 100vw, 1200px"
            width={1672}
            height={941}
            decoding="async"
            alt="Website Care proof graphic showing a custom realtor website by New Level Design Studio"
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
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
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
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
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
            Most local businesses do not lose leads because they are bad at what they do.
          </p>
          <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {[
              'Website does not reflect the quality of the business',
              'Customers cannot quickly understand what the company offers',
              'New inquiries sit too long before someone responds',
              'Staff repeatedly copy information between tools',
              'Important follow-ups depend on someone remembering',
              'Website, forms, inbox, calendar, and other tools operate separately',
              'No clear view of what needs attention',
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
          <Link to="/contact/" className="btn-primary mt-10 inline-block">
            See What We Can Improve
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
          <p
            className="font-sans text-center mt-2 uppercase"
            style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)', lineHeight: 1.7 }}
          >
            Built for contractors, restaurants, coffee shops, salons, real estate, fitness, and local service providers
          </p>
        </div>
      </section>

      {/* What We Build */}
      <section id="what-we-build" style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
        <div className="container-nlds">
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', maxWidth: 600, lineHeight: 1.15 }}
          >
            What We Build
          </h2>
          <div className="mt-12">
            <SectionDivider />
          </div>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="service-card">
              <ServiceCard
                icon={<MonitorIcon />}
                title="Websites"
                description="Custom websites designed around trust, local visibility, and conversion."
                link={{ text: 'See Services', to: '/services/' }}
              />
            </div>
            <div id="lead-systems" className="service-card">
              <ServiceCard
                icon={<FramesIcon />}
                title="Lead Systems"
                description="Systems that capture, route, notify, and help businesses respond to incoming leads faster."
              />
            </div>
            <div id="business-workflows" className="service-card">
              <ServiceCard
                icon={<PageIcon />}
                title="Business Workflows"
                description="Practical automations for repetitive processes, follow-up, reporting, and information movement."
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<SupportIcon />}
                title="Website & System Care"
                description="Ongoing checks, maintenance, improvements, and support."
                link={{ text: 'See Website Care', to: '/website-care/' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* LeadStrike */}
      <section id="leadstrike" ref={splitRef} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Dark Panel */}
          <div
            className="flex flex-col justify-center"
            style={{ backgroundColor: 'var(--black-metal)', padding: 'clamp(60px, 8vw, 120px) clamp(40px, 5vw, 80px)' }}
          >
            <p
              className="font-sans uppercase"
              style={{ fontSize: '0.6875rem', letterSpacing: '0.25em', color: 'var(--platinum-grey)', marginBottom: 16 }}
            >
              LeadStrike
            </p>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--white)', lineHeight: 1.15 }}
            >
              A Hot Lead Shouldn&rsquo;t Wait for Somebody to Notice It.
            </h2>
            <p
              className="font-sans mt-6"
              style={{ fontSize: '1rem', color: 'var(--platinum-grey)', lineHeight: 1.6, maxWidth: 440 }}
            >
              LeadStrike helps local service businesses capture incoming inquiries, route them correctly, and make sure someone knows when a lead needs attention.
            </p>
            <Link
              to="/contact/"
              className="btn-primary mt-10 inline-block self-start"
            >
              Explore LeadStrike
            </Link>
          </div>

          {/* Photography */}
          <div className="relative overflow-hidden min-h-[280px] md:min-h-[400px] lg:min-h-[60vh]">
            <img
              ref={splitImageRef}
              src="/nlds/images/port-orange-local-businesses-established-online-presence-new-level-design-studio.webp"
              srcSet="/nlds/images/port-orange-local-businesses-established-online-presence-new-level-design-studio-w768.webp 768w, /nlds/images/port-orange-local-businesses-established-online-presence-new-level-design-studio.webp 1672w"
              sizes="(max-width: 768px) 100vw, 1200px"
              width={1672}
              height={941}
              decoding="async"
              alt="Row of local business storefronts"
              className="img-muted absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scale(1.06)' }}
              loading="lazy"
            />
            <DiagonalLine direction="bl-tr" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Founder-Led Trust Block */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(48px, 8vw, 80px) 0' }}>
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
                  Work directly with the person responsible for the strategy, build, and final
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
                  New Level Design Studio is founder-led by Michael Vail. That means the
                  strategy, design direction, and quality control do not get passed through
                  layers of account managers. You work directly with someone focused on making
                  your business clearer to customers and easier to run — from the website to
                  how new inquiries are handled.
                </p>
                <Link to="/michael-vail/" className="btn-primary mt-8 inline-block">
                  Meet Michael
                </Link>
              </div>
              <div className="lg:col-span-5 flex justify-start lg:justify-end">
                <img
                  src="/images/founder/michael-vail-founder-portrait-new-level-design-studio.webp"
                  srcSet="/images/founder/michael-vail-founder-portrait-new-level-design-studio-w560.webp 560w, /images/founder/michael-vail-founder-portrait-new-level-design-studio.webp 1024w"
                  sizes="280px"
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
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
        <div className="container-nlds">
          <p className="eyebrow text-center">THE NLDS METHOD</p>
          <h2
            className="font-serif text-center mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Find the Bottleneck. Build the Fix. Measure What Changed.
          </h2>

          <div className="mt-16 flex flex-col" style={{ gap: 0 }}>
            {[
              { number: '01', title: 'Understand', description: 'We learn how the business runs today: how customers find you, how inquiries arrive, and who handles what.' },
              { number: '02', title: 'Identify', description: 'We pinpoint the bottleneck that costs the most, whether that is the website, lead response, or repeated manual work.' },
              { number: '03', title: 'Simplify', description: 'We narrow the fix to the smallest change that solves the problem.' },
              { number: '04', title: 'Build', description: 'We build the website, lead system, or workflow around how your team already works.' },
              { number: '05', title: 'Test', description: 'We test it with realistic scenarios before it goes live.' },
              { number: '06', title: 'Improve', description: 'After launch, we look at what changed and keep refining.' },
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
                    color: '#82827d',
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


      {/* Package Preview — compact pricing transparency, full detail on /packages */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
        <div className="container-nlds">
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 560 }}
          >
            Website Packages
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              {
                name: 'Starter Website',
                price: '$499',
                note: 'Starting at',
                fit: 'A clean one-page website for a new or small local business.',
                popular: false,
              },
              {
                name: 'Core Website',
                price: '$899',
                note: 'Starting at',
                fit: 'The best fit for most local businesses that need clearer services and stronger trust.',
                popular: true,
              },
              {
                name: 'Pro Website',
                price: '$1,499',
                note: 'Starting at',
                fit: 'A deeper website system for multi-service or higher-ticket businesses.',
                popular: false,
              },
              {
                name: 'Website Care',
                price: '$99/mo',
                note: 'From',
                fit: 'Monthly updates and checks that keep the site sharp after launch.',
                popular: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                style={{
                  borderTop: tier.popular ? '2px solid var(--charcoal)' : '1px solid var(--silver-grey)',
                  paddingTop: 20,
                }}
              >
                {tier.popular && (
                  <p
                    className="font-sans uppercase"
                    style={{ fontSize: '0.625rem', letterSpacing: '0.2em', color: 'var(--charcoal)', marginBottom: 8 }}
                  >
                    Most Popular
                  </p>
                )}
                <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                  {tier.name}
                </h3>
                <p className="font-serif mt-2" style={{ fontSize: '1.75rem', color: 'var(--charcoal)', lineHeight: 1 }}>
                  {tier.price}
                  <span className="font-sans" style={{ fontSize: '0.6875rem', letterSpacing: '0.1em', color: 'var(--muted-text)', marginLeft: 8, textTransform: 'uppercase' }}>
                    {tier.note}
                  </span>
                </p>
                <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                  {tier.fit}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/packages/" className="btn-primary">View All Packages</Link>
            <p className="font-sans" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}>
              Every build includes launch support and First 90 Days check-ins.
            </p>
          </div>
          <div
            className="mt-10 flex flex-wrap items-center gap-4"
            style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 28 }}
          >
            <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--charcoal)', lineHeight: 1.3 }}>
              Looking for LeadStrike or a custom business system?
            </p>
            <Link to="/contact/" className="btn-secondary">See What We Can Improve</Link>
          </div>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
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
              Concept builds created by New Level Design Studio to show the strategy, structure, and design direction we would bring to this type of local business — and how a stronger website improves trust, clarity, and customer decision-making.
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
            <Link to="/works/" className="btn-primary">View All Work</Link>
            <p
              className="font-sans"
              style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}
            >
              Restaurants, contractors, law firms, real estate, fitness, and more.
            </p>
          </div>
        </div>
      </section>

      {/* What Clients Say */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
        <div className="container-nlds">
          <div ref={reviewsHeadingRef}>
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              What Clients Say
            </h2>
            <p
              className="font-sans mt-4"
              style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 520 }}
            >
              Real feedback from businesses we&rsquo;ve worked with.
            </p>
            <div className="mt-12">
              <TestimonialCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Launch Is Not the Finish Line */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(56px, 9vw, 100px) 0' }}>
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
              <Link to="/contact/" className="btn-primary mt-8 inline-block">
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

      {/* Universal CTA */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(48px, 8vw, 80px) 0' }}>
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
                <h2
                  className="font-serif"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 440 }}
                >
                  Not Sure What Needs Fixing First?
                </h2>
                <p
                  className="font-sans mt-4"
                  style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 440 }}
                >
                  Tell us where the business feels slow, disconnected, outdated, or overly manual. We&rsquo;ll look at the problem and tell you what we&rsquo;d improve first.
                </p>
              </div>
              <div className="flex flex-col items-start lg:items-end">
                <Link to="/contact/" className="btn-primary">
                  See What We Can Improve
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
      <FinalCTA
        heading="Something in Your Business Could Work Better."
        body="It might be your website. It might be how leads are handled. It might be a process your team repeats every day. Start with the problem — we'll figure out whether there's a practical way to improve it."
        buttonText="See What We Can Improve"
      />

    </div>
  );
}

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ServiceCard from '@/components/ServiceCard';
import ProjectCard from '@/components/ProjectCard';
import FramedImage from '@/components/FramedImage';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import ProcessSection from '@/components/ProcessSection';
import DiagonalLine from '@/components/DiagonalLine';
import { MonitorIcon, FramesIcon, PlayIcon } from '@/components/icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { number: '01', title: 'Discover', description: 'We learn about your business, your audience, and what makes you different.' },
  { number: '02', title: 'Design', description: 'We craft a visual system and website structure that fits your brand.' },
  { number: '03', title: 'Build', description: 'We bring it to life with clean code, sharp content, and fast performance.' },
  { number: '04', title: 'Launch', description: 'We go live and make sure everything works the way it should.' },
];

const projects = [
  { image: '/images/project-1.jpg', category: 'Branding', title: 'Brand Refresh', description: 'A polished visual system for a local business ready to stand out.' },
  { image: '/images/project-2.jpg', category: 'Website', title: 'Website Launch', description: 'A clean, fast website designed to convert visitors into customers.' },
  { image: '/images/project-3.jpg', category: 'Content', title: 'Content System', description: 'Short-form content strategy and production for social growth.' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroLineRef = useRef<SVGPathElement>(null);
  const heroTaglineRef = useRef<HTMLSpanElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ delay: 0.3 });

    // Media frame
    tl.fromTo(
      heroMediaRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
    );

    // Diagonal line
    if (heroLineRef.current) {
      const length = heroLineRef.current.getTotalLength();
      tl.fromTo(
        heroLineRef.current,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
        0.3
      );
    }

    // Tagline text
    tl.fromTo(
      heroTaglineRef.current,
      { opacity: 0, letterSpacing: '0.5em' },
      { opacity: 1, letterSpacing: '0.15em', duration: 1, ease: 'power2.out' },
      0.8
    );

    // Title
    tl.fromTo(
      heroTitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0.5
    );

    // Subtitle
    tl.fromTo(
      heroSubtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    // CTAs
    tl.fromTo(
      heroCtaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );

    return () => { tl.kill(); };
  }, []);

  // Scroll reveals
  const servicesRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.service-card' });
  const worksRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.work-card' });

  // Split editorial parallax
  const splitRef = useRef<HTMLDivElement>(null);
  const splitImageRef = useRef<HTMLImageElement>(null);

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

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', paddingTop: 120, paddingBottom: 80 }}>
        <div className="container-nlds flex flex-col items-center">
          {/* Hero Media Frame */}
          <div ref={heroMediaRef} className="relative w-full" style={{ maxWidth: 1000, opacity: 0 }}>
            <div
              className="relative overflow-hidden"
              style={{
                padding: 8,
                backgroundColor: 'var(--silver-grey)',
                borderRadius: 4,
              }}
            >
              <img
                src="/images/hero-media.jpg"
                alt="Premium creative studio space"
                className="w-full object-cover"
                style={{ aspectRatio: '16/9', display: 'block' }}
              />
              {/* Diagonal line + tagline on right edge */}
              <div
                className="absolute right-0 top-0 bottom-0 flex items-center justify-center"
                style={{ width: 40, marginRight: 8 }}
              >
                <svg
                  viewBox="0 0 30 1000"
                  preserveAspectRatio="none"
                  className="absolute inset-0 w-full h-full"
                  style={{ opacity: 0.1 }}
                >
                  <path
                    ref={heroLineRef}
                    d="M15,0 L15,1000"
                    stroke="var(--blue-dolphin)"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
                <span
                  ref={heroTaglineRef}
                  className="font-serif italic relative whitespace-nowrap"
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    transform: 'rotate(180deg)',
                    fontSize: '1.25rem',
                    letterSpacing: '0.15em',
                    color: 'var(--charcoal)',
                    opacity: 0,
                  }}
                >
                  Raise the Standard.
                </span>
              </div>
            </div>
          </div>

          {/* Hero Title Block */}
          <div className="text-center mt-12" style={{ maxWidth: 800 }}>
            <h1
              ref={heroTitleRef}
              className="font-serif"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
                opacity: 0,
              }}
            >
              Your Website Is the Front Door to Your Business
            </h1>
            <p
              ref={heroSubtitleRef}
              className="font-sans mx-auto mt-6"
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--muted-text)',
                maxWidth: 560,
                opacity: 0,
              }}
            >
              We build premium websites, visuals, and short-form content for local businesses ready to look bigger, sharper, and easier to trust online.
            </p>
            <div ref={heroCtaRef} className="flex flex-col sm:flex-row items-center justify-center mt-10" style={{ gap: 16, opacity: 0 }}>
              <Link to="/contact" className="btn-primary">Start a Project</Link>
              <Link to="/works" className="btn-secondary">View Our Work</Link>
            </div>
          </div>
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
            Serving Port Orange, Daytona Beach, Volusia County &amp; Central Florida
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
            Clean design, sharp content, and a better first impression.
          </h2>
          <div className="mt-12">
            <SectionDivider />
          </div>
          <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="service-card">
              <ServiceCard
                icon={<MonitorIcon />}
                title="Website Design"
                description="Clean, mobile-friendly websites built to help local businesses look established and easy to contact."
                link={{ text: 'Learn More', to: '/services' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<FramesIcon />}
                title="Brand Visuals"
                description="Polished image systems, graphics, and visuals that keep your business consistent across web and social."
                link={{ text: 'Learn More', to: '/services' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<PlayIcon />}
                title="Short-Form Video"
                description="Vertical content for Reels, TikTok, Facebook, websites, and campaigns that need motion and attention."
                link={{ text: 'Learn More', to: '/services' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <p className="eyebrow">WHY IT MATTERS</p>
              <h2
                className="font-serif mt-4"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
              >
                A Better First Impression Builds Trust Before the First Call.
              </h2>
              <p
                className="font-sans mt-6"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
              >
                Most people decide how they feel about a business within seconds of landing on its website or seeing its content. We help local businesses earn that trust faster with clean design, clear messaging, and a visual system that feels sharp from the start.
              </p>
              <Link to="/contact" className="btn-primary mt-8 inline-block self-start">
                Start a Project
              </Link>
            </div>
            <div className="relative">
              <FramedImage src="/images/why-it-matters.jpg" alt="Architectural precision" aspectRatio="4/3" />
              <DiagonalLine direction="tl-br" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection steps={processSteps} />

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
              Built for Local Businesses Ready to Look Bigger.
            </h2>
            <p
              className="font-sans mt-6"
              style={{ fontSize: '1rem', color: 'var(--platinum-grey)', lineHeight: 1.6, maxWidth: 440 }}
            >
              From contractors and restaurants to beauty studios and real estate — we help local businesses across Volusia County build a sharper, more credible online presence.
            </p>
            <Link
              to="/contact"
              className="btn-secondary mt-10 inline-block self-start"
              style={{ borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              Start a Project
            </Link>
          </div>

          {/* Photography */}
          <div className="relative overflow-hidden min-h-[280px] md:min-h-[400px] lg:min-h-[60vh]">
            <img
              ref={splitImageRef}
              src="/images/split-editorial.jpg"
              alt="Urban cityscape"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scale(1.06)' }}
            />
            <DiagonalLine direction="bl-tr" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* Selected Work Preview */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">SELECTED WORK</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            A Few Projects Built to Raise the Standard
          </h2>
          <div ref={worksRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {projects.map((project, i) => (
              <div key={i} className="work-card">
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />

    </div>
  );
}

import FinalCTA from '@/components/FinalCTA';
import { SOCIAL_LINKS } from '@/lib/socialLinks';
import { getCategoryDisplayLabel } from '@/lib/categoryDisplayLabels';
import FramedImage from '@/components/FramedImage';
import EditorialImageReveal from '@/components/EditorialImageReveal';
import DiagonalLine from '@/components/DiagonalLine';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SEO from '@/components/SEO';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { getArticlesSortedByDate } from '@/data/articles';

gsap.registerPlugin(ScrollTrigger);

// Original principles — restored
const principles = [
  { number: '01', title: 'Clarity Over Noise', description: 'We strip away the unnecessary so your message comes through clean and strong.' },
  { number: '02', title: 'Design With Purpose', description: "Every element serves a function. Nothing is decorative for decoration's sake." },
  { number: '03', title: 'Built for Real People', description: 'We design for your customers — not for design awards. Usability always comes first.' },
];

const foundationPoints = [
  {
    title: 'Your Website Is Your First Impression',
    desc: 'Customers decide in seconds whether your business looks credible. A clean, well-structured site makes that moment work in your favor.',
  },
  {
    title: 'Visuals That Work Across Every Platform',
    desc: 'Your website, Google Business Profile, and social content need to feel connected. We build the visual system that holds it all together.',
  },
  {
    title: 'Content That Keeps Working',
    desc: 'Strong branding and clear visual direction make every future campaign, promotion, and piece of content easier and more effective.',
  },
];


const processSteps = [
  { number: '01', title: 'Discover', description: 'You share your goals, your customer, and where you need to show up.' },
  { number: '02', title: 'Build', description: 'We design your website, visuals, or content around a clear creative direction.' },
  { number: '03', title: 'Launch', description: 'You receive polished, ready-to-use files and a presence built to earn trust.' },
];

function JournalSection() {
  const recentArticles = getArticlesSortedByDate().slice(0, 6);

  return (
    <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
      <div className="container-nlds">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="eyebrow">The Journal</p>
            <h2
              className="font-serif mt-4"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              Ideas on Design, Marketing,<br />and Local Business.
            </h2>
          </div>
          <Link to="/journal/" className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>
            All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--border-color)' }}>
          {recentArticles.map((article) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}/`}
              style={{
                backgroundColor: 'var(--bg-soft)',
                padding: '40px 36px',
                textDecoration: 'none',
                display: 'block',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-main)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--bg-soft)'; }}
            >
              <p
                className="font-sans"
                style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-text)' }}
              >
                {getCategoryDisplayLabel(article.category)}
              </p>
              <h3
                className="font-serif mt-3"
                style={{ fontSize: 'clamp(1.125rem, 2vw, 1.375rem)', color: 'var(--charcoal)', lineHeight: 1.2 }}
              >
                {article.title}
              </h3>
              <p
                className="font-sans mt-3"
                style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {article.excerpt}
              </p>
              <p
                className="font-sans mt-6"
                style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', letterSpacing: '0.05em' }}
              >
                {article.date}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Studio() {
  // Original scroll reveals — restored
  const aboutRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, stagger: 0.2, start: 'top 75%' });
  const principlesRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.principle-card' });

  const foundationRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.foundation-point' });
  const processRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.process-step' });

  // Original split parallax — restored
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
        { y: '3%', ease: 'none', scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: true } }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <SEO
        title="About the Studio | New Level Design Studio"
        description="Learn how New Level Design Studio helps local businesses build credible websites, clear brand direction, and ongoing website care."
        canonical="https://newlvlstudio.com/studio"
      />

      {/* 1. Hero — original centered layout */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 80 }}>
        <motion.div
          className="container-nlds"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>THE STUDIO</motion.p>
          <motion.h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)', maxWidth: 720 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            A Cleaner Standard for How Local Businesses Show Up Online.
          </motion.h1>
          <motion.p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 560 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            New Level Design Studio is based in Port Orange, Florida. We build premium websites,
            clear brand direction, and supporting content for local businesses across Volusia
            County and Central Florida.
          </motion.p>
        </motion.div>

        <div className="container-nlds">
          <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto' }}>
            <EditorialImageReveal
              src="/nlds/images/stone-timber-remodeling-website-design-showcase.webp"
              srcSet="/nlds/images/stone-timber-remodeling-website-design-showcase-w768.webp 768w, /nlds/images/stone-timber-remodeling-website-design-showcase.webp 1536w"
              sizes="(max-width: 1024px) 100vw, 1000px"
              width={1536}
              height={1024}
              alt="Stone & Timber Remodeling website design with modern remodeling services homepage"
              className="mt-8"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. About — original layout restored */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div ref={aboutRef} className="flex flex-col justify-center">
              <h2
                className="font-serif"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
              >
                We Believe Local Businesses Deserve Better Design.
              </h2>
              <p
                className="font-sans mt-6"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
              >
                New Level Design Studio was built to help local businesses in Port Orange, Daytona
                Beach, and across Volusia County look as professional online as they are in person.
                We combine clean design, sharp content, and strategic thinking to create websites
                and visuals that earn trust from the first impression.
              </p>
              <div className="flex flex-wrap items-center mt-8" style={{ gap: '12px 24px' }}>
                <Link to="/works/" className="btn-secondary inline-block">
                  See our work
                </Link>
                <Link
                  to="/michael-vail/"
                  className="font-sans no-underline transition-colors duration-200"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)', letterSpacing: '0.02em' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                >
                  Meet Michael Vail →
                </Link>
              </div>
            </div>
            <div className="relative">
              <FramedImage
                src="/files/nlds/images/new-level-design-studio-website-brand-content-system-port-orange-fl.webp"
                srcSet="/files/nlds/images/new-level-design-studio-website-brand-content-system-port-orange-fl-w768.webp 768w, /files/nlds/images/new-level-design-studio-website-brand-content-system-port-orange-fl.webp 1254w"
                sizes="(max-width: 1024px) 100vw, 500px"
                alt="Website and brand content system"
                objectFit="contain"
                parallax={false}
              />
              <DiagonalLine direction="tl-br" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. We Build the Foundation — original split + proof points */}
      <section ref={splitRef} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div
            className="flex flex-col justify-center"
            style={{ backgroundColor: 'var(--black-metal)', padding: 'clamp(60px, 8vw, 120px) clamp(40px, 5vw, 80px)' }}
          >
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--white)', lineHeight: 1.15 }}
            >
              We Build the Foundation That Makes Everything Else Easier.
            </h2>
            <p
              className="font-sans mt-6"
              style={{ fontSize: '1rem', color: 'var(--platinum-grey)', lineHeight: 1.6, maxWidth: 440 }}
            >
              A strong website and clear visual system don't just look good — they make every
              marketing effort, every customer interaction, and every piece of content work harder
              for your business.
            </p>
            <div ref={foundationRef} className="mt-10 flex flex-col gap-8">
              {foundationPoints.map((pt, i) => (
                <div key={i} className="foundation-point">
                  <h3
                    className="font-sans font-semibold"
                    style={{ fontSize: '0.875rem', color: 'var(--white)', letterSpacing: '0.02em' }}
                  >
                    {pt.title}
                  </h3>
                  <p
                    className="font-sans mt-2"
                    style={{ fontSize: '0.875rem', color: 'var(--platinum-grey)', lineHeight: 1.6 }}
                  >
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>
            <Link
              to="/services/"
              className="btn-secondary mt-10 inline-block self-start"
              style={{ borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              View website and content services
            </Link>
          </div>
          <div
            className="relative overflow-hidden min-h-[280px] md:min-h-[400px] lg:min-h-[60vh]"
            style={{ backgroundColor: 'var(--bg-soft)' }}
          >
            <img
              ref={splitImageRef}
              src="/nlds/images/dh-luxury-roofing-website-design-showcase.webp"
              srcSet="/nlds/images/dh-luxury-roofing-website-design-showcase-w768.webp 768w, /nlds/images/dh-luxury-roofing-website-design-showcase.webp 1536w"
              sizes="(max-width: 768px) 100vw, 1200px"
              width={1536}
              height={1024}
              decoding="async"
              alt="DH Luxury Roofing website design with roof inspection call to action"
              className="img-muted absolute inset-0 w-full h-full object-contain"
              style={{ objectPosition: 'center center' }}
              loading="lazy"
            />
            <DiagonalLine direction="bl-tr" className="absolute inset-0" />
          </div>
        </div>
      </section>

      {/* 4. Philosophy / What We Stand For — restored exactly */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <h2
            className="font-serif text-center"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            What We Stand For
          </h2>
          <div ref={principlesRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {principles.map((principle, i) => (
              <div key={i} className="principle-card text-center">
                <span className="font-serif" style={{ fontSize: '2rem', color: 'var(--silver-grey)', opacity: 0.5 }}>
                  {principle.number}
                </span>
                <div className="mt-4 mx-auto" style={{ width: 40, height: 1, backgroundColor: 'var(--silver-grey)' }} />
                <h3 className="font-sans font-semibold mt-4" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                  {principle.title}
                </h3>
                <p className="font-sans mt-2" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Online Presence System */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              The Online Presence System
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.7 }}
            >
              A website is one part of how customers find and evaluate a business. We build
              the full picture — website, brand direction, supporting content, and ongoing
              website care — so every platform your customers check reflects the same level of quality.
            </p>
          </div>
        </div>
      </section>

      {/* 6. What We Handle */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              What We Handle
            </h2>
            <div>
              <p
                className="font-sans"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.7 }}
              >
                Websites, brand direction, and supporting content — what shapes how a business
                looks online. We handle all of it, so your design, content, and presence work
                together instead of pulling in different directions.
              </p>
              <Link to="/services/" className="btn-secondary mt-8 inline-block">
                View website and content services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why It Matters Locally */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <h2
              className="font-serif"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
            >
              Built for Businesses in Port Orange, Daytona Beach, and Volusia County
            </h2>
            <p
              className="font-sans"
              style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.7 }}
            >
              The Volusia County market is competitive across nearly every service category.
              Businesses that look the most professional online earn a disproportionate share
              of first-time customers — before a single conversation happens. That's what
              we build for.
            </p>
          </div>
        </div>
      </section>

      {/* 8. From First Impression to Finished Launch — Process */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <h2
            className="font-serif text-center"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            From First Impression to Finished Launch
          </h2>
          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {processSteps.map((step, i) => (
              <div key={i} className="process-step text-center">
                <span className="font-serif" style={{ fontSize: '2rem', color: 'var(--silver-grey)', opacity: 0.5 }}>
                  {step.number}
                </span>
                <div className="mt-4 mx-auto" style={{ width: 40, height: 1, backgroundColor: 'var(--silver-grey)' }} />
                <h3 className="font-sans font-semibold mt-4" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                  {step.title}
                </h3>
                <p className="font-sans mt-2" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Journal */}
      <JournalSection />

      {/* Follow NLDS */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '60px 0' }}>
        <div className="container-nlds">
          <div
            style={{
              borderTop: '1px solid var(--silver-grey)',
              borderBottom: '1px solid var(--silver-grey)',
              padding: '32px 0',
            }}
          >
            <p className="eyebrow">FOLLOW THE STUDIO</p>
            <p
              className="font-serif mt-4"
              style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', color: 'var(--charcoal)', lineHeight: 1.2 }}
            >
              See the work in progress.
            </p>
            <p
              className="font-sans mt-3"
              style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 520 }}
            >
              Follow along for website launches, design notes, and local business updates from New Level Design Studio.
            </p>
            <nav aria-label="Follow NLDS on social media" className="mt-5">
              <div className="flex flex-wrap">
                {SOCIAL_LINKS.map((social, i) => (
                  <span key={social.platform}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel}
                      className="font-sans no-underline transition-colors duration-200"
                      style={{ fontSize: '0.9375rem', color: 'var(--muted-text)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                    >
                      {social.platform}
                    </a>
                    {i < SOCIAL_LINKS.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{ margin: '0 8px', color: 'var(--silver-grey)', fontSize: '0.9375rem' }}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <FinalCTA
        heading="Ready to Build a Stronger Online Presence?"
        body="We work with local businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you are building and we will show you what is possible."
        buttonText="Request a Free Website Review"
        buttonTo="/contact/"
      />
    </div>
  );
}

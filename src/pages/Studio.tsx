import FinalCTA from '@/components/FinalCTA';
import SectionDivider from '@/components/SectionDivider';
import FramedImage from '@/components/FramedImage';
import DiagonalLine from '@/components/DiagonalLine';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  { number: '01', title: 'Clarity Over Noise', description: 'We strip away the unnecessary so your message comes through clean and strong.' },
  { number: '02', title: 'Design With Purpose', description: 'Every element serves a function. Nothing is decorative for decoration\'s sake.' },
  { number: '03', title: 'Built for Real People', description: 'We design for your customers — not for design awards. Usability always comes first.' },
];

export default function Studio() {
  const aboutRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, stagger: 0.2, start: 'top 75%' });
  const principlesRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.principle-card' });

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
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <p className="eyebrow">THE STUDIO</p>
          <h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}
          >
            A Cleaner Standard for How Local Businesses Show Up Online.
          </h1>
          <div className="mt-20">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* About */}
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
                New Level Design Studio was built to help local businesses in Port Orange, Daytona Beach, and across Volusia County look as professional online as they are in person. We combine clean design, sharp content, and strategic thinking to create websites and visuals that earn trust from the first impression.
              </p>
            </div>
            <div className="relative">
              <FramedImage src="/images/about-studio.jpg" alt="Creative workspace" aspectRatio="4/3" />
              <DiagonalLine direction="tl-br" className="absolute inset-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
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
                <span
                  className="font-serif"
                  style={{ fontSize: '2rem', color: 'var(--silver-grey)', opacity: 0.5 }}
                >
                  {principle.number}
                </span>
                <div className="mt-4 mx-auto" style={{ width: 40, height: 1, backgroundColor: 'var(--silver-grey)' }} />
                <h3
                  className="font-sans font-semibold mt-4"
                  style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                >
                  {principle.title}
                </h3>
                <p
                  className="font-sans mt-2"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
                >
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Editorial */}
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
              A strong website and clear visual system don't just look good — they make every marketing effort, every customer interaction, and every piece of content work harder for your business.
            </p>
            <Link
              to="/contact"
              className="btn-secondary mt-10 inline-block self-start"
              style={{ borderColor: 'var(--white)', color: 'var(--white)' }}
            >
              Start a Project
            </Link>
          </div>
          <div className="relative overflow-hidden min-h-[280px] md:min-h-[400px] lg:min-h-[60vh]">
            <img
              ref={splitImageRef}
              src="/images/split-editorial.jpg"
              alt="Urban landscape"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: 'scale(1.06)' }}
            />
            <DiagonalLine direction="bl-tr" className="absolute inset-0" />
          </div>
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}

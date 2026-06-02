import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessSectionProps {
  steps: Step[];
}

export default function ProcessSection({ steps }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const stepEls = el.querySelectorAll('.process-step');
      stepEls.forEach((step, i) => {
        gsap.fromTo(
          step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
      <div className="container-nlds">
        <p className="eyebrow text-center">OUR PROCESS</p>
        <h2
          className="font-serif text-center mt-4"
          style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
        >
          A Smarter Way to Look Established Online
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {steps.map((step, i) => (
            <div key={i} className="process-step">
              <span
                className="font-serif"
                style={{
                  fontSize: '3rem',
                  color: 'var(--silver-grey)',
                  opacity: 0.5,
                  lineHeight: 1,
                }}
              >
                {step.number}
              </span>
              <div
                className="mt-4"
                style={{ width: 40, height: 1, backgroundColor: 'var(--silver-grey)' }}
              />
              <h3
                className="font-sans font-semibold mt-4"
                style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
              >
                {step.title}
              </h3>
              <p
                className="font-sans mt-2"
                style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

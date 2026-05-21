import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DiagonalLineProps {
  direction?: 'tl-br' | 'bl-tr';
  className?: string;
}

export default function DiagonalLine({ direction = 'tl-br', className = '' }: DiagonalLineProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const path = svg.querySelector('path');
    if (!path) return;

    const length = path.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svg,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const d = direction === 'tl-br'
    ? 'M0,0 L1000,1000'
    : 'M0,1000 L1000,0';

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.1 }}
    >
      <path
        d={d}
        stroke="var(--blue-dolphin)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

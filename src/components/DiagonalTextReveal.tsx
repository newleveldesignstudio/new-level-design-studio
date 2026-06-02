import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DiagonalTextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'span';
  className?: string;
  style?: React.CSSProperties;
  scrollTriggered?: boolean;
  heroMode?: boolean;
}

export default function DiagonalTextReveal({
  text,
  as: Tag = 'h1',
  className = '',
  style = {},
  scrollTriggered = true,
  heroMode = false,
}: DiagonalTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    const textEl = textRef.current;
    if (!container || !line || !textEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      line.style.strokeDashoffset = '0';
      textEl.style.opacity = '1';
      return;
    }

    const length = line.getTotalLength();

    const tl = gsap.timeline({
      paused: scrollTriggered,
      scrollTrigger: scrollTriggered ? {
        trigger: container,
        start: 'top 80%',
        once: true,
      } : undefined,
    });

    tl.fromTo(
      line,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }
    );

    tl.fromTo(
      textEl,
      { opacity: 0, letterSpacing: heroMode ? '0.5em' : '0.3em' },
      { opacity: 1, letterSpacing: heroMode ? '0.15em' : (style.letterSpacing || '-0.02em'), duration: 1, ease: 'power2.out' },
      '-=0.7'
    );

    if (!scrollTriggered) {
      tl.play();
    }

    return () => {
      tl.kill();
    };
  }, [scrollTriggered, heroMode, style.letterSpacing]);

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      >
        <path
          ref={lineRef}
          d="M0,0 L1000,200"
          stroke="var(--blue-dolphin)"
          strokeWidth="1"
          fill="none"
          style={{ opacity: 0.1 }}
        />
      </svg>
      <Tag
        ref={textRef as unknown as React.Ref<HTMLHeadingElement>}
        className="font-serif relative"
        style={{
          ...style,
          opacity: 0,
        }}
      >
        {text}
      </Tag>
    </div>
  );
}

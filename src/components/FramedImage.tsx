import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FramedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  aspectRatio?: string;
  parallax?: boolean;
  objectFit?: 'cover' | 'contain';
}

export default function FramedImage({ src, alt, srcSet, sizes, aspectRatio = '4/3', parallax = true, objectFit = 'cover' }: FramedImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image || !parallax || objectFit !== 'cover') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { y: '-3%' },
        {
          y: '3%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [parallax, objectFit]);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      style={{
        padding: 8,
        backgroundColor: 'var(--silver-grey)',
        borderRadius: 4,
      }}
    >
      <img
        ref={imageRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        alt={alt}
        className={`img-muted w-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'}`}
        style={{
          ...(objectFit === 'cover' && aspectRatio ? { aspectRatio } : {}),
          ...(objectFit === 'contain' ? { height: 'auto' } : {}),
          display: 'block',
          transform: parallax && objectFit === 'cover' ? 'scale(1.06)' : 'none',
        }}
      />
    </div>
  );
}

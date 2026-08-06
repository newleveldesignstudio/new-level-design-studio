import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, type AnimationPlaybackControls } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials as defaultTestimonials, testimonialsEnabled as defaultEnabled, type Testimonial } from '../data/testimonials';

const LOOP_DURATION = 40; // seconds for one full loop

interface TestimonialCarouselProps {
  testimonials?: Testimonial[];
  enabled?: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          strokeWidth={1.5}
          className={i < rating ? 'text-nlds-charcoal' : 'text-nlds-silver'}
          fill={i < rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, hidden }: { testimonial: Testimonial; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className="flex w-[300px] shrink-0 flex-col rounded-xl border border-nlds-border bg-white px-6 py-7 shadow-sm sm:w-[360px] sm:px-8 sm:py-8"
    >
      <StarRating rating={testimonial.rating} />
      <p className="font-sans mt-5 flex-1 text-[0.9375rem] leading-relaxed text-nlds-charcoal">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-nlds-border pt-5">
        {testimonial.photo && (
          <img
            src={testimonial.photo}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="flex min-w-0 flex-col">
          <span className="font-serif truncate text-base text-nlds-charcoal">{testimonial.name}</span>
          <span className="font-sans truncate text-xs uppercase tracking-[0.1em] text-nlds-muted">
            {testimonial.business}
          </span>
        </div>
        {testimonial.googleReviewUrl && (
          <a
            href={testimonial.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans ml-auto shrink-0 whitespace-nowrap text-xs uppercase tracking-[0.1em] text-nlds-muted underline-offset-4 hover:text-nlds-charcoal hover:underline"
          >
            View Review
          </a>
        )}
      </div>
    </article>
  );
}

export default function TestimonialCarousel({
  testimonials: items = defaultTestimonials,
  enabled = defaultEnabled,
}: TestimonialCarouselProps) {
  const measureRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const x = useMotionValue(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Measures the width of exactly one un-duplicated pass through `items` — decoupled
  // from the visible (repeated) track so the loop distance stays correct no matter
  // how many copies are rendered for coverage.
  useEffect(() => {
    const el = measureRef.current;
    if (!el || reducedMotion) return;
    const measure = () => setSingleSetWidth(el.scrollWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items, reducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;
    const measure = () => setContainerWidth(el.getBoundingClientRect().width);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const startLoop = (from: number) => {
    controlsRef.current?.stop();
    if (singleSetWidth === 0) return;
    controlsRef.current = animate(x, [from, from - singleSetWidth], {
      duration: LOOP_DURATION,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
  };

  useEffect(() => {
    if (reducedMotion || singleSetWidth === 0) return;
    startLoop(0);
    return () => controlsRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleSetWidth, reducedMotion]);

  if (!enabled || items.length === 0) return null;

  const pause = () => controlsRef.current?.stop();
  const resume = () => startLoop(x.get());

  if (reducedMotion) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-2 sm:gap-8" role="region" aria-label="Client testimonials">
        {items.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    );
  }

  // Repeat enough full sets to always cover the container width (plus one extra
  // set of slack) so short lists never run out of cards mid-loop on wide screens.
  const repeatCount =
    singleSetWidth > 0 ? Math.max(2, Math.ceil((containerWidth + singleSetWidth) / singleSetWidth) + 1) : 2;
  const loopItems = Array.from({ length: repeatCount }, () => items).flat();

  return (
    <div
      ref={containerRef}
      className="overflow-hidden"
      role="region"
      aria-label="Client testimonials"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 flex w-fit gap-6 sm:gap-8"
      >
        <div ref={measureRef} className="flex w-fit gap-6 sm:gap-8">
          {items.map((t) => (
            <TestimonialCard key={`measure-${t.id}`} testimonial={t} />
          ))}
        </div>
      </div>
      <motion.div
        className="flex w-fit cursor-grab gap-6 active:cursor-grabbing sm:gap-8"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -singleSetWidth, right: 0 }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={pause}
        onDragEnd={resume}
      >
        {loopItems.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} hidden={i >= items.length} />
        ))}
      </motion.div>
    </div>
  );
}

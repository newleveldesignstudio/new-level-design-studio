import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface EditorialImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

const editorialReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function EditorialImageReveal({
  src,
  alt,
  className = '',
  loading = 'eager',
}: EditorialImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      initial={shouldReduceMotion ? undefined : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.12 }}
      variants={shouldReduceMotion ? undefined : editorialReveal}
    >
      {/* Soft daylight radial glow — ivory/white, no cyan or neon */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: -40,
          background:
            'radial-gradient(ellipse at 35% 20%, rgba(255,255,255,0.72) 0%, rgba(247,247,243,0.36) 42%, rgba(236,237,238,0.12) 65%, transparent 80%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Image frame */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          border: '1px solid var(--border-color)',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow:
            '0 2px 24px rgba(30,31,32,0.06), 0 1px 4px rgba(30,31,32,0.04)',
          backgroundColor: 'var(--bg-soft)',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading={loading}
          className="img-muted"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>
    </motion.div>
  );
}

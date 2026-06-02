import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLenis } from '@/hooks/useLenis';
import type { WorkProject } from './WorkProjectCard';

interface ImageLightboxProps {
  project: WorkProject | null;
  onClose: () => void;
}

export default function ImageLightbox({ project, onClose }: ImageLightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isOpen = !!project;

  /* Stop Lenis smooth scroll while open so the modal can scroll natively */
  useEffect(() => {
    if (isOpen) {
      const lenis = getLenis();
      if (lenis) lenis.stop();
    } else {
      const lenis = getLenis();
      if (lenis) lenis.start();
    }
    return () => {
      const lenis = getLenis();
      if (lenis) lenis.start();
    };
  }, [isOpen]);

  /* Stop wheel/touch events from bubbling to Lenis document listeners */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isOpen) return;

    const stopPropagation = (e: Event) => e.stopPropagation();
    section.addEventListener('wheel', stopPropagation, { capture: true });
    section.addEventListener('touchmove', stopPropagation, { capture: true });

    return () => {
      section.removeEventListener('wheel', stopPropagation, { capture: true });
      section.removeEventListener('touchmove', stopPropagation, { capture: true });
    };
  }, [isOpen]);

  /* Escape key closes */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  /* Focus close button on open */
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.section
          ref={sectionRef}
          key="lightbox"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f7f7f3]/96 backdrop-blur-sm p-4 md:p-6 lg:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged image for ${project.title}`}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="fixed right-6 top-6 z-[10000] font-sans focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#1E1F20]"
            style={{
              fontSize: '1.75rem',
              lineHeight: 1,
              color: 'var(--charcoal)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px 12px',
            }}
            aria-label="Close enlarged image"
          >
            ×
          </button>

          {/* Image wrapper — clicking here does not close */}
          <div
            className="flex h-[88vh] w-[92vw] max-w-[1500px] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.imageSrc ?? undefined}
              alt={project.imageAlt || `${project.title} project preview`}
              title={project.imageTitle}
              className="max-h-full max-w-full object-contain opacity-100 shadow-2xl"
            />
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

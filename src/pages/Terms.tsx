import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/SEO';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const sections = [
  {
    title: 'Overview',
    body: 'These Terms of Service govern your use of the New Level Design Studio website and services. By accessing our website or engaging our services, you agree to these terms.',
  },
  {
    title: 'Services',
    body: 'We provide web design, branding, content creation, and related digital services. Specific deliverables, timelines, and pricing are outlined in individual project proposals or statements of work.',
  },
  {
    title: 'Intellectual Property',
    body: 'Upon full payment, clients receive ownership rights to final deliverables as specified in their project agreement. We retain the right to showcase completed work in our portfolio and marketing materials unless otherwise agreed in writing.',
  },
  {
    title: 'Payments',
    body: 'Payment terms are specified in individual project proposals. Typically, a deposit is required to begin work, with the balance due upon project completion. Late payments may result in project delays or additional fees.',
  },
  {
    title: 'Revisions',
    body: 'The number of revision rounds is specified in each project proposal. Additional revisions beyond the agreed scope may incur extra charges.',
  },
  {
    title: 'Limitation of Liability',
    body: 'New Level Design Studio shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the amount paid for the specific services giving rise to the claim.',
  },
  {
    title: 'Termination',
    body: 'Either party may terminate a project with written notice. Clients are responsible for payment for all work completed up to the termination date. Deposits are non-refundable.',
  },
  {
    title: 'Governing Law',
    body: 'These terms are governed by the laws of the State of Florida. Any disputes shall be resolved in the courts of Volusia County, Florida.',
  },
];

export default function Terms() {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, stagger: 0.1, start: 'top 85%', childSelector: '.terms-section' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <SEO
        title="Terms of Service | New Level Design Studio"
        description="Terms of service for New Level Design Studio. Read about our policies, payments, intellectual property, and liability."
        canonical="https://newlvlstudio.com/terms"
      />
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds" style={{ maxWidth: 800 }}>
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h1
              className="font-serif"
              style={{ fontSize: '3rem', color: 'var(--charcoal)', lineHeight: 1.1 }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Terms of Service
            </motion.h1>
            <motion.p
              className="font-sans mt-4"
              style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Last updated: May 20, 2026
            </motion.p>
            <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
              <SectionDivider />
            </motion.div>
          </motion.div>

          <div ref={contentRef} className="mt-12 flex flex-col" style={{ gap: 48 }}>
            {sections.map((section, i) => (
              <div key={i} className="terms-section">
                <h2
                  className="font-sans font-semibold uppercase"
                  style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--charcoal)' }}
                >
                  {section.title}
                </h2>
                <p
                  className="font-sans mt-3"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.7 }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

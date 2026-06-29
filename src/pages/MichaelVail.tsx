import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Target, UserCheck, MapPin } from 'lucide-react';
import SEO, { localBusinessSchema, personSchema, websiteSchema } from '@/components/SEO';

const FOUNDER_PORTRAIT = '/images/founder/michael-vail-founder-portrait-new-level-design-studio.webp';

const founderLabels = [
  { Icon: Target, label: 'Strategy First' },
  { Icon: UserCheck, label: 'Founder-Led' },
  { Icon: MapPin, label: 'Built for Local Business' },
];

const standardPrinciples = [
  { letter: 'S', title: 'Strategy', description: 'We start with clear goals, the right message, and a plan built to deliver results.' },
  { letter: 'T', title: 'Thoughtfulness', description: 'We design with purpose through intentional layouts, strong visuals, and decisions that support the business.' },
  { letter: 'A', title: 'Authenticity', description: 'We keep it honest. No fluff and no empty trends—just work that accurately represents the business.' },
  { letter: 'N', title: 'No Shortcuts', description: 'We take the time to do the work correctly because lasting quality cannot be rushed.' },
  { letter: 'D', title: 'Detail', description: 'We focus on the details others overlook. Precision elevates the entire experience.' },
  { letter: 'A', title: 'Accountability', description: 'We do what we say, communicate clearly, and take ownership from start to finish.' },
  { letter: 'R', title: 'Reliability', description: 'We build lasting working relationships, not one-time transactions.' },
  { letter: 'D', title: 'Delivery', description: 'We deliver with purpose, to the agreed standard, so the business can move forward confidently.' },
];

const workingPrinciples = [
  {
    number: '01',
    title: 'Direct Partnership',
    description: 'You work directly with me from start to finish. No agency handoffs. No confusion.',
  },
  {
    number: '02',
    title: 'Strategy Before Design',
    description: 'Every decision starts with your goals, your customers, and what the website needs to accomplish.',
  },
  {
    number: '03',
    title: 'Built for Local Business',
    description: 'The work is structured around trust, local visibility, calls, quote requests, bookings, and real customer decisions.',
  },
  {
    number: '04',
    title: 'No Shortcuts',
    description: 'The goal is not simply to launch quickly. The goal is to build something clear, credible, and made to last.',
  },
];

const processSteps = [
  { number: '01', title: 'Strategy', description: 'We define the goals, clarify the message, and establish the right foundation.' },
  { number: '02', title: 'Design', description: 'We create purposeful layouts and visuals that reflect the brand and earn trust.' },
  { number: '03', title: 'Development', description: 'We build clean, fast, accessible, mobile-ready websites designed to perform.' },
];

/* ── Animation variants ── */

const colVar: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const phraseContainerVar: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVar: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const labelRowVar: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const processColVar: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const processItemVar: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function BreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://newlvlstudio.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Michael Vail',
        item: 'https://newlvlstudio.com/michael-vail/',
      },
    ],
  };
}

export default function MichaelVail() {
  const rm = useReducedMotion();
  const processRef = useRef<HTMLDivElement>(null);
  const processInView = useInView(processRef, { once: true, amount: 0.25 });

  return (
    <div>
      <SEO
        title="Michael Vail | Founder of New Level Design Studio"
        description="Meet Michael Vail, founder and creative director of New Level Design Studio in Port Orange, Florida, helping local businesses build stronger websites and online trust."
        canonical="https://newlvlstudio.com/michael-vail"
        ogType="profile"
        jsonLd={[personSchema(), localBusinessSchema(), websiteSchema(), BreadcrumbSchema()]}
      />

      {/* 1. Founder Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 'clamp(64px, 8vw, 100px)' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Text — animated column */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-center"
              variants={rm ? undefined : colVar}
              initial={rm ? undefined : 'hidden'}
              animate={rm ? undefined : 'visible'}
            >
              <motion.p className="eyebrow" variants={rm ? undefined : itemVar}>
                The Founder
              </motion.p>

              <motion.h1
                className="font-serif mt-5"
                style={{
                  fontSize: 'clamp(2.625rem, 6vw, 5.25rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: 'var(--charcoal)',
                  maxWidth: 760,
                }}
                variants={rm ? undefined : phraseContainerVar}
              >
                <motion.span style={{ display: 'block' }} variants={rm ? undefined : itemVar}>
                  Hi, I'm Michael Vail.
                </motion.span>
                <motion.span style={{ display: 'block' }} variants={rm ? undefined : itemVar}>
                  I started New Level Design Studio
                </motion.span>
                <motion.span style={{ display: 'block' }} variants={rm ? undefined : itemVar}>
                  to{' '}
                  <em style={{ fontStyle: 'italic', color: 'var(--charcoal)' }}>raise the standard</em>.
                </motion.span>
              </motion.h1>

              <motion.p
                className="font-sans mt-6"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1875rem)', color: 'var(--muted-text)', lineHeight: 1.7, maxWidth: 560 }}
                variants={rm ? undefined : itemVar}
              >
                I built New Level Design Studio to help local businesses earn trust faster—with
                clearer websites, stronger visuals, and a more professional presence online.
              </motion.p>

              <motion.div
                className="mt-8"
                style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24, maxWidth: 420 }}
                variants={rm ? undefined : itemVar}
              >
                <p className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                  Michael Vail
                </p>
                <p className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                  Founder & Creative Director
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center mt-8"
                style={{ gap: 16 }}
                variants={rm ? undefined : itemVar}
              >
                <Link to="/contact" className="btn-primary w-full sm:w-auto text-center">
                  Get a Free Website Review
                </Link>
                <Link to="/works" className="btn-secondary w-full sm:w-auto text-center">
                  View the Work
                </Link>
              </motion.div>
            </motion.div>

            {/* Founder portrait — not animated */}
            <div className="lg:col-span-5 flex items-start lg:items-center justify-center">
              <img
                src={FOUNDER_PORTRAIT}
                alt="Michael Vail, founder and creative director of New Level Design Studio"
                width={1024}
                height={1536}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto"
                style={{
                  display: 'block',
                  maxWidth: 572,
                  maxHeight: 'clamp(572px, 75vh, 836px)',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 1b. Founder Labels */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingBottom: 'clamp(48px, 6vw, 72px)' }}>
        <div className="container-nlds">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ borderTop: '1px solid var(--silver-grey)' }}
            variants={rm ? undefined : labelRowVar}
            initial={rm ? undefined : 'hidden'}
            whileInView={rm ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.5 }}
          >
            {founderLabels.map(({ Icon, label }, i) => (
              <motion.div
                key={label}
                className={`flex items-center gap-3 py-6${i > 0 ? ' border-t sm:border-t-0 sm:border-l sm:pl-8' : ''}`}
                style={{ borderColor: 'var(--silver-grey)' }}
                variants={rm ? undefined : itemVar}
              >
                <Icon size={16} strokeWidth={1.5} style={{ color: 'var(--muted-text)', flexShrink: 0 }} />
                <p
                  className="font-sans font-semibold uppercase"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--charcoal)' }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Founder Manifesto */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 9vw, 120px) 0' }}>
        <div className="container-nlds">
          <div style={{ maxWidth: 960 }}>
            <div style={{ width: 60, height: 1, backgroundColor: 'var(--silver-grey)', marginBottom: 40 }} />
            <h2
              className="font-serif"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                lineHeight: 1.12,
                color: 'var(--charcoal)',
                letterSpacing: '-0.01em',
              }}
            >
              I don't believe local businesses should lose trust before they ever get the chance to
              earn it.
            </h2>
            <p
              className="font-sans mt-8"
              style={{
                fontSize: 'clamp(1.0625rem, 1.3vw, 1.25rem)',
                color: 'var(--muted-text)',
                lineHeight: 1.7,
                maxWidth: 680,
              }}
            >
              A weak website, inconsistent visual identity, or confusing message can make a good
              business look less credible than it really is. New Level Design Studio exists to close that gap.
            </p>
            <div style={{ width: 60, height: 1, backgroundColor: 'var(--silver-grey)', marginTop: 48 }} />
          </div>
        </div>
      </section>

      {/* 3. Why I Built New Level Design Studio */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 9vw, 120px) 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">My Story</p>
              <h2
                className="font-serif mt-5"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  lineHeight: 1.12,
                  color: 'var(--charcoal)',
                }}
              >
                Why I Built New Level Design Studio
              </h2>
              <div className="mt-8 flex flex-col gap-6">
                <p
                  className="font-sans"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', color: 'var(--muted-text)', lineHeight: 1.75 }}
                >
                  Over the years, I saw too many local businesses get overlooked online. Great work,
                  but weak websites. Good people, but inconsistent branding. They were losing
                  trust—and opportunities—before they even got a chance.
                </p>
                <p
                  className="font-sans"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', color: 'var(--muted-text)', lineHeight: 1.75 }}
                >
                  I knew I could help. So I built New Level Design Studio to deliver premium websites,
                  visuals, and content systems with strategy and personal attention behind every detail.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-end">
              <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 32 }}>
                <p
                  className="font-serif"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                    lineHeight: 1.25,
                    color: 'var(--charcoal)',
                  }}
                >
                  I don't believe in average.
                </p>
                <p
                  className="font-sans mt-5"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', color: 'var(--muted-text)', lineHeight: 1.75 }}
                >
                  I believe every business deserves a stronger first impression, better visibility,
                  and practical tools that help it grow with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Working Directly With Michael */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 9vw, 120px) 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <h2
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  lineHeight: 1.12,
                  color: 'var(--charcoal)',
                }}
              >
                One Studio. One Direct Point of Contact.
              </h2>
              <p
                className="font-sans mt-5"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 420 }}
              >
                You work directly with the person responsible for the strategy, design, and final
                result.
              </p>
            </div>
            <div className="lg:col-span-8 flex flex-col" style={{ gap: 0 }}>
              {workingPrinciples.map((item) => (
                <div
                  key={item.number}
                  className="flex flex-col sm:grid sm:grid-cols-12 gap-2 sm:gap-4 py-8"
                  style={{ borderTop: '1px solid var(--silver-grey)' }}
                >
                  <div className="sm:col-span-1">
                    <span
                      className="font-serif"
                      style={{
                        fontSize: '1.75rem',
                        color: 'var(--muted-text)',
                        lineHeight: 1,
                      }}
                    >
                      {item.number}
                    </span>
                  </div>
                  <div className="sm:col-span-11">
                    <h3
                      className="font-sans font-semibold"
                      style={{ fontSize: '1.0625rem', color: 'var(--charcoal)', letterSpacing: '0.02em' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="font-sans mt-2"
                      style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 560 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. The NLDS STANDARD */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 9vw, 120px) 0' }}>
        <div className="container-nlds">
          <div className="mb-12 lg:mb-16">
            <p className="eyebrow">The NLDS Standard</p>
            <h2
              className="font-serif mt-5"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                lineHeight: 1.12,
                color: 'var(--charcoal)',
              }}
            >
              Our promise to every client.
            </h2>
            <p
              className="font-sans mt-5"
              style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 600 }}
            >
              The STANDARD is how we approach every project. It is our process, our mindset, and the
              level of quality we deliver—every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-0">
            {standardPrinciples.map((item, i) => (
              <div
                key={`${item.letter}-${i}`}
                className="py-7"
                style={{ borderTop: '1px solid var(--silver-grey)' }}
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="font-serif"
                    style={{
                      fontSize: '1.75rem',
                      lineHeight: 1,
                      color: 'var(--charcoal)',
                      minWidth: 28,
                    }}
                  >
                    {item.letter}
                  </span>
                  <h3
                    className="font-sans font-semibold"
                    style={{ fontSize: '1rem', color: 'var(--charcoal)', letterSpacing: '0.02em' }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  className="font-sans"
                  style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How We Work — in-view stagger reveal */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 8vw, 100px) 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <p className="eyebrow">How We Work</p>
              <h2
                className="font-serif mt-5"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                  lineHeight: 1.12,
                  color: 'var(--charcoal)',
                }}
              >
                Strategy.
                <br />
                Design. Development.
                <br />
                <em style={{ fontStyle: 'italic' }}>All with purpose.</em>
              </h2>
              <p
                className="font-sans mt-5"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
              >
                A focused process for creating premium websites, visuals, and content systems that help
                local businesses grow and stand out.
              </p>
            </div>

            <motion.div
              ref={processRef}
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8"
              variants={rm ? undefined : processColVar}
              initial={rm ? undefined : 'hidden'}
              animate={rm ? undefined : processInView ? 'visible' : 'hidden'}
            >
              {processSteps.map((step) => (
                <motion.div
                  key={step.number}
                  style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}
                  variants={rm ? undefined : processItemVar}
                >
                  <span
                    className="font-serif block"
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--muted-text)', lineHeight: 1 }}
                  >
                    {step.number}
                  </span>
                  <h3
                    className="font-sans font-semibold mt-4"
                    style={{ fontSize: '1.0625rem', color: 'var(--charcoal)', letterSpacing: '0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="font-sans mt-2"
                    style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Personal Founder Statement */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 9vw, 120px) 0' }}>
        <div className="container-nlds">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ width: 48, height: 1, backgroundColor: 'var(--silver-grey)', marginBottom: 40 }} />
            <blockquote>
              <p
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.625rem, 3.25vw, 2.75rem)',
                  lineHeight: 1.2,
                  color: 'var(--charcoal)',
                  letterSpacing: '-0.01em',
                }}
              >
                I want every client to feel that their business was understood, their time was
                respected, and the final result raised the standard of how they show up online.
              </p>
            </blockquote>
            <div style={{ width: 48, height: 1, backgroundColor: 'var(--silver-grey)', marginTop: 40, marginBottom: 24 }} />
            <p className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
              Michael Vail
            </p>
            <p className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
              Founder, New Level Design Studio
            </p>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 9vw, 120px) 0' }}>
        <div className="container-nlds text-center" style={{ maxWidth: 680 }}>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.12,
              color: 'var(--charcoal)',
            }}
          >
            Let's Build Something That Sets You Apart.
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
          >
            Your business deserves more than an average website. Let's create something clearer,
            stronger, and built around your goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center mt-10" style={{ gap: 16 }}>
            <Link to="/contact" className="btn-primary w-full sm:w-auto text-center">
              Get a Free Website Review
            </Link>
            <Link to="/contact" className="btn-secondary w-full sm:w-auto text-center">
              Discuss Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

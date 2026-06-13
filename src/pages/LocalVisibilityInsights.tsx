import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

// ─── Schema ──────────────────────────────────────────────────────────────────

const pageSchema: Record<string, unknown>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://newlvlstudio.com/local-visibility-insights/#webpage',
    url: 'https://newlvlstudio.com/local-visibility-insights/',
    name: 'Local Visibility Insights for Small Businesses | NLDS',
    description:
      'Practical insights to help local businesses improve website trust, Google visibility, mobile usability, reviews, and customer contact paths.',
    isPartOf: { '@id': 'https://newlvlstudio.com/#website' },
    about: { '@id': 'https://newlvlstudio.com/#business' },
  },
  {
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
        name: 'Local Visibility Insights',
        item: 'https://newlvlstudio.com/local-visibility-insights/',
      },
    ],
  },
];

// ─── Published insights ───────────────────────────────────────────────────────

const publishedInsights = [
  {
    num: 1,
    title: 'What Makes a Local Business Website Feel Trustworthy?',
    description:
      'The website details that help customers understand who you are, what you offer, where you work, and what they should do next.',
    href: '/local-visibility-insights/website-trust',
  },
  {
    num: 2,
    title: 'Where Do Local Customers Decide Which Business to Contact?',
    description:
      'The decision points between search results and first contact — and what businesses can do to improve them.',
    href: '/local-visibility-insights/customer-decision-path',
  },
  {
    num: 3,
    title: 'How Complete Is Your Google Business Profile?',
    description:
      'A review of the core profile details that help customers understand and contact a local business.',
    href: '/local-visibility-insights/google-profile-completeness',
  },
  {
    num: 4,
    title: 'How Quickly Can Customers Find Your Contact Information?',
    description:
      'How phone numbers, forms, tap-to-call links, service areas, and clear next steps affect whether customers complete the path to contact.',
    href: '/local-visibility-insights/contact-information',
  },
  {
    num: 5,
    title: 'How Recent Are Your Business Reviews?',
    description:
      'Why review recency, honest feedback, and professional responses influence how local customers evaluate a business.',
    href: '/local-visibility-insights/review-recency',
  },
  {
    num: 6,
    title: 'Is Your Website Ready for Mobile Customers?',
    description:
      'What local businesses should check for mobile usability, including page speed, navigation, tap-to-call, forms, readable text, and clear contact paths.',
    href: '/local-visibility-insights/mobile-readiness',
  },
];

// ─── How-to steps ─────────────────────────────────────────────────────────────

const howToSteps = [
  {
    num: 1,
    label: 'Understand the Issue',
    copy: 'Each insight explains one specific aspect of how customers evaluate local businesses online — what they look for, what creates doubt, and what makes a business easier to choose.',
  },
  {
    num: 2,
    label: 'Check Your Own Business',
    copy: 'After reading, apply the questions and checklists to your own website, Google Business Profile, or contact flow. No special tools are required to start.',
  },
  {
    num: 3,
    label: 'Improve the Highest-Priority Gaps',
    copy: 'Focus on the gaps most likely to affect whether customers contact you — not just the ones that are easiest to fix. The free SEO tools can help you check the technical side.',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LocalVisibilityInsights() {
  const shouldReduceMotion = useReducedMotion();

  const introRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    start: 'top 82%',
    childSelector: '.reveal-item',
  });

  const stepsRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    start: 'top 80%',
    childSelector: '.step-item',
  });

  const publishedRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.1,
    start: 'top 80%',
    childSelector: '.published-item',
  });

  return (
    <div>
      <SEO
        title="Local Visibility Insights for Small Businesses | NLDS"
        description="Practical insights to help local businesses improve website trust, Google visibility, mobile usability, reviews, and customer contact paths."
        canonical="https://newlvlstudio.com/local-visibility-insights"
        jsonLd={pageSchema}
      />

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-main)',
          paddingTop: 'clamp(120px, 16vw, 160px)',
          paddingBottom: 'clamp(64px, 8vw, 100px)',
          borderBottom: '1px solid var(--silver-grey)',
        }}
      >
        <motion.div
          className="container-nlds"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHTS
          </motion.p>

          <motion.h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 820,
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Understand What Customers See Before They Contact You
          </motion.h1>

          <motion.p
            className="font-sans mt-6"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
              lineHeight: 1.65,
              color: 'var(--muted-text)',
              maxWidth: 620,
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Practical guidance for local businesses that want to improve how they appear in
            search, build trust online, and make it easier for customers to take the next step.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center"
            style={{ gap: 12, marginTop: 36 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <Link
              to="/local-visibility-insights/website-trust"
              className="btn-primary"
            >
              Start With Insight No. 1
            </Link>
            <Link to="/free-seo-tools" className="btn-secondary">
              Use the Free SEO Tools
            </Link>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. INTRO ────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-soft)',
          padding: 'clamp(64px, 8vw, 100px) 0',
        }}
      >
        <div className="container-nlds">
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
                ABOUT THIS LIBRARY
              </motion.p>
              <motion.h2
                className="font-serif mt-4"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                Visibility Is More Than Showing Up
              </motion.h2>
            </motion.div>

            <div ref={introRef}>
              <p
                className="font-sans reveal-item"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 16,
                }}
              >
                Getting found in search is a meaningful first step, but it is only the beginning.
                After a customer sees your business in results, they still evaluate your website,
                your reviews, how easy it is to reach you, and whether the business feels
                credible enough to contact.
              </p>
              <p
                className="font-sans reveal-item"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 16,
                }}
              >
                Each insight in this library focuses on one of those decision points. The goal is
                to help business owners understand what customers actually see — and where small
                improvements can make a meaningful difference.
              </p>
              <p
                className="font-sans reveal-item"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                }}
              >
                This is practical education, not automated scoring or ranking guarantees. No tool
                can fully judge whether a business feels trustworthy to a real customer — but
                understanding the right questions is a useful place to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PUBLISHED INSIGHTS ───────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-main)',
          padding: 'clamp(64px, 8vw, 100px) 0',
        }}
      >
        <div className="container-nlds">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              AVAILABLE NOW
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 560,
                marginBottom: 48,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Published Insights
            </motion.h2>
          </motion.div>

          <div
            ref={publishedRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 'clamp(12px, 2vw, 20px)', alignItems: 'stretch' }}
          >
            {publishedInsights.map((insight) => (
              <Link
                key={insight.href}
                to={insight.href}
                className="published-item"
                style={{ textDecoration: 'none', display: 'flex', height: '100%' }}
              >
                <article
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-color)',
                    padding: 'clamp(24px, 3vw, 32px)',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--charcoal)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                  }}
                >
                  <span
                    className="font-sans"
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-text)',
                      marginBottom: 14,
                      display: 'block',
                    }}
                  >
                    Insight No. {insight.num}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
                      lineHeight: 1.2,
                      color: 'var(--charcoal)',
                      marginBottom: 12,
                    }}
                  >
                    {insight.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'var(--muted-text)',
                      flexGrow: 1,
                      marginBottom: 20,
                    }}
                  >
                    {insight.description}
                  </p>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--charcoal)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    Read the Insight &rarr;
                  </span>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW TO USE THIS LIBRARY ──────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-soft)',
          padding: 'clamp(64px, 8vw, 100px) 0',
        }}
      >
        <div className="container-nlds">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              HOW TO USE THIS LIBRARY
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 560,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              A Simple Three-Step Process
            </motion.h2>
          </motion.div>

          <div ref={stepsRef} style={{ marginTop: 48 }}>
            {howToSteps.map((step) => (
              <div
                key={step.num}
                className="step-item"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 'clamp(16px, 2.5vw, 32px)',
                  alignItems: 'start',
                  padding: '24px 0',
                  borderTop: '1px solid var(--silver-grey)',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 40,
                    height: 40,
                    border: '1px solid var(--silver-grey)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    className="font-serif"
                    style={{ fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1 }}
                  >
                    {step.num}
                  </span>
                </div>
                <div>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                      color: 'var(--charcoal)',
                      lineHeight: 1.2,
                      marginBottom: 10,
                    }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                      color: 'var(--muted-text)',
                    }}
                  >
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--silver-grey)' }} />
          </div>
        </div>
      </section>

      {/* ── 5. TOOLS CONNECTION ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-soft)',
          padding: 'clamp(64px, 8vw, 100px) 0',
          borderTop: '1px solid var(--silver-grey)',
          borderBottom: '1px solid var(--silver-grey)',
        }}
      >
        <div className="container-nlds">
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 'clamp(40px, 6vw, 72px)', alignItems: 'center' }}
          >
            <motion.div
              variants={shouldReduceMotion ? undefined : staggerContainer}
              initial={shouldReduceMotion ? undefined : 'hidden'}
              whileInView={shouldReduceMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
                FREE SEO TOOLS
              </motion.p>
              <motion.h2
                className="font-serif mt-4"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                  marginBottom: 20,
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                Check the Technical Side Too
              </motion.h2>
              <motion.p
                className="font-sans"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                These insights help you understand which aspects of your online presence matter
                most to customers. The free SEO tools help you inspect specific technical
                elements — performance, indexing, structured data, and local search — so you can
                see how your website measures up in practice.
              </motion.p>
              <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
                <Link to="/free-seo-tools" className="btn-secondary">
                  Explore Free SEO Tools
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            >
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'Insights', description: 'Help you understand what customers evaluate when deciding whether to contact a business.' },
                  { label: 'SEO Tools', description: 'Help you check measurable technical elements like speed, indexing, and structured data.' },
                  { label: 'Together', description: 'Give you a more complete picture of your website and local visibility than either alone.' },
                ].map((row) => (
                  <li
                    key={row.label}
                    style={{
                      borderTop: '1px solid var(--silver-grey)',
                      padding: '18px 0',
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr',
                      gap: 20,
                      alignItems: 'start',
                    }}
                  >
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '0.6875rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--charcoal)',
                        paddingTop: 2,
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                    >
                      {row.description}
                    </span>
                  </li>
                ))}
                <li style={{ borderTop: '1px solid var(--silver-grey)' }} />
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-main)',
          padding: 'clamp(64px, 8vw, 100px) 0',
        }}
      >
        <motion.div
          className="container-nlds"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.2 }}
          style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}
        >
          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            NEED A REVIEW?
          </motion.p>
          <motion.h2
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              lineHeight: 1.1,
              color: 'var(--charcoal)',
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Not Sure What Customers See When They Find Your Business?
          </motion.h2>
          <motion.p
            className="font-sans mt-5"
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--muted-text)',
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            NLDS can review your website and local visibility to identify the clearest
            opportunities to improve trust, clarity, and contact flow.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 12, marginTop: 36 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <Link to="/contact" className="btn-primary">
              Request a Free Website Review
            </Link>
            <Link to="/services" className="btn-secondary">
              View Website Services
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

// ─── Schema ──────────────────────────────────────────────────────────────────

const pageSchema: Record<string, unknown>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': 'https://newlvlstudio.com/local-visibility-insights/customer-decision-path/#article',
    url: 'https://newlvlstudio.com/local-visibility-insights/customer-decision-path/',
    name: 'Where Do Local Customers Decide Which Business to Contact?',
    headline: 'Where Do Local Customers Decide Which Business to Contact?',
    description:
      'Understand the steps local customers take before calling, messaging, requesting a quote, or visiting a business.',
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': 'https://newlvlstudio.com/local-visibility-insights/#webpage',
    },
    publisher: { '@id': 'https://newlvlstudio.com/#business' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://newlvlstudio.com/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Local Visibility Insights',
        item: 'https://newlvlstudio.com/local-visibility-insights/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Customer Decision Path',
        item: 'https://newlvlstudio.com/local-visibility-insights/customer-decision-path/',
      },
    ],
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const discoveryChannels = [
  {
    label: 'Google Search',
    detail:
      'Often the first place customers encounter a business — a name, category, review snippet, and a link.',
  },
  {
    label: 'Google Maps',
    detail:
      'Shows location, distance, hours, photos, and ratings before the customer visits the website.',
  },
  {
    label: 'Local Listings',
    detail:
      'Yelp, Bing Places, Apple Maps, and directory sites surface business details independently of the website.',
  },
  {
    label: 'Referrals',
    detail:
      'Word-of-mouth leads customers to search a business by name, often with some existing confidence already in place.',
  },
  {
    label: 'Social Profiles',
    detail:
      'Facebook pages, Instagram accounts, and similar profiles may be visited before or instead of the website.',
  },
  {
    label: 'Review Platforms',
    detail:
      'Platforms like Google, Yelp, and Angi let customers read feedback from others before deciding to visit.',
  },
  {
    label: 'Direct Search',
    detail:
      'A customer who already knows the business name may search it directly to find contact details or hours.',
  },
];

const journeyStages = [
  {
    num: 1,
    stage: 'Search',
    question: 'Is this business relevant to the need?',
    detail:
      'The customer is scanning results for a business that matches what they need. They check the name, category, brief description, and distance or service area before clicking anything.',
  },
  {
    num: 2,
    stage: 'Compare',
    question: 'Which businesses appear credible?',
    detail:
      'With a few options visible, the customer looks at reviews, rating counts, photo quality, and overall presentation to judge which ones seem worth exploring.',
  },
  {
    num: 3,
    stage: 'Verify',
    question: 'Do the services, hours, and details match?',
    detail:
      'The customer confirms that the business actually does what they need, covers their area, is open at a convenient time, and that the phone number or website link is current.',
  },
  {
    num: 4,
    stage: 'Visit',
    question: 'Does the website explain the offer clearly?',
    detail:
      'On the website, the customer decides whether the business feels professional, whether the services are specific enough, and whether the business appears to still be actively operating.',
  },
  {
    num: 5,
    stage: 'Contact',
    question: 'Is there an obvious way to get in touch?',
    detail:
      'At this point the customer is ready to act. They look for a phone number to call, a form to submit, a way to request a quote, or a direct message option. If that path is unclear or difficult, many will leave.',
  },
];

const evaluationItems = [
  { label: 'Relevance', detail: 'Does this business do what I need it to do?' },
  { label: 'Service Area', detail: 'Does it serve my location or travel to where I am?' },
  { label: 'Clarity', detail: 'Can I understand the services and pricing without digging?' },
  {
    label: 'Credibility',
    detail: 'Is this a real, operating business with a visible track record?',
  },
  {
    label: 'Consistency',
    detail: 'Do the details match across Google, the website, and other listings?',
  },
  { label: 'Reviews', detail: 'What have other customers said, and are reviews recent?' },
  {
    label: 'Mobile Usability',
    detail: 'Is the website easy to read and navigate on a phone?',
  },
  {
    label: 'Ease of Contact',
    detail: 'Can I call, message, or request a quote without friction?',
  },
];

const journeyBreaks = [
  {
    label: 'Conflicting information across channels',
    detail:
      'When the Google listing shows one phone number and the website shows another, customers are left guessing which is correct — and may contact neither.',
  },
  {
    label: 'Services described too vaguely',
    detail:
      'A page that lists broad categories without specifics gives the customer no confidence that the business covers their exact need.',
  },
  {
    label: 'Phone number buried or missing',
    detail:
      'If the contact number requires searching through multiple pages or is not present at all, many mobile visitors will move on rather than look for it.',
  },
  {
    label: 'Reviews that look old or unanswered',
    detail:
      'Reviews from years ago with no owner responses signal that the business may not be actively engaged with its customers.',
  },
  {
    label: 'Service area not visible',
    detail:
      'A customer who cannot quickly confirm the business covers their city or neighbourhood will not wait to find out.',
  },
  {
    label: 'Difficult mobile navigation',
    detail:
      'Menus that do not open, text that requires zooming, and tap targets too small to press accurately all interrupt the contact path.',
  },
  {
    label: 'Contact form too long or complex',
    detail:
      'A form that asks for too many details before the customer has committed to contact often results in the form being abandoned.',
  },
  {
    label: 'Outdated or broken pages',
    detail:
      'An old copyright year, a 404 page, or content that has not been updated in years signals that the business may not be actively operating.',
  },
  {
    label: 'Social links lead to inconsistent information',
    detail:
      'A social link that goes to a page with a different business name, old branding, or contradictory details erodes the confidence the website was building.',
  },
];

const selfAuditSteps = [
  'Open an incognito browser window and search the business name.',
  'Review the Google Business Profile listing that appears.',
  'Compare the phone number, hours, services, and website link shown in the profile against the website.',
  'Open the website on a phone.',
  'Confirm that the service area is visible within the first screen.',
  'Locate the primary contact action — call, form, or quote request.',
  'Test the phone number link to confirm it dials correctly on mobile.',
  'Submit a test entry on the contact form and confirm a confirmation message appears.',
  'Check that the next step is obvious to someone who has never visited the site before.',
];

// ─── Shared local components ──────────────────────────────────────────────────

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="font-serif"
      style={{
        borderLeft: '3px solid var(--charcoal)',
        paddingLeft: 20,
        margin: '32px 0',
        fontSize: 'clamp(1.0625rem, 1.8vw, 1.25rem)',
        lineHeight: 1.5,
        color: 'var(--charcoal)',
      }}
    >
      {children}
    </blockquote>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow" style={{ marginBottom: 12 }}>
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LocalVisibilityCustomerDecisionPath() {
  const shouldReduceMotion = useReducedMotion();

  const s1Ref = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.08,
    start: 'top 82%',
    childSelector: '.reveal-child',
  });
  const s2Ref = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.08,
    start: 'top 82%',
    childSelector: '.reveal-child',
  });
  const s3Ref = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.08,
    start: 'top 82%',
    childSelector: '.reveal-child',
  });
  const s4Ref = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.08,
    start: 'top 82%',
    childSelector: '.reveal-child',
  });
  const s5Ref = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.08,
    start: 'top 82%',
    childSelector: '.reveal-child',
  });
  const auditRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.07,
    start: 'top 82%',
    childSelector: '.reveal-child',
  });

  return (
    <div>
      <SEO
        title="How Local Customers Decide Which Business to Contact | NLDS"
        description="Understand the steps local customers take before calling, messaging, requesting a quote, or visiting a business."
        canonical="https://newlvlstudio.com/local-visibility-insights/customer-decision-path"
        ogType="article"
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
          {/* Breadcrumb */}
          <motion.div style={{ marginBottom: 32 }} variants={shouldReduceMotion ? undefined : fadeUp}>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/local-visibility-insights/">Local Visibility Insights</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Customer Decision Path</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHT · NO. 2
          </motion.p>

          <motion.h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 860,
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Where Do Local Customers Decide Which Business to Contact?
          </motion.h1>

          <motion.p
            className="font-sans mt-6"
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.1875rem)',
              lineHeight: 1.65,
              color: 'var(--muted-text)',
              maxWidth: 640,
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            The decision usually does not happen in one place. Customers may discover a business
            in search, compare reviews, visit the website, check its service area, and then decide
            whether it feels clear, credible, and easy to contact.
          </motion.p>

          {/* Takeaway panel */}
          <motion.div
            style={{
              backgroundColor: 'var(--bg-soft)',
              border: '1px solid var(--border-color)',
              padding: 'clamp(20px, 3vw, 28px)',
              marginTop: 36,
              maxWidth: 600,
            }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <p
              className="font-sans"
              style={{
                fontSize: '0.6875rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--muted-text)',
                marginBottom: 10,
              }}
            >
              The Main Idea
            </p>
            <p
              className="font-serif"
              style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.1875rem)',
                lineHeight: 1.45,
                color: 'var(--charcoal)',
              }}
            >
              Every touchpoint either strengthens confidence or creates friction.
            </p>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. SECTION 1: Decision Starts Before the Website ────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
              <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
                <SectionLabel>SECTION 1</SectionLabel>
              </motion.div>
              <motion.h2
                className="font-serif mt-2"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                The Decision Starts Before the Website Visit
              </motion.h2>
            </motion.div>

            <div ref={s1Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 14,
                }}
              >
                Before a customer opens the website, they have often already formed a rough
                impression of the business. The name, category, photos, rating, and description
                visible in search results or on Google Maps give them enough to decide whether
                the business is worth a closer look.
              </p>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                Customers may encounter the business across several of these channels before making
                any contact:
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {discoveryChannels.map((ch) => (
                    <li
                      key={ch.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '14px 0',
                        display: 'grid',
                        gridTemplateColumns: '130px 1fr',
                        gap: 16,
                        alignItems: 'start',
                      }}
                    >
                      <span
                        className="font-sans"
                        style={{
                          fontSize: '0.6875rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--charcoal)',
                          paddingTop: 2,
                        }}
                      >
                        {ch.label}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                      >
                        {ch.detail}
                      </span>
                    </li>
                  ))}
                  <li style={{ borderTop: '1px solid var(--border-color)' }} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SECTION 2: Common Local Customer Journey ──────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 8vw, 100px) 0' }}
      >
        <div className="container-nlds">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
              <SectionLabel>SECTION 2</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif mt-2"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 560,
                marginBottom: 48,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              A Common Local Customer Journey
            </motion.h2>
          </motion.div>

          <div ref={s2Ref}>
            {journeyStages.map((stage) => (
              <div
                key={stage.num}
                className="reveal-child"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 'clamp(16px, 2.5vw, 32px)',
                  alignItems: 'start',
                  padding: '28px 0',
                  borderTop: '1px solid var(--silver-grey)',
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    width: 44,
                    height: 44,
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
                    {stage.num}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 12,
                      flexWrap: 'wrap',
                      marginBottom: 10,
                    }}
                  >
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                        color: 'var(--charcoal)',
                        lineHeight: 1.2,
                      }}
                    >
                      {stage.stage}
                    </h3>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--muted-text)',
                        fontStyle: 'italic',
                      }}
                    >
                      {stage.question}
                    </span>
                  </div>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.65,
                      color: 'var(--muted-text)',
                    }}
                  >
                    {stage.detail}
                  </p>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--silver-grey)' }} />
          </div>
        </div>
      </section>

      {/* ── 4. SECTION 3: What Customers Evaluate ───────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
              <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
                <SectionLabel>SECTION 3</SectionLabel>
              </motion.div>
              <motion.h2
                className="font-serif mt-2"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                What Customers Are Evaluating at Each Step
              </motion.h2>
            </motion.div>

            <div ref={s3Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                Across every channel, customers are measuring the same set of signals. Each signal
                either adds confidence or adds doubt. The businesses that make it easiest to answer
                these questions are the ones most likely to receive contact.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {evaluationItems.map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '14px 0',
                        display: 'grid',
                        gridTemplateColumns: '130px 1fr',
                        gap: 16,
                        alignItems: 'start',
                      }}
                    >
                      <span
                        className="font-sans"
                        style={{
                          fontSize: '0.6875rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--charcoal)',
                          paddingTop: 2,
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                      >
                        {item.detail}
                      </span>
                    </li>
                  ))}
                  <li style={{ borderTop: '1px solid var(--border-color)' }} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SECTION 4: Common Breaks in the Journey ──────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 8vw, 100px) 0' }}
      >
        <div className="container-nlds">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
              <SectionLabel>SECTION 4</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif mt-2"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 560,
                marginBottom: 48,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Common Breaks in the Journey
            </motion.h2>
          </motion.div>

          <div ref={s4Ref}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'clamp(12px, 2vw, 20px)' }}
            >
              {journeyBreaks.map((item) => (
                <article
                  key={item.label}
                  className="reveal-child"
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-color)',
                    padding: 'clamp(20px, 2.5vw, 28px)',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: 'clamp(1rem, 1.8vw, 1.1875rem)',
                      color: 'var(--charcoal)',
                      lineHeight: 1.2,
                      marginBottom: 12,
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                  >
                    {item.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SECTION 5: Website's Critical Role ───────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
              <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
                <SectionLabel>SECTION 5</SectionLabel>
              </motion.div>
              <motion.h2
                className="font-serif mt-2"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                  lineHeight: 1.1,
                  color: 'var(--charcoal)',
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                The Website Still Plays a Critical Role
              </motion.h2>
            </motion.div>

            <div ref={s5Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 14,
                }}
              >
                Search and Maps help customers discover the business and form an initial opinion.
                Reviews influence how much confidence they carry into the website visit. But the
                website is where customers decide whether the business is actually worth contacting.
              </p>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 14,
                }}
              >
                The website should confirm everything the customer has already seen. If the Google
                profile says the business serves a certain area and offers specific services, the
                website should say the same thing — clearly, without requiring the customer to dig.
              </p>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                The final decision to contact typically depends on whether the website feels clear,
                current, and trustworthy — and whether contacting the business is easy enough to
                do without friction.
              </p>

              <Callout>Discovery gets attention. The website earns the contact.</Callout>

              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 20,
                }}
              >
                Understanding what makes a website feel trustworthy to a local customer is a
                separate — and equally important — question.
              </p>

              <div className="reveal-child">
                <Link
                  to="/local-visibility-insights/website-trust/"
                  className="font-sans text-link"
                  style={{ fontSize: '0.9375rem' }}
                >
                  See what makes a local business website feel trustworthy &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION 6: Self-Audit ─────────────────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 8vw, 100px) 0' }}
      >
        <div className="container-nlds">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              TAKE ACTION
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
              How to Check Your Own Customer Path
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 520,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Work through these steps using your own business. No special tools are required
              to start.
            </motion.p>
          </motion.div>

          <div ref={auditRef} style={{ marginTop: 48 }}>
            {selfAuditSteps.map((step, i) => (
              <div
                key={i}
                className="reveal-child"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 'clamp(14px, 2vw, 24px)',
                  alignItems: 'start',
                  padding: '20px 0',
                  borderTop: '1px solid var(--silver-grey)',
                }}
              >
                <span
                  className="font-serif"
                  aria-hidden="true"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--silver-grey)',
                    lineHeight: 1.6,
                    minWidth: 24,
                    paddingTop: 1,
                  }}
                >
                  {i + 1}
                </span>
                <p
                  className="font-sans"
                  style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--muted-text)' }}
                >
                  {step}
                </p>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--silver-grey)', marginBottom: 36 }} />

            <div className="reveal-child">
              <Link to="/free-seo-tools/" className="btn-secondary">
                Use the Free SEO Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. RELATED RESOURCES ─────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-soft)',
          padding: 'clamp(48px, 6vw, 72px) 0',
          borderTop: '1px solid var(--silver-grey)',
          borderBottom: '1px solid var(--silver-grey)',
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
              RELATED RESOURCES
            </motion.p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 28 }}
          >
            {[
              {
                label: 'Local Visibility Insight',
                title: 'What Makes a Local Business Website Trustworthy?',
                desc: 'The website details that help customers understand who you are, what you offer, and what to do next.',
                href: '/local-visibility-insights/website-trust/',
              },
              {
                label: 'Local Visibility Insight',
                title: 'How Complete Is Your Google Business Profile?',
                desc: 'The profile fields that help customers understand, trust, and contact a local business.',
                href: '/local-visibility-insights/google-profile-completeness/',
              },
              {
                label: 'Local Visibility Insight',
                title: 'How Quickly Can Customers Find Your Contact Information?',
                desc: 'How phone numbers, forms, tap-to-call links, and clear next steps affect whether customers complete the path to contact.',
                href: '/local-visibility-insights/contact-information/',
              },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <article
                  style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-color)',
                    padding: 'clamp(20px, 2.5vw, 28px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
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
                      marginBottom: 10,
                      display: 'block',
                    }}
                  >
                    {item.label}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: '1.125rem',
                      color: 'var(--charcoal)',
                      lineHeight: 1.2,
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-sans"
                    style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                  >
                    {item.desc}
                  </p>
                </article>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <Link
              to="/local-visibility-insights/"
              className="font-sans text-link"
              style={{ fontSize: '0.9375rem' }}
            >
              &larr; Back to Local Visibility Insights
            </Link>
          </div>
        </div>
      </section>

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
            RAISE THE STANDARD
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
            Is Your Online Customer Journey Clear From Search to Contact?
          </motion.h2>
          <motion.p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            NLDS helps local businesses improve the full path from discovery to trust to contact
            through website-first design and local visibility guidance.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 12, marginTop: 36 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <Link to="/contact/" className="btn-primary">
              Request a Free Website Review
            </Link>
            <Link to="/services/" className="btn-secondary">
              Explore Website Services
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

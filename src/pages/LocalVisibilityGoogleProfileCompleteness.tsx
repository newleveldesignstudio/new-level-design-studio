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
    '@id':
      'https://newlvlstudio.com/local-visibility-insights/google-profile-completeness/#article',
    url: 'https://newlvlstudio.com/local-visibility-insights/google-profile-completeness/',
    name: 'How Complete Is Your Google Business Profile?',
    headline: 'How Complete Is Your Google Business Profile?',
    description:
      'Review the key Google Business Profile details that help customers understand, trust, and contact a local business.',
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
        name: 'Google Profile Completeness',
        item: 'https://newlvlstudio.com/local-visibility-insights/google-profile-completeness/',
      },
    ],
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const coreFields = [
  {
    label: 'Business Name',
    detail:
      'Use the exact legal or operating name — not a keyword-stuffed version. Inaccurate names can confuse customers and violate platform guidelines.',
  },
  {
    label: 'Primary Category',
    detail:
      'Choose the category that most accurately describes the core business. This is the most influential classification field on the profile.',
  },
  {
    label: 'Secondary Categories',
    detail:
      'Add secondary categories only for services the business genuinely provides. Irrelevant categories add noise without benefit.',
  },
  {
    label: 'Phone Number',
    detail:
      'Use a direct number that the business actively answers. Keep it consistent with the website and other listings.',
  },
  {
    label: 'Website Link',
    detail:
      'Link to the main website homepage or the most relevant service page. Confirm the link is current and loads correctly.',
  },
  {
    label: 'Business Hours',
    detail:
      'Keep hours accurate, including holiday exceptions. Outdated hours create a poor first impression and can prevent customers from visiting.',
  },
  {
    label: 'Address or Service Area',
    detail:
      'If the business serves customers at a physical location, add the address. If the business travels to customers, set up a service area instead.',
  },
  {
    label: 'Service Areas',
    detail:
      'List the cities, towns, or counties the business genuinely covers. Avoid listing areas that are too far to serve reliably.',
  },
];

const photoGuidelines = [
  {
    label: 'Work Examples',
    detail:
      'Photos of completed projects, finished work, or the service in progress help customers understand what to expect.',
  },
  {
    label: 'Location Photos',
    detail:
      'If the business operates from a physical location, a clear exterior photo helps customers recognise it on arrival.',
  },
  {
    label: 'Team or Owner Photos',
    detail:
      'Putting a face to the business builds familiarity and trust, especially for service businesses where the owner is part of the product.',
  },
  {
    label: 'Logo and Cover Image',
    detail:
      'Use the current business logo and a cover image that is on-brand and clearly represents the business.',
  },
  {
    label: 'Image Quality',
    detail:
      'Current, clear images signal an active business. Old or low-quality photos may suggest the listing has been abandoned.',
  },
  {
    label: 'Accuracy',
    detail:
      'Every photo should reflect actual work, actual locations, or actual team members. Misleading images create a credibility gap.',
  },
];

const reviewGuidance = [
  {
    label: 'Ask for Feedback',
    detail:
      'After completing a job, ask satisfied customers to share their experience. A direct, specific ask is more effective than a generic prompt.',
  },
  {
    label: 'Keep It Honest',
    detail:
      'Do not request only positive reviews, filter out unhappy customers, or offer incentives. These practices violate Google policy and reduce trust.',
  },
  {
    label: 'Respond Professionally',
    detail:
      'Reply to every review — positive and critical. Keep responses specific, respectful, and genuine. Generic replies add less value than a thoughtful sentence.',
  },
  {
    label: 'Review Recency',
    detail:
      'Customers notice when the most recent review is several years old. Consistent activity over time is more reassuring than a burst of old reviews.',
  },
];

const consistencyFields = [
  'Business name',
  'Phone number',
  'Business hours',
  'Services offered',
  'Service area',
  'Branding and logo',
  'Website destination URL',
  'Contact information',
];

const profileGaps = [
  {
    label: 'Wrong primary category',
    detail:
      'An incorrect primary category can send customers looking for the wrong type of business. Review it periodically, especially after adding new services.',
  },
  {
    label: 'Missing services',
    detail:
      'A profile with no services listed gives customers no way to confirm whether the business covers their specific need.',
  },
  {
    label: 'Outdated hours',
    detail:
      'Hours that no longer reflect reality create problems when a customer arrives and finds the business closed — or does not arrive at all because the listed hours were inconvenient.',
  },
  {
    label: 'Incorrect website link',
    detail:
      'A broken link or a link to an old domain prevents customers from reaching the website. Check the link periodically.',
  },
  {
    label: 'Old or low-quality photos',
    detail:
      'A profile with only old photos, blurry images, or no photos at all gives customers less confidence in the quality of the work.',
  },
  {
    label: 'Unanswered reviews',
    detail:
      'Reviews that have never received a response — particularly critical ones — suggest the business is not engaged with its customers.',
  },
  {
    label: 'Service areas that do not match reality',
    detail:
      'Listing areas too far to serve reliably, or failing to list areas actually covered, both create problems — one for customers, one for the business.',
  },
  {
    label: 'Inconsistent contact information',
    detail:
      'When the profile shows different contact details than the website or other listings, customers may question which source is reliable.',
  },
  {
    label: 'Empty business description',
    detail:
      'The description field is one of the few opportunities to explain the business in plain language. Leaving it blank is a missed chance to help customers understand what makes the business worth contacting.',
  },
  {
    label: 'Duplicate or unmanaged listings',
    detail:
      'Multiple listings for the same business — whether created by accident or by the platform itself — can split reviews, confuse customers, and present conflicting information.',
  },
];

const checklistSteps = [
  'Confirm the business name is the correct operating name.',
  'Review the primary category and confirm it matches the core service.',
  'Open the services section and verify each listed service is accurate and specific.',
  'Check the current hours, including any exceptions for holidays or seasonal changes.',
  'Click the website link to confirm it opens the correct page.',
  'Confirm the phone number is the current direct line.',
  'Review the photos — check for current images, appropriate quality, and an accurate cover image.',
  'Read recent customer reviews and respond to any that have not yet received a reply.',
  'Confirm the service areas reflect where the business actually works.',
  'Compare the profile details against the website to check for consistency.',
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

export default function LocalVisibilityGoogleProfileCompleteness() {
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
  const s6Ref = useScrollReveal<HTMLDivElement>({
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
        title="Google Business Profile Completeness Checklist | NLDS"
        description="Review the key Google Business Profile details that help customers understand, trust, and contact a local business."
        canonical="https://newlvlstudio.com/local-visibility-insights/google-profile-completeness"
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
                    <Link to="/local-visibility-insights">Local Visibility Insights</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Google Profile Completeness</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHT · NO. 3
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
            How Complete Is Your Google Business Profile?
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
            A complete profile helps customers understand what the business does, where it works,
            when it is available, and how to make contact. Missing or outdated details create
            uncertainty.
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
              A complete profile should answer the customer&apos;s basic questions without making
              them guess.
            </p>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. SECTION 1: Core Business Information ─────────────────────── */}
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
                Start With the Core Business Information
              </motion.h2>
            </motion.div>

            <div ref={s1Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                These are the foundational details customers rely on to understand and contact the
                business. Every field should be accurate and consistent with the website and other
                listings. An error in any of these fields can interrupt the customer&apos;s path
                before they reach the website at all.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {coreFields.map((field) => (
                    <li
                      key={field.label}
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
                        {field.label}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                      >
                        {field.detail}
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

      {/* ── 3. SECTION 2: Services ───────────────────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
                <SectionLabel>SECTION 2</SectionLabel>
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
                List the Services Customers Can Actually Hire You For
              </motion.h2>
            </motion.div>

            <div ref={s2Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 14,
                }}
              >
                Vague service labels like &quot;services&quot; or &quot;general work&quot; give
                customers nothing specific to evaluate. Use the names customers would actually
                search for, keep descriptions accurate, and match the services listed on the
                website.
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
                Do not add services the business does not genuinely provide. A customer who
                contacts the business expecting a service it cannot deliver is unlikely to become
                a satisfied client.
              </p>

              <Callout>
                Specific service names help customers self-qualify before they contact you.
              </Callout>

              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)' }}
              >
                The services listed in the profile should match those on the website.
                Inconsistency between the two creates quiet doubt about which source is current.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION 3: Photos ─────────────────────────────────────────── */}
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
                Use Photos That Help Customers Verify the Business
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
                Photos give customers a way to verify that the business is real, active, and
                capable of the work it claims. A profile with no photos or only outdated images
                gives potential customers far less to evaluate than one with clear, current images
                of real work.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {photoGuidelines.map((item) => (
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

      {/* ── 5. SECTION 4: Reviews ────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-main)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
                <SectionLabel>SECTION 4</SectionLabel>
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
                Reviews and Responses Show Activity
              </motion.h2>
            </motion.div>

            <div ref={s4Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                Reviews give potential customers a way to hear from people who have already used
                the business. How the business responds to those reviews — and how recently they
                were received — signals whether the business is still actively engaged.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {reviewGuidance.map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '16px 0',
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

      {/* ── 6. SECTION 5: Profile and Website Should Match ───────────────── */}
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
                The Profile and Website Should Match
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
                When a customer moves from the Google profile to the website, they expect to see
                the same information in both places. Discrepancies — a different phone number,
                services listed on one platform but not the other, different hours — raise quiet
                doubt about which source is current and whether the business is reliably managed.
              </p>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 20,
                }}
              >
                These details should be consistent across both:
              </p>

              <div className="reveal-child" style={{ marginBottom: 28 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {consistencyFields.map((item) => (
                    <li
                      key={item}
                      className="font-sans"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.5,
                        color: 'var(--muted-text)',
                        padding: '9px 0',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          width: 20,
                          height: 1,
                          backgroundColor: 'var(--silver-grey)',
                          display: 'inline-block',
                        }}
                      />
                      {item}
                    </li>
                  ))}
                  <li style={{ borderBottom: '1px solid var(--border-color)' }} />
                </ul>
              </div>

              <div className="reveal-child">
                <Link
                  to="/local-visibility-insights/customer-decision-path"
                  className="font-sans text-link"
                  style={{ fontSize: '0.9375rem' }}
                >
                  See how consistency affects the full customer decision path &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION 6: Common Profile Gaps ───────────────────────────── */}
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
              <SectionLabel>SECTION 6</SectionLabel>
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
              Common Google Business Profile Gaps
            </motion.h2>
          </motion.div>

          <div ref={s6Ref}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'clamp(12px, 2vw, 20px)' }}
            >
              {profileGaps.map((item) => (
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

      {/* ── 8. SECTION 7: Five-Minute Check ─────────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 8vw, 100px) 0' }}
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
              Run a Five-Minute Google Profile Check
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
              Work through these steps using your own profile. No special tools are required.
            </motion.p>
          </motion.div>

          <div ref={auditRef} style={{ marginTop: 48 }}>
            {checklistSteps.map((step, i) => (
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

            <div
              className="reveal-child flex flex-col sm:flex-row items-start sm:items-center"
              style={{ gap: 12 }}
            >
              <a
                href="https://business.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Manage Your Google Business Profile
              </a>
              <Link to="/free-seo-tools" className="btn-secondary">
                Explore Free SEO Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. RELATED RESOURCES ─────────────────────────────────────────── */}
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
                title: 'Where Do Local Customers Decide Which Business to Contact?',
                desc: 'The decision points between discovery and first contact — and what businesses can do to improve them.',
                href: '/local-visibility-insights/customer-decision-path',
              },
              {
                label: 'Local Visibility Insight',
                title: 'What Makes a Local Business Website Trustworthy?',
                desc: 'The website details that help customers understand who you are, what you offer, and what to do next.',
                href: '/local-visibility-insights/website-trust',
              },
              {
                label: 'Local Visibility Insight',
                title: 'How Recent Are Your Business Reviews?',
                desc: 'Why review recency, honest feedback, and professional responses influence how local customers evaluate a business.',
                href: '/local-visibility-insights/review-recency',
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
              to="/local-visibility-insights"
              className="font-sans text-link"
              style={{ fontSize: '0.9375rem' }}
            >
              &larr; Back to Local Visibility Insights
            </Link>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ────────────────────────────────────────────────── */}
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
            Does Your Google Profile Make the Business Easy to Understand?
          </motion.h2>
          <motion.p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            NLDS helps local businesses improve the connection between their Google profile,
            website, brand presentation, and customer contact path.
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
              Explore Website Services
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

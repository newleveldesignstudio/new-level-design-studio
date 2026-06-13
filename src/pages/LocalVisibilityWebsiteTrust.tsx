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
    '@id': 'https://newlvlstudio.com/local-visibility-insights/website-trust/#article',
    url: 'https://newlvlstudio.com/local-visibility-insights/website-trust/',
    name: 'What Makes a Local Business Website Trustworthy?',
    headline: 'What Makes a Local Business Website Feel Trustworthy?',
    description:
      'Learn which website details help local customers trust a business, understand its services, confirm its location, and feel confident making contact.',
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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Website Trust',
        item: 'https://newlvlstudio.com/local-visibility-insights/website-trust/',
      },
    ],
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const clarityChecklist = [
  'Is the main service obvious without scrolling?',
  'Is the city or service area visible on the homepage?',
  'Is the next step clear — call, quote, form?',
  'Can a new visitor understand the business within a few seconds?',
];

const mobileChecklist = [
  'Text is readable without zooming',
  'Tap targets are large enough to use without errors',
  'Phone number taps to call directly',
  'Navigation is accessible with one hand',
  'Forms are short and easy to complete on a small screen',
  'The page does not shift or bounce during load',
  'The primary CTA is visible above the fold on a phone',
];

const selfAuditSteps = [
  'Read the homepage without scrolling and identify the main service.',
  'Confirm the city or service area is visible on the page.',
  'Find the phone number or primary contact action.',
  'Load the website on a phone and check readability, speed, and navigation.',
  'Verify the services listed are specific, not generic.',
  'Check that the business details on the website match the Google Business Profile.',
  'Confirm that any reviews, photos, or credentials shown are genuine.',
  'Test every important contact link and form to confirm they work.',
];

const trustProblems = [
  {
    label: 'Vague service descriptions',
    detail:
      'Phrases like "quality work" or "professional service" do not help customers understand what the business actually does or whether it covers their specific need.',
  },
  {
    label: 'Missing service area',
    detail:
      'A customer looking for a local provider who cannot quickly confirm the business serves their area will move on to a result that does.',
  },
  {
    label: 'Hidden contact information',
    detail:
      'Contact details buried in a footer or limited to a single contact page create friction that reduces enquiries, especially from mobile users.',
  },
  {
    label: 'Outdated or broken pages',
    detail:
      'An old copyright year, a broken link, or a page that has not been updated in years signals that the business may not be actively operating.',
  },
  {
    label: 'Stock imagery that does not reflect the business',
    detail:
      'Generic stock photos of people who do not represent the team or work that does not match the actual services undermine credibility.',
  },
  {
    label: 'Inconsistent business details',
    detail:
      'When the phone number, address, or service area differs between the website, Google Business Profile, and other listings, customers and search engines lose confidence.',
  },
  {
    label: 'No clear call to action',
    detail:
      'If it is not obvious what the visitor should do next, a meaningful portion of them will simply leave rather than searching for a way to get in touch.',
  },
  {
    label: 'Poor mobile experience',
    detail:
      'A website that is difficult to read or navigate on a phone creates a poor first impression at exactly the moment a customer is most likely to be looking for help.',
  },
];

const consistencyItems = [
  'Business name',
  'Phone number',
  'Service area',
  'Business hours',
  'Services listed',
  'Branding and logo usage',
  'Website URL',
];

// ─── Shared small components ──────────────────────────────────────────────────

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

function CheckItem({ text }: { text: string }) {
  return (
    <li
      className="font-sans"
      style={{
        fontSize: '0.9375rem',
        lineHeight: 1.55,
        color: 'var(--muted-text)',
        padding: '9px 0',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flexShrink: 0,
          marginTop: '0.2em',
          width: 16,
          height: 16,
          border: '1px solid var(--silver-grey)',
          display: 'inline-block',
        }}
      />
      {text}
    </li>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="eyebrow"
      style={{ marginBottom: 12 }}
    >
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LocalVisibilityWebsiteTrust() {
  const shouldReduceMotion = useReducedMotion();

  const s1Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const s2Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const s3Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const s4Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const s5Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const s6Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const s7Ref = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.08, start: 'top 82%', childSelector: '.reveal-child' });
  const auditRef = useScrollReveal<HTMLDivElement>({ y: 24, duration: 0.55, stagger: 0.07, start: 'top 82%', childSelector: '.reveal-child' });

  return (
    <div>
      <SEO
        title="What Makes a Local Business Website Trustworthy? | NLDS"
        description="Learn which website details help local customers trust a business, understand its services, confirm its location, and feel confident making contact."
        canonical="https://newlvlstudio.com/local-visibility-insights/website-trust"
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
          <motion.div
            style={{ marginBottom: 32 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
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
                  <BreadcrumbPage>Website Trust</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHT · NO. 1
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
            What Makes a Local Business Website Feel Trustworthy?
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
            Customers often decide whether a business feels credible before they ever make
            contact. A trustworthy website makes the business easy to understand, easy to
            verify, and easy to reach.
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
              Trust comes from consistency, clarity, proof, and a clear next step — not from
              flashy design alone.
            </p>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. SECTION 1: UNDERSTAND THE BUSINESS QUICKLY ───────────────── */}
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
                Customers Need to Understand the Business Quickly
              </motion.h2>
            </motion.div>

            <div ref={s1Ref}>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                When a customer arrives on a local business website, they are trying to answer
                a small set of questions: What does this business do? Does it serve my area?
                Is this a business I can trust? What should I do next?
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                Vague headlines and broad claims — "your local experts," "quality you can trust,"
                "serving the community" — do not answer those questions. They create a moment of
                uncertainty, and uncertain visitors often leave before scrolling.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 28 }}
              >
                The first few seconds a visitor spends on a page determine whether they continue
                reading. A clear headline that names the service and the location gives customers
                an immediate reason to stay.
              </p>

              <div className="reveal-child">
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    marginBottom: 10,
                  }}
                >
                  Clarity Check
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {clarityChecklist.map((item) => (
                    <CheckItem key={item} text={item} />
                  ))}
                  <li style={{ borderBottom: '1px solid var(--border-color)' }} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SECTION 2: CONTACT INFORMATION ───────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-main)',
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
                Contact Information Should Be Easy to Find
              </motion.h2>
            </motion.div>

            <div ref={s2Ref}>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                A phone number that appears at the top of every page, a clearly labeled contact
                button in the navigation, and a visible form on the homepage remove the friction
                between interest and action. On mobile, the phone number should tap to call.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                Contact details should also be consistent. A business that lists a different
                phone number on its website than on its Google Business Profile raises quiet
                doubts about reliability.
              </p>

              <Callout>
                A customer should not have to search through several pages to figure out how to
                reach the business.
              </Callout>

              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)' }}
              >
                If the primary contact path is a form, the form should be short and confirm
                receipt clearly. A submission that disappears into silence without any confirmation
                leaves the customer unsure whether their message was received.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION 3: REAL SIGNS OF CREDIBILITY ─────────────────────── */}
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
                The Website Should Show Real Signs of Credibility
              </motion.h2>
            </motion.div>

            <div ref={s3Ref}>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                Credibility signals help customers confirm they are dealing with a legitimate,
                operating business. These include the real company name, an accurate service
                area, a description of how long the business has been operating when that is
                accurate, and any licenses or affiliations that apply to the work.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                Real project photos — even simple ones — carry more weight than stock imagery
                because they show what the business actually produces. Information about the
                owner or team helps customers feel they know who they are contacting.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                Genuine customer reviews and honest case studies add further confidence.
                A business with no visible proof of past work and no customer feedback is harder
                to evaluate than one with even a modest number of real reviews and a few project
                examples.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)' }}
              >
                Only include credentials, certifications, or affiliations that are real and
                current. A certificate that expired or a professional body that is no longer
                relevant can create more confusion than it resolves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. SECTION 4: DESIGN AND CLARITY ────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-main)',
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
                Design Affects Trust, but Clarity Comes First
              </motion.h2>
            </motion.div>

            <div ref={s4Ref}>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                An outdated layout can signal that a business is no longer active or that it
                does not invest in its own presentation. Poor mobile spacing and inconsistent
                typography reduce the sense that a business is professional and attentive.
                Excessive animation can obscure the message rather than enhance it.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 28 }}
              >
                That said, visual polish cannot substitute for clarity. A beautifully designed
                page that does not explain what the business does is still a page that fails the
                customer. Design should support the message, not distract from it.
              </p>

              <div className="reveal-child">
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    marginBottom: 12,
                  }}
                >
                  The NLDS First Impression System
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    { label: 'Clarity', desc: 'The business and its services are immediately understandable.' },
                    { label: 'Credibility', desc: 'Real proof builds confidence in the business.' },
                    { label: 'Presentation', desc: 'The visual quality reflects the standard of the work.' },
                    { label: 'Conversion', desc: 'The path to contact is clear and easy to complete.' },
                    { label: 'Support', desc: 'The website is maintained, accurate, and technically sound.' },
                  ].map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '12px 0',
                        display: 'grid',
                        gridTemplateColumns: '100px 1fr',
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
                        style={{ fontSize: '0.875rem', lineHeight: 1.55, color: 'var(--muted-text)' }}
                      >
                        {item.desc}
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

      {/* ── 6. SECTION 5: MOBILE ────────────────────────────────────────── */}
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
                Mobile Visitors Need a Friction-Free Path
              </motion.h2>
            </motion.div>

            <div ref={s5Ref}>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                A significant portion of local business website visits happen on a phone, often
                at the moment a customer is looking for a specific service in their area. A
                website that is slow to load, hard to navigate with a thumb, or that requires
                zooming to read loses those customers at the highest-intent moment.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 28 }}
              >
                The contact path on mobile should be as short and direct as possible. A phone
                number that taps to call, a form that does not require excessive fields, and a
                clear CTA visible without scrolling all reduce the chance that a customer leaves
                before getting in touch.
              </p>

              <div className="reveal-child">
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    marginBottom: 10,
                  }}
                >
                  Mobile Checklist
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {mobileChecklist.map((item) => (
                    <CheckItem key={item} text={item} />
                  ))}
                  <li style={{ borderBottom: '1px solid var(--border-color)' }} />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION 6: CONSISTENCY ────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-main)',
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
              <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
                <SectionLabel>SECTION 6</SectionLabel>
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
                Consistency Builds Confidence
              </motion.h2>
            </motion.div>

            <div ref={s6Ref}>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 14 }}
              >
                When a customer finds a business on Google, visits the website, and checks the
                Google Business Profile, they expect to see the same information in each place.
                Inconsistencies — a different phone number, a different service area, outdated
                hours — raise quiet questions about whether the business is reliable or still
                actively operating.
              </p>
              <p
                className="font-sans reveal-child"
                style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--muted-text)', marginBottom: 28 }}
              >
                Consistency does not guarantee higher rankings, but it does reduce friction and
                doubt for customers who are comparing their options before deciding who to call.
              </p>

              <div className="reveal-child">
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    marginBottom: 10,
                  }}
                >
                  Check These Match Across Website and Profiles
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {consistencyItems.map((item) => (
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
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. SECTION 7: COMMON TRUST PROBLEMS ─────────────────────────── */}
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
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
              <SectionLabel>SECTION 7</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-serif mt-2"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 600,
                marginBottom: 48,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Common Website Trust Problems
            </motion.h2>
          </motion.div>

          <div ref={s7Ref}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'clamp(12px, 2vw, 20px)' }}
            >
              {trustProblems.map((problem) => (
                <article
                  key={problem.label}
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
                    {problem.label}
                  </h3>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'var(--muted-text)',
                    }}
                  >
                    {problem.detail}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. SELF-AUDIT ────────────────────────────────────────────────── */}
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
              Run a Five-Minute Website Trust Check
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
              Work through these steps using your own website. No special tools are required
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
              <Link to="/free-seo-tools" className="btn-secondary">
                Check Your Website with Free Tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. RELATED RESOURCES ────────────────────────────────────────── */}
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
                desc: 'The decision points between search results and first contact — and what businesses can do to improve them.',
                href: '/local-visibility-insights/customer-decision-path',
              },
              {
                label: 'Local Visibility Insight',
                title: 'Is Your Website Ready for Mobile Customers?',
                desc: 'What local businesses should check for mobile usability, including speed, navigation, tap-to-call, and contact flow.',
                href: '/local-visibility-insights/mobile-readiness',
              },
              {
                label: 'Free SEO Tools',
                title: 'Check the Technical Side',
                desc: 'Test your website speed, indexing, structured data, and local visibility with free tools.',
                href: '/free-seo-tools',
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
              ← Back to Local Visibility Insights
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────────────────────────── */}
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
            Does Your Website Build Trust Before the First Call?
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
            NLDS helps local businesses improve clarity, credibility, presentation, and contact
            flow through website-first design.
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

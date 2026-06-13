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
    '@id': 'https://newlvlstudio.com/local-visibility-insights/review-recency/#article',
    url: 'https://newlvlstudio.com/local-visibility-insights/review-recency/',
    name: 'How Recent Are Your Business Reviews?',
    headline: 'How Recent Are Your Business Reviews?',
    description:
      'Learn why review recency, honest feedback, and professional responses influence how local customers evaluate a business.',
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
        name: 'Review Recency',
        item: 'https://newlvlstudio.com/local-visibility-insights/review-recency/',
      },
    ],
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const recencySignals = [
  {
    label: 'Review Dates',
    detail:
      'A profile with reviews from several years ago and none since may suggest the business has slowed down or changed. Customers cannot tell from a date alone whether the business is still operating the same way.',
  },
  {
    label: 'Steady Pattern',
    detail:
      'Genuine review activity tends to happen naturally over time — not in clusters or long stretches of silence. A consistent pattern across months and years looks more credible than uneven bursts.',
  },
  {
    label: 'A Single Recent Review',
    detail:
      'One recent review does not erase a long gap. Customers often look at the distribution of dates, not just the most recent entry.',
  },
  {
    label: 'The Full Picture',
    detail:
      'Recency matters alongside quality, detail, and how the business has responded. A recent review with no response or no detail adds less confidence than a thoughtful, answered review from a few months ago.',
  },
];

const customerNotices = [
  {
    label: 'Review Detail',
    detail:
      'A review that describes a specific service, job, or interaction carries more weight than a short generic comment. Customers reading reviews look for details that match their own situation.',
  },
  {
    label: 'Specific Service References',
    detail:
      'Reviews that mention what was done, how long it took, or what made the experience useful help future customers understand what to expect.',
  },
  {
    label: 'Recent Dates',
    detail:
      'Customers often check when the most recent reviews were left and whether the pattern looks natural. Old reviews may not reflect the current state of the business.',
  },
  {
    label: 'Owner Responses',
    detail:
      'A business that responds to reviews — both positive and negative — signals that it is paying attention and cares about how customers are treated after the job is done.',
  },
  {
    label: 'Consistent Themes',
    detail:
      'When multiple reviews describe the same strengths or the same problems, customers are more likely to treat those themes as reliable. Patterns across reviews carry more weight than any single comment.',
  },
  {
    label: 'How Complaints Are Handled',
    detail:
      'A negative review met with a calm, specific response tells customers more about the business than the complaint itself. A defensive or dismissive response can make a single complaint more damaging.',
  },
  {
    label: 'Whether Reviews Appear Believable',
    detail:
      'Reviews that are vague, overly enthusiastic, or all left within a short window can look suspicious. Customers who notice this pattern may discount the reviews or distrust the business.',
  },
];

const askRightWayItems = [
  {
    label: 'Ask for honest feedback',
    detail:
      'Invite customers to share their experience — not to leave a five-star review. The request should be open, not leading.',
  },
  {
    label: 'Ask all customers equally',
    detail:
      'Sending review requests only to customers the business believes had a good experience — and withholding the request from others — is called review gating. It is against platform policies.',
  },
  {
    label: 'Do not request a specific rating',
    detail:
      'Asking customers to leave a five-star review, or framing the request in a way that implies a specific outcome, violates the policies of most review platforms.',
  },
  {
    label: 'Do not offer incentives',
    detail:
      'Giving discounts, gifts, or other benefits in exchange for reviews is prohibited by Google and most other platforms, and may lead to listing penalties.',
  },
  {
    label: 'Do not create fake reviews',
    detail:
      'Posting reviews as customers, having employees write reviews, or paying for reviews is against platform rules and undermines the trust that genuine reviews are meant to build.',
  },
  {
    label: 'Follow platform policies',
    detail:
      'Review platforms update their policies over time. The safest approach is to ask genuinely, ask all customers, and avoid any practice that looks like manipulation.',
  },
];

const responseGuidance = [
  {
    label: 'Respond professionally',
    detail:
      'Responses are public. Keep the tone calm and considerate regardless of what the review says. Other potential customers will read the response as much as they read the review itself.',
  },
  {
    label: 'Be specific',
    detail:
      'A response that addresses what the customer actually said — rather than a generic thank-you — shows that the business read the review and takes individual feedback seriously.',
  },
  {
    label: 'Avoid repetitive templates',
    detail:
      'Using the same response text across every review looks like automation. Even small variations in tone or specifics make responses feel more genuine.',
  },
  {
    label: 'Address concerns calmly',
    detail:
      'When a review describes a problem, acknowledge it briefly and, where appropriate, offer to continue the conversation offline. Publicly arguing with a customer rarely improves the situation.',
  },
  {
    label: 'Do not argue publicly',
    detail:
      'A defensive or combative response to a critical review is more visible than the review itself. Other customers will see it and form an impression of how the business handles complaints.',
  },
  {
    label: 'Protect customer privacy',
    detail:
      'Do not include a customer\'s personal details in a public response. If the situation requires more than a brief reply, ask the customer to continue the conversation directly.',
  },
];

const reviewProblems = [
  {
    label: 'No recent reviews',
    detail:
      'A long gap in review activity may suggest the business is less active, has changed, or is not asking customers for feedback. A customer evaluating several options may favour a business with more current evidence.',
  },
  {
    label: 'Many unanswered reviews',
    detail:
      'Reviews that receive no response signal that the business is not paying attention to what customers say publicly. This is especially noticeable when complaints go unanswered.',
  },
  {
    label: 'Copy-and-paste responses',
    detail:
      'Identical responses to every review suggest that replies are being managed automatically or not being read at all. Customers who read multiple reviews will notice the pattern.',
  },
  {
    label: 'Defensive responses to complaints',
    detail:
      'A response that argues with the customer, questions their experience, or shifts blame is visible to everyone who reads the review. It often leaves a worse impression than the original complaint.',
  },
  {
    label: 'Review gating',
    detail:
      'Selectively asking for reviews only from satisfied customers is a violation of platform policies. It creates an artificially skewed rating that does not reflect actual customer experience.',
  },
  {
    label: 'Incentivised reviews',
    detail:
      'Offering anything of value in exchange for a review is prohibited by most platforms. If discovered, listings may be penalised or reviews removed.',
  },
  {
    label: 'Fake or misleading feedback',
    detail:
      'Reviews written by employees, owners, friends, or paid services do not reflect genuine customer experience. Platforms actively work to detect and remove them.',
  },
  {
    label: 'Reviews describing discontinued services',
    detail:
      'When reviews mention services the business no longer offers, customers may contact the business expecting something unavailable. This creates frustration on both sides.',
  },
  {
    label: 'Inconsistent business information in reviews',
    detail:
      'Old reviews may reference a previous address, phone number, or business name. If this information differs from the current website, it can create confusion for customers researching the business.',
  },
  {
    label: 'Duplicate or unmanaged listings',
    detail:
      'A business with multiple profiles on the same platform may have reviews split across listings, making none of them look as active as the business actually is.',
  },
];

const auditSteps = [
  'Check the date of the most recent review on the Google Business Profile.',
  'Look for long gaps between reviews and note whether the pattern looks natural.',
  'Review all unanswered feedback and assess whether responses are still appropriate.',
  'Read through responses to check that they sound specific and genuine rather than templated.',
  'Confirm that the phone number, address, and service area shown in the profile are current.',
  'Look for repeated customer questions or themes that might indicate a gap in information.',
  'Confirm that the profile links to the correct and current website.',
  'Review older feedback to check whether discontinued services are mentioned.',
  'Check for duplicate listings on Google or other platforms.',
  'Confirm that review requests sent to customers follow the platform\'s current guidelines.',
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

export default function LocalVisibilityReviewRecency() {
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
        title="How Recent Are Your Business Reviews? | NLDS"
        description="Learn why review recency, honest feedback, and professional responses influence how local customers evaluate a business."
        canonical="https://newlvlstudio.com/local-visibility-insights/review-recency"
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
                  <BreadcrumbPage>Review Recency</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHT · NO. 5
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
            How Recent Are Your Business Reviews?
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
            Customers often look beyond the total number of reviews. They also notice whether
            the feedback is recent, whether the business responds, and whether the review
            activity feels genuine.
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
              Recent, honest feedback helps show that the business is active and still serving
              customers.
            </p>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. SECTION 1: Review Recency Helps Customers Judge Activity ──── */}
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
                Review Recency Helps Customers Judge Activity
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
                When a customer checks a business's reviews, the dates are often one of the first
                things they notice. A profile with recent feedback gives customers more confidence
                that the business is currently operating and actively serving people. A gap of
                many months — or years — raises questions that the business itself cannot answer
                from the review profile alone.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {recencySignals.map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '14px 0',
                        display: 'grid',
                        gridTemplateColumns: '140px 1fr',
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

      {/* ── 3. SECTION 2: Customers Notice More Than the Star Rating ─────── */}
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
                Customers Notice More Than the Star Rating
              </motion.h2>
            </motion.div>

            <div ref={s2Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                The overall star rating is visible immediately, but customers who are genuinely
                evaluating a business tend to look further. The quality, specificity, and
                consistency of reviews — and how the business responds — often carry more weight
                than the number alone.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {customerNotices.map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '14px 0',
                        display: 'grid',
                        gridTemplateColumns: '160px 1fr',
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

      {/* ── 4. SECTION 3: Ask for Reviews the Right Way ──────────────────── */}
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
                Ask for Reviews the Right Way
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
                Asking customers for feedback is appropriate and widely practised. The important
                distinction is between asking for honest feedback — which builds a genuine record
                of customer experience — and practices that manipulate that record. Platform
                policies are clear on where that line falls.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {askRightWayItems.map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '14px 0',
                        display: 'grid',
                        gridTemplateColumns: '170px 1fr',
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

      {/* ── 5. SECTION 4: Responses Show the Business Is Paying Attention ── */}
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
                Responses Show That the Business Is Paying Attention
              </motion.h2>
            </motion.div>

            <div ref={s4Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 14,
                }}
              >
                When a business responds to reviews, it signals to future customers that the
                business monitors its reputation and engages with the people it serves. An
                unanswered review — particularly a critical one — can imply that the business
                does not follow up after a job is complete.
              </p>

              <Callout>
                A thoughtful response to a difficult review tells prospective customers more
                about a business than five-star feedback alone.
              </Callout>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {responseGuidance.map((item) => (
                    <li
                      key={item.label}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '14px 0',
                        display: 'grid',
                        gridTemplateColumns: '160px 1fr',
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

      {/* ── 6. SECTION 5: Common Review Problems ─────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--bg-soft)', padding: 'clamp(64px, 8vw, 100px) 0' }}
      >
        <div className="container-nlds">
          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : 'hidden'}
            whileInView={shouldReduceMotion ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.15 }}
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
                maxWidth: 560,
                marginBottom: 48,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Common Review Problems
            </motion.h2>
          </motion.div>

          <div ref={s5Ref}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'clamp(12px, 2vw, 20px)' }}
            >
              {reviewProblems.map((item) => (
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

      {/* ── 7. SECTION 6: Reviews Support the Customer Journey ───────────── */}
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
                Reviews Should Support the Rest of the Customer Journey
              </motion.h2>
            </motion.div>

            <div ref={s6Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 14,
                }}
              >
                Reviews are one part of a longer process that starts before a customer visits the
                website and ends when they decide whether to make contact. Each part of that
                process needs to hold up on its own, and they all work better when they present
                consistent information.
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
                Search may introduce a customer to the business. Reviews help them decide whether
                it is worth a closer look. The website confirms the services and builds
                credibility. A clear contact path makes it straightforward to take the next step.
                When one of these parts creates doubt or inconsistency, the whole path becomes
                less effective.
              </p>

              <div
                className="reveal-child"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <Link
                  to="/local-visibility-insights/customer-decision-path"
                  className="font-sans text-link"
                  style={{ fontSize: '0.9375rem' }}
                >
                  See how the full local customer decision path works &rarr;
                </Link>
                <Link
                  to="/local-visibility-insights/website-trust"
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

      {/* ── 8. SECTION 7: Five-Minute Review Check ───────────────────────── */}
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
              Run a Five-Minute Review Check
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
              Work through these steps using your own Google Business Profile. No special tools
              are required to start.
            </motion.p>
          </motion.div>

          <div ref={auditRef} style={{ marginTop: 48 }}>
            {auditSteps.map((step, i) => (
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

            <div className="reveal-child" style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a
                href="https://business.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
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
                desc: 'The decision points between search results and first contact — and what businesses can do to improve them.',
                href: '/local-visibility-insights/customer-decision-path',
              },
              {
                label: 'Local Visibility Insight',
                title: 'What Makes a Local Business Website Feel Trustworthy?',
                desc: 'The website details that help customers understand who you are, what you offer, and what to do next.',
                href: '/local-visibility-insights/website-trust',
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
            Does Your Review Activity Show That the Business Is Current?
          </motion.h2>
          <motion.p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            NLDS helps local businesses improve the connection between reviews, website
            credibility, Google visibility, and customer contact flow.
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

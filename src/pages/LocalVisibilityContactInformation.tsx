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
    '@id': 'https://newlvlstudio.com/local-visibility-insights/contact-information/#article',
    url: 'https://newlvlstudio.com/local-visibility-insights/contact-information/',
    name: 'How Quickly Can Customers Find Your Contact Information?',
    headline: 'How Quickly Can Customers Find Your Contact Information?',
    description:
      'Learn how phone numbers, forms, tap-to-call links, service areas, and clear calls to action affect local customer contact.',
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
        name: 'Contact Information',
        item: 'https://newlvlstudio.com/local-visibility-insights/contact-information/',
      },
    ],
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const visibilityItems = [
  {
    label: 'Phone Number',
    detail:
      'The primary contact number should appear where customers can find it without scrolling or navigating away — in the header, above the fold, or on the contact page with clear placement.',
  },
  {
    label: 'Contact Button',
    detail:
      'A button or link that leads directly to the contact page or form removes one navigation step and makes the path to inquiry more obvious.',
  },
  {
    label: 'Quote or Inquiry Option',
    detail:
      'For businesses that do not take direct calls, a quote request or inquiry form should be just as visible as a phone number would be.',
  },
  {
    label: 'Service Area',
    detail:
      'Customers need to confirm the business serves their location before committing to any contact. If the service area is not visible early, some customers will leave before finding it.',
  },
  {
    label: 'Hours When Relevant',
    detail:
      'For businesses with fixed operating hours or service windows, showing hours near the contact options prevents wasted calls and incomplete inquiries.',
  },
  {
    label: 'Clear Next Step',
    detail:
      'Every page where a customer might decide to make contact should make the next action obvious — whether that is calling, filling out a form, or requesting a quote.',
  },
  {
    label: 'Tap-to-Call on Mobile',
    detail:
      'A phone number that is not linked correctly on mobile forces customers to manually copy and dial it. A properly linked number lets them call with one tap.',
  },
];

const contactMethods = [
  {
    label: 'Phone',
    detail:
      'Still the preferred method for many local customers, particularly for urgent inquiries or services that require discussion before booking. A clearly posted phone number is a baseline expectation.',
  },
  {
    label: 'Contact Form',
    detail:
      'Works well when customers have a specific question but are not ready to call. Forms are also useful for capturing inquiries outside business hours.',
  },
  {
    label: 'Email',
    detail:
      'Appropriate for some service types, but harder to manage than a form when volume increases. If email is offered, response time should be reliable.',
  },
  {
    label: 'Online Booking',
    detail:
      'Relevant for appointment-based businesses. If a booking system is in place, it should be prominently linked — not buried in the navigation.',
  },
  {
    label: 'Text or Messaging',
    detail:
      'Only worth offering if the business actively monitors and responds to messages. An unmonitored text line creates friction instead of removing it.',
  },
  {
    label: 'Directions',
    detail:
      'For businesses with a physical location, a link to directions or an embedded map removes a step for customers who plan to visit in person.',
  },
];

const formPractices = [
  {
    label: 'Ask Only for What You Need',
    detail:
      'Every additional field increases the chance of abandonment. A name, a way to reply, and a brief description of the inquiry is often enough to start a conversation.',
  },
  {
    label: 'Use Clear Labels',
    detail:
      'Labels should describe exactly what information is expected in plain terms. Placeholder text inside the field disappears when the customer starts typing, so it should not replace a visible label.',
  },
  {
    label: 'Keep the Form Short',
    detail:
      'Longer forms may feel justified from a business perspective, but customers weighing multiple options will often choose the path of least resistance.',
  },
  {
    label: 'Explain What Happens Next',
    detail:
      'A short sentence below the form — such as when to expect a reply and how — reduces uncertainty and makes submission feel less like a dead end.',
  },
  {
    label: 'Confirm Successful Submission',
    detail:
      'After submitting, the customer should see a clear success message. Without one, many customers submit the form again or are left wondering whether it worked.',
  },
  {
    label: 'Make Error Messages Helpful',
    detail:
      'If a required field is missing or formatted incorrectly, the error message should say what the problem is and where it is — not just that something went wrong.',
  },
  {
    label: 'Test on Mobile',
    detail:
      'Form fields, dropdowns, and submit buttons all behave differently on small screens. A form that works on desktop may be difficult to complete on a phone.',
  },
  {
    label: 'Do Not Require Account Creation',
    detail:
      'Forcing customers to register before submitting an inquiry adds unnecessary friction to what should be a straightforward first contact.',
  },
];

const frictionProblems = [
  {
    label: 'Phone number only in the footer',
    detail:
      'Customers looking to call quickly should not have to scroll to the bottom of the page. Placing the phone number only in the footer signals that contact is an afterthought.',
  },
  {
    label: 'Contact page buried in navigation',
    detail:
      'If the contact page requires more than one click to find or is not listed in the primary navigation, customers ready to make contact may lose patience before they get there.',
  },
  {
    label: 'Long or multi-step forms',
    detail:
      'A form that asks for a name, email, phone, address, service type, preferred date, referral source, and a message before the customer has even spoken to anyone creates friction that many will not push through.',
  },
  {
    label: 'Broken phone number links',
    detail:
      'A phone number that is displayed as text but not linked — or linked with a formatting error — cannot be tapped on mobile. Customers who try and fail are unlikely to copy the number manually.',
  },
  {
    label: 'No confirmation after form submission',
    detail:
      'Without a success message, customers are left uncertain. Some submit twice, creating duplicate inquiries. Others assume the form failed and move on to a competitor.',
  },
  {
    label: 'Missing service area',
    detail:
      'A customer who cannot confirm the business serves their location will not bother making contact. This information should not require a customer to ask.',
  },
  {
    label: 'No response-time expectation',
    detail:
      'Customers submitting a form have no way of knowing whether to expect a reply in an hour or a week. A single sentence about typical response time reduces uncertainty.',
  },
  {
    label: 'Different numbers across platforms',
    detail:
      'When the website, Google Business Profile, and directory listings each show a different phone number, customers cannot be confident which one is current.',
  },
  {
    label: 'Vague button labels',
    detail:
      'A button that says "Submit," "Click Here," or "Learn More" gives the customer no information about what will happen next. Descriptive labels — "Request a Quote" or "Send a Message" — are clearer and more likely to be used.',
  },
  {
    label: 'Contact options that do not work on mobile',
    detail:
      'Phone links that do not dial, forms that overflow the screen, and buttons too small to tap accurately all create barriers for customers who are using a phone to find a local business.',
  },
];

const selfAuditSteps = [
  'Open the homepage on a phone.',
  'Find the phone number without scrolling to the footer.',
  'Tap the phone number and confirm it opens the dialler correctly.',
  'Find the contact or quote button on the same page.',
  'Navigate to the contact page from the main menu.',
  'Complete and submit the contact form.',
  'Check that a success message appears after submission.',
  'Confirm the service area is visible on the homepage or contact page.',
  'Compare the phone number on the website with the number shown on the Google Business Profile.',
  'Confirm the next step is clear to someone who has never visited the site before.',
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

export default function LocalVisibilityContactInformation() {
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
        title="How Easily Can Customers Contact Your Business? | NLDS"
        description="Learn how phone numbers, forms, tap-to-call links, service areas, and clear calls to action affect local customer contact."
        canonical="https://newlvlstudio.com/local-visibility-insights/contact-information"
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
                  <BreadcrumbPage>Contact Information</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHT · NO. 4
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
            How Quickly Can Customers Find Your Contact Information?
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
            A customer who is ready to call, request a quote, or ask a question should not have
            to search through several pages to figure out what to do next.
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
              The easier it is to find and use your contact options, the less friction customers
              face before taking action.
            </p>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. SECTION 1: Contact Information Should Be Visible Early ───── */}
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
                Contact Information Should Be Visible Early
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
                A customer ready to make contact is at the most valuable point in the decision
                process. If they have to work to find a phone number or a contact option, some
                will leave before completing the action.
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
                Contact information does not need to dominate the design. But the following
                details should be easy to locate without searching:
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {visibilityItems.map((item) => (
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

      {/* ── 3. SECTION 2: Different Customers Prefer Different Methods ───── */}
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
                Different Customers Prefer Different Contact Methods
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
                Some customers want to call immediately. Others prefer to send a message and wait
                for a reply. A business that offers only one contact method will be invisible to
                customers who do not use that method.
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
                Businesses should offer the contact methods they can manage reliably, not every
                method that exists. A method that goes unanswered creates worse friction than not
                offering it at all.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {contactMethods.map((method) => (
                    <li
                      key={method.label}
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
                        {method.label}
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                      >
                        {method.detail}
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

      {/* ── 4. SECTION 3: What Makes a Contact Form Easy to Use ─────────── */}
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
                What Makes a Contact Form Easy to Use
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
                A contact form that works well asks only for what the business genuinely needs to
                respond. The right number of fields depends on the type of inquiry, not on what
                might be useful to have. A form that is simple to complete is more likely to be
                submitted.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {formPractices.map((item) => (
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

      {/* ── 5. SECTION 4: Mobile Contact Paths Matter Most ───────────────── */}
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
                Mobile Contact Paths Matter Most
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
                Most local searches happen on a phone. When a customer decides to make contact
                from a mobile search result, the path from that moment to a sent message or a
                completed call should be as short as possible.
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
                Mobile contact problems are easy to miss when testing a website on a desktop.
                Running through the contact flow on an actual phone is the most reliable way to
                find them.
              </p>

              <Callout>
                A phone number that cannot be tapped is not a contact method — it is a barrier.
              </Callout>

              <div className="reveal-child" style={{ marginBottom: 28 }}>
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--charcoal)',
                    marginBottom: 16,
                  }}
                >
                  Mobile Contact Checklist
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Phone number links correctly to the device dialler',
                    'Tap targets for buttons and links are large enough to press accurately',
                    'Contact forms are short and scroll-free on a small screen',
                    'Sticky contact elements do not obstruct readable content',
                    'No horizontal scrolling on any contact page',
                    'Text is readable without zooming',
                    'Contact options are not hidden inside collapsed menus',
                    'Page loads quickly on a mobile connection',
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '12px 0',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 14,
                        alignItems: 'start',
                      }}
                    >
                      <span
                        className="font-serif"
                        aria-hidden="true"
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--silver-grey)',
                          lineHeight: 1.7,
                          minWidth: 18,
                        }}
                      >
                        ✓
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                      >
                        {item}
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

      {/* ── 6. SECTION 5: Common Contact Friction Problems ───────────────── */}
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
              Common Contact Friction Problems
            </motion.h2>
          </motion.div>

          <div ref={s5Ref}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'clamp(12px, 2vw, 20px)' }}
            >
              {frictionProblems.map((item) => (
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

      {/* ── 7. SECTION 6: Contact Details Should Match Everywhere ────────── */}
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
                Contact Details Should Match Everywhere
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
                Customers often encounter a business in more than one place before deciding to
                make contact. When phone numbers, addresses, or service areas differ between
                channels, customers cannot be confident which version is current.
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
                The following should show consistent contact details:
              </p>

              <div className="reveal-child" style={{ marginBottom: 28 }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    'Website — header, footer, and contact page',
                    'Google Business Profile',
                    'Social media profiles',
                    'Directory listings — Yelp, Apple Maps, Bing Places, and others',
                    'Email signature',
                    'Printed materials when in use',
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{
                        borderTop: '1px solid var(--border-color)',
                        padding: '12px 0',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr',
                        gap: 14,
                        alignItems: 'start',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="font-serif"
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--silver-grey)',
                          lineHeight: 1.7,
                          minWidth: 18,
                        }}
                      >
                        —
                      </span>
                      <span
                        className="font-sans"
                        style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--muted-text)' }}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                  <li style={{ borderTop: '1px solid var(--border-color)' }} />
                </ul>
              </div>

              <div className="reveal-child">
                <Link
                  to="/local-visibility-insights/google-profile-completeness"
                  className="font-sans text-link"
                  style={{ fontSize: '0.9375rem' }}
                >
                  Check whether your Google Business Profile details are complete &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. SECTION 7: Five-Minute Contact Check ──────────────────────── */}
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
              Run a Five-Minute Contact Check
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
              Work through these steps using your own business on a phone. No special tools are
              required.
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
                Use the Free SEO Tools
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
                title: 'How Complete Is Your Google Business Profile?',
                desc: 'The profile fields that help customers understand, trust, and contact a local business.',
                href: '/local-visibility-insights/google-profile-completeness',
              },
              {
                label: 'Local Visibility Insight',
                title: 'Where Do Local Customers Decide Which Business to Contact?',
                desc: 'The decision points between search results and first contact — and what businesses can do to improve them.',
                href: '/local-visibility-insights/customer-decision-path',
              },
              {
                label: 'Local Visibility Insight',
                title: 'Is Your Website Ready for Mobile Customers?',
                desc: 'What local businesses should check for mobile usability, including speed, navigation, tap-to-call, forms, and contact flow.',
                href: '/local-visibility-insights/mobile-readiness',
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
            Can Customers Reach You Without Searching for the Next Step?
          </motion.h2>
          <motion.p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            NLDS helps local businesses improve website clarity, contact flow, mobile usability,
            and the path from first visit to inquiry.
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

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
    '@id': 'https://newlvlstudio.com/local-visibility-insights/mobile-readiness/#article',
    url: 'https://newlvlstudio.com/local-visibility-insights/mobile-readiness/',
    name: 'Is Your Website Ready for Mobile Customers?',
    headline: 'Is Your Website Ready for Mobile Customers?',
    description:
      'Learn what local businesses should check for mobile usability, including page speed, navigation, tap-to-call, forms, readable text, and clear contact paths.',
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
        name: 'Mobile Readiness',
        item: 'https://newlvlstudio.com/local-visibility-insights/mobile-readiness/',
      },
    ],
  },
];

// ─── Data ────────────────────────────────────────────────────────────────────

const mobileAnswers = [
  {
    label: 'What the business does',
    detail:
      'The primary service or product should be clear within the first visible area. If a visitor cannot determine what the business offers in the first few seconds, they may leave before scrolling.',
  },
  {
    label: 'Who it serves',
    detail:
      'A visitor needs to confirm the business is relevant to them — by type of service, industry, or customer. This should not require reading a full page of text.',
  },
  {
    label: 'Where it works',
    detail:
      'For local businesses, the service area matters. Customers searching for nearby businesses need to see quickly that the business serves their location.',
  },
  {
    label: 'How to contact it',
    detail:
      'A phone number, contact button, or clear call to action should be visible without scrolling far. Contact access that requires effort is contact access that gets skipped.',
  },
  {
    label: 'Whether it appears credible',
    detail:
      'A professional appearance, consistent information, and genuine presentation give customers confidence that the business is real and worth contacting.',
  },
  {
    label: 'What to do next',
    detail:
      'The page should guide the visitor toward a clear action. A mobile visitor who finishes reading a section and sees no next step may simply leave.',
  },
];

const readabilityFactors = [
  {
    label: 'Text size',
    detail:
      'Body text should be large enough to read without zooming. Text that requires pinching or squinting adds friction for every visitor.',
  },
  {
    label: 'Paragraph length',
    detail:
      'Short paragraphs are easier to read on a narrow screen. Dense blocks of text are harder to navigate and more likely to be skipped entirely.',
  },
  {
    label: 'Headings',
    detail:
      'Clear headings help visitors scan the page and find the section most relevant to them. A page with no visible structure is harder to navigate on a small screen.',
  },
  {
    label: 'Contrast',
    detail:
      'Low contrast between text and background makes reading difficult in bright light or for visitors with visual impairments. Sufficient contrast is a basic readability requirement.',
  },
  {
    label: 'Line length',
    detail:
      'Text that stretches the full width of a phone screen can be tiring to follow. A reasonable line length makes content easier to read.',
  },
  {
    label: 'Links and buttons',
    detail:
      'Links and buttons should be visually distinct from surrounding text. If a visitor cannot tell what is tappable and what is not, key actions may be missed.',
  },
  {
    label: 'Text over images',
    detail:
      'Text placed over a busy or high-contrast image is often difficult to read. Sufficient overlay or contrast is needed to keep the text legible.',
  },
];

const readabilityChecklist = [
  'Can the main headline be read without zooming?',
  'Are paragraphs easy to scan?',
  'Are links and buttons visually clear?',
  'Does the text maintain strong contrast?',
];

const navigationFactors = [
  {
    label: 'Menu labels',
    detail:
      'Navigation labels should describe clearly what each page contains. Vague or abbreviated labels make it harder for visitors to find what they need.',
  },
  {
    label: 'Important pages',
    detail:
      'The most important pages — services, contact, about — should be reachable in one or two taps. Visitors should not have to search through multiple layers to find basic information.',
  },
  {
    label: 'Contact visibility',
    detail:
      'A contact option should be visible in or near the navigation. Hiding the contact path inside a secondary menu creates friction at exactly the moment a visitor is ready to act.',
  },
  {
    label: 'Menu controls',
    detail:
      'Menu buttons should be large enough to tap reliably. Small controls positioned near other tappable elements are difficult to use on a touch device.',
  },
  {
    label: 'Logo link',
    detail:
      'The logo or business name should link back to the homepage. This is a widely expected behaviour on websites, and visitors rely on it to navigate.',
  },
  {
    label: 'Touch behaviour',
    detail:
      'A mobile menu that opens should also close reliably. A menu that stays open or requires an awkward tap to dismiss interrupts the browsing experience.',
  },
];

const contactFactors = [
  {
    label: 'Tap-to-call',
    detail:
      'A phone number displayed as plain text cannot be tapped to call on most devices. A tap-to-call link lets a visitor initiate a call with a single tap.',
  },
  {
    label: 'Contact button',
    detail:
      'A clear quote or contact button should be visible without searching. The label should describe what happens when tapped rather than using vague phrasing.',
  },
  {
    label: 'Forms',
    detail:
      'Contact and quote forms should fit the screen without horizontal scrolling. Fields that spill off the edge or require excessive zooming discourage completion.',
  },
  {
    label: 'Tap targets',
    detail:
      'Buttons, links, and form fields that are too small to tap accurately cause mistakes and frustration. Comfortable tap targets reduce the effort required to take action.',
  },
  {
    label: 'Input types',
    detail:
      'Phone and email fields should use the appropriate input type so that mobile keyboards switch to the relevant layout automatically.',
  },
  {
    label: 'Confirmation',
    detail:
      'After a form is submitted, the visitor should receive a clear confirmation. Silence after submission creates uncertainty about whether the message was sent.',
  },
  {
    label: 'Directions',
    detail:
      'For businesses with a physical location, a link to directions makes it straightforward for customers to find the address without copying and pasting.',
  },
];

const speedFactors = [
  {
    label: 'Large images',
    detail:
      'Hero images and full-width photos that have not been compressed or resized for the web can delay how quickly the first visible content appears.',
  },
  {
    label: 'Heavy scripts',
    detail:
      'Third-party scripts — chat widgets, analytics tags, advertising pixels — add to the total weight of a page. Scripts that block the main content from loading affect the experience even on faster connections.',
  },
  {
    label: 'Critical content first',
    detail:
      'The headline, service description, and contact option should load before media or scripts that are below the visible area. Delaying what the visitor needs first creates an impression of a slow page.',
  },
  {
    label: 'Animation',
    detail:
      'Motion that runs immediately on page load can delay the appearance of useful content, particularly on devices with limited processing power.',
  },
  {
    label: 'Testing',
    detail:
      'Page speed performance is best checked with a tool rather than estimated by feel. What seems fast on a developer\'s device may load more slowly on a mid-range phone on a mobile data connection.',
  },
];

const stabilityFactors = [
  {
    label: 'Image dimensions',
    detail:
      'Images that do not declare their size in advance cause the surrounding layout to shift when they load. Reserving the correct space prevents visible jumps.',
  },
  {
    label: 'Button position',
    detail:
      'Buttons or links that shift as additional content arrives create misclick risk. A visitor may tap a button that has moved.',
  },
  {
    label: 'Text stability',
    detail:
      'Text that shifts position as web fonts load in creates a brief flash of movement that signals an incomplete or unstable page.',
  },
  {
    label: 'Overlays and popups',
    detail:
      'Overlays that appear immediately on arrival can obscure the content the visitor came to see. On a small screen, a popup that is difficult to dismiss takes up the entire viewport.',
  },
  {
    label: 'Sticky elements',
    detail:
      'Elements that remain fixed at the top or bottom of the screen reduce the amount of content visible at any moment. Multiple fixed elements on a small screen can crowd out the page.',
  },
  {
    label: 'Banners and notices',
    detail:
      'Cookie consent notices and other compliance banners should remain easy to dismiss. A banner that cannot be closed or that reappears on every page adds persistent friction.',
  },
  {
    label: 'Form validation',
    detail:
      'Error messages that appear beside or beneath form fields can shift the layout as they show and hide. Designing for these states prevents unexpected movement.',
  },
];

const mobileProblems = [
  {
    label: 'Text too small',
    detail:
      'Body text that is too small to read comfortably on a phone requires visitors to zoom in, which disrupts the layout and creates friction throughout the page.',
  },
  {
    label: 'Buttons too close together',
    detail:
      'Tap targets placed near each other are easy to miss. A visitor trying to tap one link may trigger the wrong one, which is frustrating and damages confidence in the site.',
  },
  {
    label: 'Phone number not clickable',
    detail:
      'A phone number displayed as plain text cannot be tapped to call. Visitors on a phone expect one tap to initiate a call, and anything less creates friction.',
  },
  {
    label: 'Contact action hidden in the menu',
    detail:
      'If the primary contact option is buried inside a navigation menu rather than visible on the page, some visitors will not find it before they leave.',
  },
  {
    label: 'Slow hero media',
    detail:
      'A large background video or image at the top of the page can delay the appearance of any useful content, causing some visitors to leave before the page finishes loading.',
  },
  {
    label: 'Horizontal scrolling',
    detail:
      'Content that extends beyond the width of the screen forces a visitor to scroll sideways. This is not standard behaviour on mobile and signals a layout problem.',
  },
  {
    label: 'Forms wider than the screen',
    detail:
      'A contact or quote form that does not resize to fit a narrow screen requires horizontal scrolling to complete and is likely to be abandoned before submission.',
  },
  {
    label: 'Popups covering important content',
    detail:
      'A popup or overlay that appears over the main content and is difficult to dismiss on a small screen blocks the visitor from seeing what they came to read.',
  },
  {
    label: 'Navigation that does not close',
    detail:
      'A mobile menu that opens but does not close reliably leaves the visitor stuck, with the menu covering the page content they were trying to read.',
  },
  {
    label: 'Content shifting during load',
    detail:
      'Elements that move while the page is loading — because images, fonts, or scripts have not yet arrived — create an unstable visual experience that reduces confidence.',
  },
  {
    label: 'Long pages with no clear next step',
    detail:
      'A page that scrolls extensively without guiding the visitor toward an action leaves them without direction. Long pages need visible signposts throughout.',
  },
  {
    label: 'Desktop-only hover interactions',
    detail:
      'Information or actions that only appear when hovering over an element do not work on a touch device, where there is no hover state. These interactions are invisible to mobile visitors.',
  },
];

const mobileCheckSteps = [
  'Open the homepage on a phone.',
  'Identify the primary service without zooming.',
  'Confirm the service area is visible.',
  'Open and close the navigation.',
  'Test every important button.',
  'Tap the phone number.',
  'Open and submit the contact form.',
  'Check for horizontal scrolling.',
  'Watch for moving or shifting content.',
  'Test the page on both Wi-Fi and mobile data if practical.',
  'Run PageSpeed Insights.',
  'Confirm the next step is obvious.',
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

export default function LocalVisibilityMobileReadiness() {
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
  const s7Ref = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.55,
    stagger: 0.06,
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
        title="Is Your Local Business Website Mobile Ready? | NLDS"
        description="Learn what local businesses should check for mobile usability, including page speed, navigation, tap-to-call, forms, readable text, and clear contact paths."
        canonical="https://newlvlstudio.com/local-visibility-insights/mobile-readiness"
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
                  <BreadcrumbPage>Mobile Readiness</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </motion.div>

          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
            LOCAL VISIBILITY INSIGHT · NO. 6
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
            Is Your Website Ready for Mobile Customers?
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
            Many local customers first encounter a business on a phone. A mobile-ready website
            should make the business easy to understand, easy to trust, and easy to contact
            without forcing the visitor to zoom, search, or wait.
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
              Mobile readiness is not just about fitting the screen. It is about removing
              friction from the path to information and contact.
            </p>
          </motion.div>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. SECTION 1: Mobile Visitors Need Answers Quickly ───────────── */}
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
                Mobile Visitors Need Answers Quickly
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
                A customer visiting a local business website on a phone is usually trying to answer
                a small number of questions quickly. They want to know whether the business is
                relevant to them and whether it is worth contacting. If those answers are difficult
                to find, the visitor is likely to return to the search results and look at the next
                option. The information most visitors need should be visible without excessive
                scrolling or searching.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {mobileAnswers.map((item) => (
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

      {/* ── 3. SECTION 2: Readable Content Matters ──────────────────────── */}
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
                Readable Content Matters
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
                Content that is readable on a desktop may not be comfortable to read on a phone.
                Narrow screens, variable lighting conditions, and the absence of a mouse all affect
                how content is consumed. Text, spacing, contrast, and visual hierarchy all need to
                hold up at a smaller size and in less controlled conditions.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {readabilityFactors.map((item) => (
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

              {/* Readability checklist */}
              <div
                className="reveal-child"
                style={{
                  backgroundColor: 'var(--bg-soft)',
                  border: '1px solid var(--border-color)',
                  padding: 'clamp(20px, 2.5vw, 28px)',
                  marginTop: 28,
                }}
              >
                <p
                  className="font-sans"
                  style={{
                    fontSize: '0.6875rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-text)',
                    marginBottom: 16,
                  }}
                >
                  Readability Check
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {readabilityChecklist.map((item, i) => (
                    <li
                      key={i}
                      className="font-sans"
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.6,
                        color: 'var(--muted-text)',
                        padding: '8px 0',
                        borderTop: i === 0 ? 'none' : '1px solid var(--border-color)',
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ color: 'var(--silver-grey)', flexShrink: 0, paddingTop: 1 }}
                      >
                        ◻
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. SECTION 3: Navigation Should Be Simple ───────────────────── */}
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
                Navigation Should Be Simple
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
                On a small screen, navigation takes up more relative space and requires more
                deliberate interaction than on a desktop. A mobile visitor who cannot quickly reach
                the page they need — or who struggles to open and close the menu — will lose
                confidence in the site before they have read much of the content. Navigation that
                works well on a phone is clear, predictable, and stays out of the way.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {navigationFactors.map((item) => (
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

      {/* ── 5. SECTION 4: Contact Actions Should Work With One Tap ───────── */}
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
                Contact Actions Should Work With One Tap
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
                A customer using a phone is often in the best possible position to contact a
                business immediately — they already have the device in hand. Contact actions that
                require multiple steps, non-tappable numbers, or oversized forms slow down that
                moment. Every additional step between the decision to contact and the ability to
                do so increases the chance the visitor changes their mind.
              </p>

              <Callout>
                The phone in a visitor's hand is already a calling device. A tap-to-call link is
                the shortest possible path between interest and contact.
              </Callout>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {contactFactors.map((item) => (
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

              <div className="reveal-child" style={{ marginTop: 24 }}>
                <Link
                  to="/local-visibility-insights/contact-information"
                  className="font-sans text-link"
                  style={{ fontSize: '0.9375rem' }}
                >
                  See how contact friction affects customer action &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. SECTION 5: Mobile Speed Affects the Experience ───────────── */}
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
                Mobile Speed Affects the Experience
              </motion.h2>
            </motion.div>

            <div ref={s5Ref}>
              <p
                className="font-sans reveal-child"
                style={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.7,
                  color: 'var(--muted-text)',
                  marginBottom: 28,
                }}
              >
                A page that loads slowly on a phone creates a poor first impression before the
                visitor has seen any of the content. Mobile connections vary in quality, and
                devices vary in capability. A page that relies on large files, unoptimised images,
                or scripts that run before the content is visible will feel slow to a meaningful
                portion of the audience.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {speedFactors.map((item) => (
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

              <div className="reveal-child" style={{ marginTop: 24 }}>
                <Link to="/free-seo-tools" className="btn-secondary">
                  Check Mobile Performance with Free SEO Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SECTION 6: Stable Layouts Build Confidence ───────────────── */}
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
                Stable Layouts Build Confidence
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
                A layout that shifts, jumps, or moves while a visitor is trying to read or tap
                creates an impression of an unfinished or poorly maintained website. Stability is
                not just a technical metric — it directly affects whether a visitor trusts what
                they are looking at. When the page behaves predictably from the moment it appears,
                the visitor can focus on the content rather than the experience of loading it.
              </p>

              <div className="reveal-child">
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {stabilityFactors.map((item) => (
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

      {/* ── 8. SECTION 7: Common Mobile Website Problems ─────────────────── */}
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
              <SectionLabel>SECTION 7</SectionLabel>
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
              Common Mobile Website Problems
            </motion.h2>
          </motion.div>

          <div ref={s7Ref}>
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: 'clamp(12px, 2vw, 20px)' }}
            >
              {mobileProblems.map((item) => (
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

      {/* ── 9. SECTION 8: Run a Five-Minute Mobile Website Check ─────────── */}
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
              Run a Five-Minute Mobile Website Check
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
              Work through these steps using your own website on a real phone. No special tools
              are required to begin.
            </motion.p>
          </motion.div>

          <div ref={auditRef} style={{ marginTop: 48 }}>
            {mobileCheckSteps.map((step, i) => (
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
              <Link to="/free-seo-tools" className="btn-primary">
                Use the Free SEO Tools
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
                title: 'How Quickly Can Customers Find Your Contact Information?',
                desc: 'How phone numbers, forms, tap-to-call links, and clear next steps affect whether customers complete the path to contact.',
                href: '/local-visibility-insights/contact-information',
              },
              {
                label: 'Local Visibility Insight',
                title: 'What Makes a Local Business Website Feel Trustworthy?',
                desc: 'The website details that help customers understand who you are, what you offer, and what to do next.',
                href: '/local-visibility-insights/website-trust',
              },
              {
                label: 'Local Visibility Insight',
                title: 'Where Do Local Customers Decide Which Business to Contact?',
                desc: 'The decision points between search results and first contact — and what businesses can do to improve them.',
                href: '/local-visibility-insights/customer-decision-path',
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

          <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <Link
              to="/local-visibility-insights"
              className="font-sans text-link"
              style={{ fontSize: '0.9375rem' }}
            >
              &larr; Back to Local Visibility Insights
            </Link>
            <Link
              to="/free-seo-tools"
              className="font-sans text-link"
              style={{ fontSize: '0.9375rem' }}
            >
              Explore Free SEO Tools &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── 11. FINAL CTA ────────────────────────────────────────────────── */}
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
            Does Your Website Make Mobile Customers Work Too Hard?
          </motion.h2>
          <motion.p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            NLDS helps local businesses improve mobile clarity, contact flow, presentation, and
            the full path from discovery to inquiry.
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

import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ToolCard {
  name: string;
  type: string;
  bestFor: string;
  description: string;
  whatToCheck: string[];
  access: string;
  buttonText: string;
  url: string;
  note?: string;
}

interface Step {
  num: number;
  title: string;
  tools: string;
  description: string;
  anchorLabel: string;
  anchor: string;
}

interface ChecklistGroup {
  title: string;
  items: string[];
}

interface PriorityGroup {
  label: string;
  items: string[];
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const steps: Step[] = [
  {
    num: 1,
    title: 'Check Website Speed',
    tools: 'PageSpeed Insights',
    description:
      'Test the mobile and desktop experience and identify loading, stability, and performance problems.',
    anchorLabel: 'Go to Performance Tools',
    anchor: '#technical-tools',
  },
  {
    num: 2,
    title: 'Check Google Visibility',
    tools: 'Google Search Console',
    description:
      'Review indexing, search impressions, clicks, queries, sitemap status, and page issues.',
    anchorLabel: 'Go to Search Tools',
    anchor: '#search-tools',
  },
  {
    num: 3,
    title: 'Check Local Presence',
    tools: 'Google Business Profile',
    description:
      'Review how your business appears in Google Search and Maps, including services, hours, categories, photos, and reviews.',
    anchorLabel: 'Go to Local Visibility Tools',
    anchor: '#search-tools',
  },
  {
    num: 4,
    title: 'Check Structured Data',
    tools: 'Rich Results Test and Schema Markup Validator',
    description:
      'See whether search engines can understand the structured information attached to your pages.',
    anchorLabel: 'Go to Technical Tools',
    anchor: '#technical-tools',
  },
  {
    num: 5,
    title: 'Understand Visitor Behavior',
    tools: 'Google Analytics and Microsoft Clarity',
    description:
      'Review where visitors come from, what they view, where they click, and where they may become frustrated.',
    anchorLabel: 'Go to Analytics Tools',
    anchor: '#analytics-tools',
  },
];

const searchTools: ToolCard[] = [
  {
    name: 'Google Search Console',
    type: 'Setup Required',
    bestFor: 'Google indexing and organic search performance',
    description:
      'See whether Google can find your pages and review impressions, clicks, search queries, indexing issues, sitemap status, and page-level search performance.',
    whatToCheck: [
      'Important pages that are not indexed',
      'Search terms producing impressions',
      'Pages receiving clicks',
      'Sitemap or crawl problems',
    ],
    access: 'Google account and verified website required',
    buttonText: 'Open Search Console',
    url: 'https://search.google.com/search-console/welcome',
  },
  {
    name: 'Google Business Profile',
    type: 'Setup Required',
    bestFor: 'Google Maps and local search presence',
    description:
      'Manage how your local business appears across Google Search and Maps.',
    whatToCheck: [
      'Primary and secondary categories',
      'Services',
      'Business hours',
      'Website and phone information',
      'Photos',
      'Reviews and responses',
      'Service areas',
    ],
    access: 'Google account and Business Profile required',
    buttonText: 'Manage Business Profile',
    url: 'https://business.google.com/',
  },
  {
    name: 'Bing Webmaster Tools',
    type: 'Setup Required',
    bestFor: 'Bing indexing and technical search data',
    description:
      'Review Bing search performance, indexing, crawling, backlinks, keywords, and site problems.',
    whatToCheck: [
      'Indexed pages',
      'Crawl issues',
      'Search keywords',
      'Sitemap status',
      'Backlinks',
    ],
    access: 'Account and verified website required',
    buttonText: 'Open Bing Webmaster Tools',
    url: 'https://www.bing.com/webmasters/',
  },
  {
    name: 'Google Trends',
    type: 'Instant Research',
    bestFor: 'Search demand and seasonality',
    description:
      'Compare search interest by topic, location, and time period before creating content or targeting a service.',
    whatToCheck: [
      'Seasonal demand',
      'Regional interest',
      'Different ways customers describe a service',
      'Rising topics',
    ],
    access: 'No account required for basic research',
    buttonText: 'Explore Google Trends',
    url: 'https://trends.google.com/trends/',
  },
];

const technicalTools: ToolCard[] = [
  {
    name: 'PageSpeed Insights',
    type: 'Instant Check',
    bestFor: 'Mobile and desktop website performance',
    description:
      'Test a public page and review performance data, Core Web Vitals, loading problems, image issues, and improvement recommendations.',
    whatToCheck: [
      'Mobile performance',
      'Largest Contentful Paint',
      'Interaction to Next Paint',
      'Cumulative Layout Shift',
      'Oversized images',
      'Render-blocking resources',
    ],
    access: 'No account required',
    buttonText: 'Test Website Speed',
    url: 'https://pagespeed.web.dev/',
  },
  {
    name: 'Chrome Lighthouse',
    type: 'Browser Check',
    bestFor: 'Performance, accessibility, SEO, and best practices',
    description:
      'Run a broader technical audit directly through Chrome DevTools.',
    whatToCheck: [
      'Performance',
      'Accessibility',
      'SEO fundamentals',
      'Technical best practices',
      'Progressive web-app issues when relevant',
    ],
    access: 'Chrome browser required; no separate account required',
    buttonText: 'Learn How to Run Lighthouse',
    url: 'https://developer.chrome.com/docs/lighthouse/overview/',
    note: 'Open the website in Chrome, open DevTools, select Lighthouse, choose the audit categories, and generate the report.',
  },
  {
    name: 'Google Rich Results Test',
    type: 'Instant Check',
    bestFor: 'Google-supported structured data',
    description:
      'Test whether Google can detect structured data that may support enhanced search-result features.',
    whatToCheck: [
      'Detected structured-data types',
      'Errors',
      'Required properties',
      'Invalid markup',
    ],
    access: 'No account required',
    buttonText: 'Test Rich Results',
    url: 'https://search.google.com/test/rich-results',
  },
  {
    name: 'Schema Markup Validator',
    type: 'Instant Check',
    bestFor: 'General Schema.org validation',
    description:
      "Review the entities and properties detected in a page's structured data and identify errors or warnings.",
    whatToCheck: [
      'Detected entities',
      'Missing properties',
      'Invalid values',
      'Schema nesting',
      'Duplicate entities',
    ],
    access: 'No account required',
    buttonText: 'Validate Schema',
    url: 'https://validator.schema.org/',
  },
];

const analyticsTools: ToolCard[] = [
  {
    name: 'Google Analytics 4',
    type: 'Setup Required',
    bestFor: 'Website traffic and conversions',
    description:
      'Measure traffic sources, page views, engagement, events, and conversions after the tracking code is installed.',
    whatToCheck: [
      'Traffic sources',
      'Landing pages',
      'Engagement',
      'Form submissions',
      'Calls or conversion events',
      'Organic-search traffic',
    ],
    access: 'Google account and tracking setup required',
    buttonText: 'Open Google Analytics',
    url: 'https://analytics.google.com/',
  },
  {
    name: 'Microsoft Clarity',
    type: 'Setup Required',
    bestFor: 'Heatmaps and session recordings',
    description:
      'See how visitors click, scroll, navigate, and become frustrated while using the website.',
    whatToCheck: [
      'Dead clicks',
      'Rage clicks',
      'Scroll depth',
      'Abandoned forms',
      'Mobile interaction problems',
      'Confusing navigation',
    ],
    access: 'Microsoft account and tracking-code installation required',
    buttonText: 'Open Microsoft Clarity',
    url: 'https://clarity.microsoft.com/',
  },
  {
    name: 'Google Alerts',
    type: 'Monitoring Tool',
    bestFor: 'Brand and topic mentions',
    description:
      'Receive notifications when Google finds new web results for your business name, owner name, competitors, services, or important topics.',
    whatToCheck: [
      'Business-name mentions',
      'Owner-name mentions',
      'Competitor mentions',
      'Local industry news',
      'Content topics',
    ],
    access: 'Google account required to create and manage alerts',
    buttonText: 'Create a Google Alert',
    url: 'https://www.google.com/alerts',
  },
  {
    name: 'Looker Studio',
    type: 'Reporting Tool',
    bestFor: 'Combining data into dashboards',
    description:
      'Create reports using data from Search Console, Analytics, spreadsheets, and other connected sources.',
    whatToCheck: [
      'Organic-search trends',
      'Traffic changes',
      'Leads and conversions',
      'Landing-page performance',
      'Monthly reporting',
    ],
    access: 'Google account and connected data sources required',
    buttonText: 'Build a Report',
    url: 'https://lookerstudio.google.com/',
    note:
      'Looker Studio does not audit a website by itself. It organizes and visualizes data from connected sources.',
  },
];

const checklistGroups: ChecklistGroup[] = [
  {
    title: 'Clarity',
    items: [
      'Is it immediately clear what the business does?',
      'Are the main services easy to find?',
      'Is the service area obvious?',
      'Is there one clear primary action?',
      'Can a new visitor understand the business within a few seconds?',
    ],
  },
  {
    title: 'Credibility',
    items: [
      'Are real reviews or testimonials visible?',
      'Is the business information complete and consistent?',
      'Are experience, credentials, or trust signals included?',
      'Do the photos and content feel authentic?',
      'Is it clear who operates the business?',
    ],
  },
  {
    title: 'Presentation',
    items: [
      'Does the website feel current and professional?',
      'Is the content easy to read on mobile?',
      'Are typography, colors, and logo usage consistent?',
      'Are images clear and relevant?',
      'Are there broken layouts or unfinished sections?',
    ],
  },
  {
    title: 'Conversion',
    items: [
      'Is the phone number easy to find?',
      'Does the contact form work?',
      'Are calls to action specific?',
      'Can mobile users contact the business quickly?',
      'Does every important page provide a logical next step?',
    ],
  },
  {
    title: 'Support',
    items: [
      'Is the website secure?',
      'Are links and forms working?',
      'Is the content current?',
      'Are Analytics and Search Console connected?',
      'Is the website being monitored and maintained?',
    ],
  },
];

const priorities: PriorityGroup[] = [
  {
    label: 'Fix Immediately',
    items: [
      'Website unavailable',
      'Security warnings',
      'Broken contact forms',
      'Incorrect phone number or business information',
      'Important pages blocked or not indexed',
      'Severe mobile usability problems',
      'Broken navigation',
      'Missing primary service information',
    ],
  },
  {
    label: 'Fix Next',
    items: [
      'Slow important pages',
      'Missing or weak page titles',
      'Incomplete Google Business Profile',
      'Structured-data errors',
      'Confusing service descriptions',
      'Weak calls to action',
      'Poor contact flow',
      'Inconsistent local-business information',
    ],
  },
  {
    label: 'Improve Over Time',
    items: [
      'Content depth',
      'Internal linking',
      'Local service pages',
      'Review growth',
      'Reporting dashboards',
      'Additional schema enhancements',
      'Ongoing conversion improvements',
      'Long-term authority building',
    ],
  },
];

const faqs: FaqItem[] = [
  {
    q: 'Which free SEO tool should I use first?',
    a: 'Start with PageSpeed Insights for an immediate performance check. Then review Google Search Console, Google Business Profile, and the structured-data testing tools. Together, these provide a useful view of website performance, indexing, local presence, and technical markup.',
  },
  {
    q: "Why isn't my business showing up on Google?",
    a: 'Possible causes include indexing problems, an incomplete Google Business Profile, weak location relevance, inconsistent business information, limited website content, low authority, strong competition, or an issue with the profile itself. No single automated score can identify every cause.',
  },
  {
    q: 'What is the difference between local SEO and regular SEO?',
    a: 'Local SEO focuses on helping a business appear for customers in a defined geographic area. It includes Google Maps visibility, business-profile optimization, reviews, local pages, consistent business information, and location relevance. Broader SEO may target customers regardless of location.',
  },
  {
    q: 'Is Google Business Profile or website SEO more important?',
    a: 'Both serve different roles. The Business Profile helps the company appear in local and Maps results. The website provides deeper service information, location relevance, credibility, content, and a place where visitors can contact the business.',
  },
  {
    q: 'Can I do local SEO myself?',
    a: 'Business owners can complete many foundational tasks, including updating business information, adding services and photos, responding to reviews, monitoring Search Console, testing website speed, and improving basic page content. More complex technical or competitive issues may require professional assistance.',
  },
  {
    q: 'How do I know whether my SEO is working?',
    a: 'Track search impressions, website clicks, organic traffic, Maps visibility, calls, form submissions, landing-page performance, and qualified enquiries. Rankings alone do not show whether search visibility is producing business results.',
  },
  {
    q: 'How long does local SEO take?',
    a: 'There is no guaranteed timeline. Technical fixes may be detected relatively quickly, while meaningful visibility changes depend on competition, location, website quality, content, reputation, authority, and consistent ongoing work.',
  },
  {
    q: 'What is included in a local SEO audit?',
    a: 'A useful audit normally examines indexing, website structure, page titles, content, mobile usability, performance, Google Business Profile, structured data, local relevance, reviews, business-information consistency, internal links, and contact flow.',
  },
  {
    q: 'Does a high SEO score guarantee higher rankings?',
    a: 'No. Automated scores usually evaluate a limited set of technical factors. Search performance also depends on relevance, location, competition, content quality, authority, reputation, links, and the usefulness of the website.',
  },
  {
    q: 'Does mobile performance affect local SEO?',
    a: 'Mobile performance affects how easily customers can use the website, understand the business, and complete actions such as calling or submitting a form. Slow or unstable mobile pages can also weaken the overall technical quality of the site.',
  },
];

const pageSchema: Record<string, unknown>[] = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://newlvlstudio.com/free-seo-tools/#webpage',
    url: 'https://newlvlstudio.com/free-seo-tools/',
    name: 'Free SEO & Website Check Tools | NLDS',
    description:
      'Use free SEO and website tools to check speed, indexing, structured data, local visibility, analytics, and visitor behavior.',
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
        name: 'Free SEO Tools',
        item: 'https://newlvlstudio.com/free-seo-tools/',
      },
    ],
  },
];

// ─── Small shared components ──────────────────────────────────────────────────

function ExternalLinkIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M5 1H1a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V7" />
      <polyline points="8,1 11,1 11,4" />
      <line x1="5" y1="7" x2="11" y2="1" />
    </svg>
  );
}

function TypeBadge({ label }: { label: string }) {
  return (
    <span
      className="font-sans"
      style={{
        fontSize: '0.6875rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--muted-text)',
        backgroundColor: 'var(--bg-soft)',
        padding: '3px 8px',
        display: 'inline-block',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function ToolCardComponent({ card }: { card: ToolCard }) {
  return (
    <article
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-color)',
        padding: 'clamp(24px, 3vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: 0,
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <TypeBadge label={card.type} />
      </div>

      <h3
        className="font-serif"
        style={{
          fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
          color: 'var(--charcoal)',
          lineHeight: 1.2,
          marginBottom: 6,
        }}
      >
        {card.name}
      </h3>

      <p
        className="font-sans"
        style={{
          fontSize: '0.8125rem',
          letterSpacing: '0.05em',
          color: 'var(--muted-text)',
          marginBottom: 16,
          textTransform: 'uppercase',
        }}
      >
        {card.bestFor}
      </p>

      <p
        className="font-sans"
        style={{
          fontSize: '0.9375rem',
          lineHeight: 1.6,
          color: 'var(--muted-text)',
          marginBottom: 20,
        }}
      >
        {card.description}
      </p>

      <div style={{ marginBottom: 20 }}>
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
          What to check
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {card.whatToCheck.map((item) => (
            <li
              key={item}
              className="font-sans"
              style={{
                fontSize: '0.875rem',
                color: 'var(--muted-text)',
                lineHeight: 1.5,
                paddingLeft: '1.25rem',
                position: 'relative',
                marginBottom: 5,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  color: 'var(--silver-grey)',
                }}
              >
                —
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {card.note && (
        <p
          className="font-sans"
          style={{
            fontSize: '0.8125rem',
            lineHeight: 1.55,
            color: 'var(--muted-text)',
            borderLeft: '2px solid var(--silver-grey)',
            paddingLeft: 12,
            marginBottom: 20,
          }}
        >
          {card.note}
        </p>
      )}

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 20,
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        <p
          className="font-sans"
          style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
        >
          <span style={{ color: 'var(--charcoal)' }}>Access: </span>
          {card.access}
        </p>
        <a
          href={card.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${card.buttonText} — opens in new tab`}
          className="btn-secondary"
          style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          {card.buttonText}
          <ExternalLinkIcon />
        </a>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FreeSeoTools() {
  const shouldReduceMotion = useReducedMotion();

  const stepsRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    start: 'top 80%',
    childSelector: '.step-item',
  });
  const searchRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    start: 'top 80%',
    childSelector: '.tool-card',
  });
  const techRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    start: 'top 80%',
    childSelector: '.tool-card',
  });
  const analyticsRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    start: 'top 80%',
    childSelector: '.tool-card',
  });
  const checklistRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    start: 'top 80%',
    childSelector: '.checklist-group',
  });
  const priorityRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.12,
    start: 'top 80%',
    childSelector: '.priority-group',
  });

  return (
    <div>
      <SEO
        title="Free SEO & Website Check Tools | NLDS"
        description="Use free SEO and website tools to check speed, indexing, structured data, local visibility, analytics, and visitor behavior."
        canonical="https://newlvlstudio.com/free-seo-tools"
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
            FREE SEO + WEBSITE RESOURCES
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
            12 Actually Free SEO Tools for Local Business Websites
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
            Check how your website performs, how search engines understand it, how customers find
            it locally, and where technical or usability problems may be holding it back.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start sm:items-center"
            style={{ gap: 12, marginTop: 36 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <a
              href="#start-check"
              className="btn-primary"
              aria-label="Start your website check — scroll to guided process"
            >
              Start Your Website Check
            </a>
            <Link to="/contact" className="btn-secondary">
              Request a Free Review
            </Link>
          </motion.div>

          <motion.p
            className="font-sans mt-6"
            style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Several tools can be used immediately. Account-based tools are labeled clearly.
          </motion.p>

          <motion.div className="mt-12" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. START HERE ───────────────────────────────────────────────── */}
      <section
        id="start-check"
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
              WHERE TO START
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 600,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Not Sure Where to Begin?
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 560,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Run these checks in order to get a practical overview of your website, search
              visibility, local presence, and visitor experience.
            </motion.p>
          </motion.div>

          <div
            ref={stepsRef}
            style={{ marginTop: 48 }}
          >
            {steps.map((step) => (
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
                {/* Step number */}
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

                {/* Content */}
                <div>
                  <div
                    className="flex flex-col sm:flex-row sm:items-baseline"
                    style={{ gap: '4px 12px', marginBottom: 8 }}
                  >
                    <h3
                      className="font-serif"
                      style={{
                        fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                        color: 'var(--charcoal)',
                        lineHeight: 1.2,
                      }}
                    >
                      {step.title}
                    </h3>
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '0.8125rem',
                        color: 'var(--muted-text)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {step.tools}
                    </span>
                  </div>
                  <p
                    className="font-sans"
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'var(--muted-text)',
                      marginBottom: 12,
                    }}
                  >
                    {step.description}
                  </p>
                  <a
                    href={step.anchor}
                    className="text-link"
                    aria-label={step.anchorLabel}
                  >
                    {step.anchorLabel} →
                  </a>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid var(--silver-grey)' }} />
          </div>
        </div>
      </section>

      {/* ── 3. SEARCH AND LOCAL VISIBILITY TOOLS ────────────────────────── */}
      <section
        id="search-tools"
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
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              SEARCH + LOCAL VISIBILITY
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 620,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              See How Customers Find Your Business
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 580,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              These tools help you review search visibility, indexing, local presence, search
              demand, and how search engines understand your website.
            </motion.p>
          </motion.div>

          <div
            ref={searchRef}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 48 }}
          >
            {searchTools.map((card) => (
              <div key={card.name} className="tool-card">
                <ToolCardComponent card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. TECHNICAL WEBSITE TOOLS ──────────────────────────────────── */}
      <section
        id="technical-tools"
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
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              TECHNICAL + PERFORMANCE
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 680,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Check Website Speed, Quality, and Structured Data
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 580,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Use these tools to identify technical problems affecting loading, mobile usability,
              accessibility, structured data, and search-engine understanding.
            </motion.p>
          </motion.div>

          <div
            ref={techRef}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 48 }}
          >
            {technicalTools.map((card) => (
              <div key={card.name} className="tool-card">
                <ToolCardComponent card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ANALYTICS AND REPORTING TOOLS ────────────────────────────── */}
      <section
        id="analytics-tools"
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
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              ANALYTICS + REPORTING
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 620,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Understand What Visitors Do After They Arrive
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 580,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Search visibility is only part of the picture. These tools help you understand
              traffic, engagement, visitor behavior, brand mentions, and reporting.
            </motion.p>
          </motion.div>

          <div
            ref={analyticsRef}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 48 }}
          >
            {analyticsTools.map((card) => (
              <div key={card.name} className="tool-card">
                <ToolCardComponent card={card} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. WEBSITE SELF-AUDIT CHECKLIST ─────────────────────────────── */}
      <section
        id="self-audit"
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
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              THE FIRST IMPRESSION SYSTEM
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 600,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              A Good Score Is Not the Whole Story
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 580,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Automated tools can identify technical problems, but they cannot fully judge whether
              customers understand, trust, or contact the business.
            </motion.p>
          </motion.div>

          <div
            ref={checklistRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 48 }}
          >
            {checklistGroups.map((group) => (
              <div
                key={group.title}
                className="checklist-group"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  padding: 'clamp(24px, 3vw, 32px)',
                }}
              >
                <h3
                  className="font-serif"
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--charcoal)',
                    marginBottom: 16,
                    paddingBottom: 12,
                    borderBottom: '1px solid var(--silver-grey)',
                  }}
                >
                  {group.title}
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.55,
                        color: 'var(--muted-text)',
                        padding: '8px 0',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. WHAT TO FIX FIRST ────────────────────────────────────────── */}
      <section
        id="fix-first"
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
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              PRIORITIZE THE WORK
            </motion.p>
            <motion.h2
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.1,
                color: 'var(--charcoal)',
                maxWidth: 540,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              What Should You Fix First?
            </motion.h2>
            <motion.p
              className="font-sans mt-4"
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--muted-text)',
                maxWidth: 560,
              }}
              variants={shouldReduceMotion ? undefined : fadeUp}
            >
              Do not chase a perfect automated score while ignoring problems that prevent customers
              from finding, trusting, or contacting the business.
            </motion.p>
          </motion.div>

          <div
            ref={priorityRef}
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 48 }}
          >
            {priorities.map((group, i) => (
              <div
                key={group.label}
                className="priority-group"
                style={{
                  backgroundColor: i === 0 ? 'var(--charcoal)' : 'var(--surface)',
                  border: `1px solid ${i === 0 ? 'var(--charcoal)' : 'var(--border-color)'}`,
                  padding: 'clamp(24px, 3vw, 32px)',
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  <span
                    className="font-sans"
                    style={{
                      fontSize: '0.6875rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: i === 0 ? 'rgba(255,255,255,0.5)' : 'var(--muted-text)',
                      display: 'block',
                      marginBottom: 6,
                    }}
                  >
                    Priority {i + 1}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: '1.25rem',
                      lineHeight: 1.2,
                      color: i === 0 ? '#fff' : 'var(--charcoal)',
                    }}
                  >
                    {group.label}
                  </h3>
                </div>
                <div style={{ height: 1, backgroundColor: i === 0 ? 'rgba(255,255,255,0.12)' : 'var(--silver-grey)', marginBottom: 16 }} />
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-sans"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.55,
                        color: i === 0 ? 'rgba(255,255,255,0.8)' : 'var(--muted-text)',
                        padding: '7px 0',
                        borderBottom: `1px solid ${i === 0 ? 'rgba(255,255,255,0.08)' : 'var(--border-color)'}`,
                        display: 'flex',
                        gap: 10,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          flexShrink: 0,
                          marginTop: '0.35em',
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          backgroundColor: i === 0 ? 'rgba(255,255,255,0.4)' : 'var(--silver-grey)',
                          display: 'inline-block',
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. NLDS REVIEW CTA ──────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-soft)',
          padding: 'clamp(64px, 8vw, 100px) 0',
          borderTop: '1px solid var(--silver-grey)',
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
          <div
            className="grid grid-cols-1 lg:grid-cols-2"
            style={{ gap: 'clamp(40px, 6vw, 80px)', alignItems: 'start' }}
          >
            <div>
              <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
                NEED A SECOND SET OF EYES?
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
                Not Sure What the Results Mean?
              </motion.h2>
              <motion.p
                className="font-sans mt-5"
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  color: 'var(--muted-text)',
                  maxWidth: 480,
                }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                Automated tools can identify individual problems, but they do not always explain
                which issues are affecting visibility, trust, usability, or customer enquiries.
                NLDS can review the complete website and local search experience.
              </motion.p>
              <motion.div
                style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}
                variants={shouldReduceMotion ? undefined : fadeUp}
              >
                <Link to="/contact" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Request My Free Website Review
                </Link>
                <p
                  className="font-sans"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.5 }}
                >
                  Message{' '}
                  <strong style={{ color: 'var(--charcoal)' }}>"SEO"</strong>{' '}
                  for a free website + local visibility review.
                </p>
              </motion.div>
            </div>

            <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
              <p
                className="font-sans"
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-text)',
                  marginBottom: 16,
                }}
              >
                Review includes
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Website first impression',
                  'Mobile usability',
                  'Local SEO foundations',
                  'Google Business Profile alignment',
                  'Technical problems',
                  'Trust signals',
                  'Contact and conversion flow',
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      borderTop: '1px solid var(--silver-grey)',
                      padding: '14px 0',
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
                        backgroundColor: 'var(--charcoal)',
                        display: 'inline-block',
                      }}
                    />
                    <span
                      className="font-sans"
                      style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
                <li style={{ borderTop: '1px solid var(--silver-grey)' }} />
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── 9. FAQ ──────────────────────────────────────────────────────── */}
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
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>
              FAQ
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
              Free SEO Tool Questions
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
              Straight answers to common questions from local business owners checking their
              websites and search visibility.
            </motion.p>
          </motion.div>

          <div
            style={{
              marginTop: 48,
              maxWidth: 760,
            }}
          >
            <Accordion type="single" collapsible>
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger
                    className="font-serif text-left"
                    style={
                      {
                        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
                        color: 'var(--charcoal)',
                        lineHeight: 1.35,
                        fontFamily: "'DM Serif Display', serif",
                        '--tw-ring-color': 'transparent',
                      } as React.CSSProperties
                    }
                  >
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p
                      className="font-sans"
                      style={{
                        fontSize: '0.9375rem',
                        lineHeight: 1.65,
                        color: 'var(--muted-text)',
                        paddingTop: 4,
                        paddingBottom: 8,
                      }}
                    >
                      {faq.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ───────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--bg-soft)',
          padding: 'clamp(64px, 8vw, 100px) 0',
          borderTop: '1px solid var(--silver-grey)',
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
            Your Website Should Do More Than Pass a Test
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
            It should clearly explain the business, build trust, support local visibility, and
            make it easy for customers to take the next step.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center"
            style={{ gap: 12, marginTop: 36 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            <Link to="/contact" className="btn-primary">
              Request a Free Review
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

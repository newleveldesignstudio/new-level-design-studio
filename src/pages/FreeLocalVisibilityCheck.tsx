import { Link } from 'react-router-dom';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import ProcessSection from '@/components/ProcessSection';
import FinalCTA from '@/components/FinalCTA';

const CTA_URL = '/contact/?service=local-visibility-check';

const whatWeCheck = [
  { title: 'Website First Impression', desc: 'What a visitor sees and understands in the first few seconds.' },
  { title: 'Mobile Contact Path', desc: 'How easy it is to call, message, or request a quote from a phone.' },
  { title: 'Google Business Profile Alignment', desc: 'Whether your GBP matches your website — name, categories, hours, service area.' },
  { title: 'Review Link & Review Flow', desc: 'Whether there is a simple, direct way for customers to leave a review.' },
  { title: 'Citation & Listing Consistency', desc: 'Whether your name, address, and phone number match across key listings.' },
  { title: 'Service-Area Clarity', desc: 'Whether the cities and neighborhoods you serve are stated clearly.' },
  { title: 'Local Page / Service Page Basics', desc: 'Whether your pages actually explain what you do and where you do it.' },
  { title: 'Trust Signals & Next Steps', desc: 'Whether a visitor can tell your business is legitimate and knows what to do next.' },
];

const whatYouGetBack = [
  'A short, plain-English summary — no jargon, no filler',
  'The top visibility gaps we found',
  'The highest-priority fixes, in order',
  'Whether the issue is your website, GBP, reviews, listings, service pages, or contact flow',
  'A suggested next step, if NLDS can help — no pressure either way',
];

const whoItsFor = [
  'Contractors',
  'Realtors',
  'Lawn Care & Landscaping',
  'Tree Service Companies',
  'Pressure Washing Companies',
  'Roofers & Remodelers',
  'Restaurants & Shops',
  'Facebook-Only Businesses',
];

const processSteps = [
  { number: '01', title: 'Send Your Info', description: 'Tell us your business name, website (if you have one), and Google Business Profile.' },
  { number: '02', title: 'We Review It', description: 'Michael personally reviews your core visibility signals — website, GBP, reviews, listings, and contact path.' },
  { number: '03', title: 'You Get the Fixes', description: 'You receive a plain-English summary of the clearest gaps and what to fix first.' },
];

const faqs = [
  {
    q: 'Is the Local Visibility Check really free?',
    a: 'Yes. There is no cost and no obligation to hire NLDS for anything afterward.',
  },
  {
    q: 'Is this the same as using the Free SEO Tools?',
    a: 'No. The Free SEO Tools are self-serve — you check speed, indexing, structured data, and local visibility yourself. The Free Local Visibility Check is a manual review: Michael actually looks at your website, Google profile, reviews, and listings and tells you what stands out.',
  },
  {
    q: 'Is this the same as a full SEO audit?',
    a: 'No. This is a starting-point review focused on the basics that affect trust and contact — not a full technical SEO campaign or ongoing service.',
  },
  {
    q: 'Do I need a website to request one?',
    a: 'No. If you only have a Facebook page or a Google Business Profile, we can still review what is there and point out the gaps.',
  },
  {
    q: 'Can you review my Google Business Profile?',
    a: 'Yes — GBP alignment, categories, and consistency with your website are part of the review.',
  },
  {
    q: 'Do you guarantee rankings?',
    a: 'No. Nobody can honestly guarantee rankings, leads, traffic, or sales. This review points out concrete, fixable gaps — nothing more.',
  },
  {
    q: 'What happens after the check?',
    a: 'You get the summary either way. If it turns out NLDS can help with what we found, we will say so — if not, you still walk away with a clear list of what to fix.',
  },
];

const serviceSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://newlvlstudio.com/free-local-visibility-check/#service',
  name: 'Free Local Visibility Check',
  serviceType: 'Free Local Visibility Check',
  description:
    'A free, manual review of a local business’s website, Google Business Profile, reviews, listings, and local search trust signals.',
  provider: { '@id': 'https://newlvlstudio.com/#business' },
  areaServed: [
    'Port Orange',
    'Daytona Beach',
    'Ormond Beach',
    'New Smyrna Beach',
    'Volusia County',
    'Central Florida',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FreeLocalVisibilityCheck() {
  return (
    <div>
      <SEO
        title="Free Local Visibility Check | New Level Design Studio"
        description="Request a free local visibility check for your website, Google Business Profile, reviews, listings, and local search trust signals."
        canonical="https://newlvlstudio.com/free-local-visibility-check"
        jsonLd={[
          localBusinessSchema(),
          serviceSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Free SEO Tools', url: 'https://newlvlstudio.com/free-seo-tools/' },
            { name: 'Free Local Visibility Check', url: 'https://newlvlstudio.com/free-local-visibility-check/' },
          ]),
          faqSchema,
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">FREE LOCAL VISIBILITY CHECK</p>
          <h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.07,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 720,
            }}
          >
            Free Local Visibility Check
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 580 }}
          >
            Get a plain-English review of whether your website, Google profile, reviews, listings,
            and service-area signals are working together or quietly costing you trust.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to={CTA_URL} className="btn-primary">
              Request My Free Check
            </Link>
            <Link to="/free-seo-tools/" className="btn-secondary">Use the Free SEO Tools</Link>
          </div>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted-text)', maxWidth: 560 }}
          >
            Want to check things yourself first? Use the free SEO tools. Want a human review?
            Request the free visibility check.
          </p>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Self-Serve vs Human Review */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '0 0 100px' }}>
        <div className="container-nlds">
          <p className="eyebrow">HOW THIS IS DIFFERENT</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            Self-Serve Tools vs. a Human Review
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div
              style={{
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}
              >
                Free SEO Tools
              </p>
              <p className="font-sans mt-4" style={{ fontSize: '0.9375rem', color: 'var(--body-text)', lineHeight: 1.65 }}>
                Check your own site speed, indexing, structured data, and local visibility basics —
                self-serve, instant, no one reviews it for you.
              </p>
              <Link to="/free-seo-tools/" className="btn-secondary mt-6 inline-block">
                Use the Free SEO Tools
              </Link>
            </div>
            <div
              style={{
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}
              >
                Free Local Visibility Check
              </p>
              <p className="font-sans mt-4" style={{ fontSize: '0.9375rem', color: 'var(--body-text)', lineHeight: 1.65 }}>
                Michael personally reviews the bigger picture — your website, Google profile,
                reviews, and listings — and points out the clearest next fixes.
              </p>
              <Link to={CTA_URL} className="btn-primary mt-6 inline-block">
                Request My Free Check
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE CHECK</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            The Signals That Affect Trust and Contact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {whatWeCheck.map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                  {item.title}
                </h3>
                <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Back */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="eyebrow">WHAT YOU GET BACK</p>
              <h2
                className="font-serif mt-4"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
              >
                A Clear, Honest Summary — Nothing Bloated
              </h2>
              <p
                className="font-sans mt-5"
                style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
              >
                Just the gaps that matter and what to do about them first.
              </p>
            </div>
            <div
              style={{
                backgroundColor: 'var(--bg-soft)',
                border: '1px solid var(--border-color)',
                padding: 'clamp(28px, 4vw, 40px)',
              }}
            >
              <p
                className="font-sans uppercase"
                style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}
              >
                What's Included
              </p>
              <ul className="mt-5 flex flex-col" style={{ gap: 12 }}>
                {whatYouGetBack.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 2 }}>
                      —
                    </span>
                    <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--body-text)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHO THIS IS FOR</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            Built for Local Service Businesses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {whoItsFor.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  padding: '32px',
                }}
              >
                <span
                  className="font-sans font-semibold uppercase text-center"
                  style={{ fontSize: '0.875rem', letterSpacing: '0.1em', color: 'var(--charcoal)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why This Matters */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHY THIS MATTERS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            Customers Rarely Decide From One Place
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            Before someone calls, they may see your Google profile, website, reviews, Facebook
            page, and local listings — in no particular order. If the details are inconsistent,
            outdated, confusing, or hard to act on, trust drops before you ever hear from them.
          </p>
        </div>
      </section>

      {/* Simple Process */}
      <ProcessSection
        eyebrow="SIMPLE PROCESS"
        heading="How the Free Check Works"
        steps={processSteps}
      />

      {/* FAQ */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">FAQ</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1, maxWidth: 560 }}
          >
            Common Questions
          </h2>
          <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {faqs.map((item, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--silver-grey)', padding: '28px 0' }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)', lineHeight: 1.4 }}>
                  {item.q}
                </h3>
                <p className="font-sans mt-3" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
          <p
            className="font-sans mt-10"
            style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
          >
            Want the fuller setup, not just the review?{' '}
            <Link to="/local-visibility-setup/" className="font-sans" style={{ color: 'var(--charcoal)' }}>View Local Visibility Setup</Link>.
            {' '}See all{' '}
            <Link to="/services/" className="font-sans" style={{ color: 'var(--charcoal)' }}>services</Link>{' '}
            or{' '}
            <Link to="/website-care/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Website Care</Link>{' '}
            for ongoing upkeep. Serving{' '}
            <Link to="/port-orange-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Port Orange</Link>,{' '}
            <Link to="/daytona-beach-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Daytona Beach</Link>,{' '}
            <Link to="/volusia-county-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Volusia County</Link>, and{' '}
            <Link to="/central-florida-website-design/" className="font-sans" style={{ color: 'var(--charcoal)' }}>Central Florida</Link>.
          </p>
        </div>
      </section>

      <FinalCTA
        heading="Ready for a Second Set of Eyes?"
        body="Send your business info and we'll show you where the biggest local visibility gaps are."
        buttonText="Request My Free Check"
        buttonTo={CTA_URL}
      />
    </div>
  );
}

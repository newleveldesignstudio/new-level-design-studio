import { Link } from 'react-router-dom';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Private Code Backup',
    intro: 'Client sites are version-controlled from day one, not just kept as a folder of files.',
    points: [
      'Every project lives in its own private, version-controlled repository.',
      'Meaningful updates are committed with clear, dated history — not silently overwritten.',
      'Private backups are used when appropriate, so the code exists safely off of any single machine.',
      "If something breaks, or you want to revisit an earlier version, there's a real rollback path — not guesswork.",
    ],
  },
  {
    number: '02',
    title: 'Pre-Launch QA',
    intro: 'Before anything goes live, it gets tested the way a real visitor would actually use it.',
    points: [
      'Checked on mobile, tablet, and desktop — not just one screen size.',
      'Reviewed for layout issues like content spilling off the side of the page or getting cut off.',
      'Contact forms and other interactive pieces are tested, not assumed to work.',
      'Checked for browser console errors and failed page requests before launch.',
    ],
  },
  {
    number: '03',
    title: 'SEO & Crawl Basics',
    intro: "A site that looks right but can't be found or read correctly by search engines isn't finished.",
    points: [
      'Page titles and descriptions are reviewed for every page, not left as defaults.',
      'Sitemap and canonical URLs are checked so search engines see one clear version of each page.',
      "Where the site's setup supports it, important pages are built to be crawlable rather than hidden behind loading screens.",
      'Structured data (schema) is added where it helps search engines understand the page.',
    ],
  },
  {
    number: '04',
    title: 'Safer Deployment',
    intro: "Going live is a checked step, not a leap of faith.",
    points: [
      "Every build is tested before it's pushed to the live site.",
      'After deployment, the live production pages are checked directly — not just the local preview.',
      'Meaningful changes can be traced back to exactly what was changed and when.',
      'The live site is never edited by hand in the dark — changes go through the same process every time.',
    ],
  },
  {
    number: '05',
    title: 'Ongoing Care',
    intro: "Launch isn't the finish line — most sites need upkeep to stay reliable.",
    points: [
      'Website Care covers the small stuff: minor updates, form checks, and basic upkeep so the site stays current.',
      'Bigger work — new features, integrations, IDX/MLS, custom systems, or new page builds — is scoped and quoted on its own, not bundled in blindly.',
    ],
  },
];

const REALTOR_QUESTIONS = [
  {
    q: 'Do you use AI to build the whole website?',
    a: 'No. AI helps with parts of the process — organizing, drafting, and prepping — but every site is designed, built, and reviewed by a person before it goes live.',
  },
  {
    q: 'Can AI update my listings?',
    a: "AI can help prepare a listing update from what you send, but a person reviews and applies the change before it's live on your site.",
  },
  {
    q: 'What should I send for listing updates?',
    a: "The MLS number (if available), the property address, the exact change needed, any new photos or links, and a deadline if it's time-sensitive.",
  },
  {
    q: 'What happens if something breaks?',
    a: 'It gets fixed. If the issue was something NLDS caused, correcting it is never billed to you.',
  },
  {
    q: 'Is AI making live changes automatically?',
    a: 'No. AI can flag and prepare things, but nothing goes live without a person reviewing it first.',
  },
  {
    q: 'Can this help with promotion?',
    a: "Yes — AI can help brainstorm content and promotion angles, which get refined before they're used. It's a starting point, not a replacement for your voice.",
  },
  {
    q: 'How is this different from a template IDX site?',
    a: 'A template site is built once and mostly left alone. This pairs a real, maintained website with ongoing, human-reviewed support — so small updates and fixes actually get handled.',
  },
  {
    q: 'If I leave my brokerage, do I lose my website?',
    a: 'No. Your website can be built around your own brand, domain, content, and local positioning instead of being locked inside a brokerage template. If brokerage details change, those can be updated as part of the support process.',
  },
  {
    q: 'Is this only for IDX websites?',
    a: "No. This applies to any realtor website NLDS builds, IDX or not. IDX/MLS integration is its own add-on for when you're ready for it.",
  },
  {
    q: 'Do I have to pay separate IDX or MLS fees?',
    a: 'Possibly. IDX providers, MLS boards, hosting platforms, or third-party tools may charge separate setup, access, or monthly fees depending on the provider and MLS. NLDS can help guide the setup and troubleshooting, but outside provider fees are separate.',
  },
  {
    q: 'Can you help promote new listings or open houses?',
    a: 'Yes. Listing details can be turned into website updates, social post ideas, open house promotion, email copy, landing pages, or premium listing pages depending on what the property needs.',
  },
];

export default function Proof() {
  const stepsRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.1,
    childSelector: '[data-reveal-item]',
  });
  const questionsRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '[data-reveal-item]',
  });

  return (
    <div>
      <SEO
        title="How I Protect Client Websites | New Level Design Studio"
        description="A behind-the-scenes look at the build, backup, QA, and deployment process New Level Design Studio uses for every client website."
        canonical="https://newlvlstudio.com/proof"
        jsonLd={[
          localBusinessSchema(),
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'How I Protect Client Websites', url: 'https://newlvlstudio.com/proof/' },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">PROCESS</p>
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
            How I Protect Client Websites
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 600 }}
          >
            I don't just launch a website and hope it works. Every client project follows a build,
            backup, QA, and deployment process so the site is easier to maintain and safer to update.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/contact/" className="btn-primary">
              Start a Project
            </Link>
            <Link to="/website-care/" className="btn-secondary">
              View Website Care
            </Link>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Process steps */}
      <div ref={stepsRef}>
        {PROCESS_STEPS.map((step, i) => (
          <section
            key={step.number}
            data-reveal-item
            style={{
              backgroundColor: (PROCESS_STEPS.length - 1 - i) % 2 === 0 ? 'var(--bg-main)' : 'var(--bg-soft)',
              padding: '72px 0',
            }}
          >
            <div className="container-nlds">
              <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                <div style={{ flexShrink: 0 }}>
                  <span
                    className="font-serif"
                    style={{ fontSize: '2rem', color: 'var(--blue-dolphin)', lineHeight: 1 }}
                  >
                    {step.number}
                  </span>
                </div>
                <div style={{ maxWidth: 680 }}>
                  <h2
                    className="font-serif"
                    style={{ fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
                  >
                    {step.title}
                  </h2>
                  <p
                    className="font-sans mt-3"
                    style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
                  >
                    {step.intro}
                  </p>
                  <ul className="mt-5" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          className="font-sans shrink-0"
                          style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 5 }}
                        >
                          —
                        </span>
                        <span
                          className="font-sans"
                          style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.6 }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Questions Realtors May Ask */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">FOR REALTORS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1, maxWidth: 620 }}
          >
            Questions Realtors May Ask
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            Some of the day-to-day work is AI-assisted — organizing requests, drafting updates,
            flagging issues. Here's how that actually works.
          </p>
          <p
            className="font-sans mt-4"
            style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            NLDS isn't trying to compete with cheap IDX templates. The goal is a custom realtor
            website with real local authority, stronger listing presentation, lead capture, and an
            organized Website Care process behind it.
          </p>
          <div ref={questionsRef} className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {REALTOR_QUESTIONS.map((item) => (
              <div
                key={item.q}
                data-reveal-item
                style={{ borderBottom: '1px solid var(--silver-grey)', padding: '28px 0' }}
              >
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
            className="font-sans mt-8"
            style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            Behind the scenes, Website Care requests can be organized through an internal support
            workflow. That helps categorize urgent site issues, listing updates, IDX/MLS concerns,
            image updates, and client questions so they can be reviewed, prioritized, and followed up
            on without getting buried in normal messages.
          </p>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            In short: AI speeds up the busywork, but a person reviews anything that goes live or goes
            out to a client — and anything unclear gets a clarifying question first.
          </p>
        </div>
      </section>

      <FinalCTA
        heading="Want This Kind of Process on Your Website?"
        body="Every project gets the same build, backup, QA, and deployment process — no shortcuts, no guesswork."
        buttonText="Start a Project"
        buttonTo="/contact/"
      />
    </div>
  );
}

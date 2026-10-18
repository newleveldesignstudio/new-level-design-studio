import { Link } from 'react-router-dom';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import { useHashScroll } from '@/hooks/useHashScroll';

// Copy mirrors docs/business-systems/02-lead-response-system-offer.md. Keep claims to what NLDS can
// design today; anything that depends on a client's software says so.

const CTA_TO = '/contact/?service=business-workflows';

const problems = [
  { title: 'Missed leads', desc: 'Website and email inquiries arrive, but nobody sees them until it is too late.' },
  { title: 'Slow response', desc: 'The first reply waits until someone has a free minute, and the customer calls the next company.' },
  { title: 'Repetitive admin', desc: 'The same details get typed into the inbox, the spreadsheet, the calendar, and the invoice.' },
  { title: 'Disconnected tools', desc: 'The website, forms, inbox, and job tools each hold part of the picture, and none of them talk to each other.' },
  { title: 'Follow-up that depends on memory', desc: 'Callbacks, quotes, and check-ins happen only if someone remembers to do them.' },
  { title: 'No clear view of what needs attention', desc: 'It is hard to tell which requests are handled, which are waiting, and which have slipped.' },
];

const flow = [
  { title: 'New lead arrives', desc: 'From your website form or a business inbox.' },
  { title: 'Identify the request', desc: 'Pull out the key details and sort it by service, location, or urgency.' },
  { title: 'Route it to the right person', desc: 'Your routing rules decide who owns it.' },
  { title: 'Notify the team', desc: 'The owner is told right away, through the channel your team actually checks.' },
  { title: 'Create or draft the follow-up', desc: 'A reply draft or a follow-up task is ready, so the first response does not start from a blank page.' },
  { title: 'Record what happened', desc: 'The lead and its status are logged in one place.' },
  { title: 'Escalate if it is not handled', desc: 'If nobody picks it up in the time you set, someone else is told.' },
];

const fitProblems = [
  'Website leads sitting unanswered',
  'Inbox leads getting buried under everything else',
  'Nobody knowing who owns an inquiry',
  'Slow first response to new customers',
  'Manual copying between the inbox, spreadsheets, and job tools',
  'Follow-up that depends on someone remembering',
];

const components = [
  { title: 'Website form intake', desc: 'New form submissions start the workflow.', note: 'Works with forms on NLDS-built sites; other form tools depend on what they can send out.' },
  { title: 'Email lead intake', desc: 'Inquiries that arrive at a business inbox are picked up and handled the same way.', note: 'Depends on the email provider and the access you are comfortable granting.' },
  { title: 'Lead categorization', desc: 'Requests are sorted by service, location, or urgency using rules you approve.' },
  { title: 'Routing rules', desc: 'Each type of request goes to the right person or team.' },
  { title: 'Notifications', desc: 'The right person is told when a lead needs attention.', note: 'Email is the default; other channels depend on the tools your team uses.' },
  { title: 'Follow-up drafting', desc: 'A first reply is prepared for a person to review and send.' },
  { title: 'Task creation', desc: 'A follow-up task is created so the next step is not forgotten.', note: 'Requires a task or job tool that accepts new tasks from outside.' },
  { title: 'Basic lead logging', desc: 'Every lead and what happened to it is recorded in one place.', note: 'In a tool you already use, or a simple log we set up.' },
  { title: 'Escalation rules', desc: 'Unhandled leads are flagged to a second person after the time you set.' },
  { title: 'Simple reporting', desc: 'A plain summary of leads received, how quickly they were answered, and what is still open.' },
];

const beforeSteps = ['Lead comes in', 'Sits in inbox', 'Manual handoff', 'Delayed reply', 'Missed follow-up'];
const afterSteps = ['Lead comes in', 'Identify request', 'Route', 'Notify team', 'Draft response', 'Record activity', 'Escalate if needed'];

const jobIntakeSteps = [
  'New request arrives',
  'Capture job details',
  'Assign owner',
  'Prepare quote handoff',
  'Track status',
  'Flag missing information',
  'Escalate when action is needed',
];

const notThis = [
  'Not a full CRM replacement.',
  'Not autonomous selling without human oversight.',
  'Not a one-size-fits-all chatbot.',
  'Not a promise to connect to every business platform.',
  'Not a replacement for staff judgment on complex customer situations.',
];

const method = [
  { number: '01', title: 'Understand', desc: 'We map how leads reach you today: every form, inbox, and phone path, and who answers each one.' },
  { number: '02', title: 'Identify', desc: 'We find where leads wait, get lost, or get retyped, and which of those costs you the most.' },
  { number: '03', title: 'Simplify', desc: 'We agree on the smallest flow that fixes it: who owns which leads, how fast they need an answer, and what stays manual.' },
  { number: '04', title: 'Build', desc: 'We set up intake, routing, notifications, and logging around the tools you already use.' },
  { number: '05', title: 'Test', desc: 'We run realistic test leads through every path, including the ones that should escalate, before anything goes live.' },
  { number: '06', title: 'Improve', desc: 'After launch, we review what was missed or slow and adjust the rules.' },
];

const questions = [
  'Where do your leads come from today?',
  'Who answers them, and how quickly?',
  'Which tools does your team use day to day?',
  'What gets copied by hand from one place to another?',
  'Where do leads or follow-ups get lost?',
  'What do you wish happened automatically?',
  'What must always stay with a person to approve?',
];

const serviceSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://newlvlstudio.com/business-systems/#service',
  name: 'Business Systems',
  serviceType: 'Business workflow design',
  description:
    'Practical workflows for local businesses, starting with a Lead Response System: lead intake, routing, notifications, follow-up, logging, and escalation around the tools a business already uses.',
  provider: { '@id': 'https://newlvlstudio.com/#business' },
  areaServed: ['Port Orange', 'Daytona Beach', 'Ormond Beach', 'New Smyrna Beach', 'Volusia County', 'Central Florida'],
};

// Before/after lead flow: stacked step boxes joined by a thin connector. Static on purpose (no animation).
function FlowColumn({ label, steps, dark }: { label: string; steps: string[]; dark?: boolean }) {
  const line = dark ? 'rgba(255, 255, 255, 0.25)' : 'var(--silver-grey)';
  return (
    <div
      style={{
        backgroundColor: dark ? 'var(--charcoal)' : 'var(--surface)',
        border: dark ? '1px solid var(--charcoal)' : '1px solid var(--border-color)',
        padding: 'clamp(24px, 4vw, 36px)',
      }}
    >
      <p className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.25em', color: dark ? 'var(--platinum-grey)' : 'var(--muted-text)' }}>
        {label}
      </p>
      <ol className="mt-6 flex flex-col" aria-label={label}>
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-start">
            {i > 0 && <span aria-hidden="true" style={{ width: 1, height: 18, marginLeft: 20, backgroundColor: line }} />}
            <span
              className="font-sans"
              style={{
                display: 'block',
                width: '100%',
                padding: '11px 16px',
                fontSize: '0.9375rem',
                lineHeight: 1.4,
                color: dark ? 'var(--white)' : 'var(--body-text)',
                border: `1px solid ${dark ? 'rgba(255, 255, 255, 0.18)' : 'var(--silver-grey)'}`,
                backgroundColor: dark ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
              }}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const h2Style = { fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1 } as const;
const leadStyle = { fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 580 } as const;

export default function BusinessSystems() {
  useHashScroll();

  return (
    <div>
      <SEO
        title="Business Systems & Lead Response Workflows | NLDS"
        description="Practical workflows for local businesses: lead intake, routing, notifications, follow-up, and fewer manual steps between the tools you already use."
        canonical="https://newlvlstudio.com/business-systems"
        jsonLd={[
          localBusinessSchema(),
          serviceSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Business Systems', url: 'https://newlvlstudio.com/business-systems/' },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">BUSINESS SYSTEMS</p>
          <h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.07, letterSpacing: '-0.02em', color: 'var(--charcoal)', maxWidth: 760 }}
          >
            Practical Workflows Built Around Real Business Bottlenecks.
          </h1>
          <p className="font-sans mt-6" style={leadStyle}>
            NLDS designs simple systems for the work that slows local businesses down: new leads that
            wait too long, follow-ups that depend on memory, and information retyped from one tool to
            the next. We start with the problem, then build the smallest fix that solves it.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to={CTA_TO} className="btn-primary w-full sm:w-auto text-center">See What We Can Improve</Link>
            <Link to="/business-systems/#lead-response-system" className="btn-secondary w-full sm:w-auto text-center">
              Lead Response System
            </Link>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Problems */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '0 0 100px' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHERE TIME AND LEADS GET LOST</p>
          <h2 className="font-serif mt-4" style={h2Style}>The Problems Worth Fixing First</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {problems.map((p) => (
              <div key={p.title} style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>{p.title}</h3>
                <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured offer: Lead Response System */}
      <section id="lead-response-system" style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">FEATURED SYSTEM</p>
          <h2 className="font-serif mt-4" style={h2Style}>Lead Response System</h2>
          <p className="font-sans mt-5" style={leadStyle}>
            A lead response workflow designed around your existing tools and the way your team already
            works. The goal is simple: every new inquiry gets seen, owned, and answered.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <FlowColumn label="Before" steps={beforeSteps} />
            <FlowColumn label="After" steps={afterSteps} dark />
          </div>
          <ol className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {flow.map((step, i) => (
              <li
                key={step.title}
                className="flex items-start gap-5"
                style={{ borderTop: '1px solid var(--silver-grey)', padding: '22px 0' }}
              >
                <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24, paddingTop: 3 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>{step.title}</h3>
                  <p className="font-sans mt-1" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="font-sans mt-8" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}>
            Every business is set up differently. Which steps can run on their own depends on the
            software you already use, and some steps stay with a person on purpose. We design the flow
            around your tools and agree on those decisions with you before anything is built.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            <div>
              <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--charcoal)', lineHeight: 1.2 }}>Built for These Problems</h3>
              <ul className="mt-6 flex flex-col" style={{ gap: 12 }}>
                {fitProblems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 2 }}>—</span>
                    <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--body-text)', lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-color)', padding: 'clamp(28px, 4vw, 40px)' }}>
              <h3 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--charcoal)', lineHeight: 1.2 }}>What This Is Not</h3>
              <ul className="mt-6 flex flex-col" style={{ gap: 12 }}>
                {notThis.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 2 }}>—</span>
                    <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--body-text)', lineHeight: 1.55 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example beyond lead response: job intake to quote handoff */}
      <section id="job-intake-example" style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="eyebrow">EXAMPLE: OPERATIONAL WORKFLOW</p>
              <h2 className="font-serif mt-4" style={h2Style}>Job Intake to Quote Handoff</h2>
              <p className="font-sans mt-5" style={leadStyle}>
                New job details are captured once, routed to the right person, and carried into the
                quoting process without repeatedly copying the same information between tools.
              </p>
              <p className="font-sans mt-4" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 580 }}>
                This is an example of the kind of workflow we design, not a fixed package. Which steps
                can run on their own depends on the tools you already use.
              </p>
            </div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8" aria-label="Job intake to quote handoff steps">
              {jobIntakeSteps.map((step, i) => (
                <li key={step} className="flex items-start gap-4" style={{ borderTop: '1px solid var(--silver-grey)', padding: '16px 0' }}>
                  <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24, paddingTop: 3 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* What We Can Build */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT WE CAN BUILD</p>
          <h2 className="font-serif mt-4" style={h2Style}>The Pieces of a Lead Response System</h2>
          <p className="font-sans mt-5" style={leadStyle}>
            Most businesses need only some of these. We pick the pieces that fix your bottleneck and
            leave the rest out.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mt-12">
            {components.map((c) => (
              <div key={c.title} style={{ borderBottom: '1px solid var(--silver-grey)', padding: '22px 0' }}>
                <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>{c.title}</h3>
                <p className="font-sans mt-1" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>{c.desc}</p>
                {c.note && (
                  <p className="font-sans mt-2" style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.55, fontStyle: 'italic' }}>{c.note}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works — the NLDS Method applied */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2 className="font-serif mt-4" style={h2Style}>The NLDS Method, Applied to Lead Response</h2>
          <div className="mt-12 flex flex-col" style={{ gap: 0 }}>
            {method.map((step) => (
              <div key={step.number} className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8" style={{ borderTop: '1px solid var(--silver-grey)', padding: '28px 0' }}>
                <span className="font-serif shrink-0" style={{ fontSize: '2rem', color: '#82827d', lineHeight: 1, minWidth: 48 }}>{step.number}</span>
                <div className="flex-1">
                  <h3 className="font-sans font-semibold" style={{ fontSize: '1.0625rem', color: 'var(--charcoal)' }}>{step.title}</h3>
                  <p className="font-sans mt-2" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 560 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Questions we ask */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="eyebrow">BEFORE WE RECOMMEND ANYTHING</p>
              <h2 className="font-serif mt-4" style={h2Style}>What We&rsquo;ll Ask You</h2>
              <p className="font-sans mt-5" style={leadStyle}>
                A short conversation is usually enough to see where a workflow would help and where it
                would not. If you know the answers to a few of these, send them with your message.
              </p>
              <Link to={CTA_TO} className="btn-primary mt-8 inline-block">See What We Can Improve</Link>
            </div>
            <ol className="flex flex-col" style={{ gap: 0 }}>
              {questions.map((q, i) => (
                <li key={q} className="flex items-start gap-5" style={{ borderBottom: '1px solid var(--silver-grey)', padding: '18px 0' }}>
                  <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24, paddingTop: 3 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.55 }}>{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* LeadStrike vs. Business Systems */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '0 0 100px' }}>
        <div className="container-nlds">
          <div style={{ backgroundColor: 'var(--charcoal)', padding: 'clamp(24px, 6vw, 64px)' }}>
            <p className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.25em', color: 'var(--platinum-grey)' }}>
              Understanding the Difference
            </p>
            <h2 className="font-serif mt-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--white)', lineHeight: 1.15 }}>
              LeadStrike vs. Business Systems
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--platinum-grey)', lineHeight: 1.65, borderTop: '1px solid rgba(255, 255, 255, 0.18)', paddingTop: 20 }}>
                <strong style={{ color: 'var(--white)', fontWeight: 600 }}>LeadStrike</strong> is our productized lead-response
                system for roofing, HVAC, and plumbing companies that need a focused way to capture website
                inquiries and get the details to the team right away.
              </p>
              <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--platinum-grey)', lineHeight: 1.65, borderTop: '1px solid rgba(255, 255, 255, 0.18)', paddingTop: 20 }}>
                <strong style={{ color: 'var(--white)', fontWeight: 600 }}>Business Systems</strong> is our custom service for
                businesses with specific workflow bottlenecks, tool handoffs, routing rules, or internal
                processes that need to work better.
              </p>
            </div>
            <div className="mt-10" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.18)', paddingTop: 20 }}>
              <p className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.2em', color: 'var(--platinum-grey)' }}>
                Rule of thumb
              </p>
              <ul className="mt-4 flex flex-col" style={{ gap: 8 }}>
                <li className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--white)', lineHeight: 1.55 }}>
                  If your problem is getting new website leads to your team right away, LeadStrike may be the better fit.
                </li>
                <li className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--white)', lineHeight: 1.55 }}>
                  If the problem involves your specific tools, workflow, or internal process, Business Systems is the better fit.
                </li>
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link to={CTA_TO} className="btn-primary btn-light w-full sm:w-auto text-center">See What We Can Improve</Link>
              <a
                href="https://leadstrikenow.com/"
                className="btn-secondary w-full sm:w-auto text-center"
                style={{ color: 'var(--white)', borderColor: 'rgba(255, 255, 255, 0.7)' }}
              >
                Explore LeadStrike
              </a>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Start With the Bottleneck."
        body="Tell us where leads wait, where work gets repeated, or where things fall through the cracks. We'll tell you whether there's a practical fix and where we'd start."
        buttonText="See What We Can Improve"
        buttonTo={CTA_TO}
      />
    </div>
  );
}

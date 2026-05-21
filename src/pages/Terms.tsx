import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const sections = [
  {
    title: 'Acceptance of Terms',
    body: 'By accessing and using the services of New Level Design Studio, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.',
  },
  {
    title: 'Services',
    body: 'New Level Design Studio provides website design, brand visuals, short-form video content, and related creative services. Specific deliverables, timelines, and pricing will be outlined in individual project agreements.',
  },
  {
    title: 'Payments',
    body: 'Payment terms are outlined in individual project agreements. A deposit may be required before work begins. Final payment is due upon project completion and before final files are delivered.',
  },
  {
    title: 'Intellectual Property',
    body: 'Upon full payment, clients receive ownership of final deliverables. New Level Design Studio retains the right to showcase work in portfolios and marketing materials unless otherwise agreed upon in writing.',
  },
  {
    title: 'Revisions',
    body: 'The number of revision rounds is specified in each project agreement. Additional revisions beyond the agreed scope may incur extra fees. Revision requests must be consolidated and submitted within the timeframe specified in the agreement.',
  },
  {
    title: 'Limitation of Liability',
    body: 'New Level Design Studio shall not be liable for any indirect, incidental, or consequential damages arising out of or in connection with our services. Our total liability shall not exceed the amount paid for the specific project.',
  },
  {
    title: 'Contact',
    body: 'For questions about these terms, contact us at hello@newlvlstudio.com or (386) 846-5754.',
  },
];

export default function Terms() {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, stagger: 0.1, start: 'top 85%', childSelector: '.terms-section' });

  return (
    <div>
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds" style={{ maxWidth: 800 }}>
          <h1
            className="font-serif"
            style={{ fontSize: '3rem', color: 'var(--charcoal)', lineHeight: 1.1 }}
          >
            Terms of Service
          </h1>
          <p
            className="font-sans mt-4"
            style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
          >
            Last updated: May 20, 2026
          </p>
          <div className="mt-12">
            <SectionDivider />
          </div>

          <div ref={contentRef} className="mt-12 flex flex-col" style={{ gap: 48 }}>
            {sections.map((section, i) => (
              <div key={i} className="terms-section">
                <h2
                  className="font-sans font-semibold uppercase"
                  style={{ fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--charcoal)' }}
                >
                  {section.title}
                </h2>
                <p
                  className="font-sans mt-3"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.7 }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

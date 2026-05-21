import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We collect information you provide directly to us, such as your name, email address, phone number, and business details when you fill out our contact form or engage our services. We may also collect information about how you use our website through cookies and analytics tools.',
  },
  {
    title: 'How We Use Information',
    body: 'We use the information we collect to respond to your inquiries, provide our services, send updates about your project, and improve our offerings. We do not sell or rent your personal information to third parties.',
  },
  {
    title: 'Information Sharing',
    body: 'We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality agreements.',
  },
  {
    title: 'Cookies',
    body: 'Our website may use cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies through your browser settings, though this may affect the functionality of certain features.',
  },
  {
    title: 'Data Security',
    body: 'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    title: 'Your Rights',
    body: 'You have the right to access, correct, or delete your personal information. You may also opt out of receiving communications from us at any time. Contact us to exercise these rights.',
  },
  {
    title: 'Contact',
    body: 'For privacy-related questions or to exercise your rights, contact us at hello@newlvlstudio.com.',
  },
];

export default function Privacy() {
  const contentRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, stagger: 0.1, start: 'top 85%', childSelector: '.privacy-section' });

  return (
    <div>
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds" style={{ maxWidth: 800 }}>
          <h1
            className="font-serif"
            style={{ fontSize: '3rem', color: 'var(--charcoal)', lineHeight: 1.1 }}
          >
            Privacy Policy
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
              <div key={i} className="privacy-section">
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

import ServiceCard from '@/components/ServiceCard';
import ProcessSection from '@/components/ProcessSection';
import FinalCTA from '@/components/FinalCTA';
import SectionDivider from '@/components/SectionDivider';
import { MonitorIcon, FramesIcon, PlayIcon, SupportIcon, SeoIcon, StrategyIcon, SocialIcon } from '@/components/icons';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const processSteps = [
  { number: '01', title: 'Discover', description: 'We learn about your business, your audience, and what makes you different.' },
  { number: '02', title: 'Design', description: 'We craft a visual system and website structure that fits your brand.' },
  { number: '03', title: 'Build', description: 'We bring it to life with clean code, sharp content, and fast performance.' },
  { number: '04', title: 'Launch', description: 'We go live and make sure everything works the way it should.' },
];

const additionalServices = [
  { number: '01', icon: <SupportIcon />, title: 'Ongoing Support', description: 'Monthly updates, content changes, and maintenance to keep your website running smoothly.' },
  { number: '02', icon: <SeoIcon />, title: 'SEO Foundation', description: 'On-page optimization, fast loading speeds, and structured data to help you rank better locally.' },
  { number: '03', icon: <StrategyIcon />, title: 'Content Strategy', description: 'A clear plan for what to post, when to post it, and how it supports your business goals.' },
  { number: '04', icon: <SocialIcon />, title: 'Social Graphics', description: 'Consistent templates and graphics for Instagram, Facebook, and other platforms.' },
];

const industries = [
  'Contractors', 'Restaurants', 'Beauty & Wellness', 'Real Estate',
  'Med Spas', 'Salons', 'Fitness Studios', 'Coffee Shops',
];

export default function Services() {
  const coreRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.service-card' });
  const additionalRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.additional-item' });
  const industriesRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.5, stagger: 0.08, start: 'top 85%', childSelector: '.industry-cell' });

  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <p className="eyebrow">SERVICES</p>
          <h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}
          >
            Websites, Visuals, and Content Built to Raise the Standard.
          </h1>
          <div className="mt-20">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div ref={coreRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="service-card">
              <ServiceCard
                icon={<MonitorIcon />}
                title="Website Design"
                description="Clean, mobile-friendly websites built to help local businesses look established and easy to contact. We design with your customer in mind — fast load times, clear navigation, and a layout that guides visitors to take action."
                link={{ text: 'Start a Website Project', to: '/contact' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<FramesIcon />}
                title="Brand Visuals"
                description="Polished image systems, graphics, and visuals that keep your business consistent across web and social. From logo refinements to complete visual identities, we make sure your brand looks sharp everywhere it appears."
                link={{ text: 'Improve Your Visuals', to: '/contact' }}
              />
            </div>
            <div className="service-card">
              <ServiceCard
                icon={<PlayIcon />}
                title="Short-Form Video"
                description="Vertical content for Reels, TikTok, Facebook, websites, and campaigns that need motion and attention. We plan, shoot, and edit content that fits your brand and keeps your audience engaged."
                link={{ text: 'Plan Your Content', to: '/contact' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <h2
            className="font-serif"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Everything Your Business Needs to Look Sharp Online
          </h2>
          <div ref={additionalRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {additionalServices.map((service, i) => (
              <div key={i} className="additional-item">
                <div className="flex items-start gap-4">
                  <div style={{ color: 'var(--charcoal)', flexShrink: 0 }}>{service.icon}</div>
                  <div>
                    <span className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--silver-grey)', opacity: 0.5 }}>
                      {service.number}
                    </span>
                    <h3 className="font-sans font-semibold mt-2" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                      {service.title}
                    </h3>
                    <p className="font-sans mt-2" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6" style={{ width: '100%', height: 1, backgroundColor: 'var(--silver-grey)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">INDUSTRIES WE SERVE</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Local Businesses Across Volusia County
          </h2>
          <div ref={industriesRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="industry-cell flex items-center justify-center"
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
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSection steps={processSteps} />

      {/* Final CTA */}
      <FinalCTA />

    </div>
  );
}

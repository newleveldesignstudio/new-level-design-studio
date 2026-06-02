import { Link } from 'react-router-dom';
import FinalCTA from '@/components/FinalCTA';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/SEO';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';

const websiteBuildInclusions = [
  'Custom design tailored to your business',
  'Mobile-first, responsive structure',
  'Clear navigation and service pages',
  'Fast load times and clean code',
  'Contact forms and quote requests',
];

const websiteCareInclusions = [
  'Small content updates and text changes',
  'Image swaps and media updates',
  'Broken link checks and fixes',
  'Basic monthly site review',
  'Priority email support',
  'Light performance monitoring',
];

const visualContentInclusions = [
  'Branded graphics for web and social',
  'Website visuals and hero imagery',
  'Launch assets and announcement kits',
  'Short-form video content',
  'Consistent visual direction',
];

const industries = [
  'Contractors',
  'Restaurants',
  'Salons & Barbers',
  'Real Estate',
  'Fitness',
  'Medical / Wellness',
  'Local Services',
  'Starter Packs',
];

export default function Services() {
  const coreRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.7, stagger: 0.15, start: 'top 80%', childSelector: '.service-group' });
  const industriesRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.5, stagger: 0.08, start: 'top 85%', childSelector: '.industry-cell' });
  const whatWorksRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, stagger: 0.08, start: 'top 85%', childSelector: '.works-item' });

  const shouldReduceMotion = useReducedMotion();

  return (
    <div>
      <SEO
        title="Website Design, Visuals & Content Services | New Level Design Studio"
        description="Website design, brand visuals, short-form content, and website care for local businesses that need stronger credibility, visibility, and conversion."
        canonical="https://newlvlstudio.com/services"
      />
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <motion.div
          className="container-nlds"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>SERVICES</motion.p>
          <motion.h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Websites, Visuals, and Content Built to Raise the Standard.
          </motion.h1>
          <motion.div className="mt-20" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* Service Groups */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div ref={coreRef} className="flex flex-col" style={{ gap: 64 }}>
            {/* Website Build */}
            <div className="service-group grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="eyebrow">WEBSITE BUILD</p>
                <h2
                  className="font-serif mt-4"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
                >
                  A Clear, Professional Website Built to Explain Your Offer
                </h2>
                <p
                  className="font-sans mt-5"
                  style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
                >
                  Built to help visitors understand your business fast, trust what they see, and take the next step without confusion.
                </p>
                <Link to="/contact" className="btn-primary mt-8 inline-block">
                  Start a Website Project
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
                  What Is Included
                </p>
                <ul className="mt-5 flex flex-col" style={{ gap: 12 }}>
                  {websiteBuildInclusions.map((item, i) => (
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

            <div style={{ width: '100%', height: 1, backgroundColor: 'var(--silver-grey)' }} />

            {/* Website Care */}
            <div className="service-group grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="eyebrow">WEBSITE CARE</p>
                <h2
                  className="font-serif mt-4"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
                >
                  Ongoing Support to Keep Your Site Sharp
                </h2>
                <p
                  className="font-sans mt-5"
                  style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
                >
                  Keeps your site from feeling abandoned after launch — small updates, link checks, content swaps, and polish handled for you every month.
                </p>
                <Link to="/contact" className="btn-primary mt-8 inline-block">
                  Ask About Website Care
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
                  What Is Included
                </p>
                <ul className="mt-5 flex flex-col" style={{ gap: 12 }}>
                  {websiteCareInclusions.map((item, i) => (
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
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                    Starting at
                  </span>
                  <span className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}>
                    $99/mo
                  </span>
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: 1, backgroundColor: 'var(--silver-grey)' }} />

            {/* Visual Content */}
            <div className="service-group grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <p className="eyebrow">VISUAL CONTENT</p>
                <h2
                  className="font-serif mt-4"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
                >
                  Branded Visuals That Keep You Consistent Online
                </h2>
                <p
                  className="font-sans mt-5"
                  style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 480 }}
                >
                  Professional visuals that make your business look consistent across your website, Facebook, Google profile, and marketing posts — plus short-form content built to stay visible and explain what you do.
                </p>
                <Link to="/contact" className="btn-primary mt-8 inline-block">
                  Plan Your Visual Content
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
                  What Is Included
                </p>
                <ul className="mt-5 flex flex-col" style={{ gap: 12 }}>
                  {visualContentInclusions.map((item, i) => (
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
        </div>
      </section>

      {/* Industries Served */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
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

      {/* Why NLDS */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHY NEW LEVEL DESIGN STUDIO</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            Most local websites look assembled, not directed.
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 560 }}
          >
            Page builders and generic agencies produce sites that technically exist — but feel
            template-like, slow, and forgettable. NLDS builds the full first impression: clear
            offer, stronger visuals, mobile-first layout, local SEO structure, and a contact path
            that makes action obvious.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                label: 'Not a template service',
                desc: 'Every build starts from your business, your services, and your customers — not a pre-built layout with your name swapped in.',
              },
              {
                label: 'Direct, founder-led work',
                desc: 'You work directly with Michael Vail — no handoffs, no junior designers, no agency overhead. One point of contact from strategy to launch.',
              },
              {
                label: 'Built for local business',
                desc: 'NLDS specializes in local service businesses across Port Orange, Daytona Beach, and Volusia County — not SaaS apps, national brands, or mass-market campaigns.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
                <h3
                  className="font-sans font-semibold"
                  style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                >
                  {item.label}
                </h3>
                <p
                  className="font-sans mt-3"
                  style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes a Local Business Website Work */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT MAKES IT WORK</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 600 }}
          >
            What Makes a Local Business Website Work?
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.6, maxWidth: 560 }}
          >
            A website that works for a local business isn't just designed — it's structured around the elements that turn attention into real customer inquiries.
          </p>
          <div ref={whatWorksRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mt-12">
            {[
              {
                title: 'Clear First Impression',
                desc: 'Visitors form an opinion in seconds. A strong headline, clean layout, and immediate clarity about what you offer sets the tone before they scroll or compare competitors.',
              },
              {
                title: 'Strong Visual Hierarchy',
                desc: 'Quality images, clear headlines, contrast, and proper spacing guide visitors naturally from arrival to action. Good hierarchy removes confusion and makes the business feel considered.',
              },
              {
                title: 'Trust Signals',
                desc: 'Real project examples, client outcomes, and verifiable proof of work build credibility faster than any claim. Visitors trust what they can see — portfolio work, specific results, and recognizable proof.',
              },
              {
                title: 'Color and Visual Consistency',
                desc: 'Color affects how a business is perceived before a word is read. Colors that support clarity, professionalism, and brand recognition build trust — inconsistency quietly undermines it.',
              },
              {
                title: 'Mobile-First Layout',
                desc: 'Most local customers in Port Orange, Daytona Beach, and Volusia County search on their phones. A poor mobile experience loses the inquiry before it starts.',
              },
              {
                title: 'Conversion Paths',
                desc: 'A website converts when the next step is obvious — one clear call to action, a frictionless contact path, and quote requests or booking forms that are easy to find on any device.',
              },
              {
                title: 'Speed and Performance',
                desc: 'A fast website feels professional and reduces friction for mobile users. Slow load times increase abandonment and signal to visitors that the business isn\'t well-maintained.',
              },
              {
                title: 'Measurable Actions',
                desc: 'Knowing what\'s working matters. Form submissions, phone clicks, quote requests, Google Business Profile visits, and page engagement show whether a website is actually doing its job.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="works-item flex items-start gap-5"
                style={{ borderBottom: '1px solid var(--silver-grey)', padding: '24px 0' }}
              >
                <span
                  className="font-sans shrink-0"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                    {item.title}
                  </h3>
                  <p className="font-sans mt-2" style={{ fontSize: '0.9375rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages link */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '60px 0' }}>
        <div className="container-nlds flex flex-wrap items-center gap-4">
          <Link to="/packages" className="btn-primary">View Packages &amp; Pricing</Link>
          <Link to="/contact" className="btn-secondary">Start a Conversation</Link>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        heading="Not Sure What You Need?"
        body="Tell us about your business and we will point you toward the right place to start."
        buttonText="Start a Conversation"
      />
    </div>
  );
}

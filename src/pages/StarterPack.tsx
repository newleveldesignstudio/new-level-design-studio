import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/SEO';
import './StarterPack.css';

const benefits = [
  {
    title: 'Look More Professional',
    description:
      'Make your business look credible across Facebook, Google, and social media.',
  },
  {
    title: 'Get Content You Can Use',
    description:
      'Receive practical visuals designed for real online platforms — not random graphics.',
  },
  {
    title: 'Start Without a Big Budget',
    description:
      'A simple entry offer for small businesses that need better visuals without a full agency package.',
  },
];

const includedItems = [
  '1 Facebook cover image',
  '1 Google Business Profile post image',
  '1 campaign flyer ad / digital sell sheet',
  '1 square social media post',
  '1 controlled revision round',
  'Delivered ready to post',
];

const industries = [
  'Contractors',
  'Restaurants',
  'Salons & Barbers',
  'Real Estate Agents',
  'Lawyers',
  'Dentists',
  'Cleaning Companies',
  'Landscapers',
  'Auto Detailers',
  'Local Service Businesses',
];

const whyWorks = [
  {
    num: '01',
    title: 'Clearer first impression',
    description:
      'Customers see a cleaner, more professional version of your business before they call.',
  },
  {
    num: '02',
    title: 'More consistent brand presence',
    description:
      'Your Facebook, Google, and social content start to feel connected instead of random.',
  },
  {
    num: '03',
    title: 'Better ready-to-post content',
    description:
      'You get practical assets formatted for the platforms local customers already check.',
  },
];

const processSteps = [
  {
    num: '1',
    title: 'Send your business info',
    description:
      'Send your logo, business name, services, contact info, colors, and any photos you want used.',
  },
  {
    num: '2',
    title: 'We create your visual pack',
    description:
      'New Level Design Studio designs your Facebook cover, Google Business Profile post, campaign flyer / digital sell sheet, and square social post.',
  },
  {
    num: '3',
    title: 'You post with confidence',
    description:
      'You receive ready-to-post files formatted for Facebook, Google, and social media.',
  },
];

const faqs = [
  {
    q: 'What do I need to send?',
    a: 'Your logo, business name, services, contact info, website or social links, and any photos you want used.',
  },
  {
    q: 'Can you create visuals if I do not have good photos?',
    a: 'Yes. New Level Design Studio can create polished branded layouts and visual concepts based on what your business needs.',
  },
  {
    q: 'Is this a monthly plan?',
    a: 'No. The $129 Starter Pack is a one-time offer. No subscription is required.',
  },
  {
    q: 'How many revisions are included?',
    a: 'One controlled revision round is included to adjust wording, layout, or small design details.',
  },
  {
    q: 'What is a campaign flyer / digital sell sheet?',
    a: 'It is a one-page promotional graphic for one clear offer, service, event, discount, or call-to-action.',
  },
];

export default function StarterPack() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const benefitsRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.7,
    stagger: 0.12,
    start: 'top 80%',
    childSelector: '.benefit-card',
  });

  const includedRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.7,
    stagger: 0.08,
    start: 'top 80%',
    childSelector: '.included-item',
  });

  const industriesRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.06,
    start: 'top 80%',
    childSelector: '.industry-tag',
  });

  const whyRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.7,
    stagger: 0.15,
    start: 'top 80%',
    childSelector: '.why-card',
  });

  const processRef = useScrollReveal<HTMLDivElement>({
    y: 40,
    duration: 0.7,
    stagger: 0.15,
    start: 'top 80%',
    childSelector: '.process-step',
  });

  const faqRef = useScrollReveal<HTMLDivElement>({
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    start: 'top 80%',
    childSelector: '.faq-item',
  });

  // Hero word animation
  useEffect(() => {
    const timer = setTimeout(() => {
      pageRef.current?.querySelectorAll('.word-animate').forEach((el) => {
        const delay = parseInt((el as HTMLElement).dataset.delay || '0');
        setTimeout(() => {
          (el as HTMLElement).style.animation =
            'starter-word-appear 0.7s ease-out forwards';
        }, delay);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);


  // Fade-in observer for sections without useScrollReveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    pageRef.current?.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleFaq = (i: number) => {
    setOpenFaq((prev) => (prev === i ? null : i));
  };

  return (
    <div ref={pageRef} className="starter-pack-page">
      <SEO
        title="$129 Starter Pack for Local Businesses | NLDS"
        description="A focused starter offer for local businesses that need essential brand visuals and online presence assets."
        canonical="https://newlvlstudio.com/starter-pack"
      />
      {/* 1. Hero */}
      <section className="starter-hero">
        <div className="starter-hero-inner">
          <div className="starter-hero-content">
            <p className="starter-eyebrow">
              NEW LEVEL DESIGN STUDIO / STARTER PACK
            </p>
            <h1 className="starter-hero-heading">
              <span className="word-animate" data-delay="0">A</span>{' '}
              <span className="word-animate" data-delay="80">sharper</span>{' '}
              <span className="word-animate" data-delay="160">first</span>{' '}
              <span className="word-animate" data-delay="240">impression</span>{' '}
              <span className="word-animate" data-delay="320">for</span>{' '}
              <span className="word-animate" data-delay="400">$129.</span>
            </h1>
            <p className="starter-hero-sub">
              Get four clean branded assets your business can use right away: a
              Facebook cover, Google Business Profile post, campaign flyer / digital
              sell sheet, and square social post.
            </p>
            <p className="starter-hero-location">
              Built for local businesses in Port Orange, Daytona Beach, Volusia
              County, and Central Florida.
            </p>
            <div className="starter-hero-ctas">
              <Link to="/contact" className="btn-primary">
                Get the $129 Starter Pack
              </Link>
              <a href="#included" className="btn-secondary">
                See What&apos;s Included
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="starter-hero-visual">
            <img
              src="/nlds/images/starter-pack-branded-marketing-assets-local-business-new-level-design-studio.png"
              alt="Four branded Starter Pack assets including a Facebook cover, Google Business Profile post, campaign flyer, and square social media post"
              className="img-muted starter-hero-image"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2. Problem / Benefit */}
      <section className="starter-section starter-section-light">
        <div className="container-nlds">
          <div className="fade-in">
            <h2 className="starter-section-title">
              Your business should look as good as the work you do.
            </h2>
            <p className="starter-section-body" style={{ maxWidth: 640 }}>
              Customers judge your business before they read your reviews, call your
              number, or visit your website. If your content looks outdated or thrown
              together, it creates doubt.
            </p>
          </div>
          <div ref={benefitsRef} className="starter-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card">
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Included / Pricing */}
      <section id="included" className="starter-section starter-section-soft">
        <div className="container-nlds">
          <div className="starter-included-wrap">
            <div className="starter-value-card fade-in">
              <h2 className="starter-section-title">What You Get For $129</h2>
              <p className="starter-section-body" style={{ maxWidth: 480 }}>
                A simple starter pack built to improve your business&apos;s online first
                impression.
              </p>
              <div ref={includedRef} className="starter-included-list">
                {includedItems.map((item, i) => (
                  <div key={i} className="included-item">
                    <span className="included-check" />
                    <span className="included-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="starter-price-panel fade-in">
              <p className="price-label">Business Starter Pack</p>
              <p className="price-amount">$129</p>
              <p className="price-note">One-time offer. No subscription required.</p>
              <Link to="/contact" className="btn-primary">
                Claim This Offer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Who This Is For */}
      <section className="starter-section starter-section-light">
        <div className="container-nlds">
          <div className="fade-in">
            <h2 className="starter-section-title">Who this is for</h2>
            <p className="starter-section-body" style={{ maxWidth: 560 }}>
              If customers find you on Facebook, Google, Instagram, or your website,
              your visuals matter.
            </p>
          </div>
          <div ref={industriesRef} className="starter-industries-grid">
            {industries.map((ind, i) => (
              <div key={i} className="industry-tag">
                <span className="industry-dot" />
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why It Works */}
      <section className="starter-section starter-section-soft">
        <div className="container-nlds">
          <div className="fade-in">
            <h2 className="starter-section-title">Why it works</h2>
            <p className="starter-section-body" style={{ maxWidth: 640 }}>
              Good visuals build trust, explain your offer, and make your business
              feel more legitimate before anyone contacts you.
            </p>
          </div>
          <div ref={whyRef} className="starter-why-grid">
            {whyWorks.map((w, i) => (
              <div key={i} className="why-card">
                <span className="why-num">{w.num}</span>
                <h3 className="why-title">{w.title}</h3>
                <p className="why-desc">{w.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Simple Process */}
      <section className="starter-section starter-section-dark">
        <div className="container-nlds">
          <div className="fade-in">
            <h2
              className="starter-section-title"
              style={{ color: 'var(--white)' }}
            >
              Simple process
            </h2>
          </div>
          <div ref={processRef} className="starter-process-grid">
            {processSteps.map((s, i) => (
              <div key={i} className="process-step">
                <span className="process-num">{s.num}</span>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-desc">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Budget / CTA */}
      <section className="starter-section starter-section-light">
        <div className="container-nlds">
          <div className="fade-in" style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
            <h2 className="starter-section-title">
              Built for small businesses, not big agency budgets.
            </h2>
            <p className="starter-section-body">
              You do not need a full marketing agency to improve how your business
              looks online. You need clear, professional visuals that make customers
              take you seriously.
            </p>
            <Link to="/contact" className="btn-primary mt-8 inline-block">
              Get Started For $129
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="starter-section starter-section-soft">
        <div className="container-nlds" style={{ maxWidth: 800 }}>
          <div className="fade-in">
            <h2 className="starter-section-title">Frequently Asked Questions</h2>
          </div>
          <div ref={faqRef} className="starter-faq">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
                  </button>
                  <div
                    className="faq-answer"
                    style={{
                      maxHeight: isOpen ? 300 : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="starter-section starter-section-final">
        <div className="container-nlds" style={{ maxWidth: 640, textAlign: 'center' }}>
          <div className="fade-in">
            <h2 className="starter-section-title">
              Ready to make your business look more professional?
            </h2>
            <p className="starter-section-body">
              Start with the $129 Business Starter Pack and get clean, branded
              content your business can actually use.
            </p>
            <Link to="/contact" className="btn-primary mt-8 inline-block">
              Get the $129 Starter Pack
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import './Packages.css';

const faqs = [
  {
    q: 'Which website package should I start with?',
    a: 'If your business needs a fast, credible first impression, start with Starter Website ($499). If you need stronger service pages, local SEO structure, and a clearer path from visitor to inquiry, Core Website ($899) is the right fit. Pro Website ($1,499) is for businesses that want a complete, conversion-focused web presence with full service pages, stronger SEO structure, and launch-ready polish.',
  },
  {
    q: 'Can packages be customized?',
    a: 'Yes. Packages can be adjusted based on your business, service area, content needs, and launch goals.',
  },
  {
    q: 'Do all packages include strategy?',
    a: 'Each package includes practical creative direction. Larger packages include more planning, structure, and refinement.',
  },
  {
    q: 'Do you work with businesses outside Port Orange?',
    a: 'Yes. New Level Design Studio works with businesses in Port Orange, Daytona Beach, Volusia County, Central Florida, and select remote clients.',
  },
  {
    q: 'Are prices final?',
    a: 'Listed prices are starting points. Final pricing may vary based on scope, page count, content needs, revisions, and timeline.',
  },
  {
    q: 'What does "SEO" mean in each package?',
    a: 'Website packages include on-page SEO work at different levels. Starter Website ($499) includes basic SEO structure — page titles, meta descriptions, and header tags. Core Website ($899) adds local SEO-friendly structure — location-targeted pages and service area copy. Pro Website ($1,499) includes full SEO-ready structure — schema markup, optimized page hierarchy, and content built to rank locally. None of these are SEO management services — they are one-time structural setups included at launch.',
  },
  {
    q: 'Do you guarantee search engine rankings?',
    a: "No. No website package can guarantee rankings. Search engines determine results based on many factors outside any studio's control. What we can do is build your site correctly — fast, structured, and locally optimized — so it has the best technical foundation for local search.",
  },
];

export default function Packages() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  // Word animation
  useEffect(() => {
    const timer = setTimeout(() => {
      pageRef.current?.querySelectorAll('.word-animate').forEach((el) => {
        const delay = parseInt((el as HTMLElement).dataset.delay || '0');
        setTimeout(() => {
          (el as HTMLElement).style.animation = 'packages-word-appear 0.7s ease-out forwards';
        }, delay);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Fade-in observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 65);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    pageRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // FAQ reveal
  useEffect(() => {
    const el = faqRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.faq-item'),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  // Package card reveal on scroll
  useEffect(() => {
    const panel = document.getElementById('panel-website');
    if (!panel) return;

    const cards = panel.querySelectorAll('.tc');
    if (cards.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, panel);

    return () => ctx.revert();
  }, []);

  const handleFaqClick = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const scrollToPackages = () => {
    packagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="packages-page" ref={pageRef}>
      <SEO
        title="Website Packages for Local Businesses | New Level Design Studio"
        description="Starter, Core, and Pro website packages for local businesses in Port Orange, Daytona Beach, and Volusia County, starting at $499 — with clear scope and Website Care support after launch."
        canonical="https://newlvlstudio.com/packages"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <p className="hero-eyebrow">
            <span className="word-animate" data-delay="0">New</span>{' '}
            <span className="word-animate" data-delay="100">Level</span>{' '}
            <span className="word-animate" data-delay="200">Design</span>{' '}
            <span className="word-animate" data-delay="300">Studio</span>
          </p>

          <h1 className="hero-heading">
            <span className="word-animate" data-delay="300">Websites built for</span>
            <br />
            <em>
              <span className="word-animate" data-delay="500">local businesses</span>
            </em>
            <br />
            <span className="word-animate" data-delay="650">ready to look established online.</span>
          </h1>

          <p className="hero-sub">
            Premium websites for businesses in Port Orange, Daytona Beach, Volusia County, and Central Florida
            — built to convert visitors into real customer inquiries.
          </p>

          <p className="hero-local">Port Orange • Daytona Beach • Volusia County • Central Florida</p>

          <div className="hero-ctas">
            <Link to="/contact" className="hero-cta-primary">
              Start With a Free Website Review
            </Link>
            <button onClick={scrollToPackages} className="hero-cta-secondary">
              View Packages
            </button>
          </div>
        </div>
      </section>

      {/* Package Overview */}
      <section className="pkg-overview">
        <div className="pkg-overview-inner fade-in">
          <h2 className="pkg-overview-heading">
            Packages built for businesses ready to make a stronger first impression online.
          </h2>
          <p className="pkg-overview-sub">
            Websites, brand-aligned design, and launch support — built for local businesses in Port Orange, Daytona Beach, and Volusia County.
          </p>
        </div>
      </section>

      {/* Package Overview / Guide */}
      <section className="bg fade-in">
        <h2 className="bg-heading">Which website package is right for your business?</h2>
        <p className="bg-intro">
          Every NLDS website is custom-built and mobile-first. Choose the level that fits where your
          business is now — and where it needs to go.
        </p>

        <div className="gg">
          {[
            { gn: 'Need a professional website fast', ga: '→ Starter Website ($499)' },
            { gn: 'Need stronger service pages and local SEO structure', ga: '→ Core Website ($899)' },
            { gn: 'Need a full, conversion-focused web presence', ga: '→ Pro Website ($1,499)' },
            { gn: 'Need ongoing support after launch', ga: '→ Website Care ($99/mo)' },
            { gn: 'Need an extra page or section', ga: '→ Extra Page or Section add-on' },
            { gn: 'Need Google Business Profile setup', ga: '→ GBP Alignment add-on' },
            { gn: 'Need help writing your website copy', ga: '→ Website Copy Support add-on' },
            { gn: 'Need booking systems, portals, or custom features', ga: '→ Advanced Functionality (custom quote)' },
          ].map((item, i) => (
            <div className="gc" key={i}>
              <div>
                <div className="gn">{item.gn}</div>
                <div className="ga">{item.ga}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Package Cards */}
      <div ref={packagesRef} id="panel-website" className="pnl active">
        <div className="si">
          <h2>Website Packages</h2>
          <p>
            Your website is the foundation of your online presence. Choose the level that fits where
            your business is now — and where it needs to go next.
          </p>
        </div>

        <p className="sl">Per-Project Packages</p>

        <div className="tg">
          <div className="tc">
            <div className="ti">01</div>
            <div className="tn">Starter Website</div>
            <p className="tbf">A focused one-page website for a small local business that needs a stronger online presence without overbuilding. Best for new businesses, solo operators, and small service providers replacing a weak DIY page.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>499
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li><span className="ck" />One-page website</li>
              <li><span className="ck" />Essential homepage sections</li>
              <li><span className="ck" />Mobile-responsive layout</li>
              <li><span className="ck" />Contact form or direct inquiry CTA</li>
              <li><span className="ck" />Basic on-page SEO setup</li>
              <li><span className="ck" />Basic local-business trust structure</li>
              <li><span className="ck" />Launch support</li>
              <li><span className="ck" />First 90 Days foundation check-ins</li>
            </ul>
            <p className="tcx">Not for large multi-page sites, or advanced booking, portals, memberships, and complex functionality. Copy and imagery may require your input.</p>
            <Link to="/contact" className="cc outline">
              Start With Starter
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Most Popular</div>
            <div className="ti">02</div>
            <div className="tn">Core Website</div>
            <p className="tbf">The best fit for most local businesses that need a more complete website with clearer service structure and stronger trust. Best for established businesses, contractors, restaurants, and service businesses that need more than a basic one-page site.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>899
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li><span className="ck" />Multi-section or small multi-page structure</li>
              <li><span className="ck" />Homepage plus key service/content sections</li>
              <li><span className="ck" />Stronger local SEO structure</li>
              <li><span className="ck" />Refined brand-aligned design</li>
              <li><span className="ck" />Contact and inquiry flow</li>
              <li><span className="ck" />Service clarity and trust-building sections</li>
              <li><span className="ck" />Launch support</li>
              <li><span className="ck" />First 90 Days visibility and quality review</li>
            </ul>
            <p className="tcx">Our default recommendation for most local businesses. Complex integrations, large content libraries, and custom systems require a custom quote.</p>
            <Link to="/contact" className="cc primary">
              Build a Core Site
            </Link>
          </div>

          <div className="tc">
            <div className="ti">03</div>
            <div className="tn">Pro Website</div>
            <p className="tbf">A stronger custom website system for businesses that need more depth, more trust, and a more premium presentation. Best for businesses with multiple services, higher-ticket offers, or an outdated site preparing for more serious marketing.</p>
            <div className="pb">
              <div className="pd" style={{ fontSize: 'clamp(48px,6vw,72px)' }}>
                <span className="psy">$</span>1,499
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li><span className="ck" />Larger multi-page structure</li>
              <li><span className="ck" />Expanded service/content architecture</li>
              <li><span className="ck" />Stronger conversion strategy</li>
              <li><span className="ck" />More advanced visual direction</li>
              <li><span className="ck" />Case-study, proof, or portfolio-style sections where appropriate</li>
              <li><span className="ck" />Stronger local SEO structure</li>
              <li><span className="ck" />Launch support</li>
              <li><span className="ck" />First 90 Days conversion and quality review</li>
            </ul>
            <p className="tcx">Advanced functionality, ecommerce, portals, dashboards, paid ads, or complex automation require a custom quote.</p>
            <Link to="/contact" className="cc outline">
              Build a Pro Site
            </Link>
          </div>
        </div>

        <div className="sales-line fade-in">
          <strong>Starter</strong> gets you online. <strong>Core</strong> strengthens credibility.{' '}
          <strong>Pro</strong> gives your business a sharper web presence built around trust, clarity,
          and action.
        </div>
      </div>

      {/* Which Package Fits — Decision Guide */}
      <section className="decision-section">
        <div className="decision-inner">
          <p className="sl">Decision guide</p>
          <h2 className="decision-heading">Which package fits your business?</h2>
          <p className="decision-sub">
            The right choice depends on how much your website needs to explain, prove, and support
            before someone reaches out.
          </p>

          <div className="decision-grid fade-in">
            {[
              {
                name: 'Starter Website',
                eyebrow: 'Choose Starter if',
                copy: 'You need a clean one-page website that makes your business look credible and gives people a simple way to contact you.',
                bestFor: 'New businesses, solo operators, simple service businesses, or replacing a weak DIY page.',
                note: 'Best when the goal is a stronger basic presence, not a large website system.',
                common: false,
              },
              {
                name: 'Core Website',
                eyebrow: 'Choose Core if',
                copy: 'You need more structure, clearer services, stronger trust, and a website that feels complete.',
                bestFor: 'Most local businesses, contractors, restaurants, and service providers.',
                note: 'Best when customers need to understand what you offer before they reach out.',
                common: true,
              },
              {
                name: 'Pro Website',
                eyebrow: 'Choose Pro if',
                copy: 'Your business needs deeper credibility, more pages, more proof, and a stronger path from visitor to inquiry.',
                bestFor: 'Higher-ticket services, multi-service businesses, serious redesigns, and businesses preparing for stronger marketing.',
                note: 'Best when the website needs to do more trust-building before the first call.',
                common: false,
              },
            ].map((pkg) => (
              <div className={`decision-card${pkg.common ? ' common' : ''}`} key={pkg.name}>
                {pkg.common && <div className="decision-tag">Most common fit</div>}
                <p className="decision-eyebrow">{pkg.eyebrow}</p>
                <h3 className="decision-name">{pkg.name}</h3>
                <p className="decision-copy">{pkg.copy}</p>
                <div className="decision-divider" />
                <p className="decision-bestfor"><span>Best for</span>{pkg.bestFor}</p>
                <p className="decision-note">{pkg.note}</p>
              </div>
            ))}
          </div>

          <div className="decision-guidance fade-in">
            <div>
              <h3 className="decision-guidance-heading">Still unsure?</h3>
              <p className="decision-guidance-copy">
                Start with a free website review and I'll recommend the package that actually
                fits — even if that means starting smaller.
              </p>
            </div>
            <Link to="/contact" className="decision-guidance-cta">
              Start With a Free Website Review
            </Link>
          </div>
        </div>
      </section>

      {/* What Every NLDS Website Includes */}
      <section className="includes-section">
        <div className="includes-inner">
          <p className="sl">Standard on every build</p>
          <h2 className="includes-heading">What Every NLDS Website Includes</h2>
          <p className="includes-sub">
            Regardless of which package you choose, every website we build is held to the same quality standard.
          </p>
          <div className="includes-grid fade-in">
            {[
              { label: 'Custom, brand-aligned design', desc: 'Every page built around your brand — not a template with your name swapped in.' },
              { label: 'Mobile-responsive layout', desc: 'Structured to look and work correctly on every screen size from phone to desktop.' },
              { label: 'Clear service and navigation structure', desc: 'Visitors know what you offer and how to contact you within seconds of arriving.' },
              { label: 'Contact forms and tap-to-call paths', desc: 'Working inquiry forms and phone links so customers can reach you on any device.' },
              { label: 'Basic metadata and on-page SEO', desc: 'Page titles, meta descriptions, and header tags set correctly for every page at launch.' },
              { label: 'Sitemap configuration', desc: 'XML sitemap generated and configured so search engines can crawl and index your pages.' },
              { label: 'Search Console and Bing verification', desc: 'Google Search Console and Bing Webmaster Tools connected and verified at launch.' },
              { label: 'Mobile and desktop quality assurance', desc: 'Full QA pass across multiple devices and browsers before your site goes live.' },
              { label: 'Launch support', desc: 'We stay with you through go-live to make sure everything deploys cleanly and works correctly.' },
            ].map((item, i) => (
              <div className="includes-item" key={i}>
                <span className="ck" style={{ marginTop: 3 }} />
                <div>
                  <div className="includes-label">{item.label}</div>
                  <div className="includes-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The First 90 Days */}
      <section className="ninety-section">
        <div className="ninety-inner">
          <p className="sl">Post-launch support</p>
          <h2 className="ninety-heading">First 90 Days After Launch</h2>
          <p className="ninety-sub">
            The launch is not the finish line. Every NLDS website includes structured post-launch
            checks so your site gets reviewed for visibility, functionality, and trust after it goes live.
          </p>
          <div className="phase-grid">
            {[
              {
                num: '01',
                title: 'Launch setup',
                items: [
                  'Search Console verification',
                  'Bing Webmaster Tools verification',
                  'Sitemap submission and check',
                  'Form testing',
                  'Basic analytics review, if analytics are connected',
                ],
              },
              {
                num: '02',
                title: '30-day check',
                items: [
                  'Form and CTA check',
                  'Mobile usability review',
                  'Basic visibility review',
                  'Quick content or trust recommendations',
                ],
              },
              {
                num: '03',
                title: '60-day check',
                items: [
                  'Search appearance review',
                  'Google Business Profile alignment check',
                  'Local SEO structure review',
                  'Review strategy recommendations',
                ],
              },
              {
                num: '04',
                title: '90-day check',
                items: [
                  'Conversion path review',
                  'Content recommendations',
                  'Trust/proof recommendations',
                  'Next-step plan',
                ],
              },
            ].map((phase) => (
              <div className="phase-card fade-in" key={phase.num}>
                <div className="ti">{phase.num}</div>
                <div className="phase-title">{phase.title}</div>
                <div className="crl" />
                <ul className="fl">
                  {phase.items.map((item) => (
                    <li key={item}><span className="ck" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="scope-note fade-in">
            First 90 Days support includes review, recommendations, and minor quality checks. It does
            not include unlimited redesigns, new pages, ongoing SEO campaigns, paid ads, or major
            strategy pivots unless separately quoted.
          </p>
        </div>
      </section>

      {/* Website Care */}
      <section className="website-care-section">
        <div className="website-care-inner">
          <p className="sl">Website Care</p>
          <h2 className="care-primary-heading">
            ONGOING WEBSITE QUALITY,<br />VISIBILITY, AND TRUST MANAGEMENT
          </h2>
          <div className="rc fade-in" style={{ marginTop: 40 }}>
            <div>
              <p className="re">Website Care</p>
              <h3 className="rt">Keep your website sharp after launch.</h3>
              <p className="rd">
                Most websites start strong and quietly fall behind — outdated content, broken links, slow load times,
                and a presence that no longer reflects the business. Website Care keeps yours current, polished,
                and working for you every month.
              </p>

              <div className="rf">
                <span className="rft"><span className="ck-s" />Website quality checks</span>
                <span className="rft"><span className="ck-s" />Basic content updates</span>
                <span className="rft"><span className="ck-s" />Form and functionality checks</span>
                <span className="rft"><span className="ck-s" />Mobile review</span>
                <span className="rft"><span className="ck-s" />Sitemap and search visibility checks</span>
                <span className="rft"><span className="ck-s" />Review and trust recommendations</span>
                <span className="rft"><span className="ck-s" />Small improvements over time</span>
              </div>

              <p className="scope-note scope-note-dark">
                Website Care is not unlimited redesign work, full SEO management, paid advertising, custom
                development, or emergency support unless separately quoted.
              </p>

              <Link to="/contact" className="rct">
                Ask About Website Care
              </Link>
            </div>

            <div className="retainer-pb">
              <div className="rpr">
                <span className="retainer-psy">$</span>99
              </div>
              <p className="rpd">per month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Website Add-ons */}
      <section className="addons-section">
        <div className="addons-section-inner">
          <p className="sl">Expand your website</p>
          <h2 className="addons-section-heading">Website Add-ons</h2>
          <p className="addons-section-sub">
            Bolt-on enhancements available with any website package.
          </p>
          <div className="addons-row fade-in">
            <div className="bar-grid cols-3">
              {[
                { label: 'Extra Page or Section', detail: 'An additional page or section for a specific service or location', price: 'Custom Quote' },
                { label: 'Website Copy Support', detail: 'Professional copywriting support for your website pages', price: 'Custom Quote' },
                { label: 'Brand Direction for a Website Project', detail: 'Visual direction and brand-aligned styling for your site', price: 'Custom Quote' },
                { label: 'Local SEO Structure Upgrade', detail: 'Deeper local SEO structure beyond what your package includes', price: 'Custom Quote' },
                { label: 'Google Business Profile Alignment', detail: 'GBP setup, optimization, and alignment with your website', price: 'Custom Quote' },
                { label: 'Advanced Functionality', detail: 'Booking systems, portals, calculators, custom integrations', price: 'Custom Quote' },
              ].map((item, i) => (
                <div className="bar-item" key={i}>
                  <div>
                    <div className="bar-label">{item.label}</div>
                    <div className="bar-detail">{item.detail}</div>
                  </div>
                  <div className="bar-price-sm">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Need to Provide */}
      <section className="provide-section">
        <div className="provide-inner">
          <p className="sl">Getting started</p>
          <h2 className="provide-heading">What You'll Need to Provide</h2>
          <ul className="tl provide-list fade-in">
            <li><span className="ck" />Business name and contact details</li>
            <li><span className="ck" />Services or offers</li>
            <li><span className="ck" />Service area</li>
            <li><span className="ck" />Existing logo or brand assets, if available</li>
            <li><span className="ck" />Photos, examples, or references, if available</li>
            <li><span className="ck" />Website login or domain access, if this is a redesign</li>
            <li><span className="ck" />Any must-have content or legal requirements</li>
          </ul>
          <p className="provide-reassurance">
            If you don't have everything ready, NLDS can help organize the essentials before the build starts.
          </p>
        </div>
      </section>

      {/* What Requires a Custom Quote */}
      <section className="quote-section">
        <div className="quote-inner">
          <p className="sl">Scope boundary</p>
          <h2 className="quote-heading">What Requires a Custom Quote</h2>
          <p className="quote-sub">
            Starter, Core, and Pro cover complete, professional websites — not unlimited scope. These are quoted separately:
          </p>
          <div className="quote-grid fade-in">
            {[
              'Ecommerce',
              'Booking systems',
              'Membership portals',
              'Client dashboards',
              'Large content libraries',
              'Advanced animation systems',
              'Custom calculators or tools',
              'Paid ads setup',
              'Full SEO campaigns',
              'Ongoing content production',
              'Complex automation',
            ].map((item) => (
              <div className="quote-item" key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for real business use */}
      <section className="pbnd fade-in">
        <div className="pbi">
          <div>
            <h2 className="ph">
              Built for real
              <br />
              business use.
            </h2>
            <p className="pc">
              Every website is designed to help your business look more credible, communicate clearly, and
              create a better first impression online. The goal is not just to make something look good — it
              is to make your business easier to trust, understand, and contact.
            </p>
          </div>

          <div>
            <h3 className="th">Why businesses choose New Level Design Studio</h3>
            <ul className="tl">
              <li>
                <span className="ck" />
                Professional websites built without overcomplicating the process
              </li>
              <li>
                <span className="ck" />
                Built for local businesses, service providers, restaurants, contractors, salons, real
                estate, fitness, med spas, and startups
              </li>
              <li>
                <span className="ck" />
                Mobile-first design, fast performance, and clean local SEO structure
              </li>
              <li>
                <span className="ck" />
                Clear creative direction with practical business use
              </li>
              <li>
                <span className="ck" />
                Designed to improve trust, clarity, and first impressions
              </li>
            </ul>
            <Link to="/contact" className="pct">
              Help Me Choose a Package
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-band" ref={faqRef}>
        <h2 className="faq-heading">Questions before choosing a package?</h2>

        {faqs.map((faq, i) => (
          <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
            <button
              className="faq-question"
              onClick={() => handleFaqClick(i)}
              aria-expanded={openFaq === i}
            >
              {faq.q}
              <span className="fi" />
            </button>
            <div className="fan">
              <div className="fai">{faq.a}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Final CTA */}
      <section className="care-band">
        <div className="care-band-inner">
          <div className="care-header">
            <h2 className="care-heading">
              Ready to raise<br />your standard?
            </h2>
            <p className="care-sub">
              Tell us about your business and we'll point you toward the right package to start with —
              no commitment required.
            </p>
          </div>

          <div className="care-list">
            {[
              {
                num: '01',
                title: 'Free Website Review',
                desc: "We review your current site and tell you what it's communicating — and what it would take to strengthen it.",
              },
              {
                num: '02',
                title: 'Package Match',
                desc: 'We help you identify the right starting point based on your business, goals, and budget.',
              },
              {
                num: '03',
                title: 'Clear Scope',
                desc: 'No surprises. You get an exact scope of work and investment before anything begins.',
              },
              {
                num: '04',
                title: 'Launch-Ready',
                desc: 'We build it, test it, and hand you a website your business can actually be proud of.',
              },
            ].map((item, i) => (
              <div className="care-item fade-in" key={i}>
                <div className="care-num">{item.num}</div>
                <div>
                  <h3 className="care-title">{item.title}</h3>
                  <p className="care-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48 }}>
            <Link to="/contact" className="bottom-cta-link">
              Start With a Free Website Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

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
        description="Website design packages for local businesses in Port Orange, Daytona Beach, and Volusia County. Starter, Core, and Pro builds starting at $499."
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
              Get a Free Website Review
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
            { gn: 'Need an extra service or location page', ga: '→ Additional Service/Location Page' },
            { gn: 'Need Google Business Profile setup', ga: '→ GBP Optimization add-on' },
            { gn: 'Need help writing your website copy', ga: '→ Full Website Copywriting add-on' },
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
            <p className="tbf">Best for new businesses, solo service providers, or simple local offers that need a credible first impression fast.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>499
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li><span className="ck" />1-page premium website</li>
              <li><span className="ck" />Mobile-responsive layout</li>
              <li><span className="ck" />Brand-aligned design</li>
              <li><span className="ck" />Essential service sections</li>
              <li><span className="ck" />Contact section</li>
              <li><span className="ck" />Basic SEO structure</li>
            </ul>
            <Link to="/contact" className="cc outline">
              Start with Starter
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Most Popular</div>
            <div className="ti">02</div>
            <div className="tn">Core Website</div>
            <p className="tbf">Best for established local businesses that need stronger service pages, local SEO structure, and a clearer path from visitor to inquiry.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>899
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li><span className="ck" />Multi-section website</li>
              <li><span className="ck" />Homepage plus key service/content sections</li>
              <li><span className="ck" />Refined visual direction</li>
              <li><span className="ck" />Mobile-responsive design</li>
              <li><span className="ck" />Local SEO-friendly structure</li>
              <li><span className="ck" />Contact-focused conversion flow</li>
            </ul>
            <Link to="/contact" className="cc primary">
              Build a Core Site
            </Link>
          </div>

          <div className="tc">
            <div className="ti">03</div>
            <div className="tn">Pro Website</div>
            <p className="tbf">Best for businesses wanting a complete web presence — full service pages, local SEO structure, conversion architecture, and launch-ready polish.</p>
            <div className="pb">
              <div className="pd" style={{ fontSize: 'clamp(48px,6vw,72px)' }}>
                <span className="psy">$</span>1,499
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li><span className="ck" />Larger multi-page website structure</li>
              <li><span className="ck" />Premium editorial layout system</li>
              <li><span className="ck" />Stronger conversion strategy</li>
              <li><span className="ck" />Service area positioning</li>
              <li><span className="ck" />SEO-ready page structure</li>
              <li><span className="ck" />Launch-ready polish</li>
            </ul>
            <Link to="/contact" className="cc outline">
              Go Pro
            </Link>
          </div>
        </div>

        <div className="sales-line fade-in">
          <strong>Starter</strong> gets you online. <strong>Core</strong> strengthens credibility.{' '}
          <strong>Pro</strong> gives your business a sharper web presence built around trust, clarity,
          and action.
        </div>
      </div>

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
          <h2 className="ninety-heading">The First 90 Days</h2>
          <p className="ninety-sub">
            Every NLDS website includes structured post-launch support. The level scales with your package
            so you're not left on your own after launch day.
          </p>
          <div className="ninety-grid">
            <div className="tc fade-in">
              <div className="ti">01</div>
              <div className="tn">Starter Website</div>
              <div className="ninety-duration">Essential 90-Day Support</div>
              <div className="crl" />
              <ul className="fl">
                <li><span className="ck" />Google Search Console verification</li>
                <li><span className="ck" />Bing Webmaster Tools verification</li>
                <li><span className="ck" />Sitemap monitoring</li>
                <li><span className="ck" />Contact form testing</li>
                <li><span className="ck" />Mobile quality assurance</li>
              </ul>
            </div>

            <div className="tc featured fade-in">
              <div className="ti">02</div>
              <div className="tn">Core Website</div>
              <div className="ninety-duration" style={{ color: 'var(--blue-dolphin)' }}>Expanded 90-Day Support</div>
              <div className="crl" />
              <ul className="fl">
                <li><span className="ck" />Everything in Starter, plus:</li>
                <li><span className="ck" />Analytics review</li>
                <li><span className="ck" />Google Business Profile alignment</li>
                <li><span className="ck" />Content recommendations</li>
                <li><span className="ck" />Conversion-path review</li>
              </ul>
            </div>

            <div className="tc fade-in">
              <div className="ti">03</div>
              <div className="tn">Pro Website</div>
              <div className="ninety-duration">Complete 90-Day Support</div>
              <div className="crl" />
              <ul className="fl">
                <li><span className="ck" />Everything in Core, plus:</li>
                <li><span className="ck" />Review strategy</li>
                <li><span className="ck" />Deeper conversion review</li>
                <li><span className="ck" />Service-page recommendations</li>
                <li><span className="ck" />Post-launch visibility review</li>
              </ul>
            </div>
          </div>
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
                <span className="rft"><span className="ck-s" />Monthly content updates and text edits</span>
                <span className="rft"><span className="ck-s" />Image swaps and media updates</span>
                <span className="rft"><span className="ck-s" />Broken link checks and fixes</span>
                <span className="rft"><span className="ck-s" />Monthly performance review</span>
                <span className="rft"><span className="ck-s" />Google Business Profile update assistance</span>
                <span className="rft"><span className="ck-s" />Priority email support</span>
                <span className="rft"><span className="ck-s" />Peace-of-mind site upkeep</span>
              </div>

              <Link to="/contact" className="rct">
                Add Website Care
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
            <div className="bar-grid cols-4">
              {[
                { label: 'Additional Service or Location Page', detail: 'Extra page targeting a specific service or location', price: 'Custom Quote' },
                { label: 'Google Business Profile Optimization', detail: 'GBP setup, optimization, and alignment with your website', price: 'Custom Quote' },
                { label: 'Full Website Copywriting', detail: 'Professional copy written for every page on your site', price: 'Custom Quote' },
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
              Get a Free Website Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

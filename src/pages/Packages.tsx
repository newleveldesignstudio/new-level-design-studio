import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Packages.css';

const tabs = [
  { id: 'panel-website', label: 'Website', num: '01' },
  { id: 'panel-images', label: 'Visuals', num: '02' },
  { id: 'panel-video', label: 'Video', num: '03' },
  { id: 'panel-branding', label: 'Branding', num: '04' },
];

const faqs = [
  {
    q: 'Which package should I start with?',
    a: 'If your business needs a stronger first impression online, start with a website package. If your website is already solid, visuals, video, or brand identity packages can help strengthen your content and promotion.',
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
];

export default function Packages() {
  const [activeTab, setActiveTab] = useState('panel-website');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pageRef = useRef<HTMLDivElement>(null);

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

  // Pill positioning
  const movePill = useCallback((index: number) => {
    const track = trackRef.current;
    const btn = tabRefs.current[index];
    if (!track || !btn) return;
    const trackRect = track.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const x = btnRect.left - trackRect.left;
    const w = btnRect.width;
    track.style.setProperty('--pill-x', `${x + 4}px`);
    track.style.setProperty('--pill-w', `${w - 8}px`);
  }, []);

  useEffect(() => {
    const activeIndex = tabs.findIndex((t) => t.id === activeTab);
    requestAnimationFrame(() => movePill(activeIndex));
  }, [activeTab, movePill]);

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
  }, [activeTab]);

  // Resize handler for pill
  useEffect(() => {
    const handleResize = () => {
      const activeIndex = tabs.findIndex((t) => t.id === activeTab);
      movePill(activeIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, movePill]);

  const handleTabClick = (index: number) => {
    setActiveTab(tabs[index].id);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % tabs.length;
      setActiveTab(tabs[next].id);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prev].id);
      tabRefs.current[prev]?.focus();
    }
  };

  const handleFaqClick = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const scrollToTabs = () => {
    setActiveTab('panel-website');
    const el = document.getElementById('panel-website');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="packages-page" ref={pageRef}>
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
            <span className="word-animate" data-delay="300">Packages built for</span>
            <br />
            <em>
              <span className="word-animate" data-delay="500">local businesses</span>
            </em>
            <br />
            <span className="word-animate" data-delay="650">ready to look bigger online.</span>
          </h1>

          <p className="hero-sub">
            Premium websites, branding, visuals, and short-form content for businesses in Port Orange,
            Daytona Beach, Volusia County, and Central Florida.
          </p>

          <p className="hero-local">Port Orange • Daytona Beach • Volusia County • Central Florida</p>

          <div className="hero-ctas">
            <Link to="/contact" className="hero-cta-primary">
              Start a Project
            </Link>
            <button onClick={scrollToTabs} className="hero-cta-secondary">
              View Packages
            </button>
          </div>
        </div>
      </section>

      {/* Tab Nav */}
      <nav className="tab-nav">
        <div className="tab-nav-inner">
          <div className="tab-pill-track" ref={trackRef}>
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabClick(i)}
                onKeyDown={(e) => handleTabKeyDown(e, i)}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <span className="tab-num">{tab.num}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Guide */}
      <section className="bg fade-in">
        <h2 className="bg-heading">Which package should you choose?</h2>
        <p className="bg-intro">
          Not every business needs the same creative level. Use this guide to find the right starting
          point.
        </p>

        <div className="gg">
          {[
            { gn: 'Need a professional website fast', ga: '→ Starter Website' },
            { gn: 'Need a stronger site that builds trust', ga: '→ Core Website' },
            { gn: 'Need a premium conversion-focused presence', ga: '→ Pro Website' },
            { gn: 'Need better branded visuals', ga: '→ Starter Visual or Core Visual' },
            { gn: 'Need launch or promotion assets', ga: '→ Pro Campaign' },
            { gn: 'Need short-form content', ga: '→ Starter Video or Professional Video' },
            { gn: 'Need a full brand foundation', ga: '→ Brand Identity or Brand Launch' },
            { gn: 'Need ongoing support', ga: '→ Website Care or Monthly Content' },
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

      {/* Panel: Website */}
      <div className={`pnl ${activeTab === 'panel-website' ? 'active' : ''}`} id="panel-website">
        <div className="si">
          <h2>Website Packages</h2>
          <p>
            Your website is the foundation of your online presence. Choose the level that fits where
            your business is now — and where it needs to go next.
          </p>
        </div>

        <p className="sl">Per-Project Packages</p>

        <div className="tg fade-in">
          <div className="tc">
            <div className="ti">01</div>
            <div className="tn">Starter Website</div>
            <p className="tbf">Best for new businesses or a simple online presence.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>499
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />1-page premium website
              </li>
              <li>
                <span className="ck" />Mobile-responsive layout
              </li>
              <li>
                <span className="ck" />Brand-aligned design
              </li>
              <li>
                <span className="ck" />Essential service sections
              </li>
              <li>
                <span className="ck" />Contact section
              </li>
              <li>
                <span className="ck" />Basic SEO structure
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Start with Starter
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Most Popular</div>
            <div className="ti">02</div>
            <div className="tn">Core Website</div>
            <p className="tbf">Best for local businesses that need a stronger online presence.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>899
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Multi-section website
              </li>
              <li>
                <span className="ck" />Homepage plus key service/content sections
              </li>
              <li>
                <span className="ck" />Refined visual direction
              </li>
              <li>
                <span className="ck" />Mobile-responsive design
              </li>
              <li>
                <span className="ck" />Local SEO-friendly structure
              </li>
              <li>
                <span className="ck" />Contact-focused conversion flow
              </li>
            </ul>
            <Link to="/contact" className="cc primary">
              Build a Core Site
            </Link>
          </div>

          <div className="tc">
            <div className="ti">03</div>
            <div className="tn">Pro Website</div>
            <p className="tbf">Best for businesses ready for a complete premium web presence.</p>
            <div className="pb">
              <div className="pd" style={{ fontSize: 'clamp(48px,6vw,72px)' }}>
                <span className="psy">$</span>1,499
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Larger multi-page website structure
              </li>
              <li>
                <span className="ck" />Premium editorial layout system
              </li>
              <li>
                <span className="ck" />Stronger conversion strategy
              </li>
              <li>
                <span className="ck" />Service area positioning
              </li>
              <li>
                <span className="ck" />SEO-ready page structure
              </li>
              <li>
                <span className="ck" />Launch-ready polish
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Go Pro
            </Link>
          </div>
        </div>

        <div className="sales-line fade-in">
          <strong>Starter</strong> gets you online. <strong>Core</strong> strengthens credibility.{" "}
          <strong>Pro</strong> gives your business a sharper web presence built around trust, clarity,
          and action.
        </div>

        <p className="sl" style={{ marginTop: 48 }}>
          Website Care
        </p>

        <div className="rc fade-in">
          <div>
            <p className="re">Ongoing Support</p>
            <h3 className="rt">Website Maintenance</h3>
            <p className="rd">
              Ongoing support for small updates, checks, and basic site care after launch.
            </p>

            <div className="rf">
              <span className="rft">
                <span className="ck-s" />Small monthly content edits
              </span>
              <span className="rft">
                <span className="ck-s" />Link and layout checks
              </span>
              <span className="rft">
                <span className="ck-s" />Basic performance review
              </span>
              <span className="rft">
                <span className="ck-s" />Priority support
              </span>
              <span className="rft">
                <span className="ck-s" />Peace-of-mind upkeep
              </span>
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

        <p className="sl">Website Add-ons</p>

        <div className="addons-row fade-in">
          <div className="bar-grid cols-4" style={{ marginBottom: 24 }}>
            {[
              { label: 'Extra Page', detail: 'Additional website page', price: '$150–$250' },
              { label: 'Landing Page', detail: 'Standalone conversion page', price: '$299–$499' },
              { label: 'Basic SEO Setup', detail: 'Metadata and page structure', price: '$199+' },
              { label: 'Google Business Profile Cleanup', detail: 'Profile polish and updates', price: '$149+' },
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

          <div className="bar-grid cols-4">
            {[
              { label: 'Copywriting Upgrade', detail: 'Sharper headlines and page copy', price: '$250+' },
              { label: 'Image Package', detail: 'Custom branded visuals', price: 'from $249' },
              { label: 'Video Package', detail: 'Short-form content support', price: 'from $349' },
              { label: 'Monthly Content', detail: 'Ongoing content support', price: 'Custom' },
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

      {/* Panel: Visuals */}
      <div className={`pnl ${activeTab === 'panel-images' ? 'active' : ''}`} id="panel-images">
        <div className="si">
          <h2>Visual Packages</h2>
          <p>
            For businesses that need stronger social media visuals, service graphics, launch content,
            or branded promotional assets.
          </p>
        </div>

        <p className="sl">Per-Project Packages</p>

        <div className="tg fade-in">
          <div className="tc">
            <div className="ti">01</div>
            <div className="tn">Starter Visual</div>
            <p className="tbf">A clean starter set for businesses that need stronger visuals fast.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>129
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Starter visual asset set
              </li>
              <li>
                <span className="ck" />Branded graphics
              </li>
              <li>
                <span className="ck" />Social-ready sizing
              </li>
              <li>
                <span className="ck" />Clean NLDS-aligned polish
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Start Visuals
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Most Popular</div>
            <div className="ti">02</div>
            <div className="tn">Core Visual</div>
            <p className="tbf">A stronger visual set for businesses that need more variety and polish.</p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>249
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Expanded visual asset set
              </li>
              <li>
                <span className="ck" />Multiple content placements
              </li>
              <li>
                <span className="ck" />Stronger layout variation
              </li>
              <li>
                <span className="ck" />Campaign-ready styling
              </li>
            </ul>
            <Link to="/contact" className="cc primary">
              Choose Core Visual
            </Link>
          </div>

          <div className="tc">
            <div className="ti">03</div>
            <div className="tn">Pro Campaign</div>
            <p className="tbf">
              For launches, offers, promotions, and businesses that need a complete campaign look.
            </p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>449
              </div>
              <div className="pnt">Starting at · per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Full promotional visual package
              </li>
              <li>
                <span className="ck" />Multiple platform-ready assets
              </li>
              <li>
                <span className="ck" />Stronger campaign direction
              </li>
              <li>
                <span className="ck" />Premium launch presentation
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Build a Campaign
            </Link>
          </div>
        </div>

        <p className="sl">Monthly Content Retainer</p>

        <div className="rc fade-in">
          <div>
            <p className="re">Content Partner</p>
            <h3 className="rt">Monthly Content Retainer</h3>
            <p className="rd">
              For businesses that want consistent branded visuals and content support each month.
            </p>

            <div className="rf">
              <span className="rft">
                <span className="ck-s" />Monthly content planning
              </span>
              <span className="rft">
                <span className="ck-s" />Branded visual assets
              </span>
              <span className="rft">
                <span className="ck-s" />Social media-ready creative
              </span>
              <span className="rft">
                <span className="ck-s" />Priority creative support
              </span>
            </div>

            <Link to="/contact" className="rct">
              Ask About Monthly Content
            </Link>
          </div>

          <div className="retainer-pb">
            <div className="rpr">
              <span className="retainer-psy">$</span>399
            </div>
            <p className="rpd">per month</p>
          </div>
        </div>
      </div>

      {/* Panel: Video */}
      <div className={`pnl ${activeTab === 'panel-video' ? 'active' : ''}`} id="panel-video">
        <div className="si">
          <h2>Short-Form Video Packages</h2>
          <p>
            Video packages for businesses that need polished vertical content for social media,
            websites, and ads.
          </p>
        </div>

        <p className="sl">Main Packages</p>

        <div className="tg fade-in">
          <div className="tc">
            <div className="ti">01</div>
            <div className="tn">Starter Video</div>
            <p className="tbf">
              A focused short-form video for one service, offer, product, or brand moment.
            </p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>199
              </div>
              <div className="pnt">Per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Short-form video concept
              </li>
              <li>
                <span className="ck" />Edited vertical video
              </li>
              <li>
                <span className="ck" />Social-ready format
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Start Video Package
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Best Value</div>
            <div className="ti">02</div>
            <div className="tn">Professional Video</div>
            <p className="tbf">
              A more polished video package with stronger pacing and concept direction.
            </p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>349
              </div>
              <div className="pnt">Per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Stronger concept direction
              </li>
              <li>
                <span className="ck" />More polished edit
              </li>
              <li>
                <span className="ck" />Better hook and pacing
              </li>
              <li>
                <span className="ck" />Platform-ready delivery
              </li>
            </ul>
            <Link to="/contact" className="cc primary">
              Choose Professional Video
            </Link>
          </div>

          <div className="tc">
            <div className="ti">03</div>
            <div className="tn">Monthly Video</div>
            <p className="tbf">
              Ongoing short-form support for businesses that want consistent motion content.
            </p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>399<span className="price-mo">/mo</span>
              </div>
              <div className="pnt">Ongoing content</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Ongoing short-form video support
              </li>
              <li>
                <span className="ck" />Monthly video content
              </li>
              <li>
                <span className="ck" />Consistent creative direction
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Ask About Monthly Video
            </Link>
          </div>
        </div>

        <p className="sl">Short-Form Ad Videos</p>

        <div className="addons-row fade-in">
          <div className="bar-grid cols-2" style={{ marginBottom: 48 }}>
            <div className="bar-item">
              <div>
                <div className="bar-label">Standard Ad</div>
                <div className="bar-detail">Short promotional ad video with clear offer structure</div>
              </div>
              <div className="bar-price-sm">$179</div>
            </div>
            <div className="bar-item">
              <div>
                <div className="bar-label">Premium Ad</div>
                <div className="bar-detail">Higher polish, stronger direction, refined pacing</div>
              </div>
              <div className="bar-price-sm">$299</div>
            </div>
          </div>
        </div>

        <p className="sl">Campaign Packages</p>

        <div className="tg fade-in" style={{ gridTemplateColumns: '1fr 1.25fr', maxWidth: 760 }}>
          <div className="tc">
            <div className="ti">01</div>
            <div className="tn">Campaign</div>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>249
              </div>
              <div className="pnt">Per campaign</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Branded campaign concept
              </li>
              <li>
                <span className="ck" />Promotional creative assets
              </li>
              <li>
                <span className="ck" />Social-ready delivery
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Start Campaign
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Full Campaign</div>
            <div className="ti">02</div>
            <div className="tn">Campaign Pro</div>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>449
              </div>
              <div className="pnt">Per campaign</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Expanded campaign system
              </li>
              <li>
                <span className="ck" />Multiple asset variations
              </li>
              <li>
                <span className="ck" />Stronger launch presentation
              </li>
              <li>
                <span className="ck" />Premium campaign polish
              </li>
            </ul>
            <Link to="/contact" className="cc primary">
              Build Campaign Pro
            </Link>
          </div>
        </div>
      </div>

      {/* Panel: Branding */}
      <div className={`pnl ${activeTab === 'panel-branding' ? 'active' : ''}`} id="panel-branding">
        <div className="si">
          <h2>Brand Identity Packages</h2>
          <p>
            Brand identity packages for businesses that need a cleaner, sharper visual foundation
            before building or upgrading their website.
          </p>
        </div>

        <p className="sl">Per-Project Packages</p>

        <div className="tg fade-in">
          <div className="tc">
            <div className="ti">01</div>
            <div className="tn">Brand Identity</div>
            <p className="tbf">
              For businesses that need a clean visual direction and stronger brand foundation.
            </p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>299
              </div>
              <div className="pnt">Per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Logo or brand direction refinement
              </li>
              <li>
                <span className="ck" />Core visual style direction
              </li>
              <li>
                <span className="ck" />Basic brand presentation
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Start Brand Identity
            </Link>
          </div>

          <div className="tc featured">
            <div className="cbd">Most Popular</div>
            <div className="ti">02</div>
            <div className="tn">Brand Launch</div>
            <p className="tbf">
              For businesses preparing to launch, refresh, or present themselves more professionally.
            </p>
            <div className="pb">
              <div className="pd">
                <span className="psy">$</span>599
              </div>
              <div className="pnt">Per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Expanded brand direction
              </li>
              <li>
                <span className="ck" />Launch-ready visual system
              </li>
              <li>
                <span className="ck" />Social and website-ready styling
              </li>
            </ul>
            <Link to="/contact" className="cc primary">
              Build Brand Launch
            </Link>
          </div>

          <div className="tc">
            <div className="ti">03</div>
            <div className="tn">Full Brand System</div>
            <p className="tbf">
              For full rebrands, new launches, or businesses ready for a more complete brand
              foundation.
            </p>
            <div className="pb">
              <div className="pd" style={{ fontSize: 'clamp(44px,5.5vw,62px)' }}>
                <span className="psy">$</span>1,299
              </div>
              <div className="pnt">Per project</div>
            </div>
            <div className="crl" />
            <ul className="fl">
              <li>
                <span className="ck" />Complete visual identity system
              </li>
              <li>
                <span className="ck" />Brand presentation assets
              </li>
              <li>
                <span className="ck" />Web and content direction
              </li>
              <li>
                <span className="ck" />Premium launch-ready polish
              </li>
            </ul>
            <Link to="/contact" className="cc outline">
              Build Full Brand System
            </Link>
          </div>
        </div>

        <p className="sl">Branding Add-ons</p>

        <div className="addons-row fade-in">
          <div className="bar-grid cols-4" style={{ marginBottom: 24 }}>
            {[
              { label: 'Brand Reveal Video', detail: 'Short reveal asset', price: '$499' },
              { label: 'Extra Hero Shots', detail: 'Additional brand visuals', price: '$199' },
              { label: 'Tagline and Copy', detail: 'Messaging support', price: '$129' },
              { label: 'Extra Mockups', detail: 'Additional presentation assets', price: '$129' },
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

        <div className="dual-bar fade-in">
          <div>
            <p className="sl">Rush and Revisions</p>
            <div className="bar-grid" style={{ gridTemplateColumns: '1fr', gap: 8 }}>
              <div className="bar-item">
                <div>
                  <div className="bar-label">Rush Delivery</div>
                  <div className="bar-detail">Faster turnaround where available</div>
                </div>
                <div className="bar-price-sm">+25%</div>
              </div>
              <div className="bar-item">
                <div>
                  <div className="bar-label">Extra Revision Round</div>
                  <div className="bar-detail">Beyond included rounds</div>
                </div>
                <div className="bar-price-sm">$75</div>
              </div>
            </div>
          </div>

          <div>
            <p className="sl">Ongoing Brand Care</p>
            <div className="bar-grid" style={{ gridTemplateColumns: '1fr', gap: 8 }}>
              <div className="bar-item">
                <div>
                  <div className="bar-label">Brand Asset Updates</div>
                  <div className="bar-detail">Small brand asset adjustments</div>
                </div>
                <div className="bar-price-sm">$29/mo</div>
              </div>
              <div className="bar-item">
                <div>
                  <div className="bar-label">Full Rebrand</div>
                  <div className="bar-detail">Complete identity refresh</div>
                </div>
                <div className="bar-price-sm">Custom</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              Every package is designed to help your business look more credible, communicate clearly,
              and create a better first impression online. The goal is not just to make something look
              good — it is to make your business easier to trust, understand, and contact.
            </p>
          </div>

          <div>
            <h3 className="th">Why businesses choose New Level Design Studio</h3>
            <ul className="tl">
              <li>
                <span className="ck" />
                Professional websites, visuals, and content without overcomplicating the process
              </li>
              <li>
                <span className="ck" />
                Built for local businesses, service providers, restaurants, contractors, salons, real
                estate, fitness, med spas, and startups
              </li>
              <li>
                <span className="ck" />
                Platform-ready assets for websites, social media, Google Business Profile, and ads
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
      <section className="faq-band">
        <h2 className="faq-heading">Questions before choosing a package?</h2>

        {faqs.map((faq, i) => (
          <div className={`faq-item fade-in ${openFaq === i ? 'open' : ''}`} key={i}>
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

      {/* Care Band */}
      <section className="care-band">
        <div className="care-band-inner">
          <div className="care-header">
            <h2 className="care-heading">
              Built to grow
              <br />
              with your business.
            </h2>
            <p className="care-sub">
              After launch, New Level Design Studio can help with updates, maintenance, new visuals,
              campaign assets, content refreshes, and future upgrades as your business grows.
            </p>
          </div>

          <div className="care-list">
            {[
              {
                num: '01',
                title: 'Website Updates',
                desc: 'Small page edits, content updates, image swaps, and routine refinements after launch.',
              },
              {
                num: '02',
                title: 'Content Refreshes',
                desc: 'New visuals, promotional assets, and campaign materials as your business changes.',
              },
              {
                num: '03',
                title: 'Brand Support',
                desc: 'Ongoing brand asset updates, layout adjustments, and presentation polish.',
              },
              {
                num: '04',
                title: 'Future Growth',
                desc: 'Upgrade your website, expand your content system, or refresh your visuals when your business is ready.',
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
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

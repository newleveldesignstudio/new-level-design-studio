import { Link } from 'react-router-dom';
import SEO, { localBusinessSchema, breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const WHATS_INCLUDED = [
  {
    label: 'Custom realtor website',
    desc: 'Built around you and your brokerage, not a swapped-name template.',
  },
  {
    label: 'Mobile-first design',
    desc: 'Looks and works correctly for clients browsing from a phone at an open house.',
  },
  {
    label: 'Contact forms and lead routing',
    desc: 'Working inquiry forms so leads reach you, not a dead inbox.',
  },
  {
    label: 'Brokerage/compliance placement',
    desc: 'Brokerage name and information placed prominently near your contact details.',
  },
  {
    label: 'Basic SEO setup',
    desc: 'Page titles, meta descriptions, and header tags set correctly at launch.',
  },
  {
    label: 'Listing presentation structure',
    desc: 'The framework your active and upcoming listings are built to sit inside.',
  },
  {
    label: 'Optional listing pages',
    desc: 'Dedicated property pages for individual listings, added as needed.',
  },
  {
    label: 'Future IDX/Stellar MLS planning',
    desc: 'Structure that can support IDX/MLS integration later, once your provider and rules are confirmed.',
  },
];

const SUPPORTING_PRICING = [
  {
    label: 'Website Care',
    price: '$99/mo',
    note: 'after first 3 months free',
    desc: 'Hosting support, small updates, form checks, and basic maintenance so the site stays current.',
  },
  {
    label: 'Simple Listing / Status Updates',
    price: '$25–$75',
    note: 'as needed',
    desc: 'Smaller updates like changing a listing status, updating a price, swapping a photo, or light edits.',
  },
  {
    label: 'Premium Listing Page Add-On',
    price: '$150–$200',
    note: 'per property',
    desc: 'A dedicated property page with photo gallery, details, features/amenities, map/location, listing-specific contact buttons, SEO setup, image optimization, and mobile testing.',
  },
  {
    label: 'Stellar MLS / IDX Integration',
    price: 'Quoted separately',
    note: '',
    desc: 'Quoted once we know the exact provider/software and your MLS/brokerage requirements.',
  },
];

const serviceSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://newlvlstudio.com/real-estate-web-design/#service',
  name: 'Real Estate Web Design',
  serviceType: 'Real Estate Web Design',
  description:
    'Custom realtor websites, listing presentation pages, and ongoing website care for busy Florida real estate agents.',
  provider: { '@id': 'https://newlvlstudio.com/#business' },
  areaServed: [
    'Port Orange',
    'Daytona Beach',
    'Ormond Beach',
    'New Smyrna Beach',
    'Volusia County',
    'Central Florida',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Real Estate Web Design Pricing',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Initial Realtor Website Setup' },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '1500',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Website Care' },
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: '99',
          priceCurrency: 'USD',
          unitText: 'MONTH',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Simple Listing / Status Updates' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Premium Listing Page Add-On' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Stellar MLS / IDX Integration' },
      },
    ],
  },
};

export default function RealEstateWebDesign() {
  const includedRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '[data-reveal-item]',
  });
  const pricingRef = useScrollReveal<HTMLDivElement>({
    y: 24,
    duration: 0.6,
    stagger: 0.08,
    childSelector: '[data-reveal-item]',
  });

  return (
    <div>
      <SEO
        title="Real Estate Web Design for Florida Agents | New Level Design Studio"
        description="Custom realtor websites, listing presentation pages, and ongoing website care for busy Florida real estate agents. Starting at $1,500+."
        canonical="https://newlvlstudio.com/real-estate-web-design"
        jsonLd={[
          localBusinessSchema(),
          serviceSchema,
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Services', url: 'https://newlvlstudio.com/services/' },
            { name: 'Real Estate Web Design', url: 'https://newlvlstudio.com/real-estate-web-design/' },
          ]),
        ]}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">REAL ESTATE WEB DESIGN</p>
          <h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              lineHeight: 1.07,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 760,
            }}
          >
            Real Estate Web Design for Busy Florida Agents
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 600 }}
          >
            A custom realtor website, listing presentation system, and ongoing care built to turn
            visitors into leads while you're focused on clients, showings, and closings.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/contact/?service=realtor-website" className="btn-primary">
              Start a Realtor Website
            </Link>
            <a
              href="#listing-pages"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('listing-pages')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              View Example Listing Pages
            </a>
          </div>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Why Agents Need More Than a Basic Profile */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '0 0 100px' }}>
        <div className="container-nlds">
          <p className="eyebrow">MORE THAN A PROFILE</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15, maxWidth: 640 }}
          >
            Why Agents Need More Than a Basic Profile
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            Your brokerage page, Zillow profile, and social links all help people find you — but none
            of them are yours to control. You can't change the layout, choose what's featured, or make
            sure your own listings and story are what a potential client sees first.
          </p>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            A dedicated realtor website gives you one destination you control — your brand, your
            listings, your story, and a direct way for people to reach you.
          </p>
        </div>
      </section>

      {/* What's Included */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT'S INCLUDED</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            What's Included
          </h2>
          <div ref={includedRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 mt-12">
            {WHATS_INCLUDED.map((item) => (
              <div
                key={item.label}
                data-reveal-item
                style={{
                  borderTop: '1px solid var(--silver-grey)',
                  padding: '20px 0',
                }}
                className="flex items-start gap-3"
              >
                <span
                  className="font-sans shrink-0"
                  style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', marginTop: 3 }}
                >
                  —
                </span>
                <div>
                  <div className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                    {item.label}
                  </div>
                  <div className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">PRICING</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Realtor Website Pricing
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            The initial setup includes the core website, mobile-friendly design, main pages, contact
            form, brokerage/compliance placement, basic SEO setup, and the initial listing
            presentation structure.
          </p>

          {/* Anchor pricing card */}
          <div
            className="mt-10 flex flex-col gap-8 md:grid md:grid-cols-[1fr_auto] md:grid-rows-[auto_auto] md:items-center"
            style={{
              backgroundColor: 'var(--charcoal)',
              padding: 'clamp(32px, 5vw, 48px)',
            }}
          >
            <div className="md:col-start-1 md:row-start-1">
              <p className="font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--silver-grey)' }}>
                Initial Realtor Website Setup
              </p>
              <h3 className="font-serif mt-3" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--white)', lineHeight: 1.1 }}>
                Your realtor website, built and launched
              </h3>
            </div>
            <div className="text-left md:text-right md:col-start-2 md:row-start-1 md:row-span-2 md:self-center">
              <div className="font-serif" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--white)', lineHeight: 1 }}>
                $1,500+
              </div>
              <p className="font-sans mt-2" style={{ fontSize: '0.8125rem', color: 'var(--silver-grey)' }}>
                Starting at · per project
              </p>
            </div>
            <div className="md:col-start-1 md:row-start-2">
              <Link to="/contact/?service=realtor-website" className="btn-primary inline-block">
                Start a Realtor Website
              </Link>
            </div>
          </div>

          {/* Supporting pricing rows */}
          <div ref={pricingRef} className="mt-6 flex flex-col" style={{ gap: 12 }}>
            {SUPPORTING_PRICING.map((item) => (
              <div
                key={item.label}
                data-reveal-item
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                style={{
                  border: '1px solid var(--border-color)',
                  padding: '20px 24px',
                }}
              >
                <div>
                  <div className="font-sans font-semibold" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)' }}>
                    {item.label}
                  </div>
                  <div className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55, maxWidth: 560 }}>
                    {item.desc}
                  </div>
                </div>
                <div style={{ textAlign: 'left', flexShrink: 0 }}>
                  <div className="font-serif" style={{ fontSize: '1.375rem', color: 'var(--charcoal)' }}>
                    {item.price}
                  </div>
                  {item.note && (
                    <p className="font-sans" style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                      {item.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Listing Presentation Pages */}
      <section id="listing-pages" style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0', scrollMarginTop: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">LISTING PRESENTATION PAGES</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Listing Presentation Pages
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 640 }}
          >
            Beyond the core website, NLDS can build dedicated property pages for your active listings
            — photo galleries, map/location sections, features and amenities, listing-specific contact
            buttons, and mobile testing so the page holds up on any device.
          </p>
          <div className="mt-8">
            <a
              href="https://wynne-iaconis-realty-nlds.netlify.app/listings"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Example Listing Pages
            </a>
            <p className="font-sans mt-4" style={{ fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--muted-text)', maxWidth: 560 }}>
              This is a staging/example project used to demonstrate the listing page system — not a
              final client domain.
            </p>
          </div>
        </div>
      </section>

      {/* Done-For-You Website Care */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">DONE-FOR-YOU WEBSITE CARE</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            Done-For-You Website Care
          </h2>
          <p
            className="font-sans mt-5"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}
          >
            Most agents don't have time to manage a website on top of client calls, showings, and
            closings. Website Care handles the small updates, checks, and maintenance that keep a site
            current — so you're not the one tracking it.
          </p>
          <Link to="/website-care/" className="text-link mt-6 inline-block">
            Learn more about Website Care
          </Link>
        </div>
      </section>

      {/* IDX / Stellar MLS */}
      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">IDX / STELLAR MLS</p>
          <h2
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
          >
            IDX / Stellar MLS
          </h2>
          <div
            className="mt-6"
            style={{ border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)', padding: 'clamp(24px, 4vw, 32px)', maxWidth: 700 }}
          >
            <p className="font-sans" style={{ fontSize: '0.9375rem', fontStyle: 'italic', color: 'var(--muted-text)', lineHeight: 1.65 }}>
              IDX and Stellar MLS integration usually come with their own vendor cost, setup
              requirements, and MLS/brokerage rules. This is explored later as a separate integration,
              quoted once we know the exact provider/software and your MLS/brokerage requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Subtle trust link to the proof page */}
      <div style={{ backgroundColor: 'var(--bg-soft)', paddingTop: 48 }}>
        <div className="container-nlds text-center">
          <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
            Every client site follows a build, backup, QA, and deployment process.{' '}
            <Link to="/proof/" className="text-link">
              See how I protect client websites
            </Link>
          </p>
        </div>
      </div>

      <FinalCTA
        heading="Request a Realtor Website Quote"
        body="Tell us about your brokerage, your listings, and your goals — we'll put together a clear scope and price before anything begins."
        buttonText="Request a Realtor Website Quote"
        buttonTo="/contact/?service=realtor-website"
      />
    </div>
  );
}

import { Link } from 'react-router-dom';
import SEO, { breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import ConceptDisclosure from '@/components/ConceptDisclosure';

/**
 * REVIEW CANDIDATE (not yet released). Contractor-focused service page.
 * Every demo shown is labelled exactly as on /works/ (Industry Demo / Concept Build). No client results, reviews, rankings or
 * integrations are claimed. Scope statements mirror /packages/ ("What Requires a Custom Quote").
 */
const linkStyle = { color: 'var(--charcoal)', textDecorationLine: 'underline', textUnderlineOffset: 3 } as const;

const MUST_DO = [
  { title: 'Make the estimate request obvious', desc: 'A homeowner with a leak or a damaged roof is not browsing. The phone number and a short request form should be reachable on every screen without scrolling back to the top.' },
  { title: 'Say what you do and where', desc: 'List the services you actually offer and the towns you actually cover on the site, in plain words. Visitors and Google both need that before they trust the rest.' },
  { title: 'Show real proof', desc: 'Project photos, license and insurance details and a link to your Google reviews only belong on the site if they are real and current. We leave clearly marked space for them rather than inventing any.' },
  { title: 'Work on a phone first', desc: 'Contractor visitors often arrive on a phone, in a hurry. Tap-to-call, fast pages and short forms matter more than animation.' },
];

const INCLUDED = [
  'Mobile-first pages for each service you offer',
  'Service-area section that matches your Google Business Profile',
  'Estimate or contact request form with clear next steps',
  'Space for project photos, reviews links and licensing details you supply',
  'On-page SEO structure (titles, headings, local service content)',
  'Website Care available after launch',
];

const NOT_INCLUDED = ['Paid ads setup', 'Full SEO campaigns', 'Booking systems and customer portals', 'Complex automation or custom tools'];

const EXAMPLES = [
  { title: 'Precision Line Roofing', label: 'Industry Demo / Concept Build', industry: 'Contractors', href: '/works/precision-line-roofing/' },
  { title: 'Arctic Airworks', label: 'Industry Demo / Concept Build', industry: 'HVAC · Local Services', href: '/works/arctic-airworks/' },
  { title: 'Stone & Timber Remodeling', label: 'Concept Build', industry: 'Contractors', href: '/works/stone-timber-remodeling/' },
  { title: 'DH Luxury Roofing', label: 'Concept Build', industry: 'Contractors', href: '/works/dh-luxury-roofing/' },
];

export default function ContractorWebDesign() {
  return (
    <div>
      <SEO
        title="Contractor Website Design for Local Businesses | NLDS"
        description="Websites for roofing, HVAC and remodeling contractors: clear estimate requests, honest service pages, mobile-first. New Level Design Studio, Port Orange, FL."
        canonical="https://newlvlstudio.com/contractor-website-design"
        jsonLd={[
          breadcrumbSchema([
            { name: 'Home', url: 'https://newlvlstudio.com/' },
            { name: 'Contractor Website Design', url: 'https://newlvlstudio.com/contractor-website-design/' },
          ]),
        ]}
      />

      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 100 }}>
        <div className="container-nlds">
          <p className="eyebrow">Contractor Website Design</p>
          <h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: 1.07, letterSpacing: '-0.02em', color: 'var(--charcoal)', maxWidth: 720 }}
          >
            Websites for Local Contractors, Built for Phones
          </h1>
          <p className="font-sans mt-6" style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 600 }}>
            Many searches for a roofer, an HVAC company or a remodeler start on a phone, in a hurry. NLDS designs contractor websites around that moment: what you do, where you work, and one easy way to ask for an estimate. NLDS is based in Port Orange, FL and works with businesses across Volusia County.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link to="/contact/?service=free-website-review" className="btn-primary">Get a Free Website Review</Link>
            <Link to="/works/" className="btn-secondary">View Our Work</Link>
          </div>
          <div className="mt-16"><SectionDivider /></div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-soft)', padding: '100px 0' }}>
        <div className="container-nlds">
          <p className="eyebrow">WHAT A CONTRACTOR SITE HAS TO DO</p>
          <h2 className="font-serif mt-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1, maxWidth: 620 }}>
            Built for the visitor who needs someone this week
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0 mt-12">
            {MUST_DO.map((item, i) => (
              <div key={item.title} className="flex items-start gap-5" style={{ borderBottom: '1px solid var(--silver-grey)', padding: '24px 0' }}>
                <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--muted-text)', minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-sans font-semibold" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>{item.title}</h3>
                  <p className="font-sans mt-1" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.55 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow">SCOPE</p>
              <h2 className="font-serif mt-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1 }}>What a contractor website project includes</h2>
              <p className="font-sans mt-6" style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 480 }}>
                Contractor sites are built within the standard <Link to="/packages/" style={linkStyle}>website packages</Link>, starting at $499. Anything beyond those packages is quoted separately, and we say so up front. See all <Link to="/services/" style={linkStyle}>services</Link>; ongoing updates after launch are covered by <Link to="/website-care/" style={linkStyle}>Website Care</Link>. If you also need help responding to inquiries faster, see <Link to="/business-systems/" style={linkStyle}>Business Systems</Link>.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border-color)', padding: 'clamp(28px, 3vw, 40px)' }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Included</p>
              {INCLUDED.map((item) => (
                <div key={item} className="flex items-start gap-3" style={{ borderBottom: '1px solid var(--silver-grey)', padding: '12px 0' }}>
                  <span className="font-sans shrink-0" style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: 2 }} aria-hidden="true">—</span>
                  <span className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--body-text)' }}>{item}</span>
                </div>
              ))}
              <p className="eyebrow" style={{ margin: '28px 0 12px' }}>Quoted separately</p>
              <p className="font-sans" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>{NOT_INCLUDED.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-main)', padding: '20px 0 100px' }}>
        <div className="container-nlds">
          <p className="eyebrow">DEMONSTRATION PROJECTS</p>
          <h2 className="font-serif mt-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.1, maxWidth: 620 }}>Contractor concepts from the NLDS portfolio</h2>
          <p className="font-sans mt-5" style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 620 }}>
            Independent industry demos and concept builds by NLDS, labelled as on the Work page. They show how we structure a contractor site.
          </p>
          <ConceptDisclosure />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 mt-10" style={{ listStyle: 'none', padding: 0, margin: '40px 0 0' }}>
            {EXAMPLES.map((item) => (
              <li key={item.href} style={{ borderTop: '1px solid var(--silver-grey)', padding: '20px 0' }}>
                <p className="font-sans uppercase" style={{ fontSize: '0.6875rem', letterSpacing: '0.15em', color: 'var(--muted-text)' }}>{item.label} · {item.industry}</p>
                <Link to={item.href} className="font-serif mt-2 inline-block underline decoration-1 underline-offset-4" style={{ fontSize: '1.25rem', color: 'var(--charcoal)' }}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        heading="Tell Us About Your Trade and Service Area"
        body="Send a short note about the work you do and the towns you cover. We reply within one business day."
        buttonText="Request a Free Website Review"
        buttonTo="/contact/?service=free-website-review"
      />
    </div>
  );
}

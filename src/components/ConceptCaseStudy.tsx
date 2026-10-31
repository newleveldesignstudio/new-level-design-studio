import { Link } from 'react-router-dom';
import SEO, { breadcrumbSchema } from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import FinalCTA from '@/components/FinalCTA';
import RelatedProjects from '@/components/RelatedProjects';
import ConceptDisclosure from '@/components/ConceptDisclosure';
import WorkDemonstrates from '@/components/WorkDemonstrates';

/** Shared layout for the Home Services concept case studies (Precision Line Roofing, Arctic Airworks). Same structure as the other /works/<slug>/ pages. */
export interface ConceptCaseStudyProps {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  category: string;
  industry: string;
  intro: string;
  demoUrl: string;
  demoHost: string;
  ogImage: string;
  hero: { base: string; alt: string };
  second?: { base: string; alt: string; width: number; height: number };
  problem: string;
  direction: string;
  highlights: string[];
  deliverables: string[];
  demonstrates: string[];
}

const label: React.CSSProperties = { marginBottom: 16 };
const body: React.CSSProperties = { fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--muted-text)' };
const block: React.CSSProperties = { borderTop: '1px solid var(--border-color)', paddingTop: 32, marginBottom: 48 };

export default function ConceptCaseStudy(p: ConceptCaseStudyProps) {
  return (
    <div>
      <SEO
        title={p.seoTitle}
        description={p.seoDescription}
        canonical={`https://newlvlstudio.com/works/${p.slug}`}
        ogImage={`https://newlvlstudio.com${p.ogImage}`}
        ogType="article"
        jsonLd={breadcrumbSchema([
          { name: 'Home', url: 'https://newlvlstudio.com/' },
          { name: 'Work', url: 'https://newlvlstudio.com/works/' },
          { name: p.title, url: `https://newlvlstudio.com/works/${p.slug}/` },
        ])}
      />

      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <Link to="/works/" className="font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-text)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            ← Selected Work
          </Link>
          <div style={{ maxWidth: 760, marginTop: 32 }}>
            <p className="eyebrow">{p.eyebrow}</p>
            <h1 className="font-serif mt-4" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}>{p.title}</h1>
            <p className="font-sans mt-6" style={{ fontSize: '1rem', lineHeight: 1.65, color: 'var(--muted-text)', maxWidth: 560 }}>{p.intro}</p>
            <ConceptDisclosure />
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Concept <span aria-hidden="true">↗</span>
                <span className="sr-only"> ({p.title} industry demo, opens in a new tab)</span>
              </a>
              <Link to="/contact/" className="btn-secondary">Discuss Your Website</Link>
            </div>
          </div>
          <div className="mt-16"><SectionDivider /></div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-main)', padding: '64px 0 0' }}>
        <div className="container-nlds">
          <img
            src={`${p.hero.base}.webp`}
            srcSet={`${p.hero.base}-w768.webp 768w, ${p.hero.base}.webp 1440w`}
            sizes="(max-width: 768px) 100vw, 1200px"
            width={1440}
            height={900}
            decoding="async"
            alt={p.hero.alt}
            loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid var(--border-color)' }}
          />
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0 120px' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20" style={{ maxWidth: 1040 }}>
            <div className="lg:col-span-4">
              <div style={{ position: 'sticky', top: 120 }}>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Category</p>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>{p.category}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Label</p>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>Industry Demo / Concept Build</p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Industry</p>
                  <p className="font-sans" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>{p.industry}</p>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24, marginBottom: 32 }}>
                  <p className="eyebrow" style={{ marginBottom: 8 }}>Deliverables</p>
                  <ul className="font-sans" style={{ fontSize: '0.9375rem', lineHeight: 1.7, listStyle: 'none', padding: 0, margin: 0 }}>
                    {p.deliverables.map((d) => <li key={d} style={{ color: 'var(--muted-text)' }}>— {d}</li>)}
                  </ul>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 24 }}>
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block' }}>
                    View Concept <span aria-hidden="true">↗</span>
                    <span className="sr-only"> ({p.title} industry demo, opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div style={block}>
                <p className="eyebrow" style={label}>The Problem</p>
                <p className="font-sans" style={body}>{p.problem}</p>
              </div>
              <div style={block}>
                <p className="eyebrow" style={label}>The Direction</p>
                <p className="font-sans" style={body}>{p.direction}</p>
              </div>
              <div style={block}>
                <p className="eyebrow" style={label}>Highlights</p>
                <ul className="font-sans" style={{ ...body, listStyle: 'none', padding: 0, margin: 0 }}>
                  {p.highlights.map((h) => <li key={h}>— {h}</li>)}
                </ul>
              </div>
              {p.second && (
                <div style={{ marginBottom: 48 }}>
                  <img
                    src={`${p.second.base}.webp`}
                    srcSet={`${p.second.base}-w768.webp 768w, ${p.second.base}.webp ${p.second.width}w`}
                    sizes="(max-width: 1024px) 100vw, 640px"
                    width={p.second.width}
                    height={p.second.height}
                    decoding="async"
                    alt={p.second.alt}
                    loading="lazy"
                    style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid var(--border-color)' }}
                  />
                </div>
              )}
              <WorkDemonstrates points={p.demonstrates} />
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 32 }}>
                <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="font-sans" style={{ fontSize: '0.8125rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--charcoal)', textDecoration: 'none', borderBottom: '1px solid var(--charcoal)', paddingBottom: 2 }}>
                  View Concept at {p.demoHost} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RelatedProjects currentSlug={p.slug} />

      <FinalCTA
        heading="Want This for Your Business?"
        body="New Level Design Studio builds websites for local service businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you need."
        buttonText="Discuss Your Website"
        buttonTo="/contact/"
      />
    </div>
  );
}

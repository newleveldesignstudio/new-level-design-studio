import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticlesSortedByDate } from '@/data/articles';
import type { Article } from '@/data/articles';
import SEO from '@/components/SEO';
import SectionDivider from '@/components/SectionDivider';
import { getCategoryDisplayLabel } from '@/lib/categoryDisplayLabels';

const ALL = 'All';

const SLUG_TO_CATEGORY: Record<string, string> = {
  'website-strategy': 'Website Strategy',
  'local-business-growth': 'Local Business Growth',
  'visual-direction': 'Visual Direction',
  'content-systems': 'Content Systems',
  'brand-presence': 'Brand Presence',
  'seo': 'SEO',
  'first-impressions': 'First Impressions',
  'lead-generation': 'Lead Generation',
  'website-audits': 'Website Audits',
  'local-seo': 'Local SEO',
  'website-design': 'Website Design',
  'conversion': 'Conversion',
  'website-care': 'Website Care',
};

const CATEGORY_TO_SLUG: Record<string, string> = {
  'Website Strategy': 'website-strategy',
  'Local Business Growth': 'local-business-growth',
  'Visual Direction': 'visual-direction',
  'Content Systems': 'content-systems',
  'Brand Presence': 'brand-presence',
  'SEO': 'seo',
  'First Impressions': 'first-impressions',
  'Lead Generation': 'lead-generation',
  'Website Audits': 'website-audits',
  'Local SEO': 'local-seo',
  'Website Design': 'website-design',
  'Conversion': 'conversion',
  'Website Care': 'website-care',
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      style={{
        borderTop: '1px solid var(--border-color)',
        paddingTop: 32,
        paddingBottom: 32,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
        {/* Left: meta */}
        <div className="md:col-span-3">
          <p
            className="font-sans"
            style={{
              fontSize: '0.6875rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted-text)',
            }}
          >
            {getCategoryDisplayLabel(article.category)}
          </p>
          <p
            className="font-sans mt-2"
            style={{ fontSize: '0.75rem', color: 'var(--silver-grey)', letterSpacing: '0.04em' }}
          >
            {article.date}
          </p>
        </div>

        {/* Right: content */}
        <div className="md:col-span-9">
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
              color: 'var(--charcoal)',
              lineHeight: 1.2,
            }}
          >
            {article.title}
          </h2>
          <p
            className="font-sans mt-3"
            style={{
              fontSize: '0.9375rem',
              color: 'var(--muted-text)',
              lineHeight: 1.65,
              maxWidth: 620,
            }}
          >
            {article.excerpt}
          </p>
          <Link
            to={`/journal/${article.slug}`}
            className="font-sans"
            style={{
              display: 'inline-block',
              marginTop: 20,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--charcoal)',
              paddingBottom: 2,
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-text)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--silver-grey)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = 'var(--charcoal)';
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--charcoal)';
            }}
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Journal() {
  const allArticles = useMemo(() => getArticlesSortedByDate(), []);
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [ALL];
    for (const a of allArticles) {
      if (!seen.has(a.category)) {
        seen.add(a.category);
        cats.push(a.category);
      }
    }
    return cats;
  }, [allArticles]);

  const categoryParam = searchParams.get('category') ?? '';
  const active = SLUG_TO_CATEGORY[categoryParam] ?? ALL;

  const filtered = active === ALL ? allArticles : allArticles.filter((a) => a.category === active);

  const handleFilter = (cat: string) => {
    if (cat === ALL) {
      setSearchParams({}, { replace: true });
    } else {
      const slug = CATEGORY_TO_SLUG[cat];
      if (slug) setSearchParams({ category: slug }, { replace: true });
    }
  };

  return (
    <div>
      <SEO
        title="Notes on Local Business Web Design | New Level Design Studio"
        description="Articles on website strategy, local visibility, first impressions, and website trust for local businesses in Port Orange, Daytona Beach, and Volusia County."
        canonical="https://newlvlstudio.com/journal"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': 'https://newlvlstudio.com/journal/#blog',
          name: 'The NLDS Journal',
          url: 'https://newlvlstudio.com/journal/',
          publisher: {
            '@type': 'Organization',
            name: 'New Level Design Studio',
            url: 'https://newlvlstudio.com',
          },
          blogPost: allArticles.map((a) => ({
            '@type': 'BlogPosting',
            headline: a.title,
            url: `https://newlvlstudio.com/journal/${a.slug}/`,
            datePublished: a.date,
          })),
        }}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <p className="eyebrow">Latest Notes</p>
          <h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 3.75rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
              maxWidth: 680,
            }}
          >
            From The Studio.
          </h1>
          <p
            className="font-sans mt-6"
            style={{
              fontSize: '1rem',
              color: 'var(--muted-text)',
              lineHeight: 1.65,
              maxWidth: 540,
            }}
          >
            Practical articles on website strategy, local visibility, first impressions,
            and website trust — written for local businesses across Port Orange,
            Daytona Beach, and Volusia County.
          </p>
          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Filter + Articles */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '64px 0 120px' }}>
        <div className="container-nlds">

          {/* Category filter */}
          <div
            className="flex flex-wrap gap-2 mb-12"
            role="group"
            aria-label="Filter articles by category"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFilter(cat)}
                aria-pressed={active === cat}
                className="font-sans"
                style={{
                  fontSize: '0.6875rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '8px 18px',
                  border: '1px solid',
                  borderColor: active === cat ? 'var(--charcoal)' : 'var(--border-color)',
                  backgroundColor: active === cat ? 'var(--charcoal)' : 'transparent',
                  color: active === cat ? 'var(--white)' : 'var(--muted-text)',
                  cursor: 'pointer',
                  borderRadius: 0,
                  transition: 'all 0.18s ease',
                }}
              >
                {getCategoryDisplayLabel(cat)}
              </button>
            ))}
          </div>

          {/* Article list */}
          <div>
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          {/* Bottom rule */}
          <div style={{ borderTop: '1px solid var(--border-color)', marginTop: 0 }} />

          {/* Back to studio */}
          <div className="mt-16 text-center">
            <Link to="/studio" className="btn-secondary">
              Back to The Studio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { markdownToHtml } from '@/lib/markdownToHtml';
import { getCategoryDisplayLabel } from '@/lib/categoryDisplayLabels';
import { toISODate } from '@/lib/utils';
import SEO from '@/components/SEO';
import FinalCTA from '@/components/FinalCTA';
import SectionDivider from '@/components/SectionDivider';

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const navigate = useNavigate();
  const bodyRef = useRef<HTMLDivElement>(null);

  /* Intercept internal <a> links inside article body for client-side navigation */
  useEffect(() => {
    const container = bodyRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [navigate]);

  if (!article) return <Navigate to="/journal/" replace />;

  const html = markdownToHtml(article.body);
  const relatedArticles = getRelatedArticles(article.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    // Author/publisher are inlined (not bare @id refs) because the business
    // and person nodes are not rendered on article pages.
    author: {
      '@type': 'Person',
      '@id': 'https://newlvlstudio.com/#michael-vail',
      name: 'Michael Vail',
      url: 'https://newlvlstudio.com/michael-vail/',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://newlvlstudio.com/#business',
      name: 'New Level Design Studio',
      url: 'https://newlvlstudio.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://newlvlstudio.com/images/new-level-design-studio-logo-transparent-header.png',
      },
    },
    // article.date is the visible byline ("May 24, 2026") and stays as-is;
    // datePublished must be ISO 8601 for Schema.org/Rich Results validity.
    datePublished: toISODate(article.date),
    url: `https://newlvlstudio.com/journal/${article.slug}/`,
    mainEntityOfPage: `https://newlvlstudio.com/journal/${article.slug}/`,
  };

  return (
    <div>
      <SEO
        title={article.metaTitle ?? `${article.title} | New Level Design Studio`}
        description={article.metaDescription ?? article.excerpt}
        canonical={`https://newlvlstudio.com/journal/${article.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <Link
            to="/journal/"
            className="font-sans"
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--muted-text)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ← The Journal
          </Link>

          <div style={{ maxWidth: 760, marginTop: 32 }}>
            <p className="eyebrow">{getCategoryDisplayLabel(article.category)}</p>
            <h1
              className="font-serif mt-4"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--charcoal)',
              }}
            >
              {article.title}
            </h1>
            <div
              className="font-sans mt-6"
              style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', letterSpacing: '0.05em' }}
            >
              {article.author} &nbsp;·&nbsp; {article.date}
            </div>
          </div>

          <div className="mt-16">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '80px 0 120px' }}>
        <div className="container-nlds">
          <div
            ref={bodyRef}
            className="article-body font-sans"
            style={{ maxWidth: 680 }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>

      {relatedArticles.length > 0 && (
        <section
          style={{
            backgroundColor: 'var(--bg-soft)',
            padding: 'clamp(48px, 6vw, 72px) 0',
            borderTop: '1px solid var(--silver-grey)',
            borderBottom: '1px solid var(--silver-grey)',
          }}
        >
          <div className="container-nlds">
            <p className="eyebrow">Related Reading</p>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: 'clamp(12px, 2vw, 20px)', marginTop: 28 }}
            >
              {relatedArticles.map((related) => (
                <Link
                  key={related.slug}
                  to={`/journal/${related.slug}/`}
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                >
                  <article
                    style={{
                      backgroundColor: 'var(--surface)',
                      border: '1px solid var(--border-color)',
                      padding: 'clamp(20px, 2.5vw, 28px)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--charcoal)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <span
                      className="font-sans"
                      style={{
                        fontSize: '0.6875rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--muted-text)',
                      }}
                    >
                      {getCategoryDisplayLabel(related.category)}
                    </span>
                    <span
                      className="font-serif"
                      style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.25,
                        color: 'var(--charcoal)',
                        marginTop: 10,
                      }}
                    >
                      {related.title}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA
        heading="Start With a Free Website Review"
        body="We'll help you understand whether your website is clear, credible, and easy to trust before someone reaches out."
        buttonText="Start With a Free Website Review"
        buttonTo="/contact/"
      />
    </div>
  );
}

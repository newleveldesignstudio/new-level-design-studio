import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { getArticleBySlug } from '@/data/articles';
import { markdownToHtml } from '@/lib/markdownToHtml';
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

  if (!article) return <Navigate to="/journal" replace />;

  const html = markdownToHtml(article.body);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@id': 'https://newlvlstudio.com/#michael-vail',
    },
    publisher: {
      '@id': 'https://newlvlstudio.com/#business',
    },
    datePublished: article.date,
    url: `https://newlvlstudio.com/journal/${article.slug}`,
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
            to="/journal"
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
            <p className="eyebrow">{article.category}</p>
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

      <FinalCTA
        heading="Ready to Raise Your Visual Standard?"
        body="New Level Design Studio works with local businesses across Port Orange, Daytona Beach, and Volusia County. Tell us what you are building."
        buttonText="Start a Project"
        buttonTo="/contact"
      />
    </div>
  );
}

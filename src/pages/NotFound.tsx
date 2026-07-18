import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  // The SPA fallback serves the prerendered homepage shell, whose static
  // canonical tag is not managed by React Helmet and would otherwise remain
  // in the head. An unknown URL must not claim any canonical, so remove
  // whatever canonical is present while this page is shown. Valid pages
  // re-create their own canonical via Helmet when navigated to.
  useEffect(() => {
    document.querySelectorAll('link[rel="canonical"]').forEach((el) => el.remove());
  }, []);

  return (
    <div>
      {/* Intentionally no canonical and no OG tags: unknown URLs must not
          present themselves as an indexable page. */}
      <Helmet>
        <title>Page Not Found | New Level Design Studio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 180, paddingBottom: 120 }}>
        <div className="container-nlds" style={{ maxWidth: 560 }}>
          <p className="eyebrow">404</p>
          <h1
            className="font-serif mt-4"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--charcoal)',
            }}
          >
            Page Not Found.
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65 }}
          >
            That page doesn't exist. You may have followed a broken link or typed the address incorrectly.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/contact/" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

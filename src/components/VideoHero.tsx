import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './VideoHero.css';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section className="vh-section">
      <video
        ref={videoRef}
        className="vh-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/homepage-hero-local-favorite-poster-nlds-v2.jpg"
        width={1920}
        height={1080}
        aria-hidden="true"
      >
        <source
          src="/videos/homepage-hero-local-favorite-mobile-nlds-v2.mp4"
          media="(max-width: 768px)"
          type="video/mp4"
        />
        <source src="/videos/homepage-hero-local-favorite-desktop-nlds-v2.mp4" type="video/mp4" />
      </video>
      <div className="vh-overlay" />
      <div className="vh-content">
        <p className="vh-eyebrow">Port Orange &nbsp;·&nbsp; Daytona Beach &nbsp;·&nbsp; Volusia County</p>
        <h1 className="vh-headline">Better Systems for Winning Local Business.</h1>
        <p className="vh-body">
          NLDS builds websites, lead-response systems, and practical workflows that help local businesses attract customers, respond faster, and reduce repetitive work.
        </p>
        <div className="vh-ctas">
          <Link to="/contact/" className="btn-primary vh-cta">
            See What We Can Improve
          </Link>
          <Link to="/#what-we-build" className="btn-secondary vh-cta vh-cta-secondary">
            Explore What We Build
          </Link>
        </div>
      </div>
    </section>
  );
}

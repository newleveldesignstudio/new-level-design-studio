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
        poster="/videos/homepage-hero-local-favorite-poster-nlds.jpg"
        width={1920}
        height={1080}
        aria-hidden="true"
      >
        <source
          src="/videos/homepage-hero-local-favorite-mobile-nlds.mp4"
          media="(max-width: 767px)"
          type="video/mp4"
        />
        <source src="/videos/homepage-hero-local-favorite-desktop-nlds.mp4" type="video/mp4" />
      </video>
      <div className="vh-overlay" />
      <div className="vh-content">
        <p className="vh-eyebrow">Port Orange &nbsp;·&nbsp; Daytona Beach &nbsp;·&nbsp; Volusia County</p>
        <h1 className="vh-headline">Make Your Business Look Like the Local Favorite</h1>
        <p className="vh-body">
          Clean, modern websites for restaurants, service businesses, realtors, and local brands.
        </p>
        <Link to="/contact/" className="btn-primary vh-cta">
          Start Your Website
        </Link>
      </div>
    </section>
  );
}

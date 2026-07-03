/* eslint-disable react-refresh/only-export-components */
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_NAME = 'New Level Design Studio';
const DEFAULT_OG_IMAGE = 'https://newlvlstudio.com/social-preview.jpg';

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageWidth,
  ogImageHeight,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd,
}: SEOProps) {
  const normalizedCanonical =
    canonical === 'https://newlvlstudio.com/'
      ? canonical
      : canonical.endsWith('/')
        ? canonical
        : `${canonical}/`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={normalizedCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={normalizedCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && ogImageWidth && <meta property="og:image:width" content={String(ogImageWidth)} />}
      {ogImage && ogImageHeight && <meta property="og:image:height" content={String(ogImageHeight)} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}

export function localBusinessSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://newlvlstudio.com/#business',
    name: 'New Level Design Studio',
    alternateName: 'NLDS',
    url: 'https://newlvlstudio.com',
    telephone: '+13868465754',
    email: 'michael@newlvlstudio.com',
    slogan: 'Raise the Standard.',
    description:
      'Premium websites, Website Care, Brand Direction, and Brand & Content Support for local businesses across Port Orange, Daytona Beach, Volusia County, and Central Florida.',
    areaServed: [
      'Port Orange',
      'Daytona Beach',
      'Ormond Beach',
      'New Smyrna Beach',
      'Volusia County',
      'Central Florida',
    ],
    knowsAbout: [
      'Website Design',
      'Brand Direction',
      'Brand & Content Support',
      'Website Care',
      'Local Business Marketing',
      'Local SEO',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Design & Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Design',
            serviceType: 'Website Design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand Direction',
            serviceType: 'Brand Direction',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Brand & Content Support',
            serviceType: 'Brand & Content Support',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Care',
            serviceType: 'Website Care',
          },
        },
      ],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Port Orange',
      addressRegion: 'FL',
      postalCode: '32127',
      addressCountry: 'US',
    },
    priceRange: '$$',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'michael@newlvlstudio.com',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: ['https://www.facebook.com/Newlvlstudio/'],
    founder: { '@id': 'https://newlvlstudio.com/#michael-vail' },
  };
}

export function personSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://newlvlstudio.com/#michael-vail',
    name: 'Michael Vail',
    jobTitle: 'Founder & Creative Director',
    url: 'https://newlvlstudio.com/michael-vail/',
    image: 'https://newlvlstudio.com/images/founder/michael-vail-founder-portrait-new-level-design-studio.webp',
    worksFor: {
      '@id': 'https://newlvlstudio.com/#business',
    },
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://newlvlstudio.com/#website',
    name: 'New Level Design Studio',
    url: 'https://newlvlstudio.com',
  };
}

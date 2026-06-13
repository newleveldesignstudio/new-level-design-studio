/* eslint-disable react-refresh/only-export-components */
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
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
      'Premium websites, visuals, and content systems built for credibility, visibility, and conversion. Serving local businesses in Port Orange, Daytona Beach, Volusia County, and Central Florida.',
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
      'Brand Visuals',
      'Content Systems',
      'Website Maintenance',
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
            name: 'Brand Visuals',
            serviceType: 'Brand Visuals',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Content Systems',
            serviceType: 'Content Systems',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Care',
            serviceType: 'Website Maintenance',
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
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'New Level Design Studio',
    url: 'https://newlvlstudio.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://newlvlstudio.com/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

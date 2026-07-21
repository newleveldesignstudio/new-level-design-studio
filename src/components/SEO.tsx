/* eslint-disable react-refresh/only-export-components */
import { Helmet } from 'react-helmet-async';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

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

/**
 * NLDS is home-based and service-area focused. Do NOT add streetAddress,
 * geo latitude/longitude, or openingHours to this schema unless Michael
 * explicitly approves exposing that data — it is a privacy/business
 * decision (2026-07-06), not a missing-SEO defect. Use areaServed,
 * locality, region, and service-area signals instead.
 */
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
      'Premium websites, Website Redesign, Website Care, Brand Direction, and Website Copy & Visual Support for local businesses across Port Orange, Daytona Beach, Volusia County, and Central Florida.',
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
      'Website Redesign',
      'Brand Direction',
      'Website Copy & Visual Support',
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
            name: 'Website Copy & Visual Support',
            serviceType: 'Website Copy & Visual Support',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Redesign',
            serviceType: 'Website Redesign',
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
    image: 'https://newlvlstudio.com/social-preview.jpg',
    logo: 'https://newlvlstudio.com/images/new-level-design-studio-logo-transparent-header.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'michael@newlvlstudio.com',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: SOCIAL_LINKS.map((s) => s.url),
    founder: {
      '@type': 'Person',
      '@id': 'https://newlvlstudio.com/#michael-vail',
      name: 'Michael Vail',
      url: 'https://newlvlstudio.com/michael-vail/',
    },
  };
}

/**
 * Sitewide Organization schema — rendered once from Layout.tsx so every
 * public page carries an Organization node, independent of whether that
 * page also renders the fuller localBusinessSchema(). Shares the same @id
 * as localBusinessSchema() ('#business') so search engines merge them as
 * one entity rather than treating this as a second, competing node.
 * Same privacy guard as localBusinessSchema(): no streetAddress, geo, or
 * openingHours here either.
 */
export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://newlvlstudio.com/#business',
    name: 'New Level Design Studio',
    alternateName: 'NLDS',
    url: 'https://newlvlstudio.com',
    logo: 'https://newlvlstudio.com/images/new-level-design-studio-logo-transparent-header.png',
    sameAs: SOCIAL_LINKS.map((s) => s.url),
    founder: {
      '@type': 'Person',
      '@id': 'https://newlvlstudio.com/#michael-vail',
      name: 'Michael Vail',
      url: 'https://newlvlstudio.com/michael-vail/',
    },
  };
}

/**
 * Per-location Service schema. hasOfferCatalog intentionally mirrors the
 * exact four-item "What We Build" list rendered on every LocalLandingPage
 * (Website Design / Brand Direction / Website Copy & Visual Support /
 * Website Care) — grounded in what's actually on the page, nothing added.
 * areaServed values are drawn only from area names already established in
 * localBusinessSchema()/Services.tsx, reordered to lead with each page's
 * own city.
 */
export function localServiceSchema(params: {
  cityName: string;
  areaServed: string[];
  canonical: string;
}): Record<string, unknown> {
  const url = params.canonical.endsWith('/') ? params.canonical : `${params.canonical}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `Website Design & Brand Support in ${params.cityName}`,
    serviceType: 'Website Design',
    provider: { '@id': 'https://newlvlstudio.com/#business' },
    areaServed: params.areaServed,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        'Website Design',
        'Brand Direction',
        'Website Copy & Visual Support',
        'Website Care',
      ].map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, serviceType: name },
      })),
    },
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

/**
 * BreadcrumbList mirroring the site's real navigation hierarchy. Facts only —
 * page names and their canonical URLs — nothing invented.
 */
export function breadcrumbSchema(
  trail: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

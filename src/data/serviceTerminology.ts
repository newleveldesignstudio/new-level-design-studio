/**
 * Single source of truth for NLDS service naming.
 * Reused by navigation, footer, services/packages copy, and the contact form
 * so the same terms and order appear everywhere.
 */

export const PRIMARY_SERVICES = [
  'Website Design',
  'Website Redesign',
  'Website Care',
] as const;
export type PrimaryService = (typeof PRIMARY_SERVICES)[number];

export const WEBSITE_PACKAGES = [
  'Starter Website',
  'Core Website',
  'Pro Website',
] as const;
export type WebsitePackage = (typeof WEBSITE_PACKAGES)[number];

export const SUPPORTING_CAPABILITIES = [
  'Brand Direction',
  'Website Copy & Visual Support',
  'Local SEO Structure',
  'Google Business Profile Alignment',
  'Advanced Website Functionality',
] as const;
export type SupportingCapability = (typeof SUPPORTING_CAPABILITIES)[number];

/** Approved Website Care inclusions — shown on /services/#website-care and /website-care/. */
export const WEBSITE_CARE_INCLUSIONS = [
  'Small content updates and text changes',
  'Image swaps and media updates',
  'Broken link checks and fixes',
  'Basic monthly site review',
  'Priority email support',
  'Light performance monitoring',
] as const;

export interface ContactServiceOption {
  value: string;
  label: string;
}

/** Exact order approved for the contact form's service <select>. */
export const CONTACT_SERVICE_OPTIONS: readonly ContactServiceOption[] = [
  { value: 'free-website-review', label: 'Free Website Review' },
  { value: 'starter-website', label: 'Starter Website' },
  { value: 'core-website', label: 'Core Website' },
  { value: 'pro-website', label: 'Pro Website' },
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'website-maintenance', label: 'Website Care' },
  { value: 'visual-starter-pack', label: 'Visual Starter Pack' },
  { value: 'brand-direction', label: 'Brand Direction for a Website Project' },
  { value: 'advanced-functionality', label: 'Advanced Website Functionality' },
  { value: 'local-visibility-setup', label: 'Local Visibility Setup' },
  { value: 'local-visibility-check', label: 'Free Local Visibility Check' },
  { value: 'not-sure', label: 'Not Sure Yet' },
] as const;

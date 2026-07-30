export const SOCIAL_LINKS = [
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/newlvlstudio',
    ariaLabel: 'Follow New Level Design Studio on Instagram',
  },
  {
    platform: 'TikTok',
    url: 'https://www.tiktok.com/@newlvlstudio1',
    ariaLabel: 'Follow New Level Design Studio on TikTok',
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/newlvlstudio',
    ariaLabel: 'Follow New Level Design Studio on Facebook',
  },
  {
    platform: 'Threads',
    url: 'https://www.threads.net/@newlvlstudio',
    ariaLabel: 'Follow New Level Design Studio on Threads',
  },
  {
    platform: 'X',
    url: 'https://x.com/newlvldesign',
    ariaLabel: 'Follow New Level Design Studio on X',
  },
  {
    // Confirmed official channel (Michael, 2026-07-06). The old @newlvlstudio
    // handle is a dead 404 — do not use it.
    platform: 'YouTube',
    url: 'https://www.youtube.com/@newlvlstudio1',
    ariaLabel: 'Follow New Level Design Studio on YouTube',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/michael-vail-nlds',
    ariaLabel: 'Visit Michael Vail on LinkedIn',
  },
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];

/**
 * Footer-only subset. X, TikTok, Threads, and YouTube are no longer actively
 * used (2026-07-30) but are kept in SOCIAL_LINKS itself since that list also
 * feeds the schema.org sameAs array (SEO.tsx) and the social rows on Contact
 * and Studio — none of which were part of this footer-cleanup request.
 */
export const FOOTER_SOCIAL_LINKS = SOCIAL_LINKS.filter(
  (s) => !['X', 'TikTok', 'Threads', 'YouTube'].includes(s.platform),
);

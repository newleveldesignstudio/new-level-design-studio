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
  // YouTube removed 2026-07-06: the previous URL (@newlvlstudio) is a dead
  // 404. A live channel titled "New Level Design Studio" exists at
  // https://www.youtube.com/@newlvlstudio1 (matches the TikTok handle) —
  // re-add here once Michael confirms it is the official channel.
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/michael-vail-nlds',
    ariaLabel: 'Visit Michael Vail on LinkedIn',
  },
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];

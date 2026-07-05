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
    platform: 'YouTube',
    url: 'https://www.youtube.com/@newlvlstudio',
    ariaLabel: 'Follow New Level Design Studio on YouTube',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/michael-vail-nlds',
    ariaLabel: 'Visit Michael Vail on LinkedIn',
  },
] as const;

export type SocialLink = (typeof SOCIAL_LINKS)[number];

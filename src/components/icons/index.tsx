import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const MonitorIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="6" y="8" width="36" height="26" rx="1" />
    <line x1="6" y1="18" x2="42" y2="18" />
    <line x1="6" y1="28" x2="42" y2="28" />
    <line x1="16" y1="8" x2="16" y2="34" />
    <line x1="32" y1="8" x2="32" y2="34" />
    <line x1="20" y1="34" x2="28" y2="34" />
    <line x1="24" y1="34" x2="24" y2="40" />
    <line x1="18" y1="40" x2="30" y2="40" />
  </svg>
);

export const FramesIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="8" y="6" width="24" height="32" rx="1" />
    <rect x="18" y="12" width="24" height="32" rx="1" />
    <line x1="12" y1="14" x2="28" y2="14" />
    <line x1="22" y1="20" x2="38" y2="20" />
    <line x1="12" y1="30" x2="28" y2="30" />
    <line x1="22" y1="36" x2="38" y2="36" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className = '', size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="6" y="6" width="36" height="36" rx="1" />
    <polygon points="20,16 20,32 32,24" fill="none" />
    <line x1="6" y1="16" x2="42" y2="16" />
    <line x1="6" y1="32" x2="42" y2="32" />
    <line x1="16" y1="6" x2="16" y2="42" />
    <line x1="32" y1="6" x2="32" y2="42" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" className={className}>
    <polyline points="3,8 7,12 13,4" />
  </svg>
);

export const ArrowIcon: React.FC<IconProps> = ({ className = '', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <line x1="4" y1="8" x2="12" y2="8" />
    <polyline points="9,5 12,8 9,11" />
  </svg>
);

export const PageIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="6" y="4" width="28" height="32" rx="1" />
    <line x1="6" y1="12" x2="34" y2="12" />
    <line x1="6" y1="20" x2="34" y2="20" />
    <line x1="6" y1="28" x2="22" y2="28" />
    <line x1="12" y1="4" x2="12" y2="36" />
  </svg>
);

export const MobileIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="12" y="4" width="16" height="32" rx="2" />
    <line x1="12" y1="10" x2="28" y2="10" />
    <line x1="12" y1="30" x2="28" y2="30" />
    <circle cx="20" cy="33" r="1" />
  </svg>
);

export const FormIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="6" y="6" width="28" height="28" rx="1" />
    <line x1="12" y1="14" x2="28" y2="14" />
    <line x1="12" y1="20" x2="28" y2="20" />
    <line x1="12" y1="26" x2="20" y2="26" />
    <rect x="22" y="24" width="8" height="4" rx="1" />
  </svg>
);

export const SeoIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="18" cy="18" r="10" />
    <line x1="25" y1="25" x2="34" y2="34" />
    <line x1="14" y1="18" x2="22" y2="18" />
    <line x1="18" y1="14" x2="18" y2="22" />
  </svg>
);

export const SocialIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="12" cy="20" r="6" />
    <circle cx="28" cy="12" r="4" />
    <circle cx="28" cy="28" r="4" />
    <line x1="17" y1="17" x2="24" y2="14" />
    <line x1="17" y1="23" x2="24" y2="26" />
  </svg>
);

export const ClockIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="20" cy="20" r="14" />
    <line x1="20" y1="20" x2="20" y2="10" />
    <line x1="20" y1="20" x2="27" y2="20" />
    <line x1="20" y1="8" x2="20" y2="10" />
    <line x1="20" y1="30" x2="20" y2="32" />
    <line x1="8" y1="20" x2="10" y2="20" />
    <line x1="30" y1="20" x2="32" y2="20" />
  </svg>
);

export const SupportIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <circle cx="20" cy="20" r="14" />
    <path d="M14 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <line x1="20" y1="14" x2="20" y2="16" />
    <circle cx="16" cy="24" r="1" fill="currentColor" />
    <circle cx="24" cy="24" r="1" fill="currentColor" />
    <path d="M17 28c1.5 1 4.5 1 6 0" />
  </svg>
);

export const StrategyIcon: React.FC<IconProps> = ({ className = '', size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
    <rect x="6" y="20" width="8" height="14" rx="1" />
    <rect x="16" y="12" width="8" height="22" rx="1" />
    <rect x="26" y="6" width="8" height="28" rx="1" />
    <line x1="10" y1="16" x2="10" y2="18" />
    <line x1="20" y1="8" x2="20" y2="10" />
    <line x1="30" y1="2" x2="30" y2="4" />
  </svg>
);

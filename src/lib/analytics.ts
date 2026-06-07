declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

export function initGA4(): void {
  if (!GA4_ID || !GA4_ID.startsWith('G-')) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) { window.dataLayer.push(args); };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);
}

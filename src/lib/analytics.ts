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
  // gtag.js only executes commands pushed as `arguments` objects — pushing a
  // plain array is silently ignored, so a rest-parameter spread breaks GA4.
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID);
}

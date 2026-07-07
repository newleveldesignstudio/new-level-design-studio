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

  initClickTracking();
}

/** Safe event helper — no-ops when GA4 isn't initialized. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params ?? {});
}

/**
 * Conversion click tracking via one delegated listener, so components never
 * need per-element handlers. Events:
 *   phone_click        — any tel: link
 *   email_click        — any mailto: link
 *   gbp_click          — Google Business Profile outbound links
 *   contact_cta_click  — internal links to /contact (params: cta_text, service)
 *   package_cta_click  — internal links to /packages (params: cta_text)
 */
function initClickTracking(): void {
  document.addEventListener(
    'click',
    (e) => {
      const anchor = (e.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href') ?? '';
      const ctaText = (anchor.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 80);

      if (href.startsWith('tel:')) {
        trackEvent('phone_click', { cta_text: ctaText });
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click', { cta_text: ctaText });
      } else if (href.includes('maps.app.goo.gl') || href.includes('business.google.com')) {
        trackEvent('gbp_click', { cta_text: ctaText });
      } else if (href.startsWith('/contact')) {
        const service = /[?&]service=([^&#]+)/.exec(href)?.[1];
        trackEvent('contact_cta_click', { cta_text: ctaText, ...(service ? { service } : {}) });
      } else if (href.startsWith('/packages')) {
        trackEvent('package_cta_click', { cta_text: ctaText });
      }
    },
    { capture: true },
  );
}

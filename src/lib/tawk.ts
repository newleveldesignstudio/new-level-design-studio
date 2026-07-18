declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

const TAWK_SRC = 'https://embed.tawk.to/6a59057b0f91b31d4e1c7231/1jtlrqr8o';

let injected = false;

export function initTawk(): void {
  // Prerender/automation guard: Playwright drives the prerender with
  // navigator.webdriver=true — loading Tawk there would bake widget DOM
  // into every prerendered page.
  if (navigator.webdriver) return;
  if (injected || document.querySelector(`script[src="${TAWK_SRC}"]`)) return;
  injected = true;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const s1 = document.createElement('script');
  const s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = TAWK_SRC;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode?.insertBefore(s1, s0);
}

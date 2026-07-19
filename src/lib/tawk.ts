declare global {
  interface Window {
    Tawk_API?: Record<string, unknown> & { onLoad?: () => void };
    Tawk_LoadStart?: Date;
  }
}

const TAWK_SRC = 'https://embed.tawk.to/6a59057b0f91b31d4e1c7231/1jtlrqr8o';

let injected = false;

/** Give the Tawk iframes a meaningful accessible name (they ship untitled). */
function titleTawkFrames(): void {
  const label = 'New Level Design Studio live chat';
  document
    .querySelectorAll<HTMLIFrameElement>('iframe[src*="tawk.to"], iframe[title="chat widget"]')
    .forEach((f) => {
      if (!f.title || f.title === 'chat widget') f.title = label;
    });
}

function loadTawk(): void {
  if (injected || document.querySelector(`script[src="${TAWK_SRC}"]`)) return;
  injected = true;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  // Tawk fires onLoad once its iframes exist; title them then, and again
  // shortly after in case the widget re-renders its frame.
  window.Tawk_API.onLoad = () => {
    titleTawkFrames();
    setTimeout(titleTawkFrames, 1500);
  };

  const s1 = document.createElement('script');
  const s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = TAWK_SRC;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode?.insertBefore(s1, s0);
}

/**
 * Defer Tawk.to off the critical path. The widget is not needed for first
 * paint or interactivity, and loading it eagerly cost ~1s+ of main-thread
 * work plus a layout shift on mobile. Load it on the first genuine user
 * interaction — mousemove/scroll/touch/pointer/key — which covers every real
 * visitor session. Loading only after interaction also keeps Tawk's iframe
 * injection out of the initial-load Cumulative Layout Shift window (the shift
 * becomes user-initiated and is excluded from CLS). Once loaded, the chat
 * stays available for the rest of the session.
 */
export function initTawk(): void {
  // Prerender/automation guard: Playwright drives the prerender with
  // navigator.webdriver=true — loading Tawk there would bake widget DOM
  // into every prerendered page.
  if (navigator.webdriver) return;

  const events = ['pointerdown', 'touchstart', 'keydown', 'scroll', 'mousemove'] as const;
  let started = false;

  const start = () => {
    if (started) return;
    started = true;
    events.forEach((e) => window.removeEventListener(e, start));
    loadTawk();
  };

  events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
}

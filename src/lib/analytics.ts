import { readConsent, writeConsent, type ConsentChoice } from './consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __nldsGa?: boolean;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
const enabledBuild = () => !!GA4_ID && GA4_ID.startsWith('G-');
let active = false;
let clickListening = false;

/**
 * Query-string allowlist. Anything else (emails, phones, tokens, lead IDs, click IDs...) is never sent to Google.
 * utm_* are kept so campaign attribution still works; `service` is the contact-form prefill slug (kept in the address bar only).
 */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const SAFE_VALUE = /^[A-Za-z0-9._~ -]{1,100}$/;
export function safeQuery(search: string, keys: string[]): string {
  const out = new URLSearchParams();
  const src = new URLSearchParams(search);
  for (const k of keys) { const v = src.get(k); if (v !== null && SAFE_VALUE.test(v)) out.set(k, v); }
  const q = out.toString();
  return q ? `?${q}` : '';
}
/** page_location for every event we send: origin + pathname + allowlisted utm_* only (never other params or the fragment). */
const cleanUrl = () => `${location.origin}${location.pathname}${safeQuery(location.search, UTM_KEYS)}`;
/**
 * The Google tag's own automatic events (scroll, outbound click, form, history-change page_view) read the live address bar,
 * so the inbound URL itself is reduced to the allowlist before the tag loads. Path and fragment are untouched.
 */
function sanitizeAddressBar(): void {
  try {
    const want = safeQuery(location.search, [...UTM_KEYS, 'service']);
    if (want !== location.search) history.replaceState(history.state, '', `${location.pathname}${want}${location.hash}`);
  } catch { /* never break navigation */ }
}

/* ---------- page classification (paths only) ---------- */
const SERVICE_PAGES = new Set(['/services', '/packages', '/starter-pack', '/website-care', '/business-systems', '/real-estate-web-design', '/real-estate-marketing-website', '/local-visibility-setup']);
const LOCAL_PAGES = new Set(['/port-orange-website-design', '/daytona-beach-website-design', '/volusia-county-website-design', '/central-florida-website-design']);
const slugOf = (p: string) => p.replace(/^\/+|\/+$/g, '').split('/').pop() || 'home';

export interface PageInfo { page_type: string; service?: string; project?: string }

export function classifyPath(rawPath: string): PageInfo {
  const p = (rawPath.replace(/\/+$/, '') || '/');
  if (p === '/') return { page_type: 'home' };
  if (SERVICE_PAGES.has(p)) return { page_type: 'service', service: slugOf(p) };
  if (LOCAL_PAGES.has(p)) return { page_type: 'local_service', service: slugOf(p) };
  if (p === '/works') return { page_type: 'portfolio_index' };
  if (p.startsWith('/works/')) return { page_type: 'portfolio', project: slugOf(p) };
  if (p === '/journal') return { page_type: 'journal_index' };
  if (p.startsWith('/journal/')) return { page_type: 'journal_article' };
  if (p === '/proof') return { page_type: 'proof' };
  if (p === '/studio' || p === '/michael-vail') return { page_type: 'about' };
  if (p === '/contact') return { page_type: 'contact' };
  if (p === '/privacy' || p === '/terms') return { page_type: 'legal' };
  if (p.startsWith('/free-') || p.startsWith('/local-visibility-insights')) return { page_type: 'tool' };
  return { page_type: 'other' };
}

/* ---------- session attribution: last service/portfolio page viewed (paths/slugs only, per tab session) ---------- */
const ATTRIB_KEY = 'nlds-attrib';
type Attrib = { source_page_type?: string; source_page?: string };
function readAttrib(): Attrib {
  try { return JSON.parse(sessionStorage.getItem(ATTRIB_KEY) || '{}') as Attrib; } catch { return {}; }
}
function rememberAttrib(path: string, info: PageInfo) {
  if (!['service', 'local_service', 'portfolio', 'journal_article'].includes(info.page_type)) return;
  try { sessionStorage.setItem(ATTRIB_KEY, JSON.stringify({ source_page_type: info.page_type, source_page: path.replace(/\/+$/, '') || '/' })); } catch { /* ignore */ }
}

/* ---------- Google tag ---------- */
function loadGa(): void {
  if (window.__nldsGa || !enabledBuild()) return;
  window.__nldsGa = true;
  sanitizeAddressBar();
  window.dataLayer = window.dataLayer || [];
  // gtag.js only executes commands pushed as `arguments` objects (a rest-parameter spread is silently ignored).
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  delete (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_ID}`];
  window.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  // Global (not only per-config): the stream's own automatic page_view carries the raw URL with its query string.
  // Our single page_view is sent by trackPageView() with a clean page_location. Must precede js/config.
  window.gtag('set', { send_page_view: false, page_location: cleanUrl() });
  window.gtag('js', new Date());
  window.gtag('config', GA4_ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  const script = document.createElement('script');
  script.id = 'nlds-ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID as string)}`;
  document.head.appendChild(script);
}

function expireGoogleCookies(): void {
  const host = location.hostname, parts = host.split('.');
  const domains = ['', host, `.${host}`, ...(parts.length > 2 ? [`.${parts.slice(-2).join('.')}`] : [])];
  for (const c of document.cookie.split('; ')) {
    const name = c.split('=')[0];
    if (!/^_ga(_|$)|^_gid$|^_gat/.test(name)) continue;
    for (const d of domains) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
  }
}

/** True when analytics is currently allowed to send. */
export const analyticsActive = () => active;

/** Called once at startup: loads the tag only for a visitor who previously accepted. */
export function initGA4(): void {
  if (!enabledBuild()) return;
  if (readConsent() === 'granted') { active = true; loadGa(); initClickTracking(); }
}

/** Banner / Cookie Settings entry point. Returns the choice that took effect. */
export function setAnalyticsConsent(choice: ConsentChoice): void {
  writeConsent(choice);
  if (choice === 'granted') {
    if (!enabledBuild()) return;
    // Re-accepting after a withdrawal: lift the opt-out flag even though the tag script is already on the page.
    delete (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_ID}`];
    active = true; loadGa(); initClickTracking();
    // The page the visitor is already on is counted once, at the moment of consent.
    trackPageView(location.pathname);
  } else {
    active = false;
    lastTracked = '';
    if (GA4_ID) (window as unknown as Record<string, unknown>)[`ga-disable-${GA4_ID}`] = true;
    expireGoogleCookies();
    try { sessionStorage.removeItem(ATTRIB_KEY); } catch { /* ignore */ }
  }
}

/** Safe event helper: no-ops unless the visitor consented and the tag is initialised. Always sends a clean page_location. */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!active || typeof window.gtag !== 'function') return;
  try { window.gtag('event', name, { ...(params ?? {}), page_location: cleanUrl(), transport_type: 'beacon' }); } catch { /* analytics must never break the page */ }
}

/**
 * One page_view per page load / consent moment, plus service_page_view / portfolio_view on every route.
 * Client-side route changes are NOT sent as page_view from here: the GA4 stream's Enhanced Measurement
 * "Page changes based on browser history events" already emits exactly one page_view per router navigation
 * (its address-bar URL is clean, see sanitizeAddressBar). Sending ours too would double-count every navigation.
 * ponytail: if that stream setting is ever turned off, pass sendPageView=true for route changes (see ConsentBanner RouteTracker).
 */
let lastTracked = '';
export function trackPageView(pathname: string, sendPageView = true): void {
  if (!active) return;
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/ops' || path.startsWith('/ops/')) return;
  if (path === lastTracked) return; // StrictMode / double effect / consent-then-route guard
  lastTracked = path;
  const info = classifyPath(path);
  if (sendPageView) trackEvent('page_view', { page_path: path, page_type: info.page_type });
  if (info.page_type === 'service' || info.page_type === 'local_service') trackEvent('service_page_view', { page_path: path, service: info.service });
  if (info.page_type === 'portfolio') trackEvent('portfolio_view', { page_path: path, project: info.project });
  rememberAttrib(path, info);
}
/** Forget the last tracked path (used after consent withdrawal so a later re-consent counts the current page once). */
export function resetPageViewGuard(): void { lastTracked = ''; }

/**
 * Conversion click tracking via one delegated listener. Events (names unchanged):
 *   phone_click / email_click / gbp_click / contact_cta_click (cta_text, service, source_*) / package_cta_click
 */
function initClickTracking(): void {
  if (clickListening) return;
  clickListening = true;
  document.addEventListener(
    'click',
    (e) => {
      if (!active) return;
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
        trackEvent('contact_cta_click', { cta_text: ctaText, ...(service ? { service } : {}), ...readAttrib() });
      } else if (href.startsWith('/packages')) {
        trackEvent('package_cta_click', { cta_text: ctaText });
      }
    },
    { capture: true },
  );
}

/** Lead-form events. contact_form_start fires once per page visit; generate_lead only from the confirmed-success path. */
let formStartSent = false;
export function trackFormStart(): void {
  if (formStartSent) return;
  formStartSent = true;
  trackEvent('contact_form_start', { form: 'contact', ...readAttrib() });
}
export function trackLead(service: string): void {
  trackEvent('generate_lead', { form: 'contact', service: service || 'not-selected', ...readAttrib() });
}
export function resetFormStart(): void { formStartSent = false; }

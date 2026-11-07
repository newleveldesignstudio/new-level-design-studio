import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { readConsent } from '@/lib/consent';
import { setAnalyticsConsent, trackPageView, analyticsActive } from '@/lib/analytics';

export const OPEN_CONSENT_EVENT = 'nlds:open-consent';
const enabled = !!(import.meta.env.VITE_GA4_ID as string | undefined)?.startsWith('G-');

/** Service/portfolio events per route; page_view only for the page load (only runs while analytics is consented). */
function RouteTracker() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    // First run = the page load (our page_view). Later runs = router navigations: the stream's history-change page_view covers those.
    const isLoad = first.current; first.current = false;
    if (analyticsActive()) trackPageView(pathname, isLoad);
  }, [pathname]);
  return null;
}

/**
 * Analytics consent banner. Accept and Decline are the same component, size and style (equal prominence).
 * Renders nothing when the build carries no GA4 ID. Re-opened from the footer "Cookie Settings" button.
 */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    // Deferred so the prerendered HTML never contains the banner (it is decided per visitor in the browser).
    const t = window.setTimeout(() => { if (!(window as unknown as { __NLDS_PRERENDER?: boolean }).__NLDS_PRERENDER && readConsent() === null) setOpen(true); }, 0);
    const reopen = () => { returnFocus.current = document.activeElement as HTMLElement | null; setOpen(true); };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => { window.clearTimeout(t); window.removeEventListener(OPEN_CONSENT_EVENT, reopen); };
  }, []);

  useEffect(() => { if (open && returnFocus.current) acceptRef.current?.focus(); }, [open]);

  if (!enabled) return null;
  const choose = (c: 'granted' | 'denied') => {
    setAnalyticsConsent(c);
    setOpen(false);
    returnFocus.current?.focus?.();
    returnFocus.current = null;
  };
  return (
    <>
      <RouteTracker />
      {open && (
        <section className="nlds-consent" role="region" aria-label="Analytics cookies" style={{ position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 1000, maxWidth: 560, marginInline: 'auto', background: 'var(--surface)', color: 'var(--charcoal)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 20, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>
            With your permission, we use Google Analytics to measure which pages are visited. It sets cookies and sends page paths, your IP address and basic device information to Google. No form details are sent. You can change this any time with Cookie Settings in the footer. <a href="/privacy/#cookies" style={{ textDecoration: 'underline' }}>Privacy Policy</a>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 16 }}>
            <button ref={acceptRef} type="button" className="btn-secondary" style={{ flex: '1 1 200px', minWidth: 0, padding: '14px 20px', letterSpacing: '0.12em' }} data-consent="granted" onClick={() => choose('granted')}>Accept analytics</button>
            <button type="button" className="btn-secondary" style={{ flex: '1 1 200px', minWidth: 0, padding: '14px 20px', letterSpacing: '0.12em' }} data-consent="denied" onClick={() => choose('denied')}>Decline</button>
          </div>
        </section>
      )}
    </>
  );
}

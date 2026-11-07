/**
 * Analytics consent (opt-in). Nothing from Google loads, and no Google cookie is set, until the
 * visitor explicitly accepts. The choice lives in this site's own localStorage under a versioned key;
 * a stored grant from another version is NOT consent (the visitor is asked again).
 */
export const CONSENT_KEY = 'nlds-analytics-consent';
export const CONSENT_VERSION = 1;
export type ConsentChoice = 'granted' | 'denied';

/** Pure: parses a stored value. Only an explicit grant for the current version counts as granted. */
export function parseConsent(raw: string | null): ConsentChoice | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as { v?: unknown; choice?: unknown };
    if (v && v.choice === 'denied') return 'denied';
    if (v && v.choice === 'granted' && v.v === CONSENT_VERSION) return 'granted';
  } catch { /* corrupt value = no decision */ }
  return null;
}

export function readConsent(): ConsentChoice | null {
  try { return parseConsent(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
}

export function writeConsent(choice: ConsentChoice): void {
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, choice, at: Date.now() })); } catch { /* storage blocked: choice applies to this page view only */ }
}

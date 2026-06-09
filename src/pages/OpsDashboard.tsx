import { useState, useEffect, useCallback } from 'react';
import './OpsDashboard.css';

// ─── Security notice ──────────────────────────────────────────────────────────
// This is a basic front-end privacy gate, not true authentication.
// Do not store sensitive client data here.
// Replace later with Netlify Identity, server auth, or edge password protection.
const OPS_PASSWORD_HASH = '40e513757a5edcf4d8201dd6eb992dfe0b7713de37bc1c6055b08ae810d5105c';

async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const SESSION_KEY = 'nlds_ops_unlocked';

// ─── Hook ─────────────────────────────────────────────────────────────────────
function useLocalStorageState<T>(key: string, initialValue: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((v: T | ((prev: T) => T)) => {
    setState((prev) => {
      const next = typeof v === 'function' ? (v as (p: T) => T)(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* quota */ }
      return next;
    });
  }, [key]);

  return [state, setValue];
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface Campaign {
  clientName: string;
  industry: string;
  website: string;
  phone: string;
  location: string;
  offer: string;
  timeline: string;
  budget: string;
  notes: string;
}

interface Lead {
  id: string;
  businessName: string;
  industry: string;
  contact: string;
  location: string;
  websiteStatus: string;
  leadSource: string;
  offerPitched: string;
  status: string;
  followUpDate: string;
  notes: string;
}

interface CalendarEntry {
  id: string;
  day: string;
  platform: string;
  postType: string;
  topic: string;
  cta: string;
  status: string;
  notes: string;
}

interface QAScores {
  brandConsistency: number;
  readability: number;
  ctaClarity: number;
  localRelevance: number;
  offerClarity: number;
  mobileFriendliness: number;
  premiumFeel: number;
  noClutter: number;
  noUnnecessaryText: number;
  conversionStrength: number;
  criticalFixes: string;
}

const QA_CRITERIA: { key: keyof Omit<QAScores, 'criticalFixes'>; label: string }[] = [
  { key: 'brandConsistency',    label: 'Brand Consistency' },
  { key: 'readability',         label: 'Readability' },
  { key: 'ctaClarity',          label: 'CTA Clarity' },
  { key: 'localRelevance',      label: 'Local Relevance' },
  { key: 'offerClarity',        label: 'Offer Clarity' },
  { key: 'mobileFriendliness',  label: 'Mobile Friendliness' },
  { key: 'premiumFeel',         label: 'Premium Feel' },
  { key: 'noClutter',           label: 'No Clutter' },
  { key: 'noUnnecessaryText',   label: 'No Unnecessary Text' },
  { key: 'conversionStrength',  label: 'Conversion Strength' },
];

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const PLATFORMS = ['Instagram','Facebook Page','Facebook Group','Facebook Personal','Google Business','Email','Website'];
const POST_TYPES = ['Static Image','Carousel','Reel/Video','Story','Text','Blog Post','Offer'];
const STATUSES_LEAD = ['New','Active','Follow-Up','Proposal Sent','Closed – Won','Closed – Lost'];
const STATUSES_CAL = ['Draft','Ready','Scheduled','Published'];

const EMPTY_CAMPAIGN: Campaign = {
  clientName: '', industry: '', website: '', phone: '',
  location: '', offer: '', timeline: '', budget: '', notes: '',
};

const EMPTY_QA: QAScores = {
  brandConsistency: 0, readability: 0, ctaClarity: 0,
  localRelevance: 0, offerClarity: 0, mobileFriendliness: 0,
  premiumFeel: 0, noClutter: 0, noUnnecessaryText: 0,
  conversionStrength: 0, criticalFixes: '',
};

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hash = await sha256(pw);
    if (hash === OPS_PASSWORD_HASH) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onUnlock();
    } else {
      setError('Incorrect password.');
      setPw('');
    }
  }

  return (
    <div className="ops-gate">
      <div className="ops-gate-card">
        <p className="ops-gate-wordmark">New Level Design Studio</p>
        <p className="ops-gate-tagline">Raise the Standard.</p>
        <form onSubmit={handleSubmit}>
          <label className="ops-gate-label">Access Password</label>
          <input
            className="ops-gate-input"
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(''); }}
            autoFocus
            autoComplete="current-password"
          />
          {error && <p className="ops-gate-error">{error}</p>}
          <button className="ops-gate-btn" type="submit">Enter Dashboard</button>
        </form>
        <p className="ops-gate-notice">
          Internal use only — Port Orange, Florida.<br />
          newlvlstudio.com &nbsp;·&nbsp; (386) 846-5754
        </p>
      </div>
    </div>
  );
}

// ─── Social Graphics ──────────────────────────────────────────────────────────
const SOCIAL_LAYOUTS = [
  { key: 'fb_post',    label: 'Facebook Post Draft' },
  { key: 'ig_post',    label: 'Instagram Post Draft' },
  { key: 'gbp_post',   label: 'Google Business Profile' },
  { key: 'fb_group',   label: 'Facebook Group Post' },
];

function SocialGraphicsSection() {
  const [drafts, setDrafts] = useLocalStorageState<Record<string, string>>(
    'nlds_ops_social_drafts',
    {}
  );

  function update(key: string, val: string) {
    setDrafts((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Social Graphic Layout</h2>
        <p className="ops-section-sub">Draft copy for each platform format before designing.</p>
      </div>
      <div className="ops-grid2" style={{ gap: 20 }}>
        {SOCIAL_LAYOUTS.map(({ key, label }) => (
          <div key={key} className="ops-card">
            <p className="ops-card-title">{label}</p>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">Headline / Hook</label>
              <input className="ops-input" placeholder="Opening line or visual headline…" value={drafts[`${key}_hook`] ?? ''} onChange={(e) => update(`${key}_hook`, e.target.value)} />
            </div>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">Body Copy</label>
              <textarea className="ops-textarea" placeholder="Supporting copy, details, offer…" value={drafts[`${key}_body`] ?? ''} onChange={(e) => update(`${key}_body`, e.target.value)} />
            </div>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">CTA</label>
              <input className="ops-input" placeholder="Call to action text…" value={drafts[`${key}_cta`] ?? ''} onChange={(e) => update(`${key}_cta`, e.target.value)} />
            </div>
            <div className="ops-field">
              <label className="ops-label">Visual Direction</label>
              <input className="ops-input" placeholder="Describe the image or layout concept…" value={drafts[`${key}_visual`] ?? ''} onChange={(e) => update(`${key}_visual`, e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Flyer Layout ─────────────────────────────────────────────────────────────
const FLYER_TYPES = [
  { key: 'giveaway',      label: 'Giveaway Flyer' },
  { key: 'website_audit', label: 'Website Audit Flyer' },
  { key: 'service_offer', label: 'Service Offer Flyer' },
  { key: 'local_promo',   label: 'Local Promo Flyer' },
];

function FlyerSection() {
  const [flyers, setFlyers] = useLocalStorageState<Record<string, string>>(
    'nlds_ops_flyers',
    {}
  );

  function update(key: string, val: string) {
    setFlyers((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Flyer Layout</h2>
        <p className="ops-section-sub">Plan flyer copy and visual direction before production.</p>
      </div>
      <div className="ops-grid2" style={{ gap: 20 }}>
        {FLYER_TYPES.map(({ key, label }) => (
          <div key={key} className="ops-card">
            <p className="ops-card-title">{label}</p>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">Primary Headline</label>
              <input className="ops-input" placeholder="Bold headline for the flyer…" value={flyers[`${key}_headline`] ?? ''} onChange={(e) => update(`${key}_headline`, e.target.value)} />
            </div>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">Subheadline / Supporting Line</label>
              <input className="ops-input" placeholder="Second line or clarifying text…" value={flyers[`${key}_sub`] ?? ''} onChange={(e) => update(`${key}_sub`, e.target.value)} />
            </div>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">Offer / Details</label>
              <textarea className="ops-textarea" style={{ minHeight: 64 }} placeholder="What's the offer or key info…" value={flyers[`${key}_offer`] ?? ''} onChange={(e) => update(`${key}_offer`, e.target.value)} />
            </div>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">CTA + Contact Info</label>
              <input className="ops-input" placeholder="e.g. Call (386) 846-5754 or visit newlvlstudio.com" value={flyers[`${key}_cta`] ?? ''} onChange={(e) => update(`${key}_cta`, e.target.value)} />
            </div>
            <div className="ops-field">
              <label className="ops-label">Visual / Color Direction</label>
              <input className="ops-input" placeholder="Layout notes, image style, color mood…" value={flyers[`${key}_visual`] ?? ''} onChange={(e) => update(`${key}_visual`, e.target.value)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Carousel Planner ─────────────────────────────────────────────────────────
interface Slide {
  headline: string;
  body: string;
  visual: string;
  cta: string;
}

const EMPTY_SLIDE: Slide = { headline: '', body: '', visual: '', cta: '' };

function CarouselSection() {
  const [slideCount, setSlideCount] = useLocalStorageState<number>('nlds_ops_carousel_count', 5);
  const [topic, setTopic] = useLocalStorageState<string>('nlds_ops_carousel_topic', '');
  const [slides, setSlides] = useLocalStorageState<Slide[]>(
    'nlds_ops_carousel_slides',
    Array.from({ length: 5 }, () => ({ ...EMPTY_SLIDE }))
  );

  function updateCount(n: number) {
    setSlideCount(n);
    setSlides((prev) => {
      const next = [...prev];
      while (next.length < n) next.push({ ...EMPTY_SLIDE });
      return next.slice(0, n);
    });
  }

  function updateSlide(i: number, field: keyof Slide, val: string) {
    setSlides((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [field]: val };
      return next;
    });
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Carousel Planner</h2>
        <p className="ops-section-sub">Plan multi-slide posts slide by slide before designing.</p>
      </div>
      <div className="ops-card" style={{ marginBottom: 20 }}>
        <div className="ops-grid2" style={{ gap: 16, alignItems: 'end' }}>
          <div className="ops-field">
            <label className="ops-label">Carousel Topic / Series Name</label>
            <input className="ops-input" placeholder="e.g. 5 Signs Your Website Is Losing You Customers" value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Number of Slides</label>
            <select className="ops-select" value={slideCount} onChange={(e) => updateCount(Number(e.target.value))}>
              {[5,6,7,8].map((n) => <option key={n} value={n}>{n} Slides</option>)}
            </select>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {slides.slice(0, slideCount).map((slide, i) => (
          <div key={i} className="ops-slide-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4 }}>
              <span className="ops-slide-num">{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-text)' }}>
                {i === 0 ? 'Cover Slide' : i === slideCount - 1 ? 'CTA Slide' : `Slide ${i + 1}`}
              </span>
            </div>
            <div className="ops-grid2" style={{ gap: 12 }}>
              <div className="ops-field">
                <label className="ops-label">Headline</label>
                <input className="ops-input" placeholder="Bold slide headline…" value={slide.headline} onChange={(e) => updateSlide(i, 'headline', e.target.value)} />
              </div>
              <div className="ops-field">
                <label className="ops-label">Visual Direction</label>
                <input className="ops-input" placeholder="Image, icon, layout style…" value={slide.visual} onChange={(e) => updateSlide(i, 'visual', e.target.value)} />
              </div>
            </div>
            <div className="ops-field">
              <label className="ops-label">Body Copy</label>
              <textarea className="ops-textarea" style={{ minHeight: 64 }} placeholder="Supporting text for this slide…" value={slide.body} onChange={(e) => updateSlide(i, 'body', e.target.value)} />
            </div>
            {i === slideCount - 1 && (
              <div className="ops-field">
                <label className="ops-label">CTA</label>
                <input className="ops-input" placeholder="Final call to action…" value={slide.cta} onChange={(e) => updateSlide(i, 'cta', e.target.value)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Caption Bank ─────────────────────────────────────────────────────────────
const CAPTION_PLATFORMS = [
  { key: 'fb_personal',  label: 'Facebook Personal' },
  { key: 'fb_business',  label: 'Facebook Business Page' },
  { key: 'fb_group',     label: 'Facebook Group' },
  { key: 'instagram',    label: 'Instagram' },
  { key: 'gbp',          label: 'Google Business Profile' },
];

function CaptionBankSection() {
  const [activePlatform, setActivePlatform] = useState('fb_personal');
  const [captions, setCaptions] = useLocalStorageState<Record<string, string>>(
    'nlds_ops_captions',
    {}
  );
  const [hashtags, setHashtags] = useLocalStorageState<Record<string, string>>(
    'nlds_ops_hashtags',
    {}
  );

  function update(key: string, val: string) {
    setCaptions((prev) => ({ ...prev, [key]: val }));
  }
  function updateTags(key: string, val: string) {
    setHashtags((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Caption Bank</h2>
        <p className="ops-section-sub">Platform-specific caption drafts. Tone and length vary per platform.</p>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        {CAPTION_PLATFORMS.map(({ key, label }) => (
          <button key={key} className={`ops-caption-tab${activePlatform === key ? ' active' : ''}`} onClick={() => setActivePlatform(key)}>
            {label}
          </button>
        ))}
      </div>
      {CAPTION_PLATFORMS.filter(({ key }) => key === activePlatform).map(({ key, label }) => (
        <div key={key} className="ops-card">
          <p className="ops-card-title">{label} Caption</p>
          <div className="ops-field" style={{ marginBottom: 16 }}>
            <label className="ops-label">Hook (First Line)</label>
            <input className="ops-input" placeholder="The first line stops the scroll…" value={captions[`${key}_hook`] ?? ''} onChange={(e) => update(`${key}_hook`, e.target.value)} />
          </div>
          <div className="ops-field" style={{ marginBottom: 16 }}>
            <label className="ops-label">Full Caption</label>
            <textarea className="ops-textarea" style={{ minHeight: 140 }} placeholder={`Write the full ${label} caption here…`} value={captions[`${key}_full`] ?? ''} onChange={(e) => update(`${key}_full`, e.target.value)} />
          </div>
          <div className="ops-field" style={{ marginBottom: 16 }}>
            <label className="ops-label">CTA Line</label>
            <input className="ops-input" placeholder="e.g. DM us or visit the link in bio…" value={captions[`${key}_cta`] ?? ''} onChange={(e) => update(`${key}_cta`, e.target.value)} />
          </div>
          {(key === 'instagram' || key === 'fb_personal' || key === 'fb_group') && (
            <div className="ops-field">
              <label className="ops-label">Hashtags</label>
              <textarea className="ops-textarea" style={{ minHeight: 60 }} placeholder="#portorgange #websitedesign #localbusiness…" value={hashtags[key] ?? ''} onChange={(e) => updateTags(key, e.target.value)} />
            </div>
          )}
          {key === 'gbp' && (
            <div style={{ marginTop: 8, padding: '10px 14px', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--muted-text)' }}>
              Google Business Profile posts: 1,500 char max. Use location keywords. No hashtags. End with a direct URL or phone number.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Website Section Mockup ───────────────────────────────────────────────────
const WEBSITE_SECTIONS = [
  { key: 'hero',       label: 'Hero Section' },
  { key: 'service',    label: 'Service Block' },
  { key: 'cta',        label: 'CTA Section' },
  { key: 'pricing',    label: 'Pricing / Package Section' },
  { key: 'audit',      label: 'Website Audit Section' },
  { key: 'proof',      label: 'Proof / Testimonial Section' },
];

function WebsiteMockupSection() {
  const [mockups, setMockups] = useLocalStorageState<Record<string, string>>(
    'nlds_ops_mockups',
    {}
  );

  function update(key: string, val: string) {
    setMockups((prev) => ({ ...prev, [key]: val }));
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Website Section Mockup</h2>
        <p className="ops-section-sub">Plan copy and layout for each section before designing.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {WEBSITE_SECTIONS.map(({ key, label }) => (
          <div key={key} className="ops-card">
            <p className="ops-card-title">{label}</p>
            <div className="ops-grid2" style={{ gap: 16, marginBottom: 12 }}>
              <div className="ops-field">
                <label className="ops-label">Headline</label>
                <input className="ops-input" placeholder="Section headline…" value={mockups[`${key}_h`] ?? ''} onChange={(e) => update(`${key}_h`, e.target.value)} />
              </div>
              <div className="ops-field">
                <label className="ops-label">Subheadline</label>
                <input className="ops-input" placeholder="Supporting line or eyebrow…" value={mockups[`${key}_sub`] ?? ''} onChange={(e) => update(`${key}_sub`, e.target.value)} />
              </div>
            </div>
            <div className="ops-field" style={{ marginBottom: 12 }}>
              <label className="ops-label">Body Copy</label>
              <textarea className="ops-textarea" style={{ minHeight: 72 }} placeholder="Section body text…" value={mockups[`${key}_body`] ?? ''} onChange={(e) => update(`${key}_body`, e.target.value)} />
            </div>
            <div className="ops-grid2" style={{ gap: 16 }}>
              <div className="ops-field">
                <label className="ops-label">CTA</label>
                <input className="ops-input" placeholder="Button or link text…" value={mockups[`${key}_cta`] ?? ''} onChange={(e) => update(`${key}_cta`, e.target.value)} />
              </div>
              <div className="ops-field">
                <label className="ops-label">Layout / Visual Notes</label>
                <input className="ops-input" placeholder="Column structure, image placement…" value={mockups[`${key}_layout`] ?? ''} onChange={(e) => update(`${key}_layout`, e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Lead Tracker ─────────────────────────────────────────────────────────────
const EMPTY_LEAD: Omit<Lead, 'id'> = {
  businessName: '', industry: '', contact: '', location: '',
  websiteStatus: '', leadSource: '', offerPitched: '', status: 'New',
  followUpDate: '', notes: '',
};

function LeadTrackerSection() {
  const [leads, setLeads] = useLocalStorageState<Lead[]>('nlds_ops_leads', []);
  const [form, setForm] = useState({ ...EMPTY_LEAD });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [scriptLead, setScriptLead] = useState<Lead | null>(null);

  function updateForm(field: keyof typeof form, val: string) {
    setForm((prev) => ({ ...prev, [field]: val }));
  }

  function saveLead() {
    if (!form.businessName.trim()) return;
    if (editingId) {
      setLeads((prev) => prev.map((l) => l.id === editingId ? { ...form, id: editingId } : l));
      setEditingId(null);
    } else {
      setLeads((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }
    setForm({ ...EMPTY_LEAD });
  }

  function editLead(lead: Lead) {
    const { id, ...rest } = lead;
    setForm(rest);
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteLead(id: string) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function generateScript(lead: Lead): string {
    return `Hi, is this ${lead.contact || '[contact name]'}? This is Michael Vail from New Level Design Studio in Port Orange. I specialize in website design and visual content for local businesses — I came across ${lead.businessName} and wanted to reach out about ${lead.offerPitched || 'how we might help strengthen your online presence'}. Do you have two minutes?`;
  }

  const statusBadge = (s: string) => {
    if (s === 'Active') return 'ops-badge-active';
    if (s === 'Follow-Up') return 'ops-badge-follow';
    if (s.includes('Won')) return 'ops-badge-pass';
    if (s.includes('Lost')) return 'ops-badge-closed';
    return 'ops-badge-new';
  };

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Lead Tracker</h2>
        <p className="ops-section-sub">{leads.length} lead{leads.length !== 1 ? 's' : ''} tracked &nbsp;·&nbsp; Port Orange · Daytona Beach · Volusia County</p>
      </div>

      {/* Form */}
      <div className="ops-card" style={{ marginBottom: 24 }}>
        <p className="ops-card-title">{editingId ? 'Edit Lead' : 'Add New Lead'}</p>
        <div className="ops-grid3" style={{ gap: 12, marginBottom: 12 }}>
          <div className="ops-field">
            <label className="ops-label">Business Name *</label>
            <input className="ops-input" placeholder="e.g. Harbor Plumbing Co." value={form.businessName} onChange={(e) => updateForm('businessName', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Industry</label>
            <input className="ops-input" placeholder="e.g. Plumbing, Restaurant" value={form.industry} onChange={(e) => updateForm('industry', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Contact Person</label>
            <input className="ops-input" placeholder="Name / role" value={form.contact} onChange={(e) => updateForm('contact', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Location</label>
            <input className="ops-input" placeholder="Port Orange, Daytona…" value={form.location} onChange={(e) => updateForm('location', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Website Status</label>
            <input className="ops-input" placeholder="None / Outdated / Has one" value={form.websiteStatus} onChange={(e) => updateForm('websiteStatus', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Lead Source</label>
            <input className="ops-input" placeholder="Instagram / Referral / Cold…" value={form.leadSource} onChange={(e) => updateForm('leadSource', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Offer Pitched</label>
            <input className="ops-input" placeholder="e.g. Website Review, Starter Pack" value={form.offerPitched} onChange={(e) => updateForm('offerPitched', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Status</label>
            <select className="ops-select" value={form.status} onChange={(e) => updateForm('status', e.target.value)}>
              {STATUSES_LEAD.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="ops-field">
            <label className="ops-label">Follow-Up Date</label>
            <input className="ops-input" type="date" value={form.followUpDate} onChange={(e) => updateForm('followUpDate', e.target.value)} />
          </div>
        </div>
        <div className="ops-field" style={{ marginBottom: 16 }}>
          <label className="ops-label">Notes</label>
          <textarea className="ops-textarea" style={{ minHeight: 60 }} placeholder="Context, pain points, next step…" value={form.notes} onChange={(e) => updateForm('notes', e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="ops-btn ops-btn-primary" onClick={saveLead}>
            {editingId ? 'Update Lead' : 'Add Lead'}
          </button>
          {editingId && (
            <button className="ops-btn ops-btn-secondary" onClick={() => { setEditingId(null); setForm({ ...EMPTY_LEAD }); }}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {leads.length > 0 && (
        <div className="ops-table-wrap">
          <table className="ops-table">
            <thead>
              <tr>
                <th>Business</th>
                <th>Industry</th>
                <th>Contact</th>
                <th>Source</th>
                <th>Offer</th>
                <th>Status</th>
                <th>Follow-Up</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ fontWeight: 500 }}>{lead.businessName}</td>
                  <td style={{ color: 'var(--muted-text)' }}>{lead.industry}</td>
                  <td style={{ color: 'var(--muted-text)' }}>{lead.contact}</td>
                  <td style={{ color: 'var(--muted-text)' }}>{lead.leadSource}</td>
                  <td style={{ color: 'var(--muted-text)' }}>{lead.offerPitched}</td>
                  <td><span className={`ops-badge ${statusBadge(lead.status)}`}>{lead.status}</span></td>
                  <td style={{ color: 'var(--muted-text)' }}>{lead.followUpDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="ops-btn ops-btn-secondary" style={{ padding: '5px 10px', fontSize: '0.6rem' }} onClick={() => editLead(lead)}>Edit</button>
                      <button className="ops-btn ops-btn-secondary" style={{ padding: '5px 10px', fontSize: '0.6rem' }} onClick={() => setScriptLead(scriptLead?.id === lead.id ? null : lead)}>Script</button>
                      <button className="ops-btn ops-btn-danger" onClick={() => deleteLead(lead.id)}>✕</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Script generator */}
      {scriptLead && (
        <div className="ops-card" style={{ marginTop: 20, borderLeft: '3px solid var(--charcoal)' }}>
          <p className="ops-card-title">Follow-Up Script — {scriptLead.businessName}</p>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: 'var(--charcoal)' }}>
            {generateScript(scriptLead)}
          </p>
          <button className="ops-btn ops-btn-secondary" style={{ marginTop: 12 }} onClick={() => setScriptLead(null)}>Close</button>
        </div>
      )}

      {leads.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted-text)', fontSize: '0.875rem' }}>
          No leads yet. Add your first one above.
        </div>
      )}
    </div>
  );
}

// ─── Content Calendar ─────────────────────────────────────────────────────────
function CalendarSection() {
  const [entries, setEntries] = useLocalStorageState<CalendarEntry[]>('nlds_ops_content_calendar', []);
  const [week, setWeek] = useLocalStorageState<string>('nlds_ops_cal_week', '');

  function getEntry(day: string): CalendarEntry | undefined {
    return entries.find((e) => e.day === day);
  }

  function updateEntry(day: string, field: keyof Omit<CalendarEntry, 'id' | 'day'>, val: string) {
    setEntries((prev) => {
      const existing = prev.find((e) => e.day === day);
      if (existing) {
        return prev.map((e) => e.day === day ? { ...e, [field]: val } : e);
      }
      return [...prev, { id: Date.now().toString(), day, platform: '', postType: '', topic: '', cta: '', status: 'Draft', notes: '', [field]: val }];
    });
  }

  function clearDay(day: string) {
    setEntries((prev) => prev.filter((e) => e.day !== day));
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Content Calendar</h2>
        <p className="ops-section-sub">Plan the full week across platforms before executing.</p>
      </div>
      <div className="ops-card" style={{ marginBottom: 20, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
        <label className="ops-label" style={{ margin: 0, whiteSpace: 'nowrap' }}>Week of</label>
        <input className="ops-input" type="date" style={{ width: 'auto' }} value={week} onChange={(e) => setWeek(e.target.value)} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DAYS.map((day) => {
          const entry = getEntry(day);
          return (
            <div key={day} className="ops-card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--charcoal)' }}>{day}</span>
                {entry && <button className="ops-btn ops-btn-danger" style={{ padding: '4px 10px' }} onClick={() => clearDay(day)}>Clear</button>}
              </div>
              <div className="ops-grid3" style={{ gap: 10, marginBottom: 10 }}>
                <div className="ops-field">
                  <label className="ops-label">Platform</label>
                  <select className="ops-select" value={entry?.platform ?? ''} onChange={(e) => updateEntry(day, 'platform', e.target.value)}>
                    <option value="">—</option>
                    {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="ops-field">
                  <label className="ops-label">Post Type</label>
                  <select className="ops-select" value={entry?.postType ?? ''} onChange={(e) => updateEntry(day, 'postType', e.target.value)}>
                    <option value="">—</option>
                    {POST_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="ops-field">
                  <label className="ops-label">Status</label>
                  <select className="ops-select" value={entry?.status ?? 'Draft'} onChange={(e) => updateEntry(day, 'status', e.target.value)}>
                    {STATUSES_CAL.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="ops-grid2" style={{ gap: 10 }}>
                <div className="ops-field">
                  <label className="ops-label">Topic</label>
                  <input className="ops-input" placeholder="What's this post about?" value={entry?.topic ?? ''} onChange={(e) => updateEntry(day, 'topic', e.target.value)} />
                </div>
                <div className="ops-field">
                  <label className="ops-label">CTA</label>
                  <input className="ops-input" placeholder="Desired action" value={entry?.cta ?? ''} onChange={(e) => updateEntry(day, 'cta', e.target.value)} />
                </div>
              </div>
              <div className="ops-field" style={{ marginTop: 10 }}>
                <label className="ops-label">Notes</label>
                <input className="ops-input" placeholder="Visual direction, hashtags, links…" value={entry?.notes ?? ''} onChange={(e) => updateEntry(day, 'notes', e.target.value)} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── QA Panel ─────────────────────────────────────────────────────────────────
const SCORE_OPTIONS = [0, 2, 4, 6, 8, 10];

function QASection() {
  const [scores, setScores] = useLocalStorageState<QAScores>('nlds_ops_qa_scores', { ...EMPTY_QA });

  function setScore(key: keyof Omit<QAScores, 'criticalFixes'>, val: number) {
    setScores((prev) => ({ ...prev, [key]: val }));
  }

  const totalScore = QA_CRITERIA.reduce((sum, { key }) => sum + (scores[key] as number), 0);
  const maxScore = QA_CRITERIA.length * 10;
  const passed = totalScore >= 70;

  const readyChecklist = [
    'Brand fonts and colors are consistent throughout',
    'CTA is clear, direct, and mobile-tappable',
    'Local keyword or location reference is present',
    'No clutter — every element earns its place',
    'Image quality is sharp, not pixelated or stretched',
    'Caption or copy has been reviewed for spelling',
    'Link or contact method is visible and working',
    'Mobile layout tested or confirmed',
  ];

  function resetQA() {
    setScores({ ...EMPTY_QA });
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Strict QA Panel</h2>
        <p className="ops-section-sub">Score every piece before it goes out. Minimum passing score: 70 / 100.</p>
      </div>

      <div className="ops-card" style={{ marginBottom: 20 }}>
        <p className="ops-card-title">Score Each Criterion (0 – 10)</p>
        {QA_CRITERIA.map(({ key, label }) => (
          <div key={key} className="ops-qa-row">
            <span className="ops-qa-criterion">{label}</span>
            <div className="ops-qa-score-inputs">
              {SCORE_OPTIONS.map((n) => (
                <button
                  key={n}
                  className={`ops-qa-score-btn${(scores[key] as number) === n ? ' selected' : ''}`}
                  onClick={() => setScore(key, n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Score summary */}
      <div className="ops-score-box" style={{ marginBottom: 20 }}>
        <div className="ops-qa-total">
          <span className="ops-qa-score-big">{totalScore}</span>
          <span className="ops-qa-score-denom">/ {maxScore}</span>
        </div>
        <div>
          <span className={`ops-badge ${passed ? 'ops-badge-pass' : 'ops-badge-fail'}`} style={{ fontSize: '0.75rem', padding: '6px 14px' }}>
            {passed ? 'PASS — Ready to Review' : 'FAIL — Needs Fixes'}
          </span>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: 8 }}>
            {totalScore < 50 && 'Significant issues — do not post.'}
            {totalScore >= 50 && totalScore < 70 && 'Fix critical items before posting.'}
            {totalScore >= 70 && totalScore < 85 && 'Acceptable. Minor polish recommended.'}
            {totalScore >= 85 && 'Strong. Ready to post.'}
          </p>
        </div>
        <button className="ops-btn ops-btn-secondary" onClick={resetQA} style={{ alignSelf: 'flex-start' }}>
          Reset Scores
        </button>
      </div>

      {/* Critical fixes */}
      <div className="ops-card" style={{ marginBottom: 20 }}>
        <p className="ops-card-title">Critical Fixes Required</p>
        <textarea
          className="ops-textarea"
          style={{ minHeight: 100 }}
          placeholder="List anything that must be fixed before this piece can be posted…"
          value={scores.criticalFixes}
          onChange={(e) => setScores((prev) => ({ ...prev, criticalFixes: e.target.value }))}
        />
      </div>

      {/* Ready checklist */}
      <div className="ops-card">
        <p className="ops-card-title">Ready-to-Post Checklist</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {readyChecklist.map((item, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0', borderBottom: i < readyChecklist.length - 1 ? '1px solid var(--border-color)' : 'none', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>
              <input type="checkbox" style={{ marginTop: 3, accentColor: 'var(--charcoal)', flexShrink: 0 }} />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Campaign Setup (persisted) ───────────────────────────────────────────────
function CampaignSetupSection() {
  const [campaign, setCampaign] = useLocalStorageState<Campaign>('nlds_ops_campaign', { ...EMPTY_CAMPAIGN });

  function update(field: keyof Campaign, val: string) {
    setCampaign((prev) => ({ ...prev, [field]: val }));
  }

  return (
    <div>
      <div className="ops-section-header">
        <h2 className="ops-section-title">Campaign Setup</h2>
        <p className="ops-section-sub">Define the client and campaign context before building content.</p>
      </div>
      <div className="ops-card">
        <div className="ops-grid3" style={{ gap: 16, marginBottom: 16 }}>
          <div className="ops-field">
            <label className="ops-label">Client / Business Name</label>
            <input className="ops-input" placeholder="e.g. Harbor Plumbing Co." value={campaign.clientName} onChange={(e) => update('clientName', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Industry</label>
            <input className="ops-input" placeholder="e.g. Plumbing, Restaurant" value={campaign.industry} onChange={(e) => update('industry', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Website</label>
            <input className="ops-input" placeholder="https://…" value={campaign.website} onChange={(e) => update('website', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Phone</label>
            <input className="ops-input" placeholder="(386) 000-0000" value={campaign.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Location</label>
            <input className="ops-input" placeholder="Port Orange, FL" value={campaign.location} onChange={(e) => update('location', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Primary Offer</label>
            <input className="ops-input" placeholder="Website Design, Starter Pack…" value={campaign.offer} onChange={(e) => update('offer', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Timeline</label>
            <input className="ops-input" placeholder="e.g. 3 weeks" value={campaign.timeline} onChange={(e) => update('timeline', e.target.value)} />
          </div>
          <div className="ops-field">
            <label className="ops-label">Budget Range</label>
            <input className="ops-input" placeholder="e.g. $1,500 – $3,000" value={campaign.budget} onChange={(e) => update('budget', e.target.value)} />
          </div>
        </div>
        <div className="ops-field">
          <label className="ops-label">Campaign Notes</label>
          <textarea className="ops-textarea" style={{ minHeight: 90 }} placeholder="Pain points, goals, tone direction, anything relevant…" value={campaign.notes} onChange={(e) => update('notes', e.target.value)} />
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--muted-text)', marginTop: 12, letterSpacing: '0.05em' }}>
          All fields auto-save to localStorage.
        </p>
      </div>
    </div>
  );
}

// ─── Tabs config ──────────────────────────────────────────────────────────────
const TABS = [
  { id: 'campaign',  label: 'Campaign' },
  { id: 'social',    label: 'Social Graphics' },
  { id: 'flyer',     label: 'Flyers' },
  { id: 'carousel',  label: 'Carousel' },
  { id: 'captions',  label: 'Caption Bank' },
  { id: 'website',   label: 'Website Mockup' },
  { id: 'leads',     label: 'Lead Tracker' },
  { id: 'calendar',  label: 'Calendar' },
  { id: 'qa',        label: 'QA Panel' },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function OpsDashboard() {
  const [activeTab, setActiveTab] = useState('campaign');
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1');

  // noindex + title for this private route
  useEffect(() => {
    document.title = 'NLDS Creative Ops Dashboard';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
    }
    meta.content = 'noindex, nofollow';
    return () => {
      document.title = 'New Level Design Studio';
      if (meta) meta.content = 'index, follow';
    };
  }, []);

  function lock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  }

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="ops-root">
      {/* Top bar */}
      <div className="ops-topbar">
        <div className="ops-topbar-brand">
          <span className="ops-topbar-wordmark">New Level Design Studio</span>
          <span className="ops-topbar-badge">Internal Ops</span>
        </div>
        <button className="ops-lock-btn" onClick={lock}>Lock</button>
      </div>

      {/* Tab bar */}
      <div className="ops-tab-bar">
        <div className="ops-tab-bar-inner">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              className={`ops-tab${activeTab === id ? ' active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="ops-body">
        {activeTab === 'campaign'  && <CampaignSetupSection />}
        {activeTab === 'social'    && <SocialGraphicsSection />}
        {activeTab === 'flyer'     && <FlyerSection />}
        {activeTab === 'carousel'  && <CarouselSection />}
        {activeTab === 'captions'  && <CaptionBankSection />}
        {activeTab === 'website'   && <WebsiteMockupSection />}
        {activeTab === 'leads'     && <LeadTrackerSection />}
        {activeTab === 'calendar'  && <CalendarSection />}
        {activeTab === 'qa'        && <QASection />}
      </div>
    </div>
  );
}

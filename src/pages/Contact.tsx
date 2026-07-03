import { useState } from 'react';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SEO from '@/components/SEO';
import { motion, useReducedMotion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/motion';
import { EXTERNAL_LINKS } from '@/lib/links';
import { SOCIAL_LINKS } from '@/lib/socialLinks';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const shouldReduceMotion = useReducedMotion();

  const formRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, stagger: 0.08, start: 'top 80%', childSelector: '.form-field' });
  const infoRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, stagger: 0, start: 'top 80%' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/netlify-forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact',
          name: formData.name,
          'business-name': formData.businessName,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          service: formData.service,
          message: formData.message,
        }).toString(),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', businessName: '', email: '', phone: '', website: '', service: '', message: '' });
      } else {
        console.error(`Netlify Forms submission failed: HTTP ${response.status}`, await response.text().catch(() => ''));
        setStatus('error');
      }
    } catch (err) {
      console.error('Netlify Forms submission error:', err);
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: 16,
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border-color)',
    borderRadius: 0,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '1rem',
    color: 'var(--charcoal)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '0.75rem',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--muted-text)',
    marginBottom: 8,
    display: 'block',
  };

  return (
    <div>
      <SEO
        title="Free Website Review — Port Orange FL | NLDS"
        description="Request a free website review from New Level Design Studio. We'll tell you what your site is communicating to new visitors — and what it would take to strengthen it."
        canonical="https://newlvlstudio.com/contact"
      />
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <motion.div
          className="container-nlds"
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p className="eyebrow" variants={shouldReduceMotion ? undefined : fadeUp}>CONTACT</motion.p>
          <motion.h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Get Your Free Website Review.
          </motion.h1>
          <motion.p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', maxWidth: 560, lineHeight: 1.6 }}
            variants={shouldReduceMotion ? undefined : fadeUp}
          >
            Tell us about your business and your current website. We'll review it and tell you what it's communicating to new visitors — and what it would take to strengthen it. No commitment required.
          </motion.p>
          <motion.div className="mt-20" variants={shouldReduceMotion ? undefined : fadeUp}>
            <SectionDivider />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Form + Info */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form / Success / Error */}
            <div ref={formRef} className="lg:col-span-2">

              {status === 'success' ? (
                <div style={{ padding: '48px 0' }}>
                  <p
                    className="font-sans uppercase"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--muted-text)' }}
                  >
                    Review Requested
                  </p>
                  <h2
                    className="font-serif mt-4"
                    style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', color: 'var(--charcoal)', lineHeight: 1.15 }}
                  >
                    Your review request is in.
                  </h2>
                  <p
                    className="font-sans mt-4"
                    style={{ fontSize: '1rem', color: 'var(--muted-text)', lineHeight: 1.65, maxWidth: 480 }}
                  >
                    We'll review your website and follow up within 1–2 business days at the email address you provided.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-secondary mt-8 inline-block"
                    style={{ background: 'none', cursor: 'pointer' }}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="flex flex-col"
                  style={{ gap: 24 }}
                >
                  {/* Required hidden fields for Netlify */}
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Honeypot — hidden at HTML level, not just CSS */}
                  <div hidden aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="bot-field">Don't fill this out if you're human:</label>
                    <input
                      id="bot-field"
                      name="bot-field"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label style={labelStyle} htmlFor="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={inputStyle}
                        placeholder="Your name"
                        autoComplete="name"
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="contact-business">Business Name</label>
                      <input
                        id="contact-business"
                        type="text"
                        name="business-name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        style={inputStyle}
                        placeholder="Your business"
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label style={labelStyle} htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={inputStyle}
                        placeholder="you@business.com"
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="contact-phone">Phone</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={inputStyle}
                        placeholder="(386) 555-0123"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label style={labelStyle} htmlFor="contact-website">Current Website <span style={{ textTransform: 'none', letterSpacing: 0, fontSize: '0.7rem' }}>(optional)</span></label>
                    <input
                      id="contact-website"
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      style={inputStyle}
                      placeholder="https://yourbusiness.com"
                      autoComplete="url"
                    />
                  </div>

                  <div className="form-field">
                    <label style={labelStyle} htmlFor="contact-service">What do you need help with?</label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      style={{ ...inputStyle, appearance: 'auto', cursor: 'pointer' }}
                    >
                      <option value="">Select a service</option>
                      <option value="website-review">Website Review</option>
                      <option value="starter-website">Starter Website</option>
                      <option value="business-website">Business Website</option>
                      <option value="website-redesign">Website Redesign</option>
                      <option value="visual-starter-pack">Visual Starter Pack</option>
                      <option value="website-maintenance">Website Care</option>
                      <option value="local-seo">Local SEO / Website Structure</option>
                      <option value="branding">Branding / Visual Direction</option>
                      <option value="short-form-content">Short-Form Video — Custom Project</option>
                      <option value="not-sure">Not Sure Yet</option>
                    </select>
                    {formData.service === 'website-review' && (
                      <p
                        className="font-sans mt-2"
                        style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.55 }}
                      >
                        In the message below, include your current website URL, what feels weak or unclear, and your main goal — calls, quote requests, bookings, credibility, or local SEO.
                      </p>
                    )}
                  </div>

                  <div className="form-field">
                    <label style={labelStyle} htmlFor="contact-message">Tell us about your project</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{ ...inputStyle, minHeight: 150, resize: 'vertical' }}
                      placeholder="Describe what you're looking for..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="form-field flex flex-col" style={{ gap: 12 }}>
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto"
                      disabled={status === 'submitting'}
                      style={status === 'submitting' ? { opacity: 0.6, cursor: 'not-allowed' } : undefined}
                    >
                      {status === 'submitting' ? 'Submitting…' : 'Request Free Review'}
                    </button>

                    {status === 'error' && (
                      <p
                        className="font-sans"
                        style={{ fontSize: '0.875rem', color: '#b00020', lineHeight: 1.5 }}
                        role="alert"
                      >
                        Something went wrong. Please try again or email us directly at{' '}
                        <a href="mailto:michael@newlvlstudio.com" style={{ color: 'inherit' }}>
                          michael@newlvlstudio.com
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Contact Info — unchanged */}
            <div ref={infoRef} className="flex flex-col" style={{ gap: 32 }}>
              <div>
                <p className="eyebrow">PHONE</p>
                <a
                  href="tel:+13868465754"
                  className="font-sans mt-3 block no-underline transition-colors duration-200"
                  style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                >
                  (386) 846-5754
                </a>
              </div>

              <div>
                <p className="eyebrow">EMAIL</p>
                <a
                  href="mailto:michael@newlvlstudio.com"
                  className="font-sans mt-3 block no-underline transition-colors duration-200"
                  style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                >
                  michael@newlvlstudio.com
                </a>
              </div>

              <div>
                <p className="eyebrow">LOCATION</p>
                <p className="font-sans mt-3" style={{ fontSize: '1rem', color: 'var(--charcoal)' }}>
                  Port Orange, FL 32127
                </p>
                <p className="font-sans mt-2" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                  Daytona Beach, Volusia County &amp; Central Florida
                </p>
                <a
                  href={EXTERNAL_LINKS.googleBusinessProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans mt-3 block no-underline transition-colors duration-200"
                  style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                >
                  View New Level Design Studio on Google
                </a>
              </div>

              <div className="mt-4" style={{ padding: 24, backgroundColor: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}>
                <p className="eyebrow">SERVICE AREA</p>
                <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
                  {['Port Orange', 'Daytona Beach', 'Ormond Beach', 'New Smyrna Beach', 'Volusia County', 'Central Florida'].map((area) => (
                    <span
                      key={area}
                      className="font-sans"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--muted-text)',
                        padding: '6px 12px',
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow">STUDIO</p>
                <p className="font-sans mt-3" style={{ fontSize: '0.9375rem', color: 'var(--charcoal)', lineHeight: 1.5 }}>
                  New Level Design Studio
                </p>
                <p className="font-sans mt-2" style={{ fontSize: '0.875rem', color: 'var(--muted-text)', lineHeight: 1.6 }}>
                  Websites, brand direction, local SEO structure, and website care for local businesses across Volusia County.
                </p>
                <p className="font-sans mt-3" style={{ fontSize: '0.875rem', color: 'var(--muted-text)' }}>
                  I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Follow on social */}
              <div style={{ borderTop: '1px solid var(--silver-grey)', paddingTop: 24 }}>
                <p
                  className="font-sans"
                  style={{ fontSize: '0.875rem', color: 'var(--charcoal)', lineHeight: 1.5 }}
                >
                  Prefer to connect first?
                </p>
                <p
                  className="font-sans mt-2"
                  style={{ fontSize: '0.8125rem', color: 'var(--muted-text)', lineHeight: 1.6 }}
                >
                  Follow New Level Design Studio for website launches, design breakdowns, and local business updates.
                </p>
                <nav aria-label="Follow NLDS on social media" className="mt-3">
                  <div className="flex flex-wrap">
                    {SOCIAL_LINKS.map((social, i) => (
                      <span key={social.platform}>
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.ariaLabel}
                          className="font-sans no-underline transition-colors duration-200"
                          style={{ fontSize: '0.8125rem', color: 'var(--muted-text)' }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--charcoal)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--muted-text)'; }}
                        >
                          {social.platform}
                        </a>
                        {i < SOCIAL_LINKS.length - 1 && (
                          <span
                            aria-hidden="true"
                            style={{ margin: '0 6px', color: 'var(--silver-grey)', fontSize: '0.8125rem' }}
                          >
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

import { useState } from 'react';
import SectionDivider from '@/components/SectionDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const formRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.6, stagger: 0.08, start: 'top 80%', childSelector: '.form-field' });
  const infoRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, stagger: 0, start: 'top 80%' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you within 1-2 business days.');
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
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--bg-main)', paddingTop: 140, paddingBottom: 0 }}>
        <div className="container-nlds">
          <p className="eyebrow">CONTACT</p>
          <h1
            className="font-serif mt-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--charcoal)' }}
          >
            Start a Project.
          </h1>
          <p
            className="font-sans mt-6"
            style={{ fontSize: '1rem', color: 'var(--muted-text)', maxWidth: 560, lineHeight: 1.6 }}
          >
            Tell us about your business and what you're looking to build. We'll get back to you within 1-2 business days.
          </p>
          <div className="mt-20">
            <SectionDivider />
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section style={{ backgroundColor: 'var(--bg-main)', padding: '100px 0' }}>
        <div className="container-nlds">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Form */}
            <div ref={formRef} className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: 24 }}>
                <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label style={labelStyle}>Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={inputStyle}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Business Name</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      style={inputStyle}
                      placeholder="Your business"
                    />
                  </div>
                </div>

                <div className="form-field grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      placeholder="you@business.com"
                      required
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={inputStyle}
                      placeholder="(386) 555-0123"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label style={labelStyle}>What do you need help with?</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{ ...inputStyle, appearance: 'auto', cursor: 'pointer' }}
                  >
                    <option value="">Select a service</option>
                    <option value="website">Website Design</option>
                    <option value="brand">Brand Visuals</option>
                    <option value="video">Short-Form Video</option>
                    <option value="support">Ongoing Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label style={labelStyle}>Tell us about your project</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, minHeight: 150, resize: 'vertical' }}
                    placeholder="Describe what you're looking for..."
                    rows={6}
                    required
                  />
                </div>

                <div className="form-field">
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
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
                  href="mailto:hello@newlvlstudio.com"
                  className="font-sans mt-3 block no-underline transition-colors duration-200"
                  style={{ fontSize: '1rem', color: 'var(--charcoal)' }}
                >
                  hello@newlvlstudio.com
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
              </div>

              <div className="mt-4" style={{ padding: 24, backgroundColor: 'var(--bg-soft)', border: '1px solid var(--border-color)' }}>
                <p className="eyebrow">SERVICE AREA</p>
                <div className="mt-3 flex flex-wrap" style={{ gap: 8 }}>
                  {['Port Orange', 'Daytona Beach', 'Volusia County', 'Central Florida'].map((area) => (
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
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

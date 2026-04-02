import { useState } from 'react';
import './FooterPage.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSent(true); setSending(false); }, 1200);
  };

  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Get in touch</p>
          <h1>We'd love to hear from you</h1>
          <p>Whether it's a question, a complaint, a partnership idea, or just a hello — we read every message.</p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-contact-grid">
          <div className="fp-contact-info">
            {[
              { icon: '📧', title: 'General enquiries', body: 'hello@stayease.com\nWe respond within 4 hours' },
              { icon: '🛎️', title: 'Booking support', body: 'support@stayease.com\nAvailable 24/7' },
              { icon: '🤝', title: 'Hotel partnerships', body: 'partners@stayease.com\nList your property with us' },
              { icon: '📰', title: 'Press & media', body: 'press@stayease.com\nMedia kits and interviews' },
              { icon: '📍', title: 'Head office', body: '14 Ozumba Mbadiwe Ave\nVictoria Island, Lagos, Nigeria' },
            ].map(c => (
              <div key={c.title} className="fp-contact-item">
                <span className="fp-contact-item-icon">{c.icon}</span>
                <div>
                  <h5>{c.title}</h5>
                  <p style={{ whiteSpace: 'pre-line' }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{ marginBottom: 24 }}>Send us a message</h2>
            {sent ? (
              <div className="fp-form-success">
                ✓ Message sent! We'll get back to you within 4 hours. Thank you for reaching out.
              </div>
            ) : (
              <form className="fp-form" onSubmit={handleSubmit}>
                <div className="fp-form-row">
                  <div className="fp-field">
                    <label>Full name</label>
                    <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Doe" required />
                  </div>
                  <div className="fp-field">
                    <label>Email address</label>
                    <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@email.com" required />
                  </div>
                </div>
                <div className="fp-field">
                  <label>Subject</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)} required>
                    <option value="">Select a topic...</option>
                    <option>Booking enquiry</option>
                    <option>Cancellation / refund</option>
                    <option>Property partnership</option>
                    <option>Technical issue</option>
                    <option>Press / media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="fp-field">
                  <label>Message</label>
                  <textarea rows="6" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help..." required />
                </div>
                <button type="submit" className="fp-submit" disabled={sending}>
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
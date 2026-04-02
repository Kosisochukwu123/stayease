import { useState } from 'react';
import './FooterPage.css';

const FAQS = [
  { q: 'How do I make a booking?', a: 'Search for your destination and dates on the homepage or Explore page. Click on a hotel you like, select your check-in and check-out dates, then click "Reserve Now". Fill in your guest details and submit — you\'ll receive a confirmation instantly.' },
  { q: 'Is payment taken at booking or at the hotel?', a: 'For most properties on StayEase, payment is made directly at the hotel on arrival. You won\'t be charged at the time of booking — we simply hold your reservation. The price shown is guaranteed.' },
  { q: 'Can I cancel or modify my booking?', a: 'Yes. Most properties on StayEase offer free cancellation up to 24 hours before check-in. You can view and manage your bookings from the "My Trips" page after signing in.' },
  { q: 'What is the damage deposit?', a: 'Some properties require a refundable damage deposit collected at check-in — typically 15% of your total stay cost. This is returned in full within 5 business days after check-out, provided no damage has occurred. It is not an additional charge on top of your room rate.' },
  { q: 'I didn\'t receive a confirmation email. What should I do?', a: 'First check your spam or junk folder. If it\'s not there, log into your StayEase account and visit "My Trips" — your booking will appear there. You can also contact us at support@stayease.com with your booking reference.' },
  { q: 'How do I become an admin / list my property?', a: 'If you\'re a property owner interested in listing on StayEase, please contact us at partners@stayease.com. Our team will review your property and get back to you within 48 hours.' },
  { q: 'What happens if the hotel is fully booked on my dates?', a: 'Our system checks availability in real time. If a hotel shows as available, you can book it. If a conflict occurs after booking (rare), our support team will contact you immediately to arrange an alternative at no extra cost.' },
  { q: 'Can I book on behalf of someone else?', a: 'Yes. During the guest details step, select "Booking for someone else" and enter the guest\'s name. The booking confirmation will be sent to your email address.' },
];

export default function HelpCentre() {
  const [open, setOpen] = useState(null);

  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Help centre</p>
          <h1>How can we help you?</h1>
          <p>Answers to the most common questions about booking, payments, cancellations, and your account.</p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-section">
          <div className="fp-cards" style={{ marginBottom: 48 }}>
            {[
              { icon: '📋', title: 'Bookings', desc: 'Making, viewing, and modifying reservations.' },
              { icon: '💳', title: 'Payments', desc: 'What you pay, when you pay, and deposits.' },
              { icon: '❌', title: 'Cancellations', desc: 'Policies, refunds, and how to cancel.' },
              { icon: '👤', title: 'Your account', desc: 'Login, registration, and profile settings.' },
            ].map(c => (
              <div key={c.title} className="fp-card" style={{ cursor: 'pointer' }}>
                <span className="fp-card-icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <h2>Frequently asked questions</h2>
          <div className="fp-faq">
            {FAQS.map((f, i) => (
              <div key={i} className="fp-faq-item">
                <button className="fp-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  {f.q}
                  <span>{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <div className="fp-faq-a">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section" style={{ textAlign: 'center' }}>
          <h2>Still need help?</h2>
          <p>Our support team is available 24/7.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
            {[
              { icon: '📧', label: 'Email us', sub: 'support@stayease.com' },
              { icon: '💬', label: 'Live chat', sub: 'Available now' },
              { icon: '📞', label: 'Call us', sub: '+234 800 STAY EASE' },
            ].map(c => (
              <div key={c.label} style={{
                background: 'white', borderRadius: 14, padding: '24px 32px',
                boxShadow: 'var(--card-shadow)', textAlign: 'center', minWidth: 180,
              }}>
                <div style={{ fontSize: '1.8rem', marginBottom: 10 }}>{c.icon}</div>
                <p style={{ fontWeight: 600, color: 'var(--brown)', marginBottom: 4, fontSize: '0.95rem' }}>{c.label}</p>
                <p style={{ fontSize: '0.83rem', color: 'var(--terra)', margin: 0 }}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
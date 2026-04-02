import './FooterPage.css';

export default function CancellationPolicy() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Policies</p>
          <h1>Cancellation & refund policy</h1>
          <p>Clear, fair, and no hidden surprises. Here's exactly how cancellations and refunds work on StayEase.</p>
        </div>
      </div>

      <div className="fp-body">
        <p className="fp-last-updated">Last updated: March 1, 2025</p>

        <div className="fp-section fp-policy">
          <h2>Standard cancellation tiers</h2>
          <p>Most properties on StayEase follow one of three cancellation policies, clearly shown on every hotel page before you book:</p>
          <div className="fp-cards">
            {[
              { icon: '✅', title: 'Free cancellation', desc: 'Cancel for free up to 24 hours before check-in. Full refund within 5 business days. Shown as a green badge on the hotel page.' },
              { icon: '⚠️', title: 'Partial refund', desc: 'Cancel 48+ hours before check-in for a 50% refund. Cancellations within 48 hours are non-refundable. Clearly labelled on the listing.' },
              { icon: '❌', title: 'Non-refundable', desc: 'Discounted rate — no refund on cancellation. You\'ll always see this label before completing your booking.' },
            ].map(c => (
              <div key={c.title} className="fp-card">
                <span className="fp-card-icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section fp-policy">
          <h2>How to cancel</h2>
          <ul>
            <li>Sign in to your StayEase account and go to "My Trips"</li>
            <li>Find the booking you want to cancel and click "Cancel Booking"</li>
            <li>Confirm the cancellation — you'll receive an email confirmation immediately</li>
            <li>Eligible refunds are processed within 5 business days to your original payment method</li>
          </ul>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section fp-policy">
          <h2>Damage deposit refunds</h2>
          <p>If a property holds a damage deposit at check-in, this amount is separate from your room rate. It is refunded in full within 5 business days after check-out, provided the property reports no damage.</p>
          <p>If damage is reported, the hotel will contact you directly with evidence. StayEase mediates any disputes between guests and properties.</p>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section fp-policy">
          <h2>Force majeure & exceptional circumstances</h2>
          <p>In cases of natural disaster, government travel bans, or serious personal emergency (with documentation), StayEase will work with the property to offer a full refund or date change regardless of the cancellation policy. Contact us at support@stayease.com as soon as possible.</p>
        </div>
      </div>
    </div>
  );
}
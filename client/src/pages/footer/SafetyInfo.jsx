import './FooterPage.css';

export default function SafetyInfo() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Your safety</p>
          <h1>Safety information for travellers</h1>
          <p>Your safety is our highest priority. Here's how we protect you before, during, and after your stay.</p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-section fp-policy">
          <h2>How we verify properties</h2>
          <div className="fp-cards">
            {[
              { icon: '🔍', title: 'Physical inspection', desc: 'Every property is visited in person by our team before listing. We check rooms, facilities, fire safety, and security.' },
              { icon: '📸', title: 'Photo verification', desc: 'All photos are taken by StayEase photographers — not supplied by hotels. What you see is exactly what you get.' },
              { icon: '⭐', title: 'Ongoing monitoring', desc: 'Properties with consistent low ratings or guest complaints are investigated and can be delisted immediately.' },
              { icon: '🛡️', title: 'Legal compliance', desc: 'We verify that every property holds valid business registration and relevant hospitality licences.' },
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
          <h2>Safe travel tips</h2>
          <ul>
            <li>Always confirm your booking reference before arriving at a property</li>
            <li>Keep a copy of your booking confirmation in your email and on your phone</li>
            <li>If anything at a property doesn't match what was advertised, contact us immediately</li>
            <li>Never pay more than the amount shown on your StayEase booking confirmation</li>
            <li>Report any safety concerns at a property using the in-app report button or emailing safety@stayease.com</li>
          </ul>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section fp-policy">
          <h2>Emergency contacts</h2>
          <div className="fp-cards">
            {[
              { icon: '🚨', title: 'StayEase emergency line', desc: '+234 800 STAY 911 — available 24/7 for urgent safety issues during a stay.' },
              { icon: '👮', title: 'Nigeria Police Force', desc: 'Emergency: 112 or 767. Always call the police directly in case of any crime.' },
              { icon: '🏥', title: 'Medical emergency', desc: 'Call 112 for emergency services. Ask your hotel concierge for the nearest hospital.' },
            ].map(c => (
              <div key={c.title} className="fp-card">
                <span className="fp-card-icon">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
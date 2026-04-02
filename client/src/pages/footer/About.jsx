import './FooterPage.css';

export default function About() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Our story</p>
          <h1>We believe every traveller deserves a remarkable stay</h1>
          <p>StayEase was born from a simple frustration — finding quality accommodation across Africa shouldn't be complicated. We built the platform we wished existed.</p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-stats">
          {[
            { num: '15+',  label: 'Hotels listed' },
            { num: '6',    label: 'Cities covered' },
            { num: '4.6★', label: 'Average rating' },
            { num: '24/7', label: 'Support available' },
          ].map(s => (
            <div key={s.label} className="fp-stat">
              <span className="fp-stat-num">{s.num}</span>
              <span className="fp-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="fp-section">
          <h2>How it started</h2>
          <p>In 2024, our founders — frequent travellers across Nigeria — noticed something broken. Booking a hotel should take minutes, not hours of comparing screenshots in WhatsApp groups. International platforms listed outdated properties. Local options were scattered across different apps with no consistent quality standard.</p>
          <p>So we built StayEase — a curated booking platform focused entirely on West and East Africa, with properties personally vetted by our team. Every hotel on this platform has been inspected, photographed properly, and reviewed for honest pricing.</p>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section">
          <h2>What makes us different</h2>
          <div className="fp-cards">
            {[
              { icon: '🔍', title: 'Curated, not crowdsourced', desc: 'Every property is hand-reviewed by our team. We remove listings that fall below standard — no matter how many bookings they have.' },
              { icon: '💰', title: 'Transparent pricing', desc: 'The price you see is the price you pay. No surprise fees at checkout. VAT and service charges are displayed upfront.' },
              { icon: '🇳🇬', title: 'Built for Africa', desc: 'We understand local payment preferences, phone booking patterns, and what Nigerian travellers actually need from a hotel.' },
              { icon: '⚡', title: 'Instant confirmation', desc: 'Every booking is confirmed in real time. No waiting 24 hours for a hotel to "check availability".' },
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

        <div className="fp-section">
          <h2>Our leadership team</h2>
          <div className="fp-team">
            {[
              { name: 'Adaeze Okonkwo', role: 'CEO & Co-founder', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400' },
              { name: 'Emeka Nwachukwu', role: 'CTO & Co-founder', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
              { name: 'Fatima Al-Hassan', role: 'Head of Operations', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400' },
              { name: 'Tunde Adeyemi', role: 'Head of Partnerships', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
            ].map(p => (
              <div key={p.name} className="fp-team-card">
                <img src={p.img} alt={p.name} className="fp-team-img" />
                <div className="fp-team-info">
                  <h4>{p.name}</h4>
                  <p>{p.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section">
          <h2>Our mission</h2>
          <p>To make quality accommodation across Africa as easy to find and book as ordering food online. We're starting with Nigeria and expanding across the continent — one city at a time.</p>
          <p>By 2026 we aim to cover 20 cities across 8 African countries, with over 500 verified properties and a mobile app for iOS and Android.</p>
        </div>
      </div>
    </div>
  );
}
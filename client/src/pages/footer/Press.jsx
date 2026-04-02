import './FooterPage.css';

const COVERAGE = [
  { outlet: 'TechCabal', title: 'StayEase is solving hotel discovery for Nigerian business travellers', date: 'March 2025', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600' },
  { outlet: 'Nairametrics', title: 'Nigerian hotel booking startup StayEase raises pre-seed round', date: 'January 2025', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600' },
  { outlet: 'Businessday NG', title: 'How StayEase is bringing hospitality transparency to West Africa', date: 'November 2024', img: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600' },
];

export default function Press() {
  return (
    <div className="fp-page">
      <div className="fp-hero">
        <div className="fp-hero-inner">
          <p className="fp-eyebrow">Press & media</p>
          <h1>StayEase in the news</h1>
          <p>Press resources, brand assets, and recent media coverage. For press enquiries contact <strong style={{ color: '#f0c890' }}>press@stayease.com</strong></p>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-section">
          <h2>Recent coverage</h2>
          <div className="fp-posts">
            {COVERAGE.map(c => (
              <div key={c.title} className="fp-post">
                <img src={c.img} alt={c.outlet} />
                <div className="fp-post-body">
                  <p className="fp-post-tag">{c.outlet}</p>
                  <h4>{c.title}</h4>
                  <p className="fp-post-meta">{c.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section">
          <h2>Brand assets</h2>
          <p>Download our official logo, brand colours, and product screenshots for use in editorial coverage.</p>
          <div className="fp-cards">
            {[
              { icon: '🎨', title: 'Logo pack', desc: 'SVG and PNG versions in light and dark. All variants included.' },
              { icon: '🖼️', title: 'Product screenshots', desc: 'High-resolution screenshots of the homepage, hotel detail, and booking flow.' },
              { icon: '📐', title: 'Brand guidelines', desc: 'Typography, colour palette, tone of voice, and usage rules.' },
            ].map(a => (
              <div key={a.title} className="fp-card">
                <span className="fp-card-icon">{a.icon}</span>
                <h4>{a.title}</h4>
                <p>{a.desc}</p>
                <button style={{
                  marginTop: 14, background: 'var(--sand)', border: 'none',
                  padding: '8px 18px', borderRadius: 50, fontSize: '0.82rem',
                  cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                  color: 'var(--brown)', fontWeight: 500,
                }}>Download</button>
              </div>
            ))}
          </div>
        </div>

        <hr className="fp-divider" />

        <div className="fp-section">
          <h2>Key facts</h2>
          <div className="fp-stats">
            {[
              { num: '2024', label: 'Founded' },
              { num: '6', label: 'Cities active' },
              { num: '15+', label: 'Partner hotels' },
              { num: 'Lagos', label: 'Headquarters' },
            ].map(s => (
              <div key={s.label} className="fp-stat">
                <span className="fp-stat-num">{s.num}</span>
                <span className="fp-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import './Home.css';

const DESTINATIONS = [
  { city: 'Lagos', img: 'https://images.unsplash.com/photo-1618842676088-c4d48a6a7e09?w=600', tag: 'Most popular' },
  { city: 'Abuja', img: 'https://images.unsplash.com/photo-1589825743320-fe7a82370fc6?w=600', tag: 'Capital city' },
  { city: 'Port Harcourt', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600', tag: 'Garden city' },
  { city: 'Kano', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600', tag: 'Ancient city' },
  { city: 'Enugu', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600', tag: 'Coal city' },
  { city: 'Ibadan', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600', tag: 'Cultural hub' },
];

export default function Home() {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/hotels').then(r => setHotels(r.data)).catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1600" alt="hero" />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Travel with intention</p>
          <h1 className="hero-title">Find your perfect<br /><em>stay in Africa</em></h1>
          <p className="hero-sub">Curated hotels, handpicked experiences, unforgettable moments.</p>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <div className="search-field">
            <label>Destination</label>
            <input type="text" placeholder="Where are you going?" value={city} onChange={e => setCity(e.target.value)} />
          </div>
          <div className="search-divider" />
          <div className="search-field">
            <label>Check-in</label>
            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div className="search-divider" />
          <div className="search-field">
            <label>Check-out</label>
            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
          </div>
          <div className="search-divider" />
          <div className="search-field">
            <label>Guests</label>
            <input type="number" min="1" max="10" value={guests} onChange={e => setGuests(e.target.value)} />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>
      </section>

      {/* Quick nav links */}
      <section className="quick-links">
        <Link to="/hotels" className="quick-link">
          <span>🏨</span> All Hotels
        </Link>
        <Link to="/attractions" className="quick-link highlight">
          <span>🗺️</span> Attractions & Experiences
        </Link>
        <Link to="/hotels?city=Lagos" className="quick-link">
          <span>🌊</span> Lagos
        </Link>
        <Link to="/hotels?city=Abuja" className="quick-link">
          <span>🏛️</span> Abuja
        </Link>
        <Link to="/hotels?city=Port Harcourt" className="quick-link">
          <span>🌿</span> Port Harcourt
        </Link>
        <Link to="/hotels?city=Kano" className="quick-link">
          <span>🕌</span> Kano
        </Link>
      </section>

      {/* Destinations */}
      <section className="section">
        <div className="section-header">
          <h2>Popular destinations</h2>
          <p>Where will your next story unfold?</p>
        </div>
        <div className="destinations-grid">
          {DESTINATIONS.map(d => (
            <div key={d.city} className="destination-card" onClick={() => navigate(`/hotels?city=${d.city}`)}>
              <img src={d.img} alt={d.city} />
              <div className="destination-info">
                <span className="destination-tag">{d.tag}</span>
                <h3>{d.city}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── UNIQUE PROPERTIES HORIZONTAL SCROLL ── */}
      <section className="properties-section">
        <div className="properties-header">
          <div>
            <h2>Stay at our unique properties</h2>
            <p>Hand-selected hotels — each one unforgettable</p>
          </div>
          <Link to="/hotels" className="properties-view-all">View all →</Link>
        </div>
        <div className="properties-scroll-track">
          <div className="properties-scroll">
            {hotels.map(h => (
              <div key={h._id} className="property-card" onClick={() => navigate(`/hotels/${h._id}`)}>
                <div className="property-card-img">
                  <img
                    src={h.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'}
                    alt={h.name}
                  />
                  <span className="property-card-rating">★ {h.rating}</span>
                  {h.amenities?.includes('Pool') && <span className="property-card-badge">Pool</span>}
                </div>
                <div className="property-card-body">
                  <p className="property-card-city">📍 {h.city}</p>
                  <h4>{h.name}</h4>
                  <p className="property-card-desc">{h.description?.slice(0, 72)}...</p>
                  <div className="property-card-footer">
                    <div>
                      <span className="property-card-price">₦{h.price?.toLocaleString()}</span>
                      <span className="property-card-per"> / night</span>
                    </div>
                    <span className="property-card-cta">Book →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions CTA banner */}
      <section className="attr-cta-section">
        <div className="attr-cta-content">
          <span className="attr-cta-icon">🗺️</span>
          <div>
            <h2>Discover attractions near your stay</h2>
            <p>Explore museums, parks, historical sites, and local experiences — powered by live map data across 6 African countries.</p>
          </div>
          <Link to="/attractions" className="attr-cta-btn">Explore Attractions →</Link>
        </div>
      </section>

      {/* Why StayEase */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why StayEase?</h2>
        </div>
        <div className="features-grid">
          {[
            { icon: '✦', title: 'Curated Properties', desc: 'Every listing is personally vetted for quality and comfort.' },
            { icon: '◈', title: 'Best Price Promise', desc: 'We match any lower rate you find, guaranteed.' },
            { icon: '⊕', title: 'Instant Confirmation', desc: 'Book and receive your confirmation in seconds.' },
            { icon: '◎', title: '24/7 Support', desc: 'Real humans available around the clock, always.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
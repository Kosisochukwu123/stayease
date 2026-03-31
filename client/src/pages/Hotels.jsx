import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../api';
import './Hotels.css';

export default function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || '';

  useEffect(() => {
    setLoading(true);
    api.get(`/hotels${city ? `?city=${city}` : ''}`)
      .then(r => setHotels(r.data))
      .finally(() => setLoading(false));
  }, [city]);

  return (
    <div className="hotels-page">
      <div className="hotels-header">
        <h1>{city ? `Hotels in ${city}` : 'All Hotels'}</h1>
        <p>{hotels.length} properties found</p>
      </div>

      {loading ? (
        <div className="loading-grid">
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card" />)}
        </div>
      ) : (
        <div className="hotels-grid">
          {hotels.map(h => (
            <Link to={`/hotels/${h._id}`} key={h._id} className="hotel-card">
              <div className="hotel-card-img">
                <img src={h.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'} alt={h.name} />
                <span className="hotel-rating">★ {h.rating}</span>
              </div>
              <div className="hotel-card-body">
                <p className="hotel-city">{h.city}</p>
                <h3>{h.name}</h3>
                <p className="hotel-desc">{h.description?.slice(0, 90)}...</p>
                <div className="hotel-card-footer">
                  <div>
                    <span className="hotel-price">₦{h.price?.toLocaleString()}</span>
                    <span className="hotel-per"> / night</span>
                  </div>
                  <span className="hotel-cta">View →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
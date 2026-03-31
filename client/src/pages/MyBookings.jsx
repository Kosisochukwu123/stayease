import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import './MyBookings.css';

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return navigate('/login');
    api.get('/bookings/my').then(r => setBookings(r.data)).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="mb-loading"><div className="spinner" /></div>;

  return (
    <div className="my-bookings">
      <div className="mb-header">
        <h1>My Trips</h1>
        <p>{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>
      {bookings.length === 0 ? (
        <div className="mb-empty">
          <p>You haven't booked anything yet.</p>
          <button onClick={() => navigate('/hotels')}>Explore Hotels</button>
        </div>
      ) : (
        <div className="mb-grid">
          {bookings.map(b => (
            <div key={b._id} className="mb-card">
              <div className="mb-card-img">
                <img src={b.hotel?.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'} alt={b.hotel?.name} />
              </div>
              <div className="mb-card-body">
                <p className="mb-city">{b.hotel?.city}</p>
                <h3>{b.hotel?.name}</h3>
                <div className="mb-dates">
                  <div><label>Check-in</label><span>{new Date(b.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                  <div className="mb-arrow">→</div>
                  <div><label>Check-out</label><span>{new Date(b.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
                </div>
                <div className="mb-footer">
                  <span className="mb-total">₦{b.totalPrice?.toLocaleString()}</span>
                  <span className="mb-guests">{b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
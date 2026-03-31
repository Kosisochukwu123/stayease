import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">StayEase</Link>

        {/* Desktop links */}
        <div className="navbar-links">
          <Link to="/hotels">Explore</Link>
          <Link to="/attractions">Attractions</Link>
          {user ? (
            <>
              <Link to="/my-bookings">My Trips</Link>
              {user.isAdmin && (
                <Link to="/admin" className="navbar-admin-link">
                  ⚙ Admin
                </Link>
              )}
              <div className="navbar-user">
                <div className="navbar-avatar">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span>{user.name?.split(' ')[0]}</span>
              </div>
              <button className="btn-outline" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="/register" className="btn-primary">Get Started</Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          className={`navbar-hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`navbar-overlay ${menuOpen ? 'visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile drawer */}
      <div className={`navbar-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <span className="drawer-brand">StayEase</span>
          <button className="drawer-close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>

        <div className="drawer-links">
          <Link to="/hotels" className="drawer-link">
            <span className="drawer-link-icon">🏨</span> Explore Hotels
          </Link>
          <Link to="/attractions" className="drawer-link">
            <span className="drawer-link-icon">🗺️</span> Attractions
          </Link>
          {user ? (
            <>
              <Link to="/my-bookings" className="drawer-link">
                <span className="drawer-link-icon">🧳</span> My Trips
              </Link>
              {user.isAdmin && (
                <Link to="/admin" className="drawer-link drawer-link-admin">
                  <span className="drawer-link-icon">⚙️</span> Admin Dashboard
                </Link>
              )}
            </>
          ) : (
            <Link to="/login" className="drawer-link">
              <span className="drawer-link-icon">👤</span> Sign In
            </Link>
          )}
        </div>

        <div className="drawer-footer">
          {user ? (
            <>
              <div className="drawer-user">
                <div className="drawer-avatar">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="drawer-user-name">{user.name}</p>
                  <p className="drawer-user-email">{user.email}</p>
                  {user.isAdmin && (
                    <span className="drawer-admin-badge">Admin</span>
                  )}
                </div>
              </div>
              <button className="drawer-signout" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/register" className="drawer-cta">
              Get Started — It's Free
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
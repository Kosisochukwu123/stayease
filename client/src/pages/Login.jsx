import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Go back to where they came from, or home
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.isAdmin ? '/admin' : from, { replace: true });
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800" alt="hotel" />
        <div className="auth-visual-overlay">
          <h2>Welcome back to<br /><em>StayEase</em></h2>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <h1>Sign in</h1>
          <p className="auth-sub">Good to have you back.</p>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-with-toggle">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(s => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="auth-btn-loading">
                  <span className="auth-spinner" /> Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one free</Link>
          </p>

          <div className="auth-divider"><span>or</span></div>

          <p className="auth-guest">
            Just browsing? <Link to="/hotels">Explore hotels →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
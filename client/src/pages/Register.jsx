import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function getStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 6)  score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'Weak',   color: '#e53e3e' };
  if (score <= 3) return { score, label: 'Fair',   color: '#d69e2e' };
  return             { score, label: 'Strong', color: '#38a169' };
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getStrength(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim())
      return setError('Please enter your full name.');
    if (form.password.length < 6)
      return setError('Password must be at least 6 characters.');

    setLoading(true);
    try {
      await register(form.name.trim(), form.email, form.password);
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800" alt="hotel" />
        <div className="auth-visual-overlay">
          <h2>Start your<br /><em>journey</em></h2>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <h1>Create account</h1>
          <p className="auth-sub">Join thousands of happy travellers.</p>

          {error && (
            <div className="auth-error">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                autoComplete="name"
                required
              />
            </div>

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
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="new-password"
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

              {/* Password strength bar */}
              {form.password && (
                <div className="pw-strength">
                  <div className="pw-strength-bar">
                    {[1,2,3,4,5].map(i => (
                      <div
                        key={i}
                        className="pw-strength-seg"
                        style={{ background: i <= strength.score ? strength.color : 'rgba(61,43,31,0.12)' }}
                      />
                    ))}
                  </div>
                  <span style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="auth-btn-loading">
                  <span className="auth-spinner" /> Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <p className="auth-terms">
            By creating an account you agree to our{' '}
            <Link to="/">Terms of Service</Link> and{' '}
            <Link to="/">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
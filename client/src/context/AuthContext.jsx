import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On every app load — ask the server who we are
  // This guarantees isAdmin is always current, never stale
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/auth/me')
      .then(r => setUser(r.data))
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    // Fetch full user from server immediately so isAdmin is guaranteed fresh
    const me = await api.get('/auth/me');
    setUser(me.data);
    return me.data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    localStorage.setItem('token', data.token);
    const me = await api.get('/auth/me');
    setUser(me.data);
    return me.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {loading ? <AppLoader /> : children}
    </AuthContext.Provider>
  );
}

// Full-screen loader shown while we verify the token on first load
function AppLoader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#faf7f2', flexDirection: 'column', gap: 16
    }}>
      <div style={{
        width: 40, height: 40,
        border: '3px solid #f0e9de',
        borderTopColor: '#c4612a',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#8a7060', fontSize: '0.9rem' }}>
        Loading StayEase...
      </p>
    </div>
  );
}
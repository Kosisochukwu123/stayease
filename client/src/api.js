import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  console.log('API REQUEST:', cfg.method?.toUpperCase(), cfg.url);
  console.log('TOKEN PRESENT:', !!token);
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
  }
  return cfg;
});

api.interceptors.response.use(
  res => res,
  err => {
    console.log('API ERROR:', err.response?.status, err.response?.data);
    return Promise.reject(err);
  }
);

export default api;
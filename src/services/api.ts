import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

// Add username to all requests (if available)
api.interceptors.request.use(
  (config) => {
    const username = localStorage.getItem('username');
    if (username) {
      config.headers['x-username'] = username;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Don't auto-reload on auth errors - let the UI handle it
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Just pass the error through - components will handle it
    return Promise.reject(error);
  }
);

export default api;

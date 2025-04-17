import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData),
  getMe: () => api.get('/auth/me'),
  updateDetails: (userData) => api.put('/auth/updatedetails', userData),
  updatePassword: (passwordData) => api.put('/auth/updatepassword', passwordData),
  updateSettings: (settingsData) => api.put('/auth/updatesettings', settingsData),
  logout: () => api.get('/auth/logout')
};

// Trades API
export const tradesAPI = {
  getTrades: (params) => api.get('/trades', { params }),
  getTrade: (id) => api.get(`/trades/${id}`),
  createTrade: (tradeData) => api.post('/trades', tradeData),
  updateTrade: (id, tradeData) => api.put(`/trades/${id}`, tradeData),
  deleteTrade: (id) => api.delete(`/trades/${id}`),
  getTradeStats: () => api.get('/trades/stats')
};

// Missed Trades API
export const missedTradesAPI = {
  getMissedTrades: (params) => api.get('/missed-trades', { params }),
  getMissedTrade: (id) => api.get(`/missed-trades/${id}`),
  createMissedTrade: (tradeData) => api.post('/missed-trades', tradeData),
  updateMissedTrade: (id, tradeData) => api.put(`/missed-trades/${id}`, tradeData),
  deleteMissedTrade: (id) => api.delete(`/missed-trades/${id}`),
  getMissedTradeStats: () => api.get('/missed-trades/stats')
};

// Broker Accounts API
export const brokerAccountsAPI = {
  getBrokerAccounts: () => api.get('/broker-accounts'),
  getBrokerAccount: (id) => api.get(`/broker-accounts/${id}`),
  createBrokerAccount: (accountData) => api.post('/broker-accounts', accountData),
  updateBrokerAccount: (id, accountData) => api.put(`/broker-accounts/${id}`, accountData),
  deleteBrokerAccount: (id) => api.delete(`/broker-accounts/${id}`),
  syncBrokerAccount: (id) => api.post(`/broker-accounts/${id}/sync`),
  getSyncHistory: (id) => api.get(`/broker-accounts/${id}/sync-history`)
};

export default api;

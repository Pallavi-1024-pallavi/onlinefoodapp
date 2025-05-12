// src/services/AuthService.jsx
import axios from 'axios';

const API = 'http://localhost:5173';

export const register = (email, password) => {
  return axios.post(`${API}/register`, { email, password });
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // FIXED: use http
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
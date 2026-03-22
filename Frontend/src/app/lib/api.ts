import axios from 'axios';

// This creates a reusable instance so you don't have to type the URL every time
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', 
});

export default api;
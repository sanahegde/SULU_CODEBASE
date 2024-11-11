import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this to match your server's URL
});

export default api;

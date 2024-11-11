// api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// User Authentication APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

// Dog Breeds API
export const fetchDogBreeds = () => api.get('/dog-breeds/details');

// Meal Plan API
export const generateMealPlan = (params) => api.get('/mealplan/generate', { params });

// Instagram Caption API
export const fetchInstagramCaption = (shortcode) => api.get(`/instagram/media/${shortcode}`);

// Nearby Location API
export const fetchNearbyPlaces = (location) => api.get(`/places/nearby`, { params: { location } });

export default api;

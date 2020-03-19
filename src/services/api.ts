import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'https://swapi.co/api/',
});

export default api;

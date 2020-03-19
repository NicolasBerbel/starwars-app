import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'https://swapi.co/api/',
});

export interface IApiListResponse<T> {
  results: T[],
  count: number,
  next: string | null,
  previous: string | null,
};

export default api;

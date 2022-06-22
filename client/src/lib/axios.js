import Axios from 'axios';
import { BASE_URL } from 'configure/index';

export const axios = Axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

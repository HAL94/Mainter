import axios from 'axios';

import { history } from 'src/utils/route-history';

const BASE_URL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        console.log('refresh success');

        return axios(originalRequest);
        
      } catch (refError) {
        // console.log('could not refresh', refError);

        const wasLoggedIn = localStorage.getItem('isLoggedIn') === 'true';        
        
        if (wasLoggedIn) {

          history.navigate('/session-expired');

        } else {

          history.navigate('/login');
          
        }


      }
    }

    return Promise.reject(error);
  }
);

export const handleApiError = async (error) => {
  try {
    // console.log('got error', error);
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
    const data = null;    
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

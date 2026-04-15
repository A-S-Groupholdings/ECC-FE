// src/services/apiService.js
import axios from 'axios';

// Base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance with the base URL
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get the Bearer token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Add Bearer token to headers for each request
apiService.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    // Add the Bearer token to the Authorization header
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const AdminLoginOtp = async (email) => {
    try {
      const response = await apiService.post('/auth/admin-send-otp', {
        email,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

export const AdminLogin = async (email, otp) => {
    try {
      const response = await apiService.post('/auth/admin-login', {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);

      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };



export default apiService;

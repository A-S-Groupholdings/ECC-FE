// src/services/apiService.js
import axios from 'axios';
import { useAuthStore } from '@/stores/auth.js';

// Base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create Axios instance with the base URL
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

// Function to get the Bearer token from sessionStorage
const getAuthToken = () => {
  return sessionStorage.getItem('accessToken');
};

// Add Bearer token to headers for each request
apiService.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor: auto-refresh on 401
apiService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh and retry
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(apiService(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const authStore = useAuthStore();
        const refreshToken = authStore.getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Call refresh endpoint
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const data = refreshResponse.data;

        if (data.isSuccess && data.value?.accessToken) {
          // Update access token
          authStore.setAccessToken(data.value.accessToken);

          // Update refresh token if provided
          if (data.value.refreshToken) {
            authStore.setTokens(data.value.accessToken, data.value.refreshToken);
          }

          // Notify subscribers and retry original request
          onRefreshed(data.value.accessToken);
          originalRequest.headers['Authorization'] = `Bearer ${data.value.accessToken}`;
          return apiService(originalRequest);
        } else {
          throw new Error(data.userMessage || 'Token refresh failed');
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        const authStore = useAuthStore();
        authStore.logout();
        window.location.href = '/';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

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

  export const GetResources = async () => {
    try {
      const response = await apiService.get('/resources');
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  };






export default apiService;

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

export const SendOtp = async (payload) => {
    try {
      const response = await apiService.post('/auth/send-otp', payload);
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);

      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

export const UserSendOtp = async (email) => {
    try {
      const response = await apiService.post('/auth/user-send-otp', {
        email,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending OTP:', error);

      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

export const UserLogin = async (email, otp) => {
    try {
      const response = await apiService.post('/auth/user-login', {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      console.error('Error verifying OTP:', error);

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






  export const GetCategories = async () => {
    try {
      const response = await apiService.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };

  export const GetServices = async () => {
    try {
      const response = await apiService.get('/services');
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  };

  export const GetVisibleServices = async () => {
    try {
      const response = await apiService.get('/services/visible');
      return response.data;
    } catch (error) {
      console.error('Error fetching visible services:', error);
      throw error;
    }
  };

  export const GetServiceById = async (id) => {
    try {
      const response = await apiService.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw error;
    }
  };

  export const CreateService = async (payload) => {
    try {
      const response = await apiService.post('/services', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const UpdateService = async (id, payload) => {
    try {
      const response = await apiService.put(`/services/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating service:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const DeleteService = async (id) => {
    try {
      const response = await apiService.delete(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting service:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetBookingSlots = async (date, resourceId) => {
    try {
      const response = await apiService.post('/bookings/bookingSlot', {
        date,
        resourceId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching booking slots:', error);
      throw error;
    }
  };

  export const GetMembershipBookingSlots = async (payload) => {
    try {
      const response = await apiService.post('/bookings/bookingMembershipSlot', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching membership booking slots:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const RegisterBookingUser = async (payload) => {
    try {
      const response = await apiService.post('/bookings/bookingUser', payload);
      return response.data;
    } catch (error) {
      console.error('Error registering booking user:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const CreateBooking = async (payload) => {
    try {
      const response = await apiService.post('/bookings', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const CreateMembership = async (payload) => {
    try {
      const response = await apiService.post('/memberships', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating membership:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetMemberships = async () => {
    try {
      const response = await apiService.get('/memberships');
      return response.data;
    } catch (error) {
      console.error('Error fetching memberships:', error);
      throw error;
    }
  };

    export const GetMembershipsPublic = async () => {
    try {
      const response = await apiService.get('memberships/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching memberships:', error);
      throw error;
    }
  };

  export const GetMembershipById = async (id) => {
    try {
      const response = await apiService.get(`/memberships/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching membership:', error);
      throw error;
    }
  };

  export const UpdateMembership = async (id, payload) => {
    try {
      const response = await apiService.put(`/memberships/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating membership:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetUsersAll = async () => {
    try {
      const response = await apiService.get('/auth/usersAll');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  export const CreateUser = async (payload) => {
    try {
      const response = await apiService.post('/auth/user-create', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetBookings = async (params = {}) => {
    try {
      const response = await apiService.get('/bookings', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  };

  export const GetBookingById = async (bookingId) => {
    try {
      const response = await apiService.get(`/bookings/${bookingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking by id:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const UpdateBooking = async (bookingId, payload) => {
    try {
      const response = await apiService.put(`/bookings/${bookingId}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const SearchBookings = async (payload) => {
    try {
      const response = await apiService.post('/bookings/search', payload);
      return response.data;
    } catch (error) {
      console.error('Error searching bookings:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const ConfirmBooking = async (bookingId, payload) => {
    try {
      const response = await apiService.post(`/bookings/confirmation/${bookingId}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error confirming booking:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const UpdatePaymentStatus = async (bookingId, paymentStatus) => {
    try {
      const response = await apiService.post(`/bookings/paymentStatus/${bookingId}`, {
        paymentStatus,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetUserBookingData = async (userId) => {
    try {
      const response = await apiService.post('/bookings/userBookingData', {
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user booking data:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

   export const GetCoachBookingData = async (userId) => {
    try {
      const response = await apiService.post('/bookings/coachBookingData', {
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user booking data:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetUserById = async (id) => {
    try {
      const response = await apiService.post(`/auth/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const UpdateUser = async (id, payload) => {
    try {
      const response = await apiService.put(`/auth/user/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const DeleteUser = async (id) => {
    try {
      const response = await apiService.delete(`/auth/user/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const BuyMembership = async (payload) => {
    try {
      const response = await apiService.post('/memberships/buy', payload);
      return response.data;
    } catch (error) {
      console.error('Error buying membership:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetSessionDashboard = async () => {
    try {
      const response = await apiService.get('/bookings/sessionDashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching session dashboard:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetCalendarData = async (payload) => {
    try {
      const response = await apiService.post('/bookings/calendar', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetAppointmentData = async () => {
    try {
      const response = await apiService.post('/bookings/appoinmentData');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment data:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const CreateStripeSession = async (payload) => {
    try {
      const response = await apiService.post('/stripe/create-checkout-session', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating stripe session:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetPayments = async (params = {}) => {
    try {
      const response = await apiService.get('/payment', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching payments:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetPaymentStats = async (params = {}) => {
    try {
      const response = await apiService.get('/payment/stats', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching payment stats:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const GetPaymentById = async (id) => {
    try {
      const response = await apiService.get(`/payment/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching payment:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  export const UpdatePaymentStatusAppoinment = async (id, payload) => {
    try {
      const response = await apiService.post(`/bookings/paymentStatus/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating payment status:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  // Booking Cancellation
  export const CancelBooking = async (payload) => {
    try {
      const response = await apiService.post('/bookings/booking-cancel', payload);
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  // Membership Cancellation
  export const CancelMembership = async (payload) => {
    try {
      const response = await apiService.post('/memberships/cancellation', payload);
      return response.data;
    } catch (error) {
      console.error('Error cancelling membership:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };

  // GetBookingHistory
  export const GetBookingHistory = async (userId) => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('GetBookingHistory: a valid userId string is required');
    }
    try {
      const { data } = await apiService.post('/bookings/history', { userId });
      return data;
    } catch (error) {
      console.error('Error fetching booking history:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };


    // GetPaymentHistory
  export const GetPaymentHistory = async (userId) => {
    if (!userId ) {
      throw new Error('GetBookingHistory: a valid userId string is required');
    }
    try {
      const { data } = await apiService.post('/payment/history', { userId });
      return data;
    } catch (error) {
      console.error('Error cancelling membership:', error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };


  // GetMembershipByUsers (paginated)
  export const GetMembershipByUsers = async ({ page = 1, limit = 10 } = {}) => {
    try {
      const { data } = await apiService.get('/memberships/membershipByUsers', {
        params: { page, limit },
      });
      return data;
    } catch (error) {
      console.error('Error fetching membership users:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };


  // SearchMembershipUsers
  export const SearchMembershipUsers = async (search) => {
    const term = typeof search === 'string' ? search.trim() : '';
    try {
      const { data } = await apiService.post('/memberships/searchmethod', {
        search: term,
      });
      return data;
    } catch (error) {
      console.error('Error searching membership users:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };


  // GetMembershipPayments (paginated): GET /memberships/membershipPayment?page=&limit=
  export const GetMembershipPayments = async ({ page = 1, limit = 10 } = {}) => {
    try {
      const { data } = await apiService.get('/memberships/membershipPayment', {
        params: { page, limit },
      });
      return data;
    } catch (error) {
      console.error('Error fetching membership payments:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };


  // GetMembershipPaymentIndividual: GET /memberships/membershipPaymentIndivual/:userId
  export const GetMembershipPaymentIndividual = async (userId) => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('GetMembershipPaymentIndividual: a valid userId string is required');
    }
    try {
      const { data } = await apiService.get(
        `/memberships/membershipPaymentIndividual/${encodeURIComponent(userId)}`
      );
      return data;
    } catch (error) {
      console.error('Error fetching individual membership payments:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };


  // DeactivateMembershipUser
  export const DeactivateMembershipUser = async (userId) => {
    if (!userId || typeof userId !== 'string') {
      throw new Error('DeactivateMembershipUser: a valid userId string is required');
    }
    try {
      const { data } = await apiService.post(
        `/memberships/membershipDeactivate/${encodeURIComponent(userId)}`
      );
      return data;
    } catch (error) {
      console.error('Error deactivating membership user:', error);
      if (error.response?.data) {
        return error.response.data;
      }
      throw error;
    }
  };




export default apiService;
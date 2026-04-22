import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthStore = defineStore("auth", () => {
  // State
  const accessToken = ref(sessionStorage.getItem("accessToken") || null);
  const user = ref(null);
  const isRestoring = ref(false);
  const isAuthenticated = computed(() => !!accessToken.value);

  // Load user from localStorage on init
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser);
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
    }
  }

  // Set tokens after login
  function setTokens(newAccessToken, newRefreshToken) {
    accessToken.value = newAccessToken;
    sessionStorage.setItem("accessToken", newAccessToken);

    // Store refreshToken in cookie (7 days)
    if (newRefreshToken) {
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `refreshToken=${newRefreshToken}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
    }
  }

  // Set user info
  function setUser(userInfo) {
    user.value = userInfo;
    localStorage.setItem("user", JSON.stringify(userInfo));
  }

  // Update only access token (used during refresh)
  function setAccessToken(newAccessToken) {
    accessToken.value = newAccessToken;
    sessionStorage.setItem("accessToken", newAccessToken);
  }

  // Get refreshToken from cookie
  function getRefreshToken() {
    const match = document.cookie.match(/refreshToken=([^;]+)/);
    return match ? match[1] : null;
  }

  // Restore session using refresh token (called on app init)
  async function restoreSession() {
    // If already have access token, session is active
    if (accessToken.value) return true;

    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    isRestoring.value = true;
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      const data = response.data;

      if (data.isSuccess && data.value?.accessToken) {
        setTokens(data.value.accessToken, data.value.refreshToken);
        return true;
      } else {
        // Refresh failed, clear everything
        logout();
        return false;
      }
    } catch (error) {
      console.error("Session restore failed:", error);
      logout();
      return false;
    } finally {
      isRestoring.value = false;
    }
  }

  // Clear all auth data (logout)
  function logout() {
    accessToken.value = null;
    user.value = null;
    sessionStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("otpEmail");

    // Clear refreshToken cookie
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return {
    accessToken,
    user,
    isAuthenticated,
    isRestoring,
    setTokens,
    setUser,
    setAccessToken,
    getRefreshToken,
    restoreSession,
    logout,
  };
});

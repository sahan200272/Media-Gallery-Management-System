import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/create', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Verify OTP
export const verifyOTP = async (data) => {
  try {
    const response = await api.post('/users/verify', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/users/forgot', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Reset Password
export const resetPassword = async (data) => {
  try {
    const response = await api.post('/users/reset', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login user (if you need to add traditional login later)
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;

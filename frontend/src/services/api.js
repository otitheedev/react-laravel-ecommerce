import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/login',
    REGISTER: '/api/register',
    LOGOUT: '/api/logout',
  },
  
  // Products
  PRODUCTS: {
    LIST: '/api/products',
    SHOW: (id) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id) => `/api/products/${id}`,
    DELETE: (id) => `/api/products/${id}`,
  },
  
  // Cart
  CART: {
    INDEX: '/api/cart',
    ADD: '/api/cart/add',
    UPDATE: (itemId) => `/api/cart/update/${itemId}`,
    REMOVE: (itemId) => `/api/cart/remove/${itemId}`,
    CLEAR: '/api/cart/clear',
  },
};

// API Service Methods
export const apiService = {
  // Authentication Methods
  auth: {
    login: (credentials) => api.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
    register: (userData) => api.post(API_ENDPOINTS.AUTH.REGISTER, userData),
    logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
  },

  // Product Methods
  products: {
    getAll: () => api.get(API_ENDPOINTS.PRODUCTS.LIST),
    getById: (id) => api.get(API_ENDPOINTS.PRODUCTS.SHOW(id)),
    create: (productData) => api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData),
    update: (id, productData) => api.put(API_ENDPOINTS.PRODUCTS.UPDATE(id), productData),
    delete: (id) => api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id)),
  },

  // Cart Methods
  cart: {
    getCart: () => api.get(API_ENDPOINTS.CART.INDEX),
    addItem: (itemData) => api.post(API_ENDPOINTS.CART.ADD, itemData),
    updateItem: (itemId, quantity) => api.put(API_ENDPOINTS.CART.UPDATE(itemId), { quantity }),
    removeItem: (itemId) => api.delete(API_ENDPOINTS.CART.REMOVE(itemId)),
    clearCart: () => api.delete(API_ENDPOINTS.CART.CLEAR),
  },
};

// Helper function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    switch (status) {
      case 400:
        return 'Bad request. Please check your input.';
      case 401:
        return 'Unauthorized. Please login again.';
      case 403:
        return 'Forbidden. You don\'t have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 422:
        return data.message || 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return data.message || 'An error occurred. Please try again.';
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred.';
  }
};

// Helper function to extract data from API response
export const extractData = (response) => {
  return response.data.data || response.data;
};

export default api; 
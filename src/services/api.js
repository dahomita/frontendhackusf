/**
 * API Service
 * 
 * This service handles all API calls to the backend.
 * It includes methods for authentication, user management, and other API endpoints.
 */

// Base URL for API calls
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://fallguardian-api.azurewebsites.net/api';

/**
 * Helper function to handle API responses
 * @param {Response} response - The fetch response object
 * @returns {Promise} - Resolved with data or rejected with error
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    // If the server response was not ok, throw an error with the message
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    error.data = data;
    throw error;
  }
  
  return data;
};

/**
 * API Service object with methods for different API endpoints
 */
const api = {
  /**
   * Authentication methods
   */
  auth: {
    /**
     * Get the Google authentication URL
     * @returns {string} - The Google authentication URL
     */
    getGoogleAuthUrl: () => `${API_BASE_URL}/auth/google`,
    
    /**
     * Get the current user's profile
     * @returns {Promise} - Resolved with user data
     */
    getCurrentUser: async () => {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        credentials: 'include', // Include cookies in the request
      });
      return handleResponse(response);
    },
    
    /**
     * Logout the current user
     * @returns {Promise} - Resolved with success message
     */
    logout: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });
      return handleResponse(response);
    },
  },
  
  /**
   * User methods
   */
  users: {
    /**
     * Update the current user's profile
     * @param {Object} userData - The user data to update
     * @returns {Promise} - Resolved with updated user data
     */
    updateProfile: async (userData) => {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify(userData),
      });
      return handleResponse(response);
    },
  },
};

export default api; 
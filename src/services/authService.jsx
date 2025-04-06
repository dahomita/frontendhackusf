// API base URL from environment variable
const API_URL = process.env.API_BASE_URL;
const AUTH_ENDPOINT = `${API_URL}/auth`;

/**
 * Service for handling auth-related API requests
 */
export const authService = {
  /**
   * Register a new user
   * @param {string} username - User's username
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} Response data including user info
   */
  async register(username, email, password) {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  /**
   * Login a user
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} Response data including user info
   */
  async login(email, password) {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  /**
   * Logout the current user
   * @returns {Promise<Object>} Response data
   */
  async logout() {
    try {
      const response = await fetch(`${AUTH_ENDPOINT}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed');
      }

      return data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  /**
   * Get the current user's information
   * @returns {Promise<Object>} Current user data
   */
  async getCurrentUser() {
    try {
      const response = await fetch(`${API_URL}/user/me`, {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          // User is not authenticated, return null without throwing
          return null;
        }
        const data = await response.json();
        throw new Error(data.message || 'Failed to get user information');
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },
}; 
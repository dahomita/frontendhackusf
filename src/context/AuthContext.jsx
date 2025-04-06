import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

/**
 * AuthContext
 * 
 * This context provides authentication state and methods to the entire application.
 * It handles user authentication, profile management, and session persistence.
 */

// Create the auth context
const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * 
 * This component provides authentication state and methods to its children.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Check if the user is authenticated
   * This is called on initial load and after authentication
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      console.log('Checking authentication status...');
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        console.log('Auth status check result:', currentUser ? 'Authenticated' : 'Not authenticated');
        setUser(currentUser);
      } catch (err) {
        console.error('Auth status check failed:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Register a new user
   * @param {string} username - The username of the new user
   * @param {string} email - The email of the new user
   * @param {string} password - The password of the new user
   * @returns {Promise<Object>} - The user data and authentication token
   */
  const register = async (username, email, password) => {
    console.log('Attempting to register user:', email);
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.register(username, email, password);
      console.log('Registration successful:', userData);
      setUser(userData.user);
      return userData;
    } catch (err) {
      console.error('Registration failed:', err);
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login a user
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @returns {Promise<Object>} - The user data and authentication token
   */
  const login = async (email, password) => {
    console.log('Attempting to log in user:', email);
    try {
      setLoading(true);
      setError(null);
      const userData = await authService.login(email, password);
      console.log('Login successful:', userData);
      setUser(userData.user);
      return userData;
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = async () => {
    console.log('Attempting to log out user');
    try {
      setLoading(true);
      setError(null);
      await authService.logout();
      console.log('Logout successful');
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError(err.message || 'Logout failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Google authentication
   * This redirects the user to the Google authentication page
   */
  const googleLogin = () => {
    console.log('Redirecting to Google OAuth');
    // Redirect to the Google OAuth route
    window.location.href = `${process.env.API_BASE_URL || "https://fallguardian-api.azurewebsites.net/api"}/auth/google`;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    googleLogin,
    isAuthenticated: !!user,
  };

  console.log('Auth context state:', { 
    isAuthenticated: !!user, 
    loading, 
    hasError: !!error,
    userRole: user?.role 
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * @returns {Object} - The auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    console.error('useAuth must be used within an AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext; 
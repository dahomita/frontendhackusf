import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

/**
 * AuthContext
 *
 * This context provides authentication state and methods to the entire application.
 * It handles user authentication, profile management, and session persistence.
 */

// Create the context
const AuthContext = createContext();

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
  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to get the current user from the API
      const userData = await api.auth.getCurrentUser();

      // If successful, update the user state
      setUser(userData);

      // Store authentication state in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", userData.role);
    } catch (err) {
      // If there's an error, clear the user state
      setUser(null);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");

      // Only set error if it's not a 401 (Unauthorized) error
      // 401 is expected when the user is not authenticated
      if (err.status !== 401) {
        setError(err.message || "Failed to authenticate user");
        console.error("Authentication error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Initialize authentication on component mount
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Handle Google authentication
   * This redirects the user to the Google authentication page
   */
  const loginWithGoogle = () => {
    // Redirect to the Google authentication URL
    window.location.href = api.auth.getGoogleAuthUrl();
  };

  /**
   * Logout the current user
   */
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call the logout API
      await api.auth.logout();

      // Clear the user state
      setUser(null);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
    } catch (err) {
      setError(err.message || "Failed to logout");
      console.error("Logout error:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update the user's profile
   * @param {Object} profileData - The user data to update
   */
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      // Call the update profile API
      const updatedUser = await api.users.updateProfile(profileData);

      // Update the user state
      setUser(updatedUser);

      // Update the role in localStorage
      localStorage.setItem("userRole", updatedUser.role);

      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error("Profile update error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    loginWithGoogle,
    logout,
    updateProfile,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the auth context
 * @returns {Object} - The auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * ProtectedRoute Component
 * Renders children only if user is authenticated.
 * Otherwise redirects to login page, preserving the return URL.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render when authenticated
 * @param {string} [props.requiredRole] - Optional role required to access the route
 * @returns {JSX.Element} The protected route component
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="protected-route-loading">
        <LoadingSpinner size="large" text="Verifying your credentials..." />
      </div>
    );
  }

  // If not authenticated, redirect to signin with the return URL
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ returnUrl: location.pathname }} replace />;
  }

  // If role is required, check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    // User is authenticated but doesn't have the required role
    return <Navigate to="/unauthorized" replace />;
  }

  // User is authenticated and has the required role (if any), render children
  return children;
};

export default ProtectedRoute; 
import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component
 * Displays a 404 page when a user tries to access a non-existent route
 * 
 * @returns {JSX.Element} The not found component
 */
const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-icon">🔍</div>
        <h1>Page Not Found</h1>
        <p>
          The page you're looking for doesn't exist or has been moved.
          Please check the URL or go back to the home page.
        </p>
        
        <div className="action-links">
          <Link to="/" className="primary-link">
            Go to Home
          </Link>
          <Link to="/dashboard" className="secondary-link">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 
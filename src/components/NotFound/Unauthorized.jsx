import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './NotFound.css';

/**
 * Unauthorized Component
 * Displays a message when users try to access a page they don't have permission for
 * 
 * @returns {JSX.Element} The unauthorized component
 */
const Unauthorized = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="not-found-container unauthorized">
      <div className="not-found-content">
        <div className="error-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>
          You don't have permission to access this page. This area may be restricted to users with different roles.
        </p>
        
        <div className="action-links">
          {user ? (
            <>
              <Link to="/dashboard" className="primary-link">
                Go to Dashboard
              </Link>
              <button onClick={logout} className="secondary-link">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="primary-link">
                Log In
              </Link>
              <Link to="/" className="secondary-link">
                Go to Home
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unauthorized; 
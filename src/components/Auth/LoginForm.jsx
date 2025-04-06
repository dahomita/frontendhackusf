import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../Common/Card';
import Button from '../Common/Button';
import './Auth.css';

/**
 * LoginForm Component
 * Renders a form for user login with email and password.
 * Also provides a Google login option.
 * 
 * @returns {JSX.Element} The login form component
 */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, googleLogin, loading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the return URL from location state, or default to dashboard
  const returnUrl = location.state?.returnUrl || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Validate form
    if (!email || !password) {
      setFormError('Please enter both email and password');
      return;
    }

    try {
      // Log in the user
      await login(email, password);
      // On successful login, navigate to the return URL
      navigate(returnUrl, { replace: true });
    } catch (err) {
      // Error is already handled by useAuth, but we can set a form-specific error
      setFormError(err.message || 'Invalid email or password');
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
    // The redirect to Google happens in the authService
  };

  return (
    <div className="auth-container">
      <Card elevation="medium" className="auth-card">
        <Card.Header title="Log In" />
        <Card.Content>
          {(formError || error) && (
            <div className="auth-error" role="alert">
              {formError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="auth-actions">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                loading={loading}
                disabled={loading}
              >
                Log In
              </Button>
            </div>
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <Button
            variant="outline"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={loading}
            className="google-login-button"
          >
            <span className="google-icon">G</span>
            Continue with Google
          </Button>

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default LoginForm; 
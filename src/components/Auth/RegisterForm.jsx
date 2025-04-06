import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../Common/Card';
import Button from '../Common/Button';
import './Auth.css';

/**
 * RegisterForm Component
 * Renders a form for user registration with username, email, and password.
 * Also provides a Google login option.
 * 
 * @returns {JSX.Element} The registration form component
 */
const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { register, googleLogin, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Form validation
    if (!username || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setFormError('Password must be at least 8 characters long');
      return;
    }

    try {
      // Register the user
      await register(username, email, password);
      // On successful registration, navigate to dashboard
      navigate('/dashboard', { replace: true });
    } catch (err) {
      // Error is already handled by useAuth, but we can set a form-specific error
      setFormError(err.message || 'Registration failed');
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
    // The redirect to Google happens in the authService
  };

  return (
    <div className="auth-container">
      <Card elevation="medium" className="auth-card">
        <Card.Header title="Create Account" />
        <Card.Content>
          {(formError || error) && (
            <div className="auth-error" role="alert">
              {formError || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                placeholder="Choose a username"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
              />
              <small className="form-hint">Must be at least 8 characters</small>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                placeholder="Confirm your password"
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
                Sign Up
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
              Already have an account?{' '}
              <Link to="/signin" className="auth-link">
                Log In
              </Link>
            </p>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default RegisterForm; 
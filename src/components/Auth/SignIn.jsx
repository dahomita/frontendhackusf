import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
    stayLoggedIn: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in with:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to FallGuardian</h1>
        <p className="auth-subtitle">Sign in to access your account</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
              aria-required="true"
              aria-label="Email Address"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
              aria-required="true"
              aria-label="Password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role" className="form-label">I am a:</label>
            <div className="role-selector">
              <div className="role-option">
                <input
                  type="radio"
                  id="patient"
                  name="role"
                  value="patient"
                  checked={formData.role === 'patient'}
                  onChange={handleChange}
                  aria-label="Patient"
                />
                <label htmlFor="patient" className="role-label">
                  <span className="role-icon">👤</span>
                  <span>Patient</span>
                </label>
              </div>
              
              <div className="role-option">
                <input
                  type="radio"
                  id="nurse"
                  name="role"
                  value="nurse"
                  checked={formData.role === 'nurse'}
                  onChange={handleChange}
                  aria-label="Nurse"
                />
                <label htmlFor="nurse" className="role-label">
                  <span className="role-icon">👩‍⚕️</span>
                  <span>Nurse</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="stayLoggedIn"
              name="stayLoggedIn"
              checked={formData.stayLoggedIn}
              onChange={handleChange}
              aria-label="Stay logged in"
            />
            <label htmlFor="stayLoggedIn" className="checkbox-label">Stay logged in</label>
          </div>
          
          <button type="submit" className="auth-button">Sign In</button>
          
          <div className="auth-links">
            <Link to="/forgot-password" className="auth-link">Forgot Password?</Link>
            <Link to="/signup" className="auth-link">Don't have an account? Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn; 
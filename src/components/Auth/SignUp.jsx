import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    agreeToTerms: false
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
    // Handle sign up logic here
    console.log('Sign up with:', formData);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">Join FallGuardian for enhanced safety and care</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your first name"
                required
                aria-required="true"
                aria-label="First Name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your last name"
                required
                aria-required="true"
                aria-label="Last Name"
              />
            </div>
          </div>
          
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
              placeholder="Create a password"
              required
              aria-required="true"
              aria-label="Password"
            />
            <p className="form-help">Password must be at least 8 characters long</p>
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
              required
              aria-required="true"
              aria-label="Confirm Password"
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
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Agree to terms and conditions"
            />
            <label htmlFor="agreeToTerms" className="checkbox-label">
              I agree to the <Link to="/terms" className="inline-link">Terms of Service</Link> and <Link to="/privacy" className="inline-link">Privacy Policy</Link>
            </label>
          </div>
          
          <button type="submit" className="auth-button">Create Account</button>
          
          <div className="auth-links">
            <Link to="/signin" className="auth-link">Already have an account? Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp; 
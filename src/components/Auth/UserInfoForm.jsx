import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

/**
 * UserInfoForm Component
 *
 * This component displays a form for collecting additional user information
 * after successful Google authentication. It collects:
 * - First Name
 * - Last Name
 * - Age
 * - Phone Number
 * - Role (Patient / Nurse)
 *
 * The form is designed with accessibility in mind for elderly users.
 */
const UserInfoForm = () => {
  const navigate = useNavigate();
  const { user, updateProfile, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    phoneNumber: "",
    role: "patient",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pre-fill the form with user data if available
  useEffect(() => {
    if (user) {
      // Split the name into first and last name
      const nameParts = user.name ? user.name.split(" ") : ["", ""];

      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        age: user.age ? user.age.toString() : "",
        phoneNumber: user.phoneNumber || "",
        role: user.role || "patient",
      }));
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  //

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form data
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.age ||
        !formData.phoneNumber
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Prepare user data for the API
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`,
        age: parseInt(formData.age, 10),
        phoneNumber: formData.phoneNumber,
        role: formData.role,
      };

      // Update the user profile
      const updatedUser = await updateProfile(userData);

      // Redirect to the appropriate dashboard based on role
      if (updatedUser.role === "patient") {
        navigate("/patient/dashboard");
      } else if (updatedUser.role === "nurse") {
        navigate("/staff/dashboard");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Complete Your Profile</h1>
        <p className="auth-subtitle">
          Please provide additional information to complete your account setup
        </p>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
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
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
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

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your age"
                min="1"
                max="120"
                required
                aria-required="true"
                aria-label="Age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your phone number"
                required
                aria-required="true"
                aria-label="Phone Number"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              I am a:
            </label>
            <div className="role-selector">
              <div className="role-option">
                <input
                  type="radio"
                  id="patient"
                  name="role"
                  value="patient"
                  checked={formData.role === "patient"}
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
                  checked={formData.role === "nurse"}
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

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
            aria-label={isSubmitting ? "Submitting..." : "Complete Profile"}
          >
            {isSubmitting ? "Submitting..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;

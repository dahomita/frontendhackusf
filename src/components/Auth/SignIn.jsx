import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

/**
 * SignIn Component
 *
 * This component has been modified to only allow Google authentication.
 * All other authentication methods (email/password) have been removed.
 * After successful Google authentication, the user will be redirected to
 * the UserInfoForm component to complete their profile.
 */
const SignIn = () => {
  const navigate = useNavigate();
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle Google Sign In
   *
   * This function initiates the Google authentication flow.
   * It uses the loginWithGoogle method from the AuthContext.
   */
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Use the loginWithGoogle method from the AuthContext
      loginWithGoogle();
      
      // Note: The actual redirect happens in the loginWithGoogle method,
      // so the code below won't execute until the user returns from Google auth
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setIsLoading(false);
    }
  };

  // If the user is already authenticated, redirect to the appropriate dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'patient') {
        navigate('/patient/dashboard');
      } else if (userRole === 'nurse') {
        navigate('/staff/dashboard');
      } else {
        // If the user doesn't have a role yet, redirect to the user info form
        navigate('/complete-profile');
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to SafeGuard</h1>
        <p className="auth-subtitle">Sign in to access your account</p>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <div className="auth-form">
          <div className="google-signin-container">
            <button
              onClick={handleGoogleSignIn}
              className="google-signin-button"
              disabled={isLoading}
              aria-label={isLoading ? "Signing in..." : "Sign in with Google"}
            >
              <svg
                className="google-icon"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 533.5 544.3"
                width="24"
                height="24"
              >
                <path
                  fill="#4285F4"
                  d="M533.5 278.4c0-17.5-1.4-34.1-4.1-50.2H272v95h146.9c-6.3 33.7-25 62.3-53.3 81.3v67h85.9c50.2-46.3 81-114.6 81-193.1z"
                />
                <path
                  fill="#34A853"
                  d="M272 544.3c72.6 0 133.5-24.1 178-65.5l-85.9-67c-23.8 15.9-54.2 25.4-92.1 25.4-70.7 0-130.5-47.8-151.9-112.1h-89.6v70.5c44.4 87.3 135 148.7 241.5 148.7z"
                />
                <path
                  fill="#FBBC04"
                  d="M120.1 324.8c-10.2-30.3-10.2-62.8 0-93.1v-70.5H30.5c-39.6 77.9-39.6 168.3 0 246.2l89.6-70.5z"
                />
                <path
                  fill="#EA4335"
                  d="M272 107.7c39.6-.6 77.5 13.6 106.5 39.3l79.4-79.4C409.9 23.1 344.1-1.5 272 0 165.5 0 74.9 61.4 30.5 148.7l89.6 70.5C141.5 155.5 201.3 107.7 272 107.7z"
                />
              </svg>
              <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
            </button>
          </div>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-links">
            <Link to="/signup" className="auth-link">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

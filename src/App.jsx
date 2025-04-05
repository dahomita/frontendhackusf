import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Layout Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Auth Components
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import UserInfoForm from "./components/Auth/UserInfoForm";

// Patient Components
import PatientDashboard from "./components/Patient/PatientDashboard";
import FallDetection from "./components/FallDetection/FallDetection";
import ChatPage from "./components/ChatPage/ChatPage";
import ComingSoon from "./components/ComingSoon/ComingSoon";

// Staff Components
import StaffDashboard from "./components/Staff/StaffDashboard";
import FallPopup from "./components/Staff/FallPopup";

// Error Pages
import NotFound from "./components/NotFound/NotFound";

// Home Component
import HomePage from "./components/HomePage/HomePage";

/**
 * ProtectedRoute Component
 *
 * This component ensures that only authenticated users with the correct role
 * can access specific routes. If the user is not authenticated or has the wrong
 * role, they will be redirected to the home page.
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("userRole");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} userRole={userRole} />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/complete-profile" element={<UserInfoForm />} />

            {/* Patient Routes */}
            <Route
              path="/patient/dashboard"
              element={
                // <ProtectedRoute requiredRole="patient">
                // </ProtectedRoute>
                <PatientDashboard />
              }
            />
            <Route
              path="/patient/monitor"
              element={
                // <ProtectedRoute requiredRole="patient">
                // </ProtectedRoute>
                <FallDetection />
              }
            />
            <Route
              path="/patient/chat"
              element={
                // <ProtectedRoute requiredRole="patient">
                // </ProtectedRoute>
                <ChatPage />
              }
            />

            {/* Coming Soon Routes */}
            <Route
              path="/patient/voice"
              element={<ComingSoon feature="voice" />}
            />
            <Route
              path="/patient/contacts"
              element={<ComingSoon feature="contacts" />}
            />
            <Route
              path="/patient/medications"
              element={<ComingSoon feature="medications" />}
            />

            {/* Staff Routes */}
            <Route
              path="/staff/dashboard"
              element={
                // <ProtectedRoute requiredRole="staff">
                // </ProtectedRoute>
                <StaffDashboard />
              }
            />

            {/* 404 Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

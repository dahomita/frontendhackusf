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

// Patient Components
import PatientDashboard from "./components/Patient/PatientDashboard";
import FallDetection from "./components/FallDetection/FallDetection";
import ChatPage from "./components/ChatPage/ChatPage";

// Staff Components
import StaffDashboard from "./components/Staff/StaffDashboard";
import FallPopup from "./components/Staff/FallPopup";

// Home Component
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  // This would be replaced with actual auth state management
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/signin" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Patient Routes */}
            <Route
              path="/patient/dashboard"
              element={
                // <ProtectedRoute allowedRoles={["patient"]}>
                // </ProtectedRoute>
                <PatientDashboard />
              }
            />
            <Route
              path="/patient/monitor"
              element={
                // <ProtectedRoute allowedRoles={["patient"]}>
                // </ProtectedRoute>
                <FallDetection />
              }
            />
            <Route
              path="/patient/chat"
              element={
                // <ProtectedRoute allowedRoles={["patient"]}>
                // </ProtectedRoute>
                <ChatPage />
              }
            />

            {/* Staff Routes */}
            <Route
              path="/staff/dashboard"
              element={
                // <ProtectedRoute allowedRoles={["staff", "admin"]}>
                // </ProtectedRoute>
                <StaffDashboard />
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

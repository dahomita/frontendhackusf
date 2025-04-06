import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/AuthContext";

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
import SkinDetect from "./components/SkinDetect/SkinDetect";

// Staff Components
import StaffDashboard from "./components/Staff/StaffDashboard";
import FallPopup from "./components/Staff/FallPopup";

// Profile and Settings Components
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";

// Error Pages
import NotFound from "./components/NotFound/NotFound";

// Home Component
import HomePage from "./components/HomePage/HomePage";
import Features from "./components/Features/Features";
import About from "./components/About/About";

/**
 * ProtectedRoute Component
 *
 * This component ensures that only authenticated users with the correct role
 * can access specific routes. If the user is not authenticated or has the wrong
 * role, they will be redirected to the home page.
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [authState, setAuthState] = useState(isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Header
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          authState={authState}
          setAuthState={setAuthState}
        />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signin"
              element={
                <SignIn authState={authState} setAuthState={setAuthState} />
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/user-info"
              element={
                <ProtectedRoute>
                  <UserInfoForm />
                </ProtectedRoute>
              }
            />

            {/* Profile and Settings Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />

            <Route
              path="/features"
              element={
                <ProtectedRoute>
                  <Features />
                </ProtectedRoute>
              }
            />

            {/* Patient Routes */}
            <Route
              path="/patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/monitor"
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <FallDetection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/chat"
              element={
                <ProtectedRoute allowedRoles={["patient", "nurse"]}>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient/skindetect"
              element={<SkinDetect />}
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
                <ProtectedRoute allowedRoles={["nurse"]}>
                  <StaffDashboard />
                </ProtectedRoute>
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

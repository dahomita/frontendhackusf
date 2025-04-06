import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";

// Context Provider
import { useAuth } from "./context/AuthContext";

// Layout Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Auth Components
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import UserInfoForm from "./components/Auth/UserInfoForm";
import ProtectedRoute from "./components/Common/ProtectedRoute";

// Patient Components
import PatientDashboard from "./components/Patient/PatientDashboard";
import FallDetection from "./components/FallDetection/FallDetection";
import ChatPage from "./components/ChatPage/ChatPage";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import FormsPage from "./components/Patient/Forms/FormsPage";
import FormDetail from "./components/Patient/Forms/FormDetail";
import NewForm from "./components/Patient/Forms/NewForm";

// Staff Components
import StaffDashboard from "./components/Staff/StaffDashboard";
import FallPopup from "./components/Staff/FallPopup";
import NurseForms from "./components/Staff/Forms/NurseForms";
import NurseFormDetail from "./components/Staff/Forms/NurseFormDetail";

// Error Pages
import NotFound from "./components/NotFound/NotFound";
import Unauthorized from "./components/NotFound/Unauthorized";

// Home Component
import HomePage from "./components/HomePage/HomePage";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// Separate component to use auth context inside Router
const AppContent = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/complete-profile" element={
            <ProtectedRoute>
              <UserInfoForm />
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/monitor"
            element={
              <ProtectedRoute requiredRole="patient">
                <FallDetection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/chat"
            element={
              <ProtectedRoute requiredRole="patient">
                <ChatPage />
              </ProtectedRoute>
            }
          />
          
          {/* Patient Form Routes */}
          <Route
            path="/patient/forms"
            element={
              <ProtectedRoute requiredRole="patient">
                <FormsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/forms/new"
            element={
              <ProtectedRoute requiredRole="patient">
                <NewForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/forms/:formId"
            element={
              <ProtectedRoute requiredRole="patient">
                <FormDetail />
              </ProtectedRoute>
            }
          />

          {/* Coming Soon Routes */}
          <Route
            path="/patient/voice"
            element={
              <ProtectedRoute requiredRole="patient">
                <ComingSoon feature="voice" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/contacts"
            element={
              <ProtectedRoute requiredRole="patient">
                <ComingSoon feature="contacts" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/medications"
            element={
              <ProtectedRoute requiredRole="patient">
                <ComingSoon feature="medications" />
              </ProtectedRoute>
            }
          />

          {/* Staff Routes */}
          <Route
            path="/staff/dashboard"
            element={
              <ProtectedRoute requiredRole="staff">
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          
          {/* Staff Form Routes */}
          <Route
            path="/staff/forms"
            element={
              <ProtectedRoute requiredRole="staff">
                <NurseForms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/forms/:formId"
            element={
              <ProtectedRoute requiredRole="staff">
                <NurseFormDetail />
              </ProtectedRoute>
            }
          />

          {/* Dashboard Route - redirects based on user role */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                {user?.role === 'staff' ? (
                  <Navigate to="/staff/dashboard" replace />
                ) : (
                  <Navigate to="/patient/dashboard" replace />
                )}
              </ProtectedRoute>
            } 
          />

          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

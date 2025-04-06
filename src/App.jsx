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
  const { user } = useAuth();
  
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/complete-profile" element={<UserInfoForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Patient Routes */}
          <Route
            path="/patient/dashboard"
            element={<PatientDashboard />}
          />
          <Route
            path="/patient/monitor"
            element={<FallDetection />}
          />
          <Route
            path="/patient/chat"
            element={<ChatPage />}
          />
          
          {/* Patient Form Routes */}
          <Route
            path="/patient/forms"
            element={<FormsPage />}
          />
          <Route
            path="/patient/forms/new"
            element={<NewForm />}
          />
          <Route
            path="/patient/forms/:formId"
            element={<FormDetail />}
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
            element={<StaffDashboard />}
          />
          
          {/* Staff Skin Detection Route */}
          <Route
            path="/staff/skindetect"
            element={<StaffDashboard defaultTab="skinDetect" />}
          />
          
          {/* Staff Form Routes */}
          <Route
            path="/staff/forms"
            element={<NurseForms />}
          />
          <Route
            path="/staff/forms/:formId"
            element={<NurseFormDetail />}
          />

          {/* Dashboard Route - redirects based on user role */}
          <Route 
            path="/dashboard" 
            element={
              user?.role === 'staff' ? (
                <Navigate to="/staff/dashboard" replace />
              ) : (
                <Navigate to="/patient/dashboard" replace />
              )
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

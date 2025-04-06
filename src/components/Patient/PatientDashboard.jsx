import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import "./Patient.css";

const PatientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [fallRiskLevel, setFallRiskLevel] = useState('Low');
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    // Determine fall risk level based on age
    if (user?.age) {
      if (user.age < 40) {
        setFallRiskLevel('Low');
      } else if (user.age >= 40 && user.age < 65) {
        setFallRiskLevel('Moderate');
      } else {
        setFallRiskLevel('High');
      }
    }

    // Fetch recent incidents
    const fetchIncidents = async () => {
      try {
        // TODO: Replace with actual API call
        const mockIncidents = [
          {
            id: 1,
            date: '2024-03-15',
            time: '14:30',
            location: 'Living Room',
            severity: 'Minor',
            status: 'Resolved'
          }
        ];
        setRecentIncidents(mockIncidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, [user]);

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'Low':
        return 'var(--success-color)';
      case 'Moderate':
        return 'var(--warning-color)';
      case 'High':
        return 'var(--error-color)';
      default:
        return 'var(--text-color)';
    }
  };

  if (isLoading) {
    return (
      <div className="patient-dashboard loading">
        <div className="loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="patient-dashboard" role="main">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || 'Patient'}</h1>
        <div className="risk-level" style={{ backgroundColor: getRiskLevelColor(fallRiskLevel) }}>
          Fall Risk Level: {fallRiskLevel}
        </div>
        <p className="last-login">Last login: Today at 9:30 AM</p>
      </header>

      <nav
        className="dashboard-nav"
        role="navigation"
        aria-label="Dashboard navigation"
      >
        <button
          className={`nav-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => handleTabChange("overview")}
          aria-selected={activeTab === "overview"}
          role="tab"
        >
          Overview
        </button>
        <button
          className={`nav-button ${activeTab === "monitor" ? "active" : ""}`}
          onClick={() => handleTabChange("monitor")}
          aria-selected={activeTab === "monitor"}
          role="tab"
        >
          Fall Monitor
        </button>
        <button
          className={`nav-button ${activeTab === "help" ? "active" : ""}`}
          onClick={() => handleTabChange("help")}
          aria-selected={activeTab === "help"}
          role="tab"
        >
          Help Center
        </button>
        <button
          className={`nav-button ${activeTab === "social" ? "active" : ""}`}
          onClick={() => handleTabChange("social")}
          aria-selected={activeTab === "social"}
          role="tab"
        >
          Social Hub
        </button>
      </nav>

      <main className="dashboard-content" role="tabpanel">
        {activeTab === "overview" && (
          <section
            className="overview-section"
            aria-labelledby="overview-title"
          >
            <h2 id="overview-title">Health Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Fall Risk Level</h3>
                <p className="stat-value" style={{ color: getRiskLevelColor(fallRiskLevel) }}>{fallRiskLevel}</p>
                <p className="stat-description">Based on age: {user?.age || 'N/A'} years</p>
              </div>
              <div className="stat-card">
                <h3>Daily Steps</h3>
                <p className="stat-value">4,567</p>
                <p className="stat-description">Goal: 5,000 steps</p>
              </div>
              <div className="stat-card">
                <h3>Next Check-in</h3>
                <p className="stat-value">2:30 PM</p>
                <p className="stat-description">With Nurse Sarah</p>
              </div>
              <div className="stat-card">
                <h3>Emergency Contacts</h3>
                <p className="stat-value">2 Active</p>
                <p className="stat-description">Family & Caregiver</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "monitor" && (
          <section className="monitor-section" aria-labelledby="monitor-title">
            <h2 id="monitor-title">Fall Detection Monitor</h2>
            <div className="monitor-container">
              <Link to="/patient/monitor" className="start-monitor-button">
                Start Fall Detection
              </Link>
              <div className="monitor-status">
                <p>
                  Status: <span className="status-active">Active</span>
                </p>
                <p>Last checked: 2 minutes ago</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "help" && (
          <section className="help-section" aria-labelledby="help-title">
            <h2 id="help-title">Help Request Center</h2>
            <div className="help-options">
              <button className="help-button emergency">Emergency Help</button>
              <button className="help-button medical">
                Medical Assistance
              </button>
              <button className="help-button technical">
                Technical Support
              </button>
            </div>
          </section>
        )}

        {activeTab === "social" && (
          <section className="social-section" aria-labelledby="social-title">
            <h2 id="social-title">Social Connections</h2>
            <div className="social-grid">
              <div className="social-card">
                <h3>Family Chat</h3>
                <p>3 new messages</p>
                <Link to="/chat" className="view-chat-button">
                  View Chat
                </Link>
              </div>
              <div className="social-card">
                <h3>Community Events</h3>
                <p>2 upcoming events</p>
                <Link to="/events" className="view-events-button">
                  View Events
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <aside className="quick-actions" role="complementary">
        <h2>Quick Actions</h2>
        <Link to="/patient/voice" className="action-button" aria-label="Toggle voice control">
          <span className="action-icon">🎤</span>
          Voice Control
        </Link>
        <Link to="/patient/contacts" className="action-button" aria-label="View contact list">
          <span className="action-icon">👥</span>
          Contacts
        </Link>
        <Link to="/patient/medications" className="action-button" aria-label="View medication schedule">
          <span className="action-icon">💊</span>
          Medications
        </Link>
      </aside>
    </div>
  );
};

export default PatientDashboard;

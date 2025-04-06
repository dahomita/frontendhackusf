import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Patient.css";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [nurse, setNurse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patientName, setPatientName] = useState("Patient");
  const [nurseFetched, setNurseFetched] = useState(false);

  const fetchNurseData = async () => {
    if (nurseFetched) return; // Don't fetch if we've already fetched once
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/patient/me/nurse`, {
        credentials: 'include', // Include cookies for authentication
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load nurse information');
      }
      
      const data = await response.json();
      setNurse(data);
      setNurseFetched(true);
      
      // Set patient name if available from the response
      if (data.patient && data.patient.name) {
        setPatientName(data.patient.name.split(' ')[0]); // Just use first name
      }
    } catch (err) {
      console.error('Error fetching nurse data:', err);
      setError(err.message || 'Failed to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    
    // Only fetch nurse data when the nurse tab is selected
    if (tab === "nurse") {
      fetchNurseData();
    }
  };

  return (
    <div className="patient-dashboard" role="main">
      <header className="dashboard-header">
        <h1>Welcome, {patientName}</h1>
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
          className={`nav-button ${activeTab === "nurse" ? "active" : ""}`}
          onClick={() => handleTabChange("nurse")}
          aria-selected={activeTab === "nurse"}
          role="tab"
        >
          My Nurse
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

      {error && activeTab === "nurse" && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <main className="dashboard-content" role="tabpanel">
        {activeTab === "overview" && (
          <section
            className="overview-section"
            aria-labelledby="overview-title"
          >
            <h2 id="overview-title">Health Overview</h2>
            <div className="stats-grid">
              <div className="stat-card" role="status">
                <h3>Fall Risk Level</h3>
                <p className="stat-value low-risk">Low</p>
                <p className="stat-description">Based on recent activity</p>
              </div>
              <div className="stat-card" role="status">
                <h3>Daily Steps</h3>
                <p className="stat-value">4,567</p>
                <p className="stat-description">Goal: 5,000 steps</p>
              </div>
              <div className="stat-card" role="status">
                <h3>My Nurse</h3>
                <p className="stat-value">Not Loaded</p>
                <p className="stat-description">
                  <button 
                    className="contact-nurse-button"
                    onClick={() => handleTabChange("nurse")}
                  >
                    View Nurse Details
                  </button>
                </p>
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

        {activeTab === "nurse" && (
          <section className="nurse-section" aria-labelledby="nurse-title">
            <h2 id="nurse-title">My Assigned Nurse</h2>
            {loading ? (
              <div className="loading-indicator">Loading nurse information...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : !nurse ? (
              <div className="no-nurse-message">
                <p>You don't have an assigned nurse yet.</p>
                <p>Please contact the medical center for assistance.</p>
              </div>
            ) : (
              <div className="nurse-profile">
                <div className="nurse-avatar">
                  <img src={nurse.avatar} alt={`${nurse.name}'s avatar`} />
                </div>
                <div className="nurse-details">
                  <h3>{nurse.name}</h3>
                  <p><strong>Email:</strong> {nurse.email}</p>
                  {nurse.phoneNumber && (
                    <p><strong>Phone:</strong> {nurse.phoneNumber}</p>
                  )}
                  <div className="nurse-actions">
                    <a href={`tel:${nurse.phoneNumber}`} className="call-button">
                      Call Nurse
                    </a>
                    <a href={`sms:${nurse.phoneNumber}`} className="message-button">
                      Send Message
                    </a>
                  </div>
                </div>
              </div>
            )}
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

            <div className="form-section-promo">
              <h3>Need to communicate with your nurse?</h3>
              <p>Use our secure messaging system to send questions or requests directly to your assigned nurse.</p>
              <Link to="/patient/forms" className="form-link-button">
                <span className="form-icon">📝</span>
                View My Messages
              </Link>
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
        {nurse && (
          <a href={`tel:${nurse.phoneNumber}`} className="action-button emergency-action" aria-label="Call nurse">
            <span className="action-icon">📞</span>
            Call Nurse
          </a>
        )}
      </aside>
    </div>
  );
};

export default PatientDashboard;

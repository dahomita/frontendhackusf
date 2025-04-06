import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Staff.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeIncidents] = useState([
    {
      id: 1,
      patientName: 'John Smith',
      location: 'Room 101',
      time: '10:30 AM',
      status: 'critical',
      type: 'fall'
    },
    {
      id: 2,
      patientName: 'Mary Johnson',
      location: 'Room 203',
      time: '11:15 AM',
      status: 'warning',
      type: 'medication'
    }
  ]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleIncidentAction = (incidentId, action) => {
    // Handle incident actions (acknowledge, respond, etc.)
    console.log(`Action ${action} taken on incident ${incidentId}`);
  };

  const handleNavigateToSkinDetect = () => {
    navigate('/staff/skindetect');
  };

  return (
    <div className="staff-dashboard" role="main">
      <header className="dashboard-header">
        <h1>Staff Dashboard</h1>
        <p className="last-update">Last updated: {new Date().toLocaleTimeString()}</p>
      </header>

      <nav className="dashboard-nav" role="navigation" aria-label="Dashboard navigation">
        <button
          className={`nav-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => handleTabChange('overview')}
          aria-selected={activeTab === 'overview'}
          role="tab"
        >
          Overview
        </button>
        <button
          className={`nav-button ${activeTab === 'incidents' ? 'active' : ''}`}
          onClick={() => handleTabChange('incidents')}
          aria-selected={activeTab === 'incidents'}
          role="tab"
        >
          Active Incidents
        </button>
        <button
          className={`nav-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => handleTabChange('patients')}
          aria-selected={activeTab === 'patients'}
          role="tab"
        >
          Patient List
        </button>
        <button
          className={`nav-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => handleTabChange('reports')}
          aria-selected={activeTab === 'reports'}
          role="tab"
        >
          Reports
        </button>
        <button
          className={`nav-button skin-detection-btn`}
          onClick={handleNavigateToSkinDetect}
          role="tab"
        >
          Skin Cancer Detection
        </button>
      </nav>

      <main className="dashboard-content" role="tabpanel">
        {activeTab === 'overview' && (
          <section className="overview-section" aria-labelledby="overview-title">
            <h2 id="overview-title">Overview</h2>
            <div className="stats-grid">
              <div className="stat-card" role="status">
                <h3>Active Patients</h3>
                <p className="stat-value">24</p>
                <p className="stat-description">Total monitored patients</p>
              </div>
              <div className="stat-card" role="status">
                <h3>Active Incidents</h3>
                <p className="stat-value warning">2</p>
                <p className="stat-description">Requiring attention</p>
              </div>
              <div className="stat-card" role="status">
                <h3>Staff Available</h3>
                <p className="stat-value">8</p>
                <p className="stat-description">On duty now</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'incidents' && (
          <section className="incidents-section" aria-labelledby="incidents-title">
            <h2 id="incidents-title">Active Incidents</h2>
            <div className="incidents-list">
              {activeIncidents.map((incident) => (
                <div
                  key={incident.id}
                  className={`incident-card ${incident.status}`}
                  role="alert"
                >
                  <div className="incident-header">
                    <h3>{incident.patientName}</h3>
                    <span className="incident-time">{incident.time}</span>
                  </div>
                  <div className="incident-details">
                    <p><strong>Location:</strong> {incident.location}</p>
                    <p><strong>Type:</strong> {incident.type}</p>
                    <p><strong>Status:</strong> {incident.status}</p>
                  </div>
                  <div className="incident-actions">
                    <button
                      className="action-button acknowledge"
                      onClick={() => handleIncidentAction(incident.id, 'acknowledge')}
                      aria-label={`Acknowledge incident for ${incident.patientName}`}
                    >
                      Acknowledge
                    </button>
                    <button
                      className="action-button respond"
                      onClick={() => handleIncidentAction(incident.id, 'respond')}
                      aria-label={`Respond to incident for ${incident.patientName}`}
                    >
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'patients' && (
          <section className="patients-section" aria-labelledby="patients-title">
            <h2 id="patients-title">Patient List</h2>
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search patients..."
                aria-label="Search patients"
                className="search-input"
              />
            </div>
            <div className="patients-list" role="list">
              {/* Patient list items would go here */}
              <p className="placeholder-text">Patient list loading...</p>
            </div>
          </section>
        )}

        {activeTab === 'reports' && (
          <section className="reports-section" aria-labelledby="reports-title">
            <h2 id="reports-title">Reports</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>Daily Summary</h3>
                <button className="view-report-button">
                  View Report
                </button>
              </div>
              <div className="report-card">
                <h3>Weekly Analysis</h3>
                <button className="view-report-button">
                  View Report
                </button>
              </div>
              <div className="report-card">
                <h3>Monthly Statistics</h3>
                <button className="view-report-button">
                  View Report
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <aside className="quick-actions" role="complementary">
        <h2>Quick Actions</h2>
        <button className="action-button" aria-label="Add new patient">
          <span className="action-icon">➕</span>
          Add Patient
        </button>
        <button className="action-button" aria-label="View alerts">
          <span className="action-icon">🔔</span>
          Alerts
        </button>
        <button className="action-button" aria-label="View schedule">
          <span className="action-icon">📅</span>
          Schedule
        </button>
      </aside>
    </div>
  );
};

export default StaffDashboard; 
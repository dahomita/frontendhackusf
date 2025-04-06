import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Staff.css';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [patients, setPatients] = useState([]);
  const [myPatients, setMyPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeIncidents, setActiveIncidents] = useState([
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

  const fetchPatients = async () => {
    if (patients.length > 0) return; // Avoid fetching if we already have data
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/nurse/patients`, {
        credentials: 'include', // Include cookies for authentication
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load patients');
      }
      
      const data = await response.json();
      
      // API directly returns array of patients, not wrapped in a success object
      setPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError(err.message || 'Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyPatients = async () => {
    if (myPatients.length > 0) return; // Avoid fetching if we already have data
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/nurse/me/patients`, {
        credentials: 'include', // Include cookies for authentication
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load your patients');
      }
      
      const data = await response.json();
      
      // API directly returns array of patients
      setMyPatients(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching assigned patients:', err);
      setError(err.message || 'Failed to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const assignPatient = async (patientId) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/nurse/me/patients/${patientId}/assign`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to assign patient');
      }
      
      // Update my patients list
      await fetchMyPatients();
      
      // Update the all patients list to reflect assignment
      setPatients(patients.map(p => 
        p._id === patientId ? { ...p, nurseId: true } : p
      ));
      
      setSuccessMessage('Patient assigned successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error assigning patient:', err);
      setError(err.message || 'Failed to assign patient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removePatient = async (patientId) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/nurse/me/patients/${patientId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to remove patient');
      }
      
      // Update local state to remove patient from my patients
      setMyPatients(myPatients.filter(p => p._id !== patientId));
      
      // Update the all patients list to reflect the unassignment
      setPatients(patients.map(p => 
        p._id === patientId ? { ...p, nurseId: null } : p
      ));
      
      setSuccessMessage('Patient removed successfully');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Error removing patient:', err);
      setError(err.message || 'Failed to remove patient. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'forms') {
      navigate('/staff/forms');
      return;
    }
    
    setActiveTab(tab);
    if (tab === 'patients') {
      fetchPatients();
    } else if (tab === 'myPatients') {
      fetchMyPatients();
    }
  };

  const handleIncidentAction = (incidentId, action) => {
    // Handle incident actions (acknowledge, respond, etc.)
    console.log(`Action ${action} taken on incident ${incidentId}`);
  };

  // Fetch patients if tab is already 'patients' on first render
  useEffect(() => {
    if (activeTab === 'patients') {
      fetchPatients();
    } else if (activeTab === 'myPatients') {
      fetchMyPatients();
    }
  }, []);

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
          All Patients
        </button>
        <button
          className={`nav-button ${activeTab === 'myPatients' ? 'active' : ''}`}
          onClick={() => handleTabChange('myPatients')}
          aria-selected={activeTab === 'myPatients'}
          role="tab"
        >
          My Patients
        </button>
        <button
          className={`nav-button ${activeTab === 'forms' ? 'active' : ''}`}
          onClick={() => handleTabChange('forms')}
          aria-selected={activeTab === 'forms'}
          role="tab"
        >
          Patient Messages
        </button>
        <button
          className={`nav-button ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => handleTabChange('reports')}
          aria-selected={activeTab === 'reports'}
          role="tab"
        >
          Reports
        </button>
      </nav>

      {successMessage && (
        <div className="success-message" role="alert">
          {successMessage}
        </div>
      )}

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
            <h2 id="patients-title">All Patients</h2>
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search patients..."
                aria-label="Search patients"
                className="search-input"
              />
            </div>
            <div className="patients-list" role="list">
              {isLoading ? (
                <p className="placeholder-text">Loading patients...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : patients.length === 0 ? (
                <p className="placeholder-text">No patients found</p>
              ) : (
                patients.map(patient => (
                  <div key={patient._id} className="patient-card" role="listitem">
                    <div className="patient-info">
                      <div className="patient-header">
                        <h3>{patient.name}</h3>
                        <div className="patient-avatar">
                          <img src={patient.avatar} alt={`${patient.name}'s avatar`} />
                        </div>
                      </div>
                      <div className="patient-details">
                        <p><strong>Email:</strong> {patient.email}</p>
                        {patient.age && <p><strong>Age:</strong> {patient.age}</p>}
                        {patient.phoneNumber && <p><strong>Phone:</strong> {patient.phoneNumber}</p>}
                        <p><strong>Status:</strong> {patient.nurseId ? 'Assigned' : 'Unassigned'}</p>
                      </div>
                    </div>
                    <div className="patient-actions">
                      {!patient.nurseId ? (
                        <button 
                          className="assign-patient-button"
                          onClick={() => assignPatient(patient._id)}
                          disabled={isLoading}
                          aria-label={`Assign ${patient.name} to yourself`}
                        >
                          Assign to Me
                        </button>
                      ) : (
                        <button 
                          className="view-patient-button"
                          aria-label={`View details for ${patient.name}`}
                        >
                          View Details
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === 'myPatients' && (
          <section className="patients-section" aria-labelledby="my-patients-title">
            <h2 id="my-patients-title">My Assigned Patients</h2>
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search my patients..."
                aria-label="Search my patients"
                className="search-input"
              />
            </div>
            <div className="patients-list" role="list">
              {isLoading ? (
                <p className="placeholder-text">Loading your patients...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : myPatients.length === 0 ? (
                <p className="placeholder-text">You have no assigned patients</p>
              ) : (
                myPatients.map(patient => (
                  <div key={patient._id} className="patient-card" role="listitem">
                    <div className="patient-info">
                      <div className="patient-header">
                        <h3>{patient.name}</h3>
                        <div className="patient-avatar">
                          <img src={patient.avatar} alt={`${patient.name}'s avatar`} />
                        </div>
                      </div>
                      <div className="patient-details">
                        <p><strong>Email:</strong> {patient.email}</p>
                        {patient.age && <p><strong>Age:</strong> {patient.age}</p>}
                        {patient.phoneNumber && <p><strong>Phone:</strong> {patient.phoneNumber}</p>}
                        <p><strong>Status:</strong> Assigned to you</p>
                      </div>
                    </div>
                    <div className="patient-actions">
                      <button 
                        className="view-patient-button"
                        aria-label={`View details for ${patient.name}`}
                      >
                        View Details
                      </button>
                      <button 
                        className="remove-patient-button"
                        onClick={() => removePatient(patient._id)}
                        disabled={isLoading}
                        aria-label={`Unassign ${patient.name}`}
                      >
                        Unassign
                      </button>
                    </div>
                  </div>
                ))
              )}
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
        <button 
          className="action-button" 
          aria-label="View patient messages"
          onClick={() => navigate('/staff/forms')}
        >
          <span className="action-icon">✉️</span>
          Patient Messages
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
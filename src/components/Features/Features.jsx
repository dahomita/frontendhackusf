import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Features.css';

const Features = () => {
  const [activeTab, setActiveTab] = useState('resident');

  return (
    <div className="features-container">
      <div className="features-header">
        <h1>Features</h1>
        <p className="features-subtitle">Discover how FallGuardian enhances safety and connection for elderly residents</p>
      </div>

      <div className="features-tabs">
        <button 
          className={`tab-button ${activeTab === 'resident' ? 'active' : ''}`}
          onClick={() => setActiveTab('resident')}
        >
          <span className="material-icons">elderly</span>
          Resident Features
        </button>
        <button 
          className={`tab-button ${activeTab === 'staff' ? 'active' : ''}`}
          onClick={() => setActiveTab('staff')}
        >
          <span className="material-icons">medical_services</span>
          Staff Features
        </button>
      </div>

      {activeTab === 'resident' && (
        <div className="features-content">
          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">dashboard</span>
              <h2>Home Dashboard</h2>
            </div>
            <div className="feature-details">
              <div className="feature-image">
                <div className="image-placeholder dashboard-image">
                  <span className="material-icons">dashboard</span>
                </div>
              </div>
              <div className="feature-description">
                <p>
                  The resident dashboard provides a clean, accessible interface designed specifically for elderly users:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">contrast</span>
                    <span>High-contrast navigation tiles for easy visibility</span>
                  </li>
                  <li>
                    <span className="material-icons">emergency</span>
                    <span>Emergency button always visible in the corner</span>
                  </li>
                  <li>
                    <span className="material-icons">wifi_tethering</span>
                    <span>Status indicators showing connection to monitoring system</span>
                  </li>
                  <li>
                    <span className="material-icons">accessibility</span>
                    <span>Accessibility features including voice control and font size adjustment</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">help</span>
              <h2>Help Request Center</h2>
            </div>
            <div className="feature-details">
              <div className="feature-description">
                <p>
                  The Help Request Center provides multiple ways for residents to request assistance:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">emergency</span>
                    <span>One-touch emergency assistance button for immediate help</span>
                  </li>
                  <li>
                    <span className="material-icons">medical_services</span>
                    <span>Structured symptom reporting with visual aids</span>
                  </li>
                  <li>
                    <span className="material-icons">category</span>
                    <span>Categorized help requests (medical, personal care, general assistance)</span>
                  </li>
                  <li>
                    <span className="material-icons">history</span>
                    <span>Request status tracking and history</span>
                  </li>
                </ul>
              </div>
              <div className="feature-image">
                <div className="image-placeholder help-image">
                  <span className="material-icons">help</span>
                </div>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">chat</span>
              <h2>AI Companion</h2>
            </div>
            <div className="feature-details">
              <div className="feature-image">
                <div className="image-placeholder ai-image">
                  <span className="material-icons">smart_toy</span>
                </div>
              </div>
              <div className="feature-description">
                <p>
                  Our AI companion provides conversation, assistance, and companionship:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">record_voice_over</span>
                    <span>Voice-activated commands for easy interaction</span>
                  </li>
                  <li>
                    <span className="material-icons">chat</span>
                    <span>Natural conversation on various topics</span>
                  </li>
                  <li>
                    <span className="material-icons">help_outline</span>
                    <span>Answers questions about health, activities, and facility information</span>
                  </li>
                  <li>
                    <span className="material-icons">psychology</span>
                    <span>Emotional support and companionship</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">groups</span>
              <h2>Social Hub</h2>
            </div>
            <div className="feature-details">
              <div className="feature-description">
                <p>
                  The Social Hub connects residents with each other to reduce isolation:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">forum</span>
                    <span>Community chat room for all residents</span>
                  </li>
                  <li>
                    <span className="material-icons">message</span>
                    <span>One-on-one messaging with other residents</span>
                  </li>
                  <li>
                    <span className="material-icons">event</span>
                    <span>Virtual events and activities</span>
                  </li>
                  <li>
                    <span className="material-icons">photo_library</span>
                    <span>Photo and memory sharing</span>
                  </li>
                </ul>
              </div>
              <div className="feature-image">
                <div className="image-placeholder social-image">
                  <span className="material-icons">groups</span>
                </div>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">settings_voice</span>
              <h2>Voice Control</h2>
            </div>
            <div className="feature-details">
              <div className="feature-image">
                <div className="image-placeholder voice-image">
                  <span className="material-icons">mic</span>
                </div>
              </div>
              <div className="feature-description">
                <p>
                  Voice control features make the system accessible to all residents:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">mic</span>
                    <span>Voice activation and deactivation of monitoring</span>
                  </li>
                  <li>
                    <span className="material-icons">record_voice_over</span>
                    <span>Voice commands for navigation and assistance requests</span>
                  </li>
                  <li>
                    <span className="material-icons">accessibility</span>
                    <span>Accessibility for residents with limited mobility</span>
                  </li>
                  <li>
                    <span className="material-icons">translate</span>
                    <span>Multi-language support for diverse residents</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="features-content">
          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">dashboard</span>
              <h2>Main Control Center</h2>
            </div>
            <div className="feature-details">
              <div className="feature-image">
                <div className="image-placeholder control-image">
                  <span className="material-icons">dashboard</span>
                </div>
              </div>
              <div className="feature-description">
                <p>
                  The staff dashboard provides comprehensive monitoring and management:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">people</span>
                    <span>At-a-glance status board of all residents</span>
                  </li>
                  <li>
                    <span className="material-icons">warning</span>
                    <span>Color-coded alerts for different emergency levels</span>
                  </li>
                  <li>
                    <span className="material-icons">queue</span>
                    <span>Active incidents queue for immediate attention</span>
                  </li>
                  <li>
                    <span className="material-icons">analytics</span>
                    <span>Analytics and reporting on resident activity and incidents</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">sensors</span>
              <h2>Fall Detection System</h2>
            </div>
            <div className="feature-details">
              <div className="feature-description">
                <p>
                  Advanced AI-powered fall detection for immediate response:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">notifications_active</span>
                    <span>Real-time alerts when falls are detected</span>
                  </li>
                  <li>
                    <span className="material-icons">person</span>
                    <span>Detailed incident reports with patient profiles</span>
                  </li>
                  <li>
                    <span className="material-icons">location_on</span>
                    <span>Location tracking for quick response</span>
                  </li>
                  <li>
                    <span className="material-icons">history</span>
                    <span>Historical fall data and patterns</span>
                  </li>
                </ul>
              </div>
              <div className="feature-image">
                <div className="image-placeholder fall-image">
                  <span className="material-icons">sensors</span>
                </div>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">medical_services</span>
              <h2>Medical Response</h2>
            </div>
            <div className="feature-details">
              <div className="feature-image">
                <div className="image-placeholder medical-image">
                  <span className="material-icons">medical_services</span>
                </div>
              </div>
              <div className="feature-description">
                <p>
                  Streamlined medical response system for efficient care:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">assignment</span>
                    <span>Quick access to resident medical history</span>
                  </li>
                  <li>
                    <span className="material-icons">local_hospital</span>
                    <span>Direct communication with emergency services</span>
                  </li>
                  <li>
                    <span className="material-icons">medication</span>
                    <span>Medication tracking and reminders</span>
                  </li>
                  <li>
                    <span className="material-icons">note_alt</span>
                    <span>Digital incident reporting and documentation</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="feature-section">
            <div className="feature-header">
              <span className="material-icons">people</span>
              <h2>Staff Management</h2>
            </div>
            <div className="feature-details">
              <div className="feature-description">
                <p>
                  Tools for efficient staff coordination and management:
                </p>
                <ul className="feature-list">
                  <li>
                    <span className="material-icons">schedule</span>
                    <span>Staff scheduling and assignment</span>
                  </li>
                  <li>
                    <span className="material-icons">notifications</span>
                    <span>Automated notifications for staff assignments</span>
                  </li>
                  <li>
                    <span className="material-icons">chat</span>
                    <span>Internal communication system</span>
                  </li>
                  <li>
                    <span className="material-icons">assessment</span>
                    <span>Performance tracking and reporting</span>
                  </li>
                </ul>
              </div>
              <div className="feature-image">
                <div className="image-placeholder staff-image">
                  <span className="material-icons">people</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Enhance Resident Safety and Well-being?</h2>
          <p>
            FallGuardian provides a comprehensive solution for monitoring, safety, and social connection 
            for elderly residents in nursing homes.
          </p>
          <div className="cta-buttons">
            <Link to="/contact" className="primary-button">
              <span className="material-icons">mail</span>
              Contact Us
            </Link>
            <Link to="/about" className="secondary-button">
              <span className="material-icons">info</span>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features; 
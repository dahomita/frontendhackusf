import React, { useState, useEffect } from 'react';
import './FallPopup.css';

const FallPopup = ({ incident, onClose, onAcknowledge, onRespond }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeElapsed = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fall-popup" role="alertdialog" aria-labelledby="fall-alert-title">
      <div className="fall-popup-content">
        <header className="fall-popup-header">
          <h2 id="fall-alert-title" className="fall-alert-title">
            Fall Detected!
          </h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        </header>

        <div className="fall-popup-body">
          <div className="incident-info">
            <div className="info-row">
              <span className="info-label">Patient:</span>
              <span className="info-value">{incident.patientName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Location:</span>
              <span className="info-value">{incident.location}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Time:</span>
              <span className="info-value">{incident.time}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Time Elapsed:</span>
              <span className="info-value warning">{formatTimeElapsed(timeElapsed)}</span>
            </div>
          </div>

          <div className="incident-actions">
            <button
              className="action-button acknowledge"
              onClick={() => onAcknowledge(incident.id)}
              aria-label={`Acknowledge fall incident for ${incident.patientName}`}
            >
              Acknowledge
            </button>
            <button
              className="action-button respond"
              onClick={() => onRespond(incident.id)}
              aria-label={`Respond to fall incident for ${incident.patientName}`}
            >
              Respond Now
            </button>
          </div>
        </div>

        <footer className="fall-popup-footer">
          <p className="emergency-contact">
            Emergency Contact: <a href="tel:911">911</a>
          </p>
          <p className="auto-notify">
            Auto-notifying emergency contacts...
          </p>
        </footer>
      </div>
    </div>
  );
};

export default FallPopup; 
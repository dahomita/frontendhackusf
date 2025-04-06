import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Forms.css';

const NewForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [nurse, setNurse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Fetch the patient's assigned nurse
  const fetchNurse = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/patient/me/nurse`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load nurse information');
      }
      
      const data = await response.json();
      setNurse(data);
    } catch (err) {
      console.error('Error fetching nurse:', err);
      setError('Could not retrieve your nurse. You need an assigned nurse to send messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNurse();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim() || !nurse) {
      alert('Please fill out all fields');
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title,
          nurse: nurse._id,
          body: message
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create message');
      }
      
      const data = await response.json();
      navigate(`/patient/forms/${data._id}`);
    } catch (err) {
      console.error('Error creating form:', err);
      setError(err.message || 'Failed to create your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="new-form-page">
      <div className="new-form-header">
        <Link to="/patient/forms" className="back-link">
          &larr; Back to Messages
        </Link>
        <h1>New Message to Your Nurse</h1>
      </div>

      {error ? (
        <div className="error-container">
          <div className="error-message">{error}</div>
          <button 
            className="back-button"
            onClick={() => navigate('/patient/forms')}
          >
            Back to Messages
          </button>
        </div>
      ) : !nurse ? (
        <div className="no-nurse-message">
          <p>You don't have an assigned nurse. Please contact the medical center to get assigned to a nurse.</p>
          <button 
            className="back-button"
            onClick={() => navigate('/patient/forms')}
          >
            Back to Messages
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="new-form">
          <div className="form-group">
            <label htmlFor="nurse">Sending to:</label>
            <div className="nurse-info">
              <img 
                src={nurse.avatar} 
                alt={`${nurse.name}'s avatar`} 
                className="nurse-avatar" 
              />
              <span>{nurse.name}</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Subject:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief subject of your message"
              required
              disabled={submitting}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={8}
              required
              disabled={submitting}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button"
              disabled={submitting || !title.trim() || !message.trim()}
            >
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate('/patient/forms')}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewForm; 
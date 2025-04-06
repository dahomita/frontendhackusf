import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NurseFormDetail.css';

const NurseFormDetail = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchFormDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/${formId}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load form details');
      }
      
      const data = await response.json();
      setForm(data);
    } catch (err) {
      console.error('Error fetching form details:', err);
      setError(err.message || 'Failed to load form details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submitMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/${formId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          body: newMessage,
          isFromNurse: true
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      // Update the form with the new message
      await fetchFormDetails();
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const markFormStatus = async (status) => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/${formId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to mark form as ${status}`);
      }
      
      // Refresh form data
      await fetchFormDetails();
    } catch (err) {
      console.error(`Error marking form as ${status}:`, err);
      alert(err.message || `Failed to mark form as ${status}. Please try again.`);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchFormDetails();
  }, [formId]);

  useEffect(() => {
    if (!loading && form) {
      scrollToBottom();
    }
  }, [loading, form?.messages]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div className="loading-container">Loading form details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="back-button" onClick={() => navigate('/staff/forms')}>
          Back to Forms
        </button>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="not-found-container">
        <p>Form not found or you don't have permission to view it.</p>
        <button className="back-button" onClick={() => navigate('/staff/forms')}>
          Back to Forms
        </button>
      </div>
    );
  }

  return (
    <div className="form-detail-container">
      <div className="form-detail-header">
        <button className="back-button" onClick={() => navigate('/staff/forms')}>
          ← Back to Forms
        </button>
        <div className="form-info">
          <h1 className="form-title">{form.title}</h1>
          <div className="patient-info">
            <div className="patient-avatar">
              <img src={form.patient.avatar} alt={`${form.patient.name}'s avatar`} />
            </div>
            <span className="patient-name">{form.patient.name}</span>
          </div>
          <div className="form-meta">
            <span className={`form-status status-${form.status}`}>
              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
            </span>
            <span className="form-date">Created: {formatDate(form.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="form-detail-content">
        <div className="form-messages">
          {form.messages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.isFromNurse ? 'from-nurse' : 'from-patient'}`}
            >
              <div className="message-bubble">
                <p className="message-text">{message.body}</p>
                <span className="message-time">{formatDate(message.timestamp)}</span>
              </div>
              <div className="message-author">
                {message.isFromNurse ? (
                  <div className="author-avatar nurse-avatar">
                    <img src={form.nurse?.avatar || '/default-avatar.png'} alt="Nurse avatar" />
                  </div>
                ) : (
                  <div className="author-avatar patient-avatar">
                    <img src={form.patient.avatar} alt="Patient avatar" />
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="form-actions">
        {form.status !== 'resolved' ? (
          <>
            <form className="message-form" onSubmit={submitMessage}>
              <textarea
                className="message-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply here..."
                disabled={submitting}
                required
              ></textarea>
              <div className="form-controls">
                <div className="status-controls">
                  {form.status === 'pending' && (
                    <button 
                      type="button" 
                      className="status-button in-progress-button"
                      onClick={() => markFormStatus('in-progress')}
                      disabled={submitting}
                    >
                      Mark as In Progress
                    </button>
                  )}
                  <button 
                    type="button" 
                    className="status-button resolve-button"
                    onClick={() => markFormStatus('resolved')}
                    disabled={submitting}
                  >
                    Mark as Resolved
                  </button>
                </div>
                <button 
                  type="submit" 
                  className="send-button"
                  disabled={submitting || !newMessage.trim()}
                >
                  {submitting ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="resolved-message">
            <p>This form has been marked as resolved.</p>
            <button 
              className="status-button reopen-button"
              onClick={() => markFormStatus('in-progress')}
            >
              Reopen Form
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseFormDetail; 
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Forms.css';

const FormDetail = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [resolvingForm, setResolvingForm] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  
  const fetchForm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/${formId}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load form');
      }
      
      const data = await response.json();
      setForm(data);
    } catch (err) {
      console.error('Error fetching form:', err);
      setError(err.message || 'Failed to load this message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    setSendingMessage(true);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/${formId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ body: newMessage }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }
      
      const updatedForm = await response.json();
      setForm(updatedForm);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message: ' + err.message);
    } finally {
      setSendingMessage(false);
    }
  };

  const handleResolveForm = async () => {
    if (!window.confirm('Are you sure you want to mark this message as resolved?')) {
      return;
    }
    
    setResolvingForm(true);
    
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/${formId}/resolve`, {
        method: 'POST',
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to resolve form');
      }
      
      const updatedForm = await response.json();
      setForm(updatedForm);
    } catch (err) {
      console.error('Error resolving form:', err);
      alert('Failed to resolve: ' + err.message);
    } finally {
      setResolvingForm(false);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [form?.messages]);

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return <div className="loading-message">Loading message...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button 
          className="back-button"
          onClick={() => navigate('/patient/forms')}
        >
          Back to Messages
        </button>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="error-container">
        <div className="error-message">Message not found</div>
        <button 
          className="back-button"
          onClick={() => navigate('/patient/forms')}
        >
          Back to Messages
        </button>
      </div>
    );
  }

  return (
    <div className="form-detail-page">
      <div className="form-detail-header">
        <Link to="/patient/forms" className="back-link">
          &larr; Back to Messages
        </Link>
        <div className="form-detail-title-section">
          <h1>{form.title}</h1>
          <div className="form-detail-meta">
            <span className={`form-status status-${form.status}`}>
              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
            </span>
            <span className="form-date">Started: {formatDate(form.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="form-participants">
        <div className="participant">
          <strong>Patient:</strong> {form.patient.name}
        </div>
        <div className="participant">
          <strong>Nurse:</strong> {form.nurse.name}
        </div>
      </div>

      <div className="messages-container">
        {form.messages.map((message, index) => {
          const isPatient = message.sender._id === form.patient._id;
          
          return (
            <div 
              key={index} 
              className={`message ${isPatient ? 'patient-message' : 'nurse-message'}`}
            >
              <div className="message-header">
                <span className="message-sender">{message.sender.name}</span>
                <span className="message-time">{formatDate(message.createdAt)}</span>
              </div>
              <div className="message-body">{message.body}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {!form.resolved ? (
        <div className="form-actions">
          <form onSubmit={handleSubmitMessage} className="reply-form">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your reply here..."
              rows={4}
              disabled={sendingMessage}
              required
            />
            <div className="form-buttons">
              <button 
                type="submit" 
                className="send-button"
                disabled={sendingMessage || !newMessage.trim()}
              >
                {sendingMessage ? 'Sending...' : 'Send Reply'}
              </button>
              <button
                type="button"
                className="resolve-button"
                onClick={handleResolveForm}
                disabled={resolvingForm}
              >
                {resolvingForm ? 'Resolving...' : 'Mark as Resolved'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="resolved-banner">
          <p>
            This message has been resolved on {formatDate(form.resolvedAt)} by {form.resolvedBy.name}.
          </p>
          <Link to="/patient/forms/new" className="new-form-button">
            Create New Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default FormDetail; 
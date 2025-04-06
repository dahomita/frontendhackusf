import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NurseForms.css';

const NurseForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    unresolved: 0,
    pending: 0,
    inProgress: 0,
  });
  
  const navigate = useNavigate();

  const fetchForms = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Using /nurse/me/patients endpoint to get all forms from patients assigned to this nurse
      const response = await fetch(`${process.env.API_BASE_URL}/nurse/me/patients`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load patient forms');
      }
      
      const data = await response.json();
      setForms(data);
    } catch (err) {
      console.error('Error fetching forms:', err);
      setError(err.message || 'Failed to load patient forms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${process.env.API_BASE_URL}/form/stats`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to load form statistics');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching form statistics:', err);
      // Don't set error state for stats, it's not critical
    }
  };

  useEffect(() => {
    fetchForms();
    fetchStats();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredForms = forms.filter(form => {
    if (filter === 'all') return true;
    if (filter === 'resolved') return form.resolved;
    if (filter === 'unresolved') return !form.resolved;
    if (filter === 'pending') return form.status === 'pending';
    if (filter === 'in-progress') return form.status === 'in-progress';
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="nurse-forms-page">
      <header className="forms-header">
        <div className="forms-title-section">
          <h1>Patient Messages</h1>
          <p className="forms-subtitle">Manage messages from your assigned patients</p>
        </div>
      </header>

      <div className="forms-stats">
        <div className="stat-card">
          <h3>Total</h3>
          <p className="stat-value">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Unresolved</h3>
          <p className="stat-value urgent">{stats.unresolved}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-value warning">{stats.pending}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-value active">{stats.inProgress}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p className="stat-value">{stats.resolved}</p>
        </div>
      </div>

      <div className="forms-filter">
        <button 
          className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Messages
        </button>
        <button 
          className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => handleFilterChange('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-button ${filter === 'in-progress' ? 'active' : ''}`}
          onClick={() => handleFilterChange('in-progress')}
        >
          In Progress
        </button>
        <button 
          className={`filter-button ${filter === 'unresolved' ? 'active' : ''}`}
          onClick={() => handleFilterChange('unresolved')}
        >
          All Unresolved
        </button>
        <button 
          className={`filter-button ${filter === 'resolved' ? 'active' : ''}`}
          onClick={() => handleFilterChange('resolved')}
        >
          Resolved
        </button>
      </div>

      <div className="forms-list">
        {loading ? (
          <div className="loading-message">Loading patient messages...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : filteredForms.length === 0 ? (
          <div className="empty-state">
            <p>No messages found{filter !== 'all' ? ' with the selected filter' : ''}.</p>
            {filter !== 'all' ? (
              <button 
                className="reset-filter-button"
                onClick={() => handleFilterChange('all')}
              >
                Show All Messages
              </button>
            ) : (
              <p className="info-text">When patients send you messages, they will appear here.</p>
            )}
          </div>
        ) : (
          filteredForms.map(form => (
            <Link 
              to={`/staff/forms/${form._id}`} 
              className={`form-card ${form.status === 'pending' ? 'pending' : ''}`} 
              key={form._id}
            >
              <div className="form-header">
                <h3 className="form-title">{form.title}</h3>
                <span className={`form-status status-${form.status}`}>
                  {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                </span>
              </div>
              <div className="patient-info">
                <div className="patient-avatar">
                  <img src={form.patient.avatar} alt={`${form.patient.name}'s avatar`} />
                </div>
                <span className="patient-name">{form.patient.name}</span>
              </div>
              <div className="form-preview">
                {form.latestMessage && (
                  <p className="form-message">{form.latestMessage.body.substring(0, 100)}...</p>
                )}
              </div>
              <div className="form-footer">
                <span className="form-date">Last updated: {formatDate(form.updatedAt)}</span>
                <span className="form-messages-count">{form.messages.length} messages</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default NurseForms; 
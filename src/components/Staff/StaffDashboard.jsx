import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Staff.css';
import Card from '../Common/Card';
import Button from '../Common/Button';
import LoadingSpinner from '../Common/LoadingSpinner';
// New imports for enhanced dropzone
import { useDropzone } from 'react-dropzone';

// API base URL configuration
const API_BASE_URL = '/api';

// Modern color palette for skin detection UI
const colors = {
  primary: "#4C6FFF", // Blue primary
  secondary: "#15CD72", // Green for positive results
  warning: "#FFB54C", // Orange/Yellow for moderate warning
  danger: "#FF5C5C", // Red for high risk
  light: "#F5F7FF", // Light background
  dark: "#2D3748", // Dark text
  gray: "#94A3B8", // Gray for secondary text
  background: "white", // White for cards
  border: "#E2E8F0", // Border color
};

const StaffDashboard = ({ defaultTab = 'overview' }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [patients, setPatients] = useState([]);
  const [myPatients, setMyPatients] = useState([]);
  const [_isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [_successMessage, setSuccessMessage] = useState('');
  // Cancer detection states
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const fileInputRef = useRef(null);
  
  // Using underscore prefix to indicate variables that are not currently used in this simplified UI
  const [_activeIncidents] = useState([
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

  // New React-Dropzone state and handlers
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setImage(file);
    setError(null);
    setDetectionResult(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  const fetchPatients = async () => {
    if (patients.length > 0) return; // Avoid fetching if we already have data
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/nurse/patients`, {
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
      const response = await fetch(`${API_BASE_URL}/nurse/me/patients`, {
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

  const _assignPatient = async (patientId) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/nurse/me/patients/${patientId}/assign`, {
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

  const _removePatient = async (patientId) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/nurse/me/patients/${patientId}`, {
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
    } else if (tab === 'skinDetect') {
      // Reset the detection states when switching to this tab
      setImage(null);
      setImagePreview(null);
      setDetectionResult(null);
      setError(null);
    }
  };

  const _handleIncidentAction = (incidentId, action) => {
    // Handle incident actions (acknowledge, respond, etc.)
    console.log(`Action ${action} taken on incident ${incidentId}`);
  };

  // Load active tab from prop when component mounts or defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab);
    
    // Handle any initial tab-specific setup
    if (defaultTab === 'skinDetect') {
      // Reset the detection states when component mounts with this tab
      setImage(null);
      setImagePreview(null);
      setDetectionResult(null);
      setError(null);
    }
  }, [defaultTab]);

  // Fetch patients if tab is already 'patients' on first render
  useEffect(() => {
    if (activeTab === 'patients') {
      fetchPatients();
    } else if (activeTab === 'myPatients') {
      fetchMyPatients();
    }
  }, []);

  // Submit image for cancer detection
  const handleDetection = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }
    
    setIsDetecting(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      
      // Use the Azure API endpoint for skin cancer detection
      const response = await fetch('https://skin-cancer-api.azurewebsites.net/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to analyze image: ${response.status} ${response.statusText}`);
      }
      
      // The response is a JSON
      const data = await response.json();
      console.log('Received API response:', data);
      
      // Process result based on the Azure API's response format
      setDetectionResult({
        result: data.prediction === 'malignant' ? 'cancer' : 'benign',
        probability: parseFloat(data.probability) || 0,
        details: { 
          prediction: data.prediction,
          raw: data 
        }
      });
    } catch (err) {
      console.error('Error during cancer detection:', err);
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setIsDetecting(false);
    }
  };

  // Clear the current image and results
  const handleClearImage = () => {
    setImage(null);
    setImagePreview(null);
    setDetectionResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Function to generate report from detection result
  const handleGenerateReport = () => {
    if (!detectionResult) return;
    
    // Create a simple report as a string
    const reportContent = `
      Skin Cancer Detection Report
      Date: ${new Date().toLocaleString()}
      
      Result: ${detectionResult.result === 'cancer' ? 'Potential Melanoma' : 'Benign Lesion'}
      Probability: ${(detectionResult.probability * 100).toFixed(2)}%
      
      Notes: ${detectionResult.result === 'cancer' 
        ? 'Potential melanoma detected. Further dermatological examination recommended.' 
        : 'No melanoma detected. Regular dermatological check-ups recommended.'}
    `;
    
    // Create a blob and download it
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skin-cancer-detection-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        >
          Overview
        </button>
        <button
          className={`nav-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => handleTabChange('patients')}
        >
          Patients
        </button>
        <button
          className={`nav-button ${activeTab === 'myPatients' ? 'active' : ''}`}
          onClick={() => handleTabChange('myPatients')}
        >
          My Patients
        </button>
        <button
          className={`nav-button ${activeTab === 'skinDetect' ? 'active' : ''}`}
          onClick={() => handleTabChange('skinDetect')}
        >
          Skin Detection
        </button>
      </nav>

      {activeTab === 'overview' && (
        <section className="overview-section" aria-labelledby="overview-title">
          <h2 id="overview-title">Overview</h2>
          {/* Overview content */}
        </section>
      )}

      {activeTab === 'patients' && (
        <section className="patients-section" aria-labelledby="patients-title">
          <h2 id="patients-title">Patients</h2>
          {/* Patients content */}
        </section>
      )}

      {activeTab === 'myPatients' && (
        <section className="my-patients-section" aria-labelledby="my-patients-title">
          <h2 id="my-patients-title">My Patients</h2>
          {/* My Patients content */}
        </section>
      )}

      {activeTab === 'skinDetect' && (
        <section className="cancer-detection-section" aria-labelledby="cancer-detection-title">
          <h2 id="cancer-detection-title">Skin Cancer Detection</h2>
          
          <div className="cancer-detection-container">
            <Card elevation="medium" bordered={true} className="upload-card">
              <Card.Header title="Skin Lesion Analysis" />
              <Card.Content>
                <p className="detection-description">
                  Upload a dermatoscopic image of a skin lesion for melanoma detection analysis. The system will analyze the image and provide a probability assessment based on visual characteristics of the lesion.
                </p>
                
                {error && (
                  <div className="error-message" role="alert">
                    {error}
                  </div>
                )}
                
                {!imagePreview ? (
                  <div 
                    className="upload-area"
                    {...getRootProps()}
                    style={{
                      border: `2px dashed ${isDragActive ? colors.primary : colors.border}`,
                      borderRadius: '10px',
                      padding: '40px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: isDragActive ? `${colors.primary}10` : colors.light,
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <input {...getInputProps()} />
                    <div className="upload-icon" style={{ fontSize: '40px', color: colors.primary, marginBottom: '16px' }}>📁</div>
                    {isDragActive ? (
                      <p style={{ color: colors.gray, marginBottom: '8px' }}>Drop the image here</p>
                    ) : (
                      <>
                        <p style={{ color: colors.gray, marginBottom: '8px' }}>Drag and drop an image here, or</p>
                        <span style={{ color: colors.primary, fontWeight: 600, cursor: 'pointer' }}>browse files</span>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="image-preview-container">
                    <div style={{ 
                      position: 'relative',
                      width: '100%',
                      height: '350px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      marginTop: '20px'
                    }}>
                      <img 
                        src={imagePreview} 
                        alt="Selected medical image" 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px'
                        }}
                      />
                      <button
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(255, 255, 255, 0.8)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: colors.danger,
                          fontSize: '18px'
                        }}
                        onClick={handleClearImage}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="preview-actions" style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                      <Button 
                        variant="primary"
                        onClick={handleDetection}
                        loading={isDetecting}
                        disabled={isDetecting}
                      >
                        Analyze Image
                      </Button>
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
            
            {isDetecting && (
              <div className="detection-loading">
                <LoadingSpinner size="large" text="Analyzing image..." fullHeight={true} />
              </div>
            )}
            
            {detectionResult && !isDetecting && (
              <Card elevation="medium" bordered={true} className="result-card">
                <Card.Header title="Detection Results" />
                <Card.Content>
                  <div className={`result-status ${detectionResult.result === 'cancer' ? 'result-positive' : 'result-negative'}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '15px',
                      backgroundColor: detectionResult.result === 'cancer' ? `${colors.danger}20` : `${colors.secondary}20`,
                      borderRadius: '8px',
                      marginBottom: '20px'
                    }}
                  >
                    <div className="result-icon" style={{ fontSize: '24px', marginRight: '15px' }}>
                      {detectionResult.result === 'cancer' ? '⚠️' : '✓'}
                    </div>
                    <h3 className="result-title" style={{ 
                      margin: 0,
                      color: detectionResult.result === 'cancer' ? colors.danger : colors.secondary
                    }}>
                      {detectionResult.result === 'cancer' ? 'Potential Melanoma Detected' : 'No Melanoma Detected'}
                    </h3>
                  </div>
                  
                  <div className="probability-container" style={{ marginBottom: '20px' }}>
                    <p className="probability-label" style={{ margin: '0 0 5px 0', fontWeight: 500 }}>Probability Assessment:</p>
                    <div className="probability-bar-container" style={{ 
                      height: '12px',
                      backgroundColor: '#f0f0f0',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      margin: '10px 0'
                    }}>
                      <div 
                        className={`probability-bar ${detectionResult.result === 'cancer' ? 'probability-cancer' : 'probability-normal'}`}
                        style={{ 
                          height: '100%',
                          width: `${detectionResult.probability * 100}%`,
                          backgroundColor: detectionResult.result === 'cancer' ? colors.danger : colors.secondary,
                          borderRadius: '6px'
                        }}
                      ></div>
                    </div>
                    <p className="probability-value" style={{ 
                      margin: '0',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      color: detectionResult.result === 'cancer' ? colors.danger : colors.secondary
                    }}>{(detectionResult.probability * 100).toFixed(2)}%</p>
                  </div>
                  
                  <div className="result-interpretation" style={{ marginBottom: '25px' }}>
                    <h4 style={{ marginBottom: '10px' }}>Interpretation:</h4>
                    <p style={{ lineHeight: '1.6', color: colors.dark }}>
                      {detectionResult.result === 'cancer' 
                        ? 'The analysis indicates characteristics consistent with melanoma or other skin cancers. Further dermatological examination and possibly a biopsy are recommended.' 
                        : 'The analysis indicates characteristics of a benign skin lesion. Regular dermatological check-ups are still recommended as part of routine skin care.'}
                    </p>
                  </div>
                  
                  <div className="result-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <Button 
                      variant="outline"
                      onClick={() => handleClearImage()}
                    >
                      New Analysis
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleGenerateReport}
                    >
                      Generate Report
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default StaffDashboard;
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    emergencyContact: {
      name: "",
      phone: "",
      relationship: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phoneNumber || "+1 (555) 123-4567",
        address: user.address || "",
        emergencyContact: {
          name: user.emergencyContact?.name || "",
          phone: user.emergencyContact?.phone || "",
          relationship: user.emergencyContact?.relationship || "",
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await updateProfile(formData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Profile</h1>
        <button
          className="edit-button"
          onClick={() => setIsEditing(!isEditing)}
          disabled={isLoading}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="profile-content">
        <div className="profile-section">
          <h2>Personal Information</h2>
          <div className="profile-avatar">
            <h3>{user.name}</h3>
            <p>{user.role === "patient" ? "Patient" : "Nurse"}</p>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <h3>Emergency Contact</h3>

              <div className="form-group">
                <label htmlFor="emergencyContact.name">Contact Name</label>
                <input
                  type="text"
                  id="emergencyContact.name"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact.phone">Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyContact.phone"
                  name="emergencyContact.phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact.relationship">
                  Relationship
                </label>
                <input
                  type="text"
                  id="emergencyContact.relationship"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="save-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>

              <div className="info-group">
                <label>Phone</label>
                <p>{formData.phone || "Not provided"}</p>
              </div>

              <div className="info-group">
                <label>Address</label>
                <p>{user.address || "Not provided"}</p>
              </div>

              <div className="info-group">
                <label>Emergency Contact</label>
                {user.emergencyContact ? (
                  <div className="emergency-contact">
                    <p>
                      <strong>{user.emergencyContact.name}</strong> (
                      {user.emergencyContact.relationship})
                    </p>
                    <p>{user.emergencyContact.phone}</p>
                  </div>
                ) : (
                  <p>No emergency contact provided</p>
                )}
              </div>
            </div>
          )}
        </div>

        {user.role === "patient" && (
          <div className="profile-section">
            <h2>Health Information</h2>
            <div className="health-info">
              <div className="info-group">
                <label>Age</label>
                <p>{user.age || "Not provided"}</p>
              </div>

              <div className="info-group">
                <label>Fall Risk Level</label>
                <div className={`risk-level ${getRiskLevelClass(user.age)}`}>
                  {getRiskLevelText(user.age)}
                </div>
              </div>

              <div className="info-group">
                <label>Medical Conditions</label>
                <p>{user.medicalConditions?.join(", ") || "None specified"}</p>
              </div>

              <div className="info-group">
                <label>Medications</label>
                <p>{user.medications?.join(", ") || "None specified"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to determine risk level based on age
const getRiskLevelText = (age) => {
  if (!age) return "Unknown";
  if (age < 40) return "Low";
  if (age < 65) return "Moderate";
  return "High";
};

// Helper function to get risk level class for styling
const getRiskLevelClass = (age) => {
  if (!age) return "unknown";
  if (age < 40) return "low";
  if (age < 65) return "moderate";
  return "high";
};

export default Profile;

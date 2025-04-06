import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Settings.css";

const Settings = () => {
  const { user, updateSettings } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState({
    account: {
      emailNotifications: true,
      smsNotifications: false,
      language: "en",
      timezone: "UTC",
    },
    privacy: {
      shareHealthData: false,
      shareLocation: false,
      shareActivity: true,
    },
    security: {
      twoFactorAuth: false,
      loginAlerts: true,
    },
    accessibility: {
      highContrast: false,
      fontSize: "medium",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // In a real app, you would fetch these settings from the backend
    // For now, we'll use localStorage to persist settings
    const savedSettings = localStorage.getItem("userSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // In a real app, you would send these settings to the backend
      // For now, we'll just save to localStorage
      localStorage.setItem("userSettings", JSON.stringify(settings));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage({ type: "success", text: "Settings saved successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to save settings",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="settings-container">
        <div className="loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subtitle">
          Manage your account preferences and settings
        </p>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="settings-content">
        <div className="settings-sidebar">
          <button
            className={`tab-button ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
          <button
            className={`tab-button ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <span className="material-icons">notifications</span>
            Notifications
          </button>
          <button
            className={`tab-button ${activeTab === "privacy" ? "active" : ""}`}
            onClick={() => setActiveTab("privacy")}
          >
            <span className="material-icons">privacy_tip</span>
            Privacy
          </button>
          <button
            className={`tab-button ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <span className="material-icons">security</span>
            Security
          </button>
          <button
            className={`tab-button ${
              activeTab === "accessibility" ? "active" : ""
            }`}
            onClick={() => setActiveTab("accessibility")}
          >
            <span className="material-icons">accessibility</span>
            Accessibility
          </button>
        </div>

        <div className="settings-main">
          <form onSubmit={handleSubmit}>
            {activeTab === "account" && (
              <div className="settings-section">
                <h2>Account Settings</h2>
                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Language</h3>
                      <p>Choose your preferred language</p>
                    </div>
                    <select
                      value={settings.account.language}
                      onChange={(e) =>
                        handleChange("account", "language", e.target.value)
                      }
                      className="setting-control"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Timezone</h3>
                      <p>Set your local timezone</p>
                    </div>
                    <select
                      value={settings.account.timezone}
                      onChange={(e) =>
                        handleChange("account", "timezone", e.target.value)
                      }
                      className="setting-control"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="CST">Central Time</option>
                      <option value="MST">Mountain Time</option>
                      <option value="PST">Pacific Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="settings-section">
                <h2>Notification Preferences</h2>
                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Email Notifications</h3>
                      <p>Receive notifications via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.account.emailNotifications}
                        onChange={(e) =>
                          handleChange(
                            "account",
                            "emailNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>SMS Notifications</h3>
                      <p>Receive notifications via text message</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.account.smsNotifications}
                        onChange={(e) =>
                          handleChange(
                            "account",
                            "smsNotifications",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="settings-section">
                <h2>Privacy Settings</h2>
                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Share Health Data</h3>
                      <p>
                        Allow sharing of your health data with healthcare
                        providers
                      </p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.privacy.shareHealthData}
                        onChange={(e) =>
                          handleChange(
                            "privacy",
                            "shareHealthData",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Share Location</h3>
                      <p>
                        Allow sharing of your location for emergency services
                      </p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.privacy.shareLocation}
                        onChange={(e) =>
                          handleChange(
                            "privacy",
                            "shareLocation",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Share Activity</h3>
                      <p>Allow sharing of your activity data with caregivers</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.privacy.shareActivity}
                        onChange={(e) =>
                          handleChange(
                            "privacy",
                            "shareActivity",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="settings-section">
                <h2>Security Settings</h2>
                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) =>
                          handleChange(
                            "security",
                            "twoFactorAuth",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Login Alerts</h3>
                      <p>Receive notifications for new sign-ins</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.security.loginAlerts}
                        onChange={(e) =>
                          handleChange(
                            "security",
                            "loginAlerts",
                            e.target.checked
                          )
                        }
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Change Password</h3>
                      <p>Update your account password</p>
                    </div>
                    <button type="button" className="secondary-button">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "accessibility" && (
              <div className="settings-section">
                <h2>Accessibility Settings</h2>
                <div className="setting-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>High Contrast Mode</h3>
                      <p>Increase contrast for better visibility</p>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.accessibility.highContrast}
                        onChange={(e) => {
                          handleChange(
                            "accessibility",
                            "highContrast",
                            e.target.checked
                          );
                          if (e.target.checked) {
                            document.body.classList.add("high-contrast");
                          } else {
                            document.body.classList.remove("high-contrast");
                          }
                        }}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Font Size</h3>
                      <p>Adjust the size of text throughout the application</p>
                    </div>
                    <select
                      className="setting-control"
                      value={settings.accessibility.fontSize}
                      onChange={(e) =>
                        handleChange(
                          "accessibility",
                          "fontSize",
                          e.target.value
                        )
                      }
                    >
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                      <option value="x-large">Extra Large</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="settings-actions">
              <button
                type="submit"
                className="save-button"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;

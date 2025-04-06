import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About SafeGuard</h1>
        <p className="about-subtitle">
          Protecting elderly health through fall detection, skin monitoring, and therapeutic AI
        </p>
      </div>

      <div className="about-content">
        <section className="about-section mission-section">
          <div className="section-content">
            <h2>Our Mission</h2>
            <p>
              SafeGuard is dedicated to enhancing the safety, health, and
              well-being of elderly residents through our three-pillar approach:
              AI-powered fall detection, skin condition monitoring, and therapeutic
              companionship solutions.
            </p>
            <p>
              We believe that every senior deserves to live with dignity,
              security, and meaningful connections to others, regardless of
              their physical limitations or living situation.
            </p>
          </div>
          <div className="section-image">
            <div className="image-placeholder mission-image">
              <span className="material-icons">elderly</span>
            </div>
          </div>
        </section>

        <section className="about-section problem-section">
          <div className="section-image">
            <div className="image-placeholder problem-image">
              <span className="material-icons">warning</span>
            </div>
          </div>
          <div className="section-content">
            <h2>The Challenge</h2>
            <div className="stat-card">
              <div className="stat-number">1 in 4</div>
              <div className="stat-label">older adults fall each year</div>
            </div>
            <p>
              Falls are the leading cause of injury and injury death among
              people 65 and older. Many seniors live alone with limited social
              connections, and current emergency response systems often require
              manual activation, which isn't possible if someone is unconscious
              or severely injured after a fall.
            </p>
            <p>
              Beyond physical safety, social isolation and loneliness are
              significant concerns for elderly residents, contributing to
              depression, cognitive decline, and reduced quality of life.
            </p>
          </div>
        </section>

        <section className="about-section solution-section">
          <div className="section-content">
            <h2>Our Solution</h2>
            <p>
              SafeGuard combines advanced AI technology with compassionate
              care to address elderly needs through:
            </p>
            <div className="feature-grid">
              <div className="feature-card">
                <span className="material-icons">sensors</span>
                <h3>Fall Detection System</h3>
                <p>
                  AI-powered monitoring system that automatically detects falls
                  and alerts caregivers immediately for rapid response
                </p>
              </div>
              <div className="feature-card">
                <span className="material-icons">healing</span>
                <h3>Skin Condition Monitoring</h3>
                <p>
                  Early detection and tracking of skin issues including pressure ulcers,
                  rashes, and infections through AI image analysis
                </p>
              </div>
              <div className="feature-card">
                <span className="material-icons">psychology</span>
                <h3>AI Therapeutic Companion</h3>
                <p>
                  Interactive AI that provides therapeutic conversations, emotional support,
                  and cognitive exercises to maintain mental health
                </p>
              </div>
              <div className="feature-card">
                <span className="material-icons">integration_instructions</span>
                <h3>Integrated Care Platform</h3>
                <p>
                  Unified system providing comprehensive health monitoring and support
                  for elderly individuals and their caregivers
                </p>
              </div>
            </div>
          </div>
          <div className="section-image">
            <div className="image-placeholder solution-image">
              <span className="material-icons">devices</span>
            </div>
          </div>
        </section>

        <section className="about-section team-section">
          <h2>Our Team</h2>
          <p>
            SafeGuard was developed by a team of healthcare professionals,
            technologists, dermatologists, and mental health specialists who understand
            the unique challenges faced by elderly residents and their families.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <span className="material-icons">person</span>
              </div>
              <h3>Dr. Sarah Johnson</h3>
              <p>Geriatrician & Medical Director</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <span className="material-icons">person</span>
              </div>
              <h3>Michael Chen</h3>
              <p>AI & Machine Learning Engineer</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <span className="material-icons">person</span>
              </div>
              <h3>Lisa Rodriguez</h3>
              <p>Nursing Home Administrator</p>
            </div>
            <div className="team-card">
              <div className="team-avatar">
                <span className="material-icons">person</span>
              </div>
              <h3>David Wilson</h3>
              <p>User Experience Designer</p>
            </div>
          </div>
        </section>

        <section className="about-section cta-section">
          <div className="cta-content">
            <h2>Join Us in Making a Difference</h2>
            <p>
              SafeGuard is more than just a monitoring system—it's a
              comprehensive solution that enhances the safety, skin health, and
              mental well-being of elderly residents through our innovative three-pillar approach.
            </p>
            <div className="cta-buttons">
              <Link to="/features" className="primary-button">
                Explore Features
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

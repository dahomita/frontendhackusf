import React from 'react';
import { Link } from 'react-router-dom';
import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterText,
  SocialLinks,
  FooterBottom,
  FooterNav,
  FooterNavLink
} from './styles';


const Footer = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>SafeGuard</FooterTitle>
          <FooterText>
            AI-powered fall detection, skin condition monitoring, and therapeutic companion for the elderly.
          </FooterText>
          <SocialLinks>
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
          </SocialLinks>
        </FooterSection>
       
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterNav>
            <FooterNavLink to="/">Home</FooterNavLink>
            <FooterNavLink to="/signin">Sign In</FooterNavLink>
            <FooterNavLink to="/signup">Sign Up</FooterNavLink>
            <FooterNavLink to="/patient/dashboard">Patient Dashboard</FooterNavLink>
            <FooterNavLink to="/staff/dashboard">Staff Dashboard</FooterNavLink>
            <FooterNavLink to="/help">Help</FooterNavLink>
          </FooterNav>
        </FooterSection>
       
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <FooterText>
            <strong>Email:</strong> info@safeguard.com
          </FooterText>
          <FooterText>
            <strong>Phone:</strong> (555) 123-4567
          </FooterText>
          <FooterText>
            <strong>Address:</strong> 123 Health Tech Ave, Medical City
          </FooterText>
        </FooterSection>
      </FooterContent>
     
      <FooterBottom>
        <p>&copy; {currentYear} SafeGuard. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/accessibility">Accessibility</Link>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
};


export default Footer;

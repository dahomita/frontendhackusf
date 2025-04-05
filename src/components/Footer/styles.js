import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background-color: #c6def1;
  color: #809bce;
  padding: 3rem 2rem 1rem;
  margin-top: 3rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  
  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem;
  }
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterTitle = styled.h3`
  color: #809bce;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 2px;
    background-color: #809bce;
    bottom: -5px;
    left: 0;
  }
`;

export const FooterLink = styled.a`
  color: #809bce;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
  
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const FooterText = styled.p`
  line-height: 1.6;
  margin: 0;
  
  strong {
    color: #809bce;
    font-weight: 600;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: rgba(128, 155, 206, 0.2);
    border-radius: 50%;
    color: #809bce;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: white;
      color: white;
      transform: translateY(-3px);
    }
    
    &:focus-visible {
      outline: 2px solid #809bce;
      outline-offset: 4px;
    }
  }
`;

export const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const FooterNavLink = styled(Link)`
  color: #809bce;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
  
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(128, 155, 206, 0.3);
  font-size: 0.9rem;
  
  .footer-links {
    display: flex;
    gap: 1.5rem;
    
    a {
      color: #809bce;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: white;
        text-decoration: underline;
      }
      
      &:focus-visible {
        outline: 2px solid white;
        outline-offset: 4px;
        border-radius: 4px;
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    
    .footer-links {
      justify-content: center;
    }
  }
`; 
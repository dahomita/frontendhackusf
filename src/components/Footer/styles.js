import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const FooterContainer = styled.footer`
  background-color: #1a2238;
  color: #ffffff;
  padding: 3rem 2rem 1rem;
  margin-top: 3rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);
  border-top: 4px solid;
  border-image: linear-gradient(to right, #4caf50, #8bc34a, #cddc39) 1;
 
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
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  position: relative;
 
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 2px;
    background: linear-gradient(to right, #4caf50, #8bc34a, #cddc39);
    bottom: -5px;
    left: 0;
  }
`;


export const FooterLink = styled.a`
  color: #e0e9f5;
  text-decoration: none;
  transition: color 0.3s ease;
 
  &:hover {
    color: #8bc34a;
    text-decoration: underline;
  }
 
  &:focus-visible {
    outline: 2px solid #4caf50;
    outline-offset: 4px;
    border-radius: 4px;
  }
`;


export const FooterText = styled.p`
  line-height: 1.6;
  margin: 0;
  color: #b0bec5;
 
  strong {
    color: #ffffff;
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
    background-color: rgba(76, 175, 80, 0.2);
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.3s ease;
   
    &:hover {
      background-color: #4caf50;
      color: #1a2238;
      transform: translateY(-3px);
    }
   
    &:focus-visible {
      outline: 2px solid #4caf50;
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
  color: #e0e9f5;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
 
  &:hover {
    color: #8bc34a;
    text-decoration: underline;
  }
 
  &:focus-visible {
    outline: 2px solid #4caf50;
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
  border-top: 1px solid rgba(76, 175, 80, 0.3);
  font-size: 0.9rem;
 
  .footer-links {
    display: flex;
    gap: 1.5rem;
   
    a {
      color: #e0e9f5;
      text-decoration: none;
      transition: color 0.3s ease;
     
      &:hover {
        color: #8bc34a;
        text-decoration: underline;
      }
     
      &:focus-visible {
        outline: 2px solid #4caf50;
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

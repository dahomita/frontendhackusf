import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background-color: var(--neutral-900);
  color: var(--neutral-300);
  padding: 4rem 2rem 1.5rem;
  margin-top: 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-dark) 0%, var(--primary) 100%);
  }
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem 1.5rem;
  }
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FooterTitle = styled.h3`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%);
    bottom: -8px;
    left: 0;
    border-radius: var(--radius-full);
  }
`;

export const FooterLink = styled.a`
  color: var(--neutral-300);
  text-decoration: none;
  transition: var(--transition-normal);
  
  &:hover {
    color: var(--primary-light);
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }
`;

export const FooterText = styled.p`
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;
  color: var(--neutral-400);
  
  strong {
    color: white;
    font-weight: 600;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.06);
    border-radius: 50%;
    color: var(--neutral-100);
    transition: var(--transition-normal);
    
    &:hover {
      background-color: var(--primary);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }
    
    &:focus-visible {
      outline: 2px solid var(--primary);
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
  color: var(--neutral-300);
  text-decoration: none;
  transition: var(--transition-normal);
  font-size: 0.95rem;
  padding: 0.25rem 0;
  position: relative;
  display: inline-block;
  
  &:hover {
    color: var(--primary-light);
    padding-left: 0.5rem;
  }
  
  &::before {
    content: '›';
    position: absolute;
    left: 0;
    opacity: 0;
    transition: var(--transition-normal);
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: var(--neutral-500);
  
  .footer-links {
    display: flex;
    gap: 1.5rem;
    
    a {
      color: var(--neutral-400);
      text-decoration: none;
      transition: var(--transition-normal);
      position: relative;
      
      &:hover {
        color: var(--primary-light);
      }
      
      &:not(:last-child)::after {
        content: '•';
        position: absolute;
        right: -0.9rem;
        color: var(--neutral-600);
      }
      
      &:focus-visible {
        outline: 2px solid var(--primary);
        outline-offset: 4px;
        border-radius: var(--radius-sm);
      }
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    
    .footer-links {
      justify-content: center;
      flex-wrap: wrap;
    }
  }
`; 
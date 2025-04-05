import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1A2238;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  
  a {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
  }
  
  .logo-text {
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

export const NavLink = styled(Link)`
  color: #E0E0E0;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: white;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #4CAF50;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  &[aria-current="page"] {
    color: white;
    
    &:after {
      width: 100%;
      background-color: #4CAF50;
    }
  }
  
  &:focus-visible {
    outline: 2px solid #4CAF50;
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const NavButton = styled(Link)`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background-color: #388E3C;
    transform: translateY(-2px);
  }
  
  &:focus-visible {
    outline: 2px solid #4CAF50;
    outline-offset: 4px;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 101;
  
  @media (max-width: 1024px) {
    display: block;
  }
  
  .hamburger-icon {
    display: block;
    width: 24px;
    height: 2px;
    background-color: white;
    position: relative;
    transition: all 0.3s ease;
    
    &:before, &:after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: white;
      transition: all 0.3s ease;
    }
    
    &:before {
      top: -8px;
    }
    
    &:after {
      bottom: -8px;
    }
  }
  
  &[aria-expanded="true"] {
    .hamburger-icon {
      background-color: transparent;
      
      &:before {
        transform: rotate(45deg);
        top: 0;
      }
      
      &:after {
        transform: rotate(-45deg);
        bottom: 0;
      }
    }
  }
  
  &:focus-visible {
    outline: 2px solid #4CAF50;
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const MobileNavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const MobileNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: #1A2238;
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 100;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const MobileNavLink = styled(Link)`
  color: #E0E0E0;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: white;
  }
  
  &[aria-current="page"] {
    color: white;
    border-left: 3px solid #4CAF50;
    padding-left: 0.5rem;
  }
  
  &:focus-visible {
    outline: 2px solid #4CAF50;
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const MobileNavButton = styled(Link)`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  
  &:hover {
    background-color: #388E3C;
  }
  
  &:focus-visible {
    outline: 2px solid #4CAF50;
    outline-offset: 4px;
  }
`; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: var(--neutral-800);
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  
  a {
    text-decoration: none;
    color: var(--neutral-900);
    display: flex;
    align-items: center;
  }
  
  .logo-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-weight: 800;
    letter-spacing: -0.5px;
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
  color: var(--neutral-700);
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  font-size: 1rem;
  
  &:hover {
    color: var(--primary);
  }
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--primary);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
  
  &[aria-current="page"] {
    color: var(--primary);
    
    &:after {
      width: 100%;
    }
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const NavButton = styled(Link)`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary-light);
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
    background-color: var(--neutral-700);
    position: relative;
    transition: all 0.3s ease;
    
    &:before, &:after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: var(--neutral-700);
      transition: all 0.3s ease;
    }
    
    &:before {
      top: -8px;
    }
    
    &:after {
      bottom: -8px;
    }
  }
  
  &:hover {
    .hamburger-icon {
      background-color: var(--primary);
      
      &:before, &:after {
        background-color: var(--primary);
      }
    }
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary-light);
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
  backdrop-filter: blur(3px);
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
  background-color: white;
  color: var(--neutral-800);
  padding: 5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 100;
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease;
  overflow-y: auto;
  
  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

export const MobileNavLink = styled(Link)`
  color: var(--neutral-700);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.8rem 0;
  transition: all 0.3s ease;
  border-bottom: 1px solid var(--neutral-200);
  
  &:hover {
    color: var(--primary);
    padding-left: 0.5rem;
  }
  
  &[aria-current="page"] {
    color: var(--primary);
    border-left: 3px solid var(--primary);
    padding-left: 0.5rem;
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 4px;
    border-radius: 4px;
  }
`;

export const MobileNavButton = styled(Link)`
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: var(--primary-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:focus-visible {
    outline: 2px solid var(--primary-light);
    outline-offset: 4px;
  }
`; 
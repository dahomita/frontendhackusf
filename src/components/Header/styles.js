import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--surface-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  gap: 0.5rem;

  .material-icons {
    font-size: 1.75rem;
  }

  &:hover {
    color: var(--primary-dark);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  margin: 0 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavButton = styled(Link)`
  padding: 0.5rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  &[aria-current="page"] {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-color);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;

  .material-icons {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--background-color);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MobileNav = styled.div`
  display: none;
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  background-color: var(--surface-color);
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  transition: transform 0.3s ease;
  z-index: 99;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

export const MobileNavLink = styled(Link)`
  padding: 0.75rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  &[aria-current="page"] {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

export const MobileNavButton = styled.button`
  padding: 0.75rem 1rem;
  color: var(--text-color);
  background: none;
  border: none;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

export const UserMenu = styled.div`
  position: relative;
`;

export const UserMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: var(--background-color);
  border: none;
  color: var(--text-color);
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .material-icons {
    font-size: 1.5rem;
    color: var(--primary-color);
  }

  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

export const UserName = styled.span`
  font-weight: 500;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text-color);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--surface-color);
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 101;
  margin-top: 0.75rem;
  overflow: hidden;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  &:before {
    content: '';
    position: absolute;
    top: -8px;
    right: 20px;
    width: 16px;
    height: 16px;
    background-color: var(--surface-color);
    transform: rotate(45deg);
    box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.05);
  }
`;

export const UserMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  .material-icons {
    font-size: 1.25rem;
    color: var(--primary-color);
  }

  &:hover {
    background-color: var(--background-color);
    color: var(--primary-color);
  }

  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: -2px;
  }

  &:not(:last-child):after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1rem;
    right: 1rem;
    height: 1px;
    background-color: var(--border-color);
  }
`; 
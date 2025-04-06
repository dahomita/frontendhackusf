import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// Base button styles
const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: ${props => 
    props.size === 'small' ? '0.5rem 1rem' : 
    props.size === 'large' ? '0.85rem 1.75rem' : 
    '0.65rem 1.25rem'
  };
  font-size: ${props => 
    props.size === 'small' ? '0.875rem' : 
    props.size === 'large' ? '1.125rem' : 
    '1rem'
  };
  font-weight: 500;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-normal);
  text-decoration: none;
  border: none;
  outline: none;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  ${props => props.variant === 'primary' && css`
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    color: white;
    box-shadow: var(--shadow-sm);
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      background: var(--primary-dark);
    }
  `}
  
  ${props => props.variant === 'secondary' && css`
    background-color: var(--neutral-200);
    color: var(--neutral-800);
    
    &:hover:not(:disabled) {
      background-color: var(--neutral-300);
    }
    
    &:active:not(:disabled) {
      background-color: var(--neutral-400);
    }
  `}
  
  ${props => props.variant === 'outline' && css`
    background-color: transparent;
    color: var(--primary);
    border: 1px solid var(--primary);
    
    &:hover:not(:disabled) {
      background-color: var(--primary-light);
      color: var(--primary-dark);
    }
    
    &:active:not(:disabled) {
      background-color: var(--primary-light);
      border-color: var(--primary-dark);
    }
  `}
  
  ${props => props.variant === 'text' && css`
    background-color: transparent;
    color: var(--primary);
    padding: ${props.size === 'small' ? '0.25rem 0.5rem' : props.size === 'large' ? '0.5rem 0.75rem' : '0.35rem 0.6rem'};
    
    &:hover:not(:disabled) {
      background-color: rgba(46, 139, 87, 0.1);
    }
    
    &:active:not(:disabled) {
      background-color: rgba(46, 139, 87, 0.2);
    }
  `}
  
  ${props => props.loading && css`
    position: relative;
    color: transparent;
    
    &::after {
      content: '';
      position: absolute;
      width: ${props.size === 'small' ? '1rem' : props.size === 'large' ? '1.5rem' : '1.25rem'};
      height: ${props.size === 'small' ? '1rem' : props.size === 'large' ? '1.5rem' : '1.25rem'};
      border-radius: 50%;
      border: 2px solid ${props.variant === 'primary' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(46, 139, 87, 0.25)'};
      border-top-color: ${props.variant === 'primary' ? 'white' : 'var(--primary)'};
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `}
`;

// Styled components for different button types
const StyledButton = styled.button`
  ${baseButtonStyles}
`;

const StyledLinkButton = styled(Link)`
  ${baseButtonStyles}
`;

const StyledAnchor = styled.a`
  ${baseButtonStyles}
`;

/**
 * A versatile Button component with different variants, sizes, and states
 * @param {Object} props - Component props
 * @param {string} [props.variant='primary'] - Button variant ('primary', 'secondary', 'outline', 'text')
 * @param {string} [props.size='medium'] - Button size ('small', 'medium', 'large')
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width
 * @param {boolean} [props.loading=false] - Whether to show a loading spinner
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {string} [props.to] - For Link buttons, the path to navigate to
 * @param {string} [props.href] - For anchor buttons, the URL to navigate to
 * @param {ReactNode} [props.children] - Button content
 * @returns {JSX.Element} Button component
 */
const Button = ({ 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false, 
  loading = false, 
  disabled = false, 
  to, 
  href, 
  type = 'button',
  children, 
  ...rest 
}) => {
  // Link button (React Router)
  if (to) {
    return (
      <StyledLinkButton
        to={to}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        loading={loading}
        disabled={disabled}
        {...rest}
      >
        {children}
      </StyledLinkButton>
    );
  }
  
  // External link button
  if (href) {
    return (
      <StyledAnchor
        href={href}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        loading={loading}
        disabled={disabled}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </StyledAnchor>
    );
  }
  
  // Regular button
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      disabled={disabled || loading}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button; 
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(0.8); opacity: 0.8; }
`;

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.size === 'large' ? '2rem' : props.size === 'small' ? '0.5rem' : '1rem'};
`;

const SpinnerCircle = styled.div`
  width: ${props => props.size === 'large' ? '50px' : props.size === 'small' ? '20px' : '35px'};
  height: ${props => props.size === 'large' ? '50px' : props.size === 'small' ? '20px' : '35px'};
  border: ${props => props.size === 'small' ? '2px' : '3px'} solid rgba(46, 139, 87, 0.1);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const SpinnerText = styled.p`
  margin-top: ${props => props.size === 'small' ? '0.25rem' : '0.75rem'};
  color: var(--neutral-600);
  font-size: ${props => props.size === 'large' ? '1rem' : props.size === 'small' ? '0.75rem' : '0.9rem'};
  animation: ${pulse} 1.5s ease infinite;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: ${props => props.fullHeight ? '50vh' : 'auto'};
  padding: 2rem;
`;

/**
 * A customizable loading spinner component
 * @param {Object} props - Component props
 * @param {string} [props.size='medium'] - Size of the spinner ('small', 'medium', 'large')
 * @param {string} [props.text='Loading...'] - Text to display below the spinner
 * @param {boolean} [props.fullHeight=false] - Whether to make the container full height
 * @returns {JSX.Element} Loading spinner component
 */
const LoadingSpinner = ({ size = 'medium', text = 'Loading...', fullHeight = false }) => {
  return (
    <LoadingContainer fullHeight={fullHeight}>
      <StyledSpinner size={size}>
        <SpinnerCircle size={size} />
        {text && <SpinnerText size={size}>{text}</SpinnerText>}
      </StyledSpinner>
    </LoadingContainer>
  );
};

export default LoadingSpinner; 
import React from 'react';
import { Link } from 'react-router-dom';
import {
  NotFoundContainer,
  ErrorCode,
  Title,
  Description,
  HomeButton,
  ImageContainer
} from './styles';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      <Title>Page Not Found</Title>
      <Description>
        Oops! Looks like you've wandered into uncharted territory. 
        The page you're looking for doesn't exist or has been moved.
      </Description>
      <ImageContainer>
        <svg width="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#809bce" d="M140,40 C160,40 180,60 180,80 C180,120 120,180 100,180 C80,180 20,120 20,80 C20,60 40,40 60,40 C80,40 90,60 100,60 C110,60 120,40 140,40 Z" />
          <circle cx="70" cy="90" r="10" fill="white" />
          <circle cx="130" cy="90" r="10" fill="white" />
          <path fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" d="M65,120 C80,130 120,130 135,120" />
        </svg>
      </ImageContainer>
      <HomeButton to="/">Return to Home</HomeButton>
    </NotFoundContainer>
  );
};

export default NotFound; 
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #809bce;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #58b38e;
  margin-bottom: 2rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background-color: #809bce;
  color: white;
  font-weight: 600;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #58b38e;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ComingSoon = ({ feature }) => {
  const getFeatureDetails = () => {
    switch(feature) {
      case 'voice':
        return {
          title: 'Voice Control',
          description: 'Our voice control system will allow you to navigate the app, request help, and control your environment using just your voice. Perfect for times when mobility is limited.'
        };
      case 'contacts':
        return {
          title: 'Contacts Manager',
          description: 'Soon you\'ll be able to manage all your important contacts here - from family members to healthcare providers. Set up emergency contacts, schedule check-ins, and more.'
        };
      case 'medications':
        return {
          title: 'Medication Tracker',
          description: 'Keep track of all your medications, set reminders, and never miss a dose with our upcoming medication management system. We\'ll also include refill alerts and side effect tracking.'
        };
      default:
        return {
          title: 'New Feature',
          description: 'We\'re working hard to bring you exciting new features to make your experience better. Check back soon!'
        };
    }
  };

  const details = getFeatureDetails();

  return (
    <ComingSoonContainer>
      <Title>{details.title}</Title>
      <Subtitle>Coming Soon!</Subtitle>
      <Description>{details.description}</Description>
      <BackButton to="/patient/dashboard">Return to Dashboard</BackButton>
    </ComingSoonContainer>
  );
};

export default ComingSoon; 
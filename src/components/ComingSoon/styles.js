import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ComingSoonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  color: #809bce;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #58b38e;
  margin-bottom: 2rem;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

export const BackButton = styled(Link)`
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
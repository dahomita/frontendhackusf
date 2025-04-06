import styled from 'styled-components';


export const HomeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;


export const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  pointer-events: none; /* Allow click events to pass through to content underneath */
 
  /* Enable pointer events only for the Canvas itself */
  & > canvas {
    pointer-events: auto;
  }
`;


export const HeroSection = styled.section`
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;
  padding: 2rem 0;
  position: relative;
  overflow: hidden;
 
  @media (max-width: 768px) {
    min-height: 80vh;
    padding: 1rem 0;
  }
`;


export const CanvasWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: transparent;
 
  & > canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;


export const HeroContent = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
  background: linear-gradient(135deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  position: relative;
 
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;


export const HeroContentInner = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
`;


export const HeroTitle = styled.h1`
  font-size: 3rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
 
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


export const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: #ffffff;
  text-align: center;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
 
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
 
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;


export const HeroButton = styled.button`
  padding: 0.8rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(198, 222, 241, 0.9);
  color: #25507c;
  border: 2px solid white;
 
  &:hover {
    transform: translateY(-2px);
    background-color: white;
    color: #25507c;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
 
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 2px;
  }
 
  @media (max-width: 480px) {
    width: 100%;
    padding: 0.7rem 1.4rem;
  }
`;


export const ScrollLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background-color: transparent;
  position: relative;
  width: 100%;
 
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;


export const ScrollLink = styled.a`
  color: var(--text-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
 
  &:hover {
    color: var(--primary-color);
  }
 
  &:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;


export const Section = styled.section`
  padding: 6rem 2rem;
  background-color: transparent;
 
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;


export const SectionTitle = styled.h2`  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-color);
 
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;


export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;


export const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
 
  &:hover {
    transform: translateY(-4px);
  }
 
  &:focus-within {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;


export const CardIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;


export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-color);
`;


export const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
`;


export const CtaSection = styled.section`
  padding: 6rem 2rem;
  background: linear-gradient(135deg, rgba(162, 217, 192, 0.95) 0%, rgba(128, 203, 174, 0.95) 50%, rgba(88, 179, 142, 0.95) 100%);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
  color: white;
  text-align: center;
 
  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;


export const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;


export const CtaTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
 
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;


export const CtaDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
 
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;


export const CtaButton = styled(HeroButton)`
  background-color: ${props => props.variant === 'outline' ? 'transparent' : '#c6def1'};
  color: ${props => props.variant === 'outline' ? 'white' : '#809bce'};
  border: 2px solid ${props => props.variant === 'outline' ? 'white' : '#c6def1'};
 
  &:hover {
    background-color: ${props => props.variant === 'outline' ? 'rgba(255, 255, 255, 0.1)' : '#809bce'};
    color: white;
  }
`;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeContainer, 
  HeroSection, 
  HeroContent, 
  HeroTitle, 
  HeroSubtitle, 
  HeroButton,
  Section,
  SectionTitle,
  SectionContent,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  CardGrid,
  CtaSection,
  CtaContent,
  CtaTitle,
  CtaDescription,
  CtaButton,
  ButtonGroup,
  ScrollLink,
  ScrollLinks
} from './styles';

const HomePage = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const target = e.target.getAttribute('href');
      if (target && target.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });
    
    return () => {
      scrollLinks.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);
  
  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>FallGuardian</HeroTitle>
          <HeroSubtitle>
            Advanced AI-powered fall detection for the elderly and vulnerable
          </HeroSubtitle>
          <ButtonGroup>
            <HeroButton as={Link} to="/signup" aria-label="Sign Up">
              Get Started
            </HeroButton>
            <HeroButton as={Link} to="/signin" variant="outline" aria-label="Sign In">
              Sign In
            </HeroButton>
          </ButtonGroup>
        </HeroContent>
      </HeroSection>
      
      <ScrollLinks>
        <ScrollLink href="#inspiration" className="scroll-link">Inspiration</ScrollLink>
        <ScrollLink href="#how-it-works" className="scroll-link">How It Works</ScrollLink>
        <ScrollLink href="#get-started" className="scroll-link">Get Started</ScrollLink>
      </ScrollLinks>
      
      <Section id="inspiration">
        <SectionTitle>Our Inspiration</SectionTitle>
        <SectionContent>
          <Card>
            <CardIcon>👴</CardIcon>
            <CardTitle>Supporting Independence</CardTitle>
            <CardDescription>
              We believe everyone deserves to live independently with dignity. FallGuardian helps elderly individuals maintain their autonomy while providing peace of mind to loved ones.
            </CardDescription>
          </Card>
          
          <Card>
            <CardIcon>❤️</CardIcon>
            <CardTitle>Family Peace of Mind</CardTitle>
            <CardDescription>
              Families can rest easy knowing their loved ones are protected by our advanced monitoring system, which provides immediate alerts in case of falls or emergencies.
            </CardDescription>
          </Card>
          
          <Card>
            <CardIcon>🏥</CardIcon>
            <CardTitle>Healthcare Innovation</CardTitle>
            <CardDescription>
              By leveraging cutting-edge AI technology, we're transforming how healthcare providers monitor and respond to patient safety, reducing response times and improving outcomes.
            </CardDescription>
          </Card>
        </SectionContent>
      </Section>
      
      <Section id="how-it-works" variant="light">
        <SectionTitle>How It Works</SectionTitle>
        <SectionContent>
          <CardGrid>
            <Card>
              <CardIcon>📱</CardIcon>
              <CardTitle>1. Easy Setup</CardTitle>
              <CardDescription>
                Simply install the FallGuardian app on your smartphone or tablet. Our intuitive interface makes setup quick and straightforward.
              </CardDescription>
            </Card>
            
            <Card>
              <CardIcon>🔍</CardIcon>
              <CardTitle>2. Continuous Monitoring</CardTitle>
              <CardDescription>
                Our AI continuously analyzes movement patterns and instantly detects potential falls using advanced computer vision technology.
              </CardDescription>
            </Card>
            
            <Card>
              <CardIcon>🔔</CardIcon>
              <CardTitle>3. Instant Alerts</CardTitle>
              <CardDescription>
                When a fall is detected, caregivers and emergency contacts are immediately notified with location information and incident details.
              </CardDescription>
            </Card>
            
            <Card>
              <CardIcon>👨‍⚕️</CardIcon>
              <CardTitle>4. Professional Response</CardTitle>
              <CardDescription>
                Healthcare staff can quickly assess the situation and dispatch appropriate assistance, reducing response times in critical situations.
              </CardDescription>
            </Card>
          </CardGrid>
        </SectionContent>
      </Section>
      
      <Section id="get-started">
        <SectionTitle>Get Started Today</SectionTitle>
        <SectionContent>
          <Card>
            <CardIcon>👤</CardIcon>
            <CardTitle>For Patients</CardTitle>
            <CardDescription>
              Sign up as a patient to access our monitoring system, connect with caregivers, and enjoy greater independence with peace of mind.
            </CardDescription>
            <ButtonGroup>
              <HeroButton as={Link} to="/signup?role=patient" aria-label="Sign Up as Patient">
                Sign Up as Patient
              </HeroButton>
            </ButtonGroup>
          </Card>
          
          <Card>
            <CardIcon>👨‍⚕️</CardIcon>
            <CardTitle>For Healthcare Providers</CardTitle>
            <CardDescription>
              Join our network of healthcare professionals to monitor patients, respond to incidents, and provide timely care when needed.
            </CardDescription>
            <ButtonGroup>
              <HeroButton as={Link} to="/signup?role=staff" aria-label="Sign Up as Healthcare Provider">
                Sign Up as Provider
              </HeroButton>
            </ButtonGroup>
          </Card>
        </SectionContent>
      </Section>
      
      <CtaSection>
        <CtaContent>
          <CtaTitle>Ready to enhance safety?</CtaTitle>
          <CtaDescription>
            Join thousands of healthcare providers who trust FallGuardian for reliable fall detection.
          </CtaDescription>
          <ButtonGroup>
            <CtaButton as={Link} to="/signup" aria-label="Get Started Now">
              Get Started Now
            </CtaButton>
            <CtaButton as={Link} to="/signin" variant="outline" aria-label="Sign In">
              Sign In
            </CtaButton>
          </ButtonGroup>
        </CtaContent>
      </CtaSection>
    </HomeContainer>
  );
};

export default HomePage; 
import React, { useEffect, Suspense } from 'react';
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
  ScrollLinks,
  CanvasWrapper,
  HeroContentInner
} from './styles';
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Scene from '../../../public/Scene'


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
      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <HeroSection>
          {/* Canvas as background */}
          <CanvasWrapper>
            <Canvas
              camera={{ position: [130, 70, 30], fov: 60 }}
              style={{ width: '100%', height: '100%', background: 'transparent' }}
              gl={{ alpha: true, antialias: true, clearColor: [0, 0, 0, 0] }}
            >
              <Suspense fallback={null}>
                <OrbitControls
                  enableZoom={true}
                  enablePan={true}
                  minDistance={8}
                  maxDistance={30}
                  rotateSpeed={0.5}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 10, 7]} intensity={1.5} />
                <Scene scale={90} />
              </Suspense>
              <Environment preset="sunset" />
            </Canvas>
          </CanvasWrapper>
         
          {/* Hero content overlay with 50% opacity */}
          <HeroContent>
            <HeroContentInner>
              <HeroTitle>SafeGuard</HeroTitle>
              <HeroSubtitle>
                Advanced AI-powered fall detection, skin condition monitoring, and therapeutic companion for the elderly
              </HeroSubtitle>
              <ButtonGroup>
                <HeroButton as={Link} to="/signup" aria-label="Sign Up">
                  Get Started
                </HeroButton>
                <HeroButton as={Link} to="/signin" variant="outline" aria-label="Sign In">
                  Sign In
                </HeroButton>
              </ButtonGroup>
            </HeroContentInner>
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
                We believe everyone deserves to live independently with dignity. SafeGuard helps elderly individuals maintain their autonomy with AI-powered fall detection, skin condition monitoring, and therapeutic companionship.
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
                  Simply install the SafeGuard app on your smartphone or tablet. Our intuitive interface provides easy access to fall detection, skin condition analysis, and AI therapeutic conversations.
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
                Join thousands of healthcare providers who trust SafeGuard for comprehensive elderly care through fall detection, skin monitoring, and AI therapeutic support.
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
              Join thousands of healthcare providers who trust SafeGuard for reliable fall detection.
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
      </div>
    </HomeContainer>
  );
};


export default HomePage;

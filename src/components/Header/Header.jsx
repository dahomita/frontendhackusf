import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavLink,
  NavButton,
  MobileMenuButton,
  MobileNav,
  MobileNavLink,
  MobileNavButton,
  MobileNavOverlay,
} from "./styles";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-nav")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" aria-label="SafeGuard Home">
          <span className="logo-text">SafeGuard</span>
        </Link>
      </Logo>

      {/* Desktop Navigation */}
      <Nav className="desktop-nav">
        <NavLink to="/" aria-current={isActive("/") ? "page" : undefined}>
          Home
        </NavLink>

        <NavLink
          to="/patient/dashboard"
          aria-current={isActive("/patient/dashboard") ? "page" : undefined}
        >
          Patient Dashboard
        </NavLink>
        <NavLink
          to="/staff/dashboard"
          aria-current={isActive("/staff/dashboard") ? "page" : undefined}
        >
          Staff Dashboard
        </NavLink>
        <NavButton as={Link} to="/signin" aria-label="Sign In">
          Sign In
        </NavButton>
      </Nav>

      {/* Mobile Menu Button */}
      <MobileMenuButton
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        <span className="hamburger-icon"></span>
      </MobileMenuButton>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          <MobileNavOverlay />
          <MobileNav className="mobile-nav">
            <MobileNavLink
              to="/"
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/signin"
              aria-current={isActive("/signin") ? "page" : undefined}
            >
              Sign In
            </MobileNavLink>
            <MobileNavLink
              to="/signup"
              aria-current={isActive("/signup") ? "page" : undefined}
            >
              Sign Up
            </MobileNavLink>
            <MobileNavLink
              to="/patient/dashboard"
              aria-current={isActive("/patient/dashboard") ? "page" : undefined}
            >
              Patient Dashboard
            </MobileNavLink>
            <MobileNavLink
              to="/staff/dashboard"
              aria-current={isActive("/staff/dashboard") ? "page" : undefined}
            >
              Staff Dashboard
            </MobileNavLink>
            <MobileNavLink
              to="/help"
              aria-current={isActive("/help") ? "page" : undefined}
            >
              Help
            </MobileNavLink>
            <MobileNavButton as={Link} to="/signin" aria-label="Sign In">
              Sign In
            </MobileNavButton>
          </MobileNav>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;

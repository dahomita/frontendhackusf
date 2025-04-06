import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HeaderContainer,
  Logo,
  Nav,
  NavButton,
  MobileMenuButton,
  MobileNav,
  MobileNavLink,
  MobileNavButton,
  UserMenu,
  UserMenuButton,
  UserMenuDropdown,
  UserMenuItem,
  UserName,
} from "./styles";

const Header = ({ authState, setAuthState }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef(null);
  // const [authState, setAuthState] = useState(isAuthenticated);

  // Update authState whenever isAuthenticated changes
  useEffect(() => {
    setAuthState(isAuthenticated);
  }, [isAuthenticated]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userRole");
      setAuthState(false); // Immediately update local state
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" aria-label="FallGuardian Home">
          <span className="logo-text">FallGuardian</span>
        </Link>
      </Logo>

      {/* Desktop Navigation */}
      <Nav className="desktop-nav">
        <NavButton to="/" aria-current={isActive("/") ? "page" : undefined}>
          Home
        </NavButton>
        <NavButton
          to="/about"
          aria-current={isActive("/about") ? "page" : undefined}
        >
          About
        </NavButton>
        <NavButton
          to="/features"
          aria-current={isActive("/features") ? "page" : undefined}
        >
          Features
        </NavButton>
      </Nav>

      <div className="auth-section">
        {authState ? (
          <UserMenu ref={userMenuRef}>
            <UserMenuButton
              onClick={toggleUserMenu}
              aria-expanded={isUserMenuOpen}
            >
              <UserName>Hi, {user?.name || "User"}</UserName>
            </UserMenuButton>
            <UserMenuDropdown isOpen={isUserMenuOpen}>
              <UserMenuItem
                as={Link}
                to={
                  user?.role === "patient"
                    ? "/patient/dashboard"
                    : "/staff/dashboard"
                }
              >
                <span className="material-icons">dashboard</span>
                Dashboard
              </UserMenuItem>
              <UserMenuItem as={Link} to="/profile">
                <span className="material-icons">person</span>
                Profile
              </UserMenuItem>
              <UserMenuItem as={Link} to="/settings">
                <span className="material-icons">settings</span>
                Settings
              </UserMenuItem>
              <UserMenuItem onClick={handleLogout}>
                <span className="material-icons">logout</span>
                Logout
              </UserMenuItem>
            </UserMenuDropdown>
          </UserMenu>
        ) : (
          <>
            <NavButton
              to="/signin"
              aria-current={isActive("/signin") ? "page" : undefined}
            >
              Sign In
            </NavButton>
            <NavButton
              to="/signup"
              aria-current={isActive("/signup") ? "page" : undefined}
            >
              Sign Up
            </NavButton>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <MobileMenuButton
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="material-icons">
          {isMobileMenuOpen ? "close" : "menu"}
        </span>
      </MobileMenuButton>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <>
          <MobileNavOverlay />
          <MobileNav className="mobile-nav">
            <MobileNavLink
              to="/"
              aria-current={isActive("/") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/about"
              aria-current={isActive("/about") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </MobileNavLink>
            <MobileNavLink
              to="/features"
              aria-current={isActive("/features") ? "page" : undefined}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </MobileNavLink>

            {authState ? (
              <>
                <MobileNavLink
                  to={
                    user?.role === "patient"
                      ? "/patient/dashboard"
                      : "/staff/dashboard"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
                <MobileNavLink
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </MobileNavLink>
                <MobileNavLink
                  to="/settings"
                  aria-current={
                    location.pathname === "/settings" ? "page" : undefined
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </MobileNavLink>
                <MobileNavButton onClick={handleLogout}>Logout</MobileNavButton>
              </>
            ) : (
              <>
                <MobileNavLink
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </MobileNavLink>
                <MobileNavLink
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </MobileNav>
        </>
      )}
    </HeaderContainer>
  );
};

export default Header;

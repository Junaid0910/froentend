import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaWaveSquare } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to sync user from localStorage
  const syncUser = () => {
    const loggedIn = localStorage.getItem("loggedInUser");
    if (loggedIn) {
      try {
        setUser(JSON.parse(loggedIn));
      } catch (e) {
        setUser({ username: loggedIn });
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUser();
    // Listen for custom login/logout events or local storage changes
    window.addEventListener("storage", syncUser);
    window.addEventListener("authChange", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("authChange", syncUser);
    };
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setIsMobileMenuOpen(false);
    // Dispatch auth change event to notify other components
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FaWaveSquare className="logo-icon" />
        <span>Voice2Text</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Home</Link>
        <Link to="/app" className={location.pathname === "/app" ? "active-link animate-glow" : ""}>App</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>About</Link>
        <Link to="/help" className={location.pathname === "/help" ? "active-link" : ""}>Help</Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>Contact</Link>

        {user ? (
          <div className="user-profile-section">
            <span className="user-welcome">
              <FaUserCircle className="user-avatar" />
              <span>Hi, {user.username || "User"}</span>
            </span>
            <button className="nav-logout-btn" onClick={handleLogout} title="Log Out">
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-login-btn">Login</Link>
            <Link to="/signup" className="nav-signup-btn">Sign Up</Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Nav Links (Dropdown) */}
      <div className={`mobile-nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/app" onClick={toggleMobileMenu} className="highlight-mobile">Go to App</Link>
        <Link to="/about" onClick={toggleMobileMenu}>About</Link>
        <Link to="/help" onClick={toggleMobileMenu}>Help</Link>
        <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
        <div className="mobile-auth-divider"></div>
        {user ? (
          <div className="mobile-user-section">
            <span className="mobile-user-welcome">
              <FaUserCircle className="mobile-avatar" />
              <span>{user.username}</span>
            </span>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Log Out
            </button>
          </div>
        ) : (
          <div className="mobile-auth-section">
            <Link to="/login" onClick={toggleMobileMenu} className="mobile-login-btn">Login</Link>
            <Link to="/signup" onClick={toggleMobileMenu} className="mobile-signup-btn">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
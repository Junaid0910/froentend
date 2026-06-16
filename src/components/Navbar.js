import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes, FaWaveSquare } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FaWaveSquare className="logo-icon" />
        <span>AuDoc</span>
      </Link>

      {/* Desktop Nav Links */}
      <div className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>Home</Link>
        <Link to="/app" className={location.pathname === "/app" ? "active-link animate-glow" : ""}>App</Link>
        <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>About</Link>
        <Link to="/help" className={location.pathname === "/help" ? "active-link" : ""}>Help</Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>Contact</Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
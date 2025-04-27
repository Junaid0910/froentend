import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for the menu

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
      Voice2Text
      </Link>

      {/* Desktop Nav Links */}
      <div className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/help">Help</Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile Nav Links (Dropdown) */}
      <div className={`mobile-nav-links ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/about" onClick={toggleMobileMenu}>About</Link>
        <Link to="/privacy" onClick={toggleMobileMenu}>Privacy</Link>
        <Link to="/contact" onClick={toggleMobileMenu}>Contact</Link>
        <Link to="/help" onClick={toggleMobileMenu}>Help</Link>
      </div>
    </nav>
  );
};

export default Navbar;
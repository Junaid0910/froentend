import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Voice2Text. All rights reserved.</p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
          <a href="/help">Help</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
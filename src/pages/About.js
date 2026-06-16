import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>About AuDoc</h1>
        <p>Learn more about our mission, features, and how we can help you.</p>
      </div>

      {/* Introduction Section */}
      <div className="section">
        <h2>Our Mission</h2>
        <p>
          At AuDoc, our mission is to redefine how you create documents. We combine a professional-grade online word processor with real-time voice typing and a multi-format document converter. Our goal is to provide a comprehensive, secure, and registration-free workspace that streamlines the writing, formatting, and file-conversion process for students, writers, and professionals.
        </p>
      </div>

      {/* Features Section */}
      <div className="section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎤 Voice-to-Text Editor</h3>
            <p>
              Dictate directly into an A4 page-like canvas. Enjoy continuous, high-accuracy speech recognition with offline voice commands to structure your document hands-free.
            </p>
          </div>
          <div className="feature-card">
            <h3>📄 Multi-Format Converter</h3>
            <p>
              Instantly convert and export your voice dictations or typed text into professional PDF, Microsoft Word (DOCX), or plain text (TXT) files in one click.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔒 Private & Secure</h3>
            <p>
              Your data is safe. AuDoc processes all speech recognition, formatting, and document conversion 100% client-side. No databases, no tracking, no server logs.
            </p>
          </div>
          <div className="feature-card">
            <h3>🌐 Multi-Language Support</h3>
            <p>
              AuDoc supports voice typing and punctuation insertion for over 14 global languages and dialects, making it a versatile tool for international users.
            </p>
          </div>
          <div className="feature-card">
            <h3>🎨 Rich Text Formatting Ribbon</h3>
            <p>
              Style your documents with fonts, sizes, colors, highlight styling, lists, alignment, and full undo/redo capabilities.
            </p>
          </div>
          <div className="feature-card">
            <h3>✏️ Tables, Shapes, & Images</h3>
            <p>
              Create structured grids, draw shapes, and upload images. Resize and reposition elements inside the editor to construct perfect layouts.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of users who are already boosting their productivity with AuDoc. Start using AuDoc today and experience the future of speech-to-text technology.
        </p>
        <div className="cta-buttons">
          <Link to="/app" className="cta-button">Get Started for Free</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
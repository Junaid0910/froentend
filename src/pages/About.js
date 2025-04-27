import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>About Voice2Text</h1>
        <p>Learn more about our mission, features, and how we can help you.</p>
      </div>

      {/* Introduction Section */}
      <div className="section">
        <h2>Our Mission</h2>
        <p>
          At Voice2Text, our mission is to make speech-to-text conversion simple, accurate, and accessible to everyone. Whether you're a student, professional, or content creator, we aim to provide a tool that enhances your productivity and simplifies your workflow.
        </p>
      </div>

      {/* Features Section */}
      <div className="section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎤 Real-Time Transcription</h3>
            <p>
              Convert your speech into text instantly with our advanced speech recognition technology. Perfect for capturing ideas, notes, and conversations on the go.
            </p>
          </div>
          <div className="feature-card">
            <h3>📄 Export to PDF</h3>
            <p>
              Save your transcriptions as PDF documents with just one click. Easily share or print your notes for offline use.
            </p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>
              Your data is safe with us. We use industry-standard encryption to ensure your transcriptions are always private and secure.
            </p>
          </div>
          <div className="feature-card">
            <h3>🌐 Multi-Language Support</h3>
            <p>
              SpeechNotes supports multiple languages, making it a versatile tool for users around the world.
            </p>
          </div>
          <div className="feature-card">
            <h3>📱 Cross-Platform Compatibility</h3>
            <p>
              Access Voice2Text from any device—desktop, laptop, or mobile. Your transcriptions are always within reach.
            </p>
          </div>
          <div className="feature-card">
            <h3>✏️ Edit & Format</h3>
            <p>
              Easily edit and format your transcriptions with our intuitive tools. Add new lines, remove words, and customize your text to suit your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>Lead Developer</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Emily Johnson</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of users who are already boosting their productivity with Voice2Text. Sign up today and experience the future of speech-to-text technology.
        </p>
        <div className="cta-buttons">
          <Link to="/app" className="cta-button">GET Stated for FREE</Link>
        </div>
      </div>
    </div>
  );
};

export default About;
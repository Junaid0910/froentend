import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Contact.css"; // Import the Contact.css file

const Contact = () => {
  // Function to open default email client
  const handleSendEmail = () => {
    const email = "postora18@gmail.com";
    const subject = "Support Request - VoiceType";
    const body = "Hello VoiceType Team,\n\nI need assistance with the following:\n\n";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Contact Us</h1>
        <p>
          We're here to help! If you have any questions, feedback, or need assistance, please don't hesitate to reach out. We will get back to you as soon as possible.
        </p>
      </div>

      {/* Support Email Section */}
      <div className="section">
        <h2>1. Support Email</h2>
        <div className="content-box">
          <p>
            You can contact us directly via email. Click the button below to send us a message:
          </p>
          <button className="email-button" onClick={handleSendEmail}>
            📧 Send Email to Support
          </button>
          <p>
            Alternatively, you can manually email us at: <strong>postora18@gmail.com</strong>
          </p>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="section">
        <h2>2. Frequently Asked Questions (FAQs)</h2>
        <div className="content-box">
          <p>
            Before contacting us, you might find the answer to your question in our <Link to="/help">Help Center</Link>.
          </p>
        </div>
      </div>

      {/* Feedback & Suggestions Section */}
      <div className="section">
        <h2>3. Feedback & Suggestions</h2>
        <div className="content-box">
          <p>
            We value your feedback! If you have suggestions for improving VoiceType, please let us know by sending an email to <strong>postora18@gmail.com</strong>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
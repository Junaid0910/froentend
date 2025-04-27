import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Contact.css"; // Import the Contact.css file

const Contact = () => {
  // Function to open default email client
  const handleSendEmail = () => {
    const email = "support@voice2text.com";
    const subject = "Support Request - Voice2Text";
    const body = "Hello Voice2Text Team,\n\nI need assistance with the following:\n\n";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Contact Us</h1>
        <p>
          We're here to help! If you have any questions, feedback, or need assistance, please don't hesitate to reach out to us. Our support team is available to assist you.
        </p>
      </div>

      {/* Support Email Section */}
      <div className="section">
        <h2>1. Support Email</h2>
        <div className="content-box">
          <p>
            You can contact us directly via email. Click the button below to open your email client and send us a message:
          </p>
          <button className="email-button" onClick={handleSendEmail}>
            📧 Send Email to Support
          </button>
          <p>
            Alternatively, you can manually send an email to: <strong>support@voice2text.com</strong>.
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

      {/* Business Hours Section */}
      <div className="section">
        <h2>3. Business Hours</h2>
        <div className="content-box">
          <p>
            Our support team is available during the following hours:
          </p>
          <ul>
            <li><strong>Monday to Friday:</strong> 9 AM - 5 PM (EST)</li>
            <li><strong>Saturday & Sunday:</strong> Closed</li>
          </ul>
        </div>
      </div>

      {/* Address Section */}
      <div className="section">
        <h2>4. Address</h2>
        <div className="content-box">
          <p>
            If you need to reach us by mail, our office address is:
          </p>
          <p>
            <strong>Voice2Text Inc.</strong><br />
            123 Support Lane<br />
            Help City, HC 12345<br />
            USA
          </p>
        </div>
      </div>

      {/* Feedback & Suggestions Section */}
      <div className="section">
        <h2>5. Feedback & Suggestions</h2>
        <div className="content-box">
          <p>
            We value your feedback! If you have suggestions for improving Voice2Text, please let us know by sending an email to <strong>feedback@voice2text.com</strong>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Privacy.css"; // Import the Privacy.css file

const Privacy = () => {
  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Privacy Policy</h1>
        <p>
          At <strong>Voice2Text</strong>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use our application and services. By using Voice2Text, you agree to the terms outlined in this policy.
        </p>
      </div>

      {/* Information We Collect Section */}
      <div className="section">
        <h2>1. Information We Collect</h2>
        <div className="content-box">
          <p>
            We collect and process the following types of information to provide and improve our services:
          </p>
          <ul>
            <li>
              <strong>Transcript Data:</strong> When you use the speech-to-text functionality, the audio input is converted into text locally on your device. This data is processed in real-time and is not stored on our servers unless explicitly saved by you.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect anonymous usage statistics, such as the frequency of app usage, feature interactions, and error logs. This data helps us improve the performance and user experience of the app.
            </li>
            <li>
              <strong>Device Information:</strong> We may collect information about your device, including the operating system, browser type, and device identifiers, to ensure compatibility and optimize performance.
            </li>
            <li>
              <strong>Location Data:</strong> With your consent, we may collect approximate location data to provide region-specific features or improve service delivery.
            </li>
          </ul>
        </div>
      </div>

      {/* How We Use Your Information Section */}
      <div className="section">
        <h2>2. How We Use Your Information</h2>
        <div className="content-box">
          <p>
            The information we collect is used for the following purposes:
          </p>
          <ul>
            <li>
              <strong>Service Provision:</strong> To provide, maintain, and improve the functionality of the Voice2Text application.
            </li>
            <li>
              <strong>Personalization:</strong> To customize your experience and provide features tailored to your usage patterns.
            </li>
            <li>
              <strong>Analytics:</strong> To analyze usage trends, monitor app performance, and identify areas for improvement.
            </li>
            <li>
              <strong>Communication:</strong> To respond to your inquiries, provide customer support, and send important updates or notifications.
            </li>
            <li>
              <strong>Security:</strong> To detect, prevent, and address technical issues, fraud, or other malicious activities.
            </li>
          </ul>
        </div>
      </div>

      {/* Data Sharing and Disclosure Section */}
      <div className="section">
        <h2>3. Data Sharing and Disclosure</h2>
        <div className="content-box">
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our application, conducting business, or providing services to you, as long as they agree to keep this information confidential.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).
            </li>
            <li>
              <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change and outline your choices.
            </li>
          </ul>
        </div>
      </div>

      {/* Data Security Section */}
      <div className="section">
        <h2>4. Data Security</h2>
        <div className="content-box">
          <p>
            We implement a variety of security measures to protect your information:
          </p>
          <ul>
            <li>
              <strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using industry-standard protocols (e.g., SSL/TLS).
            </li>
            <li>
              <strong>Access Controls:</strong> Access to your information is restricted to authorized personnel only, and we enforce strict authentication and authorization protocols.
            </li>
            <li>
              <strong>Data Minimization:</strong> We only collect and retain the minimum amount of information necessary to provide our services.
            </li>
          </ul>
          <p>
            Despite our efforts, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
          </p>
        </div>
      </div>

      {/* Your Rights and Choices Section */}
      <div className="section">
        <h2>5. Your Rights and Choices</h2>
        <div className="content-box">
          <p>
            You have the following rights regarding your personal information:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> You can request a copy of the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct or update any inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your personal information, subject to certain legal obligations.
            </li>
            <li>
              <strong>Opt-Out:</strong> You can opt out of receiving promotional communications from us at any time.
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us at <Link to="/contact">support@voice2text.com</Link>.
          </p>
        </div>
      </div>

      {/* International Data Transfers Section */}
      <div className="section">
        <h2>6. International Data Transfers</h2>
        <div className="content-box">
          <p>
            Your information may be transferred to and processed in countries other than your own. These countries may have different data protection laws than your jurisdiction. We ensure that appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
          </p>
        </div>
      </div>

      {/* Children's Privacy Section */}
      <div className="section">
        <h2>7. Children's Privacy</h2>
        <div className="content-box">
          <p>
            Voice2Text is not intended for use by individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child without parental consent, we will take steps to delete such information.
          </p>
        </div>
      </div>

      {/* Changes to This Policy Section */}
      <div className="section">
        <h2>8. Changes to This Policy</h2>
        <div className="content-box">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any updates will be posted on this page, and we will notify you of significant changes through the app or via email. Your continued use of Voice2Text after any changes constitutes your acceptance of the updated policy.
          </p>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="section">
        <h2>9. Contact Us</h2>
        <div className="content-box">
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> <Link to="/contact">support@voice2text.com</Link><br />
            <strong>Address:</strong> 123 Privacy Lane, Data City, DC 12345, USA
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;
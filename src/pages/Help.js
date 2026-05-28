// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import "./App.css";

// const Help = () => {
//   return (
//     <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//       <h1>Help & Support</h1>
//       <p>
//         Welcome to the <strong>Voice2Text</strong> Help Center! Here, you'll find detailed information on how to use our application, troubleshoot common issues, and get in touch with our support team. We're here to ensure you have the best experience with Voice2Text.
//       </p>

//       <h2>1. Getting Started</h2>
//       <p>
//         If you're new to Voice2Text, follow these steps to get started:
//       </p>
//       <ul>
//         <li>
//           <strong>Create an Account:</strong> Sign up for a free account to access all features of Voice2Text.
//         </li>
//         <li>
//           <strong>Install the App:</strong> Download and install the Voice2Text application on your device.
//         </li>
//         <li>
//           <strong>Grant Permissions:</strong> Allow microphone access to enable speech-to-text functionality.
//         </li>
//         <li>
//           <strong>Start Recording:</strong> Click the "Start Recording" button and begin speaking. Your speech will be converted to text in real-time.
//         </li>
//       </ul>

//       <h2>2. Frequently Asked Questions (FAQs)</h2>
//       <p>
//         Here are answers to some of the most common questions about Voice2Text:
//       </p>
//       <h3>Q: Is Voice2Text free to use?</h3>
//       <p>
//         <strong>A:</strong> Yes, Voice2Text offers a free tier with basic features. For advanced features, you can upgrade to a premium plan.
//       </p>
//       <h3>Q: How accurate is the speech-to-text conversion?</h3>
//       <p>
//         <strong>A:</strong> Our speech recognition technology is highly accurate, but accuracy may vary depending on audio quality, background noise, and language.
//       </p>
//       <h3>Q: Can I use Voice2Text offline?</h3>
//       <p>
//         <strong>A:</strong> Currently, Voice2Text requires an internet connection for speech recognition. Offline functionality is under development.
//       </p>
//       <h3>Q: How do I export my transcriptions?</h3>
//       <p>
//         <strong>A:</strong> You can export your transcriptions as PDF or text files by clicking the "Generate PDF" button.
//       </p>
//       <h3>Q: Is my data secure?</h3>
//       <p>
//         <strong>A:</strong> Yes, we use industry-standard encryption to protect your data. For more details, please refer to our <Link to="/privacy">Privacy Policy</Link>.
//       </p>

//       <h2>3. Troubleshooting</h2>
//       <p>
//         If you encounter any issues while using Voice2Text, follow these troubleshooting steps:
//       </p>
//       <h3>Issue: Microphone Not Working</h3>
//       <p>
//         <strong>Solution:</strong>
//       </p>
//       <ul>
//         <li>Ensure your microphone is properly connected and functioning.</li>
//         <li>Grant microphone access in your browser or device settings.</li>
//         <li>Try using a different microphone or device.</li>
//       </ul>
//       <h3>Issue: Speech Not Recognized</h3>
//       <p>
//         <strong>Solution:</strong>
//       </p>
//       <ul>
//         <li>Speak clearly and avoid background noise.</li>
//         <li>Ensure your language settings match the language you're speaking.</li>
//         <li>Check your internet connection.</li>
//       </ul>
//       <h3>Issue: App Crashes or Freezes</h3>
//       <p>
//         <strong>Solution:</strong>
//       </p>
//       <ul>
//         <li>Refresh the page or restart the app.</li>
//         <li>Clear your browser cache or reinstall the app.</li>
//         <li>Ensure your device meets the minimum system requirements.</li>
//       </ul>

//       <h2>4. Advanced Features</h2>
//       <p>
//         Voice2Text offers several advanced features to enhance your experience:
//       </p>
//       <ul>
//         <li>
//           <strong>Multi-Language Support:</strong> Convert speech to text in multiple languages.
//         </li>
//         <li>
//           <strong>Edit & Format:</strong> Easily edit and format your transcriptions with intuitive tools.
//         </li>
//         <li>
//           <strong>Export Options:</strong> Save your transcriptions as PDF files.
//         </li>
//         <li>
//           <strong>Cloud Sync:</strong> Sync your transcriptions across devices with a premium account.
//         </li>
//       </ul>

//       <h2>5. Contact Support</h2>
//       <p>
//         If you need further assistance, our support team is here to help. You can reach us via:
//       </p>
//       <ul>
//         <li>
//           <strong>Email:</strong> <Link to="/contact">support@voice2text.com</Link>
//         </li>
//         <li>
//           <strong>Phone:</strong> 
//         </li>
//         <li>
//           <strong>Live Chat:</strong> Available on our website during business hours.
//         </li>
//       </ul>

//       <h2>6. Feedback & Suggestions</h2>
//       <p>
//         We value your feedback! If you have suggestions for improving Voice2Text, please let us know:
//       </p>
//       <ul>
//         <li>
//           <strong>Feedback Form:</strong> <Link to="/feedback">Submit Feedback</Link>
//         </li>
//         <li>
//           <strong>Community Forum:</strong> Join our community to share ideas and connect with other users.
//         </li>
//       </ul>

//       <h2>7. System Requirements</h2>
//       <p>
//         To use Voice2Text, ensure your device meets the following requirements:
//       </p>
//       <ul>
//         <li>
//           <strong>Operating System:</strong> Windows 10, macOS 10.14+, iOS 12+, Android 8.0+
//         </li>
//         <li>
//           <strong>Browser:</strong> Chrome, Edge (latest versions)
//         </li>
//         <li>
//           <strong>Internet Connection:</strong> Minimum 5 Mbps for optimal performance
//         </li>
//       </ul>

//       <h2>8. Legal Information</h2>
//       <p>
//         For legal inquiries, please contact us at:
//       </p>
//       <p>
//         <strong>Email:</strong> legal@voice2text.com<br />
//         <strong>Address:</strong> 123 Legal Lane, Compliance City, CC 12345, USA
//       </p>
//     </motion.div>
//   );
// };

// export default Help;


















import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./help.css";

const Help = () => {
  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Help & Support</h1>
        <p>
          Welcome to the <strong>Voice2Text</strong> Help Center! Here, you'll find detailed information on how to use our application, troubleshoot common issues, and get in touch with our support team.
        </p>
      </div>

      {/* Getting Started Section */}
      <div className="section">
        <h2>1. Getting Started</h2>
        <div className="content-box">
          <p>
            If you're new to Voice2Text, follow these steps to get started:
          </p>
          <ul>
            <li>
              <strong>Create an Account:</strong> Sign up for a free account to access all features of Voice2Text.
            </li>
            <li>
              <strong>Install the App:</strong> Download and install the Voice2Text application on your device.
            </li>
            <li>
              <strong>Grant Permissions:</strong> Allow microphone access to enable speech-to-text functionality.
            </li>
            <li>
              <strong>Start Recording:</strong> Click the "Start Recording" button and begin speaking. Your speech will be converted to text in real-time.
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="section">
        <h2>2. Frequently Asked Questions (FAQs)</h2>
        <div className="content-box">
          <p>
            Here are answers to some of the most common questions about Voice2Text:
          </p>
          <h3>Q: Is Voice2Text free to use?</h3>
          <p>
            <strong>A:</strong> Yes, Voice2Text offers a free tier with basic features. For advanced features, you can upgrade to a premium plan.
          </p>
          <h3>Q: How accurate is the speech-to-text conversion?</h3>
          <p>
            <strong>A:</strong> Our speech recognition technology is highly accurate, but accuracy may vary depending on audio quality, background noise, and language.
          </p>
          <h3>Q: Can I use Voice2Text offline?</h3>
          <p>
            <strong>A:</strong> Currently, Voice2Text requires an internet connection for speech recognition. Offline functionality is under development.
          </p>
          <h3>Q: How do I export my transcriptions?</h3>
          <p>
            <strong>A:</strong> You can export your transcriptions as PDF or text files by clicking the "Generate PDF" button.
          </p>
          <h3>Q: Is my data secure?</h3>
          <p>
            <strong>A:</strong> Yes, we use industry-standard encryption to protect your data. For more details, please refer to our <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="section">
        <h2>3. Troubleshooting</h2>
        <div className="content-box">
          <p>
            If you encounter any issues while using Voice2Text, follow these troubleshooting steps:
          </p>
          <h3>Issue: Microphone Not Working</h3>
          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>Ensure your microphone is properly connected and functioning.</li>
            <li>Grant microphone access in your browser or device settings.</li>
            <li>Try using a different microphone or device.</li>
          </ul>
          <h3>Issue: Speech Not Recognized</h3>
          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>Speak clearly and avoid background noise.</li>
            <li>Ensure your language settings match the language you're speaking.</li>
            <li>Check your internet connection.</li>
          </ul>
          <h3>Issue: App Crashes or Freezes</h3>
          <p>
            <strong>Solution:</strong>
          </p>
          <ul>
            <li>Refresh the page or restart the app.</li>
            <li>Clear your browser cache or reinstall the app.</li>
            <li>Ensure your device meets the minimum system requirements.</li>
          </ul>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="section">
        <h2>4. Advanced Features</h2>
        <div className="content-box">
          <p>
            Voice2Text offers several advanced features to enhance your experience:
          </p>
          <ul>
            <li>
              <strong>Multi-Language Support:</strong> Convert speech to text in multiple languages.
            </li>
            <li>
              <strong>Edit & Format:</strong> Easily edit and format your transcriptions with intuitive tools.
            </li>
            <li>
              <strong>Export Options:</strong> Save your transcriptions as PDF files.
            </li>
            <li>
              <strong>Cloud Sync:</strong> Sync your transcriptions across devices with a premium account.
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="section">
        <h2>5. Contact Support</h2>
        <div className="content-box">
          <p>
            If you need further assistance, our support team is here to help. You can reach us via:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> <Link to="/contact">support@voice2text.com</Link>
            </li>
            <li>
              <strong>Phone:</strong> 
            </li>
            <li>
              <strong>Live Chat:</strong> Available on our website during business hours.
            </li>
          </ul>
        </div>
      </div>

      {/* Feedback & Suggestions Section */}
      <div className="section">
        <h2>6. Feedback & Suggestions</h2>
        <div className="content-box">
          <p>
            We value your feedback! If you have suggestions for improving Voice2Text, please let us know:
          </p>
          <ul>
            <li>
              <strong>Feedback Form:</strong> <Link to="/feedback">Submit Feedback</Link>
            </li>
            <li>
              <strong>Community Forum:</strong> Join our community to share ideas and connect with other users.
            </li>
          </ul>
        </div>
      </div>

      {/* System Requirements Section */}
      <div className="section">
        <h2>7. System Requirements</h2>
        <div className="content-box">
          <p>
            To use Voice2Text, ensure your device meets the following requirements:
          </p>
          <ul>
            <li>
              <strong>Operating System:</strong> Windows 10, macOS 10.14+, iOS 12+, Android 8.0+
            </li>
            <li>
              <strong>Browser:</strong> Chrome, Edge (latest versions)
            </li>
            <li>
              <strong>Internet Connection:</strong> Minimum 5 Mbps for optimal performance
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Information Section */}
      <div className="section">
        <h2>8. Legal Information</h2>
        <div className="content-box">
          <p>
            For legal inquiries, please contact us at:
          </p>
          <p>
            <strong>Email:</strong> legal@voice2text.com<br />
            <strong>Address:</strong> 123 Legal Lane, Compliance City, CC 12345, USA
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Help;
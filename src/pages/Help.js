// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import "./App.css";

// const Help = () => {
//   return (
//     <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//       <h1>Help & Support</h1>
//       <p>
//         Welcome to the <strong>VoiceType</strong> Help Center! Here, you'll find detailed information on how to use our application, troubleshoot common issues, and get in touch with our support team. We're here to ensure you have the best experience with VoiceType.
//       </p>

//       <h2>1. Getting Started</h2>
//       <p>
//         If you're new to VoiceType, follow these steps to get started:
//       </p>
//       <ul>
//         <li>
//           <strong>Create an Account:</strong> Sign up for a free account to access all features of VoiceType.
//         </li>
//         <li>
//           <strong>Install the App:</strong> Download and install the VoiceType application on your device.
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
//         Here are answers to some of the most common questions about VoiceType:
//       </p>
//       <h3>Q: Is VoiceType free to use?</h3>
//       <p>
//         <strong>A:</strong> Yes, VoiceType offers a free tier with basic features. For advanced features, you can upgrade to a premium plan.
//       </p>
//       <h3>Q: How accurate is the speech-to-text conversion?</h3>
//       <p>
//         <strong>A:</strong> Our speech recognition technology is highly accurate, but accuracy may vary depending on audio quality, background noise, and language.
//       </p>
//       <h3>Q: Can I use VoiceType offline?</h3>
//       <p>
//         <strong>A:</strong> Currently, VoiceType requires an internet connection for speech recognition. Offline functionality is under development.
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
//         If you encounter any issues while using VoiceType, follow these troubleshooting steps:
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
//         VoiceType offers several advanced features to enhance your experience:
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
//           <strong>Email:</strong> <Link to="/contact">support@voicetype.com</Link>
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
//         We value your feedback! If you have suggestions for improving VoiceType, please let us know:
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
//         To use VoiceType, ensure your device meets the following requirements:
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
//         <strong>Email:</strong> legal@voicetype.com<br />
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
          Welcome to the <strong>VoiceType</strong> Help Center! Here, you'll find detailed information on how to use our application, troubleshoot common issues, and get in touch with our support team.
        </p>
      </div>

      {/* Getting Started Section */}
      <div className="section">
        <h2>1. Getting Started</h2>
        <div className="content-box">
          <p>
            If you're new to VoiceType, follow these steps to get started:
          </p>
          <ul>
            <li>
              <strong>Open the App:</strong> Navigate to the <Link to="/app">Editor App</Link> in your web browser. No registration or installation is required.
            </li>
            <li>
              <strong>Grant Permissions:</strong> Allow microphone access when prompted to enable real-time speech-to-text.
            </li>
            <li>
              <strong>Start Dictating:</strong> Click the microphone "Voice" button in the toolbar and begin speaking. Your words will be inserted directly at the text cursor.
            </li>
          </ul>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="section">
        <h2>2. Frequently Asked Questions (FAQs)</h2>
        <div className="content-box">
          <p>
            Here are answers to some of the most common questions about VoiceType:
          </p>
          <h3>Q: Is VoiceType free to use?</h3>
          <p>
            <strong>A:</strong> Yes! VoiceType is 100% free. All features, including voice dictation, formatting tools, shapes, images, table insertion, and PDF/DOCX exports, are completely unlocked with no registration required.
          </p>
          <h3>Q: How accurate is the speech-to-text conversion?</h3>
          <p>
            <strong>A:</strong> Our speech recognition technology is highly accurate, but accuracy may vary depending on audio quality, background noise, and language.
          </p>
          <h3>Q: Can I use VoiceType offline?</h3>
          <p>
            <strong>A:</strong> Currently, VoiceType requires an internet connection for speech recognition. Offline functionality is under development.
          </p>
          <h3>Q: How do I export my transcriptions?</h3>
          <p>
            <strong>A:</strong> You can export your documents as PDF, Word (.doc), or plain text (.txt), or print them directly using the "Export" button in the editor's toolbar ribbon.
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
            If you encounter any issues while using VoiceType, follow these troubleshooting steps:
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
            VoiceType offers several advanced features to enhance your experience:
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
            If you need further assistance, you can reach us via:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> postora18@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Feedback & Suggestions Section */}
      <div className="section">
        <h2>6. Feedback & Suggestions</h2>
        <div className="content-box">
          <p>
            We value your feedback! If you have suggestions for improving VoiceType, please let us know:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> postora18@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* System Requirements Section */}
      <div className="section">
        <h2>7. System Requirements</h2>
        <div className="content-box">
          <p>
            To use VoiceType, ensure your device meets the following requirements:
          </p>
          <ul>
            <li>
              <strong>Operating System:</strong> Windows, macOS, Linux, iOS, Android
            </li>
            <li>
              <strong>Browser:</strong> Google Chrome, Microsoft Edge, Safari, Opera (browsers supporting Web Speech API)
            </li>
            <li>
              <strong>Internet Connection:</strong> Standard internet connection required for voice recognition
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
            <strong>Email:</strong> postora18@gmail.com
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Help;
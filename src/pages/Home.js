// import React from "react";
// import { Link } from "react-router-dom";
// import "./Home.css";

// // Images and Icons
// import heroImage from "../assets/Screenshot (9).png"; // Add a hero image
// import feature1Icon from "../assets/Screenshot (2).png"; // Add feature icons
// import feature2Icon from "../assets/Screenshot (3).png";
// import feature3Icon from "../assets/Screenshot (4).png";
// import testimonial1 from "../assets/Screenshot (9).png"; // Add testimonial images
// import testimonial2 from "../assets/Screenshot (2).png";
// import testimonial3 from "../assets/Screenshot (3).png";

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <div className="hero-section">
//         <div className="hero-content">
//           <h1>Welcome to Voice2Text</h1>
//           <p>Your Ultimate Speech-to-Text Solution</p>
//           <p>"Start converting your speech to text in seconds. It's fast, accurate, and free!" Join thousands of users who are already boosting their productivity with SpeechNotes." No downloads, no installations. Just start speaking and see the magic happen!"Don't wait—start your free today and transform the way you work!"Ready to make your life easier? Let's get started!" </p>
//           <div className="cta-buttons">
//             <Link to="/app" className="cta-button">GET Started for FREE</Link>
//           </div>
//         </div>
//         <img src={heroImage} alt="Hero" className="hero-image" />
//       </div>

//       {/* Features Section */}
//       <div className="features-section">
//         <h2>Why Choose Voice2Text?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <img src={feature1Icon} alt="Feature 1" className="feature-icon" />
//             <h3>🎤 Real-Time Transcription</h3>
//             <p>
//               Convert your speech into text instantly with our advanced speech recognition technology.
//             </p>
//           </div>
//           <div className="feature-card">
//             <img src={feature2Icon} alt="Feature 2" className="feature-icon" />
//             <h3>📄 Export to PDF</h3>
//             <p>
//               Save your transcriptions as PDF documents with just one click.
//             </p>
//           </div>
//           <div className="feature-card">
//             <img src={feature3Icon} alt="Feature 3" className="feature-icon" />
//             <h3>🔒 Secure & Private</h3>
//             <p>
//               Your data is safe with us. We use industry-standard encryption.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Testimonials Section */}
//       <div className="testimonials-section">
//         <h2>What Our Users Say</h2>
//         <div className="testimonials-carousel">
//           <div className="testimonial-card">
//             <img src={testimonial1} alt="User 1" className="testimonial-image" />
//             <p>
//               "Voice2Text has completely changed the way I take notes. It's fast, accurate, and incredibly easy to use. Highly recommended!"
//             </p>
//             <p className="author">- Sarah T., Student</p>
//           </div>
//           <div className="testimonial-card">
//             <img src={testimonial2} alt="User 2" className="testimonial-image" />
//             <p>
//               "I use Voice2Text for transcribing meetings, and it saves me hours of work. The PDF export feature is a game-changer!"
//             </p>
//             <p className="author">- John D., Business Professional</p>
//           </div>
//           <div className="testimonial-card">
//             <img src={testimonial3} alt="User 3" className="testimonial-image" />
//             <p>
//               "As a content creator, Voice2Text helps me capture ideas on the go. It's an essential tool in my workflow."
//             </p>
//             <p className="author">- Emily R., Content Creator</p>
//           </div>
//         </div>
//       </div>

//       {/* Call-to-Action Section */}
//       <div className="cta-section">
//         <h2>Ready to Get Started?</h2>
//         <p>
//           Join thousands of users who are already boosting their productivity with SpeechNotes. Sign up today and experience the future of speech-to-text technology.
//         </p>
//         <div className="cta-buttons">
//           <Link to="/app" className="cta-button">GET Started for FREE</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;












import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Images and Icons
import heroImage from "../assets/Screenshot (9).png"; // Add a hero image
import feature1Icon from "../assets/Screenshot (2).png"; // Add feature icons
import feature2Icon from "../assets/Screenshot (3).png";
import feature3Icon from "../assets/Screenshot (4).png";
import testimonial1 from "../assets/Screenshot (9).png"; // Add testimonial images
import testimonial2 from "../assets/Screenshot (2).png";
import testimonial3 from "../assets/Screenshot (3).png";

const Home = () => {
  // Refs for sections
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">Voice2Text</span></h1>
          <p className="subtitle">Your Ultimate Speech-to-Text Solution</p>
          <p className="description">
            Start converting your speech to text in seconds. It's fast, accurate, and free! Join thousands of users who are already boosting their productivity with Voice2Text.
          </p>
          <div className="cta-buttons">
            <Link to="/app" className="cta-button primary">Get Started for Free</Link>
            <Link to="/features" className="cta-button secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" ref={featuresRef}>
        <h2>Why Choose <span className="highlight">Voice2Text</span>?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img src={feature1Icon} alt="Feature 1" className="feature-icon" />
            <h3>Real-Time Transcription</h3>
            <p>
              Convert your speech into text instantly with our advanced speech recognition technology.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature2Icon} alt="Feature 2" className="feature-icon" />
            <h3>Export to PDF</h3>
            <p>
              Save your transcriptions as PDF documents with just one click.
            </p>
          </div>
          <div className="feature-card">
            <img src={feature3Icon} alt="Feature 3" className="feature-icon" />
            <h3>Secure & Private</h3>
            <p>
              Your data is safe with us. We use industry-standard encryption.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <h2>What Our <span className="highlight">Users</span> Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <img src={testimonial1} alt="User 1" className="testimonial-image" />
            <p className="testimonial-text">
              "Voice2Text has completely changed the way I take notes. It's fast, accurate, and incredibly easy to use. Highly recommended!"
            </p>
            <p className="author">- Sarah T., Student</p>
          </div>
          <div className="testimonial-card">
            <img src={testimonial2} alt="User 2" className="testimonial-image" />
            <p className="testimonial-text">
              "I use Voice2Text for transcribing meetings, and it saves me hours of work. The PDF export feature is a game-changer!"
            </p>
            <p className="author">- John D., Business Professional</p>
          </div>
          <div className="testimonial-card">
            <img src={testimonial3} alt="User 3" className="testimonial-image" />
            <p className="testimonial-text">
              "As a content creator, Voice2Text helps me capture ideas on the go. It's an essential tool in my workflow."
            </p>
            <p className="author">- Emily R., Content Creator</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section" ref={ctaRef}>
        <h2>Ready to Get Started?</h2>
        <p>
          Join thousands of users who are already boosting their productivity with Voice2Text. Sign up today and experience the future of speech-to-text technology.
        </p>
        <div className="cta-buttons">
          <Link to="/app" className="cta-button primary">Get Started for Free</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
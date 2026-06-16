import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaQuoteLeft, FaArrowRight } from "react-icons/fa";
import "./Home.css";

const Home = () => {
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
      { threshold: 0.1 }
    );

    const elements = [heroRef.current, featuresRef.current, testimonialsRef.current, ctaRef.current];
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="hero-badge">Voice Typing Document Editor & Converter</div>
          <h1>Welcome to <span className="highlight">AuDoc</span></h1>
          <p className="subtitle">Professional Online Word Editor & Converter</p>
          <p className="description">
            Create, format, and edit documents with real-time voice typing. Dictate text, insert tables, shapes, & images, and instantly convert your work to clean PDF, Word (DOCX), or plain text. The ultimate free online document editor and voice-to-text converter.
          </p>
          <div className="cta-buttons">
            <Link to="/app" className="cta-button primary">
              Get Started for Free <FaArrowRight className="cta-arrow" />
            </Link>
            <a href="#features" onClick={handleSmoothScroll} className="cta-button secondary">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Designer vector hero illustration replacing buggy screenshots */}
        <div className="hero-image-container">
          <svg viewBox="0 0 500 400" className="hero-illustration" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
              <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#8b5cf6" floodOpacity="0.3" />
              </filter>
            </defs>
            {/* Background glowing circle */}
            <circle cx="250" cy="200" r="140" fill="url(#purpleGrad)" opacity="0.08" filter="url(#glow)" />
            
            {/* Isometric Document Mockup */}
            <rect x="180" y="80" width="180" height="240" rx="16" fill="#1e1e24" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
            
            {/* Text lines in doc */}
            <rect x="210" y="120" width="120" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
            <rect x="210" y="140" width="100" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
            <rect x="210" y="160" width="110" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
            <rect x="210" y="180" width="80" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
            
            {/* Waveforms on the document */}
            <path d="M210 230 C 220 210, 230 250, 240 230 C 250 210, 260 250, 270 230 C 280 210, 290 250, 300 230 C 310 210, 320 250, 330 230" stroke="url(#orangeGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
            
            {/* Floating Microphone Orb */}
            <circle cx="150" cy="240" r="50" fill="#2d2d39" stroke="url(#purpleGrad)" strokeWidth="3" filter="url(#glow)" />
            <path d="M150 215 C142 215 137 220 137 228 V248 C137 256 142 261 150 261 C158 261 163 256 163 248 V228 C163 220 158 215 150 215Z" fill="url(#purpleGrad)" />
            <path d="M130 240 C130 252 140 263 150 263 C160 263 170 252 170 240" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <path d="M150 263 V273" stroke="#ffffff" strokeWidth="3" />
            <path d="M140 273 H160" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            
            {/* Floating particle elements */}
            <circle cx="340" cy="110" r="6" fill="#fbbf24" opacity="0.8" />
            <circle cx="380" cy="200" r="10" fill="#8b5cf6" opacity="0.6" />
            <circle cx="110" cy="140" r="4" fill="#a78bfa" opacity="0.5" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features" ref={featuresRef}>
        <h2>Why Choose <span className="highlight">AuDoc</span>?</h2>
        <p className="section-subtitle">We combine state-of-the-art voice typing with a premium web-based document editor and converter.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-svg-wrapper bg-transcribe">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>
            <h3>Voice Typing Word Editor</h3>
            <p>
              Dictate and edit your text directly in a premium Microsoft Word-style editor. Format paragraphs, insert elements, and control styling as you speak.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-svg-wrapper bg-pdf">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
            </div>
            <h3>Multi-Format Document Converter</h3>
            <p>
              Convert your voice-typed documents into styled PDFs, Microsoft Word (DOCX), or plain text (TXT) files in a single click, completely offline.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-svg-wrapper bg-secure">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h3>100% Private & Client-Side</h3>
            <p>
              Your data never leaves your browser. All speech recognition, document editing, and file conversion are processed locally on your device for absolute privacy.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" ref={testimonialsRef}>
        <h2>What Our <span className="highlight">Users</span> Say</h2>
        <p className="section-subtitle">Read how AuDoc empowers creators, writers, and executives around the globe.</p>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="avatar-wrapper grad-1">
              <span>ST</span>
            </div>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">
              "AuDoc has completely changed the way I take lecture notes. It's fast, accurate, and incredibly easy to use. The voice commands make new paragraphs trivial!"
            </p>
            <p className="author">- Sarah T., University Student</p>
          </div>

          <div className="testimonial-card">
            <div className="avatar-wrapper grad-2">
              <span>JD</span>
            </div>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">
              "I use AuDoc for transcribing long executive board meetings, and it saves me hours of transcripts. The offline client-side PDF export is absolutely brilliant!"
            </p>
            <p className="author">- John D., Business Professional</p>
          </div>

          <div className="testimonial-card">
            <div className="avatar-wrapper grad-3">
              <span>ER</span>
            </div>
            <FaQuoteLeft className="quote-icon" />
            <p className="testimonial-text">
              "As a creative writer, AuDoc helps me capture wild ideas on the go. It's a frictionless, essential tool in my drafting and editing workflow."
            </p>
            <p className="author">- Emily R., Creative Author</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section" ref={ctaRef}>
        <div className="cta-glow"></div>
        <h2>Ready to Experience the Future?</h2>
        <p>
          Join thousands of productive individuals who are already redefining their note-taking workflows with AuDoc. Start dictating today and experience the speed.
        </p>
        <div className="cta-buttons center">
          <Link to="/app" className="cta-button primary big-btn">
            Get Started for Free <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
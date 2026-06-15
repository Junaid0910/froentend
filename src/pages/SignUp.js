import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaWaveSquare, FaArrowRight } from "react-icons/fa";
import "./Auth.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!name.trim() || !email.trim() || !username.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Mock SignUp storage
      const newUser = { name, email, username };
      
      // Store in users registry
      const existingUsersStr = localStorage.getItem("registeredUsers");
      let registeredUsers = [];
      if (existingUsersStr) {
        try {
          registeredUsers = JSON.parse(existingUsersStr);
        } catch (e) {
          registeredUsers = [];
        }
      }

      // Check if username already exists
      const userExists = registeredUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
      if (userExists) {
        setError("Username is already taken.");
        setLoading(false);
        return;
      }

      registeredUsers.push({ ...newUser, password });
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

      // Auto Login
      localStorage.setItem("loggedInUser", JSON.stringify(newUser));

      // Fire event to notify Navbar
      window.dispatchEvent(new Event("authChange"));

      setLoading(false);
      navigate("/app");
    }, 800); // Simulate network lag for premium feedback
  };

  return (
    <div className="auth-container">
      <div className="auth-background-shapes">
        <div className="shape circle-1"></div>
        <div className="shape circle-2"></div>
      </div>

      <div className="auth-card">
        <div className="auth-card-header">
          <Link to="/" className="auth-logo">
            <FaWaveSquare className="auth-logo-icon" />
            <span>VoiceType</span>
          </Link>
          <h2>Create Account</h2>
          <p>Sign up to start converting speech to documents</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSignUp} className="auth-form">
          <div className="auth-input-group">
            <label htmlFor="name"><FaUser /> Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="email"><FaEnvelope /> Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="username"><FaUser /> Choose Username</label>
            <input
              id="username"
              type="text"
              placeholder="johndoe12"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password"><FaLock /> Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input password-input"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <span className="input-helper">Minimum 6 characters</span>
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Registering..." : <>Register & Get Started <FaArrowRight /></>}
          </button>
        </form>

        <div className="auth-card-footer">
          <p>Already have an account? <Link to="/login" className="auth-link-alt">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

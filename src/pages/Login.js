import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaWaveSquare, FaArrowRight } from "react-icons/fa";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Check in registered users list
      const existingUsersStr = localStorage.getItem("registeredUsers");
      let registeredUsers = [];
      if (existingUsersStr) {
        try {
          registeredUsers = JSON.parse(existingUsersStr);
        } catch (e) {
          registeredUsers = [];
        }
      }

      // Check for match
      const matchedUser = registeredUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
      );

      // Also allow a default mock admin login for quick testing
      const isDefaultMock = username.toLowerCase() === "admin" && password === "admin123";

      if (matchedUser || isDefaultMock) {
        const activeUser = matchedUser ? { name: matchedUser.name, email: matchedUser.email, username: matchedUser.username } : { name: "Administrator", email: "admin@voicetype.com", username: "admin" };
        
        localStorage.setItem("loggedInUser", JSON.stringify(activeUser));

        // Fire event to notify Navbar
        window.dispatchEvent(new Event("authChange"));

        setLoading(false);
        navigate("/app");
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 800); // Premium feedback simulated latency
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
          <h2>Welcome Back</h2>
          <p>Login to access your speech transcription console</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-input-group">
            <label htmlFor="username"><FaUser /> Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
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
                placeholder="Enter your password"
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
            <div className="form-sub-row">
              <span className="demo-credentials" title="Testing credentials: Use admin / admin123 to log in instantly.">
                Demo: admin / admin123
              </span>
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Authenticating..." : <>Sign In <FaArrowRight /></>}
          </button>
        </form>

        <div className="auth-card-footer">
          <p>Don't have an account? <Link to="/signup" className="auth-link-alt">Create One</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

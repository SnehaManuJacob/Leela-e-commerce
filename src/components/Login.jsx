import React, { useState } from "react";
import { supabase } from "../api/supabase";

export default function Login({ onBack, onNavigate, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // THIS IS THE handleSubmit FUNCTION - it should be in this file
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    console.log("Starting authentication...");

    try {
      if (isLogin) {
        console.log("Attempting login with:", email);
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });

        console.log("Login response:", { data, error });

        if (error) {
          console.error("Login error:", error);
          throw error;
        }
        
        console.log("Login successful, user:", data.user);
        
        if (onLoginSuccess) {
          console.log("Calling onLoginSuccess");
          onLoginSuccess();
        }
        
        if (onNavigate) {
          console.log("Navigating to home");
          onNavigate("home");
        }
      } else {
        // Sign Up logic
        console.log("Attempting signup with:", email);
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
          options: {
            data: {
              full_name: name.trim(),
            }
          }
        });

        console.log("Signup response:", { data, error });

        if (error) {
          console.error("Signup error:", error);
          throw error;
        }
        
        console.log("Signup successful:", data);
        
        if (data.user) {
          alert("Account created successfully! You are now logged in.");
          if (onLoginSuccess) onLoginSuccess();
          if (onNavigate) onNavigate("home");
        } else {
          alert("Check your email for the confirmation link!");
          setIsLogin(true);
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message || "An error occurred during authentication");
    } finally {
      console.log("Authentication process completed");
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid login-wrapper">
      <div className="row min-vh-100">
        {/* Left Side - Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light">
          <img
            src="https://i.pinimg.com/1200x/6c/6c/45/6c6c4532a4c85599ce3cf7d03fd91759.jpg"
            alt="Illustration"
            className="img-fluid"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Right Side - Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="login-box p-4 shadow-sm bg-white rounded w-75">
            {/* Error message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {/* Toggle */}
            <div className="text-end small mb-3">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                className="btn btn-link p-0 text-decoration-none text-primary"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading}
                type="button"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </div>

            {/* Heading */}
            <h3 className="fw-bold mb-1 section-title">
              {isLogin ? "Welcome Back!" : "Welcome to Leela's!"}
            </h3>
            <p className="text-muted mb-4">
              {isLogin ? "Login to your account" : "Register your account"}
            </p>

            {/* FORM - This calls handleSubmit */}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control customInput"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                    disabled={loading}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control customInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control customInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                  placeholder="Enter your password"
                />
                <small className="text-muted">Minimum 6 characters</small>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100 py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  isLogin ? "Login" : "Create Account"
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={onBack}
                disabled={loading}
              >
                ← Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
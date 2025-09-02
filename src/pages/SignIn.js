// pages/SignIn.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const SignIn = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic would go here
    setIsAuthenticated(true);
    // Redirect or show success message
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In to Your Account</h2>
        <p>Welcome back! Please enter your details</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>
          
          <button type="submit" className="btn btn-primary auth-btn">Sign In</button>
        </form>
        
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
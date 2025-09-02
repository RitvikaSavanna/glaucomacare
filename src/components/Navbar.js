// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Additional logout logic here
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h2>GlaucomaCare</h2>
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/prediction" className="navbar-item">Glaucoma Prediction</Link>
          <Link to="/tutorials" className="navbar-item">Tutorials</Link>
          <Link to="/hospitals" className="navbar-item">Hospitals</Link>
          
          {isAuthenticated ? (
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          ) : (
            <div className="navbar-auth">
              <Link to="/signin" className="btn btn-outline">Sign In</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
        
        <button 
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
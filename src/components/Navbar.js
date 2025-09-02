// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <h2>GlaucomaDetect</h2>
        </Link>
        
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/prediction" className="navbar-item">Detection</Link>
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
// components/Footer.js
// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>GlaucomaDetect</h3>
            <p>AI-powered glaucoma detection for early diagnosis and treatment.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/prediction">Detection</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@glaucomadetect.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GlaucomaDetect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
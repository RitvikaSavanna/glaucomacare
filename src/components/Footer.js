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
            <h3>GlaucomaCare</h3>
            <p>Providing resources and tools for glaucoma detection, education, and treatment.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/prediction">Prediction Tool</Link></li>
              <li><Link to="/tutorials">Tutorials</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/hospitals">Hospitals</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#research">Research Papers</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@glaucomacare.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <div className="social-links">
              <a href="#facebook" aria-label="Facebook">FB</a>
              <a href="#twitter" aria-label="Twitter">TW</a>
              <a href="#instagram" aria-label="Instagram">IG</a>
              <a href="#linkedin" aria-label="LinkedIn">LI</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GlaucomaCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
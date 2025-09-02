// pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Early Glaucoma Detection Saves Vision</h1>
            <p>Our AI-powered system helps detect glaucoma severity from retinal images, enabling early intervention and treatment.</p>
            <div className="hero-buttons">
              <Link to="/prediction" className="btn btn-primary">Check Severity Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>Upload Image</h3>
              <p>Upload a clear retinal image for analysis.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI Analysis</h3>
              <p>Our advanced deep learning model analyzes the image.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Get Results</h3>
              <p>Receive detailed severity assessment and recommendations.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
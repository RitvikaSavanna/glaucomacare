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
            <h1>Early Detection Saves Vision</h1>
            <p>GlaucomaCare provides resources, prediction tools, and information to help in the fight against glaucoma</p>
            <div className="hero-buttons">
              <Link to="/prediction" className="btn btn-primary">Try Our Prediction Tool</Link>
              <Link to="/tutorials" className="btn btn-outline">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">How We Can Help</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>AI-Powered Prediction</h3>
              <p>Our advanced deep learning model can help identify different types of glaucoma from retinal images.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Educational Resources</h3>
              <p>Comprehensive tutorials and information about glaucoma types, symptoms, and treatments.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Medical Directory</h3>
              <p>Find specialized hospitals and clinics for glaucoma treatment and immediate care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h3>60+ Million</h3>
              <p>People affected by glaucoma worldwide</p>
            </div>
            <div className="stat">
              <h3>95%+</h3>
              <p>Accuracy of our prediction model</p>
            </div>
            <div className="stat">
              <h3>1000+</h3>
              <p>Medical resources available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

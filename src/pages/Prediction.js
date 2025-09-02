// pages/Prediction.js
import React, { useState } from 'react';
import './Prediction.css';

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    // Simulate API call to your backend model
    setTimeout(() => {
      const types = ['Open-Angle Glaucoma', 'Angle-Closure Glaucoma', 'Normal Vision'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const confidence = (Math.random() * 0.2 + 0.8).toFixed(2); // 0.8-1.0
      
      setPredictionResult({
        type: randomType,
        confidence: confidence,
        description: randomType === 'Normal Vision' 
          ? 'No signs of glaucoma detected.' 
          : `This appears to be ${randomType}. Please consult with an ophthalmologist for further evaluation.`
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="prediction">
      <div className="container">
        <h2 className="section-title">Glaucoma Prediction</h2>
        
        <div className="prediction-content">
          <div className="prediction-form card">
            <h3>Upload Retinal Image</h3>
            <p>Our AI model will analyze the image and predict the type of glaucoma</p>
            
            <form onSubmit={handleSubmit}>
              <div className="file-upload">
                <input 
                  type="file" 
                  id="retinal-image" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
                <label htmlFor="retinal-image">
                  {selectedFile ? selectedFile.name : 'Choose Retinal Image'}
                </label>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>
            </form>
          </div>
          
          <div className="prediction-result card">
            <h3>Prediction Result</h3>
            
            {isLoading ? (
              <div className="loading">Processing your image...</div>
            ) : predictionResult ? (
              <div className="result">
                <div className={`result-type ${predictionResult.type === 'Normal Vision' ? 'normal' : 'glaucoma'}`}>
                  {predictionResult.type}
                </div>
                <div className="confidence">
                  Confidence: {(predictionResult.confidence * 100).toFixed(1)}%
                </div>
                <p>{predictionResult.description}</p>
                
                {predictionResult.type !== 'Normal Vision' && (
                  <div className="recommendation">
                    <h4>Recommended Next Steps:</h4>
                    <ul>
                      <li>Schedule an appointment with an ophthalmologist</li>
                      <li>Review educational materials about {predictionResult.type}</li>
                      <li>Find specialized hospitals in our directory</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p>Upload an image to get started with the prediction.</p>
            )}
          </div>
        </div>
        
        <div className="prediction-info">
          <h3>About Our Prediction Model</h3>
          <p>
            Our deep learning model is based on advanced convolutional neural networks (CNNs) 
            that have been trained on thousands of retinal images. The model can distinguish 
            between different types of glaucoma with high accuracy, as presented in our 
            research at the International IEEE Conference.
          </p>
          
          <div className="model-stats">
            <div className="stat">
              <h4>95%+ Accuracy</h4>
              <p>On tested datasets</p>
            </div>
            <div className="stat">
              <h4>Multiple Types</h4>
              <p>Open-angle and angle-closure glaucoma detection</p>
            </div>
            <div className="stat">
              <h4>Fast Results</h4>
              <p>Analysis in seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prediction;

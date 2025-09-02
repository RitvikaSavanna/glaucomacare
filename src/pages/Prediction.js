// pages/Prediction.js
import React, { useState } from 'react';
import './Prediction.css';

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setIsLoading(true);
    
    // Simulate API call to your backend model
    setTimeout(() => {
      const severities = ['Mild', 'Moderate', 'Severe'];
      const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
      const confidence = (Math.random() * 0.2 + 0.8).toFixed(2); // 0.8-1.0
      
      setPredictionResult({
        severity: randomSeverity,
        confidence: confidence,
        description: `The model has detected ${randomSeverity.toLowerCase()} glaucoma with high confidence.`,
        recommendations: [
          'Consult with an ophthalmologist for further evaluation',
          'Schedule regular eye examinations',
          'Consider prescribed treatment options',
          'Monitor intraocular pressure regularly'
        ]
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="prediction">
      <div className="container">
        <h2 className="section-title">Glaucoma Severity Detection</h2>
        
        <div className="prediction-content">
          <div className="prediction-form card">
            <h3>Upload Retinal Image</h3>
            <p>Our AI model will analyze the image and predict glaucoma severity</p>
            
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
              
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              )}
              
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
              <div className="loading">
                <div className="spinner"></div>
                <p>Processing your image...</p>
              </div>
            ) : predictionResult ? (
              <div className="result">
                <div className={`result-severity ${predictionResult.severity.toLowerCase()}`}>
                  {predictionResult.severity} Glaucoma
                </div>
                <div className="confidence">
                  Confidence: {(predictionResult.confidence * 100).toFixed(1)}%
                </div>
                <p>{predictionResult.description}</p>
                
                <div className="recommendations">
                  <h4>Recommendations:</h4>
                  <ul>
                    {predictionResult.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>Upload an image to get started with the prediction.</p>
            )}
          </div>
        </div>
        
        <div className="prediction-info">
          <h3>About Our Detection Model</h3>
          <p>
            Our deep learning model is based on advanced convolutional neural networks (CNNs) 
            that have been trained on thousands of retinal images. The model can assess glaucoma 
            severity with high accuracy, helping ophthalmologists with early diagnosis.
          </p>
          
          <div className="model-stats">
            <div className="stat">
              <h4>95%+ Accuracy</h4>
              <p>On tested datasets</p>
            </div>
            <div className="stat">
              <h4>Multiple Severity Levels</h4>
              <p>Mild, Moderate, and Severe detection</p>
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
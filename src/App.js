import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Tutorials from './pages/Tutorials';
import Hospitals from './pages/Hospitals';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import './App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route 
            path="/signin" 
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route 
            path="/signup" 
            element={<SignUp setIsAuthenticated={setIsAuthenticated} />} 
          />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
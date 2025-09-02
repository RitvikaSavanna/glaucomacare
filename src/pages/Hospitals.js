import React, { useState, useEffect } from 'react';
import './Hospitals.css';

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [apiKey] = useState('AIzaSyCgCnlOXsDJXn3VJh9coMMnipDwT49Zi9g'); // Replace with your actual API key

  // Function to load Google Maps script
  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // Search for hospitals using Google Places API
  const searchHospitals = async (searchLocation, isCurrentLocation = false) => {
    setLoading(true);
    
    try {
      // Load Google Maps script if not already loaded
      await loadGoogleMapsScript();
      
      let searchQuery;
      let locationObj;
      
      if (isCurrentLocation) {
        // Use current location coordinates
        searchQuery = 'glaucoma treatment center';
        locationObj = new window.google.maps.LatLng(
          searchLocation.lat, 
          searchLocation.lng
        );
      } else {
        // Use text-based location search
        searchQuery = `glaucoma treatment center in ${searchLocation}`;
      }
      
      // Create a Places Service instance
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );
      
      // Define the request
      const request = {
        query: searchQuery,
        fields: ['name', 'formatted_address', 'geometry', 'rating', 'user_ratings_total', 'photos'],
        ...(isCurrentLocation && { location: locationObj, radius: 50000 }) // 50km radius
      };
      
      // Execute the search
      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          // Process and format the results
          const hospitalData = results.map((place, index) => ({
            id: place.place_id || index,
            name: place.name,
            address: place.formatted_address,
            specialty: "Glaucoma Treatment Center",
            rating: place.rating || 0,
            reviewCount: place.user_ratings_total || 0,
            distance: calculateDistance(userLocation, place.geometry.location),
            services: ["Glaucoma Consultation", "Eye Exams", "Treatment Options"],
            image: place.photos && place.photos[0] 
              ? place.photos[0].getUrl({ maxWidth: 500, maxHeight: 300 }) 
              : "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          }));
          
          setHospitals(hospitalData);
        } else {
          console.error("Places API error:", status);
          // Fallback to sample data if API fails
          setHospitals(sampleHospitals);
        }
        setLoading(false);
      });
    } catch (error) {
      console.error("Error loading Google Maps API:", error);
      // Fallback to sample data
      setHospitals(sampleHospitals);
      setLoading(false);
    }
  };

  // Calculate distance between two points (simplified)
  const calculateDistance = (location1, location2) => {
    if (!location1 || !location2) return "N/A";
    
    // Using Haversine formula for distance calculation
    const R = 6371; // Earth's radius in km
    const dLat = deg2rad(location2.lat() - location1.lat);
    const dLon = deg2rad(location2.lng() - location1.lng);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(location1.lat)) * Math.cos(deg2rad(location2.lat())) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    
    // Convert to miles and round to 1 decimal
    return (distance * 0.621371).toFixed(1);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  // Sample data as fallback
  const sampleHospitals = [
    // ... (same as your sample data)
  ];

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          setLocation("Current Location");
          searchHospitals(userLoc, true);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
          alert("Unable to get your location. Please enter a location manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim() === "") {
      alert("Please enter a location");
      return;
    }
    
    searchHospitals(location, false);
  };

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star full">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="hospitals-page">
      <div className="container">
        <h2 className="section-title">Find Glaucoma Specialists & Clinics</h2>
        <p className="section-subtitle">Directory of hospitals and clinics specializing in glaucoma treatment</p>
        
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Enter city, zip code, or address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
            <div className="location-options">
              <span>or</span>
              <button type="button" onClick={getCurrentLocation} className="current-location-btn">
                Use Current Location
              </button>
            </div>
          </form>
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Searching for glaucoma specialists near you...</p>
          </div>
        ) : (
          <>
            {hospitals.length > 0 ? (
              <div className="results-section">
                <div className="results-header">
                  <h3>Glaucoma Treatment Centers near {location}</h3>
                  <p>{hospitals.length} centers found</p>
                </div>
                
                <div className="filters">
                  <span>Filter by:</span>
                  <button className="filter-btn active">All</button>
                  <button className="filter-btn">Highest Rated</button>
                  <button className="filter-btn">Nearest</button>
                  <button className="filter-btn">Advanced Surgery</button>
                </div>
                
                <div className="hospitals-list">
                  {hospitals.map(hospital => (
                    <div key={hospital.id} className="hospital-card">
                      <div className="hospital-image">
                        <img src={hospital.image} alt={hospital.name} />
                      </div>
                      <div className="hospital-info">
                        <h3>{hospital.name}</h3>
                        <p className="specialty">{hospital.specialty}</p>
                        <p className="address">{hospital.address}</p>
                        <div className="rating">
                          {renderStars(hospital.rating)}
                          <span className="rating-value">{hospital.rating}</span>
                          <span className="review-count">({hospital.reviewCount} reviews)</span>
                        </div>
                        <div className="services">
                          {hospital.services.map((service, index) => (
                            <span key={index} className="service-tag">{service}</span>
                          ))}
                        </div>
                        <div className="distance">{hospital.distance} miles away</div>
                      </div>
                      <div className="hospital-actions">
                        <button className="action-btn primary">View Details</button>
                        <button className="action-btn secondary">Book Consultation</button>
                        <button className="action-btn link">Get Directions</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-content">
                  <h3>Find Glaucoma Treatment Centers</h3>
                  <p>Enter your location to find hospitals and clinics specializing in glaucoma treatment near you.</p>
                  <div className="features">
                    <div className="feature">
                      <div className="feature-icon">⭐</div>
                      <h4>Rated Specialists</h4>
                      <p>Find top-rated glaucoma specialists with patient reviews</p>
                    </div>
                    <div className="feature">
                      <div className="feature-icon">📍</div>
                      <h4>Nearby Locations</h4>
                      <p>Discover treatment centers close to your location</p>
                    </div>
                    <div className="feature">
                      <div className="feature-icon">💼</div>
                      <h4>Specialized Care</h4>
                      <p>Find centers with advanced glaucoma treatment options</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
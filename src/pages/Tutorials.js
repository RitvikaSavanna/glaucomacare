import React, { useState, useEffect } from 'react';
import './Tutorials.css';

const Tutorials = () => {
  const [activeTab, setActiveTab] = useState('openAngle');
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(true);

  // YouTube API key (in a real app, this should be stored securely)
  // Note: You'll need to get your own API key from Google Cloud Console
  const API_KEY = 'AIzaSyBxOGM_CetQdQNOIeeUztiY7rbKoFWBMk8';
  
  // Search queries for each type of glaucoma
  const searchQueries = {
    openAngle: 'open angle glaucoma treatment education',
    angleClosure: 'angle closure glaucoma emergency treatment',
    normalTension: 'normal tension glaucoma diagnosis'
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const query = searchQueries[activeTab];
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        setVideos(prev => ({
          ...prev,
          [activeTab]: data.items
        }));
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        // Fallback to placeholder videos if API fails
        setVideos(prev => ({
          ...prev,
          [activeTab]: null
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [activeTab]);

  const glaucomaTypes = {
    openAngle: {
      title: "Open-Angle Glaucoma",
      articles: [
        { id: 1, title: "Causes and Risk Factors", excerpt: "Learn about what causes open-angle glaucoma and who is at risk..." },
        { id: 2, title: "Early Symptoms to Watch For", excerpt: "Discover the subtle signs that might indicate early-stage glaucoma..." },
        { id: 3, title: "Medication Guide", excerpt: "A comprehensive overview of medications used to treat open-angle glaucoma..." }
      ]
    },
    angleClosure: {
      title: "Angle-Closure Glaucoma",
      articles: [
        { id: 1, title: "Acute vs Chronic Angle-Closure", excerpt: "Understanding the differences between these two forms of angle-closure glaucoma..." },
        { id: 2, title: "Prevention Strategies", excerpt: "How to reduce your risk of developing angle-closure glaucoma..." },
        { id: 3, title: "Post-Treatment Care", excerpt: "What to expect after treatment for angle-closure glaucoma..." }
      ]
    },
    normalTension: {
      title: "Normal-Tension Glaucoma",
      articles: [
        { id: 1, title: "Understanding Normal-Tension Glaucoma", excerpt: "Why optic nerve damage can occur even with normal eye pressure..." },
        { id: 2, title: "Specialized Treatment Approaches", excerpt: "How treatment differs for normal-tension glaucoma..." }
      ]
    }
  };

  // Fallback videos in case YouTube API fails or is not configured
  const fallbackVideos = {
    openAngle: [
      { 
        id: { videoId: 'bR6Fyz0ArC4' }, 
        snippet: { 
          title: 'Open-Angle Glaucoma', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/bR6Fyz0ArC4/mqdefault.jpg' 
            } 
          } 
        } 
      },
      { 
        id: { videoId: 'KkLjhLk6Y4U' }, 
        snippet: { 
          title: 'Understanding Glaucoma', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/KkLjhLk6Y4U/mqdefault.jpg' 
            } 
          } 
        } 
      },
      { 
        id: { videoId: 'GZ5nkT5lWnI' }, 
        snippet: { 
          title: 'Glaucoma Treatment Options', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/GZ5nkT5lWnI/mqdefault.jpg' 
            } 
          } 
        } 
      }
    ],
    angleClosure: [
      { 
        id: { videoId: 'JcIe-6y6Lk4' }, 
        snippet: { 
          title: 'Angle-Closure Glaucoma', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/JcIe-6y6Lk4/mqdefault.jpg' 
            } 
          } 
        } 
      },
      { 
        id: { videoId: 'hK0f1-7ChaI' }, 
        snippet: { 
          title: 'Acute Angle-Closure Glaucoma', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/hK0f1-7ChaI/mqdefault.jpg' 
            } 
          } 
        } 
      },
      { 
        id: { videoId: 'r6tT7s+BJ_s' }, 
        snippet: { 
          title: 'Laser Iridotomy for Angle-Closure', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/r6tT7s+BJ_s/mqdefault.jpg' 
            } 
          } 
        } 
      }
    ],
    normalTension: [
      { 
        id: { videoId: 'sB4Vp5q_ly0' }, 
        snippet: { 
          title: 'Normal-Tension Glaucoma', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/sB4Vp5q_ly0/mqdefault.jpg' 
            } 
          } 
        } 
      },
      { 
        id: { videoId: 'JcIe-6y6Lk4' }, 
        snippet: { 
          title: 'Diagnosis of Normal-Tension Glaucoma', 
          thumbnails: { 
            medium: { 
              url: 'https://i.ytimg.com/vi/JcIe-6y6Lk4/mqdefault.jpg' 
            } 
          } 
        } 
      }
    ]
  };

  const currentVideos = videos[activeTab] || fallbackVideos[activeTab];

  return (
    <div className="tutorials">
      <div className="container">
        <h2 className="section-title">Glaucoma Tutorials & Information</h2>
        
        <div className="tabs">
          <button 
            className={activeTab === 'openAngle' ? 'active' : ''}
            onClick={() => setActiveTab('openAngle')}
          >
            Open-Angle Glaucoma
          </button>
          <button 
            className={activeTab === 'angleClosure' ? 'active' : ''}
            onClick={() => setActiveTab('angleClosure')}
          >
            Angle-Closure Glaucoma
          </button>
          <button 
            className={activeTab === 'normalTension' ? 'active' : ''}
            onClick={() => setActiveTab('normalTension')}
          >
            Normal-Tension Glaucoma
          </button>
        </div>
        
        <div className="tab-content">
          <h3>{glaucomaTypes[activeTab].title}</h3>
          
          <div className="videos-section">
            <h4>Educational Videos</h4>
            {loading ? (
              <div className="loading">Loading videos...</div>
            ) : (
              <div className="video-grid">
                {currentVideos.map((video, index) => (
                  <div key={index} className="video-card">
                    <div className="video-thumbnail">
                      <img 
                        src={video.snippet.thumbnails.medium.url} 
                        alt={video.snippet.title} 
                      />
                    </div>
                    <div className="video-info">
                      <h5>{video.snippet.title}</h5>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Watch Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="articles-section">
            <h4>Informative Articles</h4>
            <div className="articles-grid">
              {glaucomaTypes[activeTab].articles.map(article => (
                <div key={article.id} className="article-card">
                  <h5>{article.title}</h5>
                  <p>{article.excerpt}</p>
                  <a href="#read-more" className="read-more">Read More →</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;
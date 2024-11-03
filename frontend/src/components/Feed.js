// src/pages/Feed.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../assets/css/Feed.css';

const Feed = ({ currentUserId }) => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/outfits');
        setOutfits(response.data);
      } catch (err) {
        setError('Error fetching outfits');
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  const handleLike = async (outfitId) => {
    try {
      const response = await axios.post(`http://localhost:5500/api/outfits/${outfitId}/like`, { userId: currentUserId });
      // Update the outfits state with the liked outfit
      setOutfits((prevOutfits) =>
        prevOutfits.map((outfit) =>
          outfit._id === outfitId ? { ...outfit, likes: response.data.likes } : outfit // Ensure user data is retained
        )
      );
    } catch (err) {
      console.error('Error liking outfit:', err);
    }
  };

  if (loading) return <p>Loading outfits...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="feed">
      <h2>User Spotlight</h2>
      <div className="feed-container">
        {outfits.map((outfit) => (
          <div key={outfit._id} className="feed-post">
            <div className="image-container">
              <img src={`http://localhost:5500/${outfit.image}`} alt="Outfit" />
              <div className="overlay">
                <p className="feed-post-caption">{outfit.caption}</p>
                <p className="feed-post-user">Posted by: {outfit.user.name}</p>
                <p className="feed-post-likes">Likes: {outfit.likes ? outfit.likes.length : 0}</p>
                <button className="feed-post-like-button" onClick={() => handleLike(outfit._id)}>
                  {outfit.likes && outfit.likes.includes(currentUserId) ? 'Unlike' : 'Like'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;

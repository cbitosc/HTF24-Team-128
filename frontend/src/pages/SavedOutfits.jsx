// src/pages/SavedOutfits.jsx
import axios from 'axios';
import PropTypes from 'prop-types'; // Import PropTypes
import React, { useEffect, useState } from 'react';
import '../assets/css/SavedOutfits.css'; // Ensure you have this CSS file

const SavedOutfits = ({ currentUserId }) => {
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedOutfits = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/api/outfits/saved/${currentUserId}`);
        setSavedOutfits(response.data);
      } catch (err) {
        setError('Error fetching saved outfits');
      } finally {
        setLoading(false);
      }
    };

    fetchSavedOutfits();
  }, [currentUserId]);

  if (loading) return <p>Loading saved outfits...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="saved-outfits">
      <h2>Liked Outfits</h2>
      <div className="feed-container">
        {savedOutfits.length > 0 ? (
          savedOutfits.map((outfit) => (
            <div key={outfit._id} className="feed-post">
              <div className="image-container">
                <img src={`http://localhost:5500/${outfit.image}`} alt="Outfit" />
                <div className="overlay">
                  <p className="feed-post-caption">{outfit.caption}</p>
                  <p className="feed-post-likes">Likes: {outfit.likes ? outfit.likes.length : 0}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No saved outfits found.</p>
        )}
      </div>
    </div>
  );
};

// Define prop types
SavedOutfits.propTypes = {
  currentUserId: PropTypes.string.isRequired, // Specify that currentUserId is a required string
};

export default SavedOutfits;
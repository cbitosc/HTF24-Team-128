// src/pages/UploadOutfit.jsx
import axios from 'axios';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../assets/css/UploadOutfit.css';

const UploadOutfit = ({ currentUserId }) => {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    formData.append('userId', currentUserId); // Include userId

    const token = localStorage.getItem('token'); // Retrieve the token

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:5500/api/outfits', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers
        },
      });
      console.log('Outfit uploaded successfully:', response.data);
      // Optionally reset the form or show a success message
      setCaption('');
      setFile(null);
    } catch (error) {
      console.error('Error uploading outfit:', error);
      setError('Error uploading outfit. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-outfit">
      <h2>Upload New Outfit</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag & drop an image, or click to select</p>
        </div>
        {file && <p>Selected file: {file.name}</p>}
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption..."
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadOutfit;

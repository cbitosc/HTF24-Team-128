// src/components/ImageVoting.js
import React, { useEffect, useState } from 'react';
import '../assets/css/Contest.css'; // Ensure you have this CSS file

const ImageVoting = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [votes, setVotes] = useState({});
    const [feedbacks, setFeedbacks] = useState({});
    const [ratings, setRatings] = useState({});
    const [winningImageIndex, setWinningImageIndex] = useState(null);
    
    useEffect(() => {
        loadImages();
    }, []);

    const loadImages = () => {
        const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
        const votes = JSON.parse(localStorage.getItem('votes')) || {};
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
        const ratings = JSON.parse(localStorage.getItem('ratings')) || {};

        setUploadedImages(images);
        setVotes(votes);
        setFeedbacks(feedbacks);
        setRatings(ratings);
        displayWinningImage(votes);
    };

    const displayWinningImage = (votes) => {
        const winningIndex = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b, 0);
        setWinningImageIndex(winningIndex);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const imageInput = e.target.elements.imageInput;
        const newImages = [...uploadedImages, URL.createObjectURL(imageInput.files[0])];
        setUploadedImages(newImages);
        localStorage.setItem('uploadedImages', JSON.stringify(newImages));
        imageInput.value = ''; // Clear the input
        loadImages(); // Reload images to reflect changes
    };

    const voteImage = (image) => {
        const index = uploadedImages.indexOf(image);
        if (index > -1) {
            const newVotes = { ...votes, [index]: (votes[index] || 0) + 1 };
            setVotes(newVotes);
            localStorage.setItem('votes', JSON.stringify(newVotes));
            displayWinningImage(newVotes);
        }
    };

    const removeVoteImage = (image) => {
        const index = uploadedImages.indexOf(image);
        if (index > -1) {
            const newVotes = { ...votes, [index]: Math.max((votes[index] || 0) - 1, 0) };
            setVotes(newVotes);
            localStorage.setItem('votes', JSON.stringify(newVotes));
            displayWinningImage(newVotes);
        }
    };

    const deleteImage = (image) => {
        const index = uploadedImages.indexOf(image);
        if (index > -1) {
            const newImages = uploadedImages.filter((_, i) => i !== index);
            const newVotes = { ...votes };
            delete newVotes[index];

            const newFeedbacks = { ...feedbacks };
            delete newFeedbacks[index];

            const newRatings = { ...ratings };
            delete newRatings[index];

            setUploadedImages(newImages);
            setVotes(newVotes);
            setFeedbacks(newFeedbacks);
            setRatings(newRatings);

            localStorage.setItem('uploadedImages', JSON.stringify(newImages));
            localStorage.setItem('votes', JSON.stringify(newVotes));
            localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));
            localStorage.setItem('ratings', JSON.stringify(newRatings));
            loadImages();
        }
    };

    const addFeedback = (image, feedback) => {
        if (!feedback.trim()) return; // Ignore empty feedback
        const index = uploadedImages.indexOf(image);
        if (index > -1) {
            const newFeedbacks = { ...feedbacks, [index]: [...(feedbacks[index] || []), feedback] };
            setFeedbacks(newFeedbacks);
            localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));
        }
    };

    const addRating = (image, rating) => {
        const index = uploadedImages.indexOf(image);
        if (index > -1) {
            const newRatings = { ...ratings, [index]: [...(ratings[index] || []), parseInt(rating, 10)] };
            setRatings(newRatings);
            localStorage.setItem('ratings', JSON.stringify(newRatings));
        }
    };

    const calculateAverageRating = (ratingList) => {
        if (ratingList.length === 0) return 0;
        const total = ratingList.reduce((acc, val) => acc + val, 0);
        return total / ratingList.length;
    };

    const averageRating = (image) => {
        const index = uploadedImages.indexOf(image);
        return calculateAverageRating(ratings[index] || []);
    };

    return (
        <div>
            <h2>Upload and View Images</h2>
            <form onSubmit={handleUpload}>
                <label htmlFor="imageInput">Upload Image:</label>
                <input type="file" id="imageInput" accept="image/*" required />
                <button type="submit">Upload</button>
            </form>
            <div id="feed">
                {uploadedImages.length === 0 ? (
                    <p>No images uploaded yet.</p>
                ) : (
                    uploadedImages.map((image, index) => (
                        <div className="image-container" key={index}>
                            <img src={image} alt={`Uploaded ${index}`} />
                            <div>
                                <button onClick={() => voteImage(image)}>Vote</button>
                                <button onClick={() => removeVoteImage(image)}>Remove Vote</button>
                                <button onClick={() => deleteImage(image)}>Delete Image</button>
                                <div className="vote-count">Votes: {votes[index] || 0}</div>
                                <input placeholder="Add your feedback" className="feedback-input" onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addFeedback(image, e.target.value);
                                        e.target.value = '';
                                    }
                                }} />
                                <input type="number" min="1" max="5" placeholder="Rate (1-5)" onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        addRating(image, e.target.value);
                                        e.target.value = '';
                                    }
                                }} />
                                <div className="feedback-list">
                                    {feedbacks[index] && feedbacks[index].map((fb, i) => <p key={i}>{fb}</p>)}
                                </div>
                                <div className="rating">
                                    Average Rating: {averageRating(image).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div id="winningImage">
                {winningImageIndex !== null && uploadedImages[winningImageIndex] && (
                    <>
                        <h2>Winning Image:</h2>
                        <img src={uploadedImages[winningImageIndex]} alt="Winning Image" />
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageVoting;
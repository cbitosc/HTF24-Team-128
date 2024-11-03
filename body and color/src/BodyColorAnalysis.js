// BodyColorAnalysis.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update this import
import './BodyColorAnalysis.css'; 

const BodyColorAnalysis = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleBoxClick = () => {
        navigate('/upload-analysis'); // Navigate to the upload page
    };

    return (
        <main>
            <header>
                <div className="navbar">
                    <h1 className="logo">Virtual Wardrobe</h1>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/login">Login & Signup</a></li>
                            <li><a href="/body-analysis">Body Analysis</a></li>
                            <li><a href="/game-tips">Tips & Trends</a></li>
                            <li><a href="/upload-wardrobe">Your Wardrobe</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <section className="analysis-section">
                <h2>Body & Color Analysis</h2>
                <p>Discover your perfect color palette and body type for an enhanced wardrobe!</p>
                <div className="analysis-results">
                    <div className="ovals-container">
                        <div className="oval-window" onClick={handleBoxClick}>
                            <h4>Your Color Palette</h4>
                            <p>Explore the shades that suit you!</p>
                        </div>
                        <div className="oval-window" onClick={handleBoxClick}>
                            <h4>Your Body Type</h4>
                            <p>Find styles that flatter your figure!</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default BodyColorAnalysis;

import React, { useState } from 'react';
import './UploadAnalysis.css'; 
import lightImage from './assests/images/light.jpeg';
import mediumImage from './assests/images/medium.jpeg';
import darkImage from './assests/images/dark.jpeg';
import brownHairImage from './assests/images/brownhair.jpeg';
import redHairImage from './assests/images/redhair.jpeg';
import blondeHairImage from './assests/images/blondehair.jpeg';
import blackHairImage from './assests/images/blackhair.jpeg';
import blueEyeImage from './assests/images/blue.jpeg';
import greenEyeImage from './assests/images/green.jpeg';
import brownEyeImage from './assests/images/brown.jpeg';
import hazelEyeImage from './assests/images/hazel.jpeg';

const UploadAnalysis = () => {
    const [skinTone, setSkinTone] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [undertone, setUndertone] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [step, setStep] = useState(0); 

    const uniqueSkinTones = ['Light', 'Medium', 'Dark'];
    const uniqueHairColors = ['Brown', 'Red', 'Blonde', 'Black'];
    const uniqueEyeColors = ['Blue', 'Green', 'Brown', 'Hazel'];
    const uniqueUndertones = ['Cool', 'Warm', 'Neutral'];

    // Color palettes for each season
    const colorPalettes = {
        Spring: ['#FFB3BA', '#FF677D', '#D5AAFF'], // Pastel Pink, Light Blue, Mint Green
        Summer: ['#C1C6FF', '#A0D2DB', '#F9AFAF'], // Soft Lavender, Cool Blue, Blush Pink
        Autumn: ['#C5B0A0', '#7D9A6A', '#D75B37'], // Earthy Browns, Olive Green, Rust Orange
        Winter: ['#003DA5', '#C72B4D', '#007A54'] // Deep Blues, Rich Reds, Emerald Green
    };

    // Determine the season based on selections
    const determineSeason = (skinTone, hairColor, eyeColor, undertone) => {
        if (skinTone === 'Light' && hairColor === 'Blonde' && (eyeColor === 'Blue' || eyeColor === 'Hazel')) {
            return 'Spring';
        } else if (skinTone === 'Light' && hairColor === 'Red') {
            return 'Summer';
        } else if (skinTone === 'Medium' && hairColor === 'Brown') {
            return 'Autumn';
        } else if (skinTone === 'Dark' && hairColor === 'Black' && undertone === 'Cool') {
            return 'Winter';
        } else if (skinTone === 'Medium' && (hairColor === 'Black' || hairColor === 'Brown')) {
            return 'Winter';
        }
        return 'Undetermined';
    };

    const handleNext = (event) => {
        event.preventDefault();

        if (step < 3) {
            setStep(step + 1);
        } else {
            const seasonResult = determineSeason(skinTone, hairColor, eyeColor, undertone);
            const analysisData = {
                skinTone,
                hairColor,
                eyeColor,
                undertone,
                season: seasonResult
            };
            setAnalysisResult(analysisData);
            setStep(5); // Move to results display step
        }
    };

    const renderSkinToneOptions = () => {
        return uniqueSkinTones.map((tone) => {
            let imageSrc;
            switch (tone) {
                case 'Light':
                    imageSrc = lightImage;
                    break;
                case 'Medium':
                    imageSrc = mediumImage;
                    break;
                case 'Dark':
                    imageSrc = darkImage;
                    break;
                default:
                    break;
            }

            return (
                <label key={tone} className="radio-option">
                    <img src={imageSrc} alt={tone} style={{ width: '50px', height: '50px' }} />
                    <input
                        type="radio"
                        name="skinTone"
                        value={tone}
                        onChange={(e) => setSkinTone(e.target.value)}
                        required
                    />
                    {tone}
                </label>
            );
        });
    };

    const renderHairColorOptions = () => {
        return uniqueHairColors.map((color) => {
            let imageSrc;
            switch (color) {
                case 'Brown':
                    imageSrc = brownHairImage;
                    break;
                case 'Red':
                    imageSrc = redHairImage;
                    break;
                case 'Blonde':
                    imageSrc = blondeHairImage;
                    break;
                case 'Black':
                    imageSrc = blackHairImage;
                    break;
                default:
                    break;
            }

            return (
                <label key={color} className="radio-option">
                    <img src={imageSrc} alt={color} style={{ width: '50px', height: '50px' }} />
                    <input
                        type="radio"
                        name="hairColor"
                        value={color}
                        onChange={(e) => setHairColor(e.target.value)}
                        required
                    />
                    {color}
                </label>
            );
        });
    };

    const renderEyeColorOptions = () => {
        return uniqueEyeColors.map((color) => {
            let imageSrc;
            switch (color) {
                case 'Blue':
                    imageSrc = blueEyeImage;
                    break;
                case 'Green':
                    imageSrc = greenEyeImage;
                    break;
                case 'Brown':
                    imageSrc = brownEyeImage;
                    break;
                case 'Hazel':
                    imageSrc = hazelEyeImage;
                    break;
                default:
                    break;
            }

            return (
                <label key={color} className="radio-option">
                    <img src={imageSrc} alt={color} style={{ width: '50px', height: '50px' }} />
                    <input
                        type="radio"
                        name="eyeColor"
                        value={color}
                        onChange={(e) => setEyeColor(e.target.value)}
                        required
                    />
                    {color}
                </label>
            );
        });
    };

    const renderUndertoneOptions = () => {
        return uniqueUndertones.map((tone) => {
            let color;
            switch (tone) {
                case 'Cool':
                    color = 'blue';
                    break;
                case 'Warm':
                    color = 'green';
                    break;
                case 'Neutral':
                    color = 'purple';
                    break;
                default:
                    break;
            }

            return (
                <label key={tone} className="radio-option">
                    <span style={{ 
                        display: 'inline-block', 
                        width: '50px', 
                        height: '50px', 
                        backgroundColor: color,
                        borderRadius: '50%',
                        marginRight: '10px'
                    }} />
                    <input
                        type="radio"
                        name="undertone"
                        value={tone}
                        onChange={(e) => setUndertone(e.target.value)}
                        required
                    />
                    {tone}
                </label>
            );
        });
    };

    return (
        <div className="upload-analysis">
            <h2 className="brown-text">Color Analysis Quiz</h2>
            <form onSubmit={handleNext} className="analysis-form">
                {step === 0 && (
                    <div className="question-box">
                        <h3 className="brown-text">What is your skin tone?</h3>
                        <div className="radio-group">
                            {renderSkinToneOptions()}
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="question-box">
                        <h3 className="brown-text">What is your hair color?</h3>
                        <div className="radio-group">
                            {renderHairColorOptions()}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="question-box">
                        <h3 className="brown-text">What is your eye color?</h3>
                        <div className="radio-group">
                            {renderEyeColorOptions()}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="question-box">
                        <h3 className="brown-text">What is your undertone?</h3>
                        <div className="radio-group">
                            {renderUndertoneOptions()}
                        </div>
                    </div>
                )}

                <button type="submit" className="submit-button">
                    {step < 3 ? 'Next' : 'Submit'}
                </button>
            </form>

            {step === 5 && analysisResult && (
                <div className="analysis-results">
                    <h3 className="brown-text">Your Color Analysis Results:</h3>
                    <p className="result-text">Skin Tone: {analysisResult.skinTone}</p>
                    <p className="result-text">Hair Color: {analysisResult.hairColor}</p>
                    <p className="result-text">Eye Color: {analysisResult.eyeColor}</p>
                    <p className="result-text">Undertone: {analysisResult.undertone}</p>
                    <p className="result-text">Recommended Season: {analysisResult.season}</p>
                    <h4 className="color-palette-title">Suggested Color Palette:</h4>
                    <div className="color-palette">
                        {colorPalettes[analysisResult.season]?.map((color, index) => (
                            <div key={index} className="color-box" style={{ backgroundColor: color }}>
                                {color}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadAnalysis;

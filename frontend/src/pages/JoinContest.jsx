import React, { useState } from 'react';
import '../assets/css/JoinContest.css'; // Ensure you have this CSS file


const UploadOutfit = () => {
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        if (!imageFile) {
            alert("Please select an image file to upload.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadedImage = e.target.result;
            saveImage(uploadedImage);
        };

        try {
            reader.readAsDataURL(imageFile);
        } catch (error) {
            console.error("Error reading image file:", error);
            alert("Failed to read image file.");
        }
    };

    const saveImage = (image) => {
        let images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
        images.push(image);
        localStorage.setItem('uploadedImages', JSON.stringify(images));
        alert('Image uploaded successfully!'); // Display success message
    };

    return (
        <div>
            <h2>Upload Your Outfit Image</h2>
            <form id="uploadForm" onSubmit={handleSubmit}>
                <label id="file-label" htmlFor="imageInput">Choose an image</label>
                <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">Upload</button>
                <button type="button" onClick={() => window.location.href = 'display.html'}>
                    View Uploaded Images
                </button>
            </form>
        </div>
    );
};

export default UploadOutfit;
const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(uploadForm);
    const imageFile = formData.get('image');

    console.log("Form submitted, checking image file..."); // Debug log

    // Check if an image file is selected
    if (!imageFile) {
        alert("Please select an image file to upload.");
        console.error("No image file selected."); // Error log
        return;
    }

    // Create a FileReader to read the image file
    const reader = new FileReader();
    reader.onload = function(e) {
        // Store the image data in local storage
        const uploadedImage = e.target.result;
        console.log("Image read successfully."); // Debug log
        saveImage(uploadedImage);
    };

    // Check if the FileReader can read the file
    try {
        reader.readAsDataURL(imageFile);
        console.log("Reading the image file..."); // Debug log
    } catch (error) {
        console.error("Error reading image file:", error); // Error log
        alert("Failed to read image file.");
    }
});

function saveImage(image) {
    let images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    images.push(image);
    localStorage.setItem('uploadedImages', JSON.stringify(images));
    console.log("Image saved to local storage."); // Debug log
    alert('Image uploaded successfully!'); // Display success message
}
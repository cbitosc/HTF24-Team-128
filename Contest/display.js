const feed = document.getElementById('feed');
const winningImageDisplay = document.getElementById('winningImage');

loadImages();

function loadImages() {
    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};

    if (images.length === 0) {
        feed.innerHTML = '<p>No images uploaded yet.</p>';
    } else {
        feed.innerHTML = ''; // Clear previous content
        images.forEach((image, index) => {
            displayImage(image, votes[index] || 0, feedbacks[index] || [], ratings[index] || []);
        });
        displayWinningImage();
    }
}

function displayImage(image, voteCount, feedbackList, ratingList) {
    const img = document.createElement('img');
    img.src = image;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.appendChild(img);

    // Voting buttons
    const voteButton = document.createElement('button');
    voteButton.classList.add('vote-button');
    voteButton.textContent = 'Vote';
    voteButton.onclick = () => voteImage(image);

    const removeVoteButton = document.createElement('button');
    removeVoteButton.classList.add('remove-vote-button');
    removeVoteButton.textContent = 'Remove Vote';
    removeVoteButton.onclick = () => removeVoteImage(image);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-image-button');
    deleteButton.textContent = 'Delete Image';
    deleteButton.onclick = () => deleteImage(image);

    const voteCountDisplay = document.createElement('div');
    voteCountDisplay.classList.add('vote-count');
    voteCountDisplay.textContent = `Votes: ${voteCount}`;

    // Feedback input
    const feedbackInput = document.createElement('input');
    feedbackInput.placeholder = 'Add your feedback';
    feedbackInput.classList.add('feedback-input');

    const feedbackButton = document.createElement('button');
    feedbackButton.textContent = 'Submit Feedback';
    feedbackButton.onclick = () => addFeedback(image, feedbackInput.value);

    // Feedback display
    const feedbackDisplay = document.createElement('div');
    feedbackDisplay.classList.add('feedback-list');
    feedbackDisplay.innerHTML = feedbackList.map(fb => `<p>${fb}</p>`).join('');

    // Rating input
    const ratingInput = document.createElement('input');
    ratingInput.type = 'number';
    ratingInput.min = 1;
    ratingInput.max = 5;
    ratingInput.placeholder = 'Rate (1-5)';

    const ratingButton = document.createElement('button');
    ratingButton.textContent = 'Submit Rating';
    ratingButton.onclick = () => addRating(image, ratingInput.value);

    const ratingDisplay = document.createElement('div');
    ratingDisplay.classList.add('rating');
    const averageRating = calculateAverageRating(ratingList);
    ratingDisplay.textContent = `Average Rating: ${averageRating.toFixed(2)}`;

    // Append buttons and displays to the image container
    imageContainer.appendChild(voteButton);
    imageContainer.appendChild(removeVoteButton);
    imageContainer.appendChild(deleteButton);
    imageContainer.appendChild(voteCountDisplay);
    imageContainer.appendChild(feedbackInput);
    imageContainer.appendChild(feedbackButton);
    imageContainer.appendChild(feedbackDisplay);
    imageContainer.appendChild(ratingInput);
    imageContainer.appendChild(ratingButton);
    imageContainer.appendChild(ratingDisplay);

    feed.appendChild(imageContainer);
}

function voteImage(image) {
    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const index = images.indexOf(image);

    if (index > -1) {
        votes[index] = (votes[index] || 0) + 1;
        localStorage.setItem('votes', JSON.stringify(votes));

        const voteCountDisplay = feed.children[index].querySelector('.vote-count');
        voteCountDisplay.textContent = `Votes: ${votes[index]}`;
        displayWinningImage();
    }
}

function removeVoteImage(image) {
    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const index = images.indexOf(image);

    if (index > -1) {
        votes[index] = Math.max((votes[index] || 0) - 1, 0);
        localStorage.setItem('votes', JSON.stringify(votes));

        const voteCountDisplay = feed.children[index].querySelector('.vote-count');
        voteCountDisplay.textContent = `Votes: ${votes[index]}`;
        displayWinningImage();
    }
}

function deleteImage(image) {
    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};

    const index = images.indexOf(image);

    if (index > -1) {
        images.splice(index, 1); // Remove image from array
        delete votes[index]; // Remove votes for this image
        delete feedbacks[index]; // Remove feedback for this image
        delete ratings[index]; // Remove ratings for this image

        // Rebuild the votes, feedbacks, and ratings objects
        const newVotes = {};
        const newFeedbacks = {};
        const newRatings = {};
        images.forEach((img, i) => {
            newVotes[i] = votes[i] || 0;
            newFeedbacks[i] = feedbacks[i] || [];
            newRatings[i] = ratings[i] || [];
        });

        localStorage.setItem('uploadedImages', JSON.stringify(images));
        localStorage.setItem('votes', JSON.stringify(newVotes));
        localStorage.setItem('feedbacks', JSON.stringify(newFeedbacks));
        localStorage.setItem('ratings', JSON.stringify(newRatings));

        loadImages(); // Reload images to reflect changes
    }
}

function addFeedback(image, feedback) {
    if (!feedback.trim()) return; // Ignore empty feedback

    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || {};
    const index = images.indexOf(image);

    if (index > -1) {
        feedbacks[index] = feedbacks[index] || [];
        feedbacks[index].push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

        const feedbackDisplay = feed.children[index].querySelector('.feedback-list');
        feedbackDisplay.innerHTML += `<p>${feedback}</p>`;

        // Generate and display suggestions based on new feedback
        const suggestionDisplay = feed.children[index].querySelector('.suggestion');
        const suggestions = generateSuggestions(feedbacks[index]);
        suggestionDisplay.innerHTML = suggestions.map(s => `<p>${s}</p>`).join('');
    }
}

function addRating(image, rating) {
    const images = JSON.parse(localStorage.getItem('uploadedImages')) || [];
    const ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    const index = images.indexOf(image);

    if (index > -1) {
        ratings[index] = ratings[index] || [];
        ratings[index].push(parseInt(rating, 10));
        localStorage.setItem('ratings', JSON.stringify(ratings));

        const ratingDisplay = feed.children[index].querySelector('.rating');
        const averageRating = calculateAverageRating(ratings[index]);
        ratingDisplay.textContent = `Average Rating: ${averageRating.toFixed(2)}`;
    }
}

function calculateAverageRating(ratingList) {
    if (ratingList.length === 0) return 0;
    const total = ratingList.reduce((acc, val) => acc + val, 0);
    return total / ratingList.length;
}

function generateSuggestions(feedbackList) {
    // Basic suggestion generation logic
    const suggestions = [];
    if (feedbackList.length > 0) {
        suggestions.push('Thank you for your feedback!');
        suggestions.push('We will consider your suggestions for future updates.');
    }
    return suggestions;
}

function displayWinningImage() {
    const votes = JSON.parse(localStorage.getItem('votes')) || {};
    const winningIndex = Object.keys(votes).reduce((a, b) => votes[a] > votes[b] ? a : b, 0);
    const winningImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];

    winningImageDisplay.innerHTML = ''; // Clear previous content
    if (winningImages[winningIndex]) {
        winningImageDisplay.innerHTML = `<h2>Winning Image:</h2><img src="${winningImages[winningIndex]}" alt="Winning Image" />`;
    }
}

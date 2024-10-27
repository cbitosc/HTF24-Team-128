// routes/outfitRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Outfit = require('../models/Outfit');
const User = require('../models/User');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST endpoint to upload outfit
router.post('/api/outfits', upload.single('image'), async (req, res) => {
  const { caption, userId } = req.body;
  const outfitImage = req.file ? req.file.path : null;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const newOutfit = new Outfit({ caption, image: outfitImage, user: userId });
    const savedOutfit = await newOutfit.save();
    res.status(201).json(savedOutfit);
  } catch (error) {
    console.error('Error saving outfit:', error);
    res.status(500).json({ message: 'Error saving outfit', error: error.message });
  }
});

// GET /api/outfits - Fetch all outfits
router.get('/', async (req, res) => {
  try {
    const outfits = await Outfit.find().populate('user', 'name'); // Populate user name
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching outfits', error });
  }
});

// POST /api/outfits/:id/like - Like/Unlike an outfit
router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  const outfitId = req.params.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const outfit = await Outfit.findById(outfitId);

    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }

    // Toggle like/unlike
    if (outfit.likes.includes(userId)) {
      outfit.likes = outfit.likes.filter(id => id.toString() !== userId);
    } else {
      outfit.likes.push(userId);
    }

    await outfit.save();
    return res.json(outfit); // Send the updated outfit back
  } catch (error) {
    return res.status(500).json({ message: 'Error liking outfit', error });
  }
});

// GET /api/outfits/saved/:userId - Fetch saved outfits for a user
router.get('/saved/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const savedOutfits = await Outfit.find({ likes: userId }); // Fetch outfits liked by the user
    res.json(savedOutfits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved outfits', error });
  }
});

module.exports = router;

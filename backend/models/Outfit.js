// outfit.js (your outfit model)
const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  caption: { type: String, required: true },
  likes: { type: [String], default: [] }, // Ensure likes is an array of user IDs
});

const Outfit = mongoose.model('Outfit', outfitSchema);
module.exports = Outfit;

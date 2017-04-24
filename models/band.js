const mongoose = require('mongoose');
const Comment  = require('../models/comment');

const bandSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true },
  image: { type: String, trim: true, required: true },
  members: { type: String, trim: true, required: true },
  genre: { type: String, trim: true, required: true },
  website: { type: String, trim: true, required: true },
  comments: [Comment.schema]
});

module.exports = mongoose.model('Band', bandSchema);

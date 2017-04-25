const mongoose = require('mongoose');
const Comment  = require('../models/comment');

const bandSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true, unique: true },
  image: { type: String, trim: true },
  members: { type: String, trim: true },
  genre: { type: String, trim: true },
  website: { type: String, trim: true },
  comments: [Comment.schema]
});

module.exports = mongoose.model('Band', bandSchema);

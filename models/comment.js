const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  body: { type: String, trim: true, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);

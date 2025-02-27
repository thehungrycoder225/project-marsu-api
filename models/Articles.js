const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: { ref: 'users', type: mongoose.Schema.Types.ObjectId },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  college: {
    ref: 'colleges',
    type: mongoose.Schema.Types.ObjectId,
  },
});
module.exports = mongoose.model('Article', articleSchema);

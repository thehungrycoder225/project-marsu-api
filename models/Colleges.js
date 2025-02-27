const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: { type: String },
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'programs' }],
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'faculties' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

CollegeSchema.pre('save', function (next) {
  this.slug = this.name.toLowerCase().split(' ').join('-');
  next();
});

// if college already exists
CollegeSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    next(new Error('College already exists'));
  } else {
    next(error);
  }
});
module.exports = mongoose.model('College', CollegeSchema);

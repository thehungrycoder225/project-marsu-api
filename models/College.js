const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  about: {
    history: String,
    mission: String,
    vision: String,
  },
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  faculty: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }],
  contact: String,
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

const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  curriculum: [
    {
      yearLevel: { type: Number, required: true },
      courseCode: { type: String, required: true },
      semester: { type: String, required: true },
      units: { type: Number, required: true },
      prerequisite: { type: String },
    },
  ],
});

module.exports = mongoose.model('Course', CourseSchema);

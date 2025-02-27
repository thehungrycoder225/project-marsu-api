const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
});

FacultySchema.pre('save', async function (next) {
  const faculty = this;
  const College = require('./Colleges');
  const college = await College.findById(faculty.college);
  if (!college) {
    throw new Error('College not found');
  }

  next();
});

module.exports = mongoose.model('Faculty', FacultySchema);

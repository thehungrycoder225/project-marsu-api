const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colleges',
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

module.exports = mongoose.model('Program', ProgramSchema);

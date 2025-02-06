const mongoose = require('mongoose');

const ResearchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
});

module.exports = mongoose.model('Research', ResearchSchema);

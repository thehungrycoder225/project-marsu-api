const mongoose = require('mongoose');
const Colleges = require('./Colleges');
const Users = require('../models/Users');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'colleges' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = mongoose.model('Article', articleSchema);

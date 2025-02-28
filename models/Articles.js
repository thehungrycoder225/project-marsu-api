const mongoose = require('mongoose');
const Colleges = require('./Colleges');
const Users = require('./Users');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'colleges',
  },
});

// Update the `updatedAt` field before saving
articleSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

articleSchema.post('save', async function (doc, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const [college, user] = await Promise.all([
      Colleges.findById(doc.college).session(session),
      Users.findById(doc.author).session(session),
    ]);

    if (college && !college.articles.includes(doc._id)) {
      college.articles.push(doc._id);
      await college.save({ session });
    }

    if (user && !user.posts.includes(doc._id)) {
      user.posts.push(doc._id);
      await user.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
    next();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

// Update the `updatedAt` field before updating
articleSchema.pre('findOneAndUpdate', function (next) {
  this._update.updatedAt = Date.now();
  next();
});

// Update the `updatedAt` field before updating
articleSchema.pre('updateOne', function (next) {
  this._update.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Article', articleSchema);

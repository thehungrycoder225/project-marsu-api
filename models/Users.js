const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Colleges = require('./Colleges');
const Articles = require('./Articles');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  college: {
    ref: 'colleges',
    type: mongoose.Schema.Types.ObjectId,
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'guest'],
    default: 'user',
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }],
});

// Encrypt password using bcrypt before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Add user to college's users list after saving
userSchema.post('save', async function (doc, next) {
  try {
    const college = await Colleges.findById(doc.college);
    if (college && !college.users.includes(doc._id)) {
      college.users.push(doc._id);
      await college.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Remove user from college's users list and delete user posts before removing the user
userSchema.pre('remove', async function (next) {
  try {
    const college = await Colleges.findById(this.college);
    if (college) {
      college.users = college.users.filter(
        (userId) => userId.toString() !== this._id.toString()
      );
      await college.save();
    }
    await Articles.deleteMany({ author: this._id });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Users', userSchema);

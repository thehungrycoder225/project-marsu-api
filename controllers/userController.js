const Users = require('../models/Users');
const Colleges = require('../models/Colleges');
const Articles = require('../models/Articles');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json({
      message: `Total users: ${users.length}`,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: false,
        error: 'User not found',
      });
    }
    res.status(200).json({
      message: `User found`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal server error`,
      error: error.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const college = await Colleges.findById(req.body.college);
    if (!college) {
      return res.status(404).json({
        message: false,
        error: 'College not found',
      });
    }
    const user = new Users(req.body);
    await user.save();
    res.status(201).json({
      message: `Account created successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: false,
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await Users.findById(req.params.id).session(session);
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const college = await Colleges.findById(user.college).session(session);
    if (college) {
      college.users = college.users.filter(
        (userId) => userId.toString() !== user._id.toString()
      );
      await college.save({ session });
    }

    await Articles.deleteMany({ user: user._id }).session(session);

    await user.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
      data: user,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const college = await Colleges.findById(req.body.college);
    if (!college) {
      return res.status(404).json({
        success: false,
        error: 'College not found',
      });
    }
    let user;
    user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    user = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: `Account updated successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const Faculty = require('../models/Faculty');
const College = require('../models/College');

// Get all faculties using college slug
exports.getAllFacultiesByCollegeSlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const college = await College.findOne({ slug });
    if (!college) {
      return res.status(404).json({
        code: 404,
        message: 'College not found',
      });
    }
    const faculties = await Faculty.find({ college: college._id });
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal server error occurred',
    });
  }
};

// Get All Faculties
exports.getAllFaculties = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal server error occurred',
    });
  }
};

// Get Faculty by ID

exports.getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({
        code: 404,
        message: 'Faculty not found',
      });
    }
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal server error occurred',
    });
  }
};

// Create Faculty for a College

exports.createFaculty = async (req, res) => {
  const { name, position, email, college } = req.body;
  try {
    const faculty = new Faculty({
      name,
      position,
      email,
      college,
    });
    // Check if college exists
    const collegeExists = await College.findById(college);
    if (!collegeExists) {
      return res.status(404).json({
        code: 404,
        message: 'College not found',
      });
    } else {
      await faculty.save();
      collegeExists.faculty.push(faculty);
      await collegeExists.save();
      res.status(201).json(faculty);
    }
    // Save faculty to database and add faculty to college
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: err.message,
    });
  }
};

// Delete Faculty by ID and remove from College
exports.deleteFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await Faculty.findById(id);
    if (!faculty) {
      return res.status(404).json({
        code: 404,
        message: 'Faculty not found',
      });
    }
    const college = await College.findById(faculty.college);
    college.faculty = college.faculty.filter(
      (facultyId) => facultyId.toString() !== id
    );
    await college.save();
    await faculty.deleteOne();
    res.status(200).json({
      code: 200,
      message: 'Faculty deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal server error occurred',
    });
  }
};

// remove faculty id from college
// delete faculty
// return success message

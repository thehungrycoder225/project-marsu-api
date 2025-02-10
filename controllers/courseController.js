const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const course = await Course.find().populate('college');
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single course by slug
exports.getCourseById = async (req, res) => {
  const { slug } = req.params;
  try {
    const course = await Course.findOne({ slug }).populate('college');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    };
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a course by slug
exports.updateCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const updatedCourse = await Course.findByIdAndUpdate({ slug }, req.body, { new: true, runValidators: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' })
    };
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a course by slug
exports.deleteCourse = async (req, res) => {
  const { slug } = req.params;
  try {
    const deletedCourse = await Course.findOne({ slug });
    if (!deletedCourse) {
        return res.status(404).json({ message: 'Course not found' })
    };
    await Course.deleteOne({ slug })
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

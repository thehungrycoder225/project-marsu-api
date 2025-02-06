const College = require('../models/College');

// Get all colleges
exports.getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: 'Internal server error occurred',
    });
  }
};

// Get a college by slug
exports.getCollegesBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const college = await College.findOne({ slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a college by slug and display faculty with details
exports.getCollegeFaculty = async (req, res) => {
  const { slug } = req.params;
  try {
    const college = await College.findOne({ slug }).populate('faculty');
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(college);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new college
exports.createCollege = async (req, res) => {
  const { name, slug, about } = req.body;
  try {
    const college = await College.create({ name, slug, about });
    //  if college already exists

    if (!college) {
      return res.status(400).json({ message: 'College already exists' });
    } else {
      return res.status(201).json({
        message: 'College created successfully',
        college,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a college by slug
exports.deleteCollege = async (req, res) => {
  const { slug } = req.params;
  try {
    const college = await College.findOne({ slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    await College.deleteOne({ slug });
    res.status(200).json({ message: 'College deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update a college by slug
exports.updateCollege = async (req, res) => {
  const { slug } = req.params;
  const { name, about } = req.body;
  try {
    const college = await College.findOne({ slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    college.name = name;
    college.about = about;
    await college.save();
    res.status(200).json({ message: 'College updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// clear faculty from college
exports.clearFaculty = async (req, res) => {
  const { slug } = req.params;
  try {
    const college = await College.findOne({ slug });
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    college.faculty = [];
    await college.save();
    res.status(200).json({ message: 'Faculty cleared successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

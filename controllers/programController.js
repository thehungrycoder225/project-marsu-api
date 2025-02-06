const Program = require('../models/Programs');

// Get all programs
exports.getAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find().populate('college');
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single program by slug
exports.getProgramById = async (req, res) => {
  const { slug } = req.params;
  try {
    const program = await Program.findOne({ slug }).populate('college');
    if (!program) {
      return res.status(404).json({ message: 'Program not found' })
    };
    res.status(200).json(program);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new program
exports.createProgram = async (req, res) => {
  try {
    const program = new Program(req.body);
    const savedProgram = await program.save();
    res.status(201).json(savedProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a program by slug
exports.updateProgram = async (req, res) => {
  const { slug } = req.params;
  try {
    const updatedProgram = await Program.findByIdAndUpdate({ slug }, req.body, { new: true, runValidators: true });
    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found' })
    };
    res.status(200).json(updatedProgram);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a program by slug
exports.deleteProgram = async (req, res) => {
  const { slug } = req.params;
  try {
    const deletedProgram = await Program.findOne({ slug });
    if (!deletedProgram) {
        return res.status(404).json({ message: 'Program not found' })
    };
    await Program.deleteOne({ slug })
    res.status(200).json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

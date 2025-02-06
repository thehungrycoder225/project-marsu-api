const facultyController = require('../controllers/facultyController');
const express = require('express');
const router = express.Router();

router.get('/', facultyController.getAllFaculties);
router.get('/:id', facultyController.getFacultyById);
router.get('/:slug', facultyController.getAllFacultiesByCollegeSlug);
router.post('/', facultyController.createFaculty);
router.delete('/:id', facultyController.deleteFacultyById);

module.exports = router;

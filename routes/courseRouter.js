const courseController = require('../controllers/courseController');

const express = require('express');
const router = express.Router();


router.get('/', courseController.getAllCourses);
router.get('/:slug', courseController.getCourseById);
router.post('/', courseController.createCourse);
router.put('/:slug', courseController.updateCourse);
router.delete('/:slug', courseController.deleteCourse);

module.exports = router;
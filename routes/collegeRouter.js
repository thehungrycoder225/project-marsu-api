const collegeController = require('../controllers/collegeController');

const express = require('express');
const router = express.Router();

router.get('/', collegeController.getAllColleges);
router.get('/:slug', collegeController.getCollegesBySlug);
router.delete('/:slug', collegeController.deleteCollege);
router.get('/:slug/faculties', collegeController.getCollegeFaculty);
// router.delete('/:slug/clear', collegeController.clearFaculty);
router.put('/:slug', collegeController.updateCollege);
router.post('/', collegeController.createCollege);

module.exports = router;

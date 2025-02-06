const programController = require('../controllers/programController');

const express = require('express');
const router = express.Router();


router.get('/', programController.getAllPrograms);
router.get('/:slug', programController.getProgramById);
router.post('/', programController.createProgram);
router.put('/:slug', programController.updateProgram);
router.delete('/:slug', programController.deleteProgram);

module.exports = router;
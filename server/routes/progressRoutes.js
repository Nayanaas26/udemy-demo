const express = require('express');
const router = express.Router();
const { updateProgress, getProgressByUser, getCourseProgress } = require('../controllers/progressController');
const { protect } = require('../middleware/authMiddleware');

router.route('/update').post(protect, updateProgress);
router.route('/:userId').get(protect, getProgressByUser);
router.route('/course/:courseId').get(protect, getCourseProgress);

module.exports = router;

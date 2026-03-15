const express = require('express');
const router = express.Router();
const { getLessonsByCourse, createLesson } = require('../controllers/lessonController');
const { protect, instructor } = require('../middleware/authMiddleware');

router.route('/:courseId')
    .get(getLessonsByCourse)
    .post(protect, instructor, createLesson);

module.exports = router;

const Progress = require('../models/Progress');
const Lesson = require('../models/Lesson');

const updateProgress = async (req, res) => {
    try {
        const { courseId, lessonId } = req.body;
        const userId = req.user._id;

        const progress = await Progress.findOneAndUpdate(
            { userId, lessonId },
            { courseId, status: 'completed' },
            { upsert: true, new: true }
        );

        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProgressByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const progressList = await Progress.find({ userId });
        res.json(progressList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        let totalLessons = 1;

        if (courseId.length !== 11) {
            totalLessons = await Lesson.countDocuments({ courseId });
        }
        
        const completedLessons = await Progress.countDocuments({ userId, courseId, status: 'completed' });

        const percentage = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

        res.json({ totalLessons, completedLessons, percentage });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { updateProgress, getProgressByUser, getCourseProgress };

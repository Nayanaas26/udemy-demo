const Lesson = require('../models/Lesson');
const axios = require('axios');

const getLessonsByCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        if (courseId.length === 11) {
            return res.json([
                {
                    _id: courseId + "_lesson",
                    courseId: courseId,
                    title: "Full Course Video",
                    order: 1,
                    youtubeId: courseId
                }
            ]);
        }

        const lessons = await Lesson.find({ courseId }).sort({ order: 1 });
        res.json(lessons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createLesson = async (req, res) => {
    try {
        const { courseId, title, order, youtubeId } = req.body;
        let finalTitle = title;
        let description = '';
        
        // Use YouTube Data API v3 to fetch details if API key is provided
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (apiKey && youtubeId && !title) {
            try {
                const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${apiKey}`);
                if (ytRes.data.items.length > 0) {
                    finalTitle = ytRes.data.items[0].snippet.title;
                    description = ytRes.data.items[0].snippet.description;
                }
            } catch (ytError) {
                console.error("YouTube API fetch failed:", ytError.message);
            }
        }

        const lesson = new Lesson({
            courseId,
            title: finalTitle || 'Untitled Lesson',
            order,
            youtubeId
        });
        const createdLesson = await lesson.save();
        res.status(201).json(createdLesson);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getLessonsByCourse, createLesson };

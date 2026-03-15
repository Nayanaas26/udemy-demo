const Course = require('../models/Course');
const axios = require('axios');

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('instructor', 'name');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCourseById = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Handle YouTube videos dynamically without breaking MongoDB queries
        if (id.length === 11) {
            const API_KEY = process.env.YOUTUBE_API_KEY || "YOUR_API_KEY";
            if (API_KEY !== "YOUR_API_KEY") {
                const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${API_KEY}`);
                if (ytRes.data.items.length > 0) {
                    const item = ytRes.data.items[0];
                    return res.json({
                        _id: item.id,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
                        instructor: { name: item.snippet.channelTitle },
                        isYouTube: true
                    });
                }
            } else {
                // Mock return for the default key
                return res.json({
                    _id: id,
                    title: "YouTube Programming Course",
                    description: "This is a fetched YouTube course dynamically loaded.",
                    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
                    instructor: { name: "YouTube Creator" },
                    isYouTube: true
                });
            }
        }

        const course = await Course.findById(id).populate('instructor', 'name');
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, description, thumbnail } = req.body;
        const course = new Course({
            title,
            description,
            thumbnail,
            instructor: req.user._id // Requires auth middleware
        });
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCourses, getCourseById, createCourse };

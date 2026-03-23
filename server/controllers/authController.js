const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
};

const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ name, email, password, role });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error("Signup error:", error.stack);
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const seed = async (req, res) => {
    try {
        const Course = require('../models/Course');
        const Lesson = require('../models/Lesson');
        const Progress = require('../models/Progress');
        
        // Don't delete users to avoid locking out existing ones, but we need an instructor
        let instructor = await User.findOne({ role: 'instructor' });
        if (!instructor) {
            instructor = await User.create({
                name: 'Instructor John',
                email: 'instructor@example.com',
                password: 'password123',
                role: 'instructor'
            });
        }

        await Course.deleteMany();
        await Lesson.deleteMany();
        await Progress.deleteMany();

        const courses = [
            {
                title: 'MERN Stack Front To Back',
                description: 'Build and deploy a social network with Node.js, Express, React, Redux & MongoDB.',
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
                instructor: instructor._id
            },
            {
                title: 'React - The Complete Guide',
                description: 'Dive in and learn React.js from scratch! Hooks, Redux, Routing, and more!',
                thumbnail: 'https://images.unsplash.com/photo-1627398246454-e873918408f9?w=800&q=80',
                instructor: instructor._id
            },
            {
                title: 'Advanced CSS and Sass',
                description: 'Master flexbox, CSS Grid, responsive design, and modern CSS animations.',
                thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
                instructor: instructor._id
            }
        ];

        const createdCourses = await Course.create(courses);

        const lessons = [
            { courseId: createdCourses[0]._id, title: 'Introduction', order: 1, youtubeId: 'K5KVEU3aaeQ' },
            { courseId: createdCourses[0]._id, title: 'Setup', order: 2, youtubeId: 'hlGoQC332VM' },
            { courseId: createdCourses[1]._id, title: 'React Basics', order: 1, youtubeId: 'SyVMma1IkXM' }
        ];

        await Lesson.create(lessons);

        res.json({ message: 'Database seeded successfully with free courses!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login, seed };


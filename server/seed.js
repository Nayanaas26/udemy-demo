const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const Lesson = require('./models/Lesson');
const Progress = require('./models/Progress');

dotenv.config();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Instructor John',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor'
    },
    {
        name: 'Student Jane',
        email: 'student@example.com',
        password: 'password123',
        role: 'student'
    }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms-project');
        console.log('Connected to DB');

        await User.deleteMany();
        await Course.deleteMany();
        await Lesson.deleteMany();
        await Progress.deleteMany();

        const createdUsers = await User.create(users);
        const instructorId = createdUsers[1]._id;

        const courses = [
            {
                title: 'MERN Stack Front To Back: Full Stack React, Redux & Node.js',
                description: 'Build and deploy a social network with Node.js, Express, React, Redux & MongoDB. Learn how to put it all together.',
                thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
                instructor: instructorId
            },
            {
                title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
                description: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
                thumbnail: 'https://images.unsplash.com/photo-1627398246454-e873918408f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
                instructor: instructorId
            },
            {
                title: 'Advanced CSS and Sass: Flexbox, Grid, Animations and More!',
                description: 'The most advanced and modern CSS course on the internet: master flexbox, CSS Grid, responsive design, and so much more.',
                thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
                instructor: instructorId
            }
        ];

        const createdCourses = await Course.create(courses);

        const lessons = [
            {
                courseId: createdCourses[0]._id,
                title: 'Introduction and setup',
                order: 1,
                youtubeId: 'K5KVEU3aaeQ'
            },
            {
                courseId: createdCourses[0]._id,
                title: 'Express and MongoDB setup',
                order: 2,
                youtubeId: 'hlGoQC332VM'
            },
            {
                courseId: createdCourses[0]._id,
                title: 'React UI start',
                order: 3,
                youtubeId: 'D1eL1EnxXXQ'
            },
             {
                courseId: createdCourses[1]._id,
                title: 'React Fundamentals',
                order: 1,
                youtubeId: 'SyVMma1IkXM'
            }
        ];

        await Lesson.create(lessons);

        console.log('Seed data imported successfully!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();

const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');

const seedData = async () => {
    try {
        const userCount = await User.countDocuments();
        if (userCount > 0) return; // already seeded

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

        console.log('Seeding initial data into in-memory DB...');
        await User.deleteMany({});
        await Course.deleteMany({});
        await Lesson.deleteMany({});
        await Progress.deleteMany({});

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
            },
            {
                title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
                description: 'Master Node by building a real-world RESTful API and web app. Includes REST, CRUD, MongoDB, Authentication, and more!',
                thumbnail: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
                instructor: instructorId
            },
            {
                title: 'Master Machine Learning with Python',
                description: 'A comprehensive guide to implementing Machine Learning models with Scikit-Learn, TensorFlow, and Pandas.',
                thumbnail: 'https://images.unsplash.com/photo-1485796826113-174aa68fd81b?w=800&q=80',
                instructor: instructorId
            },
            {
                title: 'Java Programming Masterclass updated to Java 17',
                description: 'Learn Java In This Course And Become a Computer Programmer. Obtain valuable Core Java Skills And Java Certification',
                thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
                instructor: instructorId
            },
            {
                title: 'Beginning C++ Programming - From Beginner to Beyond',
                description: 'Obtain Modern C++ Object-Oriented Programming (OOP) and STL skills. C++14 and C++17 covered. C++20 info see below.',
                thumbnail: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c8f1?w=800&q=80',
                instructor: instructorId
            },
            {
                title: 'PHP for Beginners - Become a PHP Master - CMS Project',
                description: 'PHP for Beginners: learn everything you need to become a professional PHP developer with practical exercises & projects.',
                thumbnail: 'https://images.unsplash.com/photo-1599507593499-a3f7d1d08731?w=800&q=80',
                instructor: instructorId
            },
            {
                title: 'The Complete Ruby on Rails Developer Course',
                description: 'Learn to make innovative web apps with Ruby on Rails 4 & 5 and engage your students.',
                thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80',
                instructor: instructorId
            }
        ];

        const createdCourses = await Course.create(courses);

        const lessons = [
            // Course 0: MERN Stack
            { courseId: createdCourses[0]._id, title: 'Introduction & Project Setup', order: 1, youtubeId: '7CqJlxBYj-M' },
            { courseId: createdCourses[0]._id, title: 'Building the Express Backend', order: 2, youtubeId: 'L72fhGm1tfE' },
            { courseId: createdCourses[0]._id, title: 'Connecting to MongoDB', order: 3, youtubeId: '_7UQPve99r4' },
            { courseId: createdCourses[0]._id, title: 'React Frontend Setup', order: 4, youtubeId: 'w7ejDZ8SWv8' },

            // Course 1: React Complete Guide
            { courseId: createdCourses[1]._id, title: 'React Fundamentals - JSX & Components', order: 1, youtubeId: 'SqcY0GlETPk' },
            { courseId: createdCourses[1]._id, title: 'useState & useEffect Hooks', order: 2, youtubeId: 'O6P86uwfdR0' },
            { courseId: createdCourses[1]._id, title: 'React Router - Client Side Navigation', order: 3, youtubeId: 'Ul3y1LXxzdU' },
            { courseId: createdCourses[1]._id, title: 'Redux & State Management', order: 4, youtubeId: 'poQXNp9ItL4' },

            // Course 2: Advanced CSS
            { courseId: createdCourses[2]._id, title: 'CSS Flexbox Complete Guide', order: 1, youtubeId: 'fYq5PXgSsbE' },
            { courseId: createdCourses[2]._id, title: 'CSS Grid Layout', order: 2, youtubeId: '9zBsdzdE4sM' },
            { courseId: createdCourses[2]._id, title: 'CSS Animations & Transitions', order: 3, youtubeId: 'YszOvzPvCOQ' },

            // Course 3: Node.js Bootcamp
            { courseId: createdCourses[3]._id, title: 'Node.js Introduction & Setup', order: 1, youtubeId: 'TlB_eWDSMt4' },
            { courseId: createdCourses[3]._id, title: 'Building REST APIs with Express', order: 2, youtubeId: 'pKd0Rpw7O48' },
            { courseId: createdCourses[3]._id, title: 'MongoDB & Mongoose', order: 3, youtubeId: 'vjf774RKrLc' },
            { courseId: createdCourses[3]._id, title: 'Authentication with JWT', order: 4, youtubeId: '7Q17ubqLfaM' },

            // Course 4: Machine Learning with Python
            { courseId: createdCourses[4]._id, title: 'Python for Machine Learning - Setup', order: 1, youtubeId: 'i_LwzRVP7bg' },
            { courseId: createdCourses[4]._id, title: 'NumPy & Pandas Fundamentals', order: 2, youtubeId: 'vmEHCJofslg' },
            { courseId: createdCourses[4]._id, title: 'Linear Regression from Scratch', order: 3, youtubeId: 'NUXdtN1W1FE' },
            { courseId: createdCourses[4]._id, title: 'Neural Networks with TensorFlow', order: 4, youtubeId: 'tPYj3fFJGjk' },

            // Course 5: Java Programming
            { courseId: createdCourses[5]._id, title: 'Java Introduction & Setup', order: 1, youtubeId: 'eIrMbAQSU34' },
            { courseId: createdCourses[5]._id, title: 'Java OOP - Classes & Objects', order: 2, youtubeId: '6T_HgnjoYwM' },
            { courseId: createdCourses[5]._id, title: 'Java Collections Framework', order: 3, youtubeId: 'GdAon80-0KA' },
            { courseId: createdCourses[5]._id, title: 'Java Data Structures & Algorithms', order: 4, youtubeId: 'NBwnk0NGVgY' },

            // Course 6: C++ Programming
            { courseId: createdCourses[6]._id, title: 'C++ Introduction & Hello World', order: 1, youtubeId: 'vLnPwxZdW4Y' },
            { courseId: createdCourses[6]._id, title: 'C++ Pointers & Memory Management', order: 2, youtubeId: 'zuegQmMdy8M' },
            { courseId: createdCourses[6]._id, title: 'C++ Object Oriented Programming', order: 3, youtubeId: 'wN0x9eZLix4' },

            // Course 7: PHP
            { courseId: createdCourses[7]._id, title: 'PHP Introduction & Setup', order: 1, youtubeId: 'OK_JCtrrv-c' },
            { courseId: createdCourses[7]._id, title: 'PHP Functions & Arrays', order: 2, youtubeId: 'a7_WFUlFS94' },
            { courseId: createdCourses[7]._id, title: 'PHP & MySQL Database', order: 3, youtubeId: 'DOsuFRnciCA' },

            // Course 8: Ruby on Rails
            { courseId: createdCourses[8]._id, title: 'Ruby Programming Basics', order: 1, youtubeId: 't_ispmWxwI8' },
            { courseId: createdCourses[8]._id, title: 'Rails MVC Architecture', order: 2, youtubeId: 'B3Fbujmgo60' },
            { courseId: createdCourses[8]._id, title: 'Rails Active Record & Database', order: 3, youtubeId: 'TPg33EyMkYo' },
        ];

        await Lesson.create(lessons);
        console.log('Seed data imported successfully!');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

module.exports = seedData;

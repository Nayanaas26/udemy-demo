const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI;
        try {
            await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log('MongoDB connected');
        } catch (initialError) {
            console.log('Local MongoDB not running, starting in-memory database...');
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            await mongoose.connect(uri);
            console.log('In-memory MongoDB connected successfully');
            const seedData = require('./seedDb');
            await seedData();
        }
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

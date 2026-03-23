const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    // Check if we are already connected
    if (mongoose.connection.readyState === 1) {
        console.log('Using existing MongoDB connection');
        return mongoose.connection;
    }

    if (!cached.promise) {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
             throw new Error('MONGODB_URI is not defined in environment variables');
        }

        console.log('Attempting new MongoDB connection...');
        
        const opts = {
            serverSelectionTimeoutMS: 5000, // Fail fast if can't connect
            connectTimeoutMS: 10000,
        };

        cached.promise = mongoose.connect(uri, opts).then((mongoose) => {
            console.log('✅ MongoDB Connected Successfully');
            return mongoose;
        }).catch(err => {
            console.error('❌ MongoDB Connection Promise Rejected:', err.message);
            cached.promise = null; // Reset for next attempt
            throw err;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('❌ Database connection error:', e.message);
        throw e;
    }

    return cached.conn;
};

module.exports = connectDB;




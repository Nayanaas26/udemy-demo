const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const seedData = require('./config/seedDb');

async function testSeed() {
    console.log('Starting memory server...');
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log('Connected to DB, running seedDb()...');
    
    try {
        await seedData();
        console.log('Done successfully.');
    } catch (e) {
        console.error('CAUGHT ERROR: ', e);
    }
    process.exit(0);
}

testSeed();

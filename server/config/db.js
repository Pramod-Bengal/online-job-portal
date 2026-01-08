const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/job_portal', {
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('❌ MongoDB Connection Error!');
        console.error(`Reason: ${error.message}`);

        if (error.message.includes('IP address') || error.message.includes('whitelisted')) {
            console.error('👉 ACTION REQUIRED: Your IP address is not whitelisted in MongoDB Atlas.');
            console.error('👉 SOLUTION: Go to MongoDB Atlas > Network Access > Add Current IP Address.');
        }

        // Don't exit in dev mode to allow nodemon to restart on file save
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;

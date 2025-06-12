const mongoose = require('mongoose');

// Load environment variables from .env file
require("dotenv").config();
// MongoDB connection URI
const { MONGO_URL } = process.env || 'mongodb://localhost:27017/BlogApp';

// Function to connect to MongoDB
exports.connectDB = async () => {
    
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log('MongoDB connected successfully');
        }).catch((err) => {
            console.error('MongoDB connection error:', err);
        });
         
}

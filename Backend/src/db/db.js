const mongoose = require('mongoose');

async function connectDB() {
    try {
        // Close any existing connections
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("Disconnected from previous DB connection");
        }
        
        console.log("MongoDB URI:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB!");
        console.log("Database name:", mongoose.connection.db.databaseName);
    } catch (error) {
        console.log("Error connecting to database!", error);
    }
}

module.exports = connectDB; 
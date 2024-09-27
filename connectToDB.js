const mongoose = require('mongoose')

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err);
        throw err; 
    }
};
module.exports = connectToDB

const mongoose = require('mongoose')

const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to database');
    } catch (err) {
        console.error('Failed to connect to database:', err.message);
        process.exit(1);
    }
};

module.exports = startDB
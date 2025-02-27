const mongoose = require('mongoose');
require('dotenv').config();

const { CLOUD_DB, LOCAL_DB } = process.env;

const connectDB = async () => {
  const dbURI = CLOUD_DB || LOCAL_DB;

  if (!dbURI) {
    throw new Error('Please provide a valid MongoDB URI');
  }

  try {
    const conn = await mongoose.connect(dbURI, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

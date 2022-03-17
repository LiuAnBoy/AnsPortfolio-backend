const mongoose = require('mongoose');
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });

const db = process.env.mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

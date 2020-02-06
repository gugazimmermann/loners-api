require('dotenv').config();

const mongoose = require('mongoose');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_DB,
} = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:27017/${MONGO_DB}?authSource=admin`;

const initDb = async () => {
  try {
    console.info('Waiting to connect MongoDB');
    await mongoose.connect(url, options);
    console.info('MongoDB is connected');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = initDb;

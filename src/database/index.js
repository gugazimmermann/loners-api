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
  useFindAndModify: false,
};

const initDb = async (hostname = MONGO_HOSTNAME, db = MONGO_DB) => {
  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${hostname}:27017/${db}`;
  await mongoose.connect(url, options);
};

module.exports = initDb;

const mongoose = require("mongoose");

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB
} = process.env;

const options = {
  useNewUrlParser: true,
  connectTimeoutMS: 10000,
  useUnifiedTopology: true,
  useCreateIndex: true
};

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose
  .connect(url, options)
  .then(function() {
    console.log("MongoDB is connected");
    console.log("Express API server listening at http://0.0.0.0:8080");
  })
  .catch(function(err) {
    console.log(err);
  });

const Event = require('../../database/models/event');

// eslint-disable-next-line no-unused-vars
const getAll = async (request, _h) => {
  console.log('getAll');
  try {
    const test = await Event.find({});
    console.log(test);
    return test;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = {
  getAll,
};

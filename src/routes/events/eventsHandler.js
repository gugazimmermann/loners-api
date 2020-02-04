const Event = require('../../database/models/event');

// eslint-disable-next-line no-unused-vars
const getAll = async (request, _h) => {
  console.log('getAll');
  Event.find({}).then((events) => {
    console.log(events);
    return events;
  });
};

module.exports = {
  getAll,
};

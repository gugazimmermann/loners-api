/* eslint-disable no-unused-vars */
const Event = require('../../database/models/event');

const getAll = async (req, _h) => {
  try {
    return await Event.find({});
  } catch (err) {
    return err;
  }
};

const getOne = async (req, _h) => {
  try {
    return await Event.findById(req.params.eventId);
  } catch (err) {
    return err;
  }
};

const post = async (req, _h) => {
  try {
    return await Event.create(req.payload);
  } catch (err) {
    return err;
  }
};

const remove = async (req, _h) => {
  try {
    return await Event.findByIdAndDelete(req.params.eventId);
  } catch (err) {
    return err;
  }
};

const update = async (req, _h) => {
  try {
    const test = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $set: req.payload },
      { new: true },
    );
    return test;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getAll,
  getOne,
  post,
  remove,
  update,
};

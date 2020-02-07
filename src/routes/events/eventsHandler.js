const Boom = require('boom');
const Event = require('../../database/models/event');

const getAll = async () => {
  const events = await Event.find({});
  const eventsArray = [];
  events.forEach((event) => {
    const eventObj = {
      id: event.id,
      name: event.name,
      image: event.image,
      label: event.label,
      date: event.date,
      duration: event.duration,
      price: event.price,
      description: event.description,
      featured: event.featured,
    };
    eventsArray.push(eventObj);
  });
  return {
    data: eventsArray,
  };
};

const getOne = async (req) => {
  try {
    const event = await Event.findById(req.params.id);
    const eventObj = {
      id: event.id,
      name: event.name,
      image: event.image,
      label: event.label,
      date: event.date,
      duration: event.duration,
      price: event.price,
      description: event.description,
      featured: event.featured,
    };
    return {
      data: eventObj,
    };
  } catch (err) {
    return Boom.notFound(`Event with ID: ${req.params.id} not found`);
  }
};

const post = async (req) => {
  try {
    const event = await Event.create(req.payload);
    const eventObj = {
      id: event.id,
      name: event.name,
      image: event.image,
      label: event.label,
      date: event.date,
      duration: event.duration,
      price: event.price,
      description: event.description,
      featured: event.featured,
    };
    return {
      data: eventObj,
    };
  } catch (err) {
    return Boom.badRequest('Event cannot be created');
  }
};

const remove = async (req) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    const eventObj = {
      id: event.id,
      name: event.name,
      image: event.image,
      label: event.label,
      date: event.date,
      duration: event.duration,
      price: event.price,
      description: event.description,
      featured: event.featured,
    };
    return {
      data: eventObj,
    };
  } catch (err) {
    return Boom.notFound(`Event with ID: ${req.params.id} not found`);
  }
};

const update = async (req) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.payload },
      { upsert: true },
    );
    const eventObj = {
      id: event.id,
      name: event.name,
      image: event.image,
      label: event.label,
      date: event.date,
      duration: event.duration,
      price: event.price,
      description: event.description,
      featured: event.featured,
    };
    return {
      data: {
        ...eventObj,
        ...req.payload,
      },
    };
  } catch (err) {
    return Boom.notFound(`Event with ID: ${req.params.id} not found`);
  }
};

module.exports = {
  getAll,
  getOne,
  post,
  remove,
  update,
};

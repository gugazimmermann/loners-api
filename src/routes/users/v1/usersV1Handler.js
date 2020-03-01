const Boom = require('boom');
const User = require('../../../database/models/users');

const userObj = (user) => ({
  id: user.id,
  name: user.name,
  user: user.image,
  password: user.label,
  role: user.date,
  active: user.duration,
});

const getAll = async () => {
  const users = await User.find({});
  const usersArray = [];
  users.forEach((user) => {
    usersArray.push(userObj(user));
  });
  return {
    data: usersArray,
  };
};

const getOne = async (req) => {
  try {
    const user = await User.findById(req.params.id);
    return {
      data: userObj(user),
    };
  } catch (err) {
    return Boom.notFound(`User with ID: ${req.params.id} not found`);
  }
};

const post = async (req) => {
  try {
    const user = await User.create(req.payload);
    return {
      data:  userObj(user),
    };
  } catch (err) {
    return Boom.badRequest('User cannot be created');
  }
};

const remove = async (req) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return {
      data:  userObj(user),,
    };
  } catch (err) {
    return Boom.notFound(`User with ID: ${req.params.id} not found`);
  }
};

const update = async (req) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.payload },
      { upsert: true },
    );
    return {
      data: {
        ... userObj(user),
        ...req.payload,
      },
    };
  } catch (err) {
    return Boom.notFound(`User with ID: ${req.params.id} not found`);
  }
};

module.exports = {
  getAll,
  getOne,
  post,
  remove,
  update,
};

const Boom = require('boom');
const User = require('../../../database/models/users');

const userObj = (user) => ({
  id: user.id,
  name: user.name,
  user: user.user,
  role: user.role,
  active: user.active,
});

const post = async (req) => {
  try {
    const { user, password } = req.payload;
    const findUser = await User.findOne({ user, password });
    return {
      data: userObj(findUser),
    };
  } catch (err) {
    return Boom.badRequest('User not Found');
  }
};

module.exports = {
  post,
};

const Bcrypt = require('bcrypt');
require('dotenv').config();

const validate = async (request, username, password) => {
  const myPlaintextPassword = process.env.MONGO_PASSWORD;
  const pass = await Bcrypt.hash(myPlaintextPassword, 10);

  const users = [
    {
      id: 'testUser',
      username: 'testUser',
      password: '$2b$10$5oweGcVHgR2W7Huzu5.4l.p/IGUiXla.CLLXF7OctpuGCe4Va5TBm', // testpwd01237851~%
    },
    {
      id: '1',
      username: process.env.MONGO_USERNAME,
      password: pass,
    },
  ];
  const user = users.filter((u) => u.username === username);
  if (!user[0]) {
    return { credentials: null, isValid: false };
  }
  const isValid = await Bcrypt.compare(password, user[0].password);
  const credentials = { id: user[0].id, name: user[0].name };

  return { isValid, credentials };
};

module.exports = validate;

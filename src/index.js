const authBasic = require('hapi-auth-basic');
const Bcrypt = require('bcrypt');
const initDb = require('./database');
const { createServer, startServer } = require('./server');
require('dotenv').config();

(async () => {
  const myPlaintextPassword = process.env.MONGO_PASSWORD;
  const pass = await Bcrypt.hash(myPlaintextPassword, 1);
  const users = [
    {
      id: '1',
      username: process.env.MONGO_USERNAME,
      password: pass,
    },
  ];

  const validate = async (request, username, password) => {
    const user = users.filter((u) => u.username === process.env.MONGO_USERNAME);
    if (!user[0]) {
      return { credentials: null, isValid: false };
    }
    const isValid = await Bcrypt.compare(password, user[0].password);
    const credentials = { id: user[0].id, name: user[0].name };

    return { isValid, credentials };
  };

  try {
    const server = await createServer();
    await initDb();
    await server.register([
      { plugin: authBasic },
    ]);
    await server.auth.strategy('simple', 'basic', { validate });
    await startServer(server);
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();

const initDb = require('./database');
const server = require('./server');

(async () => {
  try {
    await initDb();
    await server.start();
  } catch (err) {
    console.log(err);
  }
})();

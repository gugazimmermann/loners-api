const initDb = require('./database');
const { createServer, startServer } = require('./server');

(async () => {
  try {
    const server = await createServer();
    await initDb();
    await startServer(server);
    console.log(`Server running at: ${server.info.uri}`);
  } catch (err) {
    console.log(err);
  }
})();

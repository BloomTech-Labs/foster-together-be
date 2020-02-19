const server = require('./server/server')
const PORT = process.env.PORT || 7000;
server.listen(PORT, () => {
  console.log(`\n=== listening on ${PORT} ===\n`);
});
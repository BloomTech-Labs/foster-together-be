const env = require('./env.js');
const https = require('https');
const fs = require('fs');

const server = require('./server/server');

const PORT = env.PORT || 7000;

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
  passphrase: env.SSL_PASSPHRASE
}, server).listen(PORT, () => {
  console.log(`\n=== listening on ${PORT} ===\n`);
});
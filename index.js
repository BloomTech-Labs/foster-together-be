const env = require('./env.js');
const https = require('https');
const fs = require('fs');
const Sentry = require('@sentry/node');

const server = require('./server/server');

const PORT = env.PORT || 7000;

Sentry.init({ 
  dsn: 'https://23bb508df01e4829bcdf6578db36ceed@sentry.io/2717223'
 });

env.NODE_ENV === 'development' ?
  https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: env.SSL_PASSPHRASE
  }, server).listen(PORT, () => {
    console.log(`\n=== listening on ${PORT} ===\n`);
  })
: server.listen(PORT, () => {
  console.log(`\n=== listening on ${PORT} ===\n`);
});
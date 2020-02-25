require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV, // set to production
  SSL_PASSPHRASE: process.env.SSL_PASSPHRASE, // set when generating OpenSSL certificate
  DATABASE_URL: process.env.DATABASE_URL, // production DB
  TEST_DB: process.env.TEST_DB, // test DB
}

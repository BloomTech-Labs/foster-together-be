require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  SSL_PASSPHRASE: process.env.SSL_PASSPHRASE,
  DATABASE_URL: process.env.DATABASE_URL,
}

require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV, // set to development
  DATABASE_URL: process.env.DATABASE_URL, // development DB
  HOSTNAME_TEST: process.env.HOSTNAME_TEST, // test DB
  USERNAME_TEST: process.env.USERNAME_TEST, // test DB
  PASSWORD_TEST: process.env.PASSWORD_TEST, // test DB
  PORT_TEST: process.env.PORT_TEST, // test DB
  NAME_TEST: process.env.NAME_TEST, // test DB
  JWT_SECRET: process.env.JWT_SECRET, // jwt secret must be a single string
  STRIPE: process.env.STRIPE, // stripe key
}

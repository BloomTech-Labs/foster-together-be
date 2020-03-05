const { DATABASE_URL } = require('./env.js'),
  testDB = require('./knextest'),
  awsDB = require('./knexAWS')

module.exports = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  test: {
    client: 'pg',
    connection: testDB,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  staging: {
    client: 'pg',
    connection: awsDB,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: awsDB,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
}

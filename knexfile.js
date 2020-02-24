const env = require('./env.js')

module.exports = {
  development: {
    client: 'pg',
    connection: env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'pg',
    connection: env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: env.DATABASE_URL,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    useNullAsDefault: true,
  },
}

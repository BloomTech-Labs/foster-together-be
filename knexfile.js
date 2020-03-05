const { DATABASE_URL } = require('./env.js'),
  testDB = require('./data/knex/knextest')

module.exports = {
  development: {
    client: 'pg',
    connection: DATABASE_URL,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },

  test: {
    client: 'pg',
    connection: testDB,
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      database: 'postgres',
    },
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.RDS_HOSTNAME,
      user: process.env.RDS_USERNAME,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      database: 'postgres',
    },
    migrations: { directory: './data/migrations' },
    seeds: { directory: './data/seeds/productionSeed' },
  },
}

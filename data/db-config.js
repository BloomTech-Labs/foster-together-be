const knex = require('knex')
const env = require('../env')
const config = require('../knexfile')

module.exports = knex(config[env.NODE_ENV])

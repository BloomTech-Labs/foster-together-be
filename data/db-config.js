const knex = require('knex')
const env = require('../env.js')
const config = require('../knexfile.js')

module.exports = knex(config[env.NODE_ENV])

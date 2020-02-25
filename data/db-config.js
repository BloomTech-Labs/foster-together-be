const knex = require('knex')
const env = require('../env.js')
const config = require('../knexfile.js')
const nodeEnv = env.NODE_ENV || 'development'

module.exports = knex(config[nodeEnv])

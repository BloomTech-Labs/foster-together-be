var knexCleaner = require('knex-cleaner')

var options = {
  mode: 'truncate',
  ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knexCleaner.clean(knex, options)
}

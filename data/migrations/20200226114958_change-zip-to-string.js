exports.up = function(knex) {
  return knex.schema.alterTable('zips', tbl => {
    tbl.string('zip', 5).alter()
  })
}

exports.down = function(knex) {}

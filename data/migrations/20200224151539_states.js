exports.up = function(knex) {
  return knex.schema.createTable('states', tbl => {
    tbl.increments('state_id')
    tbl
      .string('state')
      .unique()
      .notNullable()
      .index()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('states')
}

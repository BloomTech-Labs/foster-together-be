exports.up = function(knex) {
  return knex.schema.createTable('zips', tbl => {
    tbl.increments('zip_id')
    tbl
      .integer('zip')
      .unique()
      .notNullable()
      .index()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('zips')
}

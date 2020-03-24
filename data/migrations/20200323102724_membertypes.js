exports.up = function(knex) {
  return knex.schema.createTable('membertypes', tbl => {
    tbl.increments('id')
    tbl
      .text('type')
      .unique()
      .notNullable()
      .index()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('membertypes')
}

exports.up = function(knex) {
  return knex.schema.createTable('cities', tbl => {
    tbl.increments('city_id')
    tbl
      .text('city')
      .unique()
      .notNullable()
      .index()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cities')
}

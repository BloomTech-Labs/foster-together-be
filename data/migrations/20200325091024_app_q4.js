exports.up = function(knex) {
  return knex.schema.createTable('app_q4', tbl => {
    tbl.increments('id')
    tbl
      .integer('answer')
      .notNullable()
      .unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('app_q4')
}

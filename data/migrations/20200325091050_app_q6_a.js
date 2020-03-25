exports.up = function(knex) {
  return knex.schema.createTable('app_q6_a', tbl => {
    tbl.increments('id')
    tbl
      .boolean('answer')
      .notNullable()
      .unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('app_q6_a')
}

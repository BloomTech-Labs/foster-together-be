exports.up = function(knex) {
  return knex.schema.createTable('app_approved', tbl => {
    tbl.increments('id')
    tbl
      .boolean('approved')
      .notNullable()
      .unique()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('app_approved')
}

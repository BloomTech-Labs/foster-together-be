exports.up = function(knex) {
  return knex.schema.createTable('app_q4', tbl => {
    tbl.increments('id')
    tbl.boolean('option_1').notNullable()
    tbl.boolean('option_2').notNullable()
    tbl.unique(['option_1', 'option_2'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('app_q4')
}

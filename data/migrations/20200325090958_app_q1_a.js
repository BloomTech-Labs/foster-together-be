exports.up = function(knex) {
  return knex.schema.createTable('app_q1_a', tbl => {
    tbl.increments('id')
    tbl.boolean('option_1').notNullable()
    tbl.boolean('option_2').notNullable()
    tbl.boolean('option_3').notNullable()
    tbl.boolean('option_4').notNullable()
    tbl.unique(['option_1', 'option_2', 'option_3', 'option_4'])
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('app_q1_a')
}

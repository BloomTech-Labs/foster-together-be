exports.up = function(knex) {
  return knex.schema.createTable('app_q6_b', tbl => {
    tbl.increments('id')
    tbl.text('answer_a')
    tbl.text('answer_b')
    tbl.text('answer_c')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('app_q6_b')
}

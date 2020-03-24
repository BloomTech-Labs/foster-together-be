exports.up = function(knex) {
  return knex.schema.createTable('admins', tbl => {
    tbl.increments('id')
    tbl.string('first_name').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admins')
}

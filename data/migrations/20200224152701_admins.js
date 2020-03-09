exports.up = function(knex) {
  return knex.schema.createTable('admins', tbl => {
    tbl.increments('admin_id')
    tbl
      .text('email')
      .notNullable()
      .unique()
      .index()
    tbl.text('first_name').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admins')
}

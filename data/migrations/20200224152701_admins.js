exports.up = function(knex) {
  return knex.schema.createTable('admins', tbl => {
    tbl.increments('admin_id')
    tbl
      .string('email')
      .notNullable()
      .unique()
      .index()
    tbl.string('display_name').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admins')
}

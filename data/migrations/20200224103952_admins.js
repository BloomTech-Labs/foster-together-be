exports.up = function(knex) {
  return knex.schema.createTable('admins', admin => {
    admin.increments('admin_id')
    admin
      .string('email')
      .notNullable()
      .unique()
      .index()
    admin.string('display_name').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admins')
}

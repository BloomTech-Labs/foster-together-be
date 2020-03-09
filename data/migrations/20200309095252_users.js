exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('user_id')
    table.text('password').notNullable()
    table
      .integer('admin_id')
      .references('admins.admin_id')
      .unique()
    table
      .integer('family_id')
      .references('families.family_id')
      .unique()
    table
      .integer('neighbor_id')
      .references('neighbors.neighbor_id')
      .unique()
  })

exports.down = knex => knex.schema.dropTableIfExists('users')

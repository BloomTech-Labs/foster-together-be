exports.up = function(knex) {
  return knex.schema.dropTable('users').createTable('users', table => {
    table.increments('user_id')
    table
      .text('email')
      .unique()
      .notNullable()
      .index()
    table.text('password').notNullable()
    table
      .integer('admin_id')
      .references('admins.id')
      .unique()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .integer('family_id')
      .references('families.id')
      .unique()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .integer('neighbor_id')
      .references('neighbors.id')
      .unique()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {}

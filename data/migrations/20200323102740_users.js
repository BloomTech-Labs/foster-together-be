exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('id')
    table
      .text('email')
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
      .integer('member_id')
      .references('members.id')
      .unique()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })

exports.down = knex => knex.schema.dropTableIfExists('users')

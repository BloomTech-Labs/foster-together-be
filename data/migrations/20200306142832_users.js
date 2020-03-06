exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments('user_id')
    table
      .text('email')
      .unique()
      .notNullable()
      .index()
    table
      .text('username')
      .unique()
      .notNullable()
      .index()
    table.text('password').notNullable()
  })

exports.down = knex => knex.schema.dropTableIfExists('users')

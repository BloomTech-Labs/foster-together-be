exports.up = function(knex) {
  return knex.schema.createTable('neighbors', neighbor => {
    neighbor.increments('neighbor_id')
    neighbor.string('first_name').notNullable()
    neighbor.string('last_name').notNullable()
    neighbor
      .string('email')
      .notNullable()
      .unique()
    neighbor
      .string('phone')
      .notNullable()
      .unique()
    neighbor
      .string('address')
      .notNullable()
      .unique()
    neighbor.integer('city_state_zip_id').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('neighbors')
}

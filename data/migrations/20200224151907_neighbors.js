exports.up = function(knex) {
  return knex.schema.createTable('neighbors', tbl => {
    tbl.increments('neighbor_id')
    tbl.string('first_name').notNullable()
    tbl.string('last_name').notNullable()
    tbl
      .string('email')
      .notNullable()
      .unique()
    tbl
      .string('phone')
      .notNullable()
      .unique()
    tbl
      .string('address')
      .notNullable()
      .unique()
    tbl
      .integer('city_state_zip_id')
      .notNullable()
      .unsigned()
      .references('city_state_zip_id')
      .inTable('city_state_zip')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('neighbors')
}

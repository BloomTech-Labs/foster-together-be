exports.up = function(knex) {
  return knex.schema.createTable('neighbors', tbl => {
    tbl.increments('neighbor_id')
    tbl.text('first_name').notNullable()
    tbl.text('last_name').notNullable()
    tbl
      .text('email')
      .notNullable()
      .unique()
    tbl
      .text('phone')
      .notNullable()
      .unique()
    tbl
      .text('address')
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

exports.up = function(knex) {
  return knex.schema.createTable('city_state_zip', tbl => {
    tbl.increments('id')
    tbl
      .integer('city_id')
      .notNullable()
      .unsigned()
      .references('cities.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('state_id')
      .notNullable()
      .unsigned()
      .references('states.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('zip_id')
      .notNullable()
      .unsigned()
      .references('zips.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('city_state_zip')
}

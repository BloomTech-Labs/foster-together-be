exports.up = function(knex) {
  return knex.schema.createTable('city_state_zip', tbl => {
    tbl.increments('city_state_zip_id')
    tbl
      .integer('city_id')
      .notNullable()
      .unsigned()
      .references('city_id')
      .inTable('cities')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('state_id')
      .notNullable()
      .unsigned()
      .references('state_id')
      .inTable('states')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('zip_id')
      .notNullable()
      .unsigned()
      .references('zip_id')
      .inTable('zips')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('city_state_zip')
}

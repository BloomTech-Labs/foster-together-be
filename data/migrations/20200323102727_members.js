exports.up = function(knex) {
  return knex.schema.createTable('members', tbl => {
    tbl.increments('id')
    tbl.text('first_name').notNullable()
    tbl.text('last_name').notNullable()
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
      .references('city_state_zip.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl.text('latitude').notNullable()
    tbl.text('longitude').notNullable()
    tbl
      .integer('membertype_id')
      .notNullable()
      .unsigned()
      .references('membertypes.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    tbl
      .integer('match_id')
      .unsigned()
      .references('members.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('members')
}

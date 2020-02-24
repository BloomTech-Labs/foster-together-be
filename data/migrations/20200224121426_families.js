exports.up = function(knex) {
  return knex.schema.createTable('families', family => {
    family.increments('family_id')
    family.string('first_name').notNullable()
    family.string('last_name').notNullable()
    family
      .string('email')
      .notNullable()
      .unique()
    family
      .string('phone')
      .notNullable()
      .unique()
    family
      .string('address')
      .notNullable()
      .unique()
    family.integer('city_state_zip_id').notNullable()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('families')
}

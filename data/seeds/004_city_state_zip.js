exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('city_state_zip').then(function() {
    // Inserts seed entries
    return knex('city_state_zip').insert([
      { city_id: 1, state_id: 1, zip_id: 1 },
      { city_id: 2, state_id: 1, zip_id: 2 },
      { city_id: 3, state_id: 1, zip_id: 3 },
    ])
  })
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('families').then(function() {
    // Inserts seed entries
    return knex('families').insert([
      {
        first_name: 'Joseph',
        last_name: 'Rodriguez',
        phone: '200-800-7648',
        address: '1245 Wynnstone Dr',
        city_state_zip_id: 1,
      },
      {
        first_name: 'Robert',
        last_name: 'Thomas',
        phone: '200-555-7648',
        address: '32 Cherry Ave',
        city_state_zip_id: 2,
      },
      {
        first_name: 'Isabela',
        last_name: 'Thompson',
        phone: '200-555-5000',
        address: '648 Cat St',
        city_state_zip_id: 3,
      },
    ])
  })
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('states').then(function() {
    // Inserts seed entries
    return knex('states').insert([{ state: 'Colorado' }])
  })
}

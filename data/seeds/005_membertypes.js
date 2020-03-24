exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('membertypes').then(function() {
    // Inserts seed entries
    return knex('membertypes').insert([
      { type: 'families' },
      { type: 'neighbors' },
    ])
  })
}

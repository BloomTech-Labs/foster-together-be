exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').then(function() {
    // Inserts seed entries
    return knex('admins').insert([
      { first_name: 'Hope' },
      { first_name: 'Abbie' },
      { first_name: 'Grace' },
    ])
  })
}

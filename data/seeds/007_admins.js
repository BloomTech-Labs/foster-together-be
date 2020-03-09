exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').then(function() {
    // Inserts seed entries
    return knex('admins').insert([
      { email: 'hope@email.com', first_name: 'Hope' },
      { email: 'abbie@email.com', first_name: 'Abbie' },
      { email: 'grace@email.com', first_name: 'Grace' },
    ])
  })
}

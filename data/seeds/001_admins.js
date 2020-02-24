exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('admins').insert([
        { email: 'hope@email.com', display_name: 'Hope' },
        { email: 'abbie@email.com', display_name: 'Abbie' },
        { email: 'grace@email.com', display_name: 'Grace' },
      ])
    })
}

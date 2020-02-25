exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cities').then(function() {
    // Inserts seed entries
    return knex('cities').insert([
      { city: 'Boulder' },
      { city: 'Colorado Springs' },
      { city: 'Denver' },
    ])
  })
}

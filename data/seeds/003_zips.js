exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('zips').then(function() {
    // Inserts seed entries
    return knex('zips').insert([
      { zip: '80301' },
      { zip: '80014' },
      { zip: '80829' },
    ])
  })
}

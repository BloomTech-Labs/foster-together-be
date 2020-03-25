exports.seed = function(knex) {
  return knex('app_approved').then(function() {
    return knex('app_approved').insert([
      { status: 1 },
      { status: 2 },
      { status: 3 },
      { status: 4 },
    ])
  })
}

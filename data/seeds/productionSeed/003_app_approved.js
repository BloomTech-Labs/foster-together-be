exports.seed = function(knex) {
  return knex('app_approved').then(function() {
    return knex('app_approved').insert([
      { approved: false },
      { approved: true },
    ])
  })
}

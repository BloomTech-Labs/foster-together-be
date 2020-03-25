exports.seed = function(knex) {
  return knex('app_q3').then(function() {
    return knex('app_q3').insert([{ answer: false }, { answer: true }])
  })
}

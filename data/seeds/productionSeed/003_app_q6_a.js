exports.seed = function(knex) {
  return knex('app_q6_a').then(function() {
    return knex('app_q6_a').insert([{ answer: false }, { answer: true }])
  })
}

exports.seed = function(knex) {
  return knex('app_q5').then(function() {
    return knex('app_q5').insert([{ answer: 1 }, { answer: 2 }, { answer: 3 }])
  })
}

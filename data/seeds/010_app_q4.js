exports.seed = function(knex) {
  return knex('app_q4').then(function() {
    return knex('app_q4').insert([{ answer: 1 }, { answer: 2 }, { answer: 3 }])
  })
}

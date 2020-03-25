exports.seed = function(knex) {
  return knex('app_q4').then(function() {
    return knex('app_q4').insert([
      { option_1: false, option_2: false },
      { option_1: true, option_2: false },
      { option_1: false, option_2: true },
      { option_1: true, option_2: true },
    ])
  })
}

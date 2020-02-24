exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('families')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('families').insert([
        {
          first_name: 'Joseph',
          last_name: 'Rodriguez',
          email: 'Joseph49er@yahoo.com',
          phone: '200-800-7648',
          address: '629 W Lone Hill Ave',
        },
      ])
    })
}

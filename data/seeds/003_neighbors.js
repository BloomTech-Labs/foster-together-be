exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('neighbors')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('neighbors').insert([
        {
          first_name: 'Eric',
          last_name: 'Grece',
          email: 'GreceMana@yahoo.com',
          phone: '202-808-6542',
          address: '629 W Cienga Boul',
        },
      ])
    })
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('neighbors').then(function() {
    // Inserts seed entries
    return knex('neighbors').insert([
      {
        first_name: 'Eric',
        last_name: 'Grece',
        email: 'GreceMana@yahoo.com',
        phone: '202-808-6542',
        address: '629 W Cienga Boul',
        city_state_zip_id: 1,
      },
      {
        first_name: 'Tommy',
        last_name: 'Richmon',
        email: 'Richmon@yahoo.com',
        phone: '102-808-3242',
        address: 'Orange County',
        city_state_zip_id: 2,
      },
      {
        first_name: 'Rick',
        last_name: 'Chu',
        email: 'Chuthedewd@yahoo.com',
        phone: '202-324-4324',
        address: 'Flagstaff',
        city_state_zip_id: 3,
      },
    ])
  })
}

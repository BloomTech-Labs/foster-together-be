const db = require('../../../data/db-config.js')

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
}

function add(familyData) {
  let city = await Locations.findCityByName(familyData.city)
  let state = await Locations.findStateByName(familyData.state)
  let zip = await Locations.findByZip(Number(familyData.zip))

  if (!city) {
    let newCity = await Locations.addCity({ city: familyData.city })
    city = newCity[0]
  }

  if (!state) {
    let newState = await Locations.addState({ state: familyData.state })
    state = newState[0]
  }

  if (!zip) {
    let newZip = await Locations.addZip({ zip: Number(familyData.zip) })
    zip = newZip[0]
  }

  let cityStateZip = await Locations.findByLocation(
    city.city_id,
    state.state_id,
    zip.zip_id
  )

  if (!cityStateZip) {
    let newCityStateZip = await Locations.addCityStateZip(
      city.city_id,
      state.state_id,
      zip.zip_id
    )
    cityStateZip = newCityStateZip[0]
  }

  return db('families').insert(
    {
      first_name: familyData.first_name,
      last_name: familyData.last_name,
      email: familyData.email,
      phone: familyData.phone,
      address: familyData.address,
      city_state_zip_id: cityStateZip.city_state_zip_id,
    },
    [
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'city_state_zip_id',
    ]
  )
}

function find() {
  return db('families')
}

function findBy(filter) {
  return db('families').where(filter)
}

function findById(id) {
  return db('families')
    .where('family_id', id)
    .first()
}

function update(id, data) {
  return db('families')
    .where('family_id', id)
    .update(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      ['first_name', 'last_name', 'email', 'phone', 'address']
    )
}

function remove(id) {
  return db('families')
    .where('family_id', id)
    .del()
}

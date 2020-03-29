const db = require('../../data/db-config.js')

const Locations = require('./location-helper.js')

module.exports = {
  add,
  find,
  update,
  remove,
}

async function handleCSZ(data) {
  let city = await Locations.findCityByName(data.city)
  let state = await Locations.findStateByName(data.state)
  let zip = await Locations.findByZip(data.zip)

  if (!city) city = (await Locations.addCity({ city: data.city }))[0]

  if (!state) state = (await Locations.addState({ state: data.state }))[0]

  if (!zip) zip = (await Locations.addZip({ zip: data.zip }))[0]

  let cityStateZip = await Locations.findByLocation(city.id, state.id, zip.id)

  if (!cityStateZip)
    cityStateZip = (
      await Locations.addCityStateZip(city.id, state.id, zip.id)
    )[0]
  return cityStateZip
}

async function handleMT(membertype) {
  let mt_id = await db('membertypes')
    .where('type', membertype)
    .first(['id'])
  if (!mt_id)
    mt_id = (await db('membertypes').insert({ type: membertype }, ['id']))[0]
  return mt_id
}

async function add(membertype, data) {
  const cityStateZip = await handleCSZ(data)

  const mt_id = await handleMT(membertype)

  const member_id = (
    await db('members').insert(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        address: data.address,
        city_state_zip_id: cityStateZip.id,
        membertype_id: mt_id.id,
        longitude: data.longitude,
        latitude: data.latitude,
      },
      ['id']
    )
  )[0]

  await db('users').insert({
    email: data.email,
    password: data.password,
    member_id: member_id.id,
  })

  return member_id
}

const getMembers = async filter =>
  await db('users AS u')
    .join('members AS m', 'u.member_id', 'm.id')
    .join('membertypes AS mt', 'm.membertype_id', 'mt.id')
    .join('city_state_zip AS csz', 'csz.id', `m.city_state_zip_id`)
    .join('cities AS c', 'c.id', 'csz.city_id')
    .join('states AS s', 's.id', 'csz.state_id')
    .join('zips AS z', 'z.id', 'csz.zip_id')
    .select(
      'm.id',
      'first_name',
      'last_name',
      'email',
      'phone',
      'address',
      'c.city',
      's.state',
      'z.zip',
      'longitude',
      'latitude',
      'type'
    )
    .modify(queryBuilder => filter && queryBuilder.where(filter))

const appStatus = async m_id => {
  const status = await db('application')
    .where('member_id', m_id)
    .first()
  if (!status) return 1
  return status.app_approved_id
}

async function find(filter) {
  const members = await getMembers(filter)

  return await Promise.all(
    members.map(async member => ({
      ...member,
      application: member.type === 'families' ? 2 : await appStatus(member.id),
      // same method could work for training and background check fields.
    }))
  )
}

async function update(id, data) {
  const cityStateZip = await handleCSZ(data)
  await db('members')
    .where('id', id)
    .update({
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      address: data.address,
      city_state_zip_id: cityStateZip.id,
      longitude: data.longitude,
      latitude: data.latitude,
    })
  return find({ 'm.id': id })
}

function remove(id) {
  return db('members')
    .where('id', id)
    .del()
}

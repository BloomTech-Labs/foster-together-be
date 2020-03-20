const db = require('../../data/db-config')

const addAdmin = async ({ first_name, email, password }) => {
  const { id } = (await db('admins').insert({ first_name }, ['id']))[0]
  await db('users').insert({
    email,
    password,
    admin_id: id,
  })
  return { id, first_name }
}

module.exports = { addAdmin }

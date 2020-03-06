const db = require('../../../../data/db-config'),
  { findUser } = require('../authTools'),
  addUser = async newUser => {
    await db('users').insert({
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    })
    return await findUser(newUser.username)
  }

module.exports = { addUser }
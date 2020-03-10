const bcrypt = require('bcryptjs'),
  db = require('../../../../data/db-config')

const valBody = (req, res, next) => {
  if (!req.body.email && !req.body.password)
    throw new Error('Must send both an email and a password')
  if (!req.body.email) throw new Error('Must send an email')
  if (!req.body.password) throw new Error('Must send a password')
  next()
}

const validatePassword = async (req, res, next) => {
  const user = await db('users as u')
    .innerJoin('admins as a', 'u.admin_id', 'a.admin_id')
    .where('email', req.body.email)
    .first()
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return res
      .status(401)
      .json({ message: 'Authorization failed!', token: false })
  req.body.user = {
    subject: user.user_id,
    first_name: user.first_name,
    user_type: 'admin',
  }
  next()
}

module.exports = { valBody, validatePassword }

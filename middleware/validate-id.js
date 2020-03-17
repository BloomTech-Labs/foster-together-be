const db = require('../data/db-config.js')

function validateId() {
  return async function(req, res, next) {
    const { membertype, id } = req.params
    const resource = await db(membertype)
      .first()
      .where('id', id)
    if (!resource) {
      res.status(400).json({ message: 'Invalid ID.' })
    } else {
      req.resource = resource
      next()
    }
  }
}

module.exports = validateId

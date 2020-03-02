const db = require('../data/db-config.js')

function validateId(table, tableId) {
  // example parameters: ('neighbors', 'neighbor_id')
  return async function(req, res, next) {
    const { id } = req.params

    const resource = await db(table)
      .first()
      .where(tableId, id)

    if (!resource) {
      res.status(400).json({ message: 'Invalid ID.' })
    } else {
      req.resource = resource
      next()
    }
  }
}

module.exports = validateId

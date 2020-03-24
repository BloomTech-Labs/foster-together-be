const validateMemberBody = (req, res, next) => {
  const body = req.body
  const keyArray = Object.keys(body)
  const expectedKeys =
    req.method !== 'PUT'
      ? [
          'first_name',
          'last_name',
          'email',
          'phone',
          'address',
          'city',
          'state',
          'zip',
          'password',
          'confirmPassword',
        ]
      : ['first_name', 'last_name', 'phone', 'address', 'city', 'state', 'zip']
  const difference = keyArray
    .filter(x => !expectedKeys.includes(x))
    .concat(expectedKeys.filter(x => !keyArray.includes(x)))
  if (keyArray.length === 0) res.status(400).json({ message: 'Missing data.' })
  if (difference.length > 0)
    return res
      .status(400)
      .json({ message: difference.map(key => `${key} is required`) })
  if (body.zip.length !== 5)
    res.status(400).json({ message: 'zip must be 5 characters.' })
  next()
}

// checks if token belongs to specific user or an admin
const userOrAdmin = (req, res, next) => {
  const { id } = req.params
  if (
    req.decodedToken.membertype === 'admins' ||
    req.decodedToken.id === Number(id)
  )
    next()
  else res.status(401).json({ message: 'Authentication Failure', token: false })
}

module.exports = { validateMemberBody, userOrAdmin }

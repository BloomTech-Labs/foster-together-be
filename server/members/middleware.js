const expectedKeys = {
  POST: [
    'first_name',
    'last_name',
    'email',
    'phone',
    'address',
    'city',
    'state',
    'zip',
    'longitude',
    'latitude',
    'password',
    'confirmPassword',
  ],
  PUT: [
    'first_name',
    'last_name',
    'phone',
    'address',
    'city',
    'state',
    'zip',
    'longitude',
    'latitude',
  ],
}

const validateMemberBody = (req, res, next) => {
  const body = req.body
  const keyArray = Object.keys(body)
  const difference = keyArray
    .filter(x => !expectedKeys[req.method].includes(x))
    .concat(expectedKeys[req.method].filter(x => !keyArray.includes(x)))
  if (keyArray.length === 0) res.status(400).json({ message: 'Missing data.' })
  if (difference.length > 0)
    return res
      .status(400)
      .json({ message: difference.map(key => `${key} is required`) })
  if (body.zip.length !== 5)
    res.status(400).json({ message: 'zip must be 5 characters.' })
  next()
}

module.exports = { validateMemberBody }

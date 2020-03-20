const validateSignup = (req, res, next) => {
  const body = req.body
  const keyArray = Object.keys(body)
  const expectedKeys = [
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

module.exports = { validateSignup }

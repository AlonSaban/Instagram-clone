const jwt = require('jsonwebtoken');
const { updateUser } = require('../controllers/users')

async function setUserToken(user) {
  const payload = {
    user: { id: user._id },
    created: (new Date()).toJSON(),
    identifier: Math.random().toString()
  }
  const token = jwt.sign(payload, process.env.JWT_TOKEN)
  console.log('it got right befor the update user')
  await updateUser(user._id, { tokens: { created: payload.created, identifier: payload.identifier } })
  return token;
}


module.exports = {
  setUserToken
}
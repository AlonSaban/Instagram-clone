const jwt = require('jsonwebtoken');
const { getUser, updateUser } = require('../controllers/users')
const { model } = require("mongoose");

async function setUserToken(user) {
  const payload = {
    user: { id: user.id },
    created: (new Date()).toJSON(),
    identifier: Math.random().toString()
  }
  const token = jwt.sign(payload, process.env.JWT_TOKEN)
  await updateUser(user.id, { tokens: { created: payload.created, identifier: payload.identifier } })
  return token;
}


module.exports = {
  setUserToken
}
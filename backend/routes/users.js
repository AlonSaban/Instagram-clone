const { checkUser, authenticateUser, validateUser } = require('../middlewares/users')
const { createUser, updateUser, deleteUser, getUser, setfollowUser, getFriends, getUsers } = require('../controllers/users')


module.exports = router => {
  router.post('/api/register', createUser)
  router.post('/api/login', validateUser)
  router.put('/api/users/:userId', checkUser, updateUser)
  router.delete('/api/:id', checkUser, deleteUser)
  router.get('/api/users/', getUser)
  router.get('/api/friend/:userId', getFriends)
  router.get('/api/search/:userName', getUsers)
  router.put('/api/:id/follow', setfollowUser)
}
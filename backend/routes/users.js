const { getUserById, checkUser, validateUser } = require('../middlewares/users')
const { createUser, updateUser, deleteUser, getUser, setfollowUser } = require('../controllers/users')


module.exports = router => {
  router.post('/api/register', createUser)
  router.post('/api/login', validateUser)
  router.put('/api/users/:userId', getUserById, updateUser)
  router.delete('/api/:id', getUserById, deleteUser)
  router.get('/api/users/', getUser)
  router.put('/api/:id/follow', setfollowUser)
}
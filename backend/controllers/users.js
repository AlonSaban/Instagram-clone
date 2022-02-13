const jwt = require('jsonwebtoken')
const UserSchema = require('../models/users')
const bcrypt = require('bcrypt')
const User = require('../models/users')


async function createUser(req, res) {
  try {
    // const token = jwt.sign({}, process.env.JWT_TOKEN)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = await UserSchema.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email,
      profilePicture: req.body.profilePicture,
    })
    await user.save()
    res
      .status(200).send(user)
  } catch (err) {
    res
      .status(500)
      .json(err)
  }
}

async function updateUser(req, res) {
  try {
    await UserSchema.findByIdAndUpdate(req.params.id, { $set: req.body, })
    res.status(200).json("Account has been updated")
  }
  catch (err) {
    return res.status(500).json(err)
  }
}

async function deleteUser(req, res) {
  try {
    await UserSchema.findByIdAndDelete(req.params.id)
    res.status(200).json("Account has been deleted")
  } catch (err) {
    return res.status(500).json(err)
  }
}

async function getUser(req, res) {
  const userId = req.query.userId;
  // const username = req.params.userName;
  const username = req.query.username;

  try {
    const user = userId
      ? await UserSchema.findById(userId).lean()
      : await UserSchema.findOne({ firstName: username }).lean()
    // console.log(user)
    const { password, isAdmin, ...allTheRest } = user
    res.status(200).json(allTheRest)
  } catch (err) {
    return res.status(500).json(err)
  }
}

async function setfollowUser(req, res) {
  if (req.body.id !== req.params.id) {
    try {
      const user = await UserSchema.findById(req.params.id).lean()
      const currentUser = await UserSchema.findById(req.body.userId).lean()
      if (!user.followers.includes(req.body.userId)) {
        await UserSchema.findByIdAndUpdate(req.params.id, { $push: { followers: req.body.userId } })
        await UserSchema.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.userId } })
        res.status(200).json("user has been followed")
      } else {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: req.body.userId } })
        res.status(200).json("user is no longer following this user")
      }
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(403).json("you cant follow yourself")
  }
}
async function getFriends(req, res) {
  const userId = req.params.userId
  try {
    const user = await UserSchema.findById(userId).lean();
    const friends = await Promise.all(
      user.following.map(friendId => {
        return UserSchema.findById(friendId);
      })
    )
    let friendsList = []

    friends.map((friend) => {
      const { _id, firstName, profilePicture, ...allTheRest } = friend;
      friendsList.push({ _id, firstName, profilePicture })
    })

    res.status(200).json(friendsList)
  } catch (err) {
    res.status(500).json(err)
  }
}
async function getUsers(req, res) {
  const username = req.params.userName
  try {
    const users = await UserSchema.find({ firstName: username })
    let usersList = [];
    users.map((user) => usersList.push(user))

    res.status(200).json(usersList)
  } catch (err) {
    res.status(500).json(err)
  }
}
module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  setfollowUser,
  getFriends,
  getUsers
}
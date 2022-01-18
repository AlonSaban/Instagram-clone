const PostSchema = require('../models/post')

async function getPostById(req, res, next) {
  try {
    const post = await PostSchema.findById(req.params.id).lean()
    if (post._id === req.body.userId) {
      next()
    } else {
      res.status(403).json("you are not allowed to do that!")
    }
  } catch (err) {
    res.status(500).json(err);
  }
  next()
}

module.exports = {
  getPostById
}
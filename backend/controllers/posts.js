const mongoose = require('mongoose')
const PostSchema = require('../models/post');
const UserSchema = require('../models/users');


async function create(req, res) {
    const newPost = new PostSchema(req.body);
    try {
        const savedPost = await newPost.save()
        res.status(200).send(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
}

async function uploadImages(req, res) {
    try {
        return res.status(200).json('file uploaded successfully');
    } catch (err) {
        console.log(err)
    }
}


async function getOne(req, res) {
    try {
        const post = await PostSchema.findById(req.params.id).lean()
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err);
    }
}

// feed posts
async function getPosts(req, res) {
    try {
        const currentUser = await UserSchema.findById(req.params.userId).lean()
        const userPosts = await PostSchema.find({ userId: currentUser._id }).lean()
        // In order to use map you need to use promise.all
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return PostSchema.find({ userId: friendId })
            })
        )
        const allPosts = userPosts.concat(...friendPosts)
        res.status(200).json(allPosts.sort((a, b) => (a.created < b.created) ? 1 : (a.created > b.created) ? -1 : 0))
    }
    catch (err) {
        res.status(500).json(err)
    }
}

async function getUserPosts(req, res) {
    try {
        const user = await UserSchema.findOne({ firstName: req.params.username })
        const posts = await PostSchema.find({ userId: user._id })
        res.status(200).json(posts.sort((a, b) => (a.created < b.created) ? 1 : (a.created > b.created) ? -1 : 0));
    } catch (err) {
        res.status(500).json(err)
    }
}
const updatePost = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id).lean()
        if (post.userId === req.body.userId) {
            await PostSchema.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json("Post has been updated")
        }
        else {
            res.status(403).json("you have no permission for that")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

async function getPostById(req, res, next) {
    try {
        const post = await PostSchema.findById(req.params.id).lean()
        if (post.author === req.body.userId) next()
        else {
            res.status(403).json("you have no permission for that")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}

async function deletePost(req, res) {
    try {
        await PostSchema.findByIdAndDelete(req.params.id)
        res.status(200).json("Post has been delete")
    }
    catch (err) {
        res.status(500).json(err)
    }
}
const setLike = async (req, res) => {
    try {
        const post = await PostSchema.findById(req.params.id).lean()
        if (post.userId !== req.body.userId) {
            if (!post.likes.includes(req.body.userId)) {
                await PostSchema.findByIdAndUpdate(req.params.id, { $push: { likes: req.body.userId } })
                res.status(200).send("post has been liked")
            }
            else {
                await PostSchema.findByIdAndUpdate(req.params.id, { $pull: { likes: req.body.userId } })
                res.status(200).json("Post has been disliked")
            }
        } else {
            // console.log("you cant like your own post")
            res.status(500).send("you cant like your own post")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }
}
async function createComment(req, res) {
    const postId = req.params.postId
    const comment = req.body.comment
    console.log(postId)
    console.log(comment)
    try {
        await PostSchema.findByIdAndUpdate(postId, { $push: { comments: comment } })
        res.status(200).json("Comment has been Posted")
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports = {
    create,
    updatePost,
    uploadImages,
    deletePost,
    getPostById,
    getPosts,
    getOne,
    getUserPosts,
    setLike,
    createComment
}
const { create, updatePost, setLike, deletePost, getUserPosts, getPostById, getPosts, getOne, uploadImages } = require('../controllers/posts')
const { upload } = require("../middlewares/upload")

module.exports = (router) => {
    router.post('/api/feed/upload-post', create)
    router.post('/api/upload', upload.single("image"), uploadImages)
    router.get('/api/posts/timeline/:userId', getPosts)
    router.get('/api/profile/:username', getUserPosts)
    router.put('/api/posts/:id', updatePost)
    router.put('/api/posts/:id/like', setLike)
    router.delete('/api/posts/:id', deletePost)
    router.get('/api/:id', getOne)
    // router.get('/api/profile/:id', getOne)
}
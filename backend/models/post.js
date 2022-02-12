const mongoose = require('mongoose');
const User = require('./users')
const ObjectId = mongoose.Schema.ObjectId;

const PostSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    img: { type: String, default: "" },
    caption: { type: String, required: true },
    likes: { type: Array, default: 0 },
    comments: { type: String, required: false },
    created: { type: Date, default: Date.now },
}, { collection: "posts" });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
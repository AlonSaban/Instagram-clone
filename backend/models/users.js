const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new mongoose.Schema({
    firstName: { type: String, min: 3, required: true },
    lastName: { type: String, min: 2, required: true },
    email: { type: String, requierd: true, unique: true, validate: (value = '') => value.includes('@') },
    password: { type: String, min: 3, required: true },
    profilePicture: { type: String },
    followers: { type: Array, default: [], required: false },
    following: { type: Array, default: [], required: false },
    posts: { type: Array, default: [], required: false },
    desc: { type: String, max: 20 },
    isAdmin: { type: Boolean, default: false, required: false },
    tokens: { created: String, identifier: String },
    created: { type: Date, default: Date.now }
}, { collection: 'users' });

const User = mongoose.model('UserData', UserSchema);

module.exports = User;
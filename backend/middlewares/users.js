const UserSchema = require('../models/users')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function checkUser(req, res, next) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (err) {
                return res.status(500).json(err)
            }
        }
        next()
    } else {
        return res.status(403).json("you dont have permission to access this!")
    }
}

// authenticate user. checking if the user suppose to have permission
async function authenticateUser(req, res, next) {

    console.log(req.headers.cookie);
    try {
        const token = req.cookies['token'];
        const user = jwt.verify(token, process.env.JWT_TOKEN)
        req.userId = user._id;
        req.user = user;

    } catch (err) {
        console.log(err);
    }
    next()

}

// checking if such a user exists
async function validateUser(req, res) {
    try {
        const user = await UserSchema.findOne({ email: req.body.email })
        // console.log(user);
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("wrong password")

        res.status(200).json(user)
    }
    catch (err) {
        console.log(err)
        res
            .status(500)
    }

}

module.exports = {
    checkUser,
    authenticateUser,
    validateUser
};
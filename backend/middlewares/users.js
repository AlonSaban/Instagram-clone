const UserSchema = require('../models/users')
const { setUserToken } = require('../controllers/tokens')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function checkUser(req, res, next) {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err)
            }
        }
        next()
    } else {
        return res.status(403).json("you dont have permission to access this!")
    }
}

// checking if such a user exists and if so create him cookies
async function validateUser(req, res, next) {
    try {
        const user = await UserSchema.findOne({ email: req.body.email })
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("wrong password")
        const accessToken = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN)
        const refreshToken = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN)

        const { _id, firstName, lastName, profilePicture, followers, following, posts, ...allTheRest } = user;
        const send = { _id, firstName, lastName, profilePicture, followers, following, posts }

        res.cookie("accessToken", accessToken, { maxAge: 300000, httpOnly: true, })
        res.cookie("refreshToken", refreshToken, { maxAge: 3.154e10, httpOnly: true, })

        return res.status(200).json({ send, accessToken })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

// authenticate user. checking if the user suppose to have permission
async function checkToken(req, res, next) {
    // const token = req.cookies.token;
    const TEN_MINUTES = 1000 * 60 * 10;
    let payload
    let createDate;
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
            if (err) return res.status(403).json('Token is not valid')
            req.user = user;
            next();
        })
    } else {
        res.status(401).json('you are not authorize')
    }

    console.log(`cookie: ${req.body.cookie}`)
    console.log(`cookies: ${req.body.cookies}`)

    // // token  = jwt.verify(token);
    // if (!token) {
    //     return res.status(401);
    // }

    // // token created date
    // try {
    //     //jwt.decode
    //     payload = jwt.verify(token, process.env.JWT_TOKEN)
    //     if (!payload) {
    //         throw new Error('Invalid token');
    //     }
    //     createDate = new Date(payload.created);
    // } catch (err) {
    //     return res.status(401).json(err)
    // }

    // if (Date.now() - createDate < TEN_MINUTES) {
    //     req.user = payload.user;
    //     return next()
    // }

    // const user = updateUser(payload.user.id)

    // if (!(user &&
    //     user.tokens &&
    //     user.tokens.created === payload.created &&
    //     user.tokens.identifier === payload.identifier)) {
    //     return res.status(401)
    // }
    // const newUserToken = await setUserToken(user);
    // res.cookie('token', newUserToken)
    // next()
}
async function disconnect() {
    const { user } = req;

    // const session = 

}

async function getSassion() {

}

module.exports = {
    checkUser,
    validateUser,
    checkToken,
    disconnect,
    getSassion
};
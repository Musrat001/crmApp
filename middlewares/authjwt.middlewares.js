const User = require("../models/user.models.js");
const config = require("../configs/auth.configs");
const constant = require("../utils/constant.js");
const jwt = require("jsonwebtoken");



const verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        res.status(400).send({
            message: "please provide access token!"
        })
    }

    // verify jwt token

    jwt.verify(token, config.accessToken, (err, decoded) => {
        if (err) {
            return res.status(402).send({
                message: "Unauthorized access!."
            })
        }

        req.userId = decoded.id;

    })

    next();
}

const isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userId: req.userId });

    if (user && user.userType == constant.userTypes.admin) {
        next();
    } else {
        res.status(402).send({
            message: "Only admin can access this APi"
        })
    }

}

module.exports = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
const bcrypt = require("bcryptjs");
const User = require("../models/user.models.js");
const constant = require("../utils/constant.js");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
exports.signUp = async (req, res) => {
    // console.log(req.body);
    console.log("Signup API called");

    let userStatus;

    if (!req.body.userType || req.body.userType === constant.userTypes.customer) {
        userStatus = constant.userStatus.approved;
    } else {
        userStatus = constant.userStatus.pending;
    }

    const userObject = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 10),
        userStatus: userStatus
    };

    try {

        const createdUser = await User.create(userObject);

        const postRes = {
            user: createdUser.user,
            userId: createdUser.userId,
            email: createdUser.email,
            userType: createdUser.userType,
            userStatus: createdUser.userStatus,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt
        };

        res.status(201).send(postRes);

    } catch (error) {

        console.log("Error Internal server..", error);

        res.status(500).send({
            message: "Error while Registering user."
        });
    }
};



exports.login = async (req, res) => {

    // checking user exits

    const user = await User.findOne({ userId: req.body.userId });
    console.log("user\n", user);

    if (user == null) {
        res.status(400).send({
            message: `UserId: ${req.body.userId} is not registered yet.`
        })
        return;
    }

    // userStatus is approved or not
    console.log("user Status: ", user.userStatus);

    if (user.userStatus != constant.userStatus.approved) {
        res.status(400).send({
            message: `User is not Approved yet, your current status is ${user.userStatus}`
        });
        return;
    }

    // check for password is correct or not

    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
        res.status(401).send({
            accessToken: null,
            message: `Your password is Incorrect, please enter`
        })

        return;
    }

    // generate and send access and refresh token for login

    const accessToken = jwt.sign({ id: user.userId }, config.accessToken, { expiresIn: 120 });

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userStatus: user.userStatus,
        accessToken: accessToken
    })
    return;
}

// exports.users = async (req, res) => {
//     const user = await User.find({});
//     // res.send("get is called");
//     // return;

//     res.status(200).send("Are you gay right now?, (English wala gay).");
//     return;

// }
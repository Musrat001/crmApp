const User = require("../models/user.models.js");
const objectConverter = require("../utils/objectConverter.js");


// getting all users from db

exports.findAll = async (req, res) => {

    // start supperting param
    let userTypeReq = req.query.userType;
    let userStatusReq = req.query.userStatus;
    const queryObj = {};

    if (userStatusReq) {
        queryObj.userStatus = userStatusReq;
    }
    if (userTypeReq) {
        queryObj.userType = userTypeReq;
    }

    // console.log(queryObj);
    const users = await User.find(
        queryObj
    );
    return res.status(200).send(objectConverter.objectResponse(users));
}


exports.findById = async (req, res) => {

    const userId = req.params.userId;

    const user = await User.find({ userId });

    if (user && user.length > 0) {
        return res.status(200).send(objectConverter.objectResponse(user))
    }
    return res.status(402).send({
        messgae: "User with this userId is not present"
    })
}


// controller to update users status


exports.updateUserData = async (req, res) => {
    let userId = req.params.userId;
    try {
        const user = await User.findOneAndUpdate({ userId: userId }, {
            userName: req.body.userName,
            userStatus: req.body.userStatus,
            userType: req.body.userType

        }).exec();
        res.status(200).send({
            message: "User record has been updated succesfully."
        })

    } catch (error) {
        console.log("Error while Updating user data", error);
        res.status(500).send({
            message: "Error While Updating user data"
        })

    }

}
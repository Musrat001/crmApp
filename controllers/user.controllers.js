const User = require("../models/user.models.js");
const objectConverter = require("../utils/objectConverter.js");


// getting all users from db

exports.findAll = async (req, res) => {
    const users = await User.find();
    return res.status(200).send(objectConverter.objectResponse(users));
}
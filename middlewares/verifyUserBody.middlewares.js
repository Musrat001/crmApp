const User = require("../models/user.models.js");
const constant = require("../utils/constant.js");
validateUserRequestBody = async (req, res, next) => {

    // console.log(`request data is ${req.body.user}`);
    // console.log(`request data is ${req.body.userId}`);
    // console.log(`request data is ${req.body.email}`);
    // console.log(`request data is ${req.body.password}`);
    // console.log(`request data is ${req.body.userType}`);

    if (!req.body.name) {
        res.status(400).send({
            message: "User name required.."
        })
        return;

    }

    if (!req.body.password) {
        res.status(400).send({
            message: "User password is required.."
        })
        return;

    }
    if (!req.body.userId) {
        res.status(400).send({
            message: "UserId should be unique and  cannot be null.."
        })
        return;

    }

    const user = await User.findOne({ userId: req.body.userId });
    if (user != null) {
        res.status(400).send({
            message: "User is already registered.."
        })
        return;

    }
    const user1 = await User.findOne({ email: req.body.email });
    if (user1 != null) {
        res.status(400).send({
            message: "User is already registered.."
        })
        return;

    }

    // validating user type;

    const validUserTypes = [constant.userTypes.admin, constant.userTypes.customer, constant.userTypes.engineer];
    if (req.body.userType && !validUserTypes.includes(req.body.userType)) {
        res.status(400).send({
            message: "User Type is invalid, please enter valid user type only..."
        })
        return;

    }
    next();

}

module.exports = {
    validateUserRequestBody: validateUserRequestBody
}
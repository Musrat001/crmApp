const User = require("../models/user.models.js");
const constant = require("../utils/constant.js");



validateUserRequestBody = async (req, res, next) => {
    console.log(req.method);

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


const validateUserStatusAndUserType = (req, res, next) => {
    // validating the userType 

    const userType = req.body.userType;
    const validUserTypes = [constant.userTypes.admin, constant.userTypes.customer, constant.userTypes.engineer];
    if (userType && !validUserTypes.includes(userType)) {
        res.status(402).send({
            message: "Provide valid User Type, Valide user types are CUSTOMER | ENGINEER | ADMIN"
        });
    }

    // validating the user Status

    const userStatus = req.body.userStatus;
    const validUserStatus = [constant.userStatus.approved, constant.userStatus.blocked, constant.userStatus.pending];


    if (userStatus && !validUserStatus.includes(userStatus)) {
        res.status(402).send({
            message: "provide proper user Status, vlaid user status are APPROVED | PENDING | BLOCKED"
        });
    }

    next();
}

module.exports = {
    validateUserRequestBody: validateUserRequestBody,
    validateUserStatusAndUserType: validateUserStatusAndUserType
}
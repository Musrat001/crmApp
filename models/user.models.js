const mongoose = require("mongoose");
const constant = require("../utils/constant.js");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    email: {
        type: String,
        required: true,
        minLength: 7,
        unique: true,
    },
    userType: {
        type: String,
        enumL: [constant.userTypes.customer, constant.userTypes.admin, constant.userTypes.engineer],
        required: true,
        default: constant.userTypes.customer
    },
    userStatus: {
        type: String,
        enum: [constant.userStatus.approved, constant.userStatus.pending, constant.userStatus.blocked],
        required: true,
        default: constant.userStatus.approved
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);



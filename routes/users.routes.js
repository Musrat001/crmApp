const express = require("express");
const userController = require("../controllers/user.controllers");
const router = express.Router();
const authMW = require("../middlewares/authjwt.middlewares.js");
const verifyUserBody = require("../middlewares/verifyUserBody.middlewares.js");


router.get("/users", [authMW.verifyToken, authMW.isAdmin], userController.findAll);
router.get("/users/:userId", [authMW.verifyToken, authMW.isAdmin], userController.findById);
router.put("/users/:userId", [authMW.verifyToken, authMW.isAdmin, verifyUserBody.validateUserStatusAndUserType], userController.updateUserData);

module.exports = router;
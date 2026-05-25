const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controllers.js");
const validateUserReqBody = require("../middlewares/verifyUserBody.middlewares.js");


router.post("/auth/signup", [validateUserReqBody.validateUserRequestBody], authController.signUp);
router.post("/auth/login", authController.login);

module.exports = router;
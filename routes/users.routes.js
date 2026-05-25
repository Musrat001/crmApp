const express = require("express");
const userController = require("../controllers/user.controllers");
const router = express.Router();


router.get("/users", userController.findAll);

module.exports = router;
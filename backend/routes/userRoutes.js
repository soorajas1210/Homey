const express = require("express");
const { signinUser, registerUser } = require("../controllers/userController");

// router onjet
const router = express.Router();

// routes
router.post("/signup",registerUser);
router.post("/signin", signinUser);



module.exports = router;

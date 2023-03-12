const express = require("express");
const { signinUser, registerUser } = require("../controllers/userController");

// router onjet
const router = express.Router();

// routes
router.post("/signin", signinUser);
router.post("/signup",registerUser);



module.exports = router;

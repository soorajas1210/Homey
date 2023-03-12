const express = require("express");
const { adminLogin, getUsers } = require("../controllers/adminController");
const adminProtect = require("../middlewares/adminAuthMiddleware");
const router = express.Router();

router.post("/adminLogin", adminLogin);
router.get("/usersList", getUsers);

module.exports = router;

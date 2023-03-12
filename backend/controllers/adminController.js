const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email });

  if (admin.isAdmin == 1) {
    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        firstName: admin.firstName,
        email: admin.email,
        mobileno: admin.mobileno,
        isAdmin: admin.isAdmin,
        token: generateTocken(admin._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password!");
    }
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    console.log("list");
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = {
  adminLogin,
  getUsers,
};

const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateTocken = require("../utils/generateTocken");





const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, mobileno, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    mobileno,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobileno: user.mobileno,
      isAdmin: user.isAdmin,
      token: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }
});

const signinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      mobileno: user.mobileno,
      isAdmin: user.isAdmin,
      token: generateTocken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

module.exports = {
  signinUser,
  registerUser,
};

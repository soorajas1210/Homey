const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const adminProtect = asyncHandler(async (req, res) => {
  let token;

  if (
    req.headers.Authorization &&
    req.headers.Authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.Authorization.split("")[1];

      // decode token id
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      const admin = await User.findById(decode.id).select("-password");
      if (!admin.isAdmin) {
        res.status(401);
        throw new Error("Not Admin");
      }
      req.admin;
      next();
    } catch (error) {
      if (error.message == "Not Admin") {
        res.status(401);
        throw new Error("Protected route, only admin can access this route ");
      }
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
});

module.exports = adminProtect;

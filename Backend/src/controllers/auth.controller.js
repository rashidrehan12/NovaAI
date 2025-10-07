// Removed unused prompt-async import
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

async function registerController(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "Unauthorized - User already exists!",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName: { firstName, lastName },
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully!",
    token: token,
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginController(req, res) {
  try {
    console.log("Login request body:", req.body);
    
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required!",
      });
    }

    const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password!",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password!",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggedin successfully!",
    token: token,
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = { registerController, loginController };

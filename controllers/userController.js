const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sendEmailWithBrevo = require("../services/emailService");
const logger = require("morgan");

const signUp = async (req, res) => {
  try {
    const { displayName, email, password, displayImage, bio, userType } =
      req.body;

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new UserModel({
      displayName,
      email,
      password,
      displayImage,
      bio,
      userType,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const validPassword = await user.isValidPassword(password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = await jwt.sign(
      { 
        email: user.email, 
        _id: user._id, 
        userType: user.userType,
        name: user.displayName 
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      userType: user.userType,
      user: {
        id: user._id,
        email: user.email,
        name: user.displayName,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Unable to process login. Please try again later.",
    });
  }
};

// Get all Events
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
  signUp,
  Login,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};

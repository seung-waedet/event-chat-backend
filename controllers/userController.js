const User = require('../models/userModel'); // Assuming your User model is in models/User.js

// Create a new User (optional registration)
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000 && err.keyValue.email) { // Handle duplicate email error
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Get all Users (consider security implications for production)
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Get a single User by ID (for internal use or authorized access)
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
};

// Update a User by ID (consider implementing authentication for updates)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    if (err.code === 11000 && err.keyValue.email) { // Handle duplicate email error on update
      return res.status(400).json({ message: "Email already exists" });
    }
    console.error(err);
    res.status(500).json({ message: "Error updating user" });
  }
};

// Delete a User by ID (consider security implications for production)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = {
    getUserById,
    createUser,
    getUsers,
    updateUser,
    deleteUser
}

const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController")

userRoute.get("/users", userController.getUsers)

userRoute.get("/users/:id", userController.getUserById)

userRoute.post("/users", userController.createUser)

userRoute.patch("/users/:id", userController.updateUser)

userRoute.delete("/users/:id", userController.deleteUser)

module.exports = userRoute;

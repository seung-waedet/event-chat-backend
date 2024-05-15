const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController")
const {validateSignup, validateLogin, userSchema} = require("../validations/userValidator")
const  validate  = require("../middlewares/validate")
const { bearerTokenAuth, checkAdmin} = require("../middlewares/auth")

require('dotenv').config();


userRoute.post( "/signup", validateSignup, userController.signUp);

userRoute.post( "/users", validate(userSchema), bearerTokenAuth, checkAdmin,  userController.createUser);

userRoute.post("/login", validateLogin, userController.Login);

userRoute.get( "/users/:id", bearerTokenAuth, checkAdmin, userController.getUserById);

userRoute.patch( "/users/:id", bearerTokenAuth, checkAdmin, userController.updateUserById);

userRoute.delete( "/users/:id", bearerTokenAuth, checkAdmin, userController.getUserById);



module.exports = userRoute;

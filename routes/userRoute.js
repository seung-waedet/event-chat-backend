const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController")
const {validateSignup, validateLogin, userSchema} = require("../validations/userValidator")
const  validate  = require("../middlewares/validate")
const { bearerTokenAuth } = require("../middlewares/auth")

require('dotenv').config();


userRoute.post( "/signup", validateSignup, userController.signUp);

userRoute.post( "/createUser", bearerTokenAuth, validate(userSchema), userController.createUser);

userRoute.post("/login", validateLogin, userController.Login);



module.exports = userRoute;

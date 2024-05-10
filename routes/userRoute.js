const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController")
const {validateSignup, validateLogin} = require("../validations/userValidator")
require('dotenv').config();


userRoute.post( "/signup", validateSignup, userController.signUp);

userRoute.post("/login", validateLogin, userController.Login);



module.exports = userRoute;

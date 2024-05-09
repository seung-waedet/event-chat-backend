const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController")
require('dotenv').config();


userRoute.post( "/signup", userController.signUp);

userRoute.post("/login", userController.Login);



module.exports = userRoute;
